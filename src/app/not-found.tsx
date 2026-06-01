import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const meta = await buildPageMetadata({
    title: "Page not found",
    description: "The page you are looking for does not exist.",
    path: "/404",
    noIndex: true,
  });
  return meta;
}

export default function NotFound() {
  return (
    <section className="section-padding flex min-h-[60vh] flex-col justify-center">
      <h1 className="text-display text-h1">404</h1>
      <p className="mt-4 text-text-secondary">This page doesn&apos;t exist.</p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link href="/" className="text-text-accent underline">
          Back home
        </Link>
        <Link href="/contact" className="text-text-secondary underline hover:text-text-accent">
          Contact
        </Link>
        <Link href="/work" className="text-text-secondary underline hover:text-text-accent">
          View work
        </Link>
      </div>
    </section>
  );
}
