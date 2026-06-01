"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLayoutEffect, useRef } from "react";
import { CyclingWord } from "@/components/home/CyclingWord";
import { HeroScrollCue } from "@/components/home/HeroScrollCue";
import { AnimatedHeroBackground } from "@/components/motion/AnimatedHeroBackground";
import { useHeroMouseParallax } from "@/components/motion/useHeroMouseParallax";
import { GeometricShape } from "@/components/shared/GeometricShape";
import { CopyTag } from "@/components/shared/CopyTag";
import { FounderActionLinks } from "@/components/shared/FounderActionLinks";
import { ShareProfileButton } from "@/components/shared/ShareProfileButton";
import { LottiePlayer } from "@/components/shared/LottiePlayer";
import { HERO, ROUTES } from "@/config/site";
import { ventureQuickLinks } from "@/lib/data/products";
import { splitChars } from "@/lib/utils";
import type { ShapeConfig, SiteSettings } from "@/types/content";

function HeroArrow() {
  return (
    <LottiePlayer
      src="/animations/scroll-hint.lottie"
      className="h-6 w-6"
      fallback={
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
      }
    />
  );
}

export function HeroSection({
  settings,
  shapes,
  resumeUrl = null,
  calendarUrl = null,
  shareUrl,
}: {
  settings: SiteSettings;
  shapes: ShapeConfig[];
  resumeUrl?: string | null;
  calendarUrl?: string | null;
  shareUrl: string;
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
      className="relative flex min-h-[100dvh] min-h-[100svh] flex-col overflow-hidden pt-[max(5.5rem,env(safe-area-inset-top))] pb-6 section-padding sm:pt-24 sm:pb-8"
      data-scroll-section
    >
      <AnimatedHeroBackground />

      <div className="hero__shapes pointer-events-none absolute inset-0 z-[1]" aria-hidden>
        {shapes.map((shape) => (
          <GeometricShape key={shape.id} {...shape} />
        ))}
      </div>

      <div ref={contentRef} className="hero-inner relative z-[2] flex min-h-0 flex-1 flex-col">
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="hero-name min-w-0 lg:col-span-7">
            <p className="hero-role-item mb-4 text-xs uppercase tracking-[0.3em] text-text-accent">
              {settings.tagline}
            </p>
            <h1 className="text-display font-normal">
              <span className="hero-name-line">{renderName(settings.firstName)}</span>
              <div className="my-3 flex items-center gap-3 text-sm text-text-secondary md:my-4">
                <HeroArrow />
                <CopyTag value={fullName} />
              </div>
              <span className="hero-name-line">{renderName(settings.lastName)}</span>
            </h1>

            <div className="hero-ctas mt-8 flex flex-col gap-4 md:mt-10">
              <div className="flex flex-wrap items-center gap-3">
                <Link href="/work" className="hero-cta-primary">
                  View work
                  <span aria-hidden>→</span>
                </Link>
                <Link href="/contact" className="hero-cta-secondary">
                  Get in touch
                </Link>
                <Link
                  href={ROUTES.products}
                  className="text-sm uppercase tracking-widest text-text-secondary underline-offset-4 transition hover:text-text-accent hover:underline"
                >
                  Ventures
                </Link>
              </div>
              <FounderActionLinks
                resumeUrl={resumeUrl}
                calendarUrl={calendarUrl}
              />
              <ShareProfileButton
                url={shareUrl}
                title={settings.siteTitle}
                className="mt-1"
              />
            </div>

            <ul className="hero-stats mt-6 border-t border-white/10 pt-5 text-sm sm:mt-8 sm:flex sm:flex-wrap sm:gap-6 sm:pt-6 md:mt-10">
              <li>
                <span className="block text-2xl font-medium tabular-nums text-text-primary">
                  {settings.yearsExperience}+
                </span>
                <span className="text-text-secondary">{HERO.stats.yearsLabel}</span>
              </li>
              <li>
                <span className="block text-2xl font-medium tabular-nums text-text-primary">
                  4
                </span>
                <span className="text-text-secondary">{HERO.stats.venturesLabel}</span>
              </li>
              <li>
                <span className="block text-2xl font-medium text-text-primary">
                  Global
                </span>
                <span className="text-text-secondary">{HERO.stats.reachLabel}</span>
              </li>
            </ul>
          </div>

          <div className="hero-role lg:col-span-5 lg:pb-2">
            <p className="hero-role-item text-h3 font-medium leading-snug">
              {settings.role}
            </p>
            {expertise.length > 0 ? (
              <ul className="hero-role-item mt-5 flex flex-wrap gap-2">
                {expertise.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-text-secondary backdrop-blur-sm transition hover:border-text-accent/30 hover:text-text-primary"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="hero-role-item mt-2 text-text-secondary">
                {settings.roleSecondary}
              </p>
            )}

            <div className="hero-role-item mt-8">
              <p className="text-xs uppercase tracking-widest text-text-secondary">
                Building at
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {ventureQuickLinks.map((v) => (
                  <li key={v.label}>
                    <a
                      href={v.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-text-secondary transition hover:border-text-accent/40 hover:text-text-accent"
                    >
                      {v.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-6 border-t border-white/10 pt-6 sm:mt-10 sm:gap-8 sm:pt-8 md:mt-12 md:flex-row md:items-end md:justify-between md:pt-10 lg:mt-14">
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
