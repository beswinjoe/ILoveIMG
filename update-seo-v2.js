/**
 * SEO Update Script
 * Updates all tool page.tsx and category page.tsx files with improved SEO metadata
 * and JSON-LD structured data from the centralized seo.ts file.
 *
 * Run: node update-seo-v2.js
 */
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://filoza.vercel.app';
const APP_DIR = path.join(__dirname, 'src/app');

// ─── Tool SEO data (mirrored from seo.ts for use in this Node script) ───

const toolSeoTitles = {
  'image-compressor': 'Image Compressor - Compress JPG, PNG & WebP Online | Filoza',
  'image-resizer': 'Image Resizer - Resize Images Online for Free | Filoza',
  'image-cropper': 'Image Cropper - Crop Images to Any Size Online | Filoza',
  'jpg-to-png': 'JPG to PNG Converter - Convert JPEG to PNG Online | Filoza',
  'png-to-jpg': 'PNG to JPG Converter - Convert PNG to JPEG Online | Filoza',
  'webp-converter': 'WebP Converter - Convert WebP to JPG, PNG & Back | Filoza',
  'image-converter': 'Image Converter - Convert Between JPG, PNG, WebP & More | Filoza',
  'bulk-image-compressor': 'Bulk Image Compressor - Compress Multiple Images at Once | Filoza',
  'rotate-image': 'Rotate Image Online - Rotate JPG, PNG & WebP | Filoza',
  'flip-image': 'Flip Image Online - Mirror Images Horizontally or Vertically | Filoza',
  'grayscale-image': 'Grayscale Image Converter - Convert Images to Black & White | Filoza',
  'blur-image': 'Blur Image Online - Apply Gaussian Blur Effect | Filoza',
  'favicon-generator': 'Favicon Generator - Create Favicons from Images Online | Filoza',
  'background-remover': 'Background Remover - Remove Image Backgrounds Online | Filoza',
  'svg-to-png': 'SVG to PNG Converter - Convert SVG Files to PNG Online | Filoza',
  'image-watermark': 'Image Watermark - Add Text Watermarks to Images Online | Filoza',
  'pdf-merge': 'Merge PDF Files Online - Combine PDFs for Free | Filoza',
  'pdf-split': 'Split PDF Online - Extract Pages from PDFs for Free | Filoza',
  'pdf-compress': 'Compress PDF - Reduce PDF File Size Online | Filoza',
  'pdf-rotate': 'Rotate PDF Pages Online - Free PDF Page Rotation | Filoza',
  'pdf-page-delete': 'Delete PDF Pages - Remove Pages from PDFs Online | Filoza',
  'pdf-page-extract': 'Extract PDF Pages - Pull Specific Pages from PDFs | Filoza',
  'pdf-watermark': 'Watermark PDF - Add Watermarks to PDF Pages Online | Filoza',
  'image-to-pdf': 'Image to PDF Converter - Convert Images to PDF Online | Filoza',
  'pdf-to-images': 'PDF to Images - Convert PDF Pages to JPG or PNG | Filoza',
  'text-to-pdf': 'Text to PDF Converter - Convert Text to PDF Online | Filoza',
  'pdf-page-numbers': 'Add Page Numbers to PDF - Number PDF Pages Online | Filoza',
  'pdf-metadata': 'PDF Metadata Editor - View & Remove PDF Metadata | Filoza',
  'wav-to-mp3': 'WAV to MP3 Converter - Convert WAV Audio to MP3 Online | Filoza',
  'mp3-to-wav': 'MP3 to WAV Converter - Convert MP3 Audio to WAV Online | Filoza',
  'audio-compressor': 'Audio Compressor - Reduce Audio File Size Online | Filoza',
  'audio-converter': 'Audio Converter - Convert Between Audio Formats Online | Filoza',
  'audio-cutter': 'Audio Cutter - Trim & Cut Audio Files Online | Filoza',
  'audio-volume': 'Audio Volume Changer - Adjust Audio Volume Online | Filoza',
  'word-to-pdf': 'Word to PDF Converter - Convert DOCX to PDF Online | Filoza',
  'word-to-text': 'Word to Text Converter - Extract Text from DOCX | Filoza',
  'docx-to-html': 'DOCX to HTML Converter - Convert Word to HTML Online | Filoza',
  'word-to-images': 'Word to Images - Convert DOCX Pages to Images | Filoza',
  'pdf-to-word': 'PDF to Word Converter - Convert PDF to DOCX Online | Filoza',
  'excel-to-csv': 'Excel to CSV Converter - Convert XLSX to CSV Online | Filoza',
  'csv-to-excel': 'CSV to Excel Converter - Convert CSV to XLSX Online | Filoza',
  'spreadsheet-to-json': 'Spreadsheet to JSON Converter - Convert Excel/CSV to JSON | Filoza',
  'json-to-csv': 'JSON to CSV Converter - Convert JSON Data to CSV Online | Filoza',
  'excel-to-pdf': 'Excel to PDF Converter - Convert XLSX to PDF Online | Filoza',
  'csv-to-pdf': 'CSV to PDF Converter - Convert CSV Files to PDF Online | Filoza',
  'markdown-to-html': 'Markdown to HTML Converter - Convert MD to HTML Online | Filoza',
  'markdown-to-pdf': 'Markdown to PDF Converter - Convert MD to PDF Online | Filoza',
  'html-to-pdf': 'HTML to PDF Converter - Convert HTML to PDF Online | Filoza',
  'txt-to-pdf': 'TXT to PDF Converter - Convert Text Files to PDF Online | Filoza',
  'txt-to-docx': 'TXT to DOCX Converter - Convert Text to Word Online | Filoza',
  'exif-remover': 'EXIF Remover - Remove Metadata from Images Online | Filoza',
  'qr-generator': 'QR Code Generator - Create QR Codes from Text or URLs | Filoza',
  'password-generator': 'Password Generator - Create Secure Random Passwords | Filoza',
  'word-counter': 'Word Counter - Count Words, Characters & Sentences | Filoza',
  'json-formatter': 'JSON Formatter & Validator - Format JSON Online | Filoza',
  'color-picker': 'Color Picker - Pick & Convert HEX, RGB, HSL Colors | Filoza',
  'base64': 'Base64 Encoder & Decoder - Encode/Decode Text Online | Filoza',
  'uuid-generator': 'UUID Generator - Generate Random UUIDs (v4) Online | Filoza',
  'text-case': 'Text Case Converter - Change Text Case Online | Filoza',
  'timestamp': 'Timestamp Converter - Convert Unix Timestamps to Dates | Filoza',
  'unit-converter': 'Unit Converter - Convert Length, Weight & Temperature Online | Filoza',
  'percentage-calculator': 'Percentage Calculator - Calculate Percentages Online | Filoza',
  'zip-creator': 'ZIP Creator - Create ZIP Archives Online | Filoza',
  'zip-extractor': 'ZIP Extractor - Extract ZIP Files Online | Filoza',
  'rar-extractor': 'RAR Extractor - Extract RAR Files Online | Filoza',
  'file-transfer': 'Large File Transfer - Send Files Securely Online | Filoza',
};

