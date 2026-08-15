"use client";

import React, { useState, useRef, useEffect } from "react";
import { UploadCloud, Download, CheckCircle2, FileText, AlignLeft, Code, Images, FileEdit, Loader2 } from "lucide-react";
export default function WordToImagesClient() {
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
      // 1. DOCX to HTML
      const arrayBuffer = await file.arrayBuffer();
      const mammoth = (await import('mammoth')).default;
      const result = await mammoth.convertToHtml({
        arrayBuffer
      });
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
        margin: 1,
        jsPDF: {
          unit: 'in',
          format: 'a4',
          orientation: 'portrait'
        }
      }).output('blob');
      document.body.removeChild(container);

      // 3. PDF to Images
      const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
      pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.mjs`;
      const pdfArrayBuffer = await pdfBlob.arrayBuffer();
      const pdf = await pdfjs.getDocument({
        data: pdfArrayBuffer
      }).promise;
      const JSZip = (await import('jszip')).default;
      const zip = new JSZip();
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({
          scale: 2.0
        });
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        await page.render({
          canvasContext: ctx,
          viewport
        } as any).promise;
        const blob = await new Promise<Blob>(resolve => canvas.toBlob(b => resolve(b as Blob), "image/png"));
        zip.file(`page_${i}.png`, blob);
      }
      const zipBlob = await zip.generateAsync({
        type: 'blob'
      });
      setOutputUrl(URL.createObjectURL(zipBlob));
      setDownloadName(file.name.replace(/.docx?$/i, '') + '_images.zip');
    } catch (error) {
      console.error(error);
      alert("An error occurred during conversion. Please check your file and try again.");
    }
    setIsProcessing(false);
  };
  return <>
      <div className="max-w-3xl mx-auto">
        {!outputUrl ? <>
            <div className="dropzone mb-8" onDrop={handleDrop} onDragOver={e => e.preventDefault()} onClick={() => fileInputRef.current?.click()}>
              <UploadCloud className="dropzone-icon" />
              <h3>Drag & Drop your file here</h3>
              <p className="text-muted">Supports .docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document</p>
              <input type="file" ref={fileInputRef} className="hidden" accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={handleFileChange} />
            </div>

            {file && <div className="glass-card text-center">
                <h3 className="mb-6 truncate" title={file.name}>{file.name}</h3>
                
                

                <div className="flex justify-center gap-4">
                  <button className="btn btn-secondary" onClick={() => setFile(null)} disabled={isProcessing}>
                    Upload Another
                  </button>
                  <button className="btn btn-primary" onClick={processFile} disabled={isProcessing}>
                    {isProcessing ? <><Loader2 className="animate-spin" size={18} /> Converting...</> : <>
                        <Images size={18} /> Convert File
                      </>}
                  </button>
                </div>
              </div>}
          </> : <div className="glass-card text-center py-12 flex flex-col items-center">
            <CheckCircle2 size={64} className="text-success mb-6" />
            <h2 className="mb-4">Conversion Successful!</h2>
            
            <div className="flex gap-4 mt-8">
              <button className="btn btn-secondary" onClick={() => {
            setFile(null);
            setOutputUrl(null);
          }}>
                Convert Another
              </button>
              <a href={outputUrl} download={downloadName} className="btn btn-primary" style={{
            textDecoration: 'none'
          }}>
                <Download size={18} /> Download Output
              </a>
            </div>
          </div>}
      </div>
    </>;
}