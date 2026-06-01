"use client";

import type { RefObject } from "react";
import { useEffect } from "react";
import { useLenis } from "@/components/motion/LenisProvider";

/** Drives `.marquee__track` CSS animation; speeds up slightly while scrolling. */
export function useMarqueeSpeed(
  ref: RefObject<HTMLElement | null>,
  baseDurationSeconds = 24,
) {
  const lenis = useLenis();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let duration = baseDurationSeconds;

    const applyDuration = () => {
      el.style.setProperty("--marquee-duration", `${duration}s`);
    };

    applyDuration();

    let lastScroll = lenis?.scroll ?? window.scrollY;
    let lastTime = performance.now();

    const onScroll = () => {
      const now = performance.now();
      const scroll = lenis?.scroll ?? window.scrollY;
      const dt = Math.max(1, now - lastTime);
      const velocity = Math.abs(scroll - lastScroll) / dt;
      lastScroll = scroll;
      lastTime = now;

      const factor = 1 + Math.min(velocity * 0.06, 1.4);
      duration = Math.max(10, baseDurationSeconds / factor);
      applyDuration();
    };

    if (lenis) {
      lenis.on("scroll", onScroll);
      return () => lenis.off("scroll", onScroll);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ref, baseDurationSeconds, lenis]);
}
