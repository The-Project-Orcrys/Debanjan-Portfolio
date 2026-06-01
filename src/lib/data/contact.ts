import type { SiteSettings, SocialLink } from "@/types/content";

/** Canonical contact details — used across defaults, UI, SEO, and Sanity merge. */
export const CONTACT = {
  email: "ceo@orcrys.com",
  linkedinUrl: "https://www.linkedin.com/in/debanjan-sandhaki-a02a5532a/",
  phone: "+91 85973 31075",
  officeAddress:
    "Rajarhat, Ecospace, 4A, 5TH Floor, Premises, AA II, Newtown, Kolkata, Chakpachuria, West Bengal 700160",
  officeShort: "Ecospace, Newtown, Kolkata · West Bengal 700160",
} as const;

export function phoneHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

/** WhatsApp deep link (India +91 numbers supported). */
export function whatsappHref(phone: string, prefilledMessage?: string) {
  const digits = phone.replace(/\D/g, "");
  if (!prefilledMessage) return `https://wa.me/${digits}`;
  return `https://wa.me/${digits}?text=${encodeURIComponent(prefilledMessage)}`;
}

export function mapsHref(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

function ensureLinkedIn(links: SocialLink[]): SocialLink[] {
  const rest = (links ?? []).filter((l) => l?.url && !l.url.includes("linkedin.com"));
  const existing = (links ?? []).find((l) => l?.url?.includes("linkedin.com"));
  const linkedIn: SocialLink = {
    label: existing?.label ?? "in",
    url: CONTACT.linkedinUrl,
    fullName: existing?.fullName ?? "LinkedIn",
  };
  return [linkedIn, ...rest];
}

/** Fill missing or outdated contact fields (e.g. partial Sanity documents). */
export function mergeSiteSettingsContact(settings: SiteSettings): SiteSettings {
  return {
    ...settings,
    company: settings.company?.trim() || "Orcrys",
    email: CONTACT.email,
    phone: settings.phone?.trim() || CONTACT.phone,
    officeAddress: settings.officeAddress?.trim() || CONTACT.officeAddress,
    location:
      settings.location?.trim() ||
      `${CONTACT.officeShort} · working globally (Remote)`,
    socialLinks: ensureLinkedIn(settings.socialLinks ?? []),
  };
}
