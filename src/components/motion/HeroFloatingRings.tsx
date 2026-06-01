"use client";

/** Decorative orbital rings — pure CSS, no canvas cost. */
export function HeroFloatingRings() {
  return (
    <div className="hero-rings pointer-events-none absolute inset-0 z-[1] overflow-hidden" aria-hidden>
      <div className="hero-rings__orbit hero-rings__orbit--1" />
      <div className="hero-rings__orbit hero-rings__orbit--2" />
      <div className="hero-rings__orbit hero-rings__orbit--3" />
    </div>
  );
}
