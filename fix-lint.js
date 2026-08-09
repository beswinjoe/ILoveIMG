const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function fixFile(filePath, fixers) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  fixers.forEach(fixer => {
    content = content.replace(fixer.search, fixer.replace);
  });
  fs.writeFileSync(filePath, content);
}

// 1. Fix "as any" in Blob constructors globally
const srcAppDir = './src/app';
function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      fixFile(fullPath, [
        { search: /as any/g, replace: 'as BlobPart' },
        { search: /useState<any>/g, replace: 'useState<Record<string, string>>' }
      ]);
    }
  }
}
walkDir(srcAppDir);

// 2. Fix specific useEffect declaration orders
const uuidPath = './src/app/uuid-generator/UuidGeneratorClient.tsx';
if (fs.existsSync(uuidPath)) {
  let content = fs.readFileSync(uuidPath, 'utf8');
  content = content.replace(/useEffect\(\(\) => \{\n\s*generateUuids\(\);\n\s*\}, \[count, uppercase, hyphens\]\);/g, '');
  content = content.replace(/const generateUuids = \(\) => \{[\s\S]*?setUuids\(newUuids\);\n\s*\};/g, (match) => {
    return match + '\n\n  useEffect(() => {\n    generateUuids();\n  }, [count, uppercase, hyphens, generateUuids]);';
  });
  // also wrap generateUuids in useCallback to fix exhaustive-deps
  content = content.replace(/const generateUuids = \(\) => \{/g, 'const generateUuids = useCallback(() => {');
  content = content.replace(/setUuids\(newUuids\);\n\s*\};/g, 'setUuids(newUuids);\n  }, [count, uppercase, hyphens]);');
  content = content.replace(/import React, \{ useState/g, 'import React, { useState, useCallback, useEffect');
  content = content.replace(/import React, \{ useState, useEffect/g, 'import React, { useState, useEffect, useCallback');
  fs.writeFileSync(uuidPath, content);
}

const wordPath = './src/app/word-counter/WordCounterClient.tsx';
if (fs.existsSync(wordPath)) {
  let content = fs.readFileSync(wordPath, 'utf8');
  content = content.replace(/useEffect\(\(\) => \{\n\s*calculateStats\(text\);\n\s*\}, \[text\]\);/g, '');
  content = content.replace(/const calculateStats = \(str: string\) => \{[\s\S]*?\}\);\n\s*\};/g, (match) => {
    return match + '\n\n  useEffect(() => {\n    calculateStats(text);\n  }, [text, calculateStats]);';
  });
  content = content.replace(/const calculateStats = \(str: string\) => \{/g, 'const calculateStats = useCallback((str: string) => {');
  content = content.replace(/setCharactersNoSpaces\(noSpaces\.length\);\n\s*\}\);\n\s*\};/g, 'setCharactersNoSpaces(noSpaces.length);\n    });\n  }, []);');
  content = content.replace(/import React, \{ useState/g, 'import React, { useState, useCallback, useEffect');
  content = content.replace(/import React, \{ useState, useEffect/g, 'import React, { useState, useEffect, useCallback');
  fs.writeFileSync(wordPath, content);
}

