# REZAN — Design System

## Visual Direction

Quiet Luxury × Arabic Heritage × Modern Egyptian Luxury × Niche Perfumery

## Core Colors

- Ink: #111111
- Charcoal: #1A1A1A
- Ivory: #F7F3EA
- Champagne: #B89A62

## Typography

- Arabic UI/body: Cairo
- English UI/body: Roboto
- Arabic display: refined approved display face when available
- Brand mark: official REZAN logo asset only

## Geometry

- Subtle rounded corners
- Thin borders
- Generous whitespace
- Editorial grids
- No excessive glassmorphism
- No blue corporate theme

## Motion

- Framer Motion
- Primarily transform/opacity
- Restrained editorial reveals
- Consistent centralized motion utilities
- Reduced-motion support is mandatory

## RTL/LTR

Use logical properties and directional‑safe layout primitives.

# REZAN — Design System

## Visual Direction

Quiet Luxury × Arabic Heritage × Modern Egyptian Luxury × Niche Perfumery

## Core Colors

- Ink: #111111
- Charcoal: #1A1A1A
- Ivory: #F7F3EA
- Champagne: #B89A62

## Typography

- Arabic UI/body: Cairo
- English UI/body: Roboto
- Arabic display: refined approved display face when available
- Brand mark: official REZAN logo asset only

## Geometry

- Subtle rounded corners
- Thin borders
- Generous whitespace
- Editorial grids
- No excessive glassmorphism
- No blue corporate theme

## Motion

- Framer Motion
- Primarily transform/opacity
- Restrained editorial reveals
- Consistent centralized motion utilities
- Reduced-motion support is mandatory

## RTL/LTR

Use logical properties and directional-safe layout primitives.
=======
# REZAN (ريزان) — Design System & Visual Language Specification

> **Document Type:** Visual & Interaction Single Source of Truth (SSOT)  
> **Version:** 1.0.0 Production  
> **Brand Identity:** French High-Perfumerie Elegance × Arabic Heritage × Quiet Luxury  
> **Palette Anchor:** Near Black (`#111111`), Charcoal (`#1A1A1A`), Ivory (`#F7F3EA`), Champagne Gold (`#B89A62`)  
> **Typography:** Tajarib (Primary Arabic), Roboto (Secondary English)  

---

## 1. Design Philosophy

REZAN’s aesthetic is built on **Quiet Luxury** and **Cultural Grandeur**. It rejects loud, transactional ecommerce tropes (cluttered discount badges, harsh saturated buttons, hyperactive popups) in favor of editorial dignity, spacious margins, authentic typography, and atmospheric lighting. Every component feels like an invitation to an exclusive Parisian-Cairo perfume salon.

---

## 2. Brand DNA

- **Sensory Refinement:** Visual clarity that allows perfume bottles and fragrance families to breathe.
- **Cultural Rootedness:** Uncompromising, elegant Arabic typography using Tajarib, honoring heritage without feeling archaic.
- **Craftsmanship:** Deliberate details—thin hairline borders, subtle metallic gold accents, and measured animations.
- **Restraint:** No neon, no corporate dashboard blues, no aggressive rounded corners, and no oversized full-width text competing with artwork.

---

## 3. Visual Language

- **Colors:** Deep near-black environments for atmospheric storytelling; warm ivory canvases for commercial clarity.
- **Geometry:** Clean rectangular forms with subtle 2px–4px corner radii on cards and buttons.
- **Elevation:** Hairline borders (`1px border-[#E8E4DB]` in light mode, `1px border-[#2A2A2A]` in dark mode) replace heavy drop shadows.
- **Textures:** Crisp bottle photography isolated on clean warm grounds.

---

## 4. Color Tokens (Single Source of Truth)

### Primitive Palette
```scss
$black:          #111111; // Core Dark Background
$charcoal:       #1A1A1A; // Surface Dark
$charcoal-light: #242424; // Elevated Dark Surface
$ivory:          #F7F3EA; // Core Light Background
$ivory-light:    #FAF8F3; // Surface Light
$ivory-muted:    #E8E4DB; // Border & Divider Light
$gold:           #B89A62; // Champagne Gold Accent
$gold-light:     #CDB48A; // Gold Hover & Highlights
$gold-dark:      #9A7E4A; // Gold Active & Pressed
$white:          #FFFFFF; // Pure Surface
```

