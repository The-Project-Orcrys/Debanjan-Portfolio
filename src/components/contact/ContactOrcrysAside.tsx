import Link from "next/link";
import type { SiteSettings } from "@/types/content";

export function ContactOrcrysAside({
  settings,
  calendarUrl,
}: {
  settings: SiteSettings;
  calendarUrl: string | null;
}) {
  return (
    <div className="flex h-full flex-col rounded-[var(--radius-card)] border border-white/10 bg-bg-primary/40 p-6">
      <p className="text-xs uppercase tracking-widest text-text-accent">
        {settings.studioName}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-text-secondary">
        {settings.studioNote ?? "Building intelligent ventures across product, security, and growth."}
      </p>

      <div className="mt-auto space-y-3 pt-8">
        {calendarUrl ? (
          <a
            href={calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cta-primary inline-flex w-full justify-center sm:w-auto"
            data-cursor="pointer"
          >
            Schedule a call
          </a>
        ) : null}
        <Link
          href="/#engage"
          className="hero-cta-secondary inline-flex w-full justify-center sm:w-auto"
          data-cursor="pointer"
        >
          View engagement options
        </Link>
      </div>
    </div>
  );
}
