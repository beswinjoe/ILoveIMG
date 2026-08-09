"use client";

import React, { useState, useRef, useEffect } from "react";
import { UploadCloud, Download, CheckCircle2, FileText, Code, FileEdit, Loader2 } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";

export default function MarkdownToPdfClient() {
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
      
      const text = await file.text();
      const marked = (await import('marked')).marked;
      const html = await marked.parse(text);
      
      const container = document.createElement('div');
      container.innerHTML = html;
      container.style.padding = '40px';
      container.style.fontFamily = 'Arial, sans-serif';
      container.style.lineHeight = '1.6';
      container.style.width = '800px';
      
      // Basic styling for markdown elements
      const style = document.createElement('style');
      style.innerHTML = `
        h1, h2, h3 { border-bottom: 1px solid #eaecef; padding-bottom: 0.3em; }
        code { background: #f6f8fa; padding: 0.2em 0.4em; border-radius: 3px; font-family: monospace; }
        pre { background: #f6f8fa; padding: 16px; border-radius: 3px; overflow: auto; }
        blockquote { border-left: 0.25em solid #dfe2e5; color: #6a737d; padding: 0 1em; }
        table { border-collapse: collapse; width: 100%; }
        table, th, td { border: 1px solid #dfe2e5; padding: 6px 13px; }
      `;
      container.appendChild(style);
      
      document.body.appendChild(container);
      
      const html2pdf = (await import('html2pdf.js')).default;
      const pdfBlob = await html2pdf().from(container).set({
        margin: 0.5, filename: 'document.pdf',
        jsPDF: { unit: 'in', format: 'a4', orientation: "portrait" as const }
      }).output('blob');
      
      document.body.removeChild(container);
      setOutputUrl(URL.createObjectURL(pdfBlob));
      setDownloadName(file.name.replace(/\.md$/i, '') + '.pdf');
    
    } catch (error) {
      console.error(error);
      alert("An error occurred during conversion. Please check your file and try again.");
    }

    setIsProcessing(false);
  };

  return (
    <ToolLayout
      howItWorks={["Upload your file or paste your data.","Adjust the tool settings.","Run the tool.","Get your results instantly."]}
      supportedFormats="Various formats supported depending on the tool."
      title="Markdown to PDF"
      description="Convert Markdown documents into beautiful PDF files."
      breadcrumbs={[{ label: "Documents", href: "/documents" }, { label: "Markdown to PDF", href: "/markdown-to-pdf" }]}
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
              <p className="text-muted">Supports .md,.markdown,text/markdown</p>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept=".md,.markdown,text/markdown" 
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
                        <FileText size={18} /> Convert File
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
