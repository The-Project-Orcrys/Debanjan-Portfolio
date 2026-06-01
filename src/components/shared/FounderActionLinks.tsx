import Link from "next/link";
import { ROUTES } from "@/config/site";

type Props = {
  className?: string;
  primary?: boolean;
  resumeUrl?: string | null;
  calendarUrl?: string | null;
};

export function FounderActionLinks({
  className = "",
  primary = false,
  resumeUrl,
  calendarUrl,
}: Props) {
  if (!resumeUrl && !calendarUrl) return null;

  const calendarClass = primary ? "hero-cta-secondary" : "hero-cta-secondary";

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {/* {resumeUrl ? (
        <a
          href={resumeUrl}
          className={resumeClass}
          download
          target="_blank"
          rel="noopener noreferrer"
        >
          Download résumé
        </a>
      ) : null} */}
      {resumeUrl ? (
        <Link href={ROUTES.resume} className="text-sm uppercase tracking-widest text-text-secondary underline-offset-4 hover:text-text-accent hover:underline">
          Résumé page
        </Link>
      ) : null}
      {calendarUrl ? (
        <a
          href={calendarUrl}
          className={calendarClass}
          target="_blank"
          rel="noopener noreferrer"
        >
          Book a call
        </a>
      ) : null}
    </div>
  );
}

export function FounderActionTextLinks({
  className = "",
  resumeUrl,
  calendarUrl,
}: {
  className?: string;
  resumeUrl?: string | null;
  calendarUrl?: string | null;
}) {
  if (!resumeUrl && !calendarUrl) return null;

  return (
    <ul className={`flex flex-col gap-2 text-sm ${className}`}>
      {resumeUrl ? (
        <>
          {/* <li>
            <a
              href={resumeUrl}
              className="text-text-primary underline-offset-4 hover:text-text-accent hover:underline"
              download
              target="_blank"
              rel="noopener noreferrer"
            >
              Résumé (PDF)
            </a>
          </li> */}
          <li>
            <Link
              href={ROUTES.resume}
              className="text-text-primary underline-offset-4 hover:text-text-accent hover:underline"
            >
              Résumé page
            </Link>
          </li>
        </>
      ) : null}
      {calendarUrl ? (
        <li>
          <a
            href={calendarUrl}
            className="text-text-primary underline-offset-4 hover:text-text-accent hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Schedule a call
          </a>
        </li>
      ) : null}
    </ul>
  );
}
