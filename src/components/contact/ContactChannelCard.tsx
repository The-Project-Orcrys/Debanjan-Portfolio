import Link from "next/link";
import {
  ContactChannelIcon,
  type ContactChannelIconName,
} from "@/components/shared/ContactChannelIcon";

type ContactChannelCardProps = {
  label: string;
  value: string;
  href: string;
  description: string;
  icon: ContactChannelIconName;
  external?: boolean;
};

export function ContactChannelCard({
  label,
  value,
  href,
  description,
  icon,
  external = false,
}: ContactChannelCardProps) {
  const className =
    "contact-channel-card group flex h-full flex-col rounded-[var(--radius-card)] border border-white/10 bg-bg-elevated/50 p-4 transition hover:border-text-accent/40 hover:shadow-[var(--shadow-glow)] sm:p-5";

  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <span className="text-xs uppercase tracking-[0.2em] text-text-secondary">
          {label}
        </span>
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-text-accent transition group-hover:border-text-accent/35 group-hover:bg-text-accent/10"
          aria-hidden
        >
          <ContactChannelIcon name={icon} />
        </span>
      </div>
      <span className="mt-3 block text-lg leading-snug text-text-primary transition group-hover:text-text-accent">
        {value}
      </span>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">
        {description}
      </p>
      <span className="mt-4 text-xs uppercase tracking-widest text-text-accent opacity-0 transition group-hover:opacity-100">
        {external ? "Open link" : "Contact"}
      </span>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {content}
      </a>
    );
  }

  if (href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a href={href} className={className}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}
