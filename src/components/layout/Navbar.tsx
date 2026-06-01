"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLenis } from "@/components/motion/LenisProvider";
import { NAV_LINKS } from "@/config/site";
import { phoneHref } from "@/lib/data/contact";
import { cn } from "@/lib/utils";
import type { SiteSettings } from "@/types/content";

const contactLinks = (settings: SiteSettings) => [
  { href: `mailto:${settings.email}`, label: "Email", external: false },
  ...(settings.phone
    ? [{ href: phoneHref(settings.phone), label: "Call", external: true }]
    : []),
  ...settings.socialLinks.map((s) => ({
    href: s.url,
    label: s.url.includes("linkedin.com") ? "LinkedIn" : s.label,
    external: true,
    ariaLabel: s.fullName,
  })),
];

export function Navbar({ settings }: { settings: SiteSettings }) {
  const pathname = usePathname();
  const lenis = useLenis();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const contacts = contactLinks(settings);

  useEffect(() => {
    const onScroll = (y: number) => setScrolled(y > 16);
    onScroll(lenis?.scroll ?? window.scrollY);

    if (lenis) {
      const handler = ({ scroll }: { scroll: number }) => onScroll(scroll);
      lenis.on("scroll", handler);
      return () => lenis.off("scroll", handler);
    }

    const onWindowScroll = () => onScroll(window.scrollY);
    window.addEventListener("scroll", onWindowScroll, { passive: true });
    return () => window.removeEventListener("scroll", onWindowScroll);
  }, [lenis]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-5">
        <div
          className={cn(
            "pointer-events-auto mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full border px-3 py-2.5 transition-all duration-500 ease-out sm:gap-4 sm:px-5 sm:py-3",
            scrolled
              ? "border-white/15 bg-bg-primary/92 shadow-[0_8px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl"
              : "border-white/10 bg-bg-primary/55 backdrop-blur-md",
          )}
        >
          <Link
            href="/"
            className="text-display shrink-0 text-base tracking-tight transition hover:text-text-accent sm:text-lg"
          >
            <span className="hidden sm:inline">
              {settings.firstName} {settings.lastName}
            </span>
            <span className="sm:hidden">{settings.firstName}</span>
          </Link>

          <nav
            className="absolute left-1/2 hidden -translate-x-1/2 md:flex"
            aria-label="Primary"
          >
            <ul className="flex items-center gap-1 rounded-full bg-white/[0.04] p-1">
              {NAV_LINKS.map((link) => {
                const active = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "relative block rounded-full px-4 py-2 text-xs uppercase tracking-widest transition",
                        active
                          ? "bg-white/10 text-text-primary"
                          : "text-text-secondary hover:text-text-primary",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden items-center gap-1 md:flex">
            {contacts.map((item, i) => (
              <span key={item.href} className="flex items-center">
                {i > 0 ? (
                  <span
                    className="mx-2 h-3 w-px bg-white/15"
                    aria-hidden
                  />
                ) : null}
                {"external" in item && item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full px-2.5 py-1.5 text-sm text-text-secondary transition hover:bg-white/5 hover:text-text-accent"
                    aria-label={"ariaLabel" in item ? item.ariaLabel : item.label}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className="rounded-full px-2.5 py-1.5 text-sm text-text-secondary transition hover:bg-white/5 hover:text-text-accent"
                  >
                    {item.label}
                  </Link>
                )}
              </span>
            ))}
          </div>

          <button
            type="button"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:border-white/20 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative h-3.5 w-4">
              <span
                className={cn(
                  "absolute left-0 h-px w-full bg-text-primary transition-all duration-300",
                  open ? "top-[7px] rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-[7px] h-px w-full bg-text-primary transition-all duration-300",
                  open ? "opacity-0" : "opacity-100",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-px w-full bg-text-primary transition-all duration-300",
                  open ? "top-[7px] -rotate-45" : "top-[14px]",
                )}
              />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-3 top-[4.25rem] z-50 overflow-hidden rounded-3xl border border-white/10 bg-bg-primary/95 shadow-[0_24px_80px_rgba(0,0,0,0.5)] backdrop-blur-xl md:hidden"
            >
              <nav className="flex flex-col p-4" aria-label="Mobile">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "block rounded-2xl px-4 py-3 text-lg transition",
                        pathname === link.href
                          ? "bg-white/10 text-text-accent"
                          : "text-text-primary hover:bg-white/5",
                      )}
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <div className="mt-2 border-t border-white/10 pt-3">
                  <p className="px-4 pb-2 text-xs uppercase tracking-widest text-text-secondary">
                    Contact
                  </p>
                  <div className="flex flex-wrap gap-2 px-2">
                    {contacts.map((item) =>
                      "external" in item && item.external ? (
                        <a
                          key={item.href}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full border border-white/10 px-4 py-2 text-sm text-text-secondary transition hover:border-white/20 hover:text-text-accent"
                          onClick={() => setOpen(false)}
                        >
                          {item.label}
                        </a>
                      ) : (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="rounded-full border border-white/10 px-4 py-2 text-sm text-text-secondary transition hover:border-white/20 hover:text-text-accent"
                          onClick={() => setOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ),
                    )}
                  </div>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
