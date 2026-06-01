"use client";

import { useEffect, useRef } from "react";

/** Pointer-following radial glow over the hero (CSS vars on section). */
export function HeroSpotlight({ targetRef }: { targetRef: React.RefObject<HTMLElement | null> }) {
  const raf = useRef(0);
  const pos = useRef({ x: 50, y: 40, sx: 50, sy: 40 });

  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      pos.current.x = ((e.clientX - rect.left) / rect.width) * 100;
      pos.current.y = ((e.clientY - rect.top) / rect.height) * 100;
    };

    const onLeave = () => {
      pos.current.x = 50;
      pos.current.y = 38;
    };

    const tick = () => {
      pos.current.sx += (pos.current.x - pos.current.sx) * 0.06;
      pos.current.sy += (pos.current.y - pos.current.sy) * 0.06;
      el.style.setProperty("--hero-spot-x", `${pos.current.sx}%`);
      el.style.setProperty("--hero-spot-y", `${pos.current.sy}%`);
      raf.current = requestAnimationFrame(tick);
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);
    raf.current = requestAnimationFrame(tick);

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf.current);
    };
  }, [targetRef]);

  return (
    <div className="hero-spotlight pointer-events-none absolute inset-0 z-[1]" aria-hidden />
  );
}
