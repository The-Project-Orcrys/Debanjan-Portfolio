"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { cn } from "@/lib/utils";
import type { RecognitionItem } from "@/types/content";

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
};

function parseAward(award: string) {
  const match = award.match(/^(.+?)\s*[—–-]\s*(.+)$/);
  if (match) {
    return { headline: match[1].trim(), detail: match[2].trim() };
  }
  const paren = award.match(/^(.+?)\s*\(([^)]+)\)\s*$/);
  if (paren) {
    return { headline: paren[1].trim(), detail: paren[2].trim() };
  }
  return { headline: award, detail: null };
}

function AwardIcon({ index }: { index: number }) {
  const icons = [
    <path key="star" d="M12 3l2.2 6.8H21l-5.5 4 2.1 6.7L12 16.2 6.4 20.5l2.1-6.7L3 9.8h6.8L12 3z" />,
    <path key="cert" d="M8 4h8v14H8V4zm2 2v4h4V6h-4zm0 6v2h4v-2h-4z" />,
    <path key="bolt" d="M13 2L5 14h6l-1 8 9-14h-6l1-6z" />,
    <path key="heart" d="M12 20s-6-3.6-6-9a3.5 3.5 0 0 1 6-2.2A3.5 3.5 0 0 1 18 11c0 5.4-6 9-6 9z" />,
  ];
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 text-text-accent"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {icons[index % icons.length]}
    </svg>
  );
}

function RecognitionCard({
  item,
  index,
}: {
  item: RecognitionItem;
  index: number;
}) {
  const { headline, detail } = parseAward(item.award);
  const showCount = item.count > 1;

  return (
    <motion.li
      variants={cardVariants}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)]",
        "border border-white/10 bg-bg-elevated/25 p-6 transition duration-300",
        "hover:border-text-accent/35 hover:bg-bg-elevated/40 hover:shadow-[var(--shadow-glow)]",
      )}
    >
      <div
        className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-text-accent/10 blur-2xl transition-opacity group-hover:opacity-100 opacity-60"
        aria-hidden
      />

      <div className="relative flex items-start justify-between gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
          <AwardIcon index={index} />
        </div>
        <span className="text-display text-sm tabular-nums text-white/20">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3 className="text-display relative mt-5 text-lg leading-snug text-text-primary sm:text-xl">
        {headline}
      </h3>

      {detail ? (
        <p className="relative mt-2 text-sm leading-relaxed text-text-accent">
          {detail}
        </p>
      ) : null}

      <div className="relative mt-auto flex flex-wrap items-center gap-2 pt-5">
        <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[0.65rem] uppercase tracking-widest text-text-secondary">
          Recognition
        </span>
        {showCount ? (
          <span className="text-xs tabular-nums text-text-secondary">
            ×{item.count}
          </span>
        ) : null}
      </div>
    </motion.li>
  );
}

export function AwardsBoard({ items }: { items: RecognitionItem[] }) {
  if (items.length === 0) return null;

  return (
    <section
      id="awards"
      className="section-padding border-t border-white/10"
      aria-labelledby="recognition-heading"
    >
      <ScrollReveal>
        <p className="text-sm uppercase tracking-[0.2em] text-text-accent">
          Milestones
        </p>
        <h2 id="recognition-heading" className="text-display mt-4 max-w-2xl text-h2">
          Certifications & recognition
        </h2>
        <p className="mt-4 max-w-xl text-text-secondary">
          Academic honors, competition wins, and long-form community leadership
          that shaped how I build teams and products.
        </p>
      </ScrollReveal>

      <motion.ul
        className="mt-10 grid list-none gap-4 p-0 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-8%" }}
      >
        {items.map((item, index) => (
          <RecognitionCard key={item.award} item={item} index={index} />
        ))}
      </motion.ul>
    </section>
  );
}
