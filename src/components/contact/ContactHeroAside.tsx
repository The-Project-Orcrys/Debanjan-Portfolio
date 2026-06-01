"use client";

import { PortfolioImage } from "@/components/shared/PortfolioImage";
import { ContactEngagementLanes } from "@/components/contact/ContactEngagementLanes";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { assets } from "@/lib/data/assets";
import { ventureQuickLinks } from "@/lib/data/products";
import { PORTRAIT_OBJECT_POSITION } from "@/lib/images";
import { cn } from "@/lib/utils";
import type { SiteSettings } from "@/types/content";

export function ContactHeroAside({
  settings,
  className,
  /** Full card with engagement lanes (mobile). Portrait-only on desktop. */
  showEngagement = true,
}: {
  settings: SiteSettings;
  className?: string;
  showEngagement?: boolean;
}) {
  return (
    <aside
      className={cn(
        "contact-hero-aside w-full lg:max-w-md lg:justify-self-end xl:max-w-lg",
        className,
      )}
      aria-label="Profile and ventures"
    >
      <ScrollReveal>
        <div className="contact-hero-aside__card overflow-hidden rounded-2xl border border-white/10 bg-bg-elevated/40 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.65)]">
          <div className="relative aspect-[4/5] w-full max-lg:max-h-[28rem] sm:aspect-[5/6] lg:aspect-[4/5] lg:max-h-none">
            <PortfolioImage
              src={assets.about.portrait}
              alt={`${settings.firstName} ${settings.lastName}`}
              objectPosition={PORTRAIT_OBJECT_POSITION}
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 420px"
              priority
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/40 via-35% to-transparent"
              aria-hidden
            />
            {settings.availabilityNote ? (
              <p className="absolute left-4 top-4 max-w-[14rem] rounded-full border border-white/15 bg-bg-primary/80 px-3 py-1.5 text-xs leading-snug text-text-primary backdrop-blur-sm lg:hidden">
                {settings.availabilityNote}
              </p>
            ) : null}
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
              <p className="text-[0.65rem] uppercase tracking-[0.22em] text-text-accent">
                Building at
              </p>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {ventureQuickLinks.map((v) => (
                  <li key={v.label}>
                    <a
                      href={v.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-white/12 bg-bg-primary/60 px-2.5 py-1 text-[0.65rem] text-text-secondary backdrop-blur-sm transition hover:border-text-accent/40 hover:text-text-accent sm:text-xs"
                    >
                      {v.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {showEngagement ? (
            <div className="border-t border-white/10 p-4 sm:p-5 lg:hidden">
              <ContactEngagementLanes />
            </div>
          ) : null}
        </div>
      </ScrollReveal>
    </aside>
  );
}
