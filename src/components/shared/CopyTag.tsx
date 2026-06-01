"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function CopyTag({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <motion.button
      type="button"
      onClick={handleCopy}
      whileTap={{ scale: 0.94 }}
      className={cn(
        "rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-wider transition-colors",
        copied
          ? "border-text-accent bg-text-accent/15 text-text-accent"
          : "hover:border-white/35 hover:bg-white/5",
      )}
      aria-label={copied ? "Copied to clipboard" : "Copy name to clipboard"}
    >
      {copied ? "copied" : "copy"}
    </motion.button>
  );
}
