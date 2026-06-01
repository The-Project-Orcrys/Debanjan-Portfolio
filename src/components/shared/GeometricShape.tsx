"use client";

import { motion } from "framer-motion";
import { useParallax } from "@/components/motion/useParallax";
import { cn } from "@/lib/utils";
import type { ShapeConfig } from "@/types/content";

export function GeometricShape({
  type,
  color,
  size,
  top,
  left,
  parallaxSpeed,
  rotationOffset,
}: ShapeConfig) {
  const ref = useParallax(parallaxSpeed);
  const isBlue = color === "blue";
  const floatDuration = 5 + parallaxSpeed * 5;

  const colorClass = isBlue ? "bg-shape-blue" : "bg-shape-grey";

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(
        "pointer-events-none absolute hidden md:block",
        isBlue ? "opacity-55" : "opacity-50",
        colorClass,
        type === "circle" && "rounded-full",
        type === "pill" && "rounded-full",
        type === "square" && "rounded-sm",
        type === "hexagon" && "clip-hexagon",
        isBlue && "mix-blend-screen shadow-[0_0_80px_rgba(26,58,255,0.55)]",
      )}
      style={{
        width: size,
        height: type === "pill" ? size * 0.4 : size,
        top,
        left,
      }}
      initial={{ rotate: rotationOffset }}
      animate={{
        y: [0, -18 - parallaxSpeed * 12, 0],
        rotate: [
          rotationOffset,
          rotationOffset + (isBlue ? 12 : 6),
          rotationOffset,
        ],
        scale: isBlue ? [1, 1.06, 1] : [1, 1.03, 1],
      }}
      transition={{
        duration: floatDuration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      aria-hidden
    />
  );
}
