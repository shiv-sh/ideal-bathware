"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Spinner } from "@/components/ui/Spinner";
import type { IProduct } from "@/types/product";

interface ProductListResult {
  products: IProduct[];
  total: number;
  page: number;
  totalPages: number;
}

async function fetchProducts(params: URLSearchParams): Promise<ProductListResult> {
  const res = await fetch(`/api/products?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json() as Promise<ProductListResult>;
}

export function ProductGrid() {
  const searchParams = useSearchParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", searchParams.toString()],
    queryFn: () => fetchProducts(searchParams),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-16 text-[var(--color-warm-gray)]">
        <p className="text-lg">Failed to load products. Please try again.</p>
      </div>
    );
  }

  if (!data?.products.length) {
    return (
      <div className="text-center py-16">
        <p className="font-heading text-2xl text-[var(--color-charcoal)] mb-2">No products found</p>
        <p className="text-[var(--color-warm-gray)]">Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-[var(--color-warm-gray)] mb-6">
        {data.total} product{data.total !== 1 ? "s" : ""} found
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {data.products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: IProduct }) {
  const firstImage = product.gallery[0];

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block bg-white rounded-[var(--radius-card)] overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] transition-all duration-300"
    >
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
        <div className="absolute inset-0 bg-[var(--color-charcoal)]/0 group-hover:bg-[var(--color-charcoal)]/30 transition-colors duration-300 flex items-end">
          <div className="w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <span className="inline-flex items-center gap-2 text-white text-sm font-medium">
              View Product <ArrowRight size={14} />
            </span>
          </div>
        </div>
      </div>
      <div className="p-5">
        <p className="text-xs text-[var(--color-warm-gray)] uppercase tracking-wider mb-1">
          {typeof product.category === "object" ? product.category.name : ""}
        </p>
        <h2 className="font-heading text-lg text-[var(--color-charcoal)] group-hover:text-[var(--color-gold)] transition-colors leading-tight">
          {product.name}
        </h2>
        <p className="text-sm text-[var(--color-warm-gray)] mt-1">SKU: {product.sku}</p>
      </div>
    </Link>
  );
}
