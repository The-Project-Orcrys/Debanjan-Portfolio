import { ContactCTAReveal } from "@/components/shared/ContactCTAReveal";
import type { SiteSettings } from "@/types/content";

interface ContactCTAProps {
  settings: SiteSettings;
  headline?: string;
  subtext?: string;
}

export function ContactCTA({
  settings,
  headline = "Let's build something people remember",
  subtext = "from global platforms to early-stage ventures.",
  ...rest
}: ContactCTAProps) {
  return (
    <ContactCTAReveal
      settings={settings}
      headline={headline}
      subtext={subtext}
      {...rest}
    />
  );
}
