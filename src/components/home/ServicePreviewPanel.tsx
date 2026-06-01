"use client";

import { AnimatePresence, motion } from "framer-motion";
import { PortfolioImage } from "@/components/shared/PortfolioImage";
import type { ServiceBlock } from "@/types/content";

export function ServicePreviewPanel({
  service,
  index,
}: {
  service: ServiceBlock;
  index: number;
}) {
  const preview =
    service.mediaItems.find((m) => m.type === "image" && m.imageUrl) ??
    service.mediaItems[0];
  const imageUrl = preview?.type === "image" ? preview.imageUrl : undefined;

  return (
    <div className="relative h-full min-h-[420px] w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={service._id}
          initial={{ opacity: 0, scale: 1.03, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="services-preview-card relative h-full min-h-[420px] overflow-hidden rounded-2xl border border-white/10"
          id={`service-panel-${service._id}`}
        >
          {imageUrl ? (
            <PortfolioImage
              src={imageUrl}
              alt={preview?.alt ?? service.title}
              className="object-cover"
              sizes="(max-width: 1024px) 80vw, 45vw"
              priority={index === 0}
            />
          ) : (
            <div className="absolute inset-0 bg-bg-elevated" />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/50 to-bg-primary/20" />
          <div className="services-preview-card__shine" aria-hidden />

          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xs uppercase tracking-[0.2em] text-text-accent"
            >
              Service {String(index + 1).padStart(2, "0")}
            </motion.p>
            <motion.h3
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
              className="text-display mt-3 text-h2 text-text-primary"
            >
              {service.title}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.26 }}
              className="mt-3 max-w-md text-sm leading-relaxed text-text-secondary md:text-base"
            >
              {service.description}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
