"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, Download, Image as ImageIcon } from "lucide-react";

export default function JpgToPngClient() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (selectedFile: File) => {
    if (selectedFile.type !== "image/jpeg" && selectedFile.type !== "image/jpg") {
      alert("Please upload a JPG/JPEG image.");
      return;
    }
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
    setConvertedUrl(null);
  };

  const convertImage = () => {
    if (!file || !previewUrl) return;
    setIsConverting(true);
    
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        setConvertedUrl(canvas.toDataURL("image/png"));
        setIsConverting(false);
      }
    };
    img.src = previewUrl;
  };

  return (
    <div className="container" style={{ padding: "3rem 1.5rem" }}>
      <h1 className="text-center" style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
        JPG to PNG Converter
      </h1>
      <p className="text-muted text-center max-w-2xl mx-auto mb-8">
        Convert JPG and JPEG images to PNG format instantly inside your browser. No files are uploaded to our servers.
      </p>

      {!file ? (
        <div 
          className="dropzone max-w-2xl mx-auto" 
          onDrop={handleDrop} 
          onDragOver={(e) => e.preventDefault()}
          onClick={() => fileInputRef.current?.click()}
        >
          <UploadCloud className="dropzone-icon" />
          <h3>Drag & Drop your JPG here</h3>
          <p className="text-muted">or click to browse</p>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            style={{ display: "none" }} 
            accept="image/jpeg, image/jpg" 
            onChange={(e) => e.target.files && handleFileChange(e.target.files[0])} 
          />
        </div>
      ) : (
        <div className="card max-w-3xl mx-auto mt-8">
          <div className="flex flex-col items-center gap-6">
            <h3 className="flex items-center gap-2"><ImageIcon size={20} /> Original JPG</h3>
            {previewUrl && <img src={previewUrl} alt="Original" style={{ width: "100%", maxWidth: "400px", borderRadius: "var(--radius-sm)", backgroundColor: "var(--background)" }} />}
            
            <div className="flex gap-4 justify-center mt-4 w-full" style={{ borderTop: "1px solid var(--border)", paddingTop: "1.5rem" }}>
              <button className="btn btn-secondary" onClick={() => { setFile(null); setConvertedUrl(null); }}>
                Upload Another
              </button>
              <button className="btn btn-primary" onClick={convertImage} disabled={isConverting || !!convertedUrl}>
                {isConverting ? "Converting..." : convertedUrl ? "Converted" : "Convert to PNG"}
              </button>
              {convertedUrl && (
                <a href={convertedUrl} download={file.name.replace(/\.jpe?g$/i, ".png")} className="btn btn-success" style={{ backgroundColor: "var(--success)", color: "white" }}>
                  <Download size={16} /> Download PNG
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Ad Container */}
      <div className="ad-container max-w-3xl mx-auto mt-8">Advertisement Space</div>

      <div className="max-w-3xl mx-auto mt-12 p-6" style={{ backgroundColor: "var(--surface)", borderRadius: "var(--radius-lg)" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>How to convert JPG to PNG?</h2>
        <ol style={{ paddingLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }} className="text-muted">
          <li>Upload your JPG or JPEG image.</li>
          <li>Click the "Convert to PNG" button.</li>
          <li>The image is processed locally on your device for maximum privacy.</li>
          <li>Download your new PNG image!</li>
        </ol>
      </div>
    </div>
  );
}
