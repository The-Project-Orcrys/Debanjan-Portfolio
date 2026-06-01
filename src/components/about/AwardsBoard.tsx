import { ScrollReveal } from "@/components/shared/ScrollReveal";
import type { RecognitionItem } from "@/types/content";

export function AwardsBoard({ items }: { items: RecognitionItem[] }) {
  return (
    <section className="section-padding border-t border-white/10">
      <ScrollReveal>
        <h2 className="text-h2 text-display">Certifications & Recognition</h2>
        <ul className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.award} className="text-display text-h2">
              <span className="text-text-accent">{item.count}x</span> {item.award}
            </li>
          ))}
        </ul>
      </ScrollReveal>
    </section>
  );
}
