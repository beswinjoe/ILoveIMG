"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, Download, Image as ImageIcon } from "lucide-react";
import ImagePreview from "@/components/ImagePreview";
import AdBanner from "@/components/AdBanner";

export default function PngToJpgClient() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [quality, setQuality] = useState(0.9);
  const [isConverting, setIsConverting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (selectedFile: File) => {
    if (selectedFile.type !== "image/png") {
      alert("Please upload a PNG image.");
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
        // Draw background first for transparency support
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // Draw image over it
        ctx.drawImage(img, 0, 0);
        
        setConvertedUrl(canvas.toDataURL("image/jpeg", quality));
        setIsConverting(false);
      }
    };
    img.src = previewUrl;
  };

  return (
    <div className="container" style={{ padding: "3rem 1.5rem" }}>
      <h1 className="text-center" style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
        PNG to JPG Converter
      </h1>
      <p className="text-muted text-center max-w-2xl mx-auto mb-8">
        Convert PNG images to JPG format directly in your browser. Add custom background colors for transparent images.
      </p>

      {!file ? (
        <div 
          className="dropzone max-w-2xl mx-auto" 
          onDrop={handleDrop} 
          onDragOver={(e) => e.preventDefault()}
          onClick={() => fileInputRef.current?.click()}
        >
          <UploadCloud className="dropzone-icon" />
          <h3>Drag & Drop your PNG here</h3>
          <p className="text-muted">or click to browse</p>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            style={{ display: "none" }} 
            accept="image/png" 
            onChange={(e) => e.target.files && handleFileChange(e.target.files[0])} 
          />
        </div>
      ) : (
        <div className="card max-w-4xl mx-auto mt-8">
          <ImagePreview 
            originalSrc={previewUrl!} 
            resultSrc={convertedUrl} 
            originalLabel="Original PNG"
            resultLabel="Converted JPG"
            transparent={true}
          />

          <div className="mt-8 pt-6 flex flex-col gap-6" style={{ borderTop: "1px solid var(--border)" }}>
            <div className="flex gap-8 justify-center flex-wrap max-w-xl mx-auto">
              <div>
                <label className="label">Background Color</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="color" 
                    value={bgColor} 
                    onChange={(e) => setBgColor(e.target.value)} 
                    style={{ width: "40px", height: "40px", padding: 0, border: "none", borderRadius: "4px", cursor: "pointer" }}
                  />
                  <span className="text-muted">{bgColor}</span>
                </div>
                <p className="text-muted mt-1" style={{ fontSize: "0.75rem" }}>Replaces transparent areas.</p>
              </div>

              <div style={{ flex: 1 }}>
                <label className="label flex justify-between">
                  <span>JPG Quality</span>
                  <span>{Math.round(quality * 100)}%</span>
                </label>
                <input 
                  type="range" 
                  min="0.1" 
                  max="1" 
                  step="0.05" 
                  value={quality} 
                  onChange={(e) => setQuality(parseFloat(e.target.value))} 
                  className="w-full"
                />
              </div>
            </div>

            <div className="flex gap-4 justify-center mt-4">
              <button className="btn btn-secondary" onClick={() => { setFile(null); setConvertedUrl(null); }}>
                Upload Another
              </button>
              <button className="btn btn-primary" onClick={convertImage}>
                {isConverting ? "Converting..." : "Convert to JPG"}
              </button>
              {convertedUrl && (
                <a href={convertedUrl} download={file.name.replace(/\.png$/i, ".jpg")} className="btn btn-success" style={{ backgroundColor: "var(--success)", color: "white" }}>
                  <Download size={16} /> Download
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Ad Banner */}
      <div className="max-w-4xl mx-auto mt-8">
        <AdBanner />
      </div>

      <div className="max-w-3xl mx-auto mt-12 p-6" style={{ backgroundColor: "var(--surface)", borderRadius: "var(--radius-lg)" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>How to convert PNG to JPG?</h2>
        <ol style={{ paddingLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }} className="text-muted">
          <li>Upload your PNG image.</li>
          <li>Choose a background color if your PNG has transparency (JPGs do not support transparency).</li>
          <li>Adjust the desired output quality.</li>
          <li>Click "Convert to JPG".</li>
          <li>Download the final converted JPG image.</li>
        </ol>
      </div>
    </div>
  );
}
