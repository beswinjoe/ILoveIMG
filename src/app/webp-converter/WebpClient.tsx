"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, Download, Image as ImageIcon, ArrowRight } from "lucide-react";
import ImagePreview from "@/components/ImagePreview";
import AdBanner from "@/components/AdBanner";

export default function WebpClient() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [targetFormat, setTargetFormat] = useState<"image/webp" | "image/jpeg" | "image/png">("image/webp");
  const [quality, setQuality] = useState(0.85);
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
    
    // Auto-select target format based on input
    if (selectedFile.type === "image/webp") {
      setTargetFormat("image/jpeg");
    } else {
      setTargetFormat("image/webp");
    }
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
        if (targetFormat === "image/jpeg") {
          ctx.fillStyle = "#ffffff";
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
        WebP Converter
      </h1>
      <p className="text-muted text-center max-w-2xl mx-auto mb-8">
        Convert JPG/PNG to WebP format, or convert WebP back to JPG/PNG. 100% free and processed in your browser.
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
          <p className="text-muted">Supports WebP, JPG, PNG</p>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            style={{ display: "none" }} 
            accept="image/jpeg, image/png, image/webp" 
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
            transparent={file.type === "image/png" || targetFormat === "image/png" || file.type === "image/webp" || targetFormat === "image/webp"}
          />

          <div className="mt-8 pt-6 flex flex-col gap-6" style={{ borderTop: "1px solid var(--border)" }}>
            <div className="flex gap-8 justify-center flex-wrap max-w-xl mx-auto items-end">
              <div>
                <label className="label">Convert To</label>
                <select 
                  className="input" 
                  value={targetFormat} 
                  onChange={(e) => setTargetFormat(e.target.value as any)}
                  style={{ width: "150px" }}
                >
                  <option value="image/webp">WebP</option>
                  <option value="image/jpeg">JPG</option>
                  <option value="image/png">PNG</option>
                </select>
              </div>

              {targetFormat !== "image/png" && (
                <div style={{ flex: 1 }}>
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

      {/* Ad Banner */}
      <div className="max-w-4xl mx-auto mt-8">
        <AdBanner />
      </div>

      <div className="max-w-3xl mx-auto mt-12 p-6" style={{ backgroundColor: "var(--surface)", borderRadius: "var(--radius-lg)" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Why use WebP?</h2>
        <p className="text-muted mb-4">
          WebP is a modern image format that provides superior lossless and lossy compression for images on the web. 
          Using WebP, webmasters and web developers can create smaller, richer images that make the web faster.
        </p>
        <ol style={{ paddingLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }} className="text-muted">
          <li>Upload any supported image format.</li>
          <li>Select the desired output format (WebP, JPG, or PNG).</li>
          <li>Adjust the quality slider (if applicable).</li>
          <li>Convert and download your optimized file securely.</li>
        </ol>
      </div>
    </div>
  );
}
