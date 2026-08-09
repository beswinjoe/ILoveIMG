const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else {
      if (dirFile.endsWith('.ts') || dirFile.endsWith('.tsx') || dirFile.endsWith('.css') || dirFile.endsWith('.json')) {
        filelist.push(dirFile);
      }
    }
  });
  return filelist;
};

const files = walkSync('./src');
files.push('./package.json');

let changedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content
    .replace(/FileFlow/g, 'Filoza')
    .replace(/fileflow/g, 'filoza')
    .replace(/FILEFLOW/g, 'FILOZA');
  
  // Revert specific technical URLs that must stay fileefloww.vercel.app
  newContent = newContent.replace(/filoza\.vercel\.app/g, 'fileefloww.vercel.app');
  newContent = newContent.replace(/filoza\.com/g, 'filoza.com');
  newContent = newContent.replace(/fileefloww\.vercel\.app/g, 'fileefloww.vercel.app'); // already correct but just in case
  
  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    console.log(`Rebranded ${file}`);
    changedCount++;
  }
});

console.log(`Successfully rebranded ${changedCount} files.`);
