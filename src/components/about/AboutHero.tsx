import { SplitName } from "@/components/shared/SplitName";
import type { SiteSettings } from "@/types/content";

export function AboutHero({
  settings,
  location,
}: {
  settings: SiteSettings;
  location: string;
}) {
  return (
    <section className="section-padding !pt-0">
      <SplitName
        firstName={settings.firstName}
        lastName={settings.lastName}
        asHeading
        animate
      />
      <p className="mt-8 flex items-center gap-2 text-text-secondary">
        <span aria-hidden>◎</span>
        {location}
      </p>
    </section>
  );
}
