# Wireframe Components Guide

Use wireframe components as structural placeholders while building or rebuilding a page.

## Purpose

- Define layout hierarchy first (header/main/sections/footer).
- Validate spacing, grid, and information architecture before final copy/design polish.
- Keep sections easy to swap with final production components.

## Current Wireframe In This Project

- `ProtocolFooterWireframe.js` is the active wireframe-style component.
- It is wired in `src/main.js` via `ProtocolFooterWireframe()`.

## Naming Convention

- Use `*Wireframe` suffix for temporary structural components.
  - Example: `LandingHeroWireframe`, `LandingFooterWireframe`
- When finalized, rename to non-wireframe names.
  - Example: `LandingFooter`

## Authoring Rules

1. Keep one exported function per file.
2. Return template-string HTML only (same pattern as other components).
3. Prefer semantic structure:
   - `header`, `main`, `section`, `footer`, `nav`
4. Include accessibility anchors early:
   - `aria-label` for nav groups
   - `aria-labelledby` with matching heading IDs where appropriate
5. Keep placeholder links/content obvious and easy to replace (`href="#"`, short text labels).

## Styling Rules For Wireframes

- Keep styles lightweight and neutral (borders, subtle backgrounds, spacing utilities).
- Avoid heavy visual effects while in wireframe stage.
- Prioritize responsive layout classes (`px-4 sm:px-6`, `max-w-6xl`, grid/flex scaffolding).

## Image Rules In Wireframes

- Use existing image constants from `src/constants/images.js` when needed.
- Keep logo/brand placeholders optional and replaceable.
- Include basic `alt` text even for temporary wireframe images.

## Conversion Workflow (Wireframe -> Final Component)

1. Keep the same structural semantics.
2. Replace placeholder copy and links with final content.
3. Replace temporary classes with final design tokens/utilities.
4. Rename component and update import in `src/main.js`.
5. Delete old `*Wireframe` file once final component is stable.

## Starter Template

```js
export function LandingSectionWireframe() {
  return `
    <section aria-labelledby="landing-wireframe-heading" class="py-12 px-4 sm:px-6 border-y border-gray-200 bg-stone-50">
      <div class="mx-auto max-w-6xl">
        <h2 id="landing-wireframe-heading" class="text-title-page font-normal text-gray-900">
          Wireframe Section Title
        </h2>
        <p class="mt-3 text-sm text-gray-600">Temporary structure and placeholder copy.</p>
      </div>
    </section>
  `;
}
```

