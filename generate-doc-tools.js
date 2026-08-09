const fs = require('fs');
const path = require('path');

const tools = [
  {
    dir: 'word-to-pdf',
    name: 'WordToPdf',
    title: 'Word to PDF',
    desc: 'Convert Word documents (DOCX) to PDF format instantly in your browser.',
    icon: 'FileText',
    ui: '',
    state: '',
    processLogic: `
      const arrayBuffer = await file.arrayBuffer();
      const mammoth = (await import('mammoth')).default;
      const result = await mammoth.convertToHtml({ arrayBuffer });
      const html = result.value;
      
      const container = document.createElement('div');
      container.innerHTML = html;
      container.style.padding = '40px';
      container.style.fontFamily = 'Arial, sans-serif';
      container.style.width = '800px'; // standard A4 width approx for rendering
      document.body.appendChild(container);
      
      const html2pdf = (await import('html2pdf.js')).default;
      const opt = {
        margin: 1,
        filename: 'document.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
      };
      
      const pdfBlob = await html2pdf().from(container).set(opt).output('blob');
      document.body.removeChild(container);
      
      setOutputUrl(URL.createObjectURL(pdfBlob));
      setDownloadName(file.name.replace(/\.docx?$/i, '') + '.pdf');
    `,
    accept: '.docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  },
  {
    dir: 'word-to-text',
    name: 'WordToText',
    title: 'Word to Text',
    desc: 'Extract raw text from Word documents easily.',
    icon: 'AlignLeft',
    ui: '',
    state: '',
    processLogic: `
      const arrayBuffer = await file.arrayBuffer();
      const mammoth = (await import('mammoth')).default;
      const result = await mammoth.extractRawText({ arrayBuffer });
      
      const blob = new Blob([result.value], { type: 'text/plain' });
      setOutputUrl(URL.createObjectURL(blob));
      setDownloadName(file.name.replace(/\.docx?$/i, '') + '.txt');
    `,
    accept: '.docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  },
  {
    dir: 'docx-to-html',
    name: 'DocxToHtml',
    title: 'DOCX to HTML',
    desc: 'Convert Word documents to clean HTML code.',
    icon: 'Code',
    ui: '',
    state: '',
    processLogic: `
      const arrayBuffer = await file.arrayBuffer();
      const mammoth = (await import('mammoth')).default;
      const result = await mammoth.convertToHtml({ arrayBuffer });
      
      const blob = new Blob([result.value], { type: 'text/html' });
      setOutputUrl(URL.createObjectURL(blob));
      setDownloadName(file.name.replace(/\.docx?$/i, '') + '.html');
    `,
    accept: '.docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  },
  {
    dir: 'word-to-images',
    name: 'WordToImages',
    title: 'Word to Images',
    desc: 'Convert a Word document into high-quality images (PNG).',
    icon: 'Images',
    ui: '',
    state: '',
    processLogic: `
      // 1. DOCX to HTML
      const arrayBuffer = await file.arrayBuffer();
      const mammoth = (await import('mammoth')).default;
      const result = await mammoth.convertToHtml({ arrayBuffer });
      const html = result.value;
      
      const container = document.createElement('div');
      container.innerHTML = html;
      container.style.padding = '40px';
      container.style.fontFamily = 'Arial, sans-serif';
      container.style.width = '800px';
      document.body.appendChild(container);
      
      // 2. HTML to PDF
      const html2pdf = (await import('html2pdf.js')).default;
      const pdfBlob = await html2pdf().from(container).set({
        margin: 1, jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
      }).output('blob');
      document.body.removeChild(container);
      
      // 3. PDF to Images
      const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
      pdfjs.GlobalWorkerOptions.workerSrc = \`//cdnjs.cloudflare.com/ajax/libs/pdf.js/\${pdfjs.version}/pdf.worker.mjs\`;
      
      const pdfArrayBuffer = await pdfBlob.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: pdfArrayBuffer }).promise;
      
      const JSZip = (await import('jszip')).default;
      const zip = new JSZip();
      
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2.0 });
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        
        await page.render({ canvasContext: ctx, viewport }).promise;
        
        const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
        zip.file(\`page_\${i}.png\`, blob);
      }
      
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      setOutputUrl(URL.createObjectURL(zipBlob));
      setDownloadName(file.name.replace(/\.docx?$/i, '') + '_images.zip');
    `,
    accept: '.docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  },
  {
    dir: 'pdf-to-word',
    name: 'PdfToWord',
    title: 'PDF to Word',
    desc: 'Convert PDF documents into editable Word (DOCX) files.',
    icon: 'FileEdit',
    ui: '',
    state: '',
    processLogic: `
      const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
      pdfjs.GlobalWorkerOptions.workerSrc = \`//cdnjs.cloudflare.com/ajax/libs/pdf.js/\${pdfjs.version}/pdf.worker.mjs\`;
      
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      
      let fullText = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item) => item.str).join(' ');
        fullText += pageText + "\\n\\n";
      }
      
      const { Document, Packer, Paragraph, TextRun } = await import('docx');
      
      // Basic paragraph splitting
      const paragraphs = fullText.split('\\n\\n').map(p => 
        new Paragraph({ children: [new TextRun(p.trim())] })
      );
      
      const doc = new Document({
        sections: [{ properties: {}, children: paragraphs }]
      });
      
      const docxBlob = await Packer.toBlob(doc);
      setOutputUrl(URL.createObjectURL(docxBlob));
      setDownloadName(file.name.replace(/\.pdf$/i, '') + '.docx');
    `,
    accept: 'application/pdf'
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
import { UploadCloud, Download, CheckCircle2, FileText, AlignLeft, Code, Images, FileEdit, Loader2 } from "lucide-react";
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
