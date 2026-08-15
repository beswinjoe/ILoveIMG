"use client";

import React, { useState, useRef, useEffect } from "react";
import { saveAs } from "file-saver";
import { UploadCloud, ArchiveRestore, Download, File as FileIcon, Folder, AlertTriangle } from "lucide-react";
interface ExtractedFile {
  name: string;
  path: string;
  size: number;
  isDir: boolean;
  fileObj: File;
}
export default function RarExtractorClient() {
  const [archiveFile, setArchiveFile] = useState<File | null>(null);
  const [extractedFiles, setExtractedFiles] = useState<ExtractedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    // Initialize libarchive.js dynamically to avoid SSR issues
    import("libarchive.js").then(({
      Archive
    }) => {
      Archive.init({
        workerUrl: '/worker-bundle.js'
      });
      setIsReady(true);
    }).catch(err => {
      console.error("Failed to load libarchive.js", err);
      setError("Failed to load the archive engine. Please refresh the page.");
    });
  }, []);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      loadArchive(e.dataTransfer.files[0]);
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      loadArchive(e.target.files[0]);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const flattenArchive = async (obj: Record<string, unknown>, path: string = ""): Promise<ExtractedFile[]> => {
    let files: ExtractedFile[] = [];
    for (const [key, val] of Object.entries(obj)) {
      if (val instanceof File) {
        files.push({
          name: val.name,
          path: path + val.name,
          size: val.size,
          isDir: false,
          fileObj: val
        });
      } else if (typeof val === 'object' && val !== null) {
        // It's a directory
        const subFiles = await flattenArchive(val as Record<string, unknown>, path + key + "/");
        files = [...files, ...subFiles];
      }
    }
    return files;
  };
  const loadArchive = async (file: File) => {
    if (file.name.toLowerCase().endsWith('.rar')) {
      setError("RAR extraction is currently unavailable. Reliable client-side extraction of RAR5 is not supported by standard browser engines.");
      return;
    }
    if (!file.name.toLowerCase().match(/\.(7z|tar|gz|bz2|xz)$/)) {
      setError("Please select a valid supported archive file (.7z, .tar, .gz).");
      return;
    }

    // Prevent blowing out WASM memory with massive files
    if (file.size > 50 * 1024 * 1024) {
      setError("This archive is too large (>50MB) to extract safely in the browser. Please select a smaller archive.");
      return;
    }
    setArchiveFile(file);
    setIsProcessing(true);
    setError(null);
    setExtractedFiles([]);
    try {
      const {
        Archive
      } = await import("libarchive.js");
      const extractionPromise = (async () => {
        const archive = await Archive.open(file);
        // Warning: extractFiles() will hang on unsupported compression (e.g. solid 7z)
        await archive.extractFiles();
        const filesObject = await archive.getFilesObject();
        return await flattenArchive(filesObject as Record<string, unknown>);
      })();

      // Strict 30-second timeout to prevent infinite UI hang
      const timeoutPromise = new Promise<ExtractedFile[]>((_, reject) => {
        setTimeout(() => reject(new Error("Extraction took longer than expected. The archive may be too large or use an unsupported compression method.")), 30000);
      });
      const filesList = await Promise.race([extractionPromise, timeoutPromise]);
      setExtractedFiles(filesList);
    } catch (err: unknown) {
      console.error(err);
      const errorMsg = err instanceof Error ? err.message : "Unknown error";
      setError(`Failed to read the archive file. ${errorMsg}`);
      setArchiveFile(null);
    } finally {
      setIsProcessing(false);
    }
  };
  const downloadFile = async (item: ExtractedFile) => {
    try {
      saveAs(item.fileObj, item.name);
    } catch (err) {
      console.error(err);
      alert(`Failed to extract ${item.name}`);
    }
  };
  const clearArchive = () => {
    setArchiveFile(null);
    setExtractedFiles([]);
    setError(null);
  };
  const formatBytes = (bytes: number) => {
    if (!bytes || bytes === 0) return '0 Bytes';
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
          
          <div className={`dropzone ${!isReady ? 'opacity-50 pointer-events-none' : ''}`} onDrop={handleDrop} onDragOver={e => e.preventDefault()} onClick={() => fileInputRef.current?.click()}>
            <UploadCloud className="dropzone-icon" />
            <h3>{isReady ? "Drag & Drop your .rar / .7z file here" : "Loading extraction engine..."}</h3>
            <p className="text-muted">or click to browse from your device</p>
            <input type="file" ref={fileInputRef} className="hidden" style={{
          display: "none"
        }} accept=".7z,.tar,.gz,.bz2" onChange={handleFileChange} disabled={!isReady} />
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
              <p className="text-sm text-muted mt-2">This may take a moment for larger archives.</p>
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
                    <button onClick={() => downloadFile(item)} className="btn btn-primary btn-sm flex items-center gap-2">
                      <Download size={16} />
                      <span className="hidden sm:inline">Extract</span>
                    </button>
                  </div>
                </div>)}
            </div>}
        </div>}
    </>;
}