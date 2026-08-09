const fs = require('fs');
const path = require('path');

const tools = [
  {
    dir: 'excel-to-csv',
    name: 'ExcelToCsv',
    title: 'Excel to CSV',
    desc: 'Convert Excel files (.xlsx) to CSV format easily.',
    icon: 'FileSpreadsheet',
    ui: '',
    state: '',
    processLogic: `
      const ExcelJS = await import('exceljs');
      const arrayBuffer = await file.arrayBuffer();
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(arrayBuffer);
      
      const worksheet = workbook.worksheets[0];
      const csvBuffer = await workbook.csv.writeBuffer({ sheetId: worksheet.id });
      
      const blob = new Blob([csvBuffer], { type: 'text/csv' });
      setOutputUrl(URL.createObjectURL(blob));
      setDownloadName(file.name.replace(/\\.xlsx?$/i, '') + '.csv');
    `,
    accept: '.xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  },
  {
    dir: 'csv-to-excel',
    name: 'CsvToExcel',
    title: 'CSV to Excel',
    desc: 'Convert CSV files to Excel (.xlsx) format.',
    icon: 'FileSpreadsheet',
    ui: '',
    state: '',
    processLogic: `
      const ExcelJS = await import('exceljs');
      const text = await file.text();
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Sheet 1');
      
      const Papa = (await import('papaparse')).default;
      const parsed = Papa.parse(text, { skipEmptyLines: true });
      
      parsed.data.forEach(row => {
        worksheet.addRow(row);
      });
      
      const xlsxBuffer = await workbook.xlsx.writeBuffer();
      
      const blob = new Blob([xlsxBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      setOutputUrl(URL.createObjectURL(blob));
      setDownloadName(file.name.replace(/\\.csv$/i, '') + '.xlsx');
    `,
    accept: '.csv,text/csv'
  },
  {
    dir: 'spreadsheet-to-json',
    name: 'SpreadsheetToJson',
    title: 'Spreadsheet to JSON',
    desc: 'Convert Excel or CSV data into JSON format.',
    icon: 'Braces',
    ui: '',
    state: '',
    processLogic: `
      const isCsv = file.name.toLowerCase().endsWith('.csv');
      let data = [];
      
      if (isCsv) {
        const text = await file.text();
        const Papa = (await import('papaparse')).default;
        const parsed = Papa.parse(text, { header: true, skipEmptyLines: true });
        data = parsed.data;
      } else {
        const ExcelJS = await import('exceljs');
        const arrayBuffer = await file.arrayBuffer();
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(arrayBuffer);
        
        const worksheet = workbook.worksheets[0];
        let headers = [];
        worksheet.eachRow((row, rowNumber) => {
          const rowValues = row.values.slice(1);
          if (rowNumber === 1) {
            headers = rowValues;
          } else {
            const obj = {};
            rowValues.forEach((val, i) => {
              if (headers[i]) obj[headers[i]] = val;
            });
            data.push(obj);
          }
        });
      }
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      setOutputUrl(URL.createObjectURL(blob));
      setDownloadName(file.name.replace(/\\.(xlsx|csv)$/i, '') + '.json');
    `,
    accept: '.csv,.xlsx'
  },
  {
    dir: 'json-to-csv',
    name: 'JsonToCsv',
    title: 'JSON to CSV',
    desc: 'Convert JSON data into CSV format.',
    icon: 'FileSpreadsheet',
    ui: '',
    state: '',
    processLogic: `
      const text = await file.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        throw new Error("Invalid JSON file");
      }
      
      const Papa = (await import('papaparse')).default;
      const csvString = Papa.unparse(data);
      
      const blob = new Blob([csvString], { type: 'text/csv' });
      setOutputUrl(URL.createObjectURL(blob));
      setDownloadName(file.name.replace(/\\.json$/i, '') + '.csv');
    `,
    accept: '.json,application/json'
  },
  {
    dir: 'excel-to-pdf',
    name: 'ExcelToPdf',
    title: 'Excel to PDF',
    desc: 'Convert Excel files (.xlsx) to PDF format.',
    icon: 'FileText',
    ui: '',
    state: '',
    processLogic: `
      const ExcelJS = await import('exceljs');
      const arrayBuffer = await file.arrayBuffer();
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(arrayBuffer);
      
      const worksheet = workbook.worksheets[0];
      
      // Generate simple HTML table
      let html = '<table border="1" cellpadding="5" cellspacing="0" style="width: 100%; border-collapse: collapse; font-family: sans-serif; font-size: 12px;">';
      worksheet.eachRow((row, rowNumber) => {
        html += '<tr>';
        row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
          const val = cell.value !== null && cell.value !== undefined ? cell.value.toString() : '';
          html += rowNumber === 1 ? \`<th style="background:#f0f0f0">\${val}</th>\` : \`<td>\${val}</td>\`;
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
        margin: 0.5, filename: 'document.pdf',
        jsPDF: { unit: 'in', format: 'a4', orientation: 'landscape' }
      }).output('blob');
      
      document.body.removeChild(container);
      setOutputUrl(URL.createObjectURL(pdfBlob));
      setDownloadName(file.name.replace(/\\.xlsx?$/i, '') + '.pdf');
    `,
    accept: '.xlsx'
  },
  {
    dir: 'csv-to-pdf',
    name: 'CsvToPdf',
    title: 'CSV to PDF',
    desc: 'Convert CSV files to PDF format.',
    icon: 'FileText',
    ui: '',
    state: '',
    processLogic: `
      const text = await file.text();
      const Papa = (await import('papaparse')).default;
      const parsed = Papa.parse(text, { skipEmptyLines: true });
      
      // Generate simple HTML table
      let html = '<table border="1" cellpadding="5" cellspacing="0" style="width: 100%; border-collapse: collapse; font-family: sans-serif; font-size: 12px;">';
      parsed.data.forEach((row, rowNumber) => {
        html += '<tr>';
        row.forEach(cell => {
          const val = cell || '';
          html += rowNumber === 0 ? \`<th style="background:#f0f0f0">\${val}</th>\` : \`<td>\${val}</td>\`;
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
        margin: 0.5, filename: 'document.pdf',
        jsPDF: { unit: 'in', format: 'a4', orientation: 'landscape' }
      }).output('blob');
      
      document.body.removeChild(container);
      setOutputUrl(URL.createObjectURL(pdfBlob));
      setDownloadName(file.name.replace(/\\.csv$/i, '') + '.pdf');
    `,
    accept: '.csv,text/csv'
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
import { UploadCloud, Download, CheckCircle2, FileText, FileSpreadsheet, Braces, Loader2 } from "lucide-react";
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
