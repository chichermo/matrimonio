import heicConvert from 'heic-convert';
import { readFile, writeFile, readdir } from 'fs/promises';
import { join, extname, basename } from 'path';

import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));
const fotosDir = resolve(__dirname, '../public/fotos');

const files = await readdir(fotosDir);
const heicFiles = files.filter(f => extname(f).toLowerCase() === '.heic');

console.log(`Convirtiendo ${heicFiles.length} archivos HEIC...`);

for (const file of heicFiles) {
  const inputPath = join(fotosDir, file);
  const outputName = basename(file, extname(file)) + '.jpeg';
  const outputPath = join(fotosDir, outputName);

  try {
    const inputBuffer = await readFile(inputPath);
    const outputBuffer = await heicConvert({
      buffer: inputBuffer,
      format: 'JPEG',
      quality: 0.85,
    });
    await writeFile(outputPath, Buffer.from(outputBuffer));
    console.log(`  ✓ ${file} → ${outputName}`);
  } catch (err) {
    console.error(`  ✗ Error en ${file}: ${err.message}`);
  }
}

console.log('Listo.');
