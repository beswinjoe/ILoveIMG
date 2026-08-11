"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, Download, CheckCircle2, Wand2, Loader2 } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import ImagePreview from "@/components/ImagePreview";

export default function BackgroundRemoverClient() {
  const [file, setFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<string>("");
  const [progress, setProgress] = useState(0);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

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

    try {
      const { removeBackground: imglyRemoveBackground } = await import('@imgly/background-removal');

      const config = {
        progress: (key: string, current: number, total: number) => {
          let percentage = Math.round((current / total) * 100);
          if (isNaN(percentage)) percentage = 0;
          
          if (key.includes('fetch')) {
            setStatus("Downloading AI model (once per session)...");
          } else if (key.includes('compute')) {
            setStatus("Analyzing image and removing background...");
          } else {
            setStatus("Processing...");
          }
          
          setProgress(percentage);
        },
        output: {
          format: 'image/png'
        }
      };

      let processableInput: Blob | File = file;
      
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });
        
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
          if (blob) {
            processableInput = blob;
          }
        }
      }

      const imageBlob = await imglyRemoveBackground(processableInput, config);
      const url = URL.createObjectURL(imageBlob);
      setOutputUrl(url);
      setStatus("Done");
    } catch (error) {
      console.error(error);
      alert("Background removal couldn't be loaded or failed. Please try again.");
      setStatus("Error");
    }

    setIsProcessing(false);
  };

  return (
    <ToolLayout
      howItWorks={["Upload your image file.","Select your preferred settings.","Click the process button.","Download your optimized image!"]}
      supportedFormats="JPG, JPEG, PNG, WebP, SVG"
      title="Background Remover"
      description="Automatically detect the main subject and remove the background from your images with our AI model."
      breadcrumbs={[{ label: "Image Tools", href: "/image-tools" }, { label: "Background Remover", href: "/background-remover" }]}
      faq={[
        { question: "Is my image uploaded?", answer: "No! Filoza uses an advanced WebAssembly AI model that runs entirely inside your browser. Your images never leave your device." },
        { question: "Why does it take time to load initially?", answer: "The AI model (~40MB) needs to be downloaded to your browser the very first time you use the tool. Subsequent uses will be much faster!" }
      ]}
    >
      <div className="max-w-4xl mx-auto">
        {!outputUrl ? (
          <>
            {!file ? (
              <div 
                className="dropzone mb-8" 
                onDrop={handleDrop} 
                onDragOver={(e) => e.preventDefault()}
                onClick={() => fileInputRef.current?.click()}
              >
                <UploadCloud className="dropzone-icon" />
                <h3>Drag & Drop your image here</h3>
                <p className="text-muted">Supports JPG, PNG, WebP</p>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleFileChange} 
                />
              </div>
            ) : (
              <div className="glass-card text-center">
                <h3 className="mb-4 truncate" title={file.name}>{file.name}</h3>
                
                <div className="mb-6">
                  <ImagePreview originalSrc={originalUrl!} transparent={true} />
                </div>

                {isProcessing && (
                  <div className="mb-6 max-w-md mx-auto">
                    <div className="flex justify-between text-sm mb-2 text-muted">
                      <span>{status}</span>
                      <span className="font-medium">{progress}%</span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2.5 overflow-hidden">
                      <div className="bg-primary h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                    </div>
                  </div>
                )}

                <div className="flex justify-center gap-4">
                  <button className="btn btn-secondary" onClick={() => { setFile(null); setOriginalUrl(null); }} disabled={isProcessing}>
                    Upload Another
                  </button>
                  <button className="btn btn-primary" onClick={removeBackground} disabled={isProcessing}>
                    {isProcessing ? (
                      <>
                        <Loader2 size={18} className="animate-spin" /> Processing...
                      </>
                    ) : (
                      <>
                        <Wand2 size={18} /> Remove Background
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="glass-card text-center py-12 flex flex-col items-center">
            <CheckCircle2 size={64} className="text-success mb-6" />
            <h2 className="mb-4">Background Removed!</h2>
            
            <div className="mb-8 w-full max-w-2xl mx-auto">
              <ImagePreview originalSrc={originalUrl!} resultSrc={outputUrl} transparent={true} />
            </div>

            <div className="flex gap-4">
              <button className="btn btn-secondary" onClick={() => { setFile(null); setOriginalUrl(null); setOutputUrl(null); }}>
                Process Another
              </button>
              <a href={outputUrl} download={`nobg_${file?.name.replace(/\.[^/.]+$/, "")}.png`} className="btn btn-primary" style={{ textDecoration: 'none' }}>
                <Download size={18} /> Download Transparent PNG
              </a>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
