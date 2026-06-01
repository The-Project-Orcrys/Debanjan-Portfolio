"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Eyebrow, Lead, SectionHeading } from "@/components/ui/Typography";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { speakingTopics } from "@/lib/data/founder";
import { motionPresets } from "@/lib/motionPresets";

export function SpeakingTopicsSection() {
  return (
    <section
      id="speaking"
      className="relative border-t border-white/10"
      aria-labelledby="speaking-heading"
    >
      <div className="section-ambient pointer-events-none" aria-hidden />

      <div className="section-padding-compact relative z-[1]">
        <ScrollReveal>
          <Eyebrow>Speaking & advisory</Eyebrow>
          <SectionHeading id="speaking-heading">
            Topics for stages, boards, and leadership offsites
          </SectionHeading>
          <Lead>
            Keynotes, workshops, and fireside formats — tailored for founders,
            product teams, universities, and policy forums.
          </Lead>
        </ScrollReveal>

        <motion.ul
          className="mt-10 grid list-none gap-4 p-0 md:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-8%" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {speakingTopics.map((topic) => (
            <motion.li
              key={topic.id}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.55, ease: motionPresets.ease.out },
                },
              }}
            >
              <GlassPanel
                as="article"
                className="group flex h-full flex-col p-6 transition duration-500 hover:-translate-y-1 hover:border-text-accent/30"
              >
                <span className="inline-flex w-fit rounded-full border border-text-accent/30 bg-text-accent/10 px-3 py-1 text-xs uppercase tracking-widest text-text-accent">
                  {topic.format}
                </span>
                <h3 className="text-display mt-4 text-lg">{topic.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">
                  {topic.description}
                </p>
              </GlassPanel>
            </motion.li>
          ))}
        </motion.ul>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/contact?inquiry=Speaking%20%26%20Advisory"
            className="hero-cta-secondary inline-flex"
            data-cursor="pointer"
          >
            Request a speaking brief
          </Link>
          <Link
            href="/resume"
            className="text-sm uppercase tracking-widest text-text-secondary underline-offset-4 transition hover:text-text-accent hover:underline"
            data-cursor="pointer"
          >
            Speaker one-sheet →
          </Link>
        </div>
      </div>
    </section>
  );
}
