"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { motionPresets } from "@/lib/motionPresets";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <>{children}</>;
  }

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={motionPresets.page.initial}
          animate={motionPresets.page.animate}
          exit={motionPresets.page.exit}
          transition={motionPresets.page.transition}
        >
          {children}
        </motion.div>
      </AnimatePresence>
      <motion.div
        key={`bar-${pathname}`}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-px w-full origin-left bg-text-accent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, ease: motionPresets.ease.out }}
      />
    </>
  );
}
