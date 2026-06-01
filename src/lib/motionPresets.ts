/** Shared motion easing and durations — matches globals.css / tokens. */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT = [0.83, 0, 0.17, 1] as const;

export const motionPresets = {
  duration: {
    fast: 0.2,
    base: 0.4,
    slow: 0.8,
    hero: 1.2,
  },
  ease: {
    out: EASE_OUT,
    inOut: EASE_IN_OUT,
  },
  fadeUp: {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: EASE_OUT },
  },
  page: {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8, filter: "blur(4px)" },
    transition: { duration: 0.4, ease: EASE_OUT },
  },
} as const;
