"use client";

import React, { useState, useRef } from "react";
import imageCompression from "browser-image-compression";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import AdBanner from "@/components/AdBanner";
import { UploadCloud, Download, FileArchive, CheckCircle2, Circle } from "lucide-react";

interface ProcessedFile {
  id: string;
  originalFile: File;
  compressedFile: File | null;
  status: "pending" | "compressing" | "done" | "error";
  compressedUrl: string | null;
}

export default function BulkCompressorClient() {
  const [files, setFiles] = useState<ProcessedFile[]>([]);
  const [quality, setQuality] = useState(0.8);
  const [isProcessingAll, setIsProcessingAll] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFilesChange(Array.from(e.dataTransfer.files));
    }
  };

  const handleFilesChange = (selectedFiles: File[]) => {
    const validFiles = selectedFiles.filter(f => f.type.startsWith("image/"));
    if (validFiles.length === 0) {
      alert("Please upload valid image files.");
      return;
    }
    
    const newFiles: ProcessedFile[] = validFiles.map(file => ({
      id: Math.random().toString(36).substring(7),
      originalFile: file,
      compressedFile: null,
      status: "pending",
      compressedUrl: null,
    }));
    
    setFiles(prev => [...prev, ...newFiles]);
  };

  const compressAll = async () => {
    if (files.length === 0) return;
    setIsProcessingAll(true);

    const options = {
      maxSizeMB: 5,
      maxWidthOrHeight: 4096,
      useWebWorker: true,
      initialQuality: quality,
    };

    const updatedFiles = [...files];

    for (let i = 0; i < updatedFiles.length; i++) {
      if (updatedFiles[i].status === "done") continue;
      
      updatedFiles[i].status = "compressing";
      setFiles([...updatedFiles]); // trigger re-render

      try {
        const result = await imageCompression(updatedFiles[i].originalFile, options);
        updatedFiles[i].compressedFile = result;
        updatedFiles[i].compressedUrl = URL.createObjectURL(result);
        updatedFiles[i].status = "done";
      } catch (error) {
        console.error(error);
        updatedFiles[i].status = "error";
      }
      
      setFiles([...updatedFiles]); // trigger re-render
    }

    setIsProcessingAll(false);
  };

  const downloadAllZip = async () => {
    const doneFiles = files.filter(f => f.status === "done" && f.compressedFile);
    if (doneFiles.length === 0) return;

    const JSZipModule = (await import("jszip")).default;
    const saveAsModule = (await import("file-saver")).saveAs;

    const zip = new JSZipModule();
    doneFiles.forEach(f => {
      zip.file(`compressed_${f.originalFile.name}`, f.compressedFile!);
    });

    const content = await zip.generateAsync({ type: "blob" });
    saveAsModule(content, "ImageTools_Compressed.zip");
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const totalOriginalSize = files.reduce((acc, f) => acc + f.originalFile.size, 0);
  const totalCompressedSize = files.reduce((acc, f) => acc + (f.compressedFile?.size || f.originalFile.size), 0);
  const spaceSaved = totalOriginalSize - totalCompressedSize;
  const allDone = files.length > 0 && files.every(f => f.status === "done" || f.status === "error");

  return (
    <div className="container" style={{ padding: "3rem 1.5rem" }}>
      <h1 className="text-center" style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
        Bulk Image Compressor
      </h1>
      <p className="text-muted text-center max-w-2xl mx-auto mb-8">
        Compress multiple images at once to save time and space. Everything is processed directly in your browser.
      </p>

      <div 
        className="dropzone max-w-4xl mx-auto" 
        onDrop={handleDrop} 
        onDragOver={(e) => e.preventDefault()}
        onClick={() => fileInputRef.current?.click()}
        style={{ padding: files.length > 0 ? "2rem" : "4rem", marginBottom: "2rem" }}
      >
        <UploadCloud className="dropzone-icon" />
        <h3>Drag & Drop multiple images here</h3>
        <p className="text-muted">or click to browse</p>
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          style={{ display: "none" }} 
          accept="image/jpeg, image/png, image/webp" 
          multiple
          onChange={(e) => e.target.files && handleFilesChange(Array.from(e.target.files))} 
        />
      </div>

      {files.length > 0 && (
        <div className="card max-w-4xl mx-auto mb-8">
          <div className="flex justify-between items-center mb-6 pb-4" style={{ borderBottom: "1px solid var(--border)" }}>
            <div>
              <h3 style={{ fontSize: "1.25rem" }}>{files.length} {files.length === 1 ? "File" : "Files"} Added</h3>
              <p className="text-muted">
                Original Size: {formatBytes(totalOriginalSize)}
                {allDone && spaceSaved > 0 && ` • Saved: ${formatBytes(spaceSaved)}`}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-muted text-sm">Quality:</span>
                <input 
                  type="range" 
                  min="0.1" 
                  max="1" 
                  step="0.05" 
                  value={quality} 
                  onChange={(e) => setQuality(parseFloat(e.target.value))} 
                  disabled={isProcessingAll}
                  style={{ width: "100px" }}
                />
              </div>
              <button 
                className="btn btn-primary" 
                onClick={compressAll} 
                disabled={isProcessingAll || allDone}
              >
                {isProcessingAll ? "Compressing..." : allDone ? "Done" : "Compress All"}
              </button>
              {allDone && (
                <button className="btn btn-success" onClick={downloadAllZip} style={{ backgroundColor: "var(--success)", color: "white", border: "none" }}>
                  <FileArchive size={16} /> Download ZIP
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto pr-2">
            {files.map(f => (
              <div key={f.id} className="flex justify-between items-center p-3 rounded" style={{ backgroundColor: "var(--background)", border: "1px solid var(--border)" }}>
                <div className="flex items-center gap-3">
                  {f.status === "done" ? <CheckCircle2 className="text-success" size={20} /> : f.status === "compressing" ? <span className="animate-spin text-primary">⏳</span> : <Circle className="text-muted" size={20} />}
                  <span style={{ maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={f.originalFile.name}>{f.originalFile.name}</span>
                </div>
                
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-muted">{formatBytes(f.originalFile.size)}</span>
                  {f.status === "done" && f.compressedFile && (
                    <>
                      <span>→</span>
                      <span className="font-medium text-success">{formatBytes(f.compressedFile.size)}</span>
                      <span className="text-muted text-xs">(-{((1 - f.compressedFile.size / f.originalFile.size) * 100).toFixed(0)}%)</span>
                      {f.compressedUrl && (
                        <a href={f.compressedUrl} download={`compressed_${f.originalFile.name}`} className="btn btn-secondary" style={{ padding: "0.25rem 0.5rem", fontSize: "0.75rem" }}>
                          <Download size={14} />
                        </a>
                      )}
                    </>
                  )}
                  {f.status === "error" && <span className="text-danger">Failed</span>}
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-6">
            <button className="btn btn-secondary text-sm" onClick={() => setFiles([])} disabled={isProcessingAll}>
              Clear List
            </button>
          </div>
        </div>
      )}

      {/* Ad Banner */}
      <div className="max-w-4xl mx-auto mt-8">
        <AdBanner />
      </div>
    </div>
  );
}
