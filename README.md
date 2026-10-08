# REZAN

Luxury fragrance maison website for **REZAN / ريزان**.

## Engineering Baseline

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- ESLint
- Production-first accessibility, performance, SEO, and RTL/LTR support

## Repository Principles

1. Reuse existing architecture before creating new abstractions.
2. Keep the UI modular and feature-first.
3. Keep mock/demo data centralized and replaceable.
4. Treat Arabic RTL as a first-class layout mode.
5. Keep motion restrained and purposeful.
6. Avoid unnecessary dependencies and infrastructure.

## Expected Top-Level Structure

```
src/
  app/
  components/
  config/
  data/
  lib/
  types/
public/
  images/
  videos/
docs/
```

## Validation

The project should pass:

```bash
npx tsc --noEmit
npm run lint
npm run build
```

Runtime/browser validation is required in addition to static checks.
