"use client";

import Link from "next/link";
import { PortfolioImage } from "@/components/shared/PortfolioImage";
import { PORTRAIT_OBJECT_POSITION } from "@/lib/images";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { cn } from "@/lib/utils";

export type CollageItem = {
  src: string;
  label: string;
  caption: string;
  href?: string;
};

export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 48, rotate: -2 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotate: i === 0 ? -2 : i === 1 ? 1 : -1,
    transition: {
      duration: 0.8,
      delay: i * 0.14,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export function PhotoCollageCard({
  item,
  index,
  elevated = false,
}: {
  item: CollageItem;
  index: number;
  elevated?: boolean;
}) {
  const reducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), {
    stiffness: 200,
    damping: 20,
  });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const cardBody = (
      <motion.div
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={
          reducedMotion
            ? undefined
            : { rotateX, rotateY, transformStyle: "preserve-3d" }
        }
        className={cn(
          "photo-collage-card relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)]",
          "border border-white/10 bg-bg-secondary shadow-[var(--shadow-card)]",
          "transition-[box-shadow,border-color] duration-500",
          "group-hover:border-text-accent/35 group-hover:shadow-[var(--shadow-glow)]",
        )}
      >
        <PortfolioImage
          src={item.src}
          alt={item.caption}
          objectPosition={PORTRAIT_OBJECT_POSITION}
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-700 ease-out group-hover:scale-[1.08]"
        />

        <div className="photo-collage-card__shine" aria-hidden />
        <div
          className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/20 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-95"
          aria-hidden
        />

        <span className="absolute left-4 top-4 font-mono text-xs tracking-widest text-white/25 transition group-hover:text-text-accent/50">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="absolute inset-x-0 bottom-0 translate-y-3 p-5 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-text-accent">
            {item.label}
          </p>
          <p className="mt-1 text-sm text-text-secondary">{item.caption}</p>
        </div>

        <div
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-bg-primary/50 text-sm opacity-0 backdrop-blur-sm transition duration-300 group-hover:opacity-100"
          aria-hidden
        >
          ↗
        </div>
      </motion.div>
  );

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      className={cn("group relative", elevated && "md:-mt-14")}
      style={{ perspective: 1200 }}
    >
      {item.href ? (
        <Link href={item.href} className="block" aria-label={item.label}>
          {cardBody}
        </Link>
      ) : (
        cardBody
      )}
    </motion.div>
  );
}