### Semantic Token Mapping
| Token Name | Light Mode Value | Dark Mode Value | Usage |
|---|---|---|---|
| `--color-surface-primary` | `#F7F3EA` (Ivory) | `#111111` (Near Black) | Main page background |
| `--color-surface-secondary`| `#FFFFFF` (White) | `#1A1A1A` (Charcoal) | Cards, modals, drawers |
| `--color-surface-raised`   | `#FAF8F3` | `#242424` | Popovers, elevated items |
| `--color-text-primary`     | `#1A1A1A` | `#F7F3EA` | Main headings & titles |
| `--color-text-secondary`   | `#555550` | `rgba(247,243,234,0.7)` | Body copy, descriptions |
| `--color-text-muted`       | `#888880` | `rgba(247,243,234,0.45)`| Captions, metadata, SKUs |
| `--color-border-subtle`    | `#E8E4DB` | `#2A2A2A` | Card edges, separators |
| `--color-accent`           | `#B89A62` (Gold) | `#B89A62` (Gold) | Badges, links, highlights |
| `--color-accent-hover`     | `#CDB48A` | `#CDB48A` | Hover states |

---

## 5. Typography System

The application strictly loads the verified local font files from `src/app/fonts/`:
- **Arabic (Primary):** `Tajarib` (`--font-tajarib`). Applied automatically to all Arabic content and `dir="rtl"` elements.
- **English (Secondary):** `Roboto` (`--font-roboto`). Applied to SKU numbers, English sub-names, and volume indicators.

### Typographic Scales
- **Display Hero:** `36px` to `54px` (Bold / Semi-bold, line-height 1.2)
- **H1 (Page Titles):** `28px` to `36px` (Semi-bold, line-height 1.25)
- **H2 (Section Headings):** `20px` to `26px` (Medium/Semi-bold, line-height 1.3)
- **H3 (Card Headings):** `15px` to `17px` (Medium, line-height 1.4)
- **Body:** `13px` to `15px` (Regular, line-height 1.6)
- **Metadata / Eyebrow:** `10px` to `11px` (Uppercase tracking `0.15em`)
- **Price:** `14px` to `16px` (Semi-bold in Egyptian numerals)

---

## 6. Spacing Scale

Base rhythm: 4px / 8px grid.
- `space-1`: 4px
- `space-2`: 8px
- `space-3`: 12px
- `space-4`: 16px
- `space-6`: 24px
- `space-8`: 32px
- `space-12`: 48px
- `space-16`: 64px
- `space-24`: 96px

---

## 7. Layout & Grid System

- **Max Content Container:**
  - Standard Container: `max-w-[1240px]`
  - Wide Container: `max-w-[1440px]`
  - Narrow Reading Container: `max-w-[800px]`
- **Product Grid Rules:**
  - Mobile (320px–639px): 2 columns (`gap-3` or `gap-4`)
  - Tablet (640px–1023px): 2–3 columns (`gap-4` or `gap-6`)
  - Desktop (1024px+): 4 columns (`gap-6`)

---

## 8. Elevation & Borders

- **Elevation:** Avoid blurred, dark drop shadows. Use restrained micro-elevation:
  - `shadow-sm`: `0 1px 3px rgba(0,0,0,0.04)`
  - `shadow-card`: `0 2px 8px rgba(0,0,0,0.05)`
  - `shadow-drawer`: `0 8px 32px rgba(0,0,0,0.12)`
- **Borders:** Thin 1px borders everywhere. Borders provide structure and luxury definition.

---

## 9. Responsive Rules

- **Mobile Viewports (320px, 375px, 400px):**
  - Minimum touch target: 44px × 44px for buttons, cart toggles, and size selectors.
  - No text smaller than 11px.
  - Zero horizontal overflow.
- **Desktop (1024px, 1280px, 1536px):**
  - Rich 3-tier header with mega-menu dropdowns, subtle hover states, and atmospheric hero compositions.

---

## 10. UI Primitives Inventory

