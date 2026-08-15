/**
 * Update JSON-LD Script
 * Injects JSON-LD structured data into all 66 tool page.tsx files.
 * Extracts the exact FAQ array from the corresponding Client component to ensure
 * the schema perfectly matches the rendered UI, honoring the strict user requirements.
 */
const fs = require('fs');
const path = require('path');

const APP_DIR = path.join(__dirname, 'src/app');

// Tool mappings from earlier tools data to get names
const toolNames = {
  'image-compressor': 'Image Compressor',
  'image-resizer': 'Image Resizer',
  'image-cropper': 'Image Cropper',
  'jpg-to-png': 'JPG to PNG',
  'png-to-jpg': 'PNG to JPG',
  'webp-converter': 'WebP Converter',
  'image-converter': 'Image Converter',
  'bulk-image-compressor': 'Bulk Image Compressor',
  'rotate-image': 'Rotate Image',
  'flip-image': 'Flip Image',
  'grayscale-image': 'Grayscale Image',
  'blur-image': 'Blur Image',
  'favicon-generator': 'Favicon Generator',
  'background-remover': 'Background Remover',
  'svg-to-png': 'SVG to PNG',
  'image-watermark': 'Watermark Image',
  'pdf-merge': 'Merge PDF',
  'pdf-split': 'Split PDF',
  'pdf-compress': 'Compress PDF',
  'pdf-rotate': 'Rotate PDF',
  'pdf-page-delete': 'Delete PDF Pages',
  'pdf-page-extract': 'Extract PDF Pages',
  'pdf-watermark': 'Watermark PDF',
  'image-to-pdf': 'Image to PDF',
  'pdf-to-images': 'PDF to Images',
  'text-to-pdf': 'Text to PDF',
  'pdf-page-numbers': 'Add PDF Page Numbers',
  'pdf-metadata': 'PDF Metadata',
  'wav-to-mp3': 'WAV to MP3',
  'mp3-to-wav': 'MP3 to WAV',
  'audio-compressor': 'Compress Audio',
  'audio-converter': 'Audio Converter',
  'audio-cutter': 'Trim Audio',
  'audio-volume': 'Change Audio Volume',
  'word-to-pdf': 'Word to PDF',
  'word-to-text': 'Word to Text',
  'docx-to-html': 'DOCX to HTML',
  'word-to-images': 'Word to Images',
  'pdf-to-word': 'PDF to Word',
  'excel-to-csv': 'Excel to CSV',
  'csv-to-excel': 'CSV to Excel',
  'spreadsheet-to-json': 'Spreadsheet to JSON',
  'json-to-csv': 'JSON to CSV',
  'excel-to-pdf': 'Excel to PDF',
  'csv-to-pdf': 'CSV to PDF',
  'markdown-to-html': 'Markdown to HTML',
  'markdown-to-pdf': 'Markdown to PDF',
  'html-to-pdf': 'HTML to PDF',
  'txt-to-pdf': 'TXT to PDF',
  'txt-to-docx': 'TXT to DOCX',
  'exif-remover': 'EXIF Remover',
  'qr-generator': 'QR Code Generator',
  'password-generator': 'Password Generator',
  'word-counter': 'Word Counter',
  'json-formatter': 'JSON Formatter',
  'color-picker': 'Color Picker',
  'base64': 'Base64 Encoder/Decoder',
  'uuid-generator': 'UUID Generator',
  'text-case': 'Text Case Converter',
  'timestamp': 'Timestamp Converter',
  'unit-converter': 'Unit Converter',
  'percentage-calculator': 'Percentage Calculator',
  'zip-creator': 'Create ZIP File',
  'zip-extractor': 'Extract ZIP File',
  'rar-extractor': 'Extract RAR File',
  'file-transfer': 'File Transfer',
};

let updated = 0;

for (const [slug, name] of Object.entries(toolNames)) {
  const pagePath = path.join(APP_DIR, slug, 'page.tsx');
  if (!fs.existsSync(pagePath)) continue;

  const files = fs.readdirSync(path.join(APP_DIR, slug));
  const clientFile = files.find(f => f.endsWith('Client.tsx'));
  
  if (!clientFile) continue;

  const clientPath = path.join(APP_DIR, slug, clientFile);
  const clientContent = fs.readFileSync(clientPath, 'utf-8');

  // Extract FAQ from client component
  // Regex looks for faq={[ ... ]} allowing newlines
  const faqMatch = clientContent.match(/faq=\{(\[\s*\{[\s\S]*?\}\s*\])\}/);
  const faqArrayStr = faqMatch ? faqMatch[1] : '[]';

  let pageContent = fs.readFileSync(pagePath, 'utf-8');

  // If already processed, skip
  if (pageContent.includes('generateToolJsonLd')) {
    console.log(`Skipping ${slug}, already has JSON-LD`);
    continue;
  }

  // 1. Add import
  if (!pageContent.includes('generateToolJsonLd')) {
    pageContent = pageContent.replace('import { Metadata } from "next";', 'import { Metadata } from "next";\nimport { generateToolJsonLd } from "@/lib/seo";');
  }

  // 2. Replace the default export function
  const functionMatch = pageContent.match(/export default function \w+\(\) \{\n\s*return <\w+ \/>;\n\}/);
  
  if (functionMatch) {
    const clientComponentName = functionMatch[0].match(/<(\w+) \/>/)[1];
    const newFunction = `export default function ${clientComponentName.replace('Client', 'Page')}() {
  const faq = ${faqArrayStr};
  const jsonLd = generateToolJsonLd('${slug}', '${name.replace(/'/g, "\\'")}', faq);

  return (
    <>
      {jsonLd.map((schema, idx) => (
        <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <${clientComponentName} />
    </>
  );
}`;
    pageContent = pageContent.replace(functionMatch[0], newFunction);
    fs.writeFileSync(pagePath, pageContent);
    updated++;
  } else {
    console.log(`Could not match function signature in ${slug}/page.tsx`);
  }
}

console.log(`\n✅ Updated ${updated} tool pages with structured data!`);
