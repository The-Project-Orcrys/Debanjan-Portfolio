"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { venturePartners } from "@/lib/data/founder";

export function VenturePartnersStrip() {
  const reducedMotion = useReducedMotion();
  const items = [...venturePartners, ...venturePartners];

  return (
    <section
      className="border-y border-white/10 py-6"
      aria-label="Ventures and partners"
    >
      <motion.div
        className="flex w-max gap-12 px-6"
        animate={reducedMotion ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
      >
        {items.map((v, i) => (
          <Link
            key={`${v.name}-${i}`}
            href={v.href}
            className="shrink-0 text-lg font-medium uppercase tracking-[0.2em] text-text-secondary/50 transition hover:text-text-accent"
            {...(v.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {v.name}
          </Link>
        ))}
      </motion.div>
    </section>
  );
}
