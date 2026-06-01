import Link from "next/link";
import { FooterBackground } from "@/components/layout/FooterBackground";
import { FooterLogoMark } from "@/components/layout/FooterLogoMark";
import { FOOTER_EXPLORE_LINKS } from "@/config/site";
import { ContactLinks } from "@/components/shared/ContactLinks";
import { FounderActionTextLinksServer } from "@/components/shared/FounderActionLinksServer";
import type { SiteSettings } from "@/types/content";

export function Footer({ settings }: { settings: SiteSettings }) {
  const year = new Date().getFullYear();
  const videoSrc =
    settings.footerVideoUrl ?? "/videos/footer-texture.mp4";

  return (
    <footer className="relative overflow-hidden border-t border-white/10">
      <FooterBackground videoSrc={videoSrc} />

      <div className="section-padding-compact relative">
        <div className="grid gap-10 md:grid-cols-2 md:gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-3">
            <p className="text-xs uppercase tracking-widest text-text-secondary">
              Explore
            </p>
            <ul className="mt-3 flex flex-col gap-2 text-sm">
              {FOOTER_EXPLORE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-primary underline-offset-4 hover:text-text-accent hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-5">
              <FounderActionTextLinksServer />
            </div>
          </div>

          <div className="lg:col-span-4">
            <p className="text-xs uppercase tracking-widest text-text-secondary">
              Built with
            </p>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-text-secondary">
              {settings.stackItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="text-xs uppercase tracking-widest text-text-secondary">
              Contact
            </p>
            <div className="mt-3">
              <ContactLinks
                settings={settings}
                variant="compact"
                showAddress
              />
            </div>
          </div>

          <div className="lg:col-span-3 lg:text-right">
            <p className="text-xs uppercase tracking-widest text-text-secondary">
              Studio
            </p>
            <p className="mt-3 text-sm text-text-primary">{settings.studioName}</p>
            <p className="mt-1 text-sm text-text-accent">[{settings.studioNote}]</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-6 border-t border-white/10 pt-6 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:pt-8">
          <div className="flex min-w-0 w-full flex-wrap items-end justify-center gap-2 sm:flex-1 sm:justify-start sm:gap-3 md:gap-5">
            <span className="text-display text-[clamp(1.75rem,10vw,5.5rem)] leading-none">
              {settings.firstName}
            </span>
            <FooterLogoMark className="shrink-0" />
            <span className="text-display text-[clamp(1.75rem,10vw,5.5rem)] leading-none">
              {settings.lastName}
            </span>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10 px-[var(--section-x)] py-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-text-secondary">
            <span className="text-text-primary">{settings.role}</span>
            <span className="mx-2 text-white/20" aria-hidden>
              ·
            </span>
            <span className="tabular-nums">{year}</span>
          </p>
          <p className="text-xs text-text-secondary">
            {settings.firstName} {settings.lastName} · Portfolio
          </p>
        </div>
      </div>
    </footer>
  );
}
