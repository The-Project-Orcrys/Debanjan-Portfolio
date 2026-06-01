import { getCalendarUrl, getResumeUrl } from "@/lib/site/actions";

type Props = {
  className?: string;
  primary?: boolean;
};

export function FounderActionLinks({ className = "", primary = false }: Props) {
  const resume = getResumeUrl();
  const calendar = getCalendarUrl();

  if (!resume && !calendar) return null;

  const resumeClass = primary ? "hero-cta-primary" : "hero-cta-secondary";
  const calendarClass = primary ? "hero-cta-secondary" : "hero-cta-secondary";

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {resume ? (
        <a
          href={resume}
          className={resumeClass}
          download
          target="_blank"
          rel="noopener noreferrer"
        >
          Download résumé
        </a>
      ) : null}
      {calendar ? (
        <a
          href={calendar}
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

/** Inline text link variant for footer */
export function FounderActionTextLinks({ className = "" }: { className?: string }) {
  const resume = getResumeUrl();
  const calendar = getCalendarUrl();

  if (!resume && !calendar) return null;

  return (
    <ul className={`flex flex-col gap-2 text-sm ${className}`}>
      {resume ? (
        <li>
          <a
            href={resume}
            className="text-text-primary underline-offset-4 hover:text-text-accent hover:underline"
            download
            target="_blank"
            rel="noopener noreferrer"
          >
            Résumé (PDF)
          </a>
        </li>
      ) : null}
      {calendar ? (
        <li>
          <a
            href={calendar}
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
