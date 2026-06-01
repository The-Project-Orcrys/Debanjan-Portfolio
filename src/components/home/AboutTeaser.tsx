"use client";

import { motion } from "framer-motion";
import { PortfolioImage } from "@/components/shared/PortfolioImage";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

const lineVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      delay: i * 0.12,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

const photoVariants = {
  hidden: { opacity: 0, x: 40, scale: 0.98 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const lines = [
  "Bold products",
  "take focus",
  "and working with me accelerates them",
] as const;

export function AboutTeaser({ photoUrl }: { photoUrl: string }) {
  return (
    <section className="section-padding-compact !pb-8 border-t border-white/10 md:!pb-10">
      <ScrollReveal className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <motion.div
          className="space-y-2 md:space-y-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-12%" }}
        >
          {lines.map((line, i) => (
            <motion.p
              key={line}
              custom={i}
              variants={lineVariants}
              className="text-display text-h1 leading-[1.05]"
            >
              {line}
            </motion.p>
          ))}
        </motion.div>

        <motion.div
          className="relative mx-auto aspect-[3/4] w-full max-w-[min(100%,22rem)] overflow-hidden rounded-[var(--radius-card)] sm:max-w-md"
          variants={photoVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-12%" }}
        >
          <PortfolioImage
            src={photoUrl}
            alt="Debanjan Sandhaki — professional portrait"
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 400px"
          />
        </motion.div>
      </ScrollReveal>
    </section>
  );
}
