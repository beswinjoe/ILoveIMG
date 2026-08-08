"use client";

import React, { useState, useRef } from "react";
import imageCompression from "browser-image-compression";
import { UploadCloud, Download, Image as ImageIcon } from "lucide-react";

export default function CompressorClient() {
  const [file, setFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(0.8);
  const [isCompressing, setIsCompressing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);

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
    setCompressedFile(null);
    setCompressedUrl(null);
  };

  const compressImage = async () => {
    if (!file) return;
    setIsCompressing(true);

    const options = {
      maxSizeMB: 5,
      maxWidthOrHeight: 4096,
      useWebWorker: true,
      initialQuality: quality,
    };

    try {
      const result = await imageCompression(file, options);
      setCompressedFile(result);
      setCompressedUrl(URL.createObjectURL(result));
    } catch (error) {
      console.error(error);
      alert("Error compressing image.");
    } finally {
      setIsCompressing(false);
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="container" style={{ padding: "3rem 1.5rem" }}>
      <h1 className="text-center" style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
        Image Compressor
      </h1>
      <p className="text-muted text-center max-w-2xl mx-auto mb-8">
        Compress JPG, PNG, and WebP images instantly in your browser. Files are never uploaded to any server.
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
          <p className="text-muted">or click to browse from your device</p>
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
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
            <div>
              <h3 className="mb-4 flex items-center gap-2"><ImageIcon size={20} /> Original Image</h3>
              {previewUrl && <img src={previewUrl} alt="Original" style={{ width: "100%", borderRadius: "var(--radius-sm)", maxHeight: "300px", objectFit: "contain", backgroundColor: "var(--background)" }} />}
              <p className="mt-2 font-medium">Size: {formatBytes(file.size)}</p>
            </div>
            
            <div>
              <h3 className="mb-4 flex items-center gap-2"><ImageIcon size={20} className="text-success" /> Compressed Image</h3>
              {compressedUrl ? (
                <>
                  <img src={compressedUrl} alt="Compressed" style={{ width: "100%", borderRadius: "var(--radius-sm)", maxHeight: "300px", objectFit: "contain", backgroundColor: "var(--background)" }} />
                  <p className="mt-2 font-medium text-success">Size: {formatBytes(compressedFile!.size)} ({(100 - (compressedFile!.size / file.size) * 100).toFixed(1)}% reduction)</p>
                </>
              ) : (
                <div style={{ height: "300px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--background)", borderRadius: "var(--radius-sm)", border: "1px dashed var(--border)" }}>
                  <p className="text-muted">Ready to compress</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 pt-6" style={{ borderTop: "1px solid var(--border)" }}>
            <div className="flex flex-col gap-4 max-w-md mx-auto">
              <div>
                <label className="label flex justify-between">
                  <span>Compression Quality</span>
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
                <p className="text-muted mt-1" style={{ fontSize: "0.75rem" }}>Lower quality means smaller file size.</p>
              </div>

              <div className="flex gap-4 justify-center mt-4">
                <button className="btn btn-secondary" onClick={() => { setFile(null); setCompressedFile(null); }}>
                  Upload Another
                </button>
                <button className="btn btn-primary" onClick={compressImage} disabled={isCompressing}>
                  {isCompressing ? "Compressing..." : "Compress Image"}
                </button>
                {compressedUrl && (
                  <a href={compressedUrl} download={`compressed_${file.name}`} className="btn btn-success" style={{ backgroundColor: "var(--success)", color: "white" }}>
                    <Download size={16} /> Download
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Ad Container */}
      <div className="ad-container max-w-4xl mx-auto mt-8">Advertisement Space</div>

      <div className="max-w-3xl mx-auto mt-12 p-6" style={{ backgroundColor: "var(--surface)", borderRadius: "var(--radius-lg)" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>How to compress images for free?</h2>
        <ol style={{ paddingLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }} className="text-muted">
          <li>Drag and drop your JPG, PNG, or WebP file into the upload box.</li>
          <li>Adjust the compression quality slider to your preference.</li>
          <li>Click the "Compress Image" button.</li>
          <li>Compare the original and compressed sizes.</li>
          <li>Download the optimized image instantly!</li>
        </ol>
      </div>
    </div>
  );
}
