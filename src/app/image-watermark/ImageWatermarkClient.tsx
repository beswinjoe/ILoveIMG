"use client";

import React, { useState, useRef, useEffect } from "react";
import { UploadCloud, Download, CheckCircle2, ImageDown, Stamp, Loader2 } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import ImagePreview from "@/components/ImagePreview";

export default function ImageWatermarkClient() {
  const [file, setFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [downloadName, setDownloadName] = useState<string>("output");
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [watermarkText, setWatermarkText] = useState("© Watermark");
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (outputUrl) URL.revokeObjectURL(outputUrl);
      if (originalUrl) URL.revokeObjectURL(originalUrl);
    };
  }, [outputUrl, originalUrl]);

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
    setFile(selectedFile);
    setOriginalUrl(URL.createObjectURL(selectedFile));
    setOutputUrl(null);
  };

  const processFile = async () => {
    if (!file) return;
    setIsProcessing(true);

    try {
      
      const imageUrl = URL.createObjectURL(file);
      const img = new Image();
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = imageUrl;
      });
      
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("No context");
      ctx.drawImage(img, 0, 0);
      
      const fontSize = Math.max(20, Math.floor(img.width * 0.05));
      ctx.font = `bold ${fontSize}px sans-serif`;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.lineWidth = Math.max(1, Math.floor(fontSize / 15));
      
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      ctx.strokeText(watermarkText, img.width / 2, img.height / 2);
      ctx.fillText(watermarkText, img.width / 2, img.height / 2);
      
      const pngBlob = await new Promise<Blob>((resolve) => canvas.toBlob(b => resolve(b as Blob), "image/jpeg", 0.95));
      setOutputUrl(URL.createObjectURL(pngBlob));
      setDownloadName(file.name.replace(/\.[^/.]+$/, "") + '_watermarked.jpg');
    
    } catch (error) {
      console.error(error);
      alert("An error occurred during processing. Please check your file and try again.");
    }

    setIsProcessing(false);
  };

  return (
    <ToolLayout
      howItWorks={["Upload your image file.","Select your preferred settings.","Click the process button.","Download your optimized image!"]}
      supportedFormats="JPG, JPEG, PNG, WebP, SVG"
      title="Image Watermark"
      description="Add a text watermark to your images to protect your copyright."
      breadcrumbs={[{ label: "Image Tools", href: "/image-tools" }, { label: "Image Watermark", href: "/image-watermark" }]}
      faq={[
        { question: "Is my file uploaded anywhere?", answer: "No. Filoza processes your files entirely within your browser for 100% privacy." }
      ]}
    >
      <div className="max-w-3xl mx-auto">
        {!outputUrl ? (
          <>
            <div 
              className="dropzone mb-8" 
              onDrop={handleDrop} 
              onDragOver={(e) => e.preventDefault()}
              onClick={() => fileInputRef.current?.click()}
            >
              <UploadCloud className="dropzone-icon" />
              <h3>Drag & Drop your file here</h3>
              <p className="text-muted">Supports image/*</p>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleFileChange} 
              />
            </div>

            {file && (
              <div className="glass-card text-center">
                <h3 className="mb-6 truncate" title={file.name}>{file.name}</h3>
                
                <div className="mb-6 w-full max-w-2xl mx-auto">
                  <ImagePreview originalSrc={originalUrl!} />
                </div>
                
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Watermark Text</label>
        <input 
          type="text" 
          value={watermarkText} 
          onChange={(e) => setWatermarkText(e.target.value)} 
          className="input w-full" 
          placeholder="e.g. © 2026 Filoza"
        />
      </div>
    

                <div className="flex justify-center gap-4">
                  <button className="btn btn-secondary" onClick={() => setFile(null)} disabled={isProcessing}>
                    Upload Another
                  </button>
                  <button className="btn btn-primary" onClick={processFile} disabled={isProcessing}>
                    {isProcessing ? (
                      <><Loader2 className="animate-spin" size={18}/> Processing...</>
                    ) : (
                      <>
                        <Stamp size={18} /> Process File
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
            <h2 className="mb-4">Processing Successful!</h2>
            
            <div className="mb-8 w-full max-w-2xl mx-auto">
              <ImagePreview originalSrc={originalUrl!} resultSrc={outputUrl} />
            </div>
            
            <div className="flex gap-4 mt-8">
              <button className="btn btn-secondary" onClick={() => { setFile(null); setOutputUrl(null); }}>
                Process Another
              </button>
              <a href={outputUrl} download={downloadName} className="btn btn-primary" style={{ textDecoration: 'none' }}>
                <Download size={18} /> Download Output
              </a>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
