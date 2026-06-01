"use client";

import { motion } from "framer-motion";
import { useLayoutEffect, useRef } from "react";
import { PortfolioImage } from "@/components/shared/PortfolioImage";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { PORTRAIT_OBJECT_POSITION } from "@/lib/images";
import { cn } from "@/lib/utils";
import type { AboutSection } from "@/types/content";

const cardMotion = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
  },
};

function BioBlock({
  number,
  label,
  paragraphs,
  className,
  lead = false,
}: {
  number: string;
  label: string;
  paragraphs: string[];
  className?: string;
  lead?: boolean;
}) {
  return (
    <article
      className={cn(
        "about-bio-block relative overflow-hidden rounded-[var(--radius-card)] border border-white/10 bg-bg-elevated/20 p-6 sm:p-8",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-text-accent/10 blur-3xl"
        aria-hidden
      />
      <div className="relative flex items-start gap-4">
        <span
          className="text-display shrink-0 text-3xl leading-none text-white/15 tabular-nums"
          aria-hidden
        >
          {number}
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-display text-xl sm:text-2xl">{label}</h2>
          <div className="about-bio-prose mt-5 space-y-4 text-text-secondary">
            {paragraphs.map((p, i) => (
              <p
                key={p.slice(0, 32)}
                className={cn(
                  "leading-relaxed",
                  lead && i === 0 && "text-base text-text-primary sm:text-lg",
                )}
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export function BioSection({ about }: { about: AboutSection }) {
  const portraitRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const wrap = portraitRef.current;
    if (!wrap) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let ctx: { revert: () => void } | undefined;
    void (async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      const img = wrap.querySelector(".about-bio-portrait");
      if (!img) return;
      ctx = gsap.context(() => {
        gsap.to(img, {
          y: -32,
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }, wrap);
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <section
      className="about-bio section-padding border-t border-white/10"
      aria-labelledby="about-bio-heading"
    >
      <ScrollReveal>
        <p className="text-sm uppercase tracking-[0.2em] text-text-accent">
          Background
        </p>
        <h2
          id="about-bio-heading"
          className="text-display mt-4 max-w-2xl text-h2"
        >
          Product leader, founder, builder
        </h2>
        <p className="mt-4 max-w-xl text-text-secondary">
          How I think about teams, products, and ventures — from Mewayz and
          PhantomX to Orcrys and community-led impact work.
        </p>
      </ScrollReveal>

      <div className="mt-12 lg:mt-16">
        <ScrollReveal>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-10">
            <div
              ref={portraitRef}
              className="relative mx-auto w-full max-w-sm lg:col-span-5 lg:mx-0 lg:max-w-none"
            >
              <div className="about-bio-portrait relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] border border-white/10 bg-bg-secondary shadow-[var(--shadow-card)]">
                <PortfolioImage
                  src={about.photoUrl}
                  alt="Debanjan Sandhaki — professional portrait"
                  objectPosition={PORTRAIT_OBJECT_POSITION}
                  className="object-cover"
                  sizes="(max-width: 1024px) 90vw, 420px"
                  priority
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-primary/50 via-transparent to-transparent"
                  aria-hidden
                />
              </div>
              <p className="mt-4 text-center text-xs uppercase tracking-widest text-text-secondary lg:text-left">
                {about.location}
              </p>
            </div>

            <motion.div
              className="lg:col-span-7"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-8%" }}
              variants={cardMotion}
            >
              <BioBlock
                number="01"
                label="Who I Am"
                paragraphs={about.whoIAm}
                lead
                className="h-full border-text-accent/20 bg-gradient-to-br from-bg-elevated/40 to-bg-elevated/10"
              />
            </motion.div>
          </div>
        </ScrollReveal>

        <motion.div
          className="mt-8 grid gap-6 sm:gap-8 lg:mt-10 lg:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-8%" }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.05 }}
        >
          <motion.div variants={cardMotion}>
            <BioBlock
              number="02"
              label="Approach"
              paragraphs={about.approach}
              className="h-full"
            />
          </motion.div>
          <motion.div variants={cardMotion}>
            <BioBlock
              number="03"
              label="Philosophy"
              paragraphs={about.philosophy}
              className="h-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
