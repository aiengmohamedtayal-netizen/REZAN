# REZAN — Agent Operating Rules

## Mission

Ship a production-grade luxury fragrance maison experience for REZAN / ريزان.

## Source of Truth

Prefer these documents in order:

1. PROJECT.md
2. DESIGN.md
3. ARCHITECTURE.md
4. feature specifications inside docs/

## Engineering Rules

- Reuse before creating.
- Preserve existing routes and behavior during refactors.
- Keep mock/demo data centralized.
- Prefer server components; use client components only for required interaction.
- Keep Arabic RTL first-class and LTR-safe.
- Use logical CSS properties for directional spacing.
- Keep motion centralized and restrained.
- Do not add infrastructure without a concrete requirement.
- Do not introduce secrets into the repository.

## UI Rules

- Brand: REZAN / ريزان.
- Palette: #111111, #1A1A1A, #F7F3EA, #B89A62.
- Arabic UI/body: Cairo.
- English UI/body: Roboto.
- Official logo assets are brand assets; never redraw them with text.
- No excessive glassmorphism, neon effects, or corporate blue styling.

## Validation Gate

For user-facing changes, run:

```bash
npx tsc --noEmit
npm run lint
npm run build
```

Also perform runtime/browser QA for affected routes, including RTL and mobile.

## Change Discipline

Keep commits focused and explain the user-visible or architectural reason for the change.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
# REZAN — Agent Operating Rules

## Mission

Ship a production-grade luxury fragrance maison experience for REZAN / ريزان.

## Source of Truth

Prefer these documents in order:

1. PROJECT.md
2. DESIGN.md
3. ARCHITECTURE.md
4. feature specifications inside docs/

## Engineering Rules

- Reuse before creating.
- Preserve existing routes and behavior during refactors.
- Keep mock/demo data centralized.
- Prefer server components; use client components only for required interaction.
- Keep Arabic RTL first-class and LTR-safe.
- Use logical CSS properties for directional spacing.
- Keep motion centralized and restrained.
- Do not add infrastructure without a concrete requirement.
- Do not introduce secrets into the repository.

## UI Rules

- Brand: REZAN / ريزان.
- Palette: #111111, #1A1A1A, #F7F3EA, #B89A62.
- Arabic UI/body: Cairo.
- English UI/body: Roboto.
- Official logo assets are brand assets; never redraw them with text.
- No excessive glassmorphism, neon effects, or corporate blue styling.

## Validation Gate

For user-facing changes, run:

```bash
npx tsc --noEmit
npm run lint
npm run build
```

Also perform runtime/browser QA for affected routes, including RTL and mobile.

## Change Discipline

Keep commits focused and explain the user-visible or architectural reason for the change.
=======
<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
>>>>>>> 1a7e7bb (feat: complete REZAN luxury fragrance platform)
