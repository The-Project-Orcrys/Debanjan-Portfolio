import Link from "next/link";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { speakingTopics } from "@/lib/data/founder";

export function SpeakingTopicsSection() {
  return (
    <section
      id="speaking"
      className="section-padding-compact border-t border-white/10"
      aria-labelledby="speaking-heading"
    >
      <ScrollReveal>
        <p className="text-sm uppercase tracking-[0.2em] text-text-accent">
          Speaking & advisory
        </p>
        <h2 id="speaking-heading" className="text-display mt-4 max-w-3xl text-h2">
          Topics for stages, boards, and leadership offsites
        </h2>
        <p className="mt-4 max-w-2xl text-text-secondary">
          Keynotes, workshops, and fireside formats — tailored for founders,
          product teams, universities, and policy forums.
        </p>
      </ScrollReveal>

      <ul className="mt-10 grid list-none gap-4 p-0 md:grid-cols-2">
        {speakingTopics.map((topic) => (
          <li key={topic.id}>
            <ScrollReveal>
              <article className="flex h-full flex-col rounded-[var(--radius-card)] border border-white/10 bg-white/[0.03] p-6 transition hover:border-text-accent/25">
                <span className="text-xs uppercase tracking-widest text-text-accent">
                  {topic.format}
                </span>
                <h3 className="text-display mt-3 text-lg">{topic.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">
                  {topic.description}
                </p>
              </article>
            </ScrollReveal>
          </li>
        ))}
      </ul>

      <Link
        href="/contact?inquiry=Speaking%20%26%20Advisory"
        className="hero-cta-secondary mt-10 inline-flex"
      >
        Request a speaking brief
      </Link>
    </section>
  );
}
