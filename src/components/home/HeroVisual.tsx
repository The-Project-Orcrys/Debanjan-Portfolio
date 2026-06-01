"use client";

import { PortfolioImage } from "@/components/shared/PortfolioImage";
import { assets, ventureQuickLinks } from "@/lib/data";
import { PORTRAIT_OBJECT_POSITION } from "@/lib/images";
import type { SiteSettings } from "@/types/content";

export function HeroVisual({
  settings,
  expertise,
}: {
  settings: SiteSettings;
  expertise: string[];
  fullName: string;
}) {
  return (
    <div className="hero-visual relative w-full max-w-md justify-self-center lg:max-w-none lg:justify-self-end">
      <div className="relative">
        <div className="hero-visual__media relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/10">
          <PortfolioImage
            src={assets.about.portrait}
            alt={`${settings.firstName} ${settings.lastName} — professional portrait`}
            objectPosition={PORTRAIT_OBJECT_POSITION}
            className="object-cover"
            sizes="(max-width: 1024px) 90vw, 420px"
            priority
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-primary/55 via-transparent to-transparent"
            aria-hidden
          />
        </div>

        <div className="hero-visual__panel-inner hero-role-panel absolute inset-x-4 bottom-4 z-[2] sm:inset-x-5 sm:bottom-5">
          <p className="hero-role-title text-h3 font-medium leading-snug text-text-primary">
            {settings.role}
          </p>

          {expertise.length > 0 ? (
            <ul className="mt-4 flex flex-wrap gap-2">
              {expertise.map((item) => (
                <li key={item}>
                  <span className="hero-role-chip">{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-text-primary/90">{settings.roleSecondary}</p>
          )}

          <div className="mt-6">
            <p className="hero-role-label">Building at</p>
            <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-2">
              {ventureQuickLinks.map((v) => (
                <li key={v.label}>
                  <a
                    href={v.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-role-venture hero-role-venture--inline"
                  >
                    {v.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
