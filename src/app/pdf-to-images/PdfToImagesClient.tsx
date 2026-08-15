"use client";

import React, { useState, useRef, useEffect } from "react";
import { UploadCloud, CheckCircle2, FileArchive, Settings } from "lucide-react";
export default function PdfToImagesClient() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [imageFormat, setImageFormat] = useState<"image/jpeg" | "image/png">("image/jpeg");
  const [imageQuality, setImageQuality] = useState(0.9);
  const fileInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    // Import pdfjs-dist and configure worker dynamically to avoid SSR issues
    import("pdfjs-dist").then(pdfjs => {
      pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
    }).catch(err => console.error("Failed to load PDF.js", err));
  }, []);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFile = e.dataTransfer.files[0];
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
      } else {
        alert("Please upload a valid PDF file.");
      }
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
      } else {
        alert("Please upload a valid PDF file.");
      }
    }
  };
  const convertPdfToImages = async () => {
    if (!file) return;
    setIsProcessing(true);
    setProgress(0);
    try {
      const pdfjs = await import("pdfjs-dist");
      const JSZip = (await import("jszip")).default;
      const {
        saveAs
      } = await import("file-saver");
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({
        data: arrayBuffer
      }).promise;
      setTotalPages(pdf.numPages);
      const zip = new JSZip();
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        // Scale 2 for better resolution
        const viewport = page.getViewport({
          scale: 2.0
        });
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) continue;
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const renderContext = {
          canvasContext: ctx,
          viewport: viewport
        };
        await page.render(renderContext as any).promise;
        const dataUrl = canvas.toDataURL(imageFormat, imageQuality);
        const base64Data = dataUrl.split(",")[1];
        const extension = imageFormat === "image/jpeg" ? "jpg" : "png";
        zip.file(`page_${pageNum}.${extension}`, base64Data, {
          base64: true
        });
        setProgress(pageNum);
      }
      const zipBlob = await zip.generateAsync({
        type: "blob"
      });
      saveAs(zipBlob, `${file.name.replace(".pdf", "")}_images.zip`);
    } catch (error) {
      console.error(error);
      alert("An error occurred while converting the PDF.");
    } finally {
      setIsProcessing(false);
    }
  };
  return <>
      <div className="max-w-3xl mx-auto">
        {!file ? <div className="dropzone mb-8" onDrop={handleDrop} onDragOver={e => e.preventDefault()} onClick={() => fileInputRef.current?.click()}>
            <UploadCloud className="dropzone-icon" />
            <h3>Drag & Drop your PDF here</h3>
            <p className="text-muted">Only PDF files are supported</p>
            <input type="file" ref={fileInputRef} className="hidden" accept="application/pdf" onChange={handleFileChange} />
          </div> : <div className="glass-card">
            <h3 className="mb-2 truncate" title={file.name}>{file.name}</h3>
            <p className="text-muted text-sm mb-6">{(file.size / 1024 / 1024).toFixed(2)} MB</p>

            <div className="flex flex-wrap gap-6 mb-8 p-4 bg-background rounded-lg border border-border">
              <div className="flex flex-col gap-2 flex-1 min-w-[200px]">
                <label className="label flex items-center gap-2"><Settings size={16} /> Image Format</label>
                <select className="input" value={imageFormat} onChange={e => setImageFormat(e.target.value as any)} disabled={isProcessing}>
                  <option value="image/jpeg">JPG</option>
                  <option value="image/png">PNG</option>
                </select>
              </div>

              {imageFormat === "image/jpeg" && <div className="flex flex-col gap-2 flex-1 min-w-[200px]">
                  <label className="label flex justify-between">
                    <span>Quality</span>
                    <span>{Math.round(imageQuality * 100)}%</span>
                  </label>
                  <input type="range" min="0.1" max="1" step="0.1" value={imageQuality} onChange={e => setImageQuality(parseFloat(e.target.value))} className="w-full mt-2" disabled={isProcessing} />
                </div>}
            </div>

            {isProcessing && totalPages > 0 && <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span>Converting pages...</span>
                  <span className="font-medium">{progress} / {totalPages}</span>
                </div>
                <div className="w-full bg-border rounded-full h-2.5">
                  <div className="bg-primary h-2.5 rounded-full transition-all duration-300" style={{
              width: `${progress / totalPages * 100}%`
            }}></div>
                </div>
              </div>}

            <div className="flex justify-center gap-4">
              <button className="btn btn-secondary" onClick={() => setFile(null)} disabled={isProcessing}>
                Upload Another
              </button>
              <button className="btn btn-primary" onClick={convertPdfToImages} disabled={isProcessing}>
                {isProcessing ? "Processing..." : <>
                    <FileArchive size={18} /> Convert to Images (ZIP)
                  </>}
              </button>
            </div>
          </div>}
      </div>
    </>;
}