const toolSeoDescs = {
  'image-compressor': 'Compress JPG, PNG, and WebP images online without losing quality. Adjust compression level, preview results, and download — all processed in your browser.',
  'image-resizer': 'Resize images to any dimension online. Supports JPG, PNG, and WebP. Set custom width and height or scale by percentage — processed locally in your browser.',
  'image-cropper': 'Crop images to custom dimensions or aspect ratios online. Supports JPG, PNG, and WebP. Free, fast, and processed entirely in your browser.',
  'jpg-to-png': 'Convert JPG and JPEG images to PNG format online for free. Preserve image quality and gain transparency support. Processed locally in your browser.',
  'png-to-jpg': 'Convert PNG images to JPG format online. Reduce file size while maintaining quality. Free and processed in your browser with no uploads.',
  'webp-converter': 'Convert WebP images to JPG or PNG, or convert other image formats to WebP. Free online converter that works entirely in your browser.',
  'image-converter': 'Convert images between JPG, PNG, WebP, and other formats online. Universal image format converter that processes files locally in your browser.',
  'bulk-image-compressor': 'Compress multiple JPG, PNG, and WebP images in one batch. Reduce file sizes without uploading — all processing happens in your browser.',
  'rotate-image': 'Rotate images 90°, 180°, or 270° online. Supports JPG, PNG, and WebP. Free tool that processes images locally in your browser.',
  'flip-image': 'Flip images horizontally or vertically online. Supports JPG, PNG, and WebP formats. Free and processed entirely in your browser.',
  'grayscale-image': 'Convert color images to grayscale (black and white) online. Supports JPG, PNG, and WebP. Processed locally in your browser.',
  'blur-image': 'Apply a gaussian blur effect to images online. Adjust blur intensity for JPG, PNG, and WebP images. Processed locally in your browser.',
  'favicon-generator': 'Generate 32×32 favicon.ico files from any image online. Upload a JPG, PNG, or WebP image and download a ready-to-use favicon.',
  'background-remover': 'Remove backgrounds from images automatically online. Get a transparent PNG result. Powered by AI and processed locally in your browser.',
  'svg-to-png': 'Convert SVG vector graphics to PNG raster images online. Set custom dimensions and download high-quality PNG files. Processed in your browser.',
  'image-watermark': 'Add custom text watermarks to images online to protect your copyright. Adjust position, size, opacity, and color. Processed in your browser.',
  'pdf-merge': 'Merge multiple PDF files into one document online. Drag to reorder pages before combining. Free and processed locally in your browser.',
  'pdf-split': 'Split PDF files by selecting specific pages or page ranges. Extract individual pages into separate PDF documents. Processed in your browser.',
  'pdf-compress': 'Compress PDF files to reduce their size online. Optimizes embedded images while keeping text sharp. Free and processed in your browser.',
  'pdf-rotate': 'Rotate individual PDF pages 90°, 180°, or 270° online. Fix page orientation issues in your PDF documents. Processed in your browser.',
  'pdf-page-delete': 'Remove unwanted pages from PDF files online. Select pages to delete and download the updated PDF. Processed locally in your browser.',
  'pdf-page-extract': 'Extract specific pages from a PDF document online. Select the pages you need and download them as a new PDF file. Free and browser-based.',
  'pdf-watermark': 'Add text watermarks to PDF pages online. Customize font, size, color, opacity, and position. Free and processed in your browser.',
  'image-to-pdf': 'Convert JPG, PNG, and WebP images into a PDF document online. Combine multiple images into a single PDF file. Processed in your browser.',
  'pdf-to-images': 'Convert PDF pages to JPG or PNG images online. Extract each page as a separate image file. Free and processed in your browser.',
  'text-to-pdf': 'Convert plain text into a formatted PDF document online. Type or paste text and generate a clean PDF file. Processed in your browser.',
  'pdf-page-numbers': 'Add page numbers to your PDF documents online. Choose position and starting number. Free and processed in your browser.',
  'pdf-metadata': 'View or remove metadata from PDF files online. Clean author, title, and other hidden information from your PDFs. Processed in your browser.',
  'wav-to-mp3': 'Convert WAV audio files to MP3 format online. Reduce audio file size while maintaining quality. Processed locally in your browser using WebAssembly.',
  'mp3-to-wav': 'Convert MP3 audio files to uncompressed WAV format online. Get lossless audio output. Processed in your browser using WebAssembly.',
  'audio-compressor': 'Compress audio files to reduce their size online. Supports MP3, WAV, OGG, and M4A formats. Processed locally in your browser.',
  'audio-converter': 'Convert audio files between MP3, WAV, OGG, and other formats online. Free tool powered by WebAssembly, processed in your browser.',
  'audio-cutter': 'Trim and cut audio files online. Set start and end points to extract the section you need. Supports MP3, WAV, and OGG.',
  'audio-volume': 'Increase or decrease audio volume online. Adjust the loudness of MP3, WAV, and OGG files. Processed in your browser.',
  'word-to-pdf': 'Convert Word documents (DOCX) to PDF format online. Preserves formatting and layout. Free and processed in your browser.',
  'word-to-text': 'Extract raw text from Word (DOCX) documents online. Remove all formatting and get plain text output. Processed in your browser.',
  'docx-to-html': 'Convert Word documents (DOCX) to clean HTML code online. Get web-ready HTML from your Word files. Processed in your browser.',
  'word-to-images': 'Convert Word document pages into high-quality images online. Each page becomes a separate image file. Processed in your browser.',
  'pdf-to-word': 'Convert PDF documents to editable Word (DOCX) files online. Extract text and structure from PDFs. Processed in your browser.',
  'excel-to-csv': 'Convert Excel spreadsheets (XLSX) to CSV format online. Export your spreadsheet data as a comma-separated file. Processed in your browser.',
  'csv-to-excel': 'Convert CSV files to Excel (XLSX) format online. Open CSV data in Excel with proper columns. Processed in your browser.',
  'spreadsheet-to-json': 'Convert Excel or CSV spreadsheet data into JSON format online. Useful for developers working with data APIs. Processed in your browser.',
  'json-to-csv': 'Convert JSON arrays and objects into CSV format online. Useful for data export and spreadsheet import. Processed in your browser.',
  'excel-to-pdf': 'Convert Excel spreadsheets (XLSX) to PDF format online. Preserve table structure in a printable PDF. Processed in your browser.',
  'csv-to-pdf': 'Convert CSV files to formatted PDF tables online. Get a printable PDF from your CSV data. Processed in your browser.',
  'markdown-to-html': 'Convert Markdown documents to clean HTML code online. Supports headings, lists, code blocks, and more. Processed in your browser.',
  'markdown-to-pdf': 'Convert Markdown documents into formatted PDF files online. Supports headings, lists, code blocks, and more. Processed in your browser.',
  'html-to-pdf': 'Convert HTML files or code to PDF format online. Render web content as a downloadable PDF document. Processed in your browser.',
  'txt-to-pdf': 'Convert plain text (.txt) files to formatted PDF documents online. Upload a text file and download a clean PDF. Processed in your browser.',
  'txt-to-docx': 'Convert plain text (.txt) files to editable Word (DOCX) documents online. Processed in your browser with no file uploads.',
  'exif-remover': 'Remove hidden EXIF metadata from images online. Strip location data, camera info, and other metadata for privacy. Processed in your browser.',
  'qr-generator': 'Generate QR codes from text, URLs, or other data online. Download as PNG image. Free, fast, and works in your browser.',
  'password-generator': 'Generate strong, randomized passwords online. Customize length, and include letters, numbers, and symbols. Generated entirely in your browser.',
  'word-counter': 'Count words, characters, sentences, and paragraphs in your text online. Useful for writers, students, and content creators.',
  'json-formatter': 'Format, beautify, and validate JSON data online. Indent and syntax-highlight JSON for readability. Processed in your browser.',
  'color-picker': 'Pick colors and convert between HEX, RGB, and HSL formats online. Copy color values for use in design and development.',
  'base64': 'Encode text to Base64 or decode Base64 strings back to text online. Useful for developers working with encoded data.',
  'uuid-generator': 'Generate unique random UUIDs (v4) online. Copy instantly for use in databases, APIs, and applications. Generated in your browser.',
  'text-case': 'Convert text between uppercase, lowercase, title case, sentence case, and more online. Paste your text and transform it instantly.',
  'timestamp': 'Convert Unix timestamps to human-readable dates and vice versa. Useful for developers working with epoch time.',
  'unit-converter': 'Convert between units of length, weight, temperature, and more online. Supports metric and imperial units.',
  'percentage-calculator': 'Calculate percentage increases, decreases, and differences online. A quick math tool for everyday calculations.',
  'zip-creator': 'Create ZIP archives from multiple files online. Combine files into a single .zip download. All processing happens locally in your browser.',
  'zip-extractor': 'Extract and browse the contents of ZIP archives online. View files and download individually or all at once. Processed locally in your browser.',
  'rar-extractor': 'Extract files from RAR archives online. Browse and download contents without installing software. Processed locally in your browser.',
  'file-transfer': 'Send large files securely with encrypted, self-destructing download links. Set passwords and expiration dates. Files are encrypted before upload.',
};

