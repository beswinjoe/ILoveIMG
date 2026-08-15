const fs = require('fs');
const path = require('path');

const APP_DIR = path.join(__dirname, 'src/app');

const dirs = fs.readdirSync(APP_DIR).filter(f => fs.statSync(path.join(APP_DIR, f)).isDirectory());

let updated = 0;

for (const dir of dirs) {
  const pagePath = path.join(APP_DIR, dir, 'page.tsx');
  if (fs.existsSync(pagePath)) {
    let content = fs.readFileSync(pagePath, 'utf-8');
    
    // Check if generateToolJsonLd is used but not imported
    if (content.includes('generateToolJsonLd(') && !content.includes('generateToolJsonLd } from "@/lib/seo"')) {
      // Find the Metadata import and add our import after it
      content = content.replace(/(import \{ Metadata \}.*?\n)/, '$1import { generateToolJsonLd } from "@/lib/seo";\n');
      
      fs.writeFileSync(pagePath, content);
      updated++;
    }
  }
}

console.log(`✅ Fixed imports in ${updated} files.`);
