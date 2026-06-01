"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { leadershipTimeline } from "@/lib/data/founder";
import { cn } from "@/lib/utils";

export function LeadershipTimeline() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = section.querySelectorAll(".timeline-list__item");
    const spine = section.querySelector(".timeline-list__spine");
    const glow = section.querySelector(".timeline-list__glow");
    const headerBits = section.querySelectorAll(".timeline-list__header > *");

    let ctx: { revert: () => void } | undefined;

    void (async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        if (reduced) {
          gsap.set([headerBits, glow, ...items], {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotateX: 0,
            clearProps: "filter",
          });
          if (spine) gsap.set(spine, { opacity: 1, scaleY: 1 });
          return;
        }

        gsap.set(headerBits, { opacity: 0, y: 48, filter: "blur(8px)" });
        if (glow) gsap.set(glow, { opacity: 0 });
        items.forEach((item) => {
          const marker = item.querySelector(".timeline-list__marker-core");
          const content = item.querySelector(".timeline-list__content");
          const period = item.querySelector(".timeline-list__period");
          const title = item.querySelector(".timeline-list__title");
          const desc = item.querySelector(".timeline-list__desc");
          if (marker) gsap.set(marker, { scale: 0, opacity: 0 });
          if (content) gsap.set(content, { x: -56, opacity: 0, rotateX: -18 });
          if (period) gsap.set(period, { y: 16, opacity: 0 });
          if (title) gsap.set(title, { y: 24, opacity: 0 });
          if (desc) gsap.set(desc, { y: 20, opacity: 0 });
        });
        gsap.fromTo(
          headerBits,
          { y: 48, opacity: 0, filter: "blur(8px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section.querySelector(".timeline-list__header"),
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          },
        );

        if (glow) {
          gsap.fromTo(
            glow,
            { y: 80, opacity: 0, scale: 0.85 },
            {
              y: -120,
              opacity: 0.55,
              scale: 1.1,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.6,
              },
            },
          );
        }

        items.forEach((item, index) => {
          const marker = item.querySelector(".timeline-list__marker-core");
          const content = item.querySelector(".timeline-list__content");
          const period = item.querySelector(".timeline-list__period");
          const title = item.querySelector(".timeline-list__title");
          const desc = item.querySelector(".timeline-list__desc");

          const enter = gsap.timeline({
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              end: "top 52%",
              scrub: 1.1,
            },
          });

          if (marker) {
            enter.fromTo(
              marker,
              {
                scale: 0,
                opacity: 0,
                boxShadow: "0 0 0 0 rgba(200, 184, 255, 0)",
              },
              {
                scale: 1,
                opacity: 1,
                boxShadow:
                  index === 0
                    ? "0 0 0 4px rgba(200, 184, 255, 0.25), 0 0 18px rgba(200, 184, 255, 0.55)"
                    : "0 0 0 3px rgba(200, 184, 255, 0.2), 0 0 14px rgba(200, 184, 255, 0.45)",
                ease: "back.out(2.2)",
              },
              0,
            );
          }

          if (content) {
            enter.fromTo(
              content,
              {
                x: -56,
                opacity: 0,
                rotateX: -18,
                transformPerspective: 800,
                transformOrigin: "0% 50%",
              },
              {
                x: 0,
                opacity: 1,
                rotateX: 0,
                ease: "power3.out",
              },
              0.05,
            );
          }

          if (period) {
            enter.fromTo(
              period,
              { y: 16, opacity: 0, letterSpacing: "0.35em" },
              { y: 0, opacity: 1, letterSpacing: "0.18em", ease: "power2.out" },
              0.12,
            );
          }

          if (title) {
            enter.fromTo(
              title,
              { y: 24, opacity: 0 },
              { y: 0, opacity: 1, ease: "power3.out" },
              0.18,
            );
          }

          if (desc) {
            enter.fromTo(
              desc,
              { y: 20, opacity: 0 },
              { y: 0, opacity: 1, ease: "power2.out" },
              0.26,
            );
          }

          gsap.to(item, {
            y: -12 * (1 - index * 0.08),
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.4,
            },
          });

          ScrollTrigger.create({
            trigger: item,
            start: "top 60%",
            end: "bottom 40%",
            onToggle: (self) => {
              item.classList.toggle("timeline-list__item--active", self.isActive);
            },
          });
        });
      }, section);
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="timeline-section relative overflow-hidden border-t border-white/10"
      aria-labelledby="timeline-heading"
    >
      <div
        className="timeline-list__glow pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(26,58,255,0.2),transparent_70%)] opacity-0"
        aria-hidden
      />

      <div className="section-padding-compact relative z-[1]">
        <div className="timeline-list__header">
          <p className="text-sm uppercase tracking-[0.2em] text-text-accent">
            Career
          </p>
          <h2 id="timeline-heading" className="text-display mt-4 max-w-2xl text-h2">
            Leadership timeline
          </h2>
          <p className="mt-4 max-w-xl text-[#c4c0b8]">
            Roles across product, security, and venture building — from studio to
            scale.
          </p>
        </div>

        <div className="timeline-list__track relative mt-8 md:mt-10">
          <span className="timeline-list__spine" aria-hidden />

          <ol className="timeline-list relative max-w-3xl list-none p-0">
            {leadershipTimeline.map((entry, index) => (
              <li
                key={entry.id}
                className={cn(
                  "timeline-list__item relative pl-8 sm:pl-9",
                  index < leadershipTimeline.length - 1 && "pb-7 md:pb-8",
                )}
              >
                <span className="timeline-list__marker" aria-hidden>
                  <span className="timeline-list__marker-core" />
                </span>

                <div className="timeline-list__content will-change-transform">
                  <p className="timeline-list__period text-xs font-medium uppercase tracking-[0.18em] text-[#d8ccff]">
                    {entry.period}
                  </p>
                  <h3 className="timeline-list__title mt-1.5 text-display text-lg leading-snug text-text-primary sm:text-xl">
                    {entry.href ? (
                      <Link
                        href={entry.href}
                        className="underline-offset-4 transition hover:text-text-accent hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {entry.title}
                      </Link>
                    ) : (
                      entry.title
                    )}
                    <span className="font-normal text-[#b8b4ac]">
                      {" "}
                      · {entry.org}
                    </span>
                  </h3>
                  <p className="timeline-list__desc mt-2 max-w-2xl text-sm leading-relaxed text-[#c8c4bc]">
                    {entry.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
