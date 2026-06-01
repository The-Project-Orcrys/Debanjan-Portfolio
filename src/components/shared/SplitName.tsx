"use client";

import { useEffect, useRef } from "react";
import { cn, splitChars } from "@/lib/utils";

interface SplitNameProps {
  firstName: string;
  lastName: string;
  className?: string;
  vertical?: boolean;
  /** Render as h1 for page-level SEO (one h1 per page) */
  asHeading?: boolean;
  /** GSAP character stagger on mount (matches home hero) */
  animate?: boolean;
}

function useSplitNameAnimation(
  animate: boolean,
  firstName: string,
  lastName: string,
) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!animate || !ref.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let cancelled = false;

    void (async () => {
      const { default: gsap } = await import("gsap");
      if (cancelled || !ref.current) return;
      const chars = ref.current.querySelectorAll(".split-name-char");
      gsap.fromTo(
        chars,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.06,
          ease: "power3.out",
        },
      );
    })();

    return () => {
      cancelled = true;
    };
  }, [animate, firstName, lastName]);

  return ref;
}

export function SplitName({
  firstName,
  lastName,
  className,
  vertical = true,
  asHeading = false,
  animate = false,
}: SplitNameProps) {
  const ref = useSplitNameAnimation(animate, firstName, lastName);

  const renderChars = (text: string, prefix: string) =>
    splitChars(text).map((char, i) => (
      <span
        key={`${prefix}-${i}`}
        className={cn(
          "split-name-char inline-block",
          animate && "will-change-transform",
        )}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  const content = (
    <>
      <span className="block">{renderChars(firstName, "first")}</span>
      <span className="block">{renderChars(lastName, "last")}</span>
    </>
  );

  const classes = cn(
    "text-display text-hero font-normal leading-[0.9] tracking-tight text-text-primary",
    vertical ? "flex flex-col" : "flex flex-row flex-wrap gap-x-4",
    className,
  );

  if (asHeading) {
    return (
      <h1 ref={ref} className={classes}>
        {content}
      </h1>
    );
  }

  return (
    <div ref={ref} className={classes}>
      {content}
    </div>
  );
}
