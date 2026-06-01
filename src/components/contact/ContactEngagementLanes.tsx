import Link from "next/link";
import { engagementOfferings } from "@/lib/data/founder";

function inquiryHref(type: string) {
  return `/contact?inquiry=${encodeURIComponent(type)}#contact-form`;
}

export function ContactEngagementLanes() {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-text-secondary">
        Engagement lanes
      </p>
      <ul className="mt-4 space-y-3">
        {engagementOfferings.map((item) => (
          <li key={item.id}>
            <Link
              href={inquiryHref(item.inquiryType)}
              className="group flex items-start justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 transition hover:border-text-accent/30"
              data-cursor="pointer"
            >
              <div>
                <p className="text-sm font-medium text-text-primary">{item.title}</p>
                <p className="mt-1 text-xs text-text-secondary">{item.duration}</p>
              </div>
              <span className="text-text-accent transition group-hover:translate-x-0.5" aria-hidden>
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
