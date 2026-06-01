"use client";

import { motion } from "framer-motion";
import { impactMetrics } from "@/lib/data/founder";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function ImpactMetricsStrip() {
  return (
    <section
      className="border-y border-white/10 bg-white/[0.02]"
      aria-label="Impact at a glance"
    >
      <motion.ul
        className="mx-auto grid max-w-6xl list-none grid-cols-2 gap-px bg-white/10 p-0 lg:grid-cols-4"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-5%" }}
      >
        {impactMetrics.map((metric) => (
          <motion.li
            key={metric.label}
            variants={item}
            className="flex flex-col gap-1 bg-bg-primary px-5 py-6 sm:px-8 sm:py-8"
          >
            <span className="text-display text-2xl tabular-nums text-text-primary sm:text-3xl">
              {metric.value}
            </span>
            <span className="text-sm font-medium text-text-primary">
              {metric.label}
            </span>
            <span className="text-xs leading-relaxed text-text-secondary">
              {metric.detail}
            </span>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
