const fs = require('fs');
const path = require('path');

const toolsPath = path.join(__dirname, 'src/lib/tools.tsx');
let content = fs.readFileSync(toolsPath, 'utf8');

// Update imports
if (!content.includes('Wand2')) {
  content = content.replace(/} from 'lucide-react';/, ', Wand2, FileSpreadsheet, Code, FileEdit } from "lucide-react";');
}

// Update Type
if (!content.includes("'Documents'")) {
  content = content.replace(/\| 'Other Utilities';/, "| 'Other Utilities' | 'Documents';");
}

const newTools = `
  // DOCUMENTS
  {
    name: "Word to PDF",
    href: "/word-to-pdf",
    category: "Documents",
    description: "Convert Word documents (DOCX) to PDF format instantly.",
    keywords: ["word", "pdf", "docx", "convert", "document"],
    icon: <FileText />
  },
  {
    name: "Word to Text",
    href: "/word-to-text",
    category: "Documents",
    description: "Extract raw text from Word documents easily.",
    keywords: ["word", "text", "docx", "txt", "extract"],
    icon: <AlignLeft />
  },
  {
    name: "DOCX to HTML",
    href: "/docx-to-html",
    category: "Documents",
    description: "Convert Word documents to clean HTML code.",
    keywords: ["docx", "html", "word", "convert", "web"],
    icon: <Code />
  },
  {
    name: "Word to Images",
    href: "/word-to-images",
    category: "Documents",
    description: "Convert a Word document into high-quality images.",
    keywords: ["word", "image", "docx", "png", "convert"],
    icon: <Images />
  },
  {
    name: "PDF to Word",
    href: "/pdf-to-word",
    category: "Documents",
    description: "Convert PDF documents into editable Word (DOCX) files.",
    keywords: ["pdf", "word", "docx", "convert", "extract"],
    icon: <FileEdit />
  },
  {
    name: "Excel to CSV",
    href: "/excel-to-csv",
    category: "Documents",
    description: "Convert Excel files (.xlsx) to CSV format easily.",
    keywords: ["excel", "csv", "xlsx", "convert", "spreadsheet"],
    icon: <FileSpreadsheet />
  },
  {
    name: "CSV to Excel",
    href: "/csv-to-excel",
    category: "Documents",
    description: "Convert CSV files to Excel (.xlsx) format.",
    keywords: ["csv", "excel", "xlsx", "convert", "spreadsheet"],
    icon: <FileSpreadsheet />
  },
  {
    name: "Spreadsheet to JSON",
    href: "/spreadsheet-to-json",
    category: "Documents",
    description: "Convert Excel or CSV data into JSON format.",
    keywords: ["excel", "csv", "json", "convert", "spreadsheet"],
    icon: <Braces />
  },
  {
    name: "JSON to CSV",
    href: "/json-to-csv",
    category: "Documents",
    description: "Convert JSON data into CSV format.",
    keywords: ["json", "csv", "convert", "data"],
    icon: <FileSpreadsheet />
  },
  {
    name: "Excel to PDF",
    href: "/excel-to-pdf",
    category: "Documents",
    description: "Convert Excel files (.xlsx) to PDF format.",
    keywords: ["excel", "pdf", "xlsx", "convert", "spreadsheet"],
    icon: <FileText />
  },
  {
    name: "CSV to PDF",
    href: "/csv-to-pdf",
    category: "Documents",
    description: "Convert CSV files to PDF format.",
    keywords: ["csv", "pdf", "convert", "spreadsheet"],
    icon: <FileText />
  },
  {
    name: "Markdown to HTML",
    href: "/markdown-to-html",
    category: "Documents",
    description: "Convert Markdown documents to clean HTML code.",
    keywords: ["markdown", "html", "convert", "md"],
    icon: <Code />
  },
  {
    name: "Markdown to PDF",
    href: "/markdown-to-pdf",
    category: "Documents",
    description: "Convert Markdown documents into beautiful PDF files.",
    keywords: ["markdown", "pdf", "convert", "md"],
    icon: <FileText />
  },
  {
    name: "HTML to PDF",
    href: "/html-to-pdf",
    category: "Documents",
    description: "Convert HTML files to PDF format.",
    keywords: ["html", "pdf", "convert", "web"],
    icon: <FileText />
  },
  {
    name: "TXT to PDF",
    href: "/txt-to-pdf",
    category: "Documents",
    description: "Convert plain text files to PDF documents.",
    keywords: ["txt", "pdf", "text", "convert"],
    icon: <FileText />
  },
  {
    name: "TXT to DOCX",
    href: "/txt-to-docx",
    category: "Documents",
    description: "Convert plain text files into editable Word documents.",
    keywords: ["txt", "docx", "word", "convert", "text"],
    icon: <FileEdit />
  },
  
  // NEW IMAGE TOOLS
  {
    name: "Background Remover",
    href: "/background-remover",
    category: "Image Tools",
    description: "Automatically remove the background from any image.",
    keywords: ["background", "remove", "transparent", "png", "ai"],
    icon: <Wand2 />
  },
  {
    name: "SVG to PNG",
    href: "/svg-to-png",
    category: "Image Tools",
    description: "Convert scalable vector graphics (SVG) into PNG.",
    keywords: ["svg", "png", "image", "convert", "vector"],
    icon: <ImageDown />
  },
  {
    name: "Image Watermark",
    href: "/image-watermark",
    category: "Image Tools",
    description: "Add a text watermark to protect your copyright.",
    keywords: ["watermark", "image", "protect", "stamp", "copyright"],
    icon: <Stamp />
  }
];
`;

if (!content.includes('name: "Background Remover"')) {
  content = content.replace(/\n];/, newTools + '\n];');
  fs.writeFileSync(toolsPath, content);
  console.log("Updated tools.tsx");
} else {
  console.log("Already updated.");
}