// ─── Update all tool page.tsx files ───

let updatedCount = 0;
let skippedCount = 0;

for (const [slug, title] of Object.entries(toolSeoTitles)) {
  const desc = toolSeoDescs[slug];
  if (!desc) continue;

  const pagePath = path.join(APP_DIR, slug, 'page.tsx');
  if (!fs.existsSync(pagePath)) {
    console.log(`⚠ Skipping ${slug}: page.tsx not found`);
    skippedCount++;
    continue;
  }

  let content = fs.readFileSync(pagePath, 'utf-8');

  // Escape special characters for use in string literals
  const safeTitle = title.replace(/&/g, '&');
  const safeDesc = desc.replace(/'/g, "\\'");

  const newMetadata = `export const metadata: Metadata = {
  title: "${safeTitle}",
  description: "${safeDesc}",
  alternates: {
    canonical: "${BASE_URL}/${slug}"
  },
  openGraph: {
    title: "${safeTitle}",
    description: "${safeDesc}",
    url: "${BASE_URL}/${slug}",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "${safeTitle}",
    description: "${safeDesc}",
  }
};`;

  // Replace existing metadata block
  content = content.replace(/export const metadata: Metadata = \{[\s\S]*?\};\n?/, newMetadata + '\n');

  // Ensure Metadata import exists
  if (!content.includes('import { Metadata }') && !content.includes("import type { Metadata }")) {
    content = `import { Metadata } from "next";\n` + content;
  }

  fs.writeFileSync(pagePath, content);
  updatedCount++;
}

console.log(`\n✅ Updated ${updatedCount} tool pages, skipped ${skippedCount}`);

// ─── Update category pages ───

const categoryUpdates = {
  'image-tools': {
    title: 'Image Tools - Compress, Resize & Convert Images Online | Filoza',
    desc: 'Free online image tools to compress, resize, crop, convert, and edit JPG, PNG, WebP, and SVG images. All processing happens in your browser.',
  },
  'pdf-tools': {
    title: 'PDF Tools - Merge, Split, Compress & Convert PDFs Online | Filoza',
    desc: 'Free online PDF tools to merge, split, compress, rotate, watermark, and convert PDF files. Works directly in your browser with no uploads.',
  },
  'audio-tools': {
    title: 'Audio Tools - Convert & Edit Audio Files Online | Filoza',
    desc: 'Free online audio tools to convert, compress, trim, and adjust audio files. Supports MP3, WAV, OGG, and M4A formats in your browser.',
  },
  'documents': {
    title: 'Document Converter - Convert Word, Excel, CSV & More Online | Filoza',
    desc: 'Free online document conversion tools. Convert between Word, PDF, Excel, CSV, JSON, Markdown, and HTML formats directly in your browser.',
  },
  'archive': {
    title: 'Archive Tools - Extract & Create ZIP, RAR Files Online | Filoza',
    desc: 'Free online archive tools to create and extract ZIP and RAR files. All processing happens locally in your browser — no files are uploaded.',
  },
  'tools': {
    title: 'Online Utilities - QR Code, Password Generator & More | Filoza',
    desc: 'Free online utilities including QR code generator, password generator, JSON formatter, color picker, unit converter, and more.',
  },
};

for (const [slug, data] of Object.entries(categoryUpdates)) {
  const pagePath = path.join(APP_DIR, slug, 'page.tsx');
  if (!fs.existsSync(pagePath)) {
    console.log(`⚠ Category page not found: ${slug}`);
    continue;
  }

  let content = fs.readFileSync(pagePath, 'utf-8');

  const newMetadata = `export const metadata: Metadata = {
  title: "${data.title}",
  description: "${data.desc}",
  alternates: {
    canonical: "${BASE_URL}/${slug}"
  },
  openGraph: {
    title: "${data.title}",
    description: "${data.desc}",
    url: "${BASE_URL}/${slug}",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "${data.title}",
    description: "${data.desc}",
  }
};`;

  content = content.replace(/export const metadata: Metadata = \{[\s\S]*?\};\n?/, newMetadata + '\n');
  fs.writeFileSync(pagePath, content);
  console.log(`✅ Updated category: ${slug}`);
}

console.log('\n🎉 SEO metadata update complete!');
