"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { techStackGroups } from "@/lib/data/founder";

export function TechStackStrip() {
  return (
    <section
      className="border-t border-white/10 bg-white/[0.02] py-12 md:py-16"
      aria-label="Tools and capabilities"
    >
      <ScrollReveal className="section-padding-compact !py-0">
        <p className="text-sm uppercase tracking-[0.2em] text-text-secondary">
          Stack & capabilities
        </p>
        <h2 className="text-display mt-3 text-h3">What I build and lead with</h2>
      </ScrollReveal>

      <motion.div
        className="section-padding-compact mt-8 grid gap-8 !pt-0 sm:grid-cols-2 lg:grid-cols-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {techStackGroups.map((group) => (
          <motion.div
            key={group.category}
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <h3 className="text-xs uppercase tracking-widest text-text-accent">
              {group.category}
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {group.items.map((tool) => (
                <li
                  key={tool}
                  className="rounded-full border border-white/10 bg-bg-primary px-3 py-1.5 text-xs text-text-secondary"
                >
                  {tool}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
