/**
 * REZAN Design System v1.0.0
 * Motion Presets & Tokens
 * 
 * Rules:
 * - Quiet, editorial, restrained motion
 * - No aggressive bounces or large rotations
 * - Respects prefers-reduced-motion
 */

import { Variants, Transition } from "framer-motion";

// ─── 1. CORE MOTION TOKENS ──────────────────────────────────────────────────
export const durations = {
  micro: 0.15,
  standard: 0.3,
  slow: 0.5,
  cinematic: 0.7,
};

export const easings = {
  standard: [0.25, 1, 0.5, 1] as [number, number, number, number], // Smooth standard
  luxury: [0.22, 1, 0.36, 1] as [number, number, number, number], // Editorial, cinematic, slow finish
  springSmooth: { type: "spring", stiffness: 200, damping: 25 },
  springSnappy: { type: "spring", stiffness: 300, damping: 30 },
};

export const distances = {
  micro: 8,
  small: 16,
  medium: 24,
};

export const transitions = {
  instant: { duration: 0 },
  micro: { duration: durations.micro, ease: easings.standard },
  standard: { duration: durations.standard, ease: easings.standard },
  luxury: { duration: durations.cinematic, ease: easings.luxury }, // 700ms
} satisfies Record<string, Transition>;

// ─── 2. REZAN PRIMITIVES ──────────────────────────────────────────────────

export const rezanFade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitions.standard },
  exit: { opacity: 0, transition: transitions.micro },
};

export const rezanFadeUp: Variants = {
  hidden: { opacity: 0, y: distances.small },
  visible: { opacity: 1, y: 0, transition: transitions.standard },
  exit: { opacity: 0, y: distances.micro, transition: transitions.micro },
};

export const rezanReveal: Variants = {
  hidden: { opacity: 0, y: distances.medium },
  visible: { opacity: 1, y: 0, transition: transitions.luxury },
};

export const rezanImageReveal: Variants = {
  hidden: { opacity: 0, scale: 1.025 },
  visible: { opacity: 1, scale: 1, transition: { duration: durations.cinematic, ease: easings.luxury } },
};

export const rezanSoftScale: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1, transition: transitions.standard },
  exit: { opacity: 0, scale: 0.98, transition: transitions.micro },
};

export const rezanMaskReveal: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0 },
  visible: { clipPath: "inset(0 0 0% 0)", opacity: 1, transition: { duration: durations.cinematic, ease: easings.luxury } },
};

export const rezanEditorialStagger = (staggerChildren = 0.1, delayChildren = 0): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren, delayChildren },
  },
});

// ─── 3. COMPONENT SPECIFIC MOTION ──────────────────────────────────────────

export const drawerEnter: Variants = {
  hidden: { x: "100%", opacity: 0.5 },
  visible: { x: 0, opacity: 1, transition: { type: "tween", duration: durations.standard, ease: easings.standard } },
  exit: { x: "100%", opacity: 0, transition: { type: "tween", duration: durations.standard, ease: easings.standard } },
};

export const dropdownEnter: Variants = {
  hidden: { opacity: 0, y: -distances.micro, scale: 0.99 },
  visible: { opacity: 1, y: 0, scale: 1, transition: transitions.micro },
  exit: { opacity: 0, y: -distances.micro, scale: 0.99, transition: transitions.micro },
};

export const modalEnter: Variants = {
  hidden: { opacity: 0, scale: 0.98, y: distances.micro },
  visible: { opacity: 1, scale: 1, y: 0, transition: transitions.standard },
  exit: { opacity: 0, scale: 0.98, y: distances.micro, transition: transitions.micro },
};

export const buttonPress = {
  scale: 0.98,
  transition: { duration: durations.micro },
};

export const buttonHover = {
  y: -1,
  transition: { duration: durations.micro },
};
