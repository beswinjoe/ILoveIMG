"use client";

import React, { useState, useRef, useEffect } from "react";
import { UploadCloud, Download, CheckCircle2, Wand2, Loader2 } from "lucide-react";
import ImagePreview from "@/components/ImagePreview";
export default function BackgroundRemoverClient() {
  const [file, setFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<string>("");
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    // Pre-import to start downloading the module early
    import('@imgly/background-removal').catch(console.error);
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };
  const handleFile = (selectedFile: File) => {
    if (selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
      setOriginalUrl(URL.createObjectURL(selectedFile));
      setOutputUrl(null);
      setProgress(0);
      setStatus("");
    } else {
      alert("Please upload a valid image file.");
    }
  };
  const removeBackground = async () => {
    if (!file) return;
    setIsProcessing(true);
    setStatus("Preparing AI...");
    setProgress(0);

    const apiUrl = process.env.NEXT_PUBLIC_BACKGROUND_REMOVER_API_URL;
    
    // Attempt API first
    if (apiUrl) {
      try {
        await new Promise<void>((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open("POST", `${apiUrl}/remove-background`);
          
          xhr.upload.onprogress = (e) => {
            if (e.lengthComputable) {
              const percentage = Math.round((e.loaded / e.total) * 50);
              setProgress(percentage);
              setStatus("Uploading image...");
            }
          };

          xhr.onprogress = (e) => {
            if (e.lengthComputable) {
              const percentage = 50 + Math.round((e.loaded / e.total) * 50);
              setProgress(percentage);
              setStatus("Processing and downloading result...");
            } else {
              setStatus("Processing image...");
            }
          };

          xhr.onload = () => {
            if (xhr.status === 200) {
              const blob = new Blob([xhr.response], { type: 'image/png' });
              const url = URL.createObjectURL(blob);
              setOutputUrl(url);
              setStatus("Done");
              setProgress(100);
              resolve();
            } else {
              reject(new Error(`API returned status ${xhr.status}`));
            }
          };

          xhr.onerror = () => reject(new Error("Network error when connecting to API"));
          
          xhr.responseType = 'blob';
          const formData = new FormData();
          formData.append('file', file);
          xhr.send(formData);
        });
        setIsProcessing(false);
        return; // Success!
      } catch (err) {
        console.warn("API failed, falling back to local WASM model", err);
        // Fallthrough to local WASM processing
      }
    }

    // Local WASM processing (Fallback or Default)
    try {
      setStatus("Initializing local fallback AI...");
      setProgress(0);
      const { removeBackground: imglyRemoveBackground } = await import('@imgly/background-removal');
      const config = {
        progress: (key: string, current: number, total: number) => {
          let percentage = Math.round((current / total) * 100);
          if (isNaN(percentage)) percentage = 0;
          if (key.includes('fetch')) {
            setStatus("Downloading local AI model (once per session)...");
          } else if (key.includes('compute')) {
            setStatus("Analyzing image locally...");
          }
          setProgress(percentage);
        },
        output: { format: 'image/png' as const }
      };
      
      const imageBlob = await imglyRemoveBackground(file, config);
      const url = URL.createObjectURL(imageBlob);
      setOutputUrl(url);
      setStatus("Done");
      setProgress(100);
    } catch (error) {
      console.error(error);
      alert("Background removal couldn't be loaded or failed. Please try again.");
      setStatus("Error");
    }
    setIsProcessing(false);
  };
  return <>
      <div className="max-w-4xl mx-auto">
        {!outputUrl ? <>
            {!file ? <div className="dropzone mb-8" onDrop={handleDrop} onDragOver={e => e.preventDefault()} onClick={() => fileInputRef.current?.click()}>
                <UploadCloud className="dropzone-icon" />
                <h3>Drag & Drop your image here</h3>
                <p className="text-muted">Supports JPG, PNG, WebP</p>
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
              </div> : <div className="glass-card text-center">
                <h3 className="mb-4 truncate" title={file.name}>{file.name}</h3>
                
                <div className="mb-6">
                  <ImagePreview originalSrc={originalUrl!} transparent={true} />
                </div>

                {isProcessing && <div className="mb-6 max-w-md mx-auto">
                    <div className="flex justify-between text-sm mb-2 text-muted">
                      <span>{status}</span>
                      <span className="font-medium">{progress}%</span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2.5 overflow-hidden">
                      <div className="bg-primary h-2.5 rounded-full transition-all duration-300" style={{
                width: `${progress}%`
              }}></div>
                    </div>
                  </div>}

                <div className="flex justify-center gap-4">
                  <button className="btn btn-secondary" onClick={() => {
              setFile(null);
              setOriginalUrl(null);
            }} disabled={isProcessing}>
                    Upload Another
                  </button>
                  <button className="btn btn-primary" onClick={removeBackground} disabled={isProcessing}>
                    {isProcessing ? <>
                        <Loader2 size={18} className="animate-spin" /> Processing...
                      </> : <>
                        <Wand2 size={18} /> Remove Background
                      </>}
                  </button>
                </div>
              </div>}
          </> : <div className="glass-card text-center py-12 flex flex-col items-center">
            <CheckCircle2 size={64} className="text-success mb-6" />
            <h2 className="mb-4">Background Removed!</h2>
            
            <div className="mb-8 w-full max-w-2xl mx-auto">
              <ImagePreview originalSrc={originalUrl!} resultSrc={outputUrl} transparent={true} />
            </div>

            <div className="flex gap-4">
              <button className="btn btn-secondary" onClick={() => {
            setFile(null);
            setOriginalUrl(null);
            setOutputUrl(null);
          }}>
                Process Another
              </button>
              <a href={outputUrl} download={`nobg_${file?.name.replace(/\.[^/.]+$/, "")}.png`} className="btn btn-primary" style={{
            textDecoration: 'none'
          }}>
                <Download size={18} /> Download Transparent PNG
              </a>
            </div>
          </div>}
      </div>
    </>;
}