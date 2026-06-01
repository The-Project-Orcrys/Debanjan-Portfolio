"use client";

import Link from "next/link";
import { useTextReveal } from "@/components/motion/useTextReveal";
import { ContactChannel } from "@/components/shared/ContactChannel";
import { LinkedInButton } from "@/components/shared/LinkedInButton";
import { TextSplit } from "@/components/shared/TextSplit";
import { CONTACT, mapsHref, phoneHref } from "@/lib/data/contact";
import type { SiteSettings } from "@/types/content";

interface ContactCTARevealProps {
  settings: SiteSettings;
  headline?: string;
  subtext?: string;
}

export function ContactCTAReveal({
  settings,
  headline = "Let's build something people remember",
  subtext = "from global platforms to early-stage ventures.",
}: ContactCTARevealProps) {
  const ref = useTextReveal(".text-reveal-line", { stagger: 0.1 });
  const linkedIn =
    settings.socialLinks.find((s) => s.url.includes("linkedin.com"))?.url ??
    CONTACT.linkedinUrl;

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="section-padding-tight-bottom border-t border-white/10"
    >
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start lg:gap-16">
        <div>
          <TextSplit
            as="h2"
            text={headline}
            className="text-display text-h1 max-w-3xl"
          />
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-text-secondary">
            {subtext}
          </p>

          <div className="mt-8 flex flex-col gap-5">
            {settings.availabilityNote ? (
              <p className="availability-badge">
                <span
                  className="h-2 w-2 shrink-0 rounded-full bg-text-accent shadow-[0_0_8px_var(--text-accent)]"
                  aria-hidden
                />
                {settings.availabilityNote}
              </p>
            ) : null}

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={`mailto:${settings.email}`}
                className="contact-cta-primary"
              >
                Let&apos;s talk
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </Link>
              <Link href="/contact" className="contact-cta-secondary">
                Send a message
              </Link>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-bg-elevated/80 p-2 shadow-[var(--shadow-card)] backdrop-blur-sm">
          <div className="flex flex-col divide-y divide-white/10">
            <ContactChannel label="Email" href={`mailto:${settings.email}`}>
              {settings.email}
            </ContactChannel>

            {settings.phone ? (
              <ContactChannel
                label="Phone"
                href={phoneHref(settings.phone)}
                external
                openInNewTab={false}
              >
                {settings.phone}
              </ContactChannel>
            ) : null}

            {settings.officeAddress ? (
              <ContactChannel
                label="Office"
                href={mapsHref(settings.officeAddress)}
                external
              >
                {CONTACT.officeShort}
              </ContactChannel>
            ) : null}
          </div>

          <div className="border-t border-white/10 p-4">
            <p className="mb-3 text-xs uppercase tracking-widest text-text-secondary">
              Connect
            </p>
            <LinkedInButton href={linkedIn} className="w-full sm:w-auto" />
          </div>
        </div>
      </div>

      <p className="mt-8 border-t border-white/10 pt-6 text-sm text-text-secondary">
        I typically reply within 1–2 business days. For project details, use the{" "}
        <Link
          href="/contact"
          className="text-text-primary underline underline-offset-4 hover:text-text-accent"
        >
          contact form
        </Link>
        .
      </p>
    </section>
  );
}
