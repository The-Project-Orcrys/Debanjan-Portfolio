"use client";

import { motion } from "framer-motion";
import { ProductCard } from "@/components/products/ProductCard";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SECTION_COPY } from "@/config/site";
import { defaultProducts } from "@/lib/data/products";
import { cn } from "@/lib/utils";

const gridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

function productGridItemClass(index: number) {
  if (index < 3) return "lg:col-span-4";
  if (index === 3) return "lg:col-span-4 lg:col-start-3";
  return "lg:col-span-4 lg:col-start-7";
}

export function ProductsSection() {
  const products = defaultProducts;

  return (
    <section
      id="products"
      className="relative overflow-hidden border-t border-white/10"
      aria-labelledby="products-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(26,58,255,0.08),transparent)]"
        aria-hidden
      />

      <div className="section-padding-tight-bottom relative pt-[var(--section-y)]">
        <ScrollReveal>
          <p className="text-sm uppercase tracking-[0.2em] text-text-accent">
            {SECTION_COPY.products.eyebrow}
          </p>
          <h2 id="products-heading" className="text-display mt-4 max-w-3xl text-h2">
            {SECTION_COPY.products.title}
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-text-secondary">
            From unified business infrastructure to AI learning and cyber readiness
            — each product links to its live experience.
          </p>
        </ScrollReveal>

        <motion.ul
          className="products-grid mt-8 grid w-full list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 sm:gap-5 lg:grid-cols-12 lg:gap-6"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-8%" }}
        >
          {products.map((product, index) => (
            <motion.li
              key={product.id}
              variants={cardVariants}
              className={cn(
                "flex w-full min-w-0",
                productGridItemClass(index),
                products.length === 5 &&
                  index === 4 &&
                  "sm:col-span-2 sm:max-w-md sm:justify-self-center lg:col-span-4 lg:col-start-7 lg:max-w-none",
              )}
            >
              <ProductCard product={product} />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
