"use client";

import React, { useState, useRef } from "react";
import { PDFDocument } from "pdf-lib";
import { UploadCloud, Download, CheckCircle2, FilePlus2, GripVertical, Trash2 } from "lucide-react";
export default function PdfMergeClient() {
  const [files, setFiles] = useState<File[]>([]);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files).filter(f => f.type === "application/pdf");
      if (newFiles.length > 0) {
        setFiles(prev => [...prev, ...newFiles]);
        setPdfUrl(null);
      } else {
        alert("Please upload valid PDF files.");
      }
    }
  };
  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).filter(f => f.type === "application/pdf");
      if (newFiles.length > 0) {
        setFiles(prev => [...prev, ...newFiles]);
        setPdfUrl(null);
      }
    }
  };

  // Simple move up/down for reordering
  const moveFile = (index: number, direction: 'up' | 'down') => {
    const newFiles = [...files];
    if (direction === 'up' && index > 0) {
      [newFiles[index - 1], newFiles[index]] = [newFiles[index], newFiles[index - 1]];
    } else if (direction === 'down' && index < newFiles.length - 1) {
      [newFiles[index + 1], newFiles[index]] = [newFiles[index], newFiles[index + 1]];
    }
    setFiles(newFiles);
  };
  const removeFile = (index: number) => {
    setFiles(files.filter((_, idx) => idx !== index));
  };
  const mergePDFs = async () => {
    if (files.length < 2) {
      alert("Please upload at least 2 PDF files to merge.");
      return;
    }
    setIsProcessing(true);
    try {
      const mergedPdf = await PDFDocument.create();
      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach(page => mergedPdf.addPage(page));
      }
      const pdfBytes = await mergedPdf.save();
      const blob = new Blob([pdfBytes as BlobPart], {
        type: "application/pdf"
      });
      setPdfUrl(URL.createObjectURL(blob));
    } catch (error) {
      console.error(error);
      alert("An error occurred while merging the PDFs.");
    }
    setIsProcessing(false);
  };
  return <>
      <div className="max-w-3xl mx-auto">
        {!pdfUrl ? <>
            <div className="dropzone mb-8" onDrop={handleDrop} onDragOver={e => e.preventDefault()} onClick={() => fileInputRef.current?.click()}>
              <UploadCloud className="dropzone-icon" />
              <h3>Drag & Drop PDFs here</h3>
              <p className="text-muted">Select 2 or more PDF files to merge</p>
              <input type="file" ref={fileInputRef} className="hidden" accept="application/pdf" multiple onChange={handleFilesChange} />
            </div>

            {files.length > 0 && <div className="glass-card">
                <h3 className="mb-4">{files.length} PDFs selected</h3>
                
                <div className="flex flex-col gap-2 mb-6 max-h-[400px] overflow-y-auto pr-2">
                  {files.map((f, i) => <div key={i} className="flex justify-between items-center p-3 rounded bg-background border border-border">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <GripVertical className="text-muted cursor-move" size={16} />
                        <span className="truncate max-w-[200px] sm:max-w-[400px] font-medium text-sm">{f.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-1 hover:bg-surface rounded text-muted disabled:opacity-30" onClick={() => moveFile(i, 'up')} disabled={i === 0 || isProcessing} title="Move up">
                          ↑
                        </button>
                        <button className="p-1 hover:bg-surface rounded text-muted disabled:opacity-30" onClick={() => moveFile(i, 'down')} disabled={i === files.length - 1 || isProcessing} title="Move down">
                          ↓
                        </button>
                        <button className="p-1 hover:bg-danger/10 text-danger rounded ml-2" onClick={() => removeFile(i)} disabled={isProcessing} title="Remove file">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>)}
                </div>

                <div className="flex justify-center gap-4">
                  <button className="btn btn-secondary" onClick={() => setFiles([])} disabled={isProcessing}>
                    Clear All
                  </button>
                  <button className="btn btn-primary" onClick={mergePDFs} disabled={isProcessing || files.length < 2}>
                    {isProcessing ? "Merging PDFs..." : <>
                        <FilePlus2 size={18} /> Merge PDFs
                      </>}
                  </button>
                </div>
                {files.length === 1 && <p className="text-danger text-sm text-center mt-4">Please upload at least one more PDF to merge.</p>}
              </div>}
          </> : <div className="glass-card text-center py-12 flex flex-col items-center">
            <CheckCircle2 size={64} className="text-success mb-6" />
            <h2 className="mb-4">PDFs Merged Successfully!</h2>
            <p className="text-muted mb-8">Your documents have been merged into a single PDF file.</p>
            <div className="flex gap-4">
              <button className="btn btn-secondary" onClick={() => {
            setFiles([]);
            setPdfUrl(null);
          }}>
                Merge More
              </button>
              <a href={pdfUrl} download="Filoza_Merged.pdf" className="btn btn-primary" style={{
            textDecoration: 'none'
          }}>
                <Download size={18} /> Download Merged PDF
              </a>
            </div>
          </div>}
      </div>
    </>;
}