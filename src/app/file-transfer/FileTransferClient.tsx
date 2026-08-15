"use client";

import React, { useState, useRef, useEffect } from "react";
import { UploadCloud, Send, Lock, Calendar, Link as LinkIcon, CheckCircle, Copy, X, File as FileIcon } from "lucide-react";
import { QRCodeSVG } from 'qrcode.react';
export default function FileTransferClient() {
  const [files, setFiles] = useState<File[]>([]);
  const [password, setPassword] = useState("");
  const [expiresInDays, setExpiresInDays] = useState(7);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [memoryWarning, setMemoryWarning] = useState(false);
  const [shareId, setShareId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [transferMode, setTransferMode] = useState<"file" | "text">("file");
  const [textContent, setTextContent] = useState("");
  const [customSlug, setCustomSlug] = useState("");
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
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const addFiles = (newFiles: File[]) => {
    const totalNewSize = newFiles.reduce((acc, f) => acc + f.size, 0);
    const currentTotalSize = files.reduce((acc, f) => acc + f.size, 0);
    const maxSizeMB = parseInt(process.env.NEXT_PUBLIC_MAX_FILE_SIZE_MB || '300');
    if (totalNewSize + currentTotalSize > maxSizeMB * 1024 * 1024) {
      setUploadError(`Maximum transfer size is ${maxSizeMB} MB.`);
      return;
    }
    if (totalNewSize > 100 * 1024 * 1024) {
      setMemoryWarning(true);
    }
    setFiles(prev => [...prev, ...newFiles]);
    setUploadError(null);
  };
  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };
  const uploadFileXHR = (blob: Blob, url: string, onProgress: (loaded: number) => void): Promise<void> => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("PUT", url, true);
      xhr.setRequestHeader("Content-Type", "application/octet-stream");
      xhr.upload.onprogress = e => {
        if (e.lengthComputable) {
          onProgress(e.loaded);
        }
      };
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve();
        } else {
          reject(new Error(`Upload failed with status ${xhr.status}`));
        }
      };
      xhr.onerror = () => reject(new Error("Network error during upload"));
      xhr.send(blob);
    });
  };
  const startUpload = async () => {
    let uploadFiles = files;
    if (transferMode === "text") {
      if (!textContent.trim()) return;
      const textFile = new File([textContent], "_filoza_text_transfer.txt", { type: "text/plain" });
      uploadFiles = [textFile];
    } else if (uploadFiles.length === 0) {
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setUploadError(null);
    try {
      // 1. E2EE Crypto Initialization
      const {
        generateFileKey,
        exportKeyToBase64,
        deriveKeyFromPassword,
        encryptFileKeyWithKEK,
        encryptFile,
        hashPasswordForBackend
      } = await import('@/lib/crypto');
      const fileKey = await generateFileKey();
      const base64FileKey = await exportKeyToBase64(fileKey);
      let passwordHash = null;
      let encryptedKey = null;
      let saltStr = null;
      if (password && password.trim() !== '') {
        const salt = window.crypto.getRandomValues(new Uint8Array(16));
        const kek = await deriveKeyFromPassword(password, salt);
        const kekEncrypted = await encryptFileKeyWithKEK(base64FileKey, kek);

        // Format: keyIvBase64.encryptedKeyBase64
        encryptedKey = `${kekEncrypted.keyIvBase64}.${kekEncrypted.encryptedKeyBase64}`;
        saltStr = btoa(String.fromCharCode(...salt));
        passwordHash = await hashPasswordForBackend(password);
      }

      // 2. Init transfer in backend
      const res = await fetch('/api/upload/init', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          files: uploadFiles.map(f => ({
            name: f.name,
            size: f.size
          })),
          expiresInDays,
          passwordHash,
          encryptedKey,
          salt: saltStr,
          customSlug: customSlug.trim() !== '' ? customSlug : undefined
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to initialize transfer');
      const {
        shareId: newShareId,
        uploadUrls
      } = data;

      // 3. Encrypt and upload files sequentially to save RAM
      const totalSize = uploadFiles.reduce((acc, f) => acc + f.size, 0);
      let totalLoaded = 0;
      for (let i = 0; i < uploadFiles.length; i++) {
        const file = uploadFiles[i];
        const urlObj = uploadUrls.find((u: any) => u.name === file.name);
        if (!urlObj) throw new Error(`Missing upload URL for ${file.name}`);

        // Read and encrypt
        let arrayBuffer: ArrayBuffer | null = await file.arrayBuffer();
        let {
          encrypted,
          iv
        }: any = await encryptFile(arrayBuffer, fileKey);

        // Combine IV (12 bytes) + Encrypted Data
        let finalBuffer: Uint8Array | null = new Uint8Array(12 + encrypted.byteLength);
        finalBuffer.set(iv, 0);
        finalBuffer.set(new Uint8Array(encrypted), 12);
        let blob: Blob | null = new Blob([finalBuffer as unknown as BlobPart], {
          type: "application/octet-stream"
        });

        // Free up memory immediately after blob creation
        arrayBuffer = null;
        encrypted = null;
        iv = null;
        finalBuffer = null;
        let fileLoaded = 0;
        await uploadFileXHR(blob, urlObj.uploadUrl, loaded => {
          const delta = loaded - fileLoaded;
          fileLoaded = loaded;
          totalLoaded += delta;
          setUploadProgress(Math.round(totalLoaded / totalSize * 100));
        });

        // Free the blob
        blob = null;
      }

      // Store the share ID and include the key in the hash if no password
      const hashKey = password ? '' : `#key=${base64FileKey}`;
      setShareId(newShareId + hashKey);
    } catch (err: any) {
      console.error(err);
      setUploadError(err.message || "An error occurred during upload.");
    } finally {
      setIsUploading(false);
    }
  };
  const copyLink = () => {
    if (!shareId) return;
    const url = `${window.location.origin}/${shareId}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const reset = () => {
    setFiles([]);
    setPassword("");
    setShareId(null);
    setUploadProgress(0);
    setMemoryWarning(false);
    setTextContent("");
    setCustomSlug("");
  };
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  const shareUrl = shareId ? `${typeof window !== 'undefined' ? window.location.origin : ''}/${shareId}` : '';
  const totalSize = files.reduce((acc, f) => acc + f.size, 0);
  return <>

      {!shareId ? <div className="card max-w-3xl mx-auto p-6 glass-card flex flex-col gap-6">
          <div className="flex justify-center mb-2">
            <div className="flex bg-secondary rounded-lg p-1">
              <button 
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${transferMode === 'file' ? 'bg-primary text-white shadow' : 'text-muted hover:text-foreground'}`}
                onClick={() => setTransferMode('file')}
              >
                File Transfer
              </button>
              <button 
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${transferMode === 'text' ? 'bg-primary text-white shadow' : 'text-muted hover:text-foreground'}`}
                onClick={() => setTransferMode('text')}
              >
                Text Transfer
              </button>
            </div>
          </div>

          {uploadError && <div className="bg-danger bg-opacity-10 text-danger p-4 rounded-lg">
              {uploadError}
            </div>}
          
          {memoryWarning && !isUploading && <div className="bg-warning bg-opacity-10 text-warning p-4 rounded-lg text-sm">
              <strong>Note:</strong> Very large files require extra browser memory to securely encrypt before uploading. Please ensure your device has sufficient resources.
            </div>}

          {transferMode === 'file' ? (
            files.length === 0 ? <label className="dropzone block cursor-pointer relative" onDrop={handleDrop} onDragOver={e => e.preventDefault()}>
              <UploadCloud className="dropzone-icon" />
              <h3>Drag & Drop your files here</h3>
              <p className="text-muted">or click to browse from your device</p>
              <input type="file" ref={fileInputRef} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" multiple onChange={handleFileChange} />
            </label> : <>
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-lg">{files.length} file{files.length !== 1 && 's'} selected ({formatBytes(totalSize)})</h3>
                  {!isUploading && <label className="text-primary text-sm hover:underline cursor-pointer m-0 relative">
                      + Add more
                      <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" multiple onChange={handleFileChange} disabled={isUploading} />
                    </label>}
                </div>
                
                <div className="max-h-[200px] overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-2">
                  {files.map((file, idx) => <div key={idx} className="flex justify-between items-center p-3 rounded-lg" style={{
              backgroundColor: "rgba(255,255,255,0.4)",
              border: "1px solid var(--border)"
            }}>
                      <span className="truncate text-sm font-medium pr-4 block max-w-[200px] sm:max-w-full overflow-hidden whitespace-nowrap">{file.name}</span>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className="text-xs text-muted">{formatBytes(file.size)}</span>
                        {!isUploading && <button onClick={() => removeFile(idx)} className="text-muted hover:text-danger">
                            <X size={16} />
                          </button>}
                      </div>
                    </div>)}
                </div>
              </div>
            </>
          ) : (
            <div>
              <textarea 
                className="input w-full min-h-[200px] resize-y custom-scrollbar" 
                placeholder="Type or paste the text you want to securely share..." 
                value={textContent}
                onChange={e => setTextContent(e.target.value)}
                disabled={isUploading}
              />
            </div>
          )}

          {((transferMode === 'file' && files.length > 0) || transferMode === 'text') && !isUploading && <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6" style={{
          borderTop: "1px solid var(--border)"
        }}>
                  <div>
                    <label className="label flex items-center gap-2">
                      <LinkIcon size={14} /> Custom Link Name
                    </label>
                    <input type="text" className="input w-full" placeholder="my-project" value={customSlug} onChange={e => setCustomSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, ''))} />
                  </div>
                  <div>
                    <label className="label flex items-center gap-2">
                      <Lock size={14} /> Password (Optional)
                    </label>
                    <input type="password" className="input w-full" placeholder="Secure password..." value={password} onChange={e => setPassword(e.target.value)} />
                  </div>
                  <div>
                    <label className="label flex items-center gap-2">
                      <Calendar size={14} /> Expires In
                    </label>
                    <select className="input w-full" value={expiresInDays} onChange={e => setExpiresInDays(Number(e.target.value))}>
                      <option value={1}>1 Day</option>
                      <option value={3}>3 Days</option>
                      <option value={7}>7 Days</option>
                      <option value={14}>14 Days</option>
                      <option value={30}>30 Days</option>
                    </select>
                  </div>
                </div>}

              {isUploading ? <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-primary">Uploading...</span>
                    <span className="font-medium">{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2.5 overflow-hidden">
                    <div className="bg-primary h-2.5 transition-all duration-300 ease-out" style={{
              width: `${uploadProgress}%`
            }}></div>
                  </div>
                </div> : <div className="flex gap-4 justify-end">
                  <button className="btn btn-secondary text-danger hover:bg-danger hover:bg-opacity-10" onClick={reset}>
                    Cancel
                  </button>
                  <button className="btn btn-primary flex items-center gap-2" onClick={startUpload} disabled={isUploading || (transferMode === 'text' && !textContent.trim()) || (transferMode === 'file' && files.length === 0)}>
                    <Send size={18} /> {transferMode === 'text' ? 'Send Text' : 'Send Files'}
                  </button>
                </div>}
        </div> : <div className="card max-w-2xl mx-auto p-8 glass-card text-center">
          <div className="w-16 h-16 bg-success bg-opacity-10 text-success rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={32} />
          </div>
          <h2 className="text-2xl font-bold mb-2">Transfer Ready!</h2>
          <p className="text-muted mb-8">Your files have been securely uploaded. Share the link or QR code below.</p>
          
          <div className="bg-secondary p-4 rounded-xl mb-8 flex items-center justify-between gap-2 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3 overflow-hidden text-left flex-1">
              <LinkIcon size={20} className="text-primary flex-shrink-0" />
              <span className="truncate font-medium block max-w-[200px] sm:max-w-full overflow-hidden whitespace-nowrap">{shareUrl}</span>
            </div>
            <button className="btn btn-primary btn-sm flex items-center gap-2 flex-shrink-0" onClick={copyLink}>
              {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>

          <div className="flex justify-center mb-8">
            <div className="p-4 bg-white rounded-xl shadow-sm inline-block">
              <QRCodeSVG value={shareUrl} size={150} />
            </div>
          </div>

          <button className="btn btn-secondary" onClick={reset}>
            Send More Files
          </button>
        </div>}
    </>;
}