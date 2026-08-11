"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, Download, Image as ImageIcon, ArrowRight, Settings2 } from "lucide-react";
import ImagePreview from "@/components/ImagePreview";

export default function ConverterClient() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  
  const [targetFormat, setTargetFormat] = useState<"image/jpeg" | "image/png" | "image/webp">("image/png");
  const [quality, setQuality] = useState(0.9);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [isConverting, setIsConverting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

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
    setPreviewUrl(URL.createObjectURL(selectedFile));
    setConvertedUrl(null);
    
    // Auto-select a sensible target format
    if (selectedFile.type === "image/png") setTargetFormat("image/jpeg");
    else if (selectedFile.type === "image/jpeg") setTargetFormat("image/png");
    else setTargetFormat("image/jpeg");
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
        // If converting to a format that doesn't support transparency, draw background
        if (targetFormat === "image/jpeg") {
          ctx.fillStyle = bgColor;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        ctx.drawImage(img, 0, 0);
        
        setConvertedUrl(canvas.toDataURL(targetFormat, quality));
        setIsConverting(false);
      }
    };
    img.src = previewUrl;
  };

  const getExtension = (mimeType: string) => {
    switch (mimeType) {
      case "image/webp": return ".webp";
      case "image/jpeg": return ".jpg";
      case "image/png": return ".png";
      default: return ".img";
    }
  };

  const getFormatLabel = (mimeType: string) => {
    switch (mimeType) {
      case "image/webp": return "WebP";
      case "image/jpeg": return "JPG";
      case "image/png": return "PNG";
      default: return "Image";
    }
  };

  return (
    <div className="container" style={{ padding: "3rem 1.5rem" }}>
      <h1 className="text-center" style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
        Universal Image Converter
      </h1>
      <p className="text-muted text-center max-w-2xl mx-auto mb-8">
        Convert images between JPG, PNG, and WebP instantly in your browser.
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
          <p className="text-muted">Supports JPG, PNG, WebP, GIF and more</p>
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
            resultSrc={convertedUrl} 
            originalLabel={`Original ${getFormatLabel(file.type)}`}
            resultLabel={`Converted ${getFormatLabel(targetFormat)}`}
            transparent={file.type !== "image/jpeg" || targetFormat !== "image/jpeg"}
          />

          <div className="mt-8 pt-6 flex flex-col gap-6" style={{ borderTop: "1px solid var(--border)" }}>
            <div className="flex gap-8 justify-center flex-wrap max-w-2xl mx-auto items-end">
              <div>
                <label className="label">Convert To</label>
                <select 
                  className="input" 
                  value={targetFormat} 
                  onChange={(e) => setTargetFormat(e.target.value as any)}
                  style={{ width: "120px" }}
                >
                  <option value="image/jpeg">JPG</option>
                  <option value="image/png">PNG</option>
                  <option value="image/webp">WebP</option>
                </select>
              </div>

              {targetFormat === "image/jpeg" && (
                <div>
                  <label className="label">Background Color</label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="color" 
                      value={bgColor} 
                      onChange={(e) => setBgColor(e.target.value)} 
                      style={{ width: "38px", height: "38px", padding: 0, border: "none", borderRadius: "4px", cursor: "pointer" }}
                    />
                  </div>
                </div>
              )}

              {targetFormat !== "image/png" && (
                <div style={{ flex: 1, minWidth: "200px" }}>
                  <label className="label flex justify-between">
                    <span>Quality</span>
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
              )}
            </div>

            <div className="flex gap-4 justify-center mt-4">
              <button className="btn btn-secondary" onClick={() => { setFile(null); setConvertedUrl(null); }}>
                Upload Another
              </button>
              <button className="btn btn-primary" onClick={convertImage}>
                {isConverting ? "Converting..." : "Convert Image"}
              </button>
              {convertedUrl && (
                <a 
                  href={convertedUrl} 
                  download={`${file.name.replace(/\.[^/.]+$/, "")}${getExtension(targetFormat)}`} 
                  className="btn btn-success" 
                  style={{ backgroundColor: "var(--success)", color: "white" }}
                >
                  <Download size={16} /> Download
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Ad Container */}
      <div className="ad-container max-w-4xl mx-auto mt-8">Advertisement Space</div>

      <div className="max-w-3xl mx-auto mt-12 p-6" style={{ backgroundColor: "var(--surface)", borderRadius: "var(--radius-lg)" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>How to convert images?</h2>
        <ol style={{ paddingLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }} className="text-muted">
          <li>Upload any image file.</li>
          <li>Choose your target format (JPG, PNG, or WebP).</li>
          <li>Adjust quality or background color if necessary.</li>
          <li>Click "Convert Image".</li>
          <li>Download the final converted image instantly to your device.</li>
        </ol>
      </div>
    </div>
  );
}
