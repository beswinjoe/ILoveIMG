"use client";

import React, { useState, useRef } from "react";
import { PDFDocument } from "pdf-lib";
import { UploadCloud, Download, CheckCircle2, FileUp } from "lucide-react";
export default function PdfPageExtractClient() {
  const [file, setFile] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pagesToExtract, setPagesToExtract] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFile = e.dataTransfer.files[0];
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
        setPdfUrl(null);
        await countPages(selectedFile);
      }
    }
  };
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
        setPdfUrl(null);
        await countPages(selectedFile);
      }
    }
  };
  const countPages = async (file: File) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      setTotalPages(pdf.getPageCount());
    } catch (e) {
      console.error(e);
    }
  };
  const parseRanges = (rangeStr: string, maxPages: number): number[] => {
    const pages = new Set<number>();
    const parts = rangeStr.split(",").map(p => p.trim());
    for (const part of parts) {
      if (part.includes("-")) {
        const [start, end] = part.split("-").map(n => parseInt(n));
        if (!isNaN(start) && !isNaN(end) && start <= end && start > 0) {
          for (let i = start; i <= Math.min(end, maxPages); i++) {
            pages.add(i);
          }
        }
      } else {
        const num = parseInt(part);
        if (!isNaN(num) && num > 0 && num <= maxPages) {
          pages.add(num);
        }
      }
    }
    return Array.from(pages).sort((a, b) => a - b);
  };
  const extractPages = async () => {
    if (!file) return;
    const pagesToKeep = parseRanges(pagesToExtract, totalPages);
    if (pagesToKeep.length === 0) {
      alert("Please enter valid page numbers to extract.");
      return;
    }
    setIsProcessing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const newPdf = await PDFDocument.create();

      // pdf-lib page indices are 0-based
      const indicesToExtract = pagesToKeep.map(p => p - 1);
      const copiedPages = await newPdf.copyPages(pdfDoc, indicesToExtract);
      copiedPages.forEach(page => newPdf.addPage(page));
      const pdfBytes = await newPdf.save();
      const blob = new Blob([pdfBytes as BlobPart], {
        type: "application/pdf"
      });
      setPdfUrl(URL.createObjectURL(blob));
    } catch (error) {
      console.error(error);
      alert("An error occurred while extracting the pages.");
    }
    setIsProcessing(false);
  };
  return <>
      <div className="max-w-3xl mx-auto">
        {!pdfUrl ? <>
            <div className="dropzone mb-8" onDrop={handleDrop} onDragOver={e => e.preventDefault()} onClick={() => fileInputRef.current?.click()}>
              <UploadCloud className="dropzone-icon" />
              <h3>Drag & Drop your PDF here</h3>
              <p className="text-muted">Only PDF files are supported</p>
              <input type="file" ref={fileInputRef} className="hidden" accept="application/pdf" onChange={handleFileChange} />
            </div>

            {file && <div className="glass-card">
                <h3 className="mb-2 truncate" title={file.name}>{file.name}</h3>
                <div className="flex justify-between items-center mb-6">
                  <p className="text-muted text-sm">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  <p className="font-medium text-sm text-primary">{totalPages} Pages Total</p>
                </div>

                <div className="mb-8 p-6 bg-background rounded-lg border border-border">
                  <label className="label">Pages to Extract (e.g., 1-5, 8, 11-13)</label>
                  <input type="text" className="input w-full" value={pagesToExtract} onChange={e => setPagesToExtract(e.target.value)} placeholder="2, 4-6" disabled={isProcessing} />
                  <p className="text-muted text-xs mt-2">
                    Only the pages entered here will be included in the final document.
                  </p>
                </div>

                <div className="flex justify-center gap-4">
                  <button className="btn btn-secondary" onClick={() => setFile(null)} disabled={isProcessing}>
                    Upload Another
                  </button>
                  <button className="btn btn-primary" onClick={extractPages} disabled={isProcessing || !pagesToExtract.trim()}>
                    {isProcessing ? "Extracting..." : <>
                        <FileUp size={18} /> Extract Pages
                      </>}
                  </button>
                </div>
              </div>}
          </> : <div className="glass-card text-center py-12 flex flex-col items-center">
            <CheckCircle2 size={64} className="text-success mb-6" />
            <h2 className="mb-4">Pages Extracted Successfully!</h2>
            <p className="text-muted mb-8">Your new document containing the extracted pages is ready.</p>
            
            <div className="flex gap-4">
              <button className="btn btn-secondary" onClick={() => {
            setFile(null);
            setPdfUrl(null);
            setPagesToExtract("");
          }}>
                Process More
              </button>
              <a href={pdfUrl} download={`extracted_${file?.name}`} className="btn btn-primary" style={{
            textDecoration: 'none'
          }}>
                <Download size={18} /> Download PDF
              </a>
            </div>
          </div>}
      </div>
    </>;
}