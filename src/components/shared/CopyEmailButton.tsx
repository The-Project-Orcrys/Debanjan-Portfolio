"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function CopyEmailButton({ email }: { email: string }) {
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
        "mt-3 text-xs uppercase tracking-widest transition",
        copied ? "text-text-accent" : "text-text-secondary hover:text-text-accent",
      )}
    >
      {copied ? "Email copied" : "Copy email address"}
    </button>
  );
}
