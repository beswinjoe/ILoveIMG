"use client";

import React, { useState, useRef, useEffect } from "react";
import { UploadCloud, Download, CheckCircle2, FileText, AlignLeft, Code, Images, FileEdit, Loader2 } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";

export default function PdfToWordClient() {
  const [file, setFile] = useState<File | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [downloadName, setDownloadName] = useState<string>("output");
  const [isProcessing, setIsProcessing] = useState(false);
  
  
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (outputUrl) URL.revokeObjectURL(outputUrl);
    };
  }, [outputUrl]);

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

  const handleFile = (selectedFile: File) => {
    setFile(selectedFile);
    setOutputUrl(null);
  };

  const processFile = async () => {
    if (!file) return;
    setIsProcessing(true);

    try {
      
      const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
      pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.mjs`;
      
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      
      let fullText = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item) => (item as any).str).join(' ');
        fullText += pageText + "\n\n";
      }
      
      const { Document, Packer, Paragraph, TextRun } = await import('docx');
      
      // Basic paragraph splitting
      const paragraphs = fullText.split('\n\n').map(p => 
        new Paragraph({ children: [new TextRun(p.trim())] })
      );
      
      const doc = new Document({
        sections: [{ properties: {}, children: paragraphs }]
      });
      
      const docxBlob = await Packer.toBlob(doc);
      setOutputUrl(URL.createObjectURL(docxBlob));
      setDownloadName(file.name.replace(/.pdf$/i, '') + '.docx');
    
    } catch (error) {
      console.error(error);
      alert("An error occurred during conversion. Please check your file and try again.");
    }

    setIsProcessing(false);
  };

  return (
    <ToolLayout
      title="PDF to Word"
      description="Convert PDF documents into editable Word (DOCX) files."
      breadcrumbs={[{ label: "Documents", href: "/documents" }, { label: "PDF to Word", href: "/pdf-to-word" }]}
      faq={[
        { question: "Is my file uploaded anywhere?", answer: "No. Filoza processes your files entirely within your browser for 100% privacy." }
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
              <h3>Drag & Drop your file here</h3>
              <p className="text-muted">Supports application/pdf</p>
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
                <h3 className="mb-6 truncate" title={file.name}>{file.name}</h3>
                
                

                <div className="flex justify-center gap-4">
                  <button className="btn btn-secondary" onClick={() => setFile(null)} disabled={isProcessing}>
                    Upload Another
                  </button>
                  <button className="btn btn-primary" onClick={processFile} disabled={isProcessing}>
                    {isProcessing ? (
                      <><Loader2 className="animate-spin" size={18}/> Converting...</>
                    ) : (
                      <>
                        <FileEdit size={18} /> Convert File
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
            <h2 className="mb-4">Conversion Successful!</h2>
            
            <div className="flex gap-4 mt-8">
              <button className="btn btn-secondary" onClick={() => { setFile(null); setOutputUrl(null); }}>
                Convert Another
              </button>
              <a href={outputUrl} download={downloadName} className="btn btn-primary" style={{ textDecoration: 'none' }}>
                <Download size={18} /> Download Output
              </a>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
