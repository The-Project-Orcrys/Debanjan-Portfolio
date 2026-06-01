"use client";

import { useLayoutEffect, useRef } from "react";
import { PortfolioImage } from "@/components/shared/PortfolioImage";
import { assets } from "@/lib/data/assets";
import { PORTRAIT_OBJECT_POSITION } from "@/lib/images";

const lines = [
  "Bold products",
  "take focus",
  "and working with me accelerates them",
] as const;

export function AboutTeaser({ photoUrl }: { photoUrl: string }) {
  const portraitSrc = photoUrl?.trim() || assets.about.portrait;
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lineEls = section.querySelectorAll(".about-teaser__line");
    const lineMasks = section.querySelectorAll(".about-teaser__line-mask");
    const copyEl = section.querySelector(".about-teaser__copy");
    const photoWrap = section.querySelector(".about-teaser__photo-wrap");
    const photoEl = section.querySelector(".about-teaser__photo");
    const photoImg = section.querySelector(".about-teaser__photo-img");
    const glowA = section.querySelector(".about-teaser__glow--a");
    const glowB = section.querySelector(".about-teaser__glow--b");
    const accent = section.querySelector(".about-teaser__accent");

    let ctx: { revert: () => void } | undefined;

    void (async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        if (reduced) {
          gsap.set(
            [copyEl, photoWrap, photoEl, photoImg, glowA, glowB, accent, ...lineEls],
            { clearProps: "all", opacity: 1 },
          );
          return;
        }

        gsap.set(lineEls, {
          yPercent: 115,
          rotateX: -72,
          opacity: 0,
          transformOrigin: "50% 100%",
        });
        if (accent) gsap.set(accent, { scaleX: 0, opacity: 0 });
        if (photoImg) gsap.set(photoImg, { scale: 1.06 });
        if (glowA) gsap.set(glowA, { opacity: 0, x: -40 });
        if (glowB) gsap.set(glowB, { opacity: 0, x: 40 });

        if (accent) {
          gsap.to(accent, {
            scaleX: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              end: "top 55%",
              scrub: 1.2,
            },
          });
        }

        lineMasks.forEach((mask, index) => {
          const line = mask.querySelector(".about-teaser__line");
          if (!line) return;

          gsap.fromTo(
            line,
            {
              yPercent: 115,
              rotateX: -72,
              opacity: 0,
            },
            {
              yPercent: 0,
              rotateX: 0,
              opacity: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: mask,
                start: "top 92%",
                end: "top 56%",
                scrub: 1.15,
              },
            },
          );

          gsap.to(line, {
            y: -22 - index * 6,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.6 + index * 0.15,
            },
          });
        });

        if (photoWrap) {
          gsap.to(photoWrap, {
            y: -48,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          });

          if (photoImg) {
            gsap.to(photoImg, {
              scale: 1.08,
              y: -12,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.8,
              },
            });
          }
        }

        if (copyEl) {
          gsap.to(copyEl, {
            y: 36,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.4,
            },
          });
        }

        if (glowA && glowB) {
          gsap.to(glowA, {
            opacity: 0.5,
            x: 60,
            y: -80,
            scale: 1.15,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.7,
            },
          });
          gsap.to(glowB, {
            opacity: 0.45,
            x: -50,
            y: 100,
            scale: 1.2,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 2,
            },
          });
        }

        ScrollTrigger.refresh();
      }, section);
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about-teaser"
      className="about-teaser relative overflow-hidden border-t border-white/10"
    >
      <div
        className="about-teaser__glow about-teaser__glow--a pointer-events-none absolute -left-20 top-1/4 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(200,184,255,0.22),transparent_70%)]"
        aria-hidden
      />
      <div
        className="about-teaser__glow about-teaser__glow--b pointer-events-none absolute -right-16 bottom-1/4 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(26,58,255,0.25),transparent_70%)]"
        aria-hidden
      />

      <div className="section-padding-compact relative z-[1] !pb-8 md:!pb-10">
        <div className="about-teaser__grid grid items-start gap-8 lg:grid-cols-2 lg:items-center lg:gap-14">
          <div className="about-teaser__copy space-y-2 md:space-y-3 [perspective:1000px]">
            <span
              className="about-teaser__accent mb-2 block h-px w-16 origin-left bg-gradient-to-r from-text-accent to-transparent"
              aria-hidden
            />
            {lines.map((line) => (
              <div
                key={line}
                className="about-teaser__line-mask overflow-hidden [transform-style:preserve-3d]"
              >
                <p className="about-teaser__line text-display text-h1 leading-[1.05] will-change-transform">
                  {line}
                </p>
              </div>
            ))}
          </div>

          <div className="about-teaser__photo-wrap w-full will-change-transform lg:justify-self-end">
            <div className="about-teaser__photo relative mx-auto aspect-[3/4] w-full max-w-[240px] overflow-hidden rounded-[var(--radius-card)] border border-white/15 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.7),0_0_48px_rgba(200,184,255,0.12)] will-change-transform sm:max-w-[260px] md:max-w-xs lg:mx-0 lg:max-w-[280px] xl:max-w-[300px]">
              <PortfolioImage
                src={portraitSrc}
                alt="Debanjan Sandhaki — professional portrait"
                objectPosition={PORTRAIT_OBJECT_POSITION}
                className="about-teaser__photo-img object-cover will-change-transform"
                sizes="(max-width: 1024px) min(85vw, 260px), 300px"
                priority
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-primary/50 via-transparent to-transparent"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
