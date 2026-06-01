import { SplitName } from "@/components/shared/SplitName";
import type { SiteSettings } from "@/types/content";

export function WorkHero({ settings }: { settings: SiteSettings }) {
  return (
    <section className="section-padding !pt-0">
      <h1 className="sr-only">Work and case studies</h1>
      <SplitName
        firstName={settings.firstName}
        lastName={settings.lastName}
        animate
      />
      <p className="mt-8 max-w-2xl text-h3 text-text-secondary">
        <span className="text-text-accent">Work.</span> Case studies across
        product, security, and growth leadership
      </p>
    </section>
  );
}
