"use client";

import React, { useState, useRef } from "react";
import { PDFDocument } from "pdf-lib";
import { UploadCloud, Download, CheckCircle2, FileText, Hash, Info, File } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";

export default function TextToPdfClient() {
  const [file, setFile] = useState<File | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [text, setText] = useState("");
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (selectedFile: File) => {
    if (selectedFile.type === "application/pdf" || selectedFile.name.endsWith('.pdf')) {
      setFile(selectedFile);
      setOutputUrl(null);
      
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const processFile = async () => {
    
    setIsProcessing(true);

    try {
      
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([595.28, 841.89]); // A4
      
      const { width, height } = page.getSize();
      const fontSize = 12;
      const margin = 50;
      const lineHeight = 1.5 * fontSize;

      const lines = text.split('\n');
      let currentY = height - margin;

      for (let i = 0; i < lines.length; i++) {
        if (currentY < margin) {
          const newPage = pdfDoc.addPage([595.28, 841.89]);
          currentY = height - margin;
        }
        
        try {
          page.drawText(lines[i], {
            x: margin,
            y: currentY,
            size: fontSize,
            maxWidth: width - (margin * 2),
            lineHeight: lineHeight
          });
        } catch (e) {
          // ignore font embedding issues for weird characters
        }
        
        currentY -= lineHeight;
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
      setOutputUrl(URL.createObjectURL(blob));
    
    } catch (error) {
      console.error(error);
      alert("An error occurred during processing.");
    }

    setIsProcessing(false);
  };

  return (
    <ToolLayout
      howItWorks={["Select or drag and drop your PDF file.","Apply your desired PDF modifications.","Click process.","Download your new PDF document."]}
      supportedFormats="PDF"
      title="Text to PDF"
      description="Instantly convert your raw text into a neat PDF document."
      breadcrumbs={[{ label: "PDF Tools", href: "/pdf-tools" }, { label: "Text to PDF", href: "/text-to-pdf" }]}
      faq={[
        { question: "Are my files uploaded anywhere?", answer: "No. Filoza processes your files entirely within your browser for 100% privacy." }
      ]}
    >
      <div className="max-w-3xl mx-auto">
        {!outputUrl ? (
          <>
            
            <div className="glass-card mb-8">
              <h3 className="mb-4">Enter Text</h3>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="input w-full min-h-[300px] mb-4 p-4 font-mono text-sm"
                placeholder="Type or paste your text here..."
              ></textarea>
              <div className="flex justify-end">
                <button className="btn btn-primary" onClick={processFile} disabled={!text || isProcessing}>
                  {isProcessing ? "Generating..." : <><FileText size={18}/> Generate PDF</>}
                </button>
              </div>
            </div>
    
          </>
        ) : (
          <div className="glass-card text-center py-12 flex flex-col items-center">
            <CheckCircle2 size={64} className="text-success mb-6" />
            <h2 className="mb-4">Processing Successful!</h2>
            
            <div className="flex gap-4 mt-8">
              <button className="btn btn-secondary" onClick={() => { setFile(null); setOutputUrl(null); setText(""); }}>
                Process More
              </button>
              <a href={outputUrl} download="document.pdf" className="btn btn-primary" style={{ textDecoration: 'none' }}>
                <Download size={18} /> Download PDF
              </a>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
