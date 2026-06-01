"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState, useSyncExternalStore } from "react";

function subscribeNoop() {
  return () => {};
}

function readCustomCursorEnabled(): boolean {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const noHover = window.matchMedia("(hover: none)").matches;
  return !reduced && !coarse && !noHover;
}

export function CustomCursor() {
  const enabled = useSyncExternalStore(
    subscribeNoop,
    readCustomCursorEnabled,
    () => false,
  );
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 280, damping: 28, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 280, damping: 28, mass: 0.4 });

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("custom-cursor-active");

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest(
        "a, button, [role='button'], [data-cursor='pointer'], input, textarea, select, label",
      );
      setHovering(Boolean(interactive));
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[200] mix-blend-difference"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        aria-hidden
      >
        <div
          className="h-2 w-2 rounded-full bg-white transition-transform duration-200"
          style={{ transform: hovering ? "scale(0.5)" : "scale(1)" }}
        />
      </motion.div>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[199]"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        aria-hidden
      >
        <div
          className="rounded-full border border-white/40 transition-all duration-300"
          style={{
            width: hovering ? 44 : 28,
            height: hovering ? 44 : 28,
            opacity: hovering ? 0.85 : 0.45,
          }}
        />
      </motion.div>
    </>
  );
}
