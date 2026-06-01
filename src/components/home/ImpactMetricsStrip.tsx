"use client";

import { useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MetricCounter } from "@/components/shared/MetricCounter";
import { impactMetrics } from "@/lib/data/founder";
import { motionPresets } from "@/lib/motionPresets";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { y: 10 },
  visible: {
    y: 0,
    transition: { duration: 0.45, ease: motionPresets.ease.out },
  },
};

export function ImpactMetricsStrip() {
  const sectionRef = useRef<HTMLElement>(null);

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
        gsap.from(section.querySelector(".impact-metrics__divider"), {
          scaleX: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 90%",
            once: true,
          },
        });
      }, section);
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative border-y border-white/10 bg-white/[0.02]"
      aria-label="Impact at a glance"
    >
      <div
        className="impact-metrics__divider mx-auto h-px max-w-6xl origin-left bg-gradient-to-r from-transparent via-text-accent/40 to-transparent"
        aria-hidden
      />
      <motion.ul
        className="impact-metrics__grid mx-auto max-w-6xl list-none p-0"
        variants={container}
        initial="visible"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {impactMetrics.map((metric) => (
          <motion.li
            key={metric.label}
            variants={item}
            className="impact-metrics__cell"
          >
            <MetricCounter
              value={metric.value}
              className="impact-metrics__value text-display block tabular-nums"
            />
            <span className="impact-metrics__label">{metric.label}</span>
            <span className="impact-metrics__detail">{metric.detail}</span>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
