"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ROUTES } from "@/config/site";
import { CONTACT, whatsappHref } from "@/lib/data/static";
import { cn } from "@/lib/utils";

export function StickyMobileContact({ email }: { email: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const threshold = 320;
    const onScroll = () => setVisible(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const phone = CONTACT.phone;
  const wa = whatsappHref(
    phone,
    `Hi Debanjan — I'd like to connect regarding a partnership.`,
  );

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-bg-primary/95 px-3 py-2 backdrop-blur-lg transition md:hidden",
        "pb-[max(0.5rem,env(safe-area-inset-bottom))]",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0",
      )}
      aria-hidden={!visible}
    >
      <div className="mx-auto flex max-w-lg gap-2">
        <a
          href={`mailto:${email}`}
          className="hero-cta-primary min-h-11 flex-1 justify-center py-2.5 text-xs"
        >
          Email
        </a>
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="hero-cta-secondary min-h-11 flex-1 justify-center py-2.5 text-xs"
        >
          WhatsApp
        </a>
        <Link
          href={ROUTES.contact}
          className="hero-cta-secondary min-h-11 flex-1 justify-center py-2.5 text-xs"
        >
          Contact
        </Link>
      </div>
    </div>
  );
}
