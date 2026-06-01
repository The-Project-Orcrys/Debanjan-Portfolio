"use client";

import Link from "next/link";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Eyebrow, Lead, SectionHeading } from "@/components/ui/Typography";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { engagementOfferings } from "@/lib/data/founder";
import { cn } from "@/lib/utils";

function inquiryHref(type: string) {
  return `/contact?inquiry=${encodeURIComponent(type)}`;
}

export function EngagementSection() {
  return (
    <section
      id="engage"
      className="relative border-t border-white/10"
      aria-labelledby="engage-heading"
    >
      <div className="section-ambient pointer-events-none" aria-hidden />
      <div className="ambient-noise pointer-events-none" aria-hidden />

      <div className="section-padding-compact relative z-[1]">
        <ScrollReveal>
          <Eyebrow>Work with me</Eyebrow>
          <SectionHeading id="engage-heading">How we can partner</SectionHeading>
          <Lead>
            Product leadership, venture building, and executive advisory — pick the
            lane that matches your mandate.
          </Lead>
        </ScrollReveal>

        <ul className="mt-10 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {engagementOfferings.map((item, index) => (
            <li key={item.id}>
              <ScrollReveal delay={index * 0.06}>
                <GlassPanel
                  as="article"
                  bordered
                  strong={item.recommended}
                  className={cn(
                    "group flex h-full flex-col p-6 transition duration-500 hover:border-text-accent/35",
                    item.recommended && "ring-1 ring-text-accent/20",
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] text-xs font-semibold tracking-widest text-text-accent">
                      {item.monogram}
                    </span>
                    {item.recommended ? (
                      <span className="rounded-full border border-text-accent/40 bg-text-accent/10 px-2.5 py-1 text-[0.65rem] uppercase tracking-widest text-text-accent">
                        Most common
                      </span>
                    ) : null}
                  </div>

                  <h3 className="text-display mt-5 text-xl">{item.title}</h3>
                  <p className="mt-1 text-xs uppercase tracking-widest text-text-secondary">
                    {item.duration}
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary">
                    {item.description}
                  </p>
                  <ul className="mt-5 space-y-2 border-t border-white/10 pt-4 text-sm text-text-secondary">
                    {item.highlights.map((h) => (
                      <li key={h} className="flex gap-2">
                        <span className="text-text-accent" aria-hidden>
                          —
                        </span>
                        {h}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={inquiryHref(item.inquiryType)}
                    className="hero-cta-secondary mt-6 w-full justify-center sm:w-auto"
                    data-cursor="pointer"
                  >
                    Start a conversation
                  </Link>
                </GlassPanel>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
