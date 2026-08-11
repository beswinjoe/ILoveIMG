"use client";

import React, { useState, useRef } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { UploadCloud, FileArchive, X, Download, File as FileIcon } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";

export default function ZipCreatorClient() {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [zipUrl, setZipUrl] = useState<string | null>(null);
  const [zipSize, setZipSize] = useState<number>(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addFiles(Array.from(e.target.files));
    }
    // Reset input so the same files can be selected again if needed
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const addFiles = (newFiles: File[]) => {
    setFiles((prev) => [...prev, ...newFiles]);
    setZipUrl(null);
    setProgress(0);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setZipUrl(null);
    setProgress(0);
  };

  const clearFiles = () => {
    setFiles([]);
    setZipUrl(null);
    setProgress(0);
  };

  const createZip = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    setProgress(0);

    try {
      const zip = new JSZip();
      
      // Add all files to the zip
      files.forEach((file) => {
        zip.file(file.name, file);
      });

      // Generate the zip file asynchronously
      const blob = await zip.generateAsync(
        { type: "blob", compression: "DEFLATE", compressionOptions: { level: 6 } },
        (metadata) => {
          setProgress(Math.round(metadata.percent));
        }
      );

      setZipSize(blob.size);
      const url = URL.createObjectURL(blob);
      setZipUrl(url);
    } catch (error) {
      console.error(error);
      alert("An error occurred while creating the ZIP archive.");
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadZip = () => {
    if (zipUrl) {
      saveAs(zipUrl, `archive_${Date.now()}.zip`);
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const totalSize = files.reduce((acc, file) => acc + file.size, 0);

  return (
    <ToolLayout
      title="ZIP Creator"
      description="Combine multiple files into a single ZIP archive locally. Secure, private, and fast."
      breadcrumbs={[{ label: "Archive", href: "/#archive" }, { label: "ZIP Creator", href: "/zip-creator" }]}
      howItWorks={[
        "Drag and drop any files into the upload box.",
        "Add or remove files from the list as needed.",
        "Click 'Create ZIP Archive'.",
        "Wait for the compression to finish and download your ZIP file."
      ]}
      supportedFormats="Any file format"
      faq={[
        { question: "Is it safe to zip my files here?", answer: "Yes! All zipping is done completely in your web browser. Your files never leave your device." },
        { question: "Is there a file size limit?", answer: "The only limit is your device's memory. Extremely large files might cause your browser to crash, but typical usage is perfectly fine." }
      ]}
      relatedTools={[
        { name: "ZIP Extractor", href: "/zip-extractor", icon: <FileArchive /> },
        { name: "Large File Transfer", href: "/file-transfer", icon: <UploadCloud /> },
      ]}
    >
      {!zipUrl && files.length === 0 ? (
        <div 
          className="dropzone max-w-2xl mx-auto" 
          onDrop={handleDrop} 
          onDragOver={(e) => e.preventDefault()}
          onClick={() => fileInputRef.current?.click()}
        >
          <UploadCloud className="dropzone-icon" />
          <h3>Drag & Drop your files here</h3>
          <p className="text-muted">or click to browse from your device</p>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            style={{ display: "none" }} 
            multiple
            onChange={handleFileChange} 
          />
        </div>
      ) : (
        <div className="card max-w-3xl mx-auto mt-8 p-6 glass-card">
          <div className="flex justify-between items-center mb-6 pb-4" style={{ borderBottom: "1px solid var(--border)" }}>
            <h3 className="font-medium text-lg flex items-center gap-2">
              <FileIcon size={20} className="text-primary" />
              {files.length} {files.length === 1 ? 'file' : 'files'} selected
            </h3>
            <span className="text-muted text-sm font-medium">Total: {formatBytes(totalSize)}</span>
          </div>

          {!zipUrl ? (
            <>
              <div className="max-h-[300px] overflow-y-auto mb-6 pr-2 custom-scrollbar" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {files.map((file, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: "rgba(255,255,255,0.4)", border: "1px solid var(--border)" }}>
                    <div className="flex items-center gap-3 overflow-hidden">
                      <FileIcon size={16} className="text-muted flex-shrink-0" />
                      <span className="truncate text-sm font-medium">{file.name}</span>
                    </div>
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <span className="text-xs text-muted">{formatBytes(file.size)}</span>
                      <button 
                        onClick={() => removeFile(idx)}
                        className="text-muted hover:text-danger transition-colors p-1"
                        aria-label="Remove file"
                        disabled={isProcessing}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {isProcessing && (
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-primary">Creating ZIP...</span>
                    <span className="font-medium">{progress}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2.5 overflow-hidden">
                    <div className="bg-primary h-2.5 transition-all duration-300 ease-out" style={{ width: `${progress}%` }}></div>
                  </div>
                </div>
              )}

              <div className="flex justify-center gap-4 pt-4" style={{ borderTop: "1px solid var(--border)" }}>
                <button 
                  className="btn btn-secondary" 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isProcessing}
                >
                  Add More
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  style={{ display: "none" }} 
                  multiple
                  onChange={handleFileChange} 
                />
                <button 
                  className="btn btn-secondary text-danger hover:bg-danger hover:bg-opacity-10" 
                  onClick={clearFiles}
                  disabled={isProcessing}
                >
                  Clear All
                </button>
                <button 
                  className="btn btn-primary ml-auto flex items-center gap-2" 
                  onClick={createZip} 
                  disabled={isProcessing || files.length === 0}
                >
                  <FileArchive size={18} />
                  {isProcessing ? "Processing..." : "Create ZIP Archive"}
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-success bg-opacity-10 text-success rounded-full flex items-center justify-center mx-auto mb-6">
                <FileArchive size={40} />
              </div>
              <h2 className="text-2xl font-bold mb-2">ZIP Created Successfully!</h2>
              <p className="text-muted mb-8 text-lg">Your files have been compressed down to {formatBytes(zipSize)}.</p>
              
              <div className="flex justify-center gap-4">
                <button className="btn btn-secondary" onClick={clearFiles}>
                  Start Over
                </button>
                <button className="btn btn-success flex items-center gap-2 px-8" onClick={downloadZip}>
                  <Download size={20} />
                  Download ZIP
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </ToolLayout>
  );
}
