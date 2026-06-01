"use client";

import { useEffect, useRef, useState } from "react";

export type ParsedMetric =
  | { kind: "number"; value: number; suffix: string; prefix: string }
  | { kind: "text"; display: string };

/** Parse values like `150+`, `800M+`, `4`, `1–2d` for count-up animation. */
export function parseMetricValue(raw: string): ParsedMetric {
  const trimmed = raw.trim();
  const match = trimmed.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return { kind: "text", display: trimmed };

  const [, prefix = "", numStr, suffix = ""] = match;
  const value = Number(numStr);
  if (Number.isNaN(value)) return { kind: "text", display: trimmed };

  return { kind: "number", value, prefix, suffix };
}

function MetricCounterAnimated({
  value,
  className,
  parsed,
}: {
  value: string;
  className?: string;
  parsed: Extract<ParsedMetric, { kind: "number" }>;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(
    () => `${parsed.prefix}0${parsed.suffix}`,
  );
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      queueMicrotask(() => setDisplay(value));
      return;
    }

    const runCountUp = () => {
      if (started.current) return;
      started.current = true;

      const { prefix, suffix, value: target } = parsed;
      setDisplay(`${prefix}0${suffix}`);
      const duration = 1200;
      const start = performance.now();

      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - (1 - t) ** 3;
        const current = Math.round(target * eased);
        setDisplay(`${prefix}${current}${suffix}`);
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        runCountUp();
        observer.disconnect();
      },
      { threshold: 0.05, rootMargin: "0px 0px -4% 0px" },
    );

    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight * 0.95 && rect.bottom > 0;
    if (inView) {
      runCountUp();
    } else {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, [parsed, value]);

  return (
    <span ref={ref} className={className} aria-label={value}>
      {display}
    </span>
  );
}

export function MetricCounter({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const parsed = parseMetricValue(value);

  if (parsed.kind === "text") {
    return (
      <span className={className} aria-label={value}>
        {parsed.display}
      </span>
    );
  }

  return (
    <MetricCounterAnimated value={value} className={className} parsed={parsed} />
  );
}
