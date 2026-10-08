/**
 * REZAN Design System v1.0.0
 * Typography Definition & Helpers
 * 
 * Primary Fonts:
 * - Arabic: Tajarib (Local)
 * - English: Roboto (Local)
 */

export const typographyStyles = {
  // Editorial Display
  display: "text-[32px] sm:text-[40px] lg:text-[56px] font-medium leading-[1.15] tracking-tight",
  heroTitle: "text-[28px] sm:text-[36px] lg:text-[48px] font-semibold leading-[1.2] tracking-normal",
  
  // Headings
  h1: "text-[24px] sm:text-[30px] lg:text-[36px] font-semibold leading-[1.25]",
  h2: "text-[20px] sm:text-[24px] lg:text-[28px] font-semibold leading-[1.3]",
  h3: "text-[16px] sm:text-[18px] lg:text-[20px] font-medium leading-[1.35]",
  h4: "text-[14px] sm:text-[15px] lg:text-[16px] font-medium leading-[1.4]",
  
  // Body text
  bodyLarge: "text-[15px] sm:text-[16px] leading-[1.7]",
  body: "text-[13px] sm:text-[14px] leading-[1.6]",
  bodySmall: "text-[12px] leading-[1.5]",
  
  // Micro / Eyebrows / Captions
  eyebrow: "text-[10px] sm:text-[11px] font-medium tracking-[0.2em] uppercase font-en",
  caption: "text-[11px] leading-normal",
  label: "text-[12px] font-medium leading-none",
  
  // Commercial UI
  price: "text-[14px] sm:text-[15px] font-semibold tracking-tight",
  priceOriginal: "text-[11px] sm:text-[12px] line-through opacity-60",
  badge: "text-[9px] sm:text-[10px] font-medium tracking-wide uppercase px-2 py-0.5",
  button: "text-[12px] sm:text-[13px] font-medium tracking-wide uppercase",
  navLink: "text-[13px] tracking-wide transition-colors",
} as const;
