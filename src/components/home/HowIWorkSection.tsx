"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { workProcess } from "@/lib/data/founder";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function HowIWorkSection() {
  return (
    <section
      id="process"
      className="section-padding-compact border-t border-white/10"
      aria-labelledby="process-heading"
    >
      <ScrollReveal>
        <p className="text-sm uppercase tracking-[0.2em] text-text-accent">
          How I work
        </p>
        <h2 id="process-heading" className="text-display mt-4 max-w-2xl text-h2">
          From clarity to shipped outcomes
        </h2>
        <p className="mt-4 max-w-xl text-text-secondary">
          A repeatable rhythm for product leadership and venture builds — used
          across Mewayz, PhantomX, and Orcrys portfolio companies.
        </p>
      </ScrollReveal>

      <motion.ol
        className="mt-12 grid list-none gap-6 p-0 md:grid-cols-3 md:gap-8"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
      >
        {workProcess.map((phase) => (
          <motion.li
            key={phase.step}
            variants={item}
            className="relative rounded-[var(--radius-card)] border border-white/10 bg-bg-elevated/25 p-6 md:p-8"
          >
            <span className="text-display text-4xl text-white/10">{phase.step}</span>
            <h3 className="text-display mt-4 text-xl text-text-primary">
              {phase.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              {phase.description}
            </p>
          </motion.li>
        ))}
      </motion.ol>

      <p className="mt-10 text-sm text-text-secondary">
        Ready to start?{" "}
        <Link
          href="/contact"
          className="text-text-accent underline-offset-4 hover:underline"
        >
          Tell me about your mandate →
        </Link>
      </p>
    </section>
  );
}
