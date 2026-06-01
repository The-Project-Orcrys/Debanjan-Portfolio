import { ScrollReveal } from "@/components/shared/ScrollReveal";
import type { AboutSection } from "@/types/content";

const sections = [
  { key: "whoIAm", label: "Who I Am" },
  { key: "approach", label: "Approach" },
  { key: "philosophy", label: "Philosophy" },
] as const;

export function BioSection({ about }: { about: AboutSection }) {
  return (
    <section className="section-padding border-t border-white/10">
      {sections.map(({ key, label }) => {
        const paragraphs = about[key];
        return (
          <ScrollReveal key={key} className="mb-20 grid gap-8 lg:grid-cols-12">
            <h2 className="text-h3 text-display lg:col-span-4">{label}</h2>
            <div className="space-y-4 text-text-secondary lg:col-span-8">
              {paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </ScrollReveal>
        );
      })}
    </section>
  );
}
