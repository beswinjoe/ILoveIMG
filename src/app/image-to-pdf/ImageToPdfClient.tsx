"use client";

import React, { useState, useRef } from "react";
import { PDFDocument } from "pdf-lib";
import { UploadCloud, Download, CheckCircle2 } from "lucide-react";
export default function ImageToPdfClient() {
  const [files, setFiles] = useState<File[]>([]);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith("image/"));
      setFiles(prev => [...prev, ...newFiles]);
      setPdfUrl(null);
    }
  };
  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).filter(f => f.type.startsWith("image/"));
      setFiles(prev => [...prev, ...newFiles]);
      setPdfUrl(null);
    }
  };
  const generatePDF = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    try {
      const pdfDoc = await PDFDocument.create();
      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        let image;
        if (file.type === 'image/jpeg') {
          image = await pdfDoc.embedJpg(arrayBuffer);
        } else if (file.type === 'image/png') {
          image = await pdfDoc.embedPng(arrayBuffer);
        } else {
          // pdf-lib only natively supports embedding PNG and JPG.
          // For other formats like WebP, we'd need to convert to PNG/JPG first via canvas.
          // For simplicity in this local tool, we'll use a canvas fallback for non-jpg/png.
          const img = new Image();
          img.src = URL.createObjectURL(file);
          await new Promise(resolve => {
            img.onload = resolve;
          });
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            const pngDataUrl = canvas.toDataURL('image/png');
            const res = await fetch(pngDataUrl);
            const pngBuf = await res.arrayBuffer();
            image = await pdfDoc.embedPng(pngBuf);
          }
        }
        if (image) {
          const page = pdfDoc.addPage([image.width, image.height]);
          page.drawImage(image, {
            x: 0,
            y: 0,
            width: image.width,
            height: image.height
          });
        }
      }
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as BlobPart], {
        type: "application/pdf"
      });
      setPdfUrl(URL.createObjectURL(blob));
    } catch (error) {
      console.error(error);
      alert("An error occurred while generating the PDF.");
    }
    setIsProcessing(false);
  };
  return <>
      <div className="max-w-3xl mx-auto">
        {!pdfUrl ? <>
            <div className="dropzone mb-8" onDrop={handleDrop} onDragOver={e => e.preventDefault()} onClick={() => fileInputRef.current?.click()}>
              <UploadCloud className="dropzone-icon" />
              <h3>Drag & Drop images here</h3>
              <p className="text-muted">JPG, PNG, WebP supported</p>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" multiple onChange={handleFilesChange} />
            </div>

            {files.length > 0 && <div className="glass-card">
                <h3 className="mb-4">{files.length} images selected</h3>
                <div className="flex flex-col gap-2 mb-6 max-h-60 overflow-y-auto pr-2">
                  {files.map((f, i) => <div key={i} className="flex justify-between items-center p-2 rounded bg-background border border-border text-sm">
                      <span className="truncate">{f.name}</span>
                      <button onClick={() => setFiles(files.filter((_, idx) => idx !== i))} className="text-danger hover:underline">Remove</button>
                    </div>)}
                </div>
                <div className="flex justify-center gap-4">
                  <button className="btn btn-secondary" onClick={() => setFiles([])}>Clear All</button>
                  <button className="btn btn-primary" onClick={generatePDF} disabled={isProcessing}>
                    {isProcessing ? "Generating PDF..." : "Convert to PDF"}
                  </button>
                </div>
              </div>}
          </> : <div className="glass-card text-center py-12 flex flex-col items-center">
            <CheckCircle2 size={64} className="text-success mb-6" />
            <h2 className="mb-4">PDF Generated Successfully!</h2>
            <p className="text-muted mb-8">Your images have been combined into a PDF document.</p>
            <div className="flex gap-4">
              <button className="btn btn-secondary" onClick={() => {
            setFiles([]);
            setPdfUrl(null);
          }}>
                Convert More
              </button>
              <a href={pdfUrl} download="Filoza_Images.pdf" className="btn btn-primary" style={{
            textDecoration: 'none'
          }}>
                <Download size={18} /> Download PDF
              </a>
            </div>
          </div>}
      </div>
    </>;
}