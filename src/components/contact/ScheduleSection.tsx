import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { getCalendarEmbedUrl, getCalendarUrl } from "@/lib/site";

export function ScheduleSection() {
  const embedUrl = getCalendarEmbedUrl();
  const bookingUrl = getCalendarUrl();

  if (!embedUrl && !bookingUrl) return null;

  return (
    <section
      className="section-padding-compact border-t border-white/10"
      aria-labelledby="schedule-heading"
    >
      <ScrollReveal>
        <p className="text-sm uppercase tracking-[0.2em] text-text-accent">
          Calendar
        </p>
        <h2 id="schedule-heading" className="text-display mt-4 text-h2">
          Book time directly
        </h2>
        <p className="mt-3 max-w-xl text-text-secondary">
          Pick a slot for a partnership intro, advisory call, or product leadership
          conversation.
        </p>
      </ScrollReveal>

      {embedUrl ? (
        <div className="mt-8 overflow-hidden rounded-[var(--radius-card)] border border-white/10 bg-bg-elevated/20">
          <iframe
            title="Schedule a meeting"
            src={embedUrl}
            className="min-h-[680px] w-full border-0"
            loading="lazy"
          />
        </div>
      ) : bookingUrl ? (
        <p className="mt-6">
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cta-primary"
          >
            Open scheduling page
          </a>
        </p>
      ) : null}
    </section>
  );
}
