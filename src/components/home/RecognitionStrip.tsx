import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { defaultRecognitions } from "@/lib/data/defaults";

export function RecognitionStrip() {
  return (
    <section
      className="section-padding-compact border-t border-white/10"
      aria-label="Recognition and milestones"
    >
      <ScrollReveal>
        <p className="text-sm uppercase tracking-[0.2em] text-text-accent">
          Recognition
        </p>
        <h2 className="text-display mt-4 text-h2">Milestones & community</h2>
      </ScrollReveal>

      <ul className="mt-6 flex list-none gap-3 overflow-x-auto pb-2 p-0 [-ms-overflow-style:none] [scrollbar-width:none] sm:flex-wrap sm:overflow-visible [&::-webkit-scrollbar]:hidden">
        {defaultRecognitions.map((item) => (
          <li
            key={item.award}
            className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-text-secondary sm:shrink"
          >
            <span className="text-text-primary">{item.award}</span>
            {item.count > 1 ? (
              <span className="ml-2 text-text-accent">×{item.count}</span>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
