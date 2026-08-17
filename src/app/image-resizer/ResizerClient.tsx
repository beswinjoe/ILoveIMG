"use client";

import React, { useState, useRef, useEffect } from "react";
import { UploadCloud, Download, Image as ImageIcon, Lock, Unlock } from "lucide-react";
import ImagePreview from "@/components/ImagePreview";
import AdBanner from "@/components/AdBanner";

export default function ResizerClient() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [resizedUrl, setResizedUrl] = useState<string | null>(null);
  
  const [originalWidth, setOriginalWidth] = useState(0);
  const [originalHeight, setOriginalHeight] = useState(0);
  
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [keepAspectRatio, setKeepAspectRatio] = useState(true);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (selectedFile: File) => {
    if (!selectedFile.type.startsWith("image/")) {
      alert("Please upload an image file.");
      return;
    }
    setFile(selectedFile);
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);
    setResizedUrl(null);
    
    // Load image to get original dimensions
    const img = new Image();
    img.onload = () => {
      setOriginalWidth(img.width);
      setOriginalHeight(img.height);
      setWidth(img.width);
      setHeight(img.height);
    };
    img.src = url;
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWidth = parseInt(e.target.value) || 0;
    setWidth(newWidth);
    if (keepAspectRatio && originalWidth > 0) {
      setHeight(Math.round((newWidth / originalWidth) * originalHeight));
    }
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHeight = parseInt(e.target.value) || 0;
    setHeight(newHeight);
    if (keepAspectRatio && originalHeight > 0) {
      setWidth(Math.round((newHeight / originalHeight) * originalWidth));
    }
  };

  const resizeImage = () => {
    if (!file || !previewUrl || width <= 0 || height <= 0) return;
    
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        const format = file.type === "image/png" ? "image/png" : "image/jpeg";
        setResizedUrl(canvas.toDataURL(format, 0.9));
      }
    };
    img.src = previewUrl;
  };

  return (
    <div className="container" style={{ padding: "3rem 1.5rem" }}>
      <h1 className="text-center" style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
        Image Resizer
      </h1>
      <p className="text-muted text-center max-w-2xl mx-auto mb-8">
        Resize your images by pixel width and height online for free. Keep aspect ratio or stretch freely.
      </p>

      {!file ? (
        <div 
          className="dropzone max-w-2xl mx-auto" 
          onDrop={handleDrop} 
          onDragOver={(e) => e.preventDefault()}
          onClick={() => fileInputRef.current?.click()}
        >
          <UploadCloud className="dropzone-icon" />
          <h3>Drag & Drop your image here</h3>
          <p className="text-muted">or click to browse</p>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            style={{ display: "none" }} 
            accept="image/*" 
            onChange={(e) => e.target.files && handleFileChange(e.target.files[0])} 
          />
        </div>
      ) : (
        <div className="card max-w-4xl mx-auto mt-8">
          <ImagePreview 
            originalSrc={previewUrl!} 
            resultSrc={resizedUrl} 
            originalLabel="Original Image"
            resultLabel="Resized Preview"
          />
          
          <div className="flex justify-center gap-8 mt-6 text-center">
            <div>
              <p className="text-muted text-sm uppercase tracking-wider mb-1">Original Size</p>
              <p className="font-medium text-lg text-muted">{originalWidth} × {originalHeight} px</p>
            </div>
            {resizedUrl && (
              <div>
                <p className="text-primary text-sm uppercase tracking-wider mb-1">Resized Size</p>
                <p className="font-medium text-lg text-primary">{width} × {height} px</p>
              </div>
            )}
          </div>

          <div className="mt-8 pt-6 flex flex-col gap-6" style={{ borderTop: "1px solid var(--border)" }}>
            <div className="flex gap-4 justify-center items-end">
              <div>
                <label className="label">Width (px)</label>
                <input 
                  type="number" 
                  value={width} 
                  onChange={handleWidthChange}
                  className="input"
                  style={{ width: "120px" }}
                />
              </div>
              
              <button 
                className="btn btn-secondary"
                style={{ padding: "0.5rem" }}
                onClick={() => setKeepAspectRatio(!keepAspectRatio)}
                title={keepAspectRatio ? "Unlock aspect ratio" : "Lock aspect ratio"}
              >
                {keepAspectRatio ? <Lock size={20} /> : <Unlock size={20} className="text-muted" />}
              </button>
              
              <div>
                <label className="label">Height (px)</label>
                <input 
                  type="number" 
                  value={height} 
                  onChange={handleHeightChange}
                  className="input"
                  style={{ width: "120px" }}
                />
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <button className="btn btn-secondary" onClick={() => { setFile(null); setResizedUrl(null); }}>
                Upload Another
              </button>
              <button className="btn btn-primary" onClick={resizeImage}>
                Resize Image
              </button>
              {resizedUrl && (
                <a href={resizedUrl} download={`resized_${file.name}`} className="btn btn-success" style={{ backgroundColor: "var(--success)", color: "white" }}>
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
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>How to resize an image?</h2>
        <ol style={{ paddingLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }} className="text-muted">
          <li>Upload your image using the box above.</li>
          <li>Enter your desired width and height in pixels.</li>
          <li>Keep the aspect ratio locked to avoid stretching, or unlock it for custom dimensions.</li>
          <li>Click "Resize Image" and preview the result.</li>
          <li>Download the resized image instantly to your device.</li>
        </ol>
      </div>
    </div>
  );
}
