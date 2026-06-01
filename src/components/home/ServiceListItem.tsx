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
          "group relative w-full text-left outline-none",
          "border-b border-white/10 py-7 md:py-9",
          "transition-[background,box-shadow] duration-500",
          active && "bg-white/[0.03]",
        )}
        onMouseEnter={onActivate}
        onFocus={onActivate}
        onClick={onActivate}
        aria-expanded={active}
        aria-controls={`service-panel-${service._id}`}
      >
        {active && (
          <motion.span
            layoutId="service-active-bar"
            className="absolute bottom-0 left-0 top-0 w-[3px] bg-gradient-to-b from-shape-blue via-text-accent to-transparent"
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
          />
        )}

        <div className="flex items-start gap-5 md:gap-8 pl-1">
          <span
            className={cn(
              "text-display text-h1 shrink-0 tabular-nums leading-none transition-all duration-500",
              active ? "text-text-accent" : "text-white/12 group-hover:text-white/25",
            )}
          >
            {number}
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-4">
              <h3
                className={cn(
                  "text-h2 text-display transition-colors duration-300",
                  active
                    ? "text-text-primary"
                    : "text-text-primary/80 group-hover:text-text-primary",
                )}
              >
                {service.title}
              </h3>

              <motion.span
                className={cn(
                  "mt-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-lg leading-none transition-colors",
                  active
                    ? "border-text-accent/50 bg-text-accent/10 text-text-accent"
                    : "border-white/15 text-text-secondary group-hover:border-white/30",
                )}
                animate={{ rotate: active ? 45 : 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                aria-hidden
              >
                +
              </motion.span>
            </div>

            <AnimatePresence initial={false}>
              {active && (
                <motion.p
                  id={`service-desc-${service._id}`}
                  initial={{ height: 0, opacity: 0, marginTop: 0 }}
                  animate={{ height: "auto", opacity: 1, marginTop: 12 }}
                  exit={{ height: 0, opacity: 0, marginTop: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden max-w-xl text-base leading-relaxed text-text-secondary md:text-lg"
                >
                  {service.description}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        <span
          className={cn(
            "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500",
            "bg-gradient-to-r from-shape-blue/10 via-transparent to-transparent",
            active && "opacity-100",
          )}
          aria-hidden
        />
      </button>
    </div>
  );
}
