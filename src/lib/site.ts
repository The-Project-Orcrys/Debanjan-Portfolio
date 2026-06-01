/** Client-safe site helpers — calendar and vCard. */
import type { SiteSettings } from "@/types/content";
import { getSiteUrl } from "@/lib/seo";

export function getCalendarUrl(): string | null {
  const url = process.env.NEXT_PUBLIC_CALENDAR_URL?.trim();
  return url || null;
}

export function getCalendarEmbedUrl(): string | null {
  const embed = process.env.NEXT_PUBLIC_CALENDAR_EMBED_URL?.trim();
  if (embed) return embed;

  const booking = getCalendarUrl();
  if (!booking) return null;

  try {
    const url = new URL(booking);
    url.searchParams.set("embed", "true");
    url.searchParams.set("hide_gdpr_banner", "1");
    return url.toString();
  } catch {
    return null;
  }
}

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
