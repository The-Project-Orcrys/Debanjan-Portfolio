"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useTextReveal(
  selector = ".text-reveal-line",
  options?: { stagger?: number; start?: string },
) {
  const containerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lines = container.querySelectorAll(selector);
    if (!lines.length) return;

    if (reduced) {
      gsap.set(lines, { y: 0, opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lines,
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.8,
          stagger: options?.stagger ?? 0.07,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: options?.start ?? "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, container);

    return () => ctx.revert();
  }, [selector, options?.stagger, options?.start]);

  return containerRef;
}
