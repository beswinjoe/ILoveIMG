"use client";

import React, { useState, useRef } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { UploadCloud, ArchiveRestore, Download, File as FileIcon, Folder, AlertTriangle } from "lucide-react";
interface ExtractedFile {
  name: string;
  path: string;
  size: number;
  isDir: boolean;
  zipObject: JSZip.JSZipObject;
}
export default function ZipExtractorClient() {
  const [archiveFile, setArchiveFile] = useState<File | null>(null);
  const [extractedFiles, setExtractedFiles] = useState<ExtractedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadingFile, setDownloadingFile] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      loadZip(e.dataTransfer.files[0]);
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      loadZip(e.target.files[0]);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const loadZip = async (file: File) => {
    if (!file.name.toLowerCase().endsWith('.zip')) {
      setError("Please select a valid .zip file.");
      return;
    }
    setArchiveFile(file);
    setIsProcessing(true);
    setError(null);
    setExtractedFiles([]);
    try {
      const zip = new JSZip();
      const contents = await zip.loadAsync(file);
      const filesList: ExtractedFile[] = [];
      contents.forEach((relativePath, zipEntry) => {
        // We can skip pure directories for the flat list view, or include them with a folder icon
        // Usually, users just want to download the files.
        if (!zipEntry.dir) {
          // @ts-expect-error - _data is a private property in JSZip but we need it for size if available
          const size = zipEntry._data ? zipEntry._data.uncompressedSize : 0;
          filesList.push({
            name: zipEntry.name.split('/').pop() || zipEntry.name,
            path: relativePath,
            size: size || 0,
            isDir: zipEntry.dir,
            zipObject: zipEntry
          });
        }
      });
      setExtractedFiles(filesList);
    } catch (err) {
      console.error(err);
      setError("Failed to read the ZIP file. It might be corrupted or password protected.");
      setArchiveFile(null);
    } finally {
      setIsProcessing(false);
    }
  };
  const downloadFile = async (item: ExtractedFile) => {
    try {
      setDownloadingFile(item.path);
      const blob = await item.zipObject.async("blob");
      saveAs(blob, item.name);
    } catch (err) {
      console.error(err);
      alert(`Failed to extract ${item.name}`);
    } finally {
      setDownloadingFile(null);
    }
  };
  const clearArchive = () => {
    setArchiveFile(null);
    setExtractedFiles([]);
    setError(null);
  };
  const formatBytes = (bytes: number) => {
    if (!bytes || bytes === 0) return 'Unknown size';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  return <>
      {!archiveFile ? <div className="max-w-2xl mx-auto flex flex-col gap-4">
          {error && <div className="bg-danger bg-opacity-10 text-danger p-4 rounded-lg flex items-center gap-3">
              <AlertTriangle size={20} />
              <span>{error}</span>
            </div>}
          
          <div className="dropzone" onDrop={handleDrop} onDragOver={e => e.preventDefault()} onClick={() => fileInputRef.current?.click()}>
            <UploadCloud className="dropzone-icon" />
            <h3>Drag & Drop your .zip file here</h3>
            <p className="text-muted">or click to browse from your device</p>
            <input type="file" ref={fileInputRef} className="hidden" style={{
          display: "none"
        }} accept=".zip,application/zip" onChange={handleFileChange} />
          </div>
        </div> : <div className="card max-w-4xl mx-auto mt-8 p-6 glass-card">
          <div className="flex justify-between items-center mb-6 pb-4" style={{
        borderBottom: "1px solid var(--border)"
      }}>
            <div>
              <h3 className="font-bold text-xl flex items-center gap-2">
                <ArchiveRestore size={24} className="text-primary" />
                {archiveFile.name}
              </h3>
              <p className="text-muted text-sm mt-1">{extractedFiles.length} files found</p>
            </div>
            
            <button className="btn btn-secondary text-sm" onClick={clearArchive}>
              Close Archive
            </button>
          </div>

          {isProcessing ? <div className="text-center py-12">
              <div className="animate-spin text-primary mx-auto mb-4" style={{
          width: "40px",
          height: "40px",
          border: "3px solid transparent",
          borderTopColor: "currentColor",
          borderRadius: "50%"
        }}></div>
              <p className="text-lg font-medium">Reading archive contents...</p>
            </div> : <div className="max-h-[500px] overflow-y-auto pr-2 custom-scrollbar" style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
      }}>
              {extractedFiles.map((item, idx) => <div key={idx} className="flex justify-between items-center p-4 rounded-lg" style={{
          backgroundColor: "rgba(255,255,255,0.4)",
          border: "1px solid var(--border)"
        }}>
                  <div className="flex items-center gap-4 overflow-hidden">
                    {item.isDir ? <Folder size={20} className="text-primary flex-shrink-0" /> : <FileIcon size={20} className="text-muted flex-shrink-0" />}
                    <div className="flex flex-col overflow-hidden">
                      <span className="truncate text-base font-medium">{item.name}</span>
                      <span className="text-xs text-muted truncate">{item.path}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 flex-shrink-0 ml-4">
                    <span className="text-sm font-medium text-muted hidden sm:inline-block w-20 text-right">{formatBytes(item.size)}</span>
                    <button onClick={() => downloadFile(item)} className="btn btn-primary btn-sm flex items-center gap-2" disabled={downloadingFile === item.path}>
                      {downloadingFile === item.path ? <div className="animate-spin" style={{
                width: "16px",
                height: "16px",
                border: "2px solid transparent",
                borderTopColor: "currentColor",
                borderRadius: "50%"
              }}></div> : <Download size={16} />}
                      <span className="hidden sm:inline">Extract</span>
                    </button>
                  </div>
                </div>)}
            </div>}
        </div>}
    </>;
}