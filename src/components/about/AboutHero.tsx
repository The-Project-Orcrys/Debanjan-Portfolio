"use client";

import { useLayoutEffect, useRef } from "react";
import { SplitName } from "@/components/shared/SplitName";
import { TextSplit } from "@/components/shared/TextSplit";
import { useTextReveal } from "@/components/motion/useTextReveal";
import type { SiteSettings } from "@/types/content";

export function AboutHero({
  settings,
  location,
}: {
  settings: SiteSettings;
  location: string;
}) {
  const sectionRef = useTextReveal(".text-reveal-line", { stagger: 0.12 });
  const ambientRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ambientRef.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let ctx: { revert: () => void } | undefined;
    void (async () => {
      const { default: gsap } = await import("gsap");
      ctx = gsap.context(() => {
        gsap.from(el, {
          opacity: 0,
          scale: 0.98,
          duration: 1.2,
          ease: "power2.out",
        });
      }, el);
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="about-hero relative section-padding !pt-0"
    >
      <div ref={ambientRef} className="section-ambient pointer-events-none" aria-hidden />
      <div className="ambient-noise pointer-events-none" aria-hidden />

      <div className="relative z-[1]">
        <SplitName
          firstName={settings.firstName}
          lastName={settings.lastName}
          asHeading
          animate
        />
        <TextSplit
          as="p"
          text={settings.role}
          className="mt-6 max-w-2xl text-lg text-text-secondary"
        />
        <p className="mt-8 flex items-center gap-2 text-text-secondary">
          <span aria-hidden>◎</span>
          {location}
        </p>
      </div>
    </section>
  );
}
