"use client";

import React, { useState, useEffect, use } from "react";
import { Download, Lock, File as FileIcon, AlertTriangle, ShieldCheck, CheckCircle } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
interface DownloadClientProps {
  paramsPromise: Promise<{
    shareId: string;
  }>;
}
interface TransferInfo {
  filename: string;
  size: number;
  expiresAt: string;
  isProtected: boolean;
  files: {
    name: string;
    size: number;
  }[];
}
export default function DownloadClient({
  paramsPromise
}: DownloadClientProps) {
  const {
    shareId
  } = use(paramsPromise);
  const [info, setInfo] = useState<TransferInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [unlocking, setUnlocking] = useState(false);
  const [downloadUrls, setDownloadUrls] = useState<{
    name: string;
    downloadUrl: string;
  }[] | null>(null);
  const [decryptionKey, setDecryptionKey] = useState<CryptoKey | null>(null);
  const [activeDownload, setActiveDownload] = useState<{
    name: string;
    status: string;
  } | null>(null);
  const [decryptedText, setDecryptedText] = useState<string | null>(null);
  const [textCopied, setTextCopied] = useState(false);
  useEffect(() => {
    fetchInfo();
  }, [shareId]);
  const fetchInfo = async () => {
    try {
      const res = await fetch(`/api/transfer/${shareId}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setInfo(data);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Failed to load transfer";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };
  const unlockAndDownload = async () => {
    if (info?.isProtected && !password) {
      alert("Please enter the password");
      return;
    }
    setUnlocking(true);
    setError(null);
    try {
      const res = await fetch(`/api/transfer/${shareId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setDownloadUrls(data.downloadUrls);

      // E2EE Key Extraction
      const {
        importKeyFromBase64,
        deriveKeyFromPassword,
        decryptFileKeyWithKEK
      } = await import('@/lib/crypto');
      let base64FileKey = "";
      if (info?.isProtected) {
        if (!data.encryptedKey || !data.salt) throw new Error("Missing encrypted key or salt from server");
        const parts = data.encryptedKey.split('.');
        if (parts.length !== 2) throw new Error("Invalid encrypted key format");
        const saltBuffer = new Uint8Array(atob(data.salt).split('').map(c => c.charCodeAt(0)));
        const kek = await deriveKeyFromPassword(password, saltBuffer);
        try {
          base64FileKey = await decryptFileKeyWithKEK(parts[1], parts[0], kek);
        } catch (e) {
          throw new Error("Failed to decrypt the file key. The password might be correct for access but invalid for decryption.");
        }
      } else {
        const hash = window.location.hash;
        if (!hash || !hash.startsWith('#key=')) {
          throw new Error("Encryption key is missing from the URL. Please make sure you copied the full link.");
        }
        base64FileKey = hash.replace('#key=', '');
      }
      const fileKey = await importKeyFromBase64(base64FileKey);
      setDecryptionKey(fileKey);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Failed to unlock transfer";
      setError(errorMsg);
      setDownloadUrls(null);
    } finally {
      setUnlocking(false);
    }
  };
  const downloadAndDecrypt = async (fileUrl: string, fileName: string) => {
    if (!decryptionKey) return;
    setActiveDownload({
      name: fileName,
      status: "Downloading encrypted blob..."
    });
    try {
      // 1. Fetch encrypted blob
      const res = await fetch(fileUrl);
      if (!res.ok) throw new Error("Failed to download file from storage");
      const encryptedBlob = await res.blob();
      const arrayBuffer = await encryptedBlob.arrayBuffer();
      setActiveDownload({
        name: fileName,
        status: "Decrypting locally..."
      });

      // 2. Extract IV (first 12 bytes) and Ciphertext
      const iv = new Uint8Array(arrayBuffer.slice(0, 12));
      const ciphertext = arrayBuffer.slice(12);

      // 3. Decrypt
      const {
        decryptFile
      } = await import('@/lib/crypto');
      const decryptedBuffer = await decryptFile(ciphertext, decryptionKey, iv);

      // 4. Trigger Save or View
      if (fileName === "_filoza_text_transfer.txt") {
        const decoder = new TextDecoder('utf-8');
        setDecryptedText(decoder.decode(decryptedBuffer));
        setActiveDownload(null);
      } else {
        const decryptedBlob = new Blob([decryptedBuffer], {
          type: "application/octet-stream"
        });
        const {
          saveAs
        } = await import('file-saver');
        saveAs(decryptedBlob, fileName);
        setActiveDownload(null);
      }
    } catch (err: any) {
      console.error(err);
      alert("Decryption failed: " + (err.message || "Unknown error"));
      setActiveDownload(null);
    }
  };
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  if (loading) {
    return <ToolLayout title="Secure Download" description="Retrieving transfer information..." breadcrumbs={[{
      label: "Download",
      href: "#"
    }]}>
        <div className="card max-w-2xl mx-auto p-12 glass-card text-center">
          <div className="animate-spin text-primary mx-auto mb-4" style={{
          width: "40px",
          height: "40px",
          border: "3px solid transparent",
          borderTopColor: "currentColor",
          borderRadius: "50%"
        }}></div>
        </div>
      </ToolLayout>;
  }
  if (error && !info) {
    return <ToolLayout title="Transfer Unavailable" description="This transfer could not be found or has expired." breadcrumbs={[{
      label: "Download",
      href: "#"
    }]}>
        <div className="card max-w-2xl mx-auto p-8 glass-card text-center">
          <div className="w-16 h-16 bg-danger bg-opacity-10 text-danger rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle size={32} />
          </div>
          <h2 className="text-2xl font-bold mb-2">Oops!</h2>
          <p className="text-muted mb-8">{error}</p>
        </div>
      </ToolLayout>;
  }
  return <>
      <div className="card max-w-2xl mx-auto p-6 md:p-8 glass-card">
        {error && <div className="bg-danger bg-opacity-10 text-danger p-4 rounded-lg mb-6 flex items-center gap-3">
            <AlertTriangle size={20} />
            <span>{error}</span>
          </div>}

        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-primary bg-opacity-10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <Download size={40} />
          </div>
          <h2 className="text-2xl font-bold mb-2">{info?.filename}</h2>
          <p className="text-muted">Total Size: {formatBytes(info?.size || 0)}</p>
          <p className="text-muted text-sm mt-1">Expires on {new Date(info?.expiresAt || "").toLocaleDateString()}</p>
        </div>

        {info?.files && info.files.length > 0 && <div className="mb-8">
            <h4 className="text-sm font-bold uppercase text-muted tracking-wider mb-3">Contents</h4>
            <div className="max-h-[200px] overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-2">
              {info.files.map((file, idx) => {
            const dl = downloadUrls?.find(d => d.name === file.name);
            const isDownloadingThis = activeDownload?.name === file.name;
            return <div key={idx} className="flex justify-between items-center p-3 rounded-lg" style={{
              backgroundColor: "rgba(255,255,255,0.4)",
              border: "1px solid var(--border)"
            }}>
                    <div className="flex items-center gap-3 overflow-hidden">
                      <FileIcon size={16} className="text-muted flex-shrink-0" />
                      <span className="truncate text-sm font-medium block max-w-[150px] sm:max-w-[300px] overflow-hidden whitespace-nowrap">{file.name}</span>
                    </div>
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <span className="text-xs text-muted">{formatBytes(file.size)}</span>
                      {dl && decryptionKey && <button onClick={() => downloadAndDecrypt(dl.downloadUrl, file.name)} disabled={!!activeDownload} className="btn btn-primary btn-sm flex items-center gap-1">
                          {isDownloadingThis ? <div className="animate-spin text-white" style={{
                    width: "14px",
                    height: "14px",
                    border: "2px solid transparent",
                    borderTopColor: "currentColor",
                    borderRadius: "50%"
                  }}></div> : <Download size={14} />}
                          <span className="hidden sm:inline">{isDownloadingThis ? "Decrypting..." : file.name === "_filoza_text_transfer.txt" ? "Decrypt & View" : "Decrypt & Save"}</span>
                        </button>}
                    </div>
                  </div>;
          })}
            </div>
          </div>}

        {activeDownload && <div className="mb-8 bg-[var(--background)] p-4 rounded-xl border border-[var(--border)] text-center">
            <p className="text-sm font-medium mb-1 truncate">Processing: {activeDownload.name}</p>
            <p className="text-xs text-primary animate-pulse">{activeDownload.status}</p>
          </div>}

        {decryptedText !== null && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-bold uppercase text-muted tracking-wider">Decrypted Text</h4>
              <button 
                className="btn btn-secondary btn-sm flex items-center gap-1"
                onClick={() => {
                  navigator.clipboard.writeText(decryptedText);
                  setTextCopied(true);
                  setTimeout(() => setTextCopied(false), 2000);
                }}
              >
                {textCopied ? <CheckCircle size={14} /> : <FileIcon size={14} />}
                {textCopied ? "Copied" : "Copy"}
              </button>
            </div>
            <textarea 
              className="input w-full min-h-[200px] resize-y custom-scrollbar" 
              readOnly 
              value={decryptedText}
            />
          </div>
        )}

        {!downloadUrls ? <div className="bg-secondary p-6 rounded-xl text-center">
            {info?.isProtected ? <>
                <div className="flex items-center justify-center gap-2 mb-4 text-warning">
                  <Lock size={20} />
                  <span className="font-medium">Password Protected</span>
                </div>
                <input type="password" className="input w-full max-w-sm mx-auto mb-4" placeholder="Enter transfer password" value={password} onChange={e => setPassword(e.target.value)} />
              </> : <div className="flex items-center justify-center gap-2 mb-4 text-success">
                <ShieldCheck size={20} />
                <span className="font-medium">End-to-End Encrypted</span>
              </div>}
            
            <button className="btn btn-primary w-full max-w-sm mx-auto flex items-center justify-center gap-2" onClick={unlockAndDownload} disabled={unlocking}>
              {unlocking ? "Initializing..." : info?.isProtected ? "Unlock Transfer" : "Access Transfer"}
            </button>
          </div> : !activeDownload && <div className="bg-success bg-opacity-10 text-success p-6 rounded-xl text-center">
            <CheckCircle size={32} className="mx-auto mb-2" />
            <h3 className="font-bold text-lg mb-1">Decryption Key Loaded!</h3>
            <p className="text-sm opacity-90">Click the buttons above to decrypt and download your files directly in your browser.</p>
          </div>}
      </div>
    </>;
}