"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import type { ICollection } from "@/types/collection";

const placeholder: ICollection[] = [
  { _id: "1", name: "Urban Collection", slug: "urban", description: "Clean lines and functional elegance for the modern home.", gallery: [], createdAt: "", updatedAt: "" },
  { _id: "2", name: "Luxury Collection", slug: "luxury", description: "Opulent designs that transform bathrooms into sanctuaries.", gallery: [], createdAt: "", updatedAt: "" },
  { _id: "3", name: "Minimal Collection", slug: "minimal", description: "Understated beauty for spaces that breathe.", gallery: [], createdAt: "", updatedAt: "" },
];

interface FeaturedCollectionsProps {
  collections?: ICollection[];
}

export function FeaturedCollections({ collections = placeholder }: FeaturedCollectionsProps) {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section ref={ref} className="py-24 bg-white" aria-labelledby="collections-heading">
      <div className="max-w-[var(--container-max)] mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6"
        >
          <div>
            <p className="text-[var(--color-gold)] font-body text-sm uppercase tracking-[0.2em] mb-3">
              Our Collections
            </p>
            <h2
              id="collections-heading"
              className="font-heading text-4xl md:text-5xl text-[var(--color-charcoal)]"
            >
              Curated Lifestyles
            </h2>
          </div>
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-charcoal)] hover:text-[var(--color-gold)] transition-colors group"
          >
            View All Collections{" "}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((col, i) => (
            <motion.div
              key={col._id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <Link
                href={`/collections/${col.slug}`}
                className="group block relative overflow-hidden rounded-[var(--radius-card)] aspect-[3/4]"
              >
                {/* Background — placeholder gradient, replaced with Cloudinary image */}
                <div
                  className="absolute inset-0 bg-gradient-to-br transition-transform duration-500 group-hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, hsl(${(i * 60) % 360} 15% 35%), hsl(${(i * 60 + 30) % 360} 10% 20%))`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="font-heading text-2xl text-white mb-2">{col.name}</h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-4">{col.description}</p>
                  <span className="inline-flex items-center gap-2 text-[var(--color-gold-light)] text-sm font-medium group-hover:gap-3 transition-all">
                    Explore <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
