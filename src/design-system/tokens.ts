/**
 * REZAN Design System v1.0.0
 * Single Source of Truth (SSOT) - Design Tokens
 * 
 * Philosophy: Luxury Niche Perfumery + Arabic Heritage + European Editorial Elegance + Quiet Luxury
 */

export const primitiveTokens = {
  colors: {
    // Brand primitives
    black: "#111111",
    charcoal: "#1A1A1A",
    charcoalLight: "#242424",
    charcoalMuted: "#2E2E2E",
    ivory: "#F7F3EA",
    ivoryLight: "#FAF8F3",
    ivoryMuted: "#EFECE2",
    ivoryDark: "#E5E0D3",
    gold: "#B89A62",
    goldLight: "#CDB48A",
    goldDark: "#9A7E4A",
    goldMuted: "rgba(184, 154, 98, 0.15)",
    white: "#FFFFFF",
    
    // Neutral scale
    neutral: {
      50: "#FAF9F6",
      100: "#F4F1EB",
      200: "#E8E4DB",
      300: "#D3CEC2",
      400: "#A8A397",
      500: "#7A766C",
      600: "#55524B",
      700: "#36342F",
      800: "#1F1E1B",
      900: "#141311",
    },

    // Status primitives (restrained, non-garish)
    status: {
      success: "#3B6E4C",
      successBg: "#F0F6F2",
      warning: "#946B2D",
      warningBg: "#FDF8F0",
      error: "#8B2626",
      errorBg: "#FAF0F0",
      info: "#3B5A6E",
      infoBg: "#F0F4F7",
    },
  },

  typography: {
    fontFamilies: {
      arabic: "var(--font-tajarib), 'Segoe UI', Tahoma, Arial, sans-serif",
      english: "var(--font-roboto), ui-sans-serif, system-ui, sans-serif",
    },
    fontWeights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    fontSizes: {
      xs: "0.75rem",     // 12px
      sm: "0.8125rem",   // 13px
      base: "0.875rem",  // 14px
      md: "1rem",        // 16px
      lg: "1.125rem",    // 18px
      xl: "1.25rem",     // 20px
      "2xl": "1.5rem",   // 24px
      "3xl": "1.875rem", // 30px
      "4xl": "2.25rem",  // 36px
      "5xl": "3rem",     // 48px
      "6xl": "3.75rem",  // 60px
    },
    lineHeights: {
      none: "1",
      tight: "1.2",
      snug: "1.375",
      normal: "1.5",
      relaxed: "1.65",
      loose: "1.8",
    },
    letterSpacing: {
      tighter: "-0.05em",
      tight: "-0.02em",
      normal: "0em",
      wide: "0.05em",
      wider: "0.1em",
      widest: "0.2em",
    },
  },

  spacing: {
    0: "0px",
    1: "0.25rem",  // 4px
    2: "0.5rem",   // 8px
    3: "0.75rem",  // 12px
    4: "1rem",     // 16px
    5: "1.25rem",  // 20px
    6: "1.5rem",   // 24px
    8: "2rem",     // 32px
    10: "2.5rem",  // 40px
    12: "3rem",    // 48px
    16: "4rem",    // 64px
    20: "5rem",    // 80px
    24: "6rem",    // 96px
    32: "8rem",    // 128px
  },

  borderRadius: {
    none: "0px",
    sm: "2px",
    md: "4px",
    lg: "8px",
    full: "9999px",
  },

  elevation: {
    none: "none",
    subtle: "0 1px 2px 0 rgba(0, 0, 0, 0.04)",
    card: "0 2px 8px 0 rgba(0, 0, 0, 0.06)",
    dropdown: "0 4px 16px 0 rgba(0, 0, 0, 0.08)",
    modal: "0 12px 32px -4px rgba(0, 0, 0, 0.16)",
  },

  motion: {
    durations: {
      instant: "0ms",
      fast: "150ms",
      normal: "300ms",
      slow: "500ms",
      slower: "800ms",
    },
    easings: {
      standard: "cubic-bezier(0.2, 0, 0, 1)",
      luxury: "cubic-bezier(0.25, 1, 0.5, 1)",
      accelerate: "cubic-bezier(0.3, 0, 1, 1)",
      decelerate: "cubic-bezier(0, 0, 0.2, 1)",
    },
  },

  breakpoints: {
    xs: "320px",
    sm: "375px",
    mobile: "400px",
    tablet: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },

  zIndex: {
    base: 0,
    raised: 10,
    dropdown: 50,
    sticky: 100,
    backdrop: 140,
    drawer: 150,
    modal: 160,
    toast: 180,
    tooltip: 200,
  },
} as const;

/**
 * Semantic tokens mapped to Light (Ivory) and Dark (Near Black) modes
 */
export const semanticTokens = {
  light: {
    surface: {
      primary: primitiveTokens.colors.ivory,
      secondary: primitiveTokens.colors.white,
      raised: primitiveTokens.colors.ivoryLight,
      inverse: primitiveTokens.colors.black,
      subtle: primitiveTokens.colors.ivoryMuted,
      highlight: primitiveTokens.colors.goldMuted,
    },
    text: {
      primary: primitiveTokens.colors.charcoal,
      secondary: primitiveTokens.colors.neutral[600],
      muted: primitiveTokens.colors.neutral[500],
      inverse: primitiveTokens.colors.ivory,
      accent: primitiveTokens.colors.gold,
      accentHover: primitiveTokens.colors.goldDark,
    },
    border: {
      subtle: primitiveTokens.colors.neutral[200],
      default: primitiveTokens.colors.neutral[300],
      strong: primitiveTokens.colors.charcoal,
      accent: primitiveTokens.colors.gold,
    },
    accent: {
      primary: primitiveTokens.colors.gold,
      hover: primitiveTokens.colors.goldLight,
      active: primitiveTokens.colors.goldDark,
      muted: primitiveTokens.colors.goldMuted,
    },
  },
  dark: {
    surface: {
      primary: primitiveTokens.colors.black,
      secondary: primitiveTokens.colors.charcoal,
      raised: primitiveTokens.colors.charcoalLight,
      inverse: primitiveTokens.colors.ivory,
      subtle: primitiveTokens.colors.charcoalMuted,
      highlight: "rgba(184, 154, 98, 0.1)",
    },
    text: {
      primary: primitiveTokens.colors.ivory,
      secondary: "rgba(247, 243, 234, 0.75)",
      muted: "rgba(247, 243, 234, 0.5)",
      inverse: primitiveTokens.colors.charcoal,
      accent: primitiveTokens.colors.gold,
      accentHover: primitiveTokens.colors.goldLight,
    },
    border: {
      subtle: "rgba(247, 243, 234, 0.08)",
      default: "rgba(247, 243, 234, 0.15)",
      strong: "rgba(247, 243, 234, 0.3)",
      accent: primitiveTokens.colors.gold,
    },
    accent: {
      primary: primitiveTokens.colors.gold,
      hover: primitiveTokens.colors.goldLight,
      active: primitiveTokens.colors.goldDark,
      muted: primitiveTokens.colors.goldMuted,
    },
  },
} as const;
