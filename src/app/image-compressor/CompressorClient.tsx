"use client";

import React, { useState, useRef } from "react";
import imageCompression from "browser-image-compression";
import { UploadCloud, Download, Image as ImageIcon } from "lucide-react";
import ImagePreview from "@/components/ImagePreview";

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
          <ImagePreview 
            originalSrc={previewUrl!} 
            resultSrc={compressedUrl} 
            originalLabel="Original Image"
            resultLabel="Compressed Image"
          />
          
          <div className="flex justify-center gap-8 mt-6 text-center">
            <div>
              <p className="text-muted text-sm uppercase tracking-wider mb-1">Original Size</p>
              <p className="font-medium text-lg">{formatBytes(file.size)}</p>
            </div>
            {compressedUrl && compressedFile && (
              <div>
                <p className="text-success text-sm uppercase tracking-wider mb-1">Compressed Size</p>
                <p className="font-medium text-lg text-success">
                  {formatBytes(compressedFile.size)} 
                  <span className="ml-2 text-sm">(-{(100 - (compressedFile.size / file.size) * 100).toFixed(1)}%)</span>
                </p>
              </div>
            )}
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
      <div className="ad-container max-w-4xl mx-auto mt-8 mb-16">Advertisement Space</div>

      {/* How it works */}
      <section className="max-w-4xl mx-auto mb-16 p-8 glass-card">
        <h2 className="mb-6" style={{ fontSize: "1.75rem" }}>How it works</h2>
        <ol style={{ paddingLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }} className="text-muted">
          <li style={{ fontSize: "1.125rem" }}>Drag and drop your JPG, PNG, or WebP file into the upload box.</li>
          <li style={{ fontSize: "1.125rem" }}>Adjust the compression quality slider to your preference.</li>
          <li style={{ fontSize: "1.125rem" }}>Click the "Compress Image" button.</li>
          <li style={{ fontSize: "1.125rem" }}>Compare the original and compressed sizes.</li>
          <li style={{ fontSize: "1.125rem" }}>Download the optimized image instantly!</li>
        </ol>
      </section>

      {/* Supported formats */}
      <section className="max-w-4xl mx-auto mb-16 p-8 glass-card text-center">
        <h2 className="mb-4" style={{ fontSize: "1.75rem" }}>Supported Formats</h2>
        <p className="text-muted" style={{ fontSize: "1.125rem" }}>JPG, JPEG, PNG, WebP</p>
      </section>

      {/* Privacy Guarantee */}
      <div className="glass-card max-w-4xl mx-auto mb-16 text-center p-8">
        <h3 className="mb-2" style={{ fontSize: "1.5rem" }}>Your files stay on your device</h3>
        <p className="text-muted" style={{ fontSize: "1.125rem" }}>
          We use advanced browser technologies to process your files locally. 
          Your data is never uploaded to our servers, guaranteeing 100% privacy and lightning-fast speed.
        </p>
      </div>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto mb-16">
        <h2 className="mb-6" style={{ fontSize: "1.75rem" }}>Frequently Asked Questions</h2>
        <div className="flex flex-col gap-4">
          <div className="glass-card p-6" style={{ padding: "1.5rem" }}>
            <h4 className="mb-2" style={{ fontSize: "1.125rem" }}>Is my image uploaded to a server?</h4>
            <p className="text-muted" style={{ fontSize: "1.125rem" }}>No. Filoza processes your image entirely within your browser for 100% privacy.</p>
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <section className="max-w-4xl mx-auto mb-16">
        <h2 className="mb-6" style={{ fontSize: "1.75rem" }}>Related Tools</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(250px, 100%), 1fr))", gap: "1rem" }}>
          <a href="/image-resizer" className="glass-card flex items-center gap-4 hover:border-primary transition-colors text-inherit no-underline">
            <span className="font-medium">Image Resizer</span>
          </a>
          <a href="/jpg-to-png" className="glass-card flex items-center gap-4 hover:border-primary transition-colors text-inherit no-underline">
            <span className="font-medium">JPG to PNG</span>
          </a>
          <a href="/background-remover" className="glass-card flex items-center gap-4 hover:border-primary transition-colors text-inherit no-underline">
            <span className="font-medium">Background Remover</span>
          </a>
        </div>
      </section>
    </div>
  );
}
