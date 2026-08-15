"use client";

import React, { useState, useRef, useEffect } from "react";
import { UploadCloud, Download, CheckCircle2, FileText, FileSpreadsheet, Braces, Loader2 } from "lucide-react";
export default function ExcelToPdfClient() {
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
      const ExcelJS = await import('exceljs');
      const arrayBuffer = await file.arrayBuffer();
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(arrayBuffer);
      const worksheet = workbook.worksheets[0];

      // Generate simple HTML table
      let html = '<table border="1" cellpadding="5" cellspacing="0" style="width: 100%; border-collapse: collapse; font-family: sans-serif; font-size: 12px;">';
      worksheet.eachRow((row, rowNumber) => {
        html += '<tr>';
        row.eachCell({
          includeEmpty: true
        }, (cell, colNumber) => {
          const val = cell.value !== null && cell.value !== undefined ? cell.value.toString() : '';
          html += rowNumber === 1 ? `<th style="background:#f0f0f0">${val}</th>` : `<td>${val}</td>`;
        });
        html += '</tr>';
      });
      html += '</table>';
      const container = document.createElement('div');
      container.innerHTML = html;
      container.style.padding = '20px';
      container.style.width = '800px';
      document.body.appendChild(container);
      const html2pdf = (await import('html2pdf.js')).default;
      const pdfBlob = await html2pdf().from(container).set({
        margin: 0.5,
        filename: 'document.pdf',
        jsPDF: {
          unit: 'in',
          format: 'a4',
          orientation: "landscape" as const
        }
      }).output('blob');
      document.body.removeChild(container);
      setOutputUrl(URL.createObjectURL(pdfBlob));
      setDownloadName(file.name.replace(/\.xlsx?$/i, '') + '.pdf');
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
              <p className="text-muted">Supports .xlsx</p>
              <input type="file" ref={fileInputRef} className="hidden" accept=".xlsx" onChange={handleFileChange} />
            </div>

            {file && <div className="glass-card text-center">
                <h3 className="mb-6 truncate" title={file.name}>{file.name}</h3>
                
                

                <div className="flex justify-center gap-4">
                  <button className="btn btn-secondary" onClick={() => setFile(null)} disabled={isProcessing}>
                    Upload Another
                  </button>
                  <button className="btn btn-primary" onClick={processFile} disabled={isProcessing}>
                    {isProcessing ? <><Loader2 className="animate-spin" size={18} /> Converting...</> : <>
                        <FileText size={18} /> Convert File
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