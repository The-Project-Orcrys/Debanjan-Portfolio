import type { ReactNode } from "react";
import Link from "next/link";
import { FooterBackground } from "@/components/layout/FooterBackground";
import { FooterLogoMark } from "@/components/layout/FooterLogoMark";
import { resolveOptionalMedia } from "@/lib/site/optional-media.server";
import { FOOTER_EXPLORE_LINKS } from "@/config/site";
import { ContactLinks } from "@/components/shared/ContactLinks";
import { LocalTime } from "@/components/shared/LocalTime";
import { FounderActionTextLinksServer } from "@/components/shared/FounderActionLinksServer";
import type { SiteSettings } from "@/types/content";

function FooterColumn({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="footer__label text-xs uppercase tracking-widest">{label}</p>
      <div className="mt-2.5">{children}</div>
    </div>
  );
}

export function Footer({ settings }: { settings: SiteSettings }) {
  const year = new Date().getFullYear();
  const optionalMedia = resolveOptionalMedia();
  const videoSrc = settings.footerVideoUrl ?? optionalMedia.footerVideo;

  return (
    <footer className="site-footer relative overflow-hidden border-t border-white/10">
      <FooterBackground videoSrc={videoSrc} />

      <div className="site-footer__main relative px-[var(--section-x)] py-8 md:py-10">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:gap-x-8 lg:grid-cols-4 lg:gap-x-10 lg:gap-y-6">
          <FooterColumn label="Explore">
            <ul className="flex flex-col gap-1.5 text-sm">
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
            <div className="mt-3 border-t border-white/10 pt-3">
              <FounderActionTextLinksServer className="gap-1.5" />
            </div>
          </FooterColumn>

          <FooterColumn label="Built with">
            <ul className="grid grid-cols-1 gap-x-4 gap-y-1.5 text-sm text-[#c4c0b8] min-[480px]:grid-cols-2">
              {settings.stackItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn label="Contact">
            <ContactLinks
              settings={settings}
              variant="compact"
              showAddress
            />
          </FooterColumn>

          <FooterColumn label="Studio" className="col-span-2 lg:col-span-1">
            <p className="text-sm text-text-primary">{settings.studioName}</p>
            <p className="mt-1 text-sm text-[#d8ccff]">[{settings.studioNote}]</p>
          </FooterColumn>
        </div>

        <div className="mt-8 flex flex-wrap items-end justify-center gap-2 border-t border-white/10 pt-6 sm:mt-7 sm:justify-start sm:gap-3 md:gap-4">
          <span className="text-display text-[clamp(1.75rem,10vw,5.5rem)] leading-none">
            {settings.firstName}
          </span>
          <FooterLogoMark className="shrink-0" />
          <span className="text-display text-[clamp(1.75rem,10vw,5.5rem)] leading-none">
            {settings.lastName}
          </span>
        </div>
      </div>

      <div className="site-footer__bar relative border-t border-white/10 px-[var(--section-x)] py-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[#b0b0b0]">
            <span className="text-text-primary">{settings.role}</span>
            <span className="mx-2 text-white/20" aria-hidden>
              ·
            </span>
            <span className="tabular-nums">{year}</span>
          </p>
          <div className="flex flex-col gap-0.5 text-xs text-[#a8a8a8] sm:items-end">
            <LocalTime />
            <span>
              {settings.firstName} {settings.lastName} · Portfolio
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
