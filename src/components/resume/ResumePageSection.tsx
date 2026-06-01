import Link from "next/link";
import { FounderActionLinksServer } from "@/components/shared/FounderActionLinksServer";
import { ShareProfileButton } from "@/components/shared/ShareProfileButton";
import { ROUTES } from "@/config/site";
import { getSiteUrl } from "@/lib/seo";
import {
  getResumeDownloadName,
  getResumeUrl,
  resumeFileOnDisk,
} from "@/lib/site.server";
import type { SiteSettings } from "@/types/content";

export function ResumePageSection({ settings }: { settings: SiteSettings }) {
  const resumeUrl = getResumeUrl();
  const hasFile = resumeFileOnDisk();
  const siteUrl = getSiteUrl();
  const shareUrl = `${siteUrl}${ROUTES.resume}`;

  return (
    <div>
      <section className="section-padding border-b border-white/10 pt-[max(6.5rem,env(safe-area-inset-top))] sm:pt-28">
        <p className="text-sm uppercase tracking-[0.25em] text-text-accent">
          Résumé
        </p>
        <h1 className="text-display mt-4 max-w-3xl text-h1 leading-[1.05]">
          {settings.firstName} {settings.lastName}
        </h1>
        <p className="mt-4 max-w-2xl text-h3 text-text-secondary">
          {settings.role} — {settings.tagline}
        </p>
        <p className="mt-4 max-w-xl text-sm text-text-secondary">
          Executive profile spanning product leadership at Mewayz, cybersecurity
          ventures at PhantomX, and studio building at Orcrys.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {resumeUrl ? (
            <a
              href={resumeUrl}
              download={getResumeDownloadName()}
              className="hero-cta-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download PDF
            </a>
          ) : (
            <p className="text-sm text-text-secondary">
              Résumé PDF not uploaded yet. Add{" "}
              <code className="text-text-accent">Profile.pdf</code> and run{" "}
              <code className="text-text-accent">npm run resume:copy</code>.
            </p>
          )}
          <Link href={ROUTES.contact} className="hero-cta-secondary">
            Contact me
          </Link>
          <ShareProfileButton url={shareUrl} title={settings.siteTitle} />
        </div>

        {!hasFile && !process.env.NEXT_PUBLIC_RESUME_URL ? (
          <p className="mt-4 text-xs text-text-secondary">
            Or set <code>NEXT_PUBLIC_RESUME_URL</code> to host the file elsewhere.
          </p>
        ) : null}

        <div className="mt-6">
          <FounderActionLinksServer />
        </div>
      </section>

      <section className="section-padding-compact border-b border-white/10">
        <h2 className="text-display text-h2">Quick links</h2>
        <ul className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
          <li>
            <Link href={ROUTES.work} className="text-text-accent hover:underline">
              Portfolio & case studies →
            </Link>
          </li>
          <li>
            <Link href={ROUTES.about} className="text-text-accent hover:underline">
              Full biography →
            </Link>
          </li>
          <li>
            <Link href={ROUTES.products} className="text-text-accent hover:underline">
              Ventures & products →
            </Link>
          </li>
          <li>
            <a
              href={settings.socialLinks[0]?.url ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-accent hover:underline"
            >
              LinkedIn profile →
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}
