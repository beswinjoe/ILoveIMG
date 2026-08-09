const fs = require('fs');

function replace(file, search, rep) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(search, rep);
  fs.writeFileSync(file, content);
}

replace('./src/app/csv-to-pdf/CsvToPdfClient.tsx', /parsed\.data\.forEach\(\(row, rowNumber\)/, 'parsed.data.forEach((row: any, rowNumber: number)');
replace('./src/app/csv-to-pdf/CsvToPdfClient.tsx', /row\.forEach\(cell/, 'row.forEach((cell: any)');

replace('./src/app/image-watermark/ImageWatermarkClient.tsx', /const ctx = canvas.getContext\('2d'\);/, 'const ctx = canvas.getContext("2d");\n      if (!ctx) throw new Error("No context");');
replace('./src/app/image-watermark/ImageWatermarkClient.tsx', /resolve\), 'image\/jpeg'/, 'b => resolve(b as Blob)), "image/jpeg"');

replace('./src/app/markdown-to-html/MarkdownToHtmlClient.tsx', /marked\.parse\(text\)/, 'await marked.parse(text)');
replace('./src/app/markdown-to-pdf/MarkdownToPdfClient.tsx', /marked\.parse\(text\)/, 'await marked.parse(text)');

replace('./src/app/pdf-to-word/PdfToWordClient.tsx', /item\.str/, '(item as any).str');

replace('./src/app/spreadsheet-to-json/SpreadsheetToJsonClient.tsx', /let data = \[\];/, 'let data: any[] = [];');
replace('./src/app/spreadsheet-to-json/SpreadsheetToJsonClient.tsx', /let headers = \[\];/, 'let headers: any[] = [];');
replace('./src/app/spreadsheet-to-json/SpreadsheetToJsonClient.tsx', /row\.values\.slice\(1\)/, '(row.values as any[]).slice(1)');
replace('./src/app/spreadsheet-to-json/SpreadsheetToJsonClient.tsx', /rowValues\.forEach\(\(val, i\)/, 'rowValues.forEach((val: any, i: number)');
replace('./src/app/spreadsheet-to-json/SpreadsheetToJsonClient.tsx', /const obj = \{\};/, 'const obj: any = {};');

replace('./src/app/svg-to-png/SvgToPngClient.tsx', /const ctx = canvas.getContext\('2d'\);/, 'const ctx = canvas.getContext("2d");\n      if (!ctx) throw new Error("No context");');
replace('./src/app/svg-to-png/SvgToPngClient.tsx', /resolve\), 'image\/png'/, 'b => resolve(b as Blob)), "image/png"');

replace('./src/app/word-to-images/WordToImagesClient.tsx', /canvasContext: ctx/, 'canvasContext: ctx as CanvasRenderingContext2D');
replace('./src/app/word-to-images/WordToImagesClient.tsx', /resolve\), 'image\/png'/, 'b => resolve(b as Blob)), "image/png"');

replace('./src/app/word-to-pdf/WordToPdfClient.tsx', /image: \{ type: 'jpeg'/, 'image: { type: "jpeg" as const');

replace('./src/lib/tools.tsx', /, Wand2, FileSpreadsheet, Code, FileEdit \} from "lucide-react";/, ', Wand2, FileSpreadsheet, Code, FileEdit, AlignLeft } from "lucide-react";');

