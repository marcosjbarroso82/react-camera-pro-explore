import fs from 'fs';
import path from 'path';

console.log('🔍 Debugging deploy...\n');

// Verificar directorio build
const buildDir = './build/client';
if (fs.existsSync(buildDir)) {
  console.log('✅ Build directory exists');
  
  // Listar archivos en build/client
  const files = fs.readdirSync(buildDir);
  console.log('📁 Files in build/client:', files);
  
  // Verificar manifest.json
  const manifestPath = path.join(buildDir, 'manifest.json');
  if (fs.existsSync(manifestPath)) {
    console.log('✅ manifest.json exists in build');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    console.log('📄 Manifest content:', manifest);
  } else {
    console.log('❌ manifest.json NOT found in build');
  }
  
  // Verificar index.html
  const indexPath = path.join(buildDir, 'index.html');
  if (fs.existsSync(indexPath)) {
    console.log('✅ index.html exists in build');
  } else {
    console.log('❌ index.html NOT found in build');
  }
  
} else {
  console.log('❌ Build directory does not exist');
}

// Verificar archivos en public
const publicDir = './public';
if (fs.existsSync(publicDir)) {
  console.log('\n📁 Files in public:', fs.readdirSync(publicDir));
} else {
  console.log('❌ Public directory does not exist');
}