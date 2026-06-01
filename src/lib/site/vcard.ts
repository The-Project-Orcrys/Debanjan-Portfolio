import { getSiteUrl } from "@/lib/seo/config";
import type { SiteSettings } from "@/types/content";

/** Build a vCard 3.0 string for one-click contact save. */
export function buildVCard(settings: SiteSettings): string {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${settings.firstName} ${settings.lastName}`,
    `N:${settings.lastName};${settings.firstName};;;`,
    `TITLE:${settings.role}`,
    `ORG:${settings.studioName}`,
    `EMAIL;TYPE=work:${settings.email}`,
  ];

  if (settings.phone) {
    lines.push(`TEL;TYPE=cell:${settings.phone.replace(/\s/g, "")}`);
  }

  const linkedIn = settings.socialLinks.find((s) =>
    s.url.includes("linkedin.com"),
  );
  if (linkedIn) {
    lines.push(`URL:${linkedIn.url}`);
  }

  lines.push(`URL:${getSiteUrl()}`);
  lines.push(`NOTE:${settings.tagline}`);
  lines.push("END:VCARD");

  return lines.join("\r\n");
}
