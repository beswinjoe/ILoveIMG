const fs = require('fs');
const path = require('path');

const tools = [
  {
    dir: 'rotate-image',
    name: 'RotateImage',
    title: 'Rotate Image',
    desc: 'Rotate your images clockwise or counter-clockwise instantly in your browser.',
    icon: 'RefreshCw',
    action: 'rotate(angle * Math.PI / 180)',
    ui: `
                  <div className="flex flex-col gap-4 mb-8 p-6 bg-background rounded-lg border border-border text-left">
                    <label className="label">Rotation Angle</label>
                    <div className="flex gap-4">
                      <button className="btn btn-secondary flex-1" onClick={() => setAngle(a => a - 90)}>-90°</button>
                      <button className="btn btn-secondary flex-1" onClick={() => setAngle(a => a + 90)}>+90°</button>
                    </div>
                    <div className="text-center font-bold">{angle}°</div>
                  </div>
    `,
    state: 'const [angle, setAngle] = useState(0);',
    processLogic: `
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error("Canvas not supported");

      const absAngle = Math.abs(angle) % 360;
      if (absAngle === 90 || absAngle === 270) {
        canvas.width = img.height;
        canvas.height = img.width;
      } else {
        canvas.width = img.width;
        canvas.height = img.height;
      }

      ctx.translate(canvas.width/2, canvas.height/2);
      ctx.rotate(angle * Math.PI / 180);
      ctx.drawImage(img, -img.width/2, -img.height/2);
    `
  },
  {
    dir: 'flip-image',
    name: 'FlipImage',
    title: 'Flip Image',
    desc: 'Flip your images horizontally or vertically.',
    icon: 'FlipHorizontal',
    ui: `
                  <div className="flex flex-col gap-4 mb-8 p-6 bg-background rounded-lg border border-border text-left">
                    <label className="label">Flip Direction</label>
                    <div className="flex gap-4">
                      <button className={\`btn \${flipH ? 'btn-primary' : 'btn-secondary'} flex-1\`} onClick={() => setFlipH(!flipH)}>Horizontal</button>
                      <button className={\`btn \${flipV ? 'btn-primary' : 'btn-secondary'} flex-1\`} onClick={() => setFlipV(!flipV)}>Vertical</button>
                    </div>
                  </div>
    `,
    state: 'const [flipH, setFlipH] = useState(false); const [flipV, setFlipV] = useState(false);',
    processLogic: `
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error("Canvas not supported");

      ctx.translate(flipH ? canvas.width : 0, flipV ? canvas.height : 0);
      ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
      ctx.drawImage(img, 0, 0);
    `
  },
  {
    dir: 'grayscale-image',
    name: 'GrayscaleImage',
    title: 'Grayscale Image',
    desc: 'Convert your images to black and white instantly.',
    icon: 'Palette',
    ui: ``,
    state: '',
    processLogic: `
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error("Canvas not supported");

      ctx.filter = 'grayscale(100%)';
      ctx.drawImage(img, 0, 0);
    `
  },
  {
    dir: 'blur-image',
    name: 'BlurImage',
    title: 'Blur Image',
    desc: 'Apply a gaussian blur effect to your image.',
    icon: 'Droplets',
    ui: `
                  <div className="flex flex-col gap-4 mb-8 p-6 bg-background rounded-lg border border-border text-left">
                    <label className="label">Blur Intensity</label>
                    <input type="range" min="1" max="50" value={blur} onChange={(e) => setBlur(parseInt(e.target.value))} className="w-full" />
                    <div className="text-center font-bold">{blur}px</div>
                  </div>
    `,
    state: 'const [blur, setBlur] = useState(5);',
    processLogic: `
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error("Canvas not supported");

      ctx.filter = \`blur(\${blur}px)\`;
      ctx.drawImage(img, 0, 0);
    `
  }
];

tools.forEach(tool => {
  const dirPath = path.join('./src/app', tool.dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  // page.tsx
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

  // Client.tsx
  const clientContent = `"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, Download, CheckCircle2, Image as ImageIcon, ${tool.icon} } from "lucide-react";
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

  const handleFile = (selectedFile: File) => {
    if (selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
      setOutputUrl(null);
    } else {
      alert("Please upload a valid image file.");
    }
  };

  const processImage = async () => {
    if (!file) return;
    setIsProcessing(true);

    try {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      ${tool.processLogic}

      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((b) => resolve(b!), file.type);
      });

      setOutputUrl(URL.createObjectURL(blob));
    } catch (error) {
      console.error(error);
      alert("An error occurred during image processing.");
    }

    setIsProcessing(false);
  };

  return (
    <ToolLayout
      title="${tool.title}"
      description="${tool.desc}"
      breadcrumbs={[{ label: "Image Tools", href: "/image-tools" }, { label: "${tool.title}", href: "/${tool.dir}" }]}
      faq={[
        { question: "Is my image uploaded?", answer: "No. Filoza processes your image entirely within your browser for 100% privacy." }
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
              <h3>Drag & Drop your image here</h3>
              <p className="text-muted">Supports JPG, PNG, WebP</p>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleFileChange} 
              />
            </div>

            {file && (
              <div className="glass-card text-center">
                <h3 className="mb-4 truncate" title={file.name}>{file.name}</h3>
                
                <div className="mb-6 flex justify-center bg-black/10 rounded-lg p-2 max-h-64 overflow-hidden">
                  <img src={URL.createObjectURL(file)} alt="Preview" className="max-h-full object-contain" />
                </div>

                ${tool.ui}

                <div className="flex justify-center gap-4">
                  <button className="btn btn-secondary" onClick={() => setFile(null)} disabled={isProcessing}>
                    Upload Another
                  </button>
                  <button className="btn btn-primary" onClick={processImage} disabled={isProcessing}>
                    {isProcessing ? "Processing..." : (
                      <>
                        <${tool.icon} size={18} /> Process Image
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
            
            <div className="mb-6 flex justify-center bg-black/10 rounded-lg p-2 max-h-64 overflow-hidden">
               <img src={outputUrl} alt="Output Preview" className="max-h-full object-contain" />
            </div>

            <div className="flex gap-4">
              <button className="btn btn-secondary" onClick={() => { setFile(null); setOutputUrl(null); }}>
                Process More
              </button>
              <a href={outputUrl} download={\`processed_\${file?.name}\`} className="btn btn-primary" style={{ textDecoration: 'none' }}>
                <Download size={18} /> Download Image
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
