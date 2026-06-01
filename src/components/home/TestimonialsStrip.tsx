import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { executiveQuotes } from "@/lib/data/founder";

export function TestimonialsStrip() {
  return (
    <section
      className="section-padding-compact border-t border-white/10"
      aria-label="What collaborators say"
    >
      <ScrollReveal>
        <p className="text-sm uppercase tracking-[0.2em] text-text-accent">
          Trusted by builders
        </p>
      </ScrollReveal>

      <ul className="mt-8 grid list-none gap-6 p-0 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
        {executiveQuotes.map((item) => (
          <li key={item.id}>
            <ScrollReveal>
              <blockquote className="rounded-[var(--radius-card)] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
                <p className="text-lg leading-relaxed text-text-primary md:text-xl">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <footer className="mt-4 text-sm text-text-secondary">
                  <span className="block text-text-primary">— {item.attribution}</span>
                  {"context" in item && item.context ? (
                    <span className="mt-1 block text-xs uppercase tracking-widest">
                      {item.context}
                    </span>
                  ) : null}
                </footer>
              </blockquote>
            </ScrollReveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
