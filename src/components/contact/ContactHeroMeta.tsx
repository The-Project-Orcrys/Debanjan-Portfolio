import { CONTACT, phoneHref } from "@/lib/data/contact";
import type { SiteSettings } from "@/types/content";

export function ContactHeroMeta({ settings }: { settings: SiteSettings }) {
  return (
    <div className="glass-panel p-5 sm:p-6">
      {settings.availabilityNote ? (
        <p className="availability-badge mb-5">{settings.availabilityNote}</p>
      ) : null}
      <dl className="space-y-4 text-sm">
        <div>
          <dt className="text-xs uppercase tracking-widest text-text-secondary">Email</dt>
          <dd className="mt-1">
            <a
              href={`mailto:${settings.email}`}
              className="text-text-primary transition hover:text-text-accent"
            >
              {settings.email}
            </a>
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-widest text-text-secondary">Phone</dt>
          <dd className="mt-1">
            <a
              href={phoneHref(settings.phone ?? CONTACT.phone)}
              className="text-text-primary transition hover:text-text-accent"
            >
              {settings.phone ?? CONTACT.phone}
            </a>
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-widest text-text-secondary">Office</dt>
          <dd className="mt-1 text-text-secondary">{CONTACT.officeShort}</dd>
        </div>
      </dl>
    </div>
  );
}
