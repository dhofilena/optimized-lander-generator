# Components Usage Guide

This folder uses plain JavaScript functions that return HTML strings (no framework runtime).
`src/main.js` builds the page by concatenating these component outputs in order.
For wireframe-specific guidance, see `src/components/WIREFRAMES.md`.

## Canonical Rules (Use These Every Time)

1. One component file = one named export (`export function ...`).
2. Return a template string only; do not mutate DOM inside the component.
3. Keep helper functions private in the same file when they are only used by that component.
4. Keep section semantics and heading linkage:
   - `section` or `article` uses `aria-labelledby="..."`
   - matching heading has the same `id`
5. Use Tailwind utility classes in markup; keep class style consistent with existing sections.

## Real Patterns In This Folder

- `ProtocolBioptimizersProducts.js` uses internal helper functions (`testimonialBlock`, `benefitList`, `cta`) plus one exported component.
- Image-based sections import from `src/constants/images.js` and use explicit `alt`, `width`, `height`, and `decoding`.
- Hero/LCP images use `loading="eager"` and `fetchpriority="high"`. Non-critical images use `loading="lazy"`.
- Footer provides `<span id="year"></span>` and `src/main.js` sets the year after render.
- FAQ uses `<details>` + `.faq-accordion` classes (only keep these styles/components if the new page still needs accordion behavior).
- Modal component currently outputs markup only; behavior is controlled elsewhere (or intentionally static).

## How To Wire Components In `src/main.js`

1. Import each component from `src/components`.
2. Compose page order in `root.innerHTML`.
3. Keep shared shell structure: promo/header, `<main>...</main>`, footer/modal as needed.

```js
root.innerHTML = `
  ${ProtocolPromoBar()}
  ${ProtocolSiteHeader()}
  <main id="main" role="main" class="font-sans">
    ${ProtocolHero()}
    ${ProtocolFormulaIntro()}
    ...
  </main>
  ${ProtocolFooterWireframe()}
  ${ProtocolMysteryDiscountModal()}
`;
```

## New Page Workflow (Recommended)

1. Keep foundation CSS in `src/styles/main.css`.
2. Decide if you are renaming from `Protocol*` to new names (for example, `LandingHero`).
3. Replace or remove old sections one by one.
4. Keep only shared components you still need:
   - likely reusable: header, footer, promo bar
   - likely page-specific: hero, product sections, story sections, FAQ, CTA, modal
5. Update `src/main.js` imports and render order.
6. Remove unused components/images/classes after final layout is stable.

## Component Template (Copy/Paste)

```js
import { someImage } from '../constants/images.js';

function helperItem(text) {
  return `<li class="flex gap-2"><span aria-hidden="true">+</span><span>${text}</span></li>`;
}

export function LandingSection() {
  return `
    <section aria-labelledby="landing-section-heading" class="py-16 sm:py-20 px-4 sm:px-6 bg-white">
      <div class="mx-auto max-w-6xl">
        <h2 id="landing-section-heading" class="text-title-page font-normal tracking-tight text-gray-900">
          Section title
        </h2>
        <p class="mt-4 text-gray-600">Section body copy.</p>
        <img
          src="${someImage}"
          alt="Describe image content clearly"
          width="1200"
          height="800"
          loading="lazy"
          decoding="async"
        />
        <ul class="mt-4 space-y-2 text-sm text-gray-600">
          ${helperItem('Benefit or detail')}
        </ul>
      </div>
    </section>
  `;
}
```

## Quality Checklist Before You Finish

- Component exports are named and imported correctly in `src/main.js`.
- No broken anchor targets (for example, nav links point to existing section IDs).
- All image `alt` text is descriptive and dimensions are present.
- Interactive controls meet tap target guidance (`min-h-[44px]` where relevant).
- Unused `Protocol*` files and stale image keys are removed.

