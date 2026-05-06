import { readdir, stat } from 'node:fs/promises';
import { join, extname, basename } from 'node:path';
import sharp from 'sharp';

const INPUT_DIR = 'src/assets/images';
const QUALITY = 80;
const SIZES = [400, 800, 1200];

async function getFiles(dir) {
  const entries = [];
  let items;

  try {
    items = await readdir(dir, { withFileTypes: true });
  } catch {
    console.log(`Directory "${dir}" does not exist. Nothing to convert.`);
    return entries;
  }

  for (const item of items) {
    const fullPath = join(dir, item.name);
    if (item.isDirectory()) {
      entries.push(...(await getFiles(fullPath)));
    } else if (extname(item.name).toLowerCase() === '.png') {
      entries.push(fullPath);
    }
  }

  return entries;
}

async function convert(filePath) {
  const name = basename(filePath, extname(filePath));
  const dir = filePath.substring(0, filePath.lastIndexOf('\\') !== -1
    ? filePath.lastIndexOf('\\')
    : filePath.lastIndexOf('/'));

  const image = sharp(filePath);
  const metadata = await image.metadata();

  const output = join(dir, `${name}.webp`);
  await sharp(filePath).webp({ quality: QUALITY }).toFile(output);
  console.log(`  ${filePath} -> ${output}`);

  for (const width of SIZES) {
    if (width < metadata.width) {
      const sized = join(dir, `${name}-${width}w.webp`);
      await sharp(filePath).resize(width).webp({ quality: QUALITY }).toFile(sized);
      console.log(`  ${filePath} -> ${sized} (${width}w)`);
    }
  }
}

async function main() {
  console.log(`\nConverting PNGs to WebP (quality: ${QUALITY})...\n`);

  const files = await getFiles(INPUT_DIR);

  if (files.length === 0) {
    console.log('No PNG files found. Place .png images in src/assets/images/\n');
    return;
  }

  console.log(`Found ${files.length} PNG file(s):\n`);

  for (const file of files) {
    await convert(file);
  }

  console.log(`\nDone. Converted ${files.length} file(s).\n`);
}

main().catch((err) => {
  console.error('Image conversion failed:', err);
  process.exit(1);
});
