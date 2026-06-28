"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useInView } from "@/hooks/useInView";
import type { ICategory } from "@/types/category";

const placeholderCategories = [
  { _id: "1", name: "One Piece Closets", slug: "one-piece-closets", description: "Seamless design, superior hygiene" },
  { _id: "2", name: "Wall Hung Closets", slug: "wall-hung-closets", description: "Space-saving modern elegance" },
  { _id: "3", name: "Water Closets", slug: "water-closets", description: "Classic quality redefined" },
  { _id: "4", name: "Wash Basins", slug: "wash-basins", description: "Sculptural beauty for your vanity" },
  { _id: "5", name: "Pedestal Basins", slug: "pedestal-basins", description: "Timeless sophistication" },
  { _id: "6", name: "Accessories", slug: "accessories", description: "Finishing touches, flawlessly" },
];

interface CategoryGridProps {
  categories?: ICategory[];
}

export function CategoryGrid({ categories = placeholderCategories as unknown as ICategory[] }: CategoryGridProps) {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section ref={ref} className="py-24 bg-[var(--color-off-white)]" aria-labelledby="categories-heading">
      <div className="max-w-[var(--container-max)] mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[var(--color-gold)] font-body text-sm uppercase tracking-[0.2em] mb-3">
            What We Offer
          </p>
          <h2
            id="categories-heading"
            className="font-heading text-4xl md:text-5xl text-[var(--color-charcoal)]"
          >
            Browse by Category
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat._id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link
                href={`/products?category=${cat.slug}`}
                className="group block rounded-[var(--radius-card)] bg-white p-8 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] transition-all duration-300 hover:-translate-y-1"
              >
                {/* Icon placeholder */}
                <div className="w-12 h-12 rounded-full bg-[var(--color-cream)] flex items-center justify-center mb-5 group-hover:bg-[var(--color-gold)] transition-colors duration-300">
                  <span className="w-5 h-5 rounded-sm bg-[var(--color-warm-gray)] group-hover:bg-white transition-colors" aria-hidden />
                </div>
                <h3 className="font-heading text-lg text-[var(--color-charcoal)] mb-2 group-hover:text-[var(--color-gold)] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-sm text-[var(--color-warm-gray)] leading-relaxed">
                  {cat.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
