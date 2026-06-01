"use client";

import { useId, useState } from "react";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { contactFaq } from "@/lib/data/founder";
import { cn } from "@/lib/utils";

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
    <div className="border-b border-white/10">
      <h3>
        <button
          id={buttonId}
          type="button"
          className="flex w-full items-center justify-between gap-4 py-5 text-left text-base font-medium text-text-primary transition hover:text-text-accent"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
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
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!open}
        className="pb-5"
      >
        <p className="text-sm leading-relaxed text-text-secondary">{answer}</p>
      </div>
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
        <p className="text-sm uppercase tracking-[0.2em] text-text-accent">
          FAQ
        </p>
        <h2 id="faq-heading" className="text-display mt-4 text-h2">
          Common questions
        </h2>
        <p className="mt-3 max-w-xl text-text-secondary">
          Quick answers before you reach out — engagement types, response time,
          and location.
        </p>
      </ScrollReveal>

      <div className="mt-8 max-w-3xl">
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
      </div>
    </section>
  );
}
