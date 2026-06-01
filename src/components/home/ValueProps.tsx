"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { cn } from "@/lib/utils";
import type { ValueProp } from "@/types/content";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const child = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
  },
};

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
      className="text-bg-primary"
    >
      <path
        d="M2.5 7.2L5.8 10.5L11.5 3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ValueProps({ items }: { items: ValueProp[] }) {
  return (
    <section
      className="border-t border-white/10 px-[var(--section-x)] pb-[var(--section-y-compact)] pt-8 md:pt-10"
      aria-labelledby="value-props-heading"
    >
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
        <ScrollReveal className="min-w-0 lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
          <p className="text-sm uppercase tracking-[0.25em] text-text-secondary">
            Why leaders choose me
          </p>
          <h2
            id="value-props-heading"
            className="text-display mt-4 text-h2 leading-[1.08]"
          >
            Leaders work with me because of my{" "}
            <span className="value-props-accent">vision + execution</span>
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-text-secondary">
            Product leadership across platforms, security, and growth — with the
            discipline to ship and the narrative to scale.
          </p>
          <Link
            href="/about"
            className="group mt-10 inline-flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-text-primary"
          >
            <span className="border-b border-text-accent pb-1 transition group-hover:text-text-accent">
              Learn more about me
            </span>
            <span
              className="inline-block transition-transform group-hover:translate-x-1"
              aria-hidden
            >
              →
            </span>
          </Link>
        </ScrollReveal>

        <motion.ul
          className="grid list-none gap-4 p-0 sm:grid-cols-2 lg:col-span-7 lg:gap-5"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-8%" }}
        >
          {items.map((item, index) => (
            <motion.li key={item.title} variants={child}>
              <article
                className={cn(
                  "group relative flex h-full flex-col rounded-[var(--radius-card)] border border-white/10 bg-bg-elevated/30 p-6 transition duration-300",
                  "hover:border-text-accent/30 hover:bg-bg-elevated/60 hover:shadow-[var(--shadow-glow)]",
                )}
              >
                <span className="pointer-events-none absolute right-5 top-5 font-mono text-xs text-white/10 transition group-hover:text-text-accent/25">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div
                  className="mb-5 flex h-8 w-8 items-center justify-center rounded-full border border-text-accent/40 bg-text-accent/10 transition group-hover:border-text-accent group-hover:bg-text-accent"
                  aria-hidden
                >
                  <span className="transition group-hover:text-bg-primary">
                    <CheckIcon />
                  </span>
                </div>
                <h3 className="text-display text-lg leading-snug text-text-primary">
                  {item.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary md:text-base">
                  {item.text}
                </p>
              </article>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
