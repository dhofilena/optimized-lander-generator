# Images Folder Guide

This folder holds local image assets used as fallbacks by the app.

## How This Folder Is Used

- Place page images in `src/assets/images`.
- Import them from `src/constants/images.js`.
- Export runtime-resolved values from `src/constants/images.js` so CDN/runtime overrides can replace local files when needed.

## File Rules

- Prefer `.webp` for photos and product shots.
- Keep `.svg` for logos/icons that should stay vector.
- Use lowercase kebab-case names:
  - `hero-example.webp`
  - `product-example-bottle.webp`
  - `brand-logo.svg`

## Add/Replace Image Workflow

1. Add the new file to `src/assets/images`.
2. In `src/constants/images.js`, import it from `../assets/images/...`.
3. Add/update the matching `resolveImageUrl('keyName', localImage)` mapping.
4. Export the runtime value with the same key naming convention.
5. Update component usage in `src/components`.

## Naming Consistency Requirement

Keep these aligned across all layers:

- file name in `src/assets/images`
- import variable in `src/constants/images.js`
- runtime override key in `globalThis.__LANDER_IMAGE_URLS`
- exported image name consumed by components

If these names drift, runtime overrides will fail silently and fallback images will be used.

## Performance Defaults

- Include explicit `width` and `height` in component `<img>` tags.
- Use descriptive `alt` text for accessibility.
- Use:
  - `loading="eager"` + `fetchpriority="high"` for main hero/LCP image
  - `loading="lazy"` for non-critical images

## Useful Commands

- `npm run fetch:images` - refresh image set from your fetch pipeline.
- `npm run convert:images` - run local image conversion script.

