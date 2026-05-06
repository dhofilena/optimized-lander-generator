/**
 * Downloads remote hero/product/story images and writes WebP to src/assets/images/
 * (bundled by Vite so images always ship with the build). Run: npm run fetch:images
 */
import { mkdir, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, '../src/assets/images');
const QUALITY = 80;

const JOBS = [
  {
    url: 'https://chalene.com/wp-content/uploads/2022/05/p3.jpg',
    out: 'hero-chalene-studio.webp',
  },
  {
    url: 'https://famouspeopletoday.com/wp-content/uploads/2020/12/Chalene-Johnson-age-Net-Worth.jpg',
    out: 'hero-chalene-fitness.webp',
  },
  {
    url: 'https://chalene.com/wp-content/uploads/2023/01/Scroll-Group-3.webp',
    out: 'story-approach-chalene.webp',
  },
  {
    url: 'https://chalene.com/wp-content/uploads/elementor/thumbs/983A8296-scaled-e1643847293722-q1qkbdz0h6xx6izhg12qejecoprogz8cvz99yngbby.jpg',
    out: 'story-partner-chalene-brock.webp',
  },
  {
    url: 'https://static-v1.cdn-bio.com/bio-shop/shop/magnesium-breakthrough-v2.jpg',
    out: 'product-magnesium-breakthrough.webp',
  },
  {
    url: 'https://static-v1.cdn-bio.com/bio-shop/shop/masszymes-v2.jpg',
    out: 'product-masszymes.webp',
  },
  {
    url: 'https://static-v1.cdn-bio.com/bio-shop/shop/probiotic-breakthrough-v2.jpg',
    out: 'product-probiotic-breakthrough.webp',
  },
  {
    url: 'https://static-v1.cdn-bio.com/bio-shop/shop/berberine-breakthrough-v2.jpg',
    out: 'product-berberine-breakthrough.webp',
  },
  {
    url: 'https://fb-v1.cdn-bio.com/assets/uploads/f759-fdda-9f4d-4b64_MB-product-Details-Page-cherry-01.webp',
    out: 'product-magnesium-breakthrough-drink.webp',
  },
];

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  console.log(`Writing WebP (quality ${QUALITY}) to ${OUT_DIR}\n`);

  for (const { url, out } of JOBS) {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; lander-image-sync/1.0)',
      },
    });
    if (!res.ok) {
      throw new Error(`GET ${url} -> ${res.status} ${res.statusText}`);
    }
    const buf = Buffer.from(await res.arrayBuffer());
    const dest = join(OUT_DIR, out);
    await sharp(buf).webp({ quality: QUALITY }).toFile(dest);
    const st = await stat(dest);
    console.log(`  OK ${out} (${(st.size / 1024).toFixed(1)} KB)`);
  }

  console.log(`\nDone. ${JOBS.length} file(s).\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
