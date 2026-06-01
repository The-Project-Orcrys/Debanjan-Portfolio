import Link from "next/link";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { leadershipTimeline } from "@/lib/data/founder";

export function LeadershipTimeline() {
  return (
    <section
      id="timeline"
      className="section-padding-compact border-t border-white/10"
      aria-labelledby="timeline-heading"
    >
      <ScrollReveal>
        <p className="text-sm uppercase tracking-[0.2em] text-text-accent">
          Career
        </p>
        <h2 id="timeline-heading" className="text-display mt-4 max-w-2xl text-h2">
          Leadership timeline
        </h2>
        <p className="mt-4 max-w-xl text-text-secondary">
          Roles across product, security, and venture building — from studio to
          scale.
        </p>
      </ScrollReveal>

      <ol className="relative mt-10 list-none space-y-0 border-l border-white/10 p-0 pl-6 sm:pl-8 md:mt-12">
        {leadershipTimeline.map((entry, index) => (
          <li key={entry.id} className="relative pb-10 last:pb-0">
            <span
              className="absolute -left-[calc(0.375rem+1px)] top-1.5 h-3 w-3 rounded-full border-2 border-bg-base bg-text-accent sm:-left-[calc(0.5rem+1px)]"
              aria-hidden
            />
            <ScrollReveal>
              <p className="text-xs uppercase tracking-widest text-text-accent">
                {entry.period}
              </p>
              <h3 className="mt-2 text-display text-lg sm:text-xl">
                {entry.href ? (
                  <Link
                    href={entry.href}
                    className="underline-offset-4 hover:text-text-accent hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {entry.title}
                  </Link>
                ) : (
                  entry.title
                )}
                <span className="font-normal text-text-secondary">
                  {" "}
                  · {entry.org}
                </span>
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-secondary">
                {entry.description}
              </p>
            </ScrollReveal>
            {index < leadershipTimeline.length - 1 ? (
              <span className="sr-only">Next milestone</span>
            ) : null}
          </li>
        ))}
      </ol>
    </section>
  );
}