Located in `src/components/ui/`:
1. `Button`: Variants (`primary`, `secondary`, `outline`, `ghost`). Sizes (`sm`, `md`, `lg`).
2. `Input` & `Textarea`: Accessible inputs with labels, helper text, and Tajarib font styling.
3. `Select`: Custom dropdown styled with gold focus rings.
4. `Badge`: Variants (`new`, `bestseller`, `sale`, `limited`).
5. `Modal`: Accessible dialog with focus trap and backdrop blur.
6. `Drawer`: Off-canvas slide-out sheet for mobile navigation and shopping cart.
7. `Toast`: Status notifications for "Added to Bag" or error states.
8. `Skeleton`: Subtle pulse loader with ivory/charcoal tones.
9. `EmptyState`: Branded empty state with emblem, headline, and CTA.
10. `ErrorState`: Graceful recovery screen with retry option.

---

## 11. Commerce Components

Located in `src/components/commerce/`:
1. `ProductCard`: Strict 4:5 image ratio, isolated bottle in `object-contain`, quick add overlay, EGP price formatting.
2. `ProductGallery`: Main hero image with thumbnail navigation and zoom modal.
3. `ProductPrice`: Currency-aware Egyptian pound renderer with optional strike-through original price.
4. `SizeSelector`: Interactive 50ml / 100ml toggle button group.
5. `QuantitySelector`: Counter widget with `+` and `−` buttons.
6. `AddToCartButton`: Dedicated luxury button with quick visual confirmation.
7. `CartItem`: Compact product entry inside the slide-out bag or full cart.
8. `CartSummary`: Subtotal, shipping computation, and total checkout button.
9. `CheckoutForm`: Egyptian checkout form (Name, Phone, Governorate, City, Address, Payment).

---

## 12. Editorial Components

Located in `src/components/editorial/`:
1. `CinematicHero`: Brand anchor without text duplication, subtle atmosphere, and high-impact framing.
2. `MaisonStoryBlock`: Dual-column layout combining historical narrative with artisan imagery.
3. `HeritageSection`: Showcase of ingredients (Taif Rose, Royal Cambodian Oud, French Amber).
4. `JournalCard`: Editorial card featuring reading time, published date, and excerpt.
5. `DiscoveryExperience`: Interactive scent family selector.

---

## 13. Brand Components

Located in `src/components/brand/`:
1. `RezanLogo`: Preserves official brand asset without SVG distortion or plain HTML text duplication.
2. `RezanEmblem`: Abstract geometric monogram for loaders, seals, and empty states.
3. `BrandLockup`: Logo paired with "Maison de Parfum" subtitle.

---

## 14. Motion System (Framer Motion)

Defined in `src/design-system/motion.ts`:
- **Presets:** `fadeIn`, `fadeUp`, `sectionReveal`, `imageReveal`, `drawerEnter`, `dropdownEnter`.
- **Durations:** Fast (`150ms`), Normal (`350ms`), Editorial (`850ms`).
- **Safety:** Automatically checks `prefers-reduced-motion: reduce` to disable non-essential motion.
- **Anti-Patterns:** No bouncy springs, no aggressive rotations, and no heavy parallax.

---

## 15. RTL / LTR Architecture

- **Primary:** `dir="rtl"` applied at document root.
- **Logical CSS:** Uses `ms-*` (margin-inline-start), `me-*` (margin-inline-end), `ps-*`, `pe-*`, `start-*`, `end-*`.
- **Directional Icons:** Chevron arrows and back buttons automatically flip direction according to document orientation.

---

## 16. Image Guidelines

- **Perfume Bottles:** Must use `object-contain` within `aspect-[4/5]` containers. Background must be `#F0EDE6` or `#FFFFFF`. Never crop bottle caps or bases.
- **Editorial Photos:** Use `object-cover` with muted contrast.
- **Hero Artwork:** The official REZAN hero artwork is treated as a self-contained visual masterpiece; never place duplicated HTML text over parts of the artwork that already contain the wordmark.

---

## 17. Quality Checklist & Verification

Before submitting any code changes, verify:
- [ ] No arbitrary hex colors outside the token system.
- [ ] All typography renders in Tajarib for Arabic and Roboto for English.
- [ ] No currency shown other than `ج.م` / `EGP`.
- [ ] Zero dead routes or 404 links.
- [ ] Mobile responsive test passed on 320px and 375px.
- [ ] `npx tsc --noEmit` returns 0 errors.
- [ ] `npm run lint` returns 0 warnings/errors.
- [ ] `npm run build` generates production bundle successfully.
>>>>>>> 1a7e7bb (feat: complete REZAN luxury fragrance platform)
