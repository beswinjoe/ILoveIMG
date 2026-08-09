const fs = require('fs');
const path = require('path');

const tools = [
  {
    dir: 'text-to-pdf',
    name: 'TextToPdf',
    title: 'Text to PDF',
    desc: 'Instantly convert your raw text into a neat PDF document.',
    icon: 'FileText',
    ui: `
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
    `,
    state: 'const [text, setText] = useState("");',
    isFileUpload: false,
    processLogic: `
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([595.28, 841.89]); // A4
      
      const { width, height } = page.getSize();
      const fontSize = 12;
      const margin = 50;
      const lineHeight = 1.5 * fontSize;

      const lines = text.split('\\n');
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
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      setOutputUrl(URL.createObjectURL(blob));
    `
  },
  {
    dir: 'pdf-page-numbers',
    name: 'PdfPageNumbers',
    title: 'PDF Page Numbers',
    desc: 'Add page numbers to your PDF documents easily.',
    icon: 'Hash',
    ui: ``,
    state: '',
    isFileUpload: true,
    processLogic: `
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();
      
      pages.forEach((page, idx) => {
        const { width } = page.getSize();
        page.drawText(String(idx + 1), {
          x: width / 2,
          y: 20,
          size: 12,
        });
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      setOutputUrl(URL.createObjectURL(blob));
    `
  },
  {
    dir: 'pdf-metadata',
    name: 'PdfMetadata',
    title: 'PDF Metadata Viewer',
    desc: 'View or remove metadata from your PDF files.',
    icon: 'Info',
    ui: `
                {metadata && (
                  <div className="flex flex-col gap-2 text-left bg-background p-4 rounded mb-6 text-sm">
                    <p><strong>Title:</strong> {metadata.title || 'N/A'}</p>
                    <p><strong>Author:</strong> {metadata.author || 'N/A'}</p>
                    <p><strong>Subject:</strong> {metadata.subject || 'N/A'}</p>
                    <p><strong>Creator:</strong> {metadata.creator || 'N/A'}</p>
                  </div>
                )}
    `,
    state: 'const [metadata, setMetadata] = useState<any>(null);',
    isFileUpload: true,
    onFileLoaded: `
      const arrayBuffer = await f.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      setMetadata({
        title: pdfDoc.getTitle(),
        author: pdfDoc.getAuthor(),
        subject: pdfDoc.getSubject(),
        creator: pdfDoc.getCreator(),
      });
    `,
    processLogic: `
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      
      pdfDoc.setTitle('');
      pdfDoc.setAuthor('');
      pdfDoc.setSubject('');
      pdfDoc.setKeywords([]);
      pdfDoc.setProducer('');
      pdfDoc.setCreator('');

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      setOutputUrl(URL.createObjectURL(blob));
    `,
    btnText: "Remove Metadata"
  }
];

tools.forEach(tool => {
  const dirPath = path.join('./src/app', tool.dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  const pageContent = `import { Metadata } from 'next';
import ${tool.name}Client from './${tool.name}Client';

export const metadata: Metadata = {
  title: '${tool.title} | Filoza',
  description: '${tool.desc}',
  alternates: {
    canonical: 'https://fileefloww.vercel.app/${tool.dir}'
  }
};

export default function Page() {
  return <${tool.name}Client />;
}
`;
  fs.writeFileSync(path.join(dirPath, 'page.tsx'), pageContent);

  const clientContent = `"use client";

import React, { useState, useRef } from "react";
import { PDFDocument } from "pdf-lib";
import { UploadCloud, Download, CheckCircle2, FileText, Hash, Info, File } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";

export default function ${tool.name}Client() {
  const [file, setFile] = useState<File | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  ${tool.state}
  
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
      ${tool.onFileLoaded ? tool.onFileLoaded.replace(/f\.arrayBuffer/g, 'selectedFile.arrayBuffer') : ''}
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const processFile = async () => {
    ${tool.isFileUpload ? 'if (!file) return;' : ''}
    setIsProcessing(true);

    try {
      ${tool.processLogic}
    } catch (error) {
      console.error(error);
      alert("An error occurred during processing.");
    }

    setIsProcessing(false);
  };

  return (
    <ToolLayout
      title="${tool.title}"
      description="${tool.desc}"
      breadcrumbs={[{ label: "PDF Tools", href: "/pdf-tools" }, { label: "${tool.title}", href: "/${tool.dir}" }]}
      faq={[
        { question: "Are my files uploaded anywhere?", answer: "No. Filoza processes your files entirely within your browser for 100% privacy." }
      ]}
    >
      <div className="max-w-3xl mx-auto">
        {!outputUrl ? (
          <>
            ${tool.isFileUpload ? `
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
                
                ${tool.ui}

                <div className="flex justify-center gap-4">
                  <button className="btn btn-secondary" onClick={() => setFile(null)} disabled={isProcessing}>
                    Upload Another
                  </button>
                  <button className="btn btn-primary" onClick={processFile} disabled={isProcessing}>
                    {isProcessing ? "Processing..." : (
                      <>
                        <${tool.icon} size={18} /> ${tool.btnText || "Process PDF"}
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
            ` : tool.ui}
          </>
        ) : (
          <div className="glass-card text-center py-12 flex flex-col items-center">
            <CheckCircle2 size={64} className="text-success mb-6" />
            <h2 className="mb-4">Processing Successful!</h2>
            
            <div className="flex gap-4 mt-8">
              <button className="btn btn-secondary" onClick={() => { setFile(null); setOutputUrl(null); ${!tool.isFileUpload ? 'setText("");' : ''} }}>
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
`;
  fs.writeFileSync(path.join(dirPath, `${tool.name}Client.tsx`), clientContent);
  console.log(`Generated ${tool.title}`);
});
