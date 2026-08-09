"use client";

import React, { useState, useRef } from "react";
import { PDFDocument, rgb, degrees, StandardFonts } from "pdf-lib";
import { UploadCloud, Download, CheckCircle2, Shield } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";

export default function PdfWatermarkClient() {
  const [file, setFile] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [watermarkText, setWatermarkText] = useState("CONFIDENTIAL");
  const [opacity, setOpacity] = useState(0.3);

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

  const addWatermark = async () => {
    if (!file) return;
    if (!watermarkText.trim()) {
      alert("Please enter a watermark text.");
      return;
    }

    setIsProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      
      const pages = pdfDoc.getPages();
      
      pages.forEach((page) => {
        const { width, height } = page.getSize();
        const fontSize = 60;
        
        const textWidth = helveticaFont.widthOfTextAtSize(watermarkText, fontSize);
        const textHeight = helveticaFont.heightAtSize(fontSize);
        
        page.drawText(watermarkText, {
          x: width / 2 - textWidth / 2,
          y: height / 2 - textHeight / 2,
          size: fontSize,
          font: helveticaFont,
          color: rgb(0, 0, 0),
          opacity: opacity,
          rotate: degrees(45),
        });
      });
      
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as BlobPart], { type: "application/pdf" });
      setPdfUrl(URL.createObjectURL(blob));
    } catch (error) {
      console.error(error);
      alert("An error occurred while adding the watermark.");
    }

    setIsProcessing(false);
  };

  return (
    <ToolLayout
      title="Watermark PDF"
      description="Stamp text over your PDF in seconds to protect your documents."
      breadcrumbs={[{ label: "PDF Tools", href: "/pdf-tools" }, { label: "Watermark", href: "/pdf-watermark" }]}
      faq={[
        { question: "Is my data secure?", answer: "Yes! All processing happens securely in your web browser. Your PDFs never leave your device." },
        { question: "Can I adjust the opacity?", answer: "Yes, you can adjust the opacity slider to make the watermark more or less transparent." }
      ]}
      relatedTools={[
        { name: "Merge PDF", href: "/pdf-merge", icon: <CheckCircle2 /> },
        { name: "Compress PDF", href: "/pdf-compress", icon: <CheckCircle2 /> }
      ]}
    >
      <div className="max-w-3xl mx-auto">
        {!pdfUrl ? (
          <>
            <div 
              className="dropzone mb-8" 
              onDrop={handleDrop} 
              onDragOver={(e) => e.preventDefault()}
              onClick={() => fileInputRef.current?.click()}
            >
              <UploadCloud className="dropzone-icon" />
              <h3>Drag & Drop your PDF here</h3>
              <p className="text-muted">Only PDF files are supported</p>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="application/pdf" 
                onChange={handleFileChange} 
              />
            </div>

            {file && (
              <div className="glass-card">
                <h3 className="mb-2 truncate" title={file.name}>{file.name}</h3>
                <p className="text-muted text-sm mb-6">{(file.size / 1024 / 1024).toFixed(2)} MB</p>

                <div className="mb-8 p-6 bg-background rounded-lg border border-border flex flex-col gap-6">
                  <div>
                    <label className="label">Watermark Text</label>
                    <input 
                      type="text" 
                      className="input w-full max-w-md" 
                      value={watermarkText} 
                      onChange={(e) => setWatermarkText(e.target.value)} 
                      placeholder="CONFIDENTIAL"
                      disabled={isProcessing}
                    />
                  </div>
                  
                  <div className="max-w-md">
                    <label className="label flex justify-between">
                      <span>Opacity</span>
                      <span>{Math.round(opacity * 100)}%</span>
                    </label>
                    <input 
                      type="range" 
                      min="0.05" 
                      max="1" 
                      step="0.05" 
                      value={opacity} 
                      onChange={(e) => setOpacity(parseFloat(e.target.value))} 
                      className="w-full mt-2"
                      disabled={isProcessing}
                    />
                  </div>
                </div>

                <div className="flex justify-center gap-4">
                  <button className="btn btn-secondary" onClick={() => setFile(null)} disabled={isProcessing}>
                    Upload Another
                  </button>
                  <button className="btn btn-primary" onClick={addWatermark} disabled={isProcessing || !watermarkText.trim()}>
                    {isProcessing ? "Adding Watermark..." : (
                      <>
                        <Shield size={18} /> Add Watermark
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="glass-card text-center py-12 flex flex-col items-center">
            <CheckCircle2 size={64} className="text-success mb-6" />
            <h2 className="mb-4">Watermark Added Successfully!</h2>
            <p className="text-muted mb-8">Your document has been watermarked and is ready to download.</p>
            
            <div className="flex gap-4">
              <button className="btn btn-secondary" onClick={() => { setFile(null); setPdfUrl(null); }}>
                Watermark More
              </button>
              <a href={pdfUrl} download={`watermarked_${file?.name}`} className="btn btn-primary" style={{ textDecoration: 'none' }}>
                <Download size={18} /> Download PDF
              </a>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
