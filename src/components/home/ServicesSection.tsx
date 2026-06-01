"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ServiceListItem } from "@/components/home/ServiceListItem";
import { ServicePreviewPanel } from "@/components/home/ServicePreviewPanel";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SECTION_COPY } from "@/config/site";
import type { ServiceBlock } from "@/types/content";
import { motionPresets } from "@/lib/motionPresets";

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const rowVariants = {
  hidden: { opacity: 0, x: -28 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: motionPresets.ease.out },
  },
};

const IDLE_MS = 6000;

export function ServicesSection({ services }: { services: ServiceBlock[] }) {
  const sorted = [...services].sort((a, b) => a.order - b.order);
  const [activeTab, setActiveTab] = useState(0);
  const [paused, setPaused] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const activeService = sorted[activeTab] ?? sorted[0];

  const activate = useCallback((index: number) => {
    setActiveTab(index);
    setPaused(true);
  }, []);

  useEffect(() => {
    if (paused || sorted.length <= 1) return;
    const id = window.setInterval(() => {
      setActiveTab((i) => (i + 1) % sorted.length);
    }, IDLE_MS);
    return () => window.clearInterval(id);
  }, [paused, sorted.length]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (!list.contains(document.activeElement)) return;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        setActiveTab((i) => Math.min(i + 1, sorted.length - 1));
        setPaused(true);
      }
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        setActiveTab((i) => Math.max(i - 1, 0));
        setPaused(true);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [sorted.length]);

  if (!activeService) return null;

  return (
    <section
      id="services"
      className="services-section relative border-t border-white/10"
      aria-labelledby="services-heading"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
    >
      <div className="services-section__ambient pointer-events-none" aria-hidden />

      <div className="section-padding relative z-[1]">
        <ScrollReveal>
          <p className="text-sm uppercase tracking-[0.2em] text-text-accent">
            {SECTION_COPY.services.eyebrow}
          </p>
          <h2 id="services-heading" className="text-display mt-4 max-w-3xl text-h2">
            {SECTION_COPY.services.title}
          </h2>
        </ScrollReveal>

        <div className="services-section__grid mt-10 lg:mt-12">
          <motion.ul
            ref={listRef}
            className="services-section__list list-none p-0 m-0 min-w-0"
            variants={listVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-8%" }}
            role="tablist"
            aria-label="Services"
          >
            {sorted.map((service, index) => (
              <motion.li key={service._id} variants={rowVariants} className="list-none">
                <ServiceListItem
                  service={service}
                  index={index}
                  active={activeTab === index}
                  onActivate={() => activate(index)}
                />

                <div className="md:hidden">
                  {activeTab === index ? (
                    <div className="mt-4 mb-2">
                      <ServicePreviewPanel service={service} index={index} />
                    </div>
                  ) : null}
                </div>
              </motion.li>
            ))}
          </motion.ul>

          <aside
            className="services-section__preview hidden md:block"
            aria-label="Service preview"
          >
            <div className="services-section__preview-sticky">
              <ServicePreviewPanel
                service={activeService}
                index={activeTab}
              />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
