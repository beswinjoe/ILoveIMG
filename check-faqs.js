const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, 'src/app');
const tools = fs.readdirSync(appDir).filter(f => fs.statSync(path.join(appDir, f)).isDirectory());

let faqCount = 0;
let noFaqCount = 0;

tools.forEach(slug => {
  const pagePath = path.join(appDir, slug, 'page.tsx');
  if (!fs.existsSync(pagePath)) return;
  
  const files = fs.readdirSync(path.join(appDir, slug));
  const clientFile = files.find(f => f.endsWith('Client.tsx'));
  
  if (clientFile) {
    const clientPath = path.join(appDir, slug, clientFile);
    const content = fs.readFileSync(clientPath, 'utf-8');
    
    // Find faq prop in ToolLayout
    const faqMatch = content.match(/faq=\{([\s\S]*?)\}/);
    if (faqMatch) {
      faqCount++;
    } else {
      console.log(`No FAQ found in ${clientFile}`);
      noFaqCount++;
    }
  }
});

console.log(`\nFound FAQ in ${faqCount} client files. No FAQ in ${noFaqCount} files.`);
