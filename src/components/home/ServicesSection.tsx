"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ServiceListItem } from "@/components/home/ServiceListItem";
import { ServicePreviewPanel } from "@/components/home/ServicePreviewPanel";
import { ServiceTab } from "@/components/home/ServiceTab";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SECTION_COPY } from "@/config/site";
import type { ServiceBlock } from "@/types/content";

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
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function ServicesSection({ services }: { services: ServiceBlock[] }) {
  const sorted = [...services].sort((a, b) => a.order - b.order);
  const [activeTab, setActiveTab] = useState(0);
  const activeService = sorted[activeTab] ?? sorted[0];

  if (!activeService) return null;

  return (
    <section className="services-section relative overflow-hidden border-t border-white/10">
      <div className="services-section__ambient" aria-hidden />

      <div className="section-padding relative z-[1]">
        <ScrollReveal>
          <p className="text-sm uppercase tracking-[0.2em] text-text-accent">
            {SECTION_COPY.services.eyebrow}
          </p>
          <h2 className="text-display mt-4 max-w-3xl text-h2">
            {SECTION_COPY.services.title}
          </h2>
        </ScrollReveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16 xl:gap-20">
          <motion.ul
            className="list-none p-0 m-0"
            variants={listVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-8%" }}
          >
            {sorted.map((service, index) => (
              <motion.li key={service._id} variants={rowVariants} className="list-none">
                <ServiceListItem
                  service={service}
                  index={index}
                  active={activeTab === index}
                  onActivate={() => setActiveTab(index)}
                />

                <div className="lg:hidden">
                  {activeTab === index && (
                    <ServiceTab active mediaItems={service.mediaItems} />
                  )}
                </div>
              </motion.li>
            ))}
          </motion.ul>

          <div className="hidden lg:block">
            <div className="sticky top-28">
              <ServicePreviewPanel
                service={activeService}
                index={activeTab}
              />
              <ServiceTab
                active
                mediaItems={activeService.mediaItems}
                className="mt-6"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
