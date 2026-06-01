"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useState } from "react";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Eyebrow, SectionHeading } from "@/components/ui/Typography";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { contactFaq } from "@/lib/data/founder";
import { cn } from "@/lib/utils";
import { motionPresets } from "@/lib/motionPresets";

function FaqItem({
  question,
  answer,
  open,
  onToggle,
}: {
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
}) {
  const panelId = useId();
  const buttonId = useId();

  return (
    <div className="border-b border-white/10 last:border-b-0">
      <h3>
        <button
          id={buttonId}
          type="button"
          className="flex w-full items-center justify-between gap-4 py-5 text-left text-base font-medium text-text-primary transition hover:text-text-accent"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          data-cursor="pointer"
        >
          {question}
          <span
            className={cn(
              "shrink-0 text-xl text-text-accent transition-transform duration-200",
              open && "rotate-45",
            )}
            aria-hidden
          >
            +
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: motionPresets.ease.out }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-text-secondary">
              {answer}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(contactFaq[0]?.id ?? null);

  return (
    <section
      className="section-padding-compact border-t border-white/10"
      aria-labelledby="faq-heading"
    >
      <ScrollReveal>
        <Eyebrow>FAQ</Eyebrow>
        <SectionHeading id="faq-heading">Common questions</SectionHeading>
        <p className="mt-3 max-w-xl text-text-secondary">
          Quick answers before you reach out — engagement types, response time,
          and location.
        </p>
      </ScrollReveal>

      <GlassPanel bordered className="mt-8 max-w-3xl px-6 sm:px-8">
        {contactFaq.map((item) => (
          <FaqItem
            key={item.id}
            question={item.question}
            answer={item.answer}
            open={openId === item.id}
            onToggle={() =>
              setOpenId((prev) => (prev === item.id ? null : item.id))
            }
          />
        ))}
      </GlassPanel>
    </section>
  );
}
