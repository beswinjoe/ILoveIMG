import React from 'react';
import { 
  ImageDown, Maximize, Crop, ArrowRightLeft, FileImage, Images, 
  Files, Scissors, FileDown, RotateCw, FileX, FileOutput, Stamp,
  AudioLines, AudioWaveform, Volume2,
  QrCode, KeyRound, FileText, Braces, Pipette, Binary, Fingerprint, CaseUpper, Clock, Ruler, Percent,
  Wrench, FlipHorizontal, Palette, Droplets, Box, Shield, Hash, Info
, Wand2, FileSpreadsheet, Code, FileEdit, AlignLeft } from "lucide-react";

import { FileArchive, ArchiveRestore, Send, Hash as HashIcon, FileJson } from "lucide-react";

export type ToolCategory = 'Image Tools' | 'PDF Tools' | 'Audio Tools' | 'Other Utilities' | 'Documents' | 'Archive' | 'File Transfer';

export interface ToolItem {
  name: string;
  href: string;
  category: ToolCategory;
  description: string;
  keywords: string[];
  icon: React.ReactNode;
}

export const toolsData: ToolItem[] = [
  // IMAGE TOOLS
  {
    name: "Image Compressor",
    href: "/image-compressor",
    category: "Image Tools",
    description: "Compress JPG, PNG and WebP images",
    keywords: ["compress", "image", "jpg", "png", "webp", "reduce", "size"],
    icon: <ImageDown />
  },
  {
    name: "Image Resizer",
    href: "/image-resizer",
    category: "Image Tools",
    description: "Resize images quickly",
    keywords: ["resize", "image", "scale", "dimensions", "width", "height"],
    icon: <Maximize />
  },
  {
    name: "Image Cropper",
    href: "/image-cropper",
    category: "Image Tools",
    description: "Crop images to any size",
    keywords: ["crop", "image", "cut", "trim", "aspect", "ratio"],
    icon: <Crop />
  },
  {
    name: "JPG to PNG",
    href: "/jpg-to-png",
    category: "Image Tools",
    description: "Convert JPG to transparent PNG format",
    keywords: ["convert", "jpg", "png", "transparent", "format"],
    icon: <ArrowRightLeft />
  },
  {
    name: "PNG to JPG",
    href: "/png-to-jpg",
    category: "Image Tools",
    description: "Convert PNG to optimized JPG",
    keywords: ["convert", "png", "jpg", "jpeg", "optimize"],
    icon: <ArrowRightLeft />
  },
  {
    name: "WebP Converter",
    href: "/webp-converter",
    category: "Image Tools",
    description: "Convert between WebP and other formats",
    keywords: ["convert", "webp", "image", "format"],
    icon: <FileImage />
  },
  {
    name: "Image Converter",
    href: "/image-converter",
    category: "Image Tools",
    description: "Universal image format converter",
    keywords: ["convert", "image", "format", "universal"],
    icon: <FileImage />
  },
  {
    name: "Bulk Image Compressor",
    href: "/bulk-image-compressor",
    category: "Image Tools",
    description: "Compress multiple images at once",
    keywords: ["compress", "bulk", "batch", "multiple", "images"],
    icon: <Images />
  },
  {
    name: "Rotate Image",
    href: "/rotate-image",
    category: "Image Tools",
    description: "Rotate your images instantly",
    keywords: ["rotate", "image", "turn", "orientation"],
    icon: <RotateCw />
  },
  {
    name: "Flip Image",
    href: "/flip-image",
    category: "Image Tools",
    description: "Flip images horizontally or vertically",
    keywords: ["flip", "image", "mirror", "reverse"],
    icon: <FlipHorizontal />
  },
  {
    name: "Grayscale Image",
    href: "/grayscale-image",
    category: "Image Tools",
    description: "Convert images to black and white",
    keywords: ["grayscale", "black", "white", "monochrome", "image"],
    icon: <Palette />
  },
  {
    name: "Blur Image",
    href: "/blur-image",
    category: "Image Tools",
    description: "Apply a gaussian blur effect",
    keywords: ["blur", "image", "gaussian", "effect", "soften"],
    icon: <Droplets />
  },
  {
    name: "Favicon Generator",
    href: "/favicon-generator",
    category: "Image Tools",
    description: "Generate 32x32 favicons from images",
    keywords: ["favicon", "generate", "icon", "website"],
    icon: <Box />
  },

  // PDF TOOLS
  {
    name: "Merge PDF",
    href: "/pdf-merge",
    category: "PDF Tools",
    description: "Combine multiple PDF files",
    keywords: ["merge", "pdf", "combine", "join", "files"],
    icon: <Files />
  },
  {
    name: "Split PDF",
    href: "/pdf-split",
    category: "PDF Tools",
    description: "Split PDF pages into separate files",
    keywords: ["split", "pdf", "separate", "extract", "pages"],
    icon: <Scissors />
  },
  {
    name: "Compress PDF",
    href: "/pdf-compress",
    category: "PDF Tools",
    description: "Reduce file size of your PDFs",
    keywords: ["compress", "pdf", "reduce", "size", "optimize"],
    icon: <FileDown />
  },
  {
    name: "Rotate PDF",
    href: "/pdf-rotate",
    category: "PDF Tools",
    description: "Rotate individual PDF pages",
    keywords: ["rotate", "pdf", "turn", "orientation", "pages"],
    icon: <RotateCw />
  },
  {
    name: "Delete PDF Pages",
    href: "/pdf-page-delete",
    category: "PDF Tools",
    description: "Remove unwanted pages from a PDF",
    keywords: ["delete", "remove", "pdf", "pages"],
    icon: <FileX />
  },
  {
    name: "Extract PDF Pages",
    href: "/pdf-page-extract",
    category: "PDF Tools",
    description: "Pull specific pages out of a PDF",
    keywords: ["extract", "pull", "pdf", "pages"],
    icon: <FileOutput />
  },
  {
    name: "Watermark PDF",
    href: "/pdf-watermark",
    category: "PDF Tools",
    description: "Add a watermark to your PDF",
    keywords: ["watermark", "pdf", "stamp", "brand"],
    icon: <Stamp />
  },
  {
    name: "Image to PDF",
    href: "/image-to-pdf",
    category: "PDF Tools",
    description: "Convert images to PDF format",
    keywords: ["convert", "image", "pdf", "jpg", "png"],
    icon: <FileImage />
  },
  {
    name: "PDF to Images",
    href: "/pdf-to-images",
    category: "PDF Tools",
    description: "Extract PDF pages as images",
    keywords: ["convert", "pdf", "image", "extract", "pages"],
    icon: <Images />
  },
  {
    name: "Text to PDF",
    href: "/text-to-pdf",
    category: "PDF Tools",
    description: "Convert text to a neat PDF document",
    keywords: ["text", "pdf", "convert", "document"],
    icon: <FileText />
  },
  {
    name: "PDF Page Numbers",
    href: "/pdf-page-numbers",
    category: "PDF Tools",
    description: "Add page numbers to your PDFs",
    keywords: ["pdf", "page", "numbers", "add"],
    icon: <Hash />
  },
  {
    name: "PDF Metadata",
    href: "/pdf-metadata",
    category: "PDF Tools",
    description: "View or remove metadata from PDFs",
    keywords: ["pdf", "metadata", "remove", "clean"],
    icon: <Info />
  },

  // AUDIO TOOLS
  {
    name: "WAV to MP3",
    href: "/wav-to-mp3",
    category: "Audio Tools",
    description: "Convert WAV audio to MP3",
    keywords: ["convert", "wav", "mp3", "audio"],
    icon: <AudioLines />
  },
  {
    name: "MP3 to WAV",
    href: "/mp3-to-wav",
    category: "Audio Tools",
    description: "Convert MP3 audio to WAV",
    keywords: ["convert", "mp3", "wav", "audio"],
    icon: <AudioLines />
  },
  {
    name: "Audio Compressor",
    href: "/audio-compressor",
    category: "Audio Tools",
    description: "Reduce audio file sizes",
    keywords: ["compress", "audio", "reduce", "size"],
    icon: <AudioWaveform />
  },
  {
    name: "Audio Converter",
    href: "/audio-converter",
    category: "Audio Tools",
    description: "Convert between common audio formats",
    keywords: ["convert", "audio", "format"],
    icon: <ArrowRightLeft />
  },
  {
    name: "Audio Cutter",
    href: "/audio-cutter",
    category: "Audio Tools",
    description: "Trim and cut audio files",
    keywords: ["cut", "trim", "audio", "clip"],
    icon: <Scissors />
  },
  {
    name: "Audio Volume",
    href: "/audio-volume",
    category: "Audio Tools",
    description: "Increase or decrease audio volume",
    keywords: ["volume", "audio", "increase", "decrease", "loudness"],
    icon: <Volume2 />
  },

  // OTHER UTILITIES
  {
    name: "EXIF Remover",
    href: "/exif-remover",
    category: "Other Utilities",
    description: "Remove hidden metadata from images",
    keywords: ["exif", "metadata", "remove", "strip", "privacy"],
    icon: <Shield />
  },
  {
    name: "QR Code Generator",
    href: "/qr-generator",
    category: "Other Utilities",
    description: "Generate QR codes from text or URLs",
    keywords: ["qr", "code", "generate", "create", "barcode"],
    icon: <QrCode />
  },
  {
    name: "Password Generator",
    href: "/password-generator",
    category: "Other Utilities",
    description: "Create secure, randomized passwords",
    keywords: ["password", "generate", "secure", "random"],
    icon: <KeyRound />
  },
  {
    name: "Word Counter",
    href: "/word-counter",
    category: "Other Utilities",
    description: "Count words, characters, and sentences",
    keywords: ["word", "count", "characters", "sentences", "text"],
    icon: <FileText />
  },
  {
    name: "JSON Formatter",
    href: "/json-formatter",
    category: "Other Utilities",
    description: "Format and validate JSON data",
    keywords: ["json", "format", "validate", "beautify"],
    icon: <Braces />
  },
  {
    name: "Color Picker",
    href: "/color-picker",
    category: "Other Utilities",
    description: "Pick colors and convert HEX, RGB, HSL",
    keywords: ["color", "picker", "hex", "rgb", "hsl", "convert"],
    icon: <Pipette />
  },
  {
    name: "Base64 Encoder",
    href: "/base64",
    category: "Other Utilities",
    description: "Encode and decode text to Base64",
    keywords: ["base64", "encode", "decode", "text"],
    icon: <Binary />
  },
  {
    name: "UUID Generator",
    href: "/uuid-generator",
    category: "Other Utilities",
    description: "Generate unique random UUIDs (v4)",
    keywords: ["uuid", "generate", "random", "unique", "guid"],
    icon: <Fingerprint />
  },
  {
    name: "Text Case Converter",
    href: "/text-case",
    category: "Other Utilities",
    description: "Convert text to uppercase, lowercase",
    keywords: ["text", "case", "convert", "uppercase", "lowercase", "title"],
    icon: <CaseUpper />
  },
  {
    name: "Timestamp Converter",
    href: "/timestamp",
    category: "Other Utilities",
    description: "Convert Unix timestamps to dates",
    keywords: ["timestamp", "unix", "convert", "date", "time"],
    icon: <Clock />
  },
  {
    name: "Unit Converter",
    href: "/unit-converter",
    category: "Other Utilities",
    description: "Convert between units of measurement",
    keywords: ["unit", "convert", "measurement", "weight", "length", "temperature"],
    icon: <Ruler />
  },
  {
    name: "Percentage Calculator",
    href: "/percentage-calculator",
    category: "Other Utilities",
    description: "Calculate percentage increases",
    keywords: ["percentage", "calculate", "math", "increase", "decrease"],
    icon: <Percent />
  },
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
  },
  
  // ARCHIVE TOOLS
  {
    name: "ZIP Creator",
    href: "/zip-creator",
    category: "Archive",
    description: "Combine multiple files into a single ZIP archive locally.",
    keywords: ["zip", "create", "archive", "compress", "combine", "files"],
    icon: <FileArchive />
  },
  {
    name: "ZIP Extractor",
    href: "/zip-extractor",
    category: "Archive",
    description: "Extract files from a ZIP archive securely in your browser.",
    keywords: ["zip", "extract", "unzip", "archive", "open", "files"],
    icon: <ArchiveRestore />
  },
  {
    name: "RAR Extractor",
    href: "/rar-extractor",
    category: "Archive",
    description: "Extract files from a RAR archive safely without uploading.",
    keywords: ["rar", "extract", "unrar", "archive", "open", "files"],
    icon: <ArchiveRestore />
  },

  // FILE TRANSFER
  {
    name: "Large File Transfer",
    href: "/file-transfer",
    category: "File Transfer",
    description: "Send large files securely with self-destructing links.",
    keywords: ["send", "transfer", "large", "files", "share", "upload", "download"],
    icon: <Send />
  },

];
