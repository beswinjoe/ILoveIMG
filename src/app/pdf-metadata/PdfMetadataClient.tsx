"use client";

import React, { useState, useRef } from "react";
import { PDFDocument } from "pdf-lib";
import { UploadCloud, Download, CheckCircle2, FileText, Hash, Info, File } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";

export default function PdfMetadataClient() {
  const [file, setFile] = useState<File | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [metadata, setMetadata] = useState<Record<string, string | undefined> | null>(null);
  
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
      
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      setMetadata({
        title: pdfDoc.getTitle(),
        author: pdfDoc.getAuthor(),
        subject: pdfDoc.getSubject(),
        creator: pdfDoc.getCreator(),
      });
    
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const processFile = async () => {
    if (!file) return;
    setIsProcessing(true);

    try {
      
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      
      pdfDoc.setTitle('');
      pdfDoc.setAuthor('');
      pdfDoc.setSubject('');
      pdfDoc.setKeywords([]);
      pdfDoc.setProducer('');
      pdfDoc.setCreator('');

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
      title="PDF Metadata Viewer"
      description="View or remove metadata from your PDF files."
      breadcrumbs={[{ label: "PDF Tools", href: "/pdf-tools" }, { label: "PDF Metadata Viewer", href: "/pdf-metadata" }]}
      faq={[
        { question: "Are my files uploaded anywhere?", answer: "No. Filoza processes your files entirely within your browser for 100% privacy." }
      ]}
    >
      <div className="max-w-3xl mx-auto">
        {!outputUrl ? (
          <>
            
            <div 
              className="dropzone mb-8" 
              onDrop={handleDrop} 
              onDragOver={(e) => e.preventDefault()}
              onClick={() => fileInputRef.current?.click()}
            >
              <UploadCloud className="dropzone-icon" />
              <h3>Drag & Drop your PDF here</h3>
              <p className="text-muted">Supports .pdf</p>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="application/pdf" 
                onChange={handleFileChange} 
              />
            </div>

            {file && (
              <div className="glass-card text-center">
                <h3 className="mb-4 truncate" title={file.name}>{file.name}</h3>
                
                
                {metadata && (
                  <div className="flex flex-col gap-2 text-left bg-background p-4 rounded mb-6 text-sm">
                    <p><strong>Title:</strong> {metadata.title || 'N/A'}</p>
                    <p><strong>Author:</strong> {metadata.author || 'N/A'}</p>
                    <p><strong>Subject:</strong> {metadata.subject || 'N/A'}</p>
                    <p><strong>Creator:</strong> {metadata.creator || 'N/A'}</p>
                  </div>
                )}
    

                <div className="flex justify-center gap-4">
                  <button className="btn btn-secondary" onClick={() => setFile(null)} disabled={isProcessing}>
                    Upload Another
                  </button>
                  <button className="btn btn-primary" onClick={processFile} disabled={isProcessing}>
                    {isProcessing ? "Processing..." : (
                      <>
                        <Info size={18} /> Remove Metadata
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
            <h2 className="mb-4">Processing Successful!</h2>
            
            <div className="flex gap-4 mt-8">
              <button className="btn btn-secondary" onClick={() => { setFile(null); setOutputUrl(null);  }}>
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
