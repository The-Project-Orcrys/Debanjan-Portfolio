import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

function ChannelIcon({
  name,
  className,
}: {
  name: "email" | "phone" | "location" | "arrow";
  className?: string;
}) {
  const paths = {
    email: (
      <path
        stroke="currentColor"
        strokeWidth="1.5"
        d="M4 8l8 5 8-5M4 8v8h16V8"
        fill="none"
      />
    ),
    phone: (
      <path
        stroke="currentColor"
        strokeWidth="1.5"
        d="M8 4h2l2 4-2 1a12 12 0 006 6l1-2 4 2v2a2 2 0 01-2 2A14 14 0 014 6a2 2 0 012-2z"
        fill="none"
      />
    ),
    location: (
      <>
        <path
          stroke="currentColor"
          strokeWidth="1.5"
          d="M12 21s7-4.5 7-11a7 7 0 10-14 0c0 6.5 7 11 7 11z"
          fill="none"
        />
        <circle cx="12" cy="10" r="2" fill="currentColor" />
      </>
    ),
    arrow: (
      <path
        stroke="currentColor"
        strokeWidth="1.5"
        d="M5 12h14M13 6l6 6-6 6"
        fill="none"
      />
    ),
  };

  return (
    <svg
      className={cn("h-4 w-4", className)}
      viewBox="0 0 24 24"
      aria-hidden
    >
      {paths[name]}
    </svg>
  );
}

export function ContactChannel({
  label,
  href,
  children,
  external = false,
  multiline = false,
  openInNewTab = true,
}: {
  label: string;
  href: string;
  children: ReactNode;
  external?: boolean;
  multiline?: boolean;
  /** When external, open in a new tab (default true; set false for tel/mailto). */
  openInNewTab?: boolean;
}) {
  const className = cn(
    "group flex gap-4 rounded-2xl border border-transparent p-4 transition",
    "hover:border-white/10 hover:bg-white/[0.03]",
  );

  const content = (
    <>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-text-accent transition group-hover:border-text-accent/30 group-hover:bg-text-accent/10">
        <ChannelIcon
          name={
            label === "Email"
              ? "email"
              : label === "Phone"
                ? "phone"
                : "location"
          }
        />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs uppercase tracking-widest text-text-secondary">
          {label}
        </span>
        <span
          className={cn(
            "mt-1 block text-text-primary transition group-hover:text-text-accent",
            multiline ? "text-sm leading-relaxed" : "text-base font-medium",
          )}
        >
          {children}
        </span>
      </span>
      <ChannelIcon
        name="arrow"
        className="mt-3 shrink-0 text-text-secondary opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100"
      />
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        {...(openInNewTab
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        className={className}
      >
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
