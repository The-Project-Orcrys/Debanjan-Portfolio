"use client";

import { useEffect, useRef, useState } from "react";

function HeroStatCounterAnimated({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      queueMicrotask(() => setDisplay(value));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || started.current) return;
        started.current = true;

        const duration = 1400;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - (1 - t) ** 3;
          setDisplay(Math.round(value * eased));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <li ref={ref} className="hero-stat-item">
      <span className="hero-stat-value text-display block text-2xl font-normal tabular-nums text-text-primary sm:text-[1.75rem]">
        {display}
        {suffix}
      </span>
      <span className="text-text-secondary">{label}</span>
    </li>
  );
}

export function HeroStatCounter({
  value,
  suffix = "",
  label,
}: {
  value: number | string;
  suffix?: string;
  label: string;
}) {
  if (typeof value !== "number") {
    return (
      <li className="hero-stat-item">
        <span className="hero-stat-value text-display block text-2xl font-normal tabular-nums text-text-primary sm:text-[1.75rem]">
          {value}
          {suffix}
        </span>
        <span className="text-text-secondary">{label}</span>
      </li>
    );
  }

  return (
    <HeroStatCounterAnimated value={value} suffix={suffix} label={label} />
  );
}
