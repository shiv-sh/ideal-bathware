"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { Badge } from "@/components/ui/Badge";
import type { IProduct } from "@/types/product";

interface ProductCardProps {
  product: IProduct;
  index: number;
  inView: boolean;
}

function ProductCard({ product, index, inView }: ProductCardProps) {
  const firstImage = product.gallery[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        href={`/products/${product.slug}`}
        className="group block bg-white rounded-[var(--radius-card)] overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] transition-all duration-300"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-off-white)]">
          {firstImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={firstImage.url}
              alt={firstImage.alt}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-[var(--color-warm-gray-light)] to-[var(--color-cream)]" />
          )}
          {product.isFeatured && (
            <div className="absolute top-4 left-4">
              <Badge variant="gold">Featured</Badge>
            </div>
          )}
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-[var(--color-charcoal)]/0 group-hover:bg-[var(--color-charcoal)]/40 transition-colors duration-300 flex items-end">
            <div className="w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <span className="inline-flex items-center gap-2 text-white text-sm font-medium">
                View Product <ArrowRight size={14} />
              </span>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="p-5">
          <p className="text-xs text-[var(--color-warm-gray)] uppercase tracking-wider mb-1">
            {typeof product.category === "object" ? product.category.name : ""}
          </p>
          <h3 className="font-heading text-lg text-[var(--color-charcoal)] group-hover:text-[var(--color-gold)] transition-colors leading-tight">
            {product.name}
          </h3>
          <p className="text-sm text-[var(--color-warm-gray)] mt-1">SKU: {product.sku}</p>
        </div>
      </Link>
    </motion.div>
  );
}

const placeholderProducts: IProduct[] = Array.from({ length: 4 }, (_, i) => ({
  _id: String(i),
  id: String(i),
  name: ["Aqua One Piece", "Serene Wall Hung", "Classic Pedestal Basin", "Luna Wash Basin"][i] ?? "Product",
  slug: `product-${i + 1}`,
  sku: `IB-${1000 + i}`,
  category: { _id: String(i), name: "Water Closets", slug: "water-closets" },
  description: "Premium quality sanitaryware for modern bathrooms.",
  features: [],
  specifications: {},
  gallery: [],
  downloads: [],
  status: "active" as const,
  isFeatured: true,
  createdAt: "",
  updatedAt: "",
}));

interface FeaturedProductsProps {
  products?: IProduct[];
}

export function FeaturedProducts({ products = placeholderProducts }: FeaturedProductsProps) {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section ref={ref} className="py-24 bg-white" aria-labelledby="featured-products-heading">
      <div className="max-w-[var(--container-max)] mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6"
        >
          <div>
            <p className="text-[var(--color-gold)] font-body text-sm uppercase tracking-[0.2em] mb-3">
              Top Picks
            </p>
            <h2
              id="featured-products-heading"
              className="font-heading text-4xl md:text-5xl text-[var(--color-charcoal)]"
            >
              Featured Products
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-charcoal)] hover:text-[var(--color-gold)] transition-colors group"
          >
            View All Products{" "}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <ProductCard key={product._id} product={product} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
