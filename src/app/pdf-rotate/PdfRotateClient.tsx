"use client";

import React, { useState, useRef } from "react";
import { PDFDocument, degrees } from "pdf-lib";
import { UploadCloud, Download, CheckCircle2, RotateCw, RotateCcw } from "lucide-react";
export default function PdfRotateClient() {
  const [file, setFile] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [rotation, setRotation] = useState<number>(90);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFile = e.dataTransfer.files[0];
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
        setPdfUrl(null);
      }
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
        setPdfUrl(null);
      }
    }
  };
  const rotatePDF = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();
      pages.forEach(page => {
        const currentRotation = page.getRotation().angle;
        page.setRotation(degrees(currentRotation + rotation));
      });
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as BlobPart], {
        type: "application/pdf"
      });
      setPdfUrl(URL.createObjectURL(blob));
    } catch (error) {
      console.error(error);
      alert("An error occurred while rotating the PDF.");
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

            {file && <div className="glass-card text-center">
                <h3 className="mb-2 truncate" title={file.name}>{file.name}</h3>
                <p className="text-muted text-sm mb-6">{(file.size / 1024 / 1024).toFixed(2)} MB</p>

                <div className="flex justify-center gap-4 mb-8">
                  <button className={`btn ${rotation === -90 ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setRotation(-90)}>
                    <RotateCcw size={18} /> Left (-90°)
                  </button>
                  <button className={`btn ${rotation === 90 ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setRotation(90)}>
                    <RotateCw size={18} /> Right (90°)
                  </button>
                  <button className={`btn ${rotation === 180 ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setRotation(180)}>
                    <RotateCw size={18} /> Flip (180°)
                  </button>
                </div>

                <div className="flex justify-center gap-4">
                  <button className="btn btn-secondary" onClick={() => setFile(null)} disabled={isProcessing}>
                    Upload Another
                  </button>
                  <button className="btn btn-primary" onClick={rotatePDF} disabled={isProcessing}>
                    {isProcessing ? "Rotating..." : "Rotate PDF"}
                  </button>
                </div>
              </div>}
          </> : <div className="glass-card text-center py-12 flex flex-col items-center">
            <CheckCircle2 size={64} className="text-success mb-6" />
            <h2 className="mb-4">PDF Rotated Successfully!</h2>
            <p className="text-muted mb-8">Your document has been rotated and is ready to download.</p>
            
            <div className="flex gap-4">
              <button className="btn btn-secondary" onClick={() => {
            setFile(null);
            setPdfUrl(null);
          }}>
                Rotate More
              </button>
              <a href={pdfUrl} download={`rotated_${file?.name}`} className="btn btn-primary" style={{
            textDecoration: 'none'
          }}>
                <Download size={18} /> Download PDF
              </a>
            </div>
          </div>}
      </div>
    </>;
}