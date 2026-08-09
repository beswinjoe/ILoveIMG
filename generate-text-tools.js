const fs = require('fs');
const path = require('path');

const tools = [
  {
    dir: 'markdown-to-html',
    name: 'MarkdownToHtml',
    title: 'Markdown to HTML',
    desc: 'Convert Markdown documents to clean HTML code.',
    icon: 'Code',
    ui: '',
    state: '',
    processLogic: `
      const text = await file.text();
      const marked = (await import('marked')).marked;
      const html = marked.parse(text);
      
      const blob = new Blob([html], { type: 'text/html' });
      setOutputUrl(URL.createObjectURL(blob));
      setDownloadName(file.name.replace(/\\.md$/i, '') + '.html');
    `,
    accept: '.md,.markdown,text/markdown'
  },
  {
    dir: 'markdown-to-pdf',
    name: 'MarkdownToPdf',
    title: 'Markdown to PDF',
    desc: 'Convert Markdown documents into beautiful PDF files.',
    icon: 'FileText',
    ui: '',
    state: '',
    processLogic: `
      const text = await file.text();
      const marked = (await import('marked')).marked;
      const html = marked.parse(text);
      
      const container = document.createElement('div');
      container.innerHTML = html;
      container.style.padding = '40px';
      container.style.fontFamily = 'Arial, sans-serif';
      container.style.lineHeight = '1.6';
      container.style.width = '800px';
      
      // Basic styling for markdown elements
      const style = document.createElement('style');
      style.innerHTML = \`
        h1, h2, h3 { border-bottom: 1px solid #eaecef; padding-bottom: 0.3em; }
        code { background: #f6f8fa; padding: 0.2em 0.4em; border-radius: 3px; font-family: monospace; }
        pre { background: #f6f8fa; padding: 16px; border-radius: 3px; overflow: auto; }
        blockquote { border-left: 0.25em solid #dfe2e5; color: #6a737d; padding: 0 1em; }
        table { border-collapse: collapse; width: 100%; }
        table, th, td { border: 1px solid #dfe2e5; padding: 6px 13px; }
      \`;
      container.appendChild(style);
      
      document.body.appendChild(container);
      
      const html2pdf = (await import('html2pdf.js')).default;
      const pdfBlob = await html2pdf().from(container).set({
        margin: 0.5, filename: 'document.pdf',
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
      }).output('blob');
      
      document.body.removeChild(container);
      setOutputUrl(URL.createObjectURL(pdfBlob));
      setDownloadName(file.name.replace(/\\.md$/i, '') + '.pdf');
    `,
    accept: '.md,.markdown,text/markdown'
  },
  {
    dir: 'html-to-pdf',
    name: 'HtmlToPdf',
    title: 'HTML to PDF',
    desc: 'Convert HTML files to PDF format.',
    icon: 'FileText',
    ui: '',
    state: '',
    processLogic: `
      const text = await file.text();
      
      const container = document.createElement('div');
      container.innerHTML = text;
      container.style.padding = '20px';
      container.style.width = '800px';
      
      document.body.appendChild(container);
      
      const html2pdf = (await import('html2pdf.js')).default;
      const pdfBlob = await html2pdf().from(container).set({
        margin: 0.5, filename: 'document.pdf',
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
      }).output('blob');
      
      document.body.removeChild(container);
      setOutputUrl(URL.createObjectURL(pdfBlob));
      setDownloadName(file.name.replace(/\\.html?$/i, '') + '.pdf');
    `,
    accept: '.html,.htm,text/html'
  },
  {
    dir: 'txt-to-pdf',
    name: 'TxtToPdf',
    title: 'TXT to PDF',
    desc: 'Convert plain text files to PDF documents.',
    icon: 'FileText',
    ui: '',
    state: '',
    processLogic: `
      const text = await file.text();
      
      const container = document.createElement('div');
      container.innerText = text; // preserves whitespace/newlines via CSS
      container.style.padding = '40px';
      container.style.fontFamily = 'monospace';
      container.style.whiteSpace = 'pre-wrap';
      container.style.width = '800px';
      
      document.body.appendChild(container);
      
      const html2pdf = (await import('html2pdf.js')).default;
      const pdfBlob = await html2pdf().from(container).set({
        margin: 0.5, filename: 'document.pdf',
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
      }).output('blob');
      
      document.body.removeChild(container);
      setOutputUrl(URL.createObjectURL(pdfBlob));
      setDownloadName(file.name.replace(/\\.txt$/i, '') + '.pdf');
    `,
    accept: '.txt,text/plain'
  },
  {
    dir: 'txt-to-docx',
    name: 'TxtToDocx',
    title: 'TXT to DOCX',
    desc: 'Convert plain text files into editable Word documents.',
    icon: 'FileEdit',
    ui: '',
    state: '',
    processLogic: `
      const text = await file.text();
      const { Document, Packer, Paragraph, TextRun } = await import('docx');
      
      const paragraphs = text.split('\\n').map(p => 
        new Paragraph({ children: [new TextRun(p)] })
      );
      
      const doc = new Document({
        sections: [{ properties: {}, children: paragraphs }]
      });
      
      const docxBlob = await Packer.toBlob(doc);
      setOutputUrl(URL.createObjectURL(docxBlob));
      setDownloadName(file.name.replace(/\\.txt$/i, '') + '.docx');
    `,
    accept: '.txt,text/plain'
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
  title: '${tool.title} Converter - Free Online | Filoza',
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

import React, { useState, useRef, useEffect } from "react";
import { UploadCloud, Download, CheckCircle2, FileText, Code, FileEdit, Loader2 } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";

export default function ${tool.name}Client() {
  const [file, setFile] = useState<File | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [downloadName, setDownloadName] = useState<string>("output");
  const [isProcessing, setIsProcessing] = useState(false);
  
  ${tool.state}
  
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
      ${tool.processLogic}
    } catch (error) {
      console.error(error);
      alert("An error occurred during conversion. Please check your file and try again.");
    }

    setIsProcessing(false);
  };

  return (
    <ToolLayout
      title="${tool.title}"
      description="${tool.desc}"
      breadcrumbs={[{ label: "Documents", href: "/documents" }, { label: "${tool.title}", href: "/${tool.dir}" }]}
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
              <p className="text-muted">Supports ${tool.accept}</p>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="${tool.accept}" 
                onChange={handleFileChange} 
              />
            </div>

            {file && (
              <div className="glass-card text-center">
                <h3 className="mb-6 truncate" title={file.name}>{file.name}</h3>
                
                ${tool.ui}

                <div className="flex justify-center gap-4">
                  <button className="btn btn-secondary" onClick={() => setFile(null)} disabled={isProcessing}>
                    Upload Another
                  </button>
                  <button className="btn btn-primary" onClick={processFile} disabled={isProcessing}>
                    {isProcessing ? (
                      <><Loader2 className="animate-spin" size={18}/> Converting...</>
                    ) : (
                      <>
                        <${tool.icon} size={18} /> Convert File
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
`;
  fs.writeFileSync(path.join(dirPath, `${tool.name}Client.tsx`), clientContent);
  console.log(`Generated ${tool.title}`);
});
