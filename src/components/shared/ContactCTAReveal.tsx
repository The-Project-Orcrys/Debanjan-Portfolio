"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { GlassPanel } from "@/components/ui/GlassPanel";
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
  const channelsRef = useRef<HTMLDivElement>(null);
  const linkedIn =
    settings.socialLinks.find((s) => s.url.includes("linkedin.com"))?.url ??
    CONTACT.linkedinUrl;

  useLayoutEffect(() => {
    const el = channelsRef.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let ctx: { revert: () => void } | undefined;
    void (async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.from(el.querySelectorAll(".contact-channel-reveal"), {
          opacity: 0,
          y: 16,
          duration: 0.55,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        });
      }, el);
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <section
      id="contact-cta"
      ref={ref as React.RefObject<HTMLElement>}
      className="contact-cta relative section-padding-tight-bottom border-t border-white/10"
    >
      <div
        className="contact-cta__spotlight pointer-events-none absolute inset-0 opacity-60"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 20% 30%, rgba(26, 58, 255, 0.14), transparent 70%), radial-gradient(ellipse 40% 35% at 80% 60%, rgba(200, 184, 255, 0.08), transparent 65%)",
        }}
      />
      <div className="ambient-noise pointer-events-none" aria-hidden />

      <div className="relative z-[1] grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start lg:gap-16">
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
                data-cursor="pointer"
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
              <Link href="/contact" className="contact-cta-secondary" data-cursor="pointer">
                Send a message
              </Link>
            </div>
          </div>
        </div>

        <div ref={channelsRef}>
          <GlassPanel strong bordered className="p-2">
            <div className="flex flex-col divide-y divide-white/10">
              <div className="contact-channel-reveal">
                <ContactChannel label="Email" href={`mailto:${settings.email}`}>
                  {settings.email}
                </ContactChannel>
              </div>

              {settings.phone ? (
                <div className="contact-channel-reveal">
                  <ContactChannel
                    label="Phone"
                    href={phoneHref(settings.phone)}
                    external
                    openInNewTab={false}
                  >
                    {settings.phone}
                  </ContactChannel>
                </div>
              ) : null}

              {settings.officeAddress ? (
                <div className="contact-channel-reveal">
                  <ContactChannel
                    label="Office"
                    href={mapsHref(settings.officeAddress)}
                    external
                  >
                    {CONTACT.officeShort}
                  </ContactChannel>
                </div>
              ) : null}
            </div>

            <div className="contact-channel-reveal border-t border-white/10 p-4">
              <p className="mb-3 text-xs uppercase tracking-widest text-text-secondary">
                Connect
              </p>
              <LinkedInButton href={linkedIn} className="w-full sm:w-auto" />
            </div>
          </GlassPanel>
        </div>
      </div>

      <p className="relative z-[1] mt-8 border-t border-white/10 pt-6 text-sm text-text-secondary">
        I typically reply within 1–2 business days. For project details, use the{" "}
        <Link
          href="/contact"
          className="text-text-primary underline underline-offset-4 hover:text-text-accent"
          data-cursor="pointer"
        >
          contact form
        </Link>
        .
      </p>
    </section>
  );
}
