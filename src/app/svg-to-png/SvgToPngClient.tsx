"use client";

import React, { useState, useRef, useEffect } from "react";
import { UploadCloud, Download, CheckCircle2, ImageDown, Stamp, Loader2 } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import ImagePreview from "@/components/ImagePreview";

export default function SvgToPngClient() {
  const [file, setFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [downloadName, setDownloadName] = useState<string>("output");
  const [isProcessing, setIsProcessing] = useState(false);
  
  
  
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
      
      const text = await file.text();
      const svgBlob = new Blob([text], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      
      const img = new Image();
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = url;
      });
      
      const canvas = document.createElement('canvas');
      canvas.width = img.width || 800;
      canvas.height = img.height || 600;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("No context");
      ctx.drawImage(img, 0, 0);
      
      const pngBlob = await new Promise<Blob>((resolve) => canvas.toBlob(b => resolve(b as Blob), "image/png"));
      setOutputUrl(URL.createObjectURL(pngBlob));
      setDownloadName(file.name.replace(/\.svg$/i, '') + '.png');
    
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
      title="SVG to PNG"
      description="Convert scalable vector graphics (SVG) into standard PNG images."
      breadcrumbs={[{ label: "Image Tools", href: "/image-tools" }, { label: "SVG to PNG", href: "/svg-to-png" }]}
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
              <p className="text-muted">Supports .svg,image/svg+xml</p>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept=".svg,image/svg+xml" 
                onChange={handleFileChange} 
              />
            </div>

            {file && (
              <div className="glass-card text-center">
                <h3 className="mb-6 truncate" title={file.name}>{file.name}</h3>
                
                <div className="mb-6">
                  <ImagePreview originalSrc={originalUrl!} transparent={true} />
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
                        <ImageDown size={18} /> Process File
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
              <ImagePreview originalSrc={originalUrl!} resultSrc={outputUrl} transparent={true} />
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
