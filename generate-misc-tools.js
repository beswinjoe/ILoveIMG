const fs = require('fs');
const path = require('path');

const tools = [
  {
    dir: 'svg-to-png',
    name: 'SvgToPng',
    title: 'SVG to PNG',
    desc: 'Convert scalable vector graphics (SVG) into standard PNG images.',
    icon: 'ImageDown',
    ui: '',
    state: '',
    processLogic: `
      const text = await file.text();
      const svgBlob = new Blob([text], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      
      const img = new Image();
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = url;
      });
      
      const canvas = document.createElement('canvas');
      canvas.width = img.width || 800;
      canvas.height = img.height || 600;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      
      const pngBlob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
      setOutputUrl(URL.createObjectURL(pngBlob));
      setDownloadName(file.name.replace(/\\.svg$/i, '') + '.png');
    `,
    accept: '.svg,image/svg+xml'
  },
  {
    dir: 'image-watermark',
    name: 'ImageWatermark',
    title: 'Image Watermark',
    desc: 'Add a text watermark to your images to protect your copyright.',
    icon: 'Stamp',
    ui: `
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Watermark Text</label>
        <input 
          type="text" 
          value={watermarkText} 
          onChange={(e) => setWatermarkText(e.target.value)} 
          className="input w-full" 
          placeholder="e.g. © 2026 Filoza"
        />
      </div>
    `,
    state: 'const [watermarkText, setWatermarkText] = useState("© Watermark");',
    processLogic: `
      const imageUrl = URL.createObjectURL(file);
      const img = new Image();
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = imageUrl;
      });
      
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      
      const fontSize = Math.max(20, Math.floor(img.width * 0.05));
      ctx.font = \`bold \${fontSize}px sans-serif\`;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.lineWidth = Math.max(1, Math.floor(fontSize / 15));
      
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      ctx.strokeText(watermarkText, img.width / 2, img.height / 2);
      ctx.fillText(watermarkText, img.width / 2, img.height / 2);
      
      const pngBlob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.95));
      setOutputUrl(URL.createObjectURL(pngBlob));
      setDownloadName(file.name.replace(/\\.[^/.]+$/, "") + '_watermarked.jpg');
    `,
    accept: 'image/*'
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
  title: '${tool.title} Tool - Free Online | Filoza',
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
import { UploadCloud, Download, CheckCircle2, ImageDown, Stamp, Loader2 } from "lucide-react";
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
      alert("An error occurred during processing. Please check your file and try again.");
    }

    setIsProcessing(false);
  };

  return (
    <ToolLayout
      title="${tool.title}"
      description="${tool.desc}"
      breadcrumbs={[{ label: "Image Tools", href: "/image-tools" }, { label: "${tool.title}", href: "/${tool.dir}" }]}
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
                      <><Loader2 className="animate-spin" size={18}/> Processing...</>
                    ) : (
                      <>
                        <${tool.icon} size={18} /> Process File
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
              <button className="btn btn-secondary" onClick={() => { setFile(null); setOutputUrl(null); }}>
                Process Another
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
