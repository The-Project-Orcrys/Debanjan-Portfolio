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
  },
  typography: {
    display: "var(--font-display)",
    body: "var(--font-body)",
    scale: {
      hero: "clamp(5rem, 20vw, 22rem)",
      h1: "clamp(2.5rem, 6vw, 5rem)",
      h2: "clamp(1.75rem, 4vw, 3rem)",
      h3: "clamp(1.25rem, 2.5vw, 1.75rem)",
      body: "1rem",
      small: "0.875rem",
      label: "0.75rem",
    },
  },
  spacing: {
    sectionY: "clamp(5rem, 10vw, 12rem)",
    sectionX: "clamp(1.5rem, 6vw, 8rem)",
    gap: {
      sm: "1rem",
      md: "2rem",
      lg: "4rem",
      xl: "8rem",
    },
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
    parallax: {
      slow: 0.2,
      medium: 0.5,
      fast: 0.8,
    },
  },
  radius: {
    pill: "9999px",
    card: "0.75rem",
    sm: "0.375rem",
  },
  shadow: {
    card: "0 8px 32px rgba(0,0,0,0.4)",
    glow: "0 0 40px rgba(200,184,255,0.15)",
  },
} as const;
