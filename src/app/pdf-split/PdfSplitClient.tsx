"use client";

import React, { useState, useRef } from "react";
import { PDFDocument } from "pdf-lib";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { UploadCloud, FileArchive, CheckCircle2, Settings } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";

export default function PdfSplitClient() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [splitMode, setSplitMode] = useState<"extract_all" | "custom_ranges">("extract_all");
  const [customRange, setCustomRange] = useState("1-3, 5");
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFile = e.dataTransfer.files[0];
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
      } else {
        alert("Please upload a valid PDF file.");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
      } else {
        alert("Please upload a valid PDF file.");
      }
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

  const splitPDF = async () => {
    if (!file) return;
    setIsProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const numPages = pdf.getPageCount();
      
      const zip = new JSZip();

      if (splitMode === "extract_all") {
        // Extract each page into a separate file
        for (let i = 0; i < numPages; i++) {
          const newPdf = await PDFDocument.create();
          const [copiedPage] = await newPdf.copyPages(pdf, [i]);
          newPdf.addPage(copiedPage);
          
          const pdfBytes = await newPdf.save();
          zip.file(`page_${i + 1}.pdf`, pdfBytes);
        }
      } else {
        // Extract specific ranges into a single new file
        const pagesToExtract = parseRanges(customRange, numPages);
        if (pagesToExtract.length === 0) {
          alert("Invalid page range specified.");
          setIsProcessing(false);
          return;
        }

        const newPdf = await PDFDocument.create();
        // pdf-lib page indices are 0-based
        const indicesToExtract = pagesToExtract.map(p => p - 1);
        const copiedPages = await newPdf.copyPages(pdf, indicesToExtract);
        
        copiedPages.forEach(page => newPdf.addPage(page));
        
        const pdfBytes = await newPdf.save();
        const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
        saveAs(blob, `${file.name.replace(".pdf", "")}_split.pdf`);
        setIsProcessing(false);
        return; // Early exit since we don't need ZIP for a single file
      }

      // Download ZIP for extract_all
      const zipBlob = await zip.generateAsync({ type: "blob" });
      saveAs(zipBlob, `${file.name.replace(".pdf", "")}_split.zip`);

    } catch (error) {
      console.error(error);
      alert("An error occurred while splitting the PDF.");
    }

    setIsProcessing(false);
  };

  return (
    <ToolLayout
      title="Split PDF"
      description="Separate one page or a whole set for easy conversion into independent PDF files."
      breadcrumbs={[{ label: "PDF Tools", href: "/pdf-tools" }, { label: "Split PDF", href: "/pdf-split" }]}
      faq={[
        { question: "Can I extract specific pages?", answer: "Yes, you can choose 'Custom Ranges' and enter pages like '1-3, 5' to create a new PDF with only those pages." },
        { question: "Is my data secure?", answer: "Yes! All processing happens securely in your web browser. Your PDFs never leave your device." }
      ]}
      relatedTools={[
        { name: "Merge PDF", href: "/pdf-merge", icon: <CheckCircle2 /> },
        { name: "Extract PDF Pages", href: "/pdf-page-extract", icon: <CheckCircle2 /> }
      ]}
    >
      <div className="max-w-3xl mx-auto">
        {!file ? (
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
        ) : (
          <div className="glass-card">
            <h3 className="mb-2 truncate" title={file.name}>{file.name}</h3>
            <p className="text-muted text-sm mb-6">{(file.size / 1024 / 1024).toFixed(2)} MB</p>

            <div className="flex flex-col gap-4 mb-8 p-6 bg-background rounded-lg border border-border">
              <label className="label flex items-center gap-2 mb-2"><Settings size={16}/> Split Mode</label>
              
              <div className="flex flex-col gap-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="radio" 
                    name="splitMode" 
                    value="extract_all"
                    checked={splitMode === "extract_all"} 
                    onChange={() => setSplitMode("extract_all")} 
                    className="w-4 h-4 text-primary"
                  />
                  <span>Extract all pages into separate PDFs (Downloads as ZIP)</span>
                </label>
                
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="radio" 
                    name="splitMode" 
                    value="custom_ranges"
                    checked={splitMode === "custom_ranges"} 
                    onChange={() => setSplitMode("custom_ranges")} 
                    className="w-4 h-4 text-primary"
                  />
                  <span>Custom page ranges</span>
                </label>
              </div>

              {splitMode === "custom_ranges" && (
                <div className="mt-4 pl-7">
                  <label className="label">Pages (e.g., 1-5, 8, 11-13)</label>
                  <input 
                    type="text" 
                    className="input max-w-md" 
                    value={customRange} 
                    onChange={(e) => setCustomRange(e.target.value)} 
                    placeholder="1-5, 8, 11-13"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-center gap-4">
              <button className="btn btn-secondary" onClick={() => setFile(null)} disabled={isProcessing}>
                Upload Another
              </button>
              <button className="btn btn-primary" onClick={splitPDF} disabled={isProcessing}>
                {isProcessing ? "Processing..." : (
                  <>
                    <FileArchive size={18} /> Split PDF
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
