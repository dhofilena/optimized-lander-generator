# Wireframes Area Guide

This `wireframes` folder is the staging area for page structure references before final component implementation.

## What Goes Here

- Standalone wireframe HTML files (layout-first references).
- Mid-fidelity section structures and content flow drafts.
- Temporary exploration files used to plan component breakdown.

Current example:

- `cymbiotika-gary-brecka-protocol.html`

## How This Area Is Used

1. Build or import a wireframe HTML file in `wireframes/`.
2. Validate structure, section order, and content hierarchy.
3. Split each wireframe section into `src/components` component files.
4. Compose those components in `src/main.js`.
5. Keep the wireframe file as reference, or archive/delete when no longer needed.

## Mapping Wireframe -> Components

- One major wireframe section usually maps to one component.
- Suggested mapping pattern:
  - Wireframe hero -> `LandingHero.js`
  - Wireframe feature grid -> `LandingFeatures.js`
  - Wireframe FAQ -> `LandingFAQ.js`
  - Wireframe footer -> `LandingFooter.js` or `LandingFooterWireframe.js`

## Rules To Keep Consistent

- Use semantic landmarks in wireframes (`header`, `main`, `section`, `footer`).
- Add heading IDs early so anchor links remain stable in components.
- Keep class naming and spacing intent clear, even if visuals are temporary.
- Do not treat wireframes as production code; they are architecture references.

## When To Keep vs Remove Wireframes

- Keep wireframe files while iterating on structure or copy.
- Remove/archive wireframe files once production components are finalized and stable.

