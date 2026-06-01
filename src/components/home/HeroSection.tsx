"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLayoutEffect, useRef } from "react";
import { CyclingWord } from "@/components/home/CyclingWord";
import { HeroStatCounter } from "@/components/home/HeroStatCounter";
import { HeroScrollCue } from "@/components/home/HeroScrollCue";
import { AnimatedHeroBackground } from "@/components/motion/AnimatedHeroBackground";
import { HeroFloatingRings } from "@/components/motion/HeroFloatingRings";
import { HeroSpotlight } from "@/components/motion/HeroSpotlight";
import { useHeroMouseParallax } from "@/components/motion/useHeroMouseParallax";
import { AvailabilityBadge } from "@/components/shared/AvailabilityBadge";
import { GeometricShape } from "@/components/shared/GeometricShape";
import { CopyTag } from "@/components/shared/CopyTag";
import { FounderActionLinks } from "@/components/shared/FounderActionLinks";
import { ShareProfileButton } from "@/components/shared/ShareProfileButton";
import { LottiePlayer } from "@/components/shared/LottiePlayer";
import { HERO, ROUTES } from "@/config/site";
import { ventureQuickLinks } from "@/lib/data/products";
import { splitChars } from "@/lib/utils";
import type { ShapeConfig, SiteSettings } from "@/types/content";

