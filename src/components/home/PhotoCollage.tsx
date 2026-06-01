"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion } from "framer-motion";
import {
  PhotoCollageCard,
  type CollageItem,
} from "@/components/home/PhotoCollageCard";
import { useMarqueeSpeed } from "@/components/motion/useMarqueeSpeed";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

const marqueeTags = [
  "Product leadership",
  "CPO · Mewayz",
  "PhantomX",
  "Veerangana",
  "Kolkata · Global",
  "Growth & GTM",
  "Cybersecurity",
  "Brand consulting",
] as const;

function MarqueeStrip() {
  const trackRef = useRef<HTMLDivElement>(null);
  useMarqueeSpeed(trackRef, 20);
  const items = [...marqueeTags, ...marqueeTags];

  return (
    <div className="photo-collage-marquee marquee mt-14 overflow-hidden border-y border-white/10 py-4">
      <div
        ref={trackRef}
        className="photo-collage-marquee__track marquee__track flex w-max gap-10"
      >
        {items.map((tag, i) => (
          <span
            key={`${tag}-${i}`}
            className="shrink-0 text-sm uppercase tracking-[0.25em] text-text-secondary/80"
          >
            {tag}
            <span className="mx-5 text-text-accent/40" aria-hidden>
              ◆
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function PhotoCollage({ items }: { items: CollageItem[] }) {
  return (
    <section
      className="photo-collage-section relative overflow-hidden border-t border-white/10 section-padding-compact"
      aria-labelledby="photo-collage-heading"
    >
      <div className="photo-collage-section__ambient" aria-hidden />

      <div className="relative z-[1]">
        <ScrollReveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.25em] text-text-accent">
                In the studio
              </p>
              <h2
                id="photo-collage-heading"
                className="text-display mt-4 text-h2 leading-[1.08]"
              >
                Leadership, craft, and the work behind the work
              </h2>
            </div>
            <Link
              href="/about"
              className="group inline-flex w-fit items-center gap-2 text-sm uppercase tracking-[0.2em] text-text-primary"
            >
              <span className="border-b border-text-accent pb-1 transition group-hover:text-text-accent">
                About me
              </span>
              <span
                className="transition-transform group-hover:translate-x-1"
                aria-hidden
              >
                →
              </span>
            </Link>
          </div>
        </ScrollReveal>

        <motion.div
          className="mt-12 grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          {items.map((item, i) => (
            <PhotoCollageCard
              key={item.src}
              item={item}
              index={i}
              elevated={i === 1}
            />
          ))}
        </motion.div>

        <MarqueeStrip />
      </div>
    </section>
  );
}
