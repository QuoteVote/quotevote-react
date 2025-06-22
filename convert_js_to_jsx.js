import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to convert a single JS file to JSX
function convertJsToJsx(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Add React import at the beginning
    const jsxContent = `import React from 'react';\n\n${content}`;
    
    // Create the new JSX file path
    const jsxFilePath = filePath.replace('.js', '.jsx');
    
    // Write the new JSX file
    fs.writeFileSync(jsxFilePath, jsxContent);
    
    // Delete the original JS file
    fs.unlinkSync(filePath);
    
    console.log(`✅ Converted: ${filePath} -> ${jsxFilePath}`);
  } catch (error) {
    console.error(`❌ Error converting ${filePath}:`, error.message);
  }
}

// Function to recursively find and convert all JS files
function convertDirectory(directoryPath) {
  const items = fs.readdirSync(directoryPath);
  
  items.forEach(item => {
    const fullPath = path.join(directoryPath, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      // Recursively process subdirectories
      convertDirectory(fullPath);
    } else if (item.endsWith('.js')) {
      // Convert JS files to JSX
      convertJsToJsx(fullPath);
    }
  });
}

// Start the conversion process
const jssDirectory = path.join(__dirname, 'src', 'assets', 'jss');
console.log('🚀 Starting JS to JSX conversion in:', jssDirectory);

if (fs.existsSync(jssDirectory)) {
  convertDirectory(jssDirectory);
  console.log('✅ Conversion completed!');
} else {
  console.error('❌ Directory not found:', jssDirectory);
} 