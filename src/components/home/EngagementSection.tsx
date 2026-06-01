import Link from "next/link";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { engagementOfferings } from "@/lib/data/founder";

function inquiryHref(type: string) {
  return `/contact?inquiry=${encodeURIComponent(type)}`;
}

export function EngagementSection() {
  return (
    <section
      id="engage"
      className="section-padding-compact border-t border-white/10"
      aria-labelledby="engage-heading"
    >
      <ScrollReveal>
        <p className="text-sm uppercase tracking-[0.2em] text-text-accent">
          Work with me
        </p>
        <h2 id="engage-heading" className="text-display mt-4 max-w-3xl text-h2">
          How we can partner
        </h2>
        <p className="mt-4 max-w-2xl text-text-secondary">
          Product leadership, venture building, and executive advisory — pick the
          lane that matches your mandate.
        </p>
      </ScrollReveal>

      <ul className="mt-10 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {engagementOfferings.map((item, index) => (
          <li key={item.id}>
            <ScrollReveal delay={index * 0.06}>
              <article className="flex h-full flex-col rounded-[var(--radius-card)] border border-white/10 bg-bg-elevated/30 p-6 transition hover:border-text-accent/30">
                <h3 className="text-display text-xl">{item.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary">
                  {item.description}
                </p>
                <ul className="mt-5 space-y-2 border-t border-white/10 pt-4 text-sm text-text-secondary">
                  {item.highlights.map((h) => (
                    <li key={h} className="flex gap-2">
                      <span className="text-text-accent" aria-hidden>
                        —
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>
                <Link
                  href={inquiryHref(item.inquiryType)}
                  className="hero-cta-secondary mt-6 w-full justify-center sm:w-auto"
                >
                  Start a conversation
                </Link>
              </article>
            </ScrollReveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