function HeroArrowFallback() {
  return (
    <motion.svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      animate={{ x: [0, 4, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </motion.svg>
  );
}

function HeroArrow({ lottieSrc }: { lottieSrc?: string }) {
  if (!lottieSrc) {
    return <HeroArrowFallback />;
  }
  return (
    <LottiePlayer
      src={lottieSrc}
      className="h-6 w-6"
      fallback={<HeroArrowFallback />}
    />
  );
}

function HeroRoleBlock({
  settings,
  expertise,
}: {
  settings: SiteSettings;
  expertise: string[];
}) {
  return (
    <>
      <p className="hero-role-eyebrow hero-role-item">Executive focus</p>
      <p className="hero-role-item hero-role-title text-h3 font-medium leading-snug text-text-primary">
        {settings.role}
      </p>
      {expertise.length > 0 ? (
        <ul className="hero-role-item mt-4 flex flex-wrap gap-2 sm:mt-5">
          {expertise.map((item) => (
            <li key={item}>
              <span className="hero-role-chip">{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="hero-role-item mt-2 text-text-primary/90">
          {settings.roleSecondary}
        </p>
      )}

      <div className="hero-role-item mt-6 sm:mt-8">
        <p className="hero-role-label">Building at</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {ventureQuickLinks.map((v) => (
            <li key={v.label}>
              <a
                href={v.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-role-venture"
                data-cursor="pointer"
              >
                {v.label} ↗
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export function HeroSection({
  settings,
  shapes,
  resumeUrl = null,
  calendarUrl = null,
  shareUrl,
  scrollHintLottie,
}: {
  settings: SiteSettings;
  shapes: ShapeConfig[];
  resumeUrl?: string | null;
  calendarUrl?: string | null;
  shareUrl: string;
  scrollHintLottie?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useHeroMouseParallax<HTMLDivElement>(0.85);
  const fullName = `${settings.firstName} ${settings.lastName}`;
  const expertise = settings.roleSecondary
    .split("·")
    .map((s) => s.trim())
    .filter(Boolean);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let ctx: { revert: () => void } | undefined;

    void (async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const chars = section.querySelectorAll(".hero-char");
        const roleEls = section.querySelectorAll(".hero-role-item");
        const tagline = section.querySelector(".hero-tagline");
        const ctas = section.querySelector(".hero-ctas");
        const stats = section.querySelector(".hero-stats");

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.fromTo(
          chars,
          { y: 100, opacity: 0, rotateX: -40 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1.05,
            stagger: 0.045,
            transformOrigin: "50% 100%",
          },
        )
          .fromTo(
            roleEls,
            { y: 32, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, stagger: 0.1 },
            "-=0.45",
          )
          .fromTo(
            ctas,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.55 },
            "-=0.35",
          )
          .fromTo(
            stats,
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5 },
            "-=0.3",
          )
          .fromTo(
            tagline,
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.65 },
            "-=0.25",
          );

        gsap.to(section.querySelector(".hero-animated-bg"), {
          y: 60,
          scale: 1.06,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 1.4,
          },
        });

        gsap.to(section.querySelector(".hero-inner"), {
          y: -100,
          opacity: 0.12,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });

        gsap.to(section.querySelector(".hero__shapes"), {
          y: -80,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }, section);
    })();

    return () => ctx?.revert();
  }, []);

  const renderName = (text: string) =>
    splitChars(text).map((char, i) => (
      <span
        key={`${text}-${i}`}
        className="hero-char inline-block will-change-transform"
        style={{ perspective: "600px" }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  return (
    <section
      ref={sectionRef}
      className="hero-section relative flex min-h-[100dvh] min-h-[100svh] flex-col overflow-hidden px-[var(--section-x)] pb-6 sm:pb-8"
      data-scroll-section
      style={
        {
          "--hero-spot-x": "52%",
          "--hero-spot-y": "38%",
        } as React.CSSProperties
      }
    >
      <AnimatedHeroBackground />
      <div className="hero-content-scrim pointer-events-none absolute inset-0 z-[1]" aria-hidden />
      <HeroFloatingRings />
      <HeroSpotlight targetRef={sectionRef} />

      <div className="hero__shapes pointer-events-none absolute inset-0 z-[2]" aria-hidden>
        {shapes.map((shape) => (
          <GeometricShape key={shape.id} {...shape} />
        ))}
      </div>

      <div ref={contentRef} className="hero-inner relative z-[3] flex min-h-0 flex-1 flex-col">
        <div className="flex min-h-0 flex-1 flex-col justify-center py-2 sm:py-4 lg:py-6">
          <div className="grid gap-8 sm:gap-10 lg:grid-cols-12 lg:items-center lg:gap-x-12 xl:gap-x-16">
            <div className="hero-name min-w-0 lg:col-span-7">
              <div className="hero-meta mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-2">
                <p className="hero-role-item text-xs uppercase tracking-[0.3em] text-text-accent">
                  {settings.tagline}
                </p>
                {settings.availabilityNote ? (
                  <AvailabilityBadge
                    note={settings.availabilityNote}
                    className="hero-role-item"
                  />
                ) : null}
              </div>
              <h1 className="hero-name-glow text-display font-normal">
                <span className="hero-name-line">{renderName(settings.firstName)}</span>
                <span className="hero-name-line">{renderName(settings.lastName)}</span>
                <div className="hero-name-actions mt-3 flex items-center gap-3 md:mt-4">
                  <CopyTag value={fullName} />
                  <span className="text-text-secondary" aria-hidden>
                    <HeroArrow lottieSrc={scrollHintLottie} />
                  </span>
                </div>
              </h1>

              <div className="hero-role mt-8 lg:hidden">
                <HeroRoleBlock
                  settings={settings}
                  expertise={expertise}
                />
              </div>

              <div className="hero-ctas mt-8 flex flex-col gap-4 md:mt-10">
                <div className="flex flex-wrap items-center gap-3">
                  <Link href="/work" className="hero-cta-primary" data-cursor="pointer">
                    View work
                    <span aria-hidden>→</span>
                  </Link>
                  <Link href="/contact" className="hero-cta-secondary" data-cursor="pointer">
                    Get in touch
                  </Link>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <Link
                    href={ROUTES.products}
                    className="text-sm uppercase tracking-widest text-text-secondary underline-offset-4 transition hover:text-text-accent hover:underline"
                    data-cursor="pointer"
                  >
                    Ventures
                  </Link>
                  <FounderActionLinks
                    resumeUrl={resumeUrl}
                    calendarUrl={calendarUrl}
                  />
                  <ShareProfileButton
                    url={shareUrl}
                    title={settings.siteTitle}
                  />
                </div>
              </div>

              <ul className="hero-stats mt-10 border-t border-white/10 pt-8 pb-1 text-sm sm:mt-11 sm:pt-9 md:mt-12 md:pt-10">
              <HeroStatCounter
                value={settings.yearsExperience}
                suffix="+"
                label={HERO.stats.yearsLabel}
              />
              <HeroStatCounter value={4} label={HERO.stats.venturesLabel} />
              <HeroStatCounter value="Global" label={HERO.stats.reachLabel} />
              </ul>
            </div>

            <div className="hero-role hidden lg:col-span-5 lg:col-start-8 lg:block lg:self-center">
              <div className="hero-role-panel">
                <HeroRoleBlock settings={settings} expertise={expertise} />
              </div>
            </div>
          </div>
        </div>

        <div className="hero-footer mt-auto flex flex-col gap-5 border-t border-white/10 pt-6 sm:gap-6 sm:pt-8 md:flex-row md:items-end md:justify-between md:pt-10 lg:pt-11">
          <p className="hero-tagline w-full max-w-3xl text-[clamp(1.2rem,4.5vw,2.25rem)] leading-snug text-display">
            <span className="text-text-secondary">
              {settings.yearsExperience} years helping teams{" "}
            </span>
            <CyclingWord words={[...HERO.cycleWords]} />
            <span className="text-text-secondary"> the future</span>
          </p>
          <HeroScrollCue />
        </div>
      </div>
    </section>
  );
}
