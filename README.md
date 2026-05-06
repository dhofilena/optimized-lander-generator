# Optimized Lander Generator

Generalized landing page builder boilerplate built with **Vite** and **Tailwind CSS v4**, optimized for **Safari** and **Chrome**, with SEO-ready structure and performance defaults.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Convert images + production build |
| `npm run preview` | Preview the production build locally |
| `npm run convert:images` | Convert PNG images to WebP |

## Project Structure

```
├── index.html                 Main HTML — SEO head, semantic body, JSON-LD schema
├── vite.config.js             Vite config — TailwindCSS, Brotli/Gzip compression
├── public/
│   ├── fonts/                 Self-hosted Neue Haas .woff2 files
│   ├── robots.txt             Crawler directives
│   ├── sitemap.xml            Sitemap placeholder
│   ├── 404.html               Error page
│   └── favicon.svg            Favicon
├── src/
│   ├── main.js                Entry point
│   ├── styles/
│   │   ├── main.css           Tailwind entry + base layer + fluid typography
│   │   └── fonts.css          @font-face declarations
│   ├── components/            Reusable UI partials
│   └── assets/images/         All images (WebP format)
├── scripts/
│   └── convert-images.js      PNG → WebP batch converter (sharp)
└── .lighthouserc.json         Lighthouse CI thresholds
```

## Fonts

This project uses **Neue Haas Grotesk Display** as the default typeface. Place your `.woff2` font files in `public/fonts/`:

- `NeueHaasDisplay-Light.woff2` (300)
- `NeueHaasDisplay-Roman.woff2` (400)
- `NeueHaasDisplay-Medium.woff2` (500)
- `NeueHaasDisplay-Bold.woff2` (700)
- `NeueHaasDisplay-Black.woff2` (900)

Fonts are preloaded in `index.html` and use `font-display: swap`.

## Image Pipeline

Drop `.png` files into `src/assets/images/`. Run `npm run convert:images` to generate:

- Full-size `.webp` at quality 80
- Responsive variants at 400w, 800w, and 1200w

The conversion runs automatically during `npm run build`.

## Browser Targets

Optimized and tested for:

- **Safari 14+** (WebKit)
- **Chrome 90+** (Blink)

Configured in `vite.config.js` via `build.target`.

## SEO Checklist

- [x] Semantic HTML5 landmarks (`header`, `nav`, `main`, `section`, `footer`)
- [x] Single `<h1>` with proper heading hierarchy
- [x] Meta title (50-60 chars) and description (150-160 chars)
- [x] Open Graph and Twitter Card tags
- [x] Canonical URL
- [x] JSON-LD Product schema placeholder
- [x] JSON-LD Organization schema
- [x] `robots.txt` and `sitemap.xml`
- [x] `lang="en"` on `<html>`
- [x] Skip-to-content navigation link

## PageSpeed Targets

| Metric | Target | Strategy |
|--------|--------|----------|
| LCP | < 2.5s | Font preload, hero image preload, `fetchpriority="high"` |
| INP | < 200ms | Minimal JS, CSS animations, ES modules |
| CLS | < 0.1 | Explicit image dimensions, `font-display: swap` |
| Performance | > 90 | Brotli compression, tree-shaking, code splitting |
| Accessibility | > 90 | ARIA landmarks, focus outlines, 44px touch targets |
| Best Practices | > 90 | HTTPS assets, no `document.write`, CSP-ready |
| SEO | > 90 | Structured data, meta tags, semantic HTML |

## Deployment

Build the project and deploy the `dist/` folder to any static hosting provider:

```bash
npm run build
```

Configure these security headers on your hosting provider:

```
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self';
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```
