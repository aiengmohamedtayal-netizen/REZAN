# REZAN — Architecture

## Architecture Style

Feature-first, component-driven Next.js App Router architecture.

## Layers

### App
Route composition, metadata, loading/error/not-found boundaries.

### Components
Reusable presentation and interaction primitives.

### Data
Centralized mock repository and future replaceable data-source boundary.

### Config
Brand, locale, currency, navigation, and environment-safe configuration.

### Lib
Cross-cutting utilities such as motion, formatting, validation, and cart state.

### Types
Shared domain types.

## Rules

- Keep business/domain data out of page components.
- Avoid duplicated product/collection definitions.
- Prefer server components by default.
- Use client components only for required interaction/state.
- Keep directional CSS logical for RTL/LTR.
- Avoid architecture changes during visual refactors unless justified.

## Future Data Boundary

The current mock repository must be replaceable by Supabase/CMS/API without rewriting presentation components.
