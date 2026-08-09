const fs = require('fs');
const path = require('path');

// Extract toolsData from tools.tsx
const toolsContent = fs.readFileSync(path.join(__dirname, 'src/lib/tools.tsx'), 'utf-8');
const toolsDataRegex = /export const toolsData:\s*ToolItem\[\]\s*=\s*\[([\s\S]*?)\];/;
const match = toolsContent.match(toolsDataRegex);

if (!match) {
  console.error("Could not find toolsData in src/lib/tools.tsx");
  process.exit(1);
}

// We can use regex to extract name, href, desc for each object.
const toolMatches = [...match[1].matchAll(/name:\s*"([^"]+)",\s*href:\s*"([^"]+)",\s*category:\s*"([^"]+)",\s*description:\s*"([^"]+)"/g)];

const tools = toolMatches.map(m => ({
  name: m[1],
  dir: m[2].replace('/', ''),
  category: m[3],
  desc: m[4]
}));

console.log(`Found ${tools.length} tools to process.`);

tools.forEach(tool => {
  const dirPath = path.join(__dirname, 'src/app', tool.dir);
  if (!fs.existsSync(dirPath)) return;

  const pagePath = path.join(dirPath, 'page.tsx');
  if (fs.existsSync(pagePath)) {
    let pageContent = fs.readFileSync(pagePath, 'utf-8');
    
    // Construct new metadata
    let newTitle = `${tool.name} Online – Free | Filoza`;
    if (tool.name === 'Image Compressor') newTitle = 'Image Compressor Online – Free & Private | Filoza';
    else if (tool.name === 'Remove Background' || tool.name === 'Background Remover') newTitle = 'Remove Background from Image Online – Free | Filoza';

    let newDesc = tool.desc;
    if (tool.category === 'Image Tools') {
      newDesc = `${tool.desc}. Reduce file size and process directly in your browser with Filoza's free tools.`;
    }

    const metadataReplacement = `export const metadata: Metadata = {
  title: "${newTitle}",
  description: "${newDesc}",
  alternates: {
    canonical: "https://filoza.vercel.app/${tool.dir}"
  },
  openGraph: {
    title: "${newTitle}",
    description: "${newDesc}",
    url: "https://filoza.vercel.app/${tool.dir}",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "${newTitle}",
    description: "${newDesc}",
  }
};`;

    // Replace existing metadata
    pageContent = pageContent.replace(/export const metadata: Metadata = \{[\s\S]*?\};\n?/, metadataReplacement + '\n');
    
    // Make sure Metadata is imported if not present
    if (!pageContent.includes('import { Metadata }')) {
      pageContent = `import { Metadata } from "next";\n` + pageContent;
    }

    fs.writeFileSync(pagePath, pageContent);
  }

  // Update Client component to inject howItWorks, etc if it uses ToolLayout
  const files = fs.readdirSync(dirPath);
  const clientFile = files.find(f => f.endsWith('Client.tsx'));
  
  if (clientFile) {
    const clientPath = path.join(dirPath, clientFile);
    let clientContent = fs.readFileSync(clientPath, 'utf-8');
    
    if (clientContent.includes('<ToolLayout')) {
      let howItWorks = [];
      let formats = "";
      if (tool.category === 'Image Tools') {
        howItWorks = ["Upload your image file.", "Select your preferred settings.", "Click the process button.", "Download your optimized image!"];
        formats = "JPG, JPEG, PNG, WebP, SVG";
      } else if (tool.category === 'PDF Tools') {
        howItWorks = ["Select or drag and drop your PDF file.", "Apply your desired PDF modifications.", "Click process.", "Download your new PDF document."];
        formats = "PDF";
      } else if (tool.category === 'Audio Tools') {
        howItWorks = ["Upload your audio file.", "Choose your conversion or edit settings.", "Process the audio.", "Download the resulting file."];
        formats = "MP3, WAV, OGG, M4A";
      } else {
        howItWorks = ["Upload your file or paste your data.", "Adjust the tool settings.", "Run the tool.", "Get your results instantly."];
        formats = "Various formats supported depending on the tool.";
      }
      
      const howItWorksProp = `howItWorks={${JSON.stringify(howItWorks)}}`;
      const formatsProp = `supportedFormats="${formats}"`;
      
      // Inject if not present
      if (!clientContent.includes('howItWorks={')) {
        clientContent = clientContent.replace('<ToolLayout', `<ToolLayout\n      ${howItWorksProp}\n      ${formatsProp}`);
        fs.writeFileSync(clientPath, clientContent);
      }
    }
  }
});

console.log("SEO Update Complete");
