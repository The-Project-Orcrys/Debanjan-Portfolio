import { ContactChannelCard } from "@/components/contact/ContactChannelCard";
import { ContactEngagementLanes } from "@/components/contact/ContactEngagementLanes";
import { ContactHeroAside } from "@/components/contact/ContactHeroAside";
import { ContactHeroMeta } from "@/components/contact/ContactHeroMeta";
import { ContactOrcrysAside } from "@/components/contact/ContactOrcrysAside";
import { ContactForm } from "@/components/shared/ContactForm";
import { FounderActionLinksServer } from "@/components/shared/FounderActionLinksServer";
import { CopyEmailButton } from "@/components/shared/CopyEmailButton";
import { DownloadVCardButton } from "@/components/shared/DownloadVCardButton";
import { CONTACT, mapsHref, phoneHref, whatsappHref } from "@/lib/data/contact";
import { getCalendarUrl } from "@/lib/site/calendar";
import type { SiteSettings } from "@/types/content";

export async function ContactPageSection({
  settings,
}: {
  settings: SiteSettings;
}) {
  const calendarUrl = getCalendarUrl();
  const linkedIn =
    settings.socialLinks.find((s) => s.url.includes("linkedin.com")) ??
    ({ fullName: "LinkedIn", url: CONTACT.linkedinUrl } as const);

  const channels = [
    {
      label: "Email",
      value: settings.email,
      href: `mailto:${settings.email}`,
      icon: "mailbox" as const,
      description:
        "Primary inbox for consulting, partnerships, and leadership inquiries.",
    },
    {
      label: "Phone",
      value: settings.phone ?? CONTACT.phone,
      href: phoneHref(settings.phone ?? CONTACT.phone),
      icon: "phone" as const,
      description: "Call or message for urgent conversations and scheduling.",
    },
    {
      label: "WhatsApp",
      value: "Message on WhatsApp",
      href: whatsappHref(
        settings.phone ?? CONTACT.phone,
        "Hi Debanjan — I'd like to discuss a partnership or role.",
      ),
      icon: "whatsapp" as const,
      description: "Fastest way to reach me for scheduling and brief intros.",
      external: true,
    },
    {
      label: linkedIn.fullName,
      value: "debanjan-sandhaki",
      href: linkedIn.url,
      icon: "linkedin" as const,
      description: "Connect for updates on product, security, and growth work.",
      external: true,
    },
    {
      label: "Office",
      value: CONTACT.officeShort,
      href: mapsHref(settings.officeAddress ?? CONTACT.officeAddress),
      icon: "location" as const,
      description: settings.officeAddress ?? CONTACT.officeAddress,
      external: true,
    },
  ] as const;

  return (
    <div>
      {/* Hero */}
      <section className="relative section-padding border-b border-white/10 !pt-4">
        <div className="section-ambient pointer-events-none" aria-hidden />
        <div className="relative z-[1] grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-10 xl:gap-14">
          <div className="flex min-w-0 flex-col gap-8">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-text-accent">
                Contact
              </p>
              <h1 className="text-display mt-4 max-w-4xl text-h1 leading-[1.05]">
                Let&apos;s build what&apos;s next
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
                Reach out for product leadership, brand and growth consulting, or
                strategic partnerships.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <FounderActionLinksServer primary />
                <DownloadVCardButton settings={settings} />
              </div>
            </div>

            <div className="hidden lg:block">
              <ContactHeroMeta settings={settings} />
            </div>

            <div className="hidden lg:block">
              <ContactEngagementLanes />
            </div>
          </div>

          <ContactHeroAside
            settings={settings}
            showEngagement
            className="max-lg:mx-auto max-lg:w-full max-lg:max-w-md"
          />
        </div>
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
        <div className="mt-8 grid grid-cols-1 gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {channels.map((channel) => (
            <ContactChannelCard
              key={channel.label}
              label={channel.label}
              value={channel.value}
              href={channel.href}
              description={channel.description}
              icon={channel.icon}
              external={"external" in channel ? channel.external : false}
            />
          ))}
        </div>

        <div className="mt-12 rounded-[var(--radius-card)] border border-white/10 bg-bg-secondary/80 p-6 md:p-8">
          <div className="grid gap-8 md:grid-cols-2 md:items-stretch md:gap-10 lg:gap-12">
            <div className="flex min-w-0 flex-col">
              <p className="text-xs uppercase tracking-widest text-text-secondary">
                Orcrys · {settings.studioName}
              </p>
              <div className="mt-5 flex flex-col items-start gap-4">
                <a
                  href={`mailto:${settings.email}`}
                  className="text-display break-all text-2xl tracking-tight transition hover:text-text-accent sm:break-normal md:text-3xl"
                >
                  {settings.email}
                </a>
                <CopyEmailButton email={settings.email} />
              </div>
              <p className="mt-auto pt-8 text-sm leading-relaxed text-text-secondary md:pt-10">
                Based at {CONTACT.officeShort}. Working with teams globally —
                remote and on-site when needed.
              </p>
            </div>

            <ContactOrcrysAside
              settings={settings}
              calendarUrl={calendarUrl}
            />
          </div>
        </div>
      </section>

      {/* Form */}
      <section
        id="contact-form"
        className="section-padding-tight-bottom scroll-mt-28"
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
