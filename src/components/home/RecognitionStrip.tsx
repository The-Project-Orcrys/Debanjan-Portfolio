"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Eyebrow, SectionHeading } from "@/components/ui/Typography";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { defaultRecognitions } from "@/lib/data/defaults";

export function RecognitionStrip() {
  const reducedMotion = useReducedMotion();
  const items = [...defaultRecognitions, ...defaultRecognitions];

  return (
    <section
      className="section-padding-compact border-t border-white/10"
      aria-label="Recognition and milestones"
    >
      <ScrollReveal>
        <Eyebrow>Recognition</Eyebrow>
        <SectionHeading>Milestones & community</SectionHeading>
        <p className="mt-3 text-sm text-text-secondary">
          <Link href="/about#awards" className="hover:text-text-accent" data-cursor="pointer">
            View full awards board →
          </Link>
        </p>
      </ScrollReveal>

      <div className="marquee-fade mt-6 overflow-hidden">
        <motion.ul
          className="flex w-max list-none gap-3 p-0"
          animate={reducedMotion ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {items.map((item, i) => (
            <li
              key={`${item.award}-${i}`}
              className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-text-secondary backdrop-blur-sm transition hover:border-text-accent/30"
            >
              <span className="text-text-primary">{item.award}</span>
              {item.count > 1 ? (
                <span className="ml-2 text-text-accent">×{item.count}</span>
              ) : null}
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
