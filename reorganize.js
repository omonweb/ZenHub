const fs = require('fs');
const path = require('path');

const zentaskDir = '/vercel/share/v0-project/zentask';
const rootDir = '/vercel/share/v0-project';

function moveFilesRecursively(source, dest) {
  if (!fs.existsSync(source)) return;

  const items = fs.readdirSync(source);

  items.forEach(item => {
    const sourcePath = path.join(source, item);
    const destPath = path.join(dest, item);

    const stat = fs.statSync(sourcePath);

    if (stat.isDirectory()) {
      if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath, { recursive: true });
      }
      moveFilesRecursively(sourcePath, destPath);
    } else {
      fs.copyFileSync(sourcePath, destPath);
      console.log(`Copied: ${item}`);
    }
  });
}

// Move all files from zentask to root
moveFilesRecursively(zentaskDir, rootDir);

// Remove zentask directory
function removeDirectory(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.readdirSync(dirPath).forEach(file => {
      const filePath = path.join(dirPath, file);
      if (fs.lstatSync(filePath).isDirectory()) {
        removeDirectory(filePath);
      } else {
        fs.unlinkSync(filePath);
      }
    });
    fs.rmdirSync(dirPath);
    console.log('Removed zentask directory');
  }
}

removeDirectory(zentaskDir);
console.log('Project structure reorganization complete!');
