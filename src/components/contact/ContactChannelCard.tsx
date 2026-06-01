import Link from "next/link";

type ContactChannelCardProps = {
  label: string;
  value: string;
  href: string;
  description: string;
  external?: boolean;
};

export function ContactChannelCard({
  label,
  value,
  href,
  description,
  external = false,
}: ContactChannelCardProps) {
  const className =
    "contact-channel-card group flex h-full flex-col rounded-[var(--radius-card)] border border-white/10 bg-bg-elevated/50 p-5 transition hover:border-text-accent/40 hover:shadow-[var(--shadow-glow)] sm:p-6";

  const content = (
    <>
      <span className="text-xs uppercase tracking-[0.2em] text-text-secondary">
        {label}
      </span>
      <span className="mt-4 text-lg leading-snug text-text-primary transition group-hover:text-text-accent">
        {value}
      </span>
      <p className="mt-3 text-sm leading-relaxed text-text-secondary">
        {description}
      </p>
      <span className="mt-auto pt-6 text-xs uppercase tracking-widest text-text-accent opacity-0 transition group-hover:opacity-100">
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
