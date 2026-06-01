"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function CopyEmailButton({
  email,
  className,
}: {
  email: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        "text-xs uppercase tracking-widest transition",
        copied ? "text-text-accent" : "text-text-secondary hover:text-text-accent",
        className,
      )}
    >
      {copied ? "Email copied" : "Copy email address"}
    </button>
  );
}
