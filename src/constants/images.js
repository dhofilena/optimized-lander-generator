/**
 * Image handling guide:
 * - Import local optimized assets from src/assets/images as stable fallbacks.
 * - Export only runtime-resolved values so globalThis.__LANDER_IMAGE_URLS can override any image URL.
 * - Keep override keys in resolveImageUrl() aligned with the exported names used across the app.
 * - When replacing image files, keep the same key names and refresh assets with `npm run fetch:images` if needed.
 *
 * Sample pattern for new images:
 * import heroExample from '../assets/images/hero-example.webp';
 * const runtimeHeroExample = resolveImageUrl('heroExample', heroExample);
 * export { runtimeHeroExample as heroExample };
 *
 * Sample runtime override payload:
 * globalThis.__LANDER_IMAGE_URLS = {
 *   heroExample: 'https://cdn.example.com/hero-example.webp',
 * };
 */