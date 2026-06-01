import Link from "next/link";
import { LinkedInButton } from "@/components/shared/LinkedInButton";
import { CONTACT, mapsHref, phoneHref, whatsappHref } from "@/lib/data/contact";
import { cn } from "@/lib/utils";
import type { SiteSettings } from "@/types/content";

export function ContactLinks({
  settings,
  showAddress = false,
  variant = "default",
}: {
  settings: SiteSettings;
  showAddress?: boolean;
  variant?: "default" | "compact";
}) {
  const linkedIn =
    settings.socialLinks.find((s) => s.url.includes("linkedin.com")) ??
    ({
      fullName: "LinkedIn",
      url: CONTACT.linkedinUrl,
    } as const);
  const otherSocial = settings.socialLinks.filter(
    (s) => !s.url.includes("linkedin.com"),
  );

  const phone = settings.phone ?? CONTACT.phone;
  const whatsapp = whatsappHref(phone);

  if (variant === "compact") {
    return (
      <ul className="space-y-2.5 text-sm">
        {phone ? (
          <li>
            <a
              href={phoneHref(phone)}
              className="text-text-primary transition hover:text-text-accent"
            >
              {phone}
            </a>
          </li>
        ) : null}
        {phone ? (
          <li>
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-primary transition hover:text-text-accent"
            >
              WhatsApp ↗
            </a>
          </li>
        ) : null}
        <li>
          <Link
            href={`mailto:${settings.email}`}
            className="text-text-primary transition hover:text-text-accent"
          >
            {settings.email}
          </Link>
        </li>
        <li>
          <a
            href={linkedIn.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-primary transition hover:text-text-accent"
          >
            {linkedIn.fullName} ↗
          </a>
        </li>
        {otherSocial.map((s) => (
          <li key={s.label}>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-primary transition hover:text-text-accent"
            >
              {s.fullName} ↗
            </a>
          </li>
        ))}
        {showAddress ? (
          <li className="pt-1 text-[#a8a8a8]">
            <a
              href={mapsHref(settings.officeAddress ?? CONTACT.officeAddress)}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-text-accent"
            >
              {CONTACT.officeShort}
            </a>
          </li>
        ) : null}
      </ul>
    );
  }

  return (
    <ul className={cn("space-y-2 text-sm")}>
      {phone ? (
        <li>
          <a href={phoneHref(phone)} className="hover:text-text-accent">
            {phone}
          </a>
        </li>
      ) : null}
      {phone ? (
        <li>
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text-accent"
          >
            WhatsApp
          </a>
        </li>
      ) : null}
      <li className="pt-1">
        <LinkedInButton href={linkedIn.url} label={linkedIn.fullName} />
      </li>
      <li>
        <Link href={`mailto:${settings.email}`} className="hover:text-text-accent">
          {settings.email}
        </Link>
      </li>
      {otherSocial.map((s) => (
        <li key={s.label}>
          <a
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text-accent"
          >
            {s.fullName}
          </a>
        </li>
      ))}
      {showAddress && settings.officeAddress ? (
        <li className="max-w-sm pt-2 text-text-secondary">
          <span className="mb-1 block text-xs uppercase tracking-widest text-text-secondary">
            Office
          </span>
          <a
            href={mapsHref(settings.officeAddress)}
            target="_blank"
            rel="noopener noreferrer"
            className="leading-relaxed hover:text-text-accent"
          >
            {CONTACT.officeShort}
          </a>
        </li>
      ) : null}
    </ul>
  );
}
