import { ScrollReveal } from "@/components/shared/ScrollReveal";
import type { SiteSettings } from "@/types/content";

export function SkillsStrip({ settings }: { settings: SiteSettings }) {
  const skills = settings.stackItems;
  if (skills.length === 0) return null;

  return (
    <section
      className="section-padding-compact border-t border-white/10"
      aria-labelledby="skills-heading"
    >
      <ScrollReveal>
        <p className="text-sm uppercase tracking-[0.2em] text-text-accent">
          Expertise
        </p>
        <h2 id="skills-heading" className="text-display mt-4 text-h2">
          Core capabilities
        </h2>
      </ScrollReveal>

      <ul className="mt-6 flex list-none flex-wrap gap-2 p-0">
        {skills.map((skill) => (
          <li
            key={skill}
            className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-text-secondary"
          >
            {skill}
          </li>
        ))}
      </ul>
    </section>
  );
}
