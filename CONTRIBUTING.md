# Contributing to REZAN

## Before You Change Code

1. Inspect the existing architecture.
2. Reuse documented components and utilities.
3. Preserve routes and existing behavior.
4. Keep mock data centralized.
5. Validate both RTL and LTR where applicable.

## Quality Gate

Before opening a change:

```bash
npx tsc --noEmit
npm run lint
npm run build
```

Also perform browser/runtime verification for user-facing changes.

## Commit Style

Use clear, scoped commits such as:

- feat: add gifts experience
- fix: repair product image sources
- refactor: refine navbar
- chore: update tooling
- docs: update design system
