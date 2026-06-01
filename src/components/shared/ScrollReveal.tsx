"use client";

import { motion } from "framer-motion";
import { MOTION } from "@/styles/motion";
import { cn } from "@/lib/utils";

type Direction = "up" | "left" | "right" | "none";

function revealVariants(direction: Direction, delay: number) {
  const hidden: Record<string, number> = { opacity: 0 };
  if (direction === "up") hidden.y = 32;
  if (direction === "left") hidden.x = -32;
  if (direction === "right") hidden.x = 32;

  return {
    hidden,
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.7,
        delay,
        ease: MOTION.framer.out,
      },
    },
  };
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  /** Seconds before the reveal animation starts (e.g. stagger grid items). */
  delay?: number;
  direction?: Direction;
}) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-8%" }}
      variants={revealVariants(direction, delay)}
    >
      {children}
    </motion.div>
  );
}
