"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PortfolioImage } from "@/components/shared/PortfolioImage";
import { serviceImageObjectPosition } from "@/lib/images";
import { cn } from "@/lib/utils";
import type { GalleryItem, ServiceBlock } from "@/types/content";

const THUMBNAIL_COUNT = 3;

function uniquePreviewImages(mediaItems: GalleryItem[]): GalleryItem[] {
  const seen = new Set<string>();
  return mediaItems.filter((item) => {
    const url = item.imageUrl?.trim();
    if (item.type !== "image" || !url || seen.has(url)) return false;
    seen.add(url);
    return true;
  });
}

function thumbnailStrip(images: GalleryItem[]): GalleryItem[] {
  if (images.length === 0) return [];
  return Array.from({ length: THUMBNAIL_COUNT }, (_, i) => images[i % images.length]);
}

function ServicePreviewPanelContent({
  service,
  index,
}: {
  service: ServiceBlock;
  index: number;
}) {
  const images = uniquePreviewImages(service.mediaItems);
  const thumbnails = thumbnailStrip(images);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const safeIndex = images.length > 0 ? selectedIndex % images.length : 0;
  const heroItem = images[safeIndex];

  return (
    <div className="services-preview-panel relative w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={service._id}
          initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -8, filter: "blur(2px)" }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="services-preview-card w-full overflow-hidden rounded-2xl border border-white/10 bg-bg-secondary/80"
          id={`service-panel-${service._id}`}
        >
          <div className="services-preview-card__hero relative aspect-[4/5] w-full max-h-[15rem] overflow-hidden sm:max-h-[16.5rem] md:max-h-[17.5rem] lg:max-h-[19rem]">
            {heroItem?.imageUrl ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={heroItem._key}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <PortfolioImage
                    src={heroItem.imageUrl}
                    alt={heroItem.alt || service.title}
                    className="object-cover"
                    objectPosition={serviceImageObjectPosition(heroItem.imageUrl)}
                    sizes="(max-width: 768px) 90vw, (max-width: 1280px) 36vw, 380px"
                    priority={index === 0}
                  />
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className="absolute inset-0 bg-bg-elevated" aria-hidden />
            )}

            <div className="services-preview-card__shine pointer-events-none" aria-hidden />

            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-primary from-0% via-bg-primary/75 via-[40%] to-transparent to-[70%]"
              aria-hidden
            />

            <div className="absolute inset-x-0 bottom-0 z-[1] p-4 sm:p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-text-accent">
                Service {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="text-display mt-1.5 text-xl leading-[1.12] text-text-primary sm:text-2xl">
                {service.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#c8c4bc]">
                {service.description}
              </p>
            </div>
          </div>

          {thumbnails.length > 0 ? (
            <div
              className="grid grid-cols-3 gap-2 border-t border-white/10 bg-bg-primary/50 p-3.5 sm:gap-2.5 sm:p-4"
              role="tablist"
              aria-label={`${service.title} gallery`}
            >
              {thumbnails.map((item, thumbIndex) => {
                const sourceIndex = images.findIndex((img) => img._key === item._key);
                const imageIndex =
                  sourceIndex >= 0 ? sourceIndex : thumbIndex % images.length;
                const isActive = safeIndex === imageIndex;

                return (
                  <button
                    key={`${item._key}-${thumbIndex}`}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={item.alt || `Image ${thumbIndex + 1}`}
                    onClick={() => setSelectedIndex(imageIndex)}
                    className={cn(
                      "group relative aspect-[4/3] min-h-[5.5rem] overflow-hidden rounded-lg border bg-bg-primary transition sm:min-h-[6rem]",
                      isActive
                        ? "border-text-accent/50 ring-1 ring-text-accent/30"
                        : "border-white/10 opacity-85 hover:border-white/25 hover:opacity-100",
                    )}
                  >
                    <PortfolioImage
                      src={item.imageUrl!}
                      alt=""
                      className="object-cover transition duration-500 group-hover:scale-[1.04]"
                      objectPosition={serviceImageObjectPosition(item.imageUrl!)}
                      sizes="172px"
                    />
                  </button>
                );
              })}
            </div>
          ) : null}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function ServicePreviewPanel(props: {
  service: ServiceBlock;
  index: number;
}) {
  return <ServicePreviewPanelContent key={props.service._id} {...props} />;
}
