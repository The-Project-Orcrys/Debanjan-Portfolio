import type { Metadata } from "next";
import Link from "next/link";
import { ROUTES } from "@/config/site";
import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: "Page not found",
    description: "The page you are looking for does not exist.",
    path: "/404",
    noIndex: true,
  });
}

const quickLinks = [
  { href: ROUTES.home, label: "Home" },
  { href: ROUTES.work, label: "Work" },
  { href: ROUTES.about, label: "About" },
  { href: ROUTES.contact, label: "Contact" },
  { href: ROUTES.resume, label: "Résumé" },
] as const;

export default function NotFound() {
  return (
    <section className="section-padding flex min-h-[70vh] flex-col justify-center">
      <p className="text-sm uppercase tracking-[0.3em] text-text-accent">404</p>
      <h1 className="text-display mt-4 max-w-2xl text-h1 leading-[1.05]">
        This page isn&apos;t on the map
      </h1>
      <p className="mt-4 max-w-lg text-text-secondary">
        The link may be outdated or mistyped. Head back to the portfolio or jump
        straight to work and contact.
      </p>
      <ul className="mt-10 flex flex-wrap gap-3">
        {quickLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="rounded-full border border-white/15 px-5 py-2.5 text-sm uppercase tracking-widest transition hover:border-text-accent hover:text-text-accent"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <Link href={ROUTES.home} className="hero-cta-primary mt-12 w-fit">
        Back to home
        <span aria-hidden>→</span>
      </Link>
    </section>
  );
}
