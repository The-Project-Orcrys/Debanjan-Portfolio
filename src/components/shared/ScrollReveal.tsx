"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

function revealVariants(delay = 0) {
  return {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  /** Seconds before the reveal animation starts (e.g. stagger grid items). */
  delay?: number;
}) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={revealVariants(delay)}
    >
      {children}
    </motion.div>
  );
}
