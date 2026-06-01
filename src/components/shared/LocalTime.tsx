"use client";

import { useEffect, useState } from "react";

const TIMEZONE = "Asia/Kolkata";

export function LocalTime({ className }: { className?: string }) {
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const format = () => {
      const now = new Date();
      const time = now.toLocaleTimeString("en-IN", {
        timeZone: TIMEZONE,
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      const date = now.toLocaleDateString("en-IN", {
        timeZone: TIMEZONE,
        weekday: "short",
        day: "numeric",
        month: "short",
      });
      setLabel(`${date} · ${time} IST`);
    };

    format();
    const id = setInterval(format, 60_000);
    return () => clearInterval(id);
  }, []);

  if (!label) {
    return (
      <span className={className} suppressHydrationWarning>
        Kolkata · IST
      </span>
    );
  }

  return (
    <time className={className} dateTime={new Date().toISOString()} suppressHydrationWarning>
      {label}
    </time>
  );
}
