"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, Download, CheckCircle2, Shield } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";

export default function ExifRemoverClient() {
  const [file, setFile] = useState<File | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  
  
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

      // Drawing to a canvas and exporting inherently strips all EXIF metadata
      ctx.drawImage(img, 0, 0);
  

      const blob = await new Promise<Blob>((resolve) => {
        // Output as original type, or fallback to png
        canvas.toBlob((b) => resolve(b!), file.type || "image/png", 1.0);
      });

      setOutputUrl(URL.createObjectURL(blob));
    } catch (error) {
      console.error(error);
      alert("An error occurred during processing.");
    }

    setIsProcessing(false);
  };

  return (
    <ToolLayout
      howItWorks={["Upload your file or paste your data.","Adjust the tool settings.","Run the tool.","Get your results instantly."]}
      supportedFormats="Various formats supported depending on the tool."
      title="EXIF Metadata Remover"
      description="Remove GPS location, camera details, and all hidden EXIF metadata from your images for privacy."
      breadcrumbs={[{ label: "Image Tools", href: "/image-tools" }, { label: "EXIF Metadata Remover", href: "/exif-remover" }]}
      faq={[
        { question: "Are my images uploaded anywhere?", answer: "No. Filoza strips the metadata entirely within your browser for 100% privacy." }
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

            {file && (
              <div className="glass-card text-center">
                <h3 className="mb-4 truncate" title={file.name}>{file.name}</h3>
                
                <div className="mb-6 flex justify-center bg-black/10 rounded-lg p-2 max-h-64 overflow-hidden">
                  <img src={URL.createObjectURL(file)} alt="Preview" className="max-h-full object-contain" />
                </div>

                
                <div className="flex flex-col gap-4 mb-8 p-6 bg-background rounded-lg border border-border text-left">
                  <p className="text-sm text-muted">All hidden metadata (GPS, Camera model, Date taken, Software) will be permanently stripped from your image, protecting your privacy before sharing.</p>
                </div>
  

                <div className="flex justify-center gap-4">
                  <button className="btn btn-secondary" onClick={() => setFile(null)} disabled={isProcessing}>
                    Upload Another
                  </button>
                  <button className="btn btn-primary" onClick={processImage} disabled={isProcessing}>
                    {isProcessing ? "Stripping Metadata..." : (
                      <>
                        <Shield size={18} /> Remove Metadata
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
            <h2 className="mb-4">Metadata Removed!</h2>
            
            <div className="mb-6 flex justify-center bg-black/10 rounded-lg p-2 max-h-64 overflow-hidden">
               <img src={outputUrl} alt="Output Preview" className="max-h-full object-contain" />
            </div>

            <div className="flex gap-4">
              <button className="btn btn-secondary" onClick={() => { setFile(null); setOutputUrl(null); }}>
                Process More
              </button>
              <a href={outputUrl} download={`safe_${file?.name}`} className="btn btn-primary" style={{ textDecoration: 'none' }}>
                <Download size={18} /> Download Safe Image
              </a>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
