import { ContactChannelCard } from "@/components/contact/ContactChannelCard";
import { ContactForm } from "@/components/shared/ContactForm";
import { CONTACT, mapsHref, phoneHref } from "@/lib/data/contact";
import type { SiteSettings } from "@/types/content";

export function ContactPageSection({ settings }: { settings: SiteSettings }) {
  const linkedIn =
    settings.socialLinks.find((s) => s.url.includes("linkedin.com")) ??
    ({ fullName: "LinkedIn", url: CONTACT.linkedinUrl } as const);

  const channels = [
    {
      label: "Email",
      value: settings.email,
      href: `mailto:${settings.email}`,
      description:
        "Primary inbox for consulting, partnerships, and leadership inquiries.",
    },
    {
      label: "Phone",
      value: settings.phone ?? CONTACT.phone,
      href: phoneHref(settings.phone ?? CONTACT.phone),
      description: "Call or message for urgent conversations and scheduling.",
    },
    {
      label: linkedIn.fullName,
      value: "debanjan-sandhaki",
      href: linkedIn.url,
      description: "Connect for updates on product, security, and growth work.",
      external: true,
    },
    {
      label: "Office",
      value: CONTACT.officeShort,
      href: mapsHref(settings.officeAddress ?? CONTACT.officeAddress),
      description: settings.officeAddress ?? CONTACT.officeAddress,
      external: true,
    },
  ] as const;

  return (
    <div>
      {/* Hero */}
      <section className="section-padding border-b border-white/10 pt-[max(6.5rem,env(safe-area-inset-top))] sm:pt-28">
        <p className="text-sm uppercase tracking-[0.25em] text-text-accent">
          Contact
        </p>
        <h1 className="text-display mt-4 max-w-4xl text-h1 leading-[1.05]">
          Let&apos;s build what&apos;s next
        </h1>
        <p className="mt-6 max-w-2xl text-h3 text-text-secondary">
          Reach out for product leadership, brand and growth consulting, or
          strategic partnerships.{" "}
          {settings.availabilityNote && (
            <span className="text-text-primary">{settings.availabilityNote}</span>
          )}
        </p>
        <p className="mt-4 text-sm text-text-secondary">
          Typical response time: 1–2 business days
        </p>
      </section>

      {/* Channels */}
      <section
        className="section-padding border-b border-white/10"
        aria-labelledby="contact-channels-heading"
      >
        <h2
          id="contact-channels-heading"
          className="text-sm uppercase tracking-[0.2em] text-text-secondary"
        >
          Direct channels
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {channels.map((channel) => (
            <ContactChannelCard
              key={channel.label}
              label={channel.label}
              value={channel.value}
              href={channel.href}
              description={channel.description}
              external={"external" in channel ? channel.external : false}
            />
          ))}
        </div>

        <div className="mt-12 rounded-[var(--radius-card)] border border-white/10 bg-bg-secondary/80 p-6 md:p-8">
          <p className="text-xs uppercase tracking-widest text-text-secondary">
            Orcrys · {settings.studioName}
          </p>
          <a
            href={`mailto:${settings.email}`}
            className="mt-3 inline-block text-2xl text-display tracking-tight transition hover:text-text-accent md:text-3xl"
          >
            {settings.email}
          </a>
          <p className="mt-4 max-w-xl text-sm text-text-secondary">
            Based at {CONTACT.officeShort}. Working with teams globally — remote
            and on-site when needed.
          </p>
        </div>
      </section>

      {/* Form */}
      <section
        className="section-padding-tight-bottom"
        aria-labelledby="contact-form-heading"
      >
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start lg:gap-16">
          <div className="lg:sticky lg:top-28">
            <h2
              id="contact-form-heading"
              className="text-display text-h2 leading-tight"
            >
              Send a message
            </h2>
            <p className="mt-4 max-w-md text-text-secondary">
              Share a short brief — role, timeline, and what success looks like.
              All fields help me respond with the right context.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-text-secondary">
              <li className="flex gap-3">
                <span className="text-text-accent" aria-hidden>
                  —
                </span>
                Product & platform leadership
              </li>
              <li className="flex gap-3">
                <span className="text-text-accent" aria-hidden>
                  —
                </span>
                Brand, GTM, and growth consulting
              </li>
              <li className="flex gap-3">
                <span className="text-text-accent" aria-hidden>
                  —
                </span>
                Cybersecurity & social-impact ventures
              </li>
            </ul>
          </div>

          <div className="rounded-[var(--radius-card)] border border-white/10 bg-bg-elevated/30 p-4 sm:p-8 md:p-10 lg:p-12">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
