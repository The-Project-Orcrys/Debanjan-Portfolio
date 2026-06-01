"use client";

import { useEffect, useState } from "react";

export function FooterBackground({ videoSrc }: { videoSrc?: string }) {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection;
    const saveData = conn?.saveData;
    const narrow = window.innerWidth < 768;
    setShowVideo(Boolean(videoSrc) && !reducedMotion && !saveData && !narrow);
  }, [videoSrc]);

  if (!showVideo || !videoSrc) {
    return (
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        aria-hidden
      >
        <div className="h-full w-full bg-gradient-to-b from-bg-elevated via-bg-primary to-bg-primary" />
      </div>
    );
  }

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.08]"
      aria-hidden
    >
      <video
        className="h-full w-full object-cover"
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
      />
      <div className="absolute inset-0 bg-bg-primary/70" />
    </div>
  );
}
