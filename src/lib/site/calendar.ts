/** Scheduling links — set `NEXT_PUBLIC_CALENDAR_URL` (and optional embed URL). */

export function getCalendarUrl(): string | null {
  const url = process.env.NEXT_PUBLIC_CALENDAR_URL?.trim();
  return url || null;
}

export function getCalendarEmbedUrl(): string | null {
  const embed = process.env.NEXT_PUBLIC_CALENDAR_EMBED_URL?.trim();
  if (embed) return embed;

  const booking = getCalendarUrl();
  if (!booking) return null;

  try {
    const url = new URL(booking);
    url.searchParams.set("embed", "true");
    url.searchParams.set("hide_gdpr_banner", "1");
    return url.toString();
  } catch {
    return null;
  }
}
