"use client";

import { motion } from "framer-motion";

export function HeroScrollCue() {
  const scrollDown = () => {
    window.scrollTo({
      top: window.innerHeight * 0.92,
      behavior: "smooth",
    });
  };

  return (
    <motion.button
      type="button"
      onClick={scrollDown}
      className="hero-scroll-cue group flex flex-col items-center gap-3 text-xs uppercase tracking-[0.25em] text-text-secondary transition hover:text-text-accent"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6, duration: 0.8 }}
      aria-label="Scroll to explore"
    >
      <span>Scroll</span>
      <span className="relative flex h-12 w-6 items-start justify-center rounded-full border border-white/20 p-1">
        <motion.span
          className="h-2 w-1 rounded-full bg-text-accent"
          animate={{ y: [0, 16, 0], opacity: [1, 0.3, 1] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </span>
    </motion.button>
  );
}
