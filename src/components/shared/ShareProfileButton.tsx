"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function ShareProfileButton({
  url,
  title,
  className,
}: {
  url: string;
  title: string;
  className?: string;
}) {
  const [status, setStatus] = useState<"idle" | "shared" | "copied">("idle");

  async function handleShare() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text: title, url });
        setStatus("shared");
        setTimeout(() => setStatus("idle"), 2000);
        return;
      } catch {
        /* fall through to copy */
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setStatus("copied");
      setTimeout(() => setStatus("idle"), 2000);
    } catch {
      setStatus("idle");
    }
  }

  const label =
    status === "shared"
      ? "Shared"
      : status === "copied"
        ? "Link copied"
        : "Share profile";

  return (
    <button
      type="button"
      onClick={handleShare}
      className={cn(
        "rounded-full border border-white/20 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-widest text-text-secondary transition hover:border-text-accent/40 hover:bg-white/[0.06] hover:text-text-accent",
        className,
      )}
    >
      {label}
    </button>
  );
}
