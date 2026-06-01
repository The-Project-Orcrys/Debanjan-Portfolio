"use client";

import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ServiceBlock } from "@/types/content";

export function ServiceListItem({
  service,
  index,
  active,
  onActivate,
}: {
  service: ServiceBlock;
  index: number;
  active: boolean;
  onActivate: () => void;
}) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <div className="relative">
      <button
        type="button"
        className={cn(
          "group relative w-full text-left outline-none transition-all duration-500",
          active
            ? "my-2 rounded-2xl border border-white/10 bg-gradient-to-br from-shape-blue/14 via-white/[0.04] to-transparent px-4 py-5 shadow-[0_0_48px_rgba(26,58,255,0.1)] sm:px-5 sm:py-6"
            : "border-b border-white/10 py-5 sm:py-6",
        )}
        onMouseEnter={onActivate}
        onFocus={onActivate}
        onClick={onActivate}
        aria-expanded={active}
        aria-controls={`service-panel-${service._id}`}
      >
        {active ? (
          <motion.span
            layoutId="service-active-bar"
            className="absolute bottom-3 left-0 top-3 w-[3px] rounded-full bg-gradient-to-b from-shape-blue via-text-accent to-transparent"
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
          />
        ) : null}

        <div
          className={cn(
            "flex items-start gap-4 sm:gap-6",
            active ? "pl-3" : "pl-0",
          )}
        >
          <span
            className={cn(
              "text-display shrink-0 tabular-nums leading-none transition-all duration-500",
              "text-[clamp(2rem,5vw,3.25rem)]",
              active
                ? "text-text-accent"
                : "text-white/12 group-hover:text-white/28",
            )}
          >
            {number}
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-4">
              <h3
                className={cn(
                  "text-display text-[clamp(1.35rem,3.5vw,2rem)] leading-tight transition-colors duration-300",
                  active
                    ? "text-text-primary"
                    : "text-text-primary/75 group-hover:text-text-primary",
                )}
              >
                {service.title}
              </h3>

              <span
                className={cn(
                  "mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-base leading-none transition-all duration-300",
                  active
                    ? "border-text-accent/50 bg-text-accent/10 text-text-accent"
                    : "border-white/15 text-text-secondary group-hover:border-white/30 group-hover:text-text-primary",
                )}
                aria-hidden
              >
                {active ? "×" : "+"}
              </span>
            </div>

            <AnimatePresence initial={false}>
              {active ? (
                <motion.p
                  id={`service-desc-${service._id}`}
                  initial={{ height: 0, opacity: 0, marginTop: 0 }}
                  animate={{ height: "auto", opacity: 1, marginTop: 12 }}
                  exit={{ height: 0, opacity: 0, marginTop: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden max-w-xl text-sm leading-relaxed text-text-secondary sm:text-base"
                >
                  {service.description}
                </motion.p>
              ) : null}
            </AnimatePresence>
          </div>
        </div>

        <span
          className={cn(
            "pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500",
            "bg-gradient-to-r from-shape-blue/10 via-transparent to-transparent",
            active && "opacity-100",
          )}
          aria-hidden
        />
      </button>
    </div>
  );
}
