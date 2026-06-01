"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { Eyebrow } from "@/components/ui/Typography";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { executiveQuotes } from "@/lib/data/founder";
import { cn } from "@/lib/utils";
import { motionPresets } from "@/lib/motionPresets";

function QuoteAvatar({
  name,
  logoUrl,
}: {
  name: string;
  logoUrl?: string;
}) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (logoUrl) {
    return (
      <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/15 bg-white/[0.04]">
        <Image src={logoUrl} alt="" fill className="object-contain p-2" />
      </div>
    );
  }

  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-text-accent/10 text-sm font-medium text-text-accent">
      {initials}
    </div>
  );
}

export function TestimonialsStrip() {
  const reducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const quotes = executiveQuotes;
  const active = quotes[index] ?? quotes[0];

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % quotes.length);
  }, [quotes.length]);

  useEffect(() => {
    if (reducedMotion || paused || quotes.length <= 1) return;
    const id = window.setInterval(next, 7000);
    return () => window.clearInterval(id);
  }, [next, paused, quotes.length, reducedMotion]);

  if (!active) return null;

  return (
    <section
      className="relative section-padding-compact border-t border-white/10"
      aria-label="What collaborators say"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="section-ambient pointer-events-none" aria-hidden />

      <div className="relative z-[1]">
        <ScrollReveal>
          <Eyebrow>Trusted by builders</Eyebrow>
        </ScrollReveal>

        <div className="mt-8 glass-panel glass-border mx-auto max-w-4xl p-8 sm:p-10">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={active.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: motionPresets.ease.out }}
            >
              <p className="text-xl leading-relaxed text-text-primary sm:text-2xl md:text-[1.65rem]">
                &ldquo;{active.quote}&rdquo;
              </p>
              <footer className="mt-8 flex items-center gap-4">
                <QuoteAvatar
                  name={active.attribution}
                  logoUrl={active.companyLogo}
                />
                <div>
                  <span className="block text-text-primary">{active.attribution}</span>
                  {active.title ? (
                    <span className="mt-0.5 block text-sm text-text-secondary">
                      {active.title}
                    </span>
                  ) : null}
                  {active.context ? (
                    <span className="mt-1 block text-xs uppercase tracking-widest text-text-accent">
                      {active.context}
                    </span>
                  ) : null}
                </div>
              </footer>
            </motion.blockquote>
          </AnimatePresence>

          <div className="mt-8 flex items-center gap-2" role="tablist" aria-label="Testimonials">
            {quotes.map((q, i) => (
              <button
                key={q.id}
                type="button"
                role="tab"
                aria-selected={index === i}
                aria-label={`Quote ${i + 1}`}
                onClick={() => setIndex(i)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  index === i
                    ? "w-8 bg-text-accent"
                    : "w-2 bg-white/20 hover:bg-white/35",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
