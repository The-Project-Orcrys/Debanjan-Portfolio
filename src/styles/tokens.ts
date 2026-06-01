/**
 * JS mirror of CSS design tokens in globals.css — for programmatic use only.
 * Source of truth: src/styles/globals.css :root + @theme
 */
export const tokens = {
  color: {
    bg: {
      primary: "#0a0a0a",
      secondary: "#111111",
      elevated: "#1a1a1a",
    },
    text: {
      primary: "#f0ede8",
      secondary: "#8a8a8a",
      accent: "#c8b8ff",
    },
    shape: {
      grey: "#2a2a2a",
      blue: "#1a3aff",
    },
    border: {
      subtle: "rgba(255, 255, 255, 0.1)",
      strong: "rgba(255, 255, 255, 0.18)",
    },
    surface: {
      glass: "rgba(14, 16, 24, 0.72)",
      glassStrong: "rgba(18, 20, 32, 0.88)",
    },
  },
  typography: {
    display: "var(--font-display)",
    body: "var(--font-body)",
    scale: {
      hero: "clamp(3.25rem, 18vw, 22rem)",
      h1: "clamp(2rem, 5.5vw, 5rem)",
      h2: "clamp(1.5rem, 4vw, 3rem)",
      h3: "clamp(1.125rem, 2.5vw, 1.75rem)",
      body: "1rem",
      small: "0.875rem",
      label: "0.75rem",
    },
    measure: {
      prose: "65ch",
    },
  },
  spacing: {
    sectionY: "clamp(3.5rem, 8vw, 12rem)",
    sectionX: "clamp(1rem, 4vw, 8rem)",
  },
  motion: {
    duration: {
      fast: 0.2,
      base: 0.4,
      slow: 0.8,
      hero: 1.2,
    },
    ease: {
      out: [0.16, 1, 0.3, 1] as const,
      inOut: [0.83, 0, 0.17, 1] as const,
    },
  },
  radius: {
    pill: "9999px",
    card: "0.75rem",
  },
  shadow: {
    card: "0 8px 32px rgba(0,0,0,0.4)",
    glow: "0 0 40px rgba(200,184,255,0.15)",
  },
} as const;
