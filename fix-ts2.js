const fs = require('fs');

function replace(file, search, rep) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(search, rep);
  fs.writeFileSync(file, content);
}

replace('./src/app/image-watermark/ImageWatermarkClient.tsx', /new Promise\(\(resolve\)/, 'new Promise<Blob>((resolve)');
replace('./src/app/svg-to-png/SvgToPngClient.tsx', /new Promise\(\(resolve\)/, 'new Promise<Blob>((resolve)');
replace('./src/app/word-to-images/WordToImagesClient.tsx', /new Promise\(\(resolve\)/, 'new Promise<Blob>((resolve)');
replace('./src/app/word-to-images/WordToImagesClient.tsx', /canvasContext: ctx as CanvasRenderingContext2D, viewport \}\)\.promise/, 'canvasContext: ctx, viewport } as any).promise');

replace('./src/app/word-to-pdf/WordToPdfClient.tsx', /orientation: 'portrait'/, 'orientation: "portrait" as const');
replace('./src/app/html-to-pdf/HtmlToPdfClient.tsx', /orientation: 'portrait'/, 'orientation: "portrait" as const');
replace('./src/app/markdown-to-pdf/MarkdownToPdfClient.tsx', /orientation: 'portrait'/, 'orientation: "portrait" as const');
replace('./src/app/txt-to-pdf/TxtToPdfClient.tsx', /orientation: 'portrait'/, 'orientation: "portrait" as const');
replace('./src/app/csv-to-pdf/CsvToPdfClient.tsx', /orientation: 'landscape'/, 'orientation: "landscape" as const');
replace('./src/app/excel-to-pdf/ExcelToPdfClient.tsx', /orientation: 'landscape'/, 'orientation: "landscape" as const');

