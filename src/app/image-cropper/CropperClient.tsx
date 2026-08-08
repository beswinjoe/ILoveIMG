"use client";

import React, { useState, useRef, useEffect } from "react";
import ReactCrop, { type Crop, centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { UploadCloud, Download, Image as ImageIcon, Crop as CropIcon } from "lucide-react";

export default function CropperClient() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [croppedUrl, setCroppedUrl] = useState<string | null>(null);
  
  const [crop, setCrop] = useState<Crop>();
  const [aspect, setAspect] = useState<number | undefined>(undefined);
  
  const imgRef = useRef<HTMLImageElement>(null);
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
    setCroppedUrl(null);
    setCrop(undefined);
  };

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      const crop = centerCrop(
        makeAspectCrop(
          {
            unit: "%",
            width: 90,
          },
          aspect,
          width,
          height
        ),
        width,
        height
      );
      setCrop(crop);
    }
  }

  const handleAspectChange = (newAspect: number | undefined) => {
    setAspect(newAspect);
    if (newAspect && imgRef.current) {
      const { width, height } = imgRef.current;
      const newCrop = centerCrop(
        makeAspectCrop(
          {
            unit: "%",
            width: 90,
          },
          newAspect,
          width,
          height
        ),
        width,
        height
      );
      setCrop(newCrop);
    }
  };

  const applyCrop = () => {
    if (!imgRef.current || !crop || crop.width === 0 || crop.height === 0 || !file) return;

    const image = imgRef.current;
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    
    canvas.width = crop.width * scaleX;
    canvas.height = crop.height * scaleY;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );

    const format = file.type === "image/png" ? "image/png" : "image/jpeg";
    setCroppedUrl(canvas.toDataURL(format, 1));
  };

  return (
    <div className="container" style={{ padding: "3rem 1.5rem" }}>
      <h1 className="text-center" style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
        Image Cropper
      </h1>
      <p className="text-muted text-center max-w-2xl mx-auto mb-8">
        Crop your images online easily. Free, fast, and completely secure—no uploads required.
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
      ) : !croppedUrl ? (
        <div className="card max-w-4xl mx-auto mt-8">
          <div className="flex flex-col items-center gap-6">
            <div className="flex gap-4 mb-4 overflow-x-auto w-full justify-center">
              <button className={`btn ${aspect === undefined ? "btn-primary" : "btn-secondary"}`} onClick={() => handleAspectChange(undefined)}>Free</button>
              <button className={`btn ${aspect === 1 ? "btn-primary" : "btn-secondary"}`} onClick={() => handleAspectChange(1)}>1:1</button>
              <button className={`btn ${aspect === 16/9 ? "btn-primary" : "btn-secondary"}`} onClick={() => handleAspectChange(16/9)}>16:9</button>
              <button className={`btn ${aspect === 4/3 ? "btn-primary" : "btn-secondary"}`} onClick={() => handleAspectChange(4/3)}>4:3</button>
              <button className={`btn ${aspect === 9/16 ? "btn-primary" : "btn-secondary"}`} onClick={() => handleAspectChange(9/16)}>9:16</button>
            </div>

            <div style={{ maxHeight: "60vh", overflow: "auto", display: "flex", justifyContent: "center", width: "100%", backgroundColor: "var(--background)", padding: "1rem", borderRadius: "var(--radius-sm)" }}>
              {previewUrl && (
                <ReactCrop 
                  crop={crop} 
                  onChange={(c) => setCrop(c)} 
                  aspect={aspect}
                >
                  <img 
                    ref={imgRef} 
                    src={previewUrl} 
                    alt="Crop preview" 
                    onLoad={onImageLoad}
                    style={{ maxHeight: "50vh", width: "auto" }}
                  />
                </ReactCrop>
              )}
            </div>

            <div className="flex gap-4 justify-center mt-4 w-full" style={{ borderTop: "1px solid var(--border)", paddingTop: "1.5rem" }}>
              <button className="btn btn-secondary" onClick={() => { setFile(null); setCrop(undefined); }}>
                Upload Another
              </button>
              <button className="btn btn-primary" onClick={applyCrop}>
                <CropIcon size={16} /> Apply Crop
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="card max-w-2xl mx-auto mt-8 text-center">
          <h3 className="mb-4">Cropped Image</h3>
          <img src={croppedUrl} alt="Cropped" style={{ maxWidth: "100%", maxHeight: "50vh", margin: "0 auto", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)" }} />
          
          <div className="flex gap-4 justify-center mt-6">
            <button className="btn btn-secondary" onClick={() => setCroppedUrl(null)}>
              Edit Crop
            </button>
            <a href={croppedUrl} download={`cropped_${file.name}`} className="btn btn-success" style={{ backgroundColor: "var(--success)", color: "white" }}>
              <Download size={16} /> Download
            </a>
          </div>
        </div>
      )}

      {/* Ad Container */}
      <div className="ad-container max-w-4xl mx-auto mt-8">Advertisement Space</div>

      <div className="max-w-3xl mx-auto mt-12 p-6" style={{ backgroundColor: "var(--surface)", borderRadius: "var(--radius-lg)" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>How to crop an image?</h2>
        <ol style={{ paddingLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }} className="text-muted">
          <li>Upload the image you want to crop.</li>
          <li>Choose a preset aspect ratio (like 1:1 or 16:9) or use "Free" for custom sizes.</li>
          <li>Drag the handles on the image to select the area you want to keep.</li>
          <li>Click "Apply Crop" to see the result.</li>
          <li>Download the final cropped image to your device.</li>
        </ol>
      </div>
    </div>
  );
}
