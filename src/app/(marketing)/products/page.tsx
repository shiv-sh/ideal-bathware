import type { Metadata } from "next";
import { Suspense } from "react";
import { FilterSidebar } from "@/features/products/FilterSidebar";
import { ProductGrid } from "@/features/products/ProductGrid";
import { Spinner } from "@/components/ui/Spinner";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse Ideal Bathware's complete range of premium sanitaryware — closets, basins, urinals, and accessories.",
};

interface ProductsPageProps {
  searchParams: Promise<{ category?: string; collection?: string; search?: string; page?: string }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;

  return (
    <div className="min-h-screen bg-[var(--color-off-white)]">
      {/* Page header */}
      <div className="bg-[var(--color-charcoal)] py-16">
        <div className="max-w-[var(--container-max)] mx-auto px-6 lg:px-10">
          <p className="text-[var(--color-gold)] text-sm uppercase tracking-[0.2em] mb-3">
            Our Range
          </p>
          <h1 className="font-heading text-4xl md:text-5xl text-white">All Products</h1>
          {params.category && (
            <p className="mt-2 text-white/60 text-lg capitalize">
              {params.category.replace(/-/g, " ")}
            </p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[var(--container-max)] mx-auto px-6 lg:px-10 py-12">
        <div className="flex flex-col md:flex-row gap-10">
          <Suspense fallback={<div className="w-60 h-96 animate-pulse bg-white rounded-[var(--radius-card)]" />}>
            <FilterSidebar activeCategory={params.category} />
          </Suspense>

          <div className="flex-1 min-w-0">
            <Suspense
              fallback={
                <div className="flex justify-center pt-16">
                  <Spinner size="lg" />
                </div>
              }
            >
              <ProductGrid />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
