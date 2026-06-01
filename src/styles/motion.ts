import { motionPresets } from "@/lib/motionPresets";
import { tokens } from "@/styles/tokens";

/** Framer Motion + GSAP-friendly motion tokens (mirrors `tokens.motion`). */
export const MOTION = {
  duration: tokens.motion.duration,
  ease: tokens.motion.ease,
  framer: {
    out: tokens.motion.ease.out,
    inOut: tokens.motion.ease.inOut,
  },
  presets: motionPresets,
} as const;
