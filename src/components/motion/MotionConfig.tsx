"use client";

import { MotionConfig as FMConfig } from "framer-motion";
import { useEffect } from "react";
import gsap from "gsap";

export function MotionConfigProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      gsap.globalTimeline.timeScale(mq.matches ? 0 : 1);
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <FMConfig reducedMotion="user">
      {children}
    </FMConfig>
  );
}
