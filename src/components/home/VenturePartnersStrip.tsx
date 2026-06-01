"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { venturePartners } from "@/lib/data/founder";
import { cn } from "@/lib/utils";

const linkClass =
  "shrink-0 text-lg font-medium uppercase tracking-[0.2em] text-text-secondary/50 transition hover:text-text-accent";

export function VenturePartnersStrip() {
  const reducedMotion = useReducedMotion();
  const items = [...venturePartners, ...venturePartners];

  return (
    <section
      className="relative overflow-hidden border-y border-white/10 py-6"
      aria-label="Ventures and partners"
    >
      <div
        className="marquee-fade overflow-hidden"
        onMouseEnter={(e) => {
          if (reducedMotion) return;
          e.currentTarget.querySelector("[data-marquee]")?.classList.add("paused");
        }}
        onMouseLeave={(e) => {
          e.currentTarget.querySelector("[data-marquee]")?.classList.remove("paused");
        }}
      >
        <motion.div
          data-marquee
          className="flex w-max items-center gap-12 px-[var(--section-x)] [&.paused]:![animation-play-state:paused]"
          animate={reducedMotion ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        >
          {items.map((v, i) =>
            v.href.startsWith("http") ? (
              <a
                key={`${v.name}-${i}`}
                href={v.href}
                className={cn(linkClass)}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="pointer"
              >
                {v.name}
              </a>
            ) : (
              <Link
                key={`${v.name}-${i}`}
                href={v.href}
                className={cn(linkClass)}
                data-cursor="pointer"
              >
                {v.name}
              </Link>
            ),
          )}
        </motion.div>
      </div>
    </section>
  );
}
