"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { cn } from "@/lib/utils";

const DotLottieReact = dynamic(
  () =>
    import("@lottiefiles/dotlottie-react").then((mod) => mod.DotLottieReact),
  { ssr: false, loading: () => null },
);

interface LottiePlayerProps {
  src: string;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  fallback?: React.ReactNode;
}

export function LottiePlayer({
  src,
  className,
  loop = true,
  autoplay = true,
  fallback,
}: LottiePlayerProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className={cn("flex items-center justify-center", className)}>
        {fallback ?? (
          <span className="inline-block h-6 w-6 animate-pulse rounded-full bg-text-accent/40" />
        )}
      </div>
    );
  }

  return (
    <div className={cn(className)}>
      <DotLottieReact
        src={src}
        loop={loop}
        autoplay={autoplay}
        style={{ width: "100%", height: "100%" }}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
