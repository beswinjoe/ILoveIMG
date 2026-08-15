"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, Download, CheckCircle2, Image as ImageIcon, Droplets } from "lucide-react";
import ImagePreview from "@/components/ImagePreview";
export default function BlurImageClient() {
  const [file, setFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [blur, setBlur] = useState(5);
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
    } else {
      alert("Please upload a valid image file.");
    }
  };
  const processImage = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error("Canvas not supported");
      ctx.filter = `blur(${blur}px)`;
      ctx.drawImage(img, 0, 0);
      const blob = await new Promise<Blob>(resolve => {
        canvas.toBlob(b => resolve(b!), file.type);
      });
      setOutputUrl(URL.createObjectURL(blob));
    } catch (error) {
      console.error(error);
      alert("An error occurred during image processing.");
    }
    setIsProcessing(false);
  };
  return <>
      <div className="max-w-3xl mx-auto">
        {!outputUrl ? <>
            <div className="dropzone mb-8" onDrop={handleDrop} onDragOver={e => e.preventDefault()} onClick={() => fileInputRef.current?.click()}>
              <UploadCloud className="dropzone-icon" />
              <h3>Drag & Drop your image here</h3>
              <p className="text-muted">Supports JPG, PNG, WebP</p>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
            </div>

            {file && <div className="glass-card text-center">
                <h3 className="mb-4 truncate" title={file.name}>{file.name}</h3>
                
                <div className="mb-6 w-full max-w-2xl mx-auto">
                  <ImagePreview originalSrc={originalUrl!} />
                </div>

                
                  <div className="flex flex-col gap-4 mb-8 p-6 bg-background rounded-lg border border-border text-left">
                    <label className="label">Blur Intensity</label>
                    <input type="range" min="1" max="50" value={blur} onChange={e => setBlur(parseInt(e.target.value))} className="w-full" />
                    <div className="text-center font-bold">{blur}px</div>
                  </div>
    

                <div className="flex justify-center gap-4">
                  <button className="btn btn-secondary" onClick={() => setFile(null)} disabled={isProcessing}>
                    Upload Another
                  </button>
                  <button className="btn btn-primary" onClick={processImage} disabled={isProcessing}>
                    {isProcessing ? "Processing..." : <>
                        <Droplets size={18} /> Process Image
                      </>}
                  </button>
                </div>
              </div>}
          </> : <div className="glass-card text-center py-12 flex flex-col items-center">
            <CheckCircle2 size={64} className="text-success mb-6" />
            <h2 className="mb-4">Processing Successful!</h2>
            
            <div className="mb-8 w-full max-w-2xl mx-auto">
               <ImagePreview originalSrc={originalUrl!} resultSrc={outputUrl} />
            </div>

            <div className="flex gap-4">
              <button className="btn btn-secondary" onClick={() => {
            setFile(null);
            setOutputUrl(null);
          }}>
                Process More
              </button>
              <a href={outputUrl} download={`processed_${file?.name}`} className="btn btn-primary" style={{
            textDecoration: 'none'
          }}>
                <Download size={18} /> Download Image
              </a>
            </div>
          </div>}
      </div>
    </>;
}