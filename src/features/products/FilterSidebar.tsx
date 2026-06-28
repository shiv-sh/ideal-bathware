"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Button } from "@/components/ui/Button";
import type { ICategory } from "@/types/category";

const categoryList = [
  { name: "One Piece Closets", slug: "one-piece-closets" },
  { name: "Wall Hung Closets", slug: "wall-hung-closets" },
  { name: "Water Closets", slug: "water-closets" },
  { name: "Wash Basins", slug: "wash-basins" },
  { name: "Table Top Basins", slug: "table-top-basins" },
  { name: "Pedestal Basins", slug: "pedestal-basins" },
  { name: "Half Pedestal Basins", slug: "half-pedestal-basins" },
  { name: "Urinals", slug: "urinals" },
  { name: "Floor Pans", slug: "floor-pans" },
  { name: "Accessories", slug: "accessories" },
];

interface FilterSidebarProps {
  categories?: ICategory[];
  activeCategory?: string;
}

export function FilterSidebar({ categories, activeCategory }: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setCategory = useCallback(
    (slug: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (slug) {
        params.set("category", slug);
      } else {
        params.delete("category");
      }
      params.delete("page");
      router.push(`/products?${params.toString()}`);
    },
    [router, searchParams]
  );

  const items = categories ?? categoryList;

  return (
    <aside className="w-full md:w-60 flex-shrink-0" aria-label="Product filters">
      <div className="sticky top-24">
        <h2 className="font-heading text-xl text-[var(--color-charcoal)] mb-6">Categories</h2>
        <ul className="flex flex-col gap-1">
          <li>
            <button
              onClick={() => setCategory(null)}
              className={`w-full text-left px-4 py-2.5 rounded-[var(--radius-sm)] text-sm transition-colors ${
                !activeCategory
                  ? "bg-[var(--color-charcoal)] text-white font-medium"
                  : "text-[var(--color-charcoal)] hover:bg-[var(--color-off-white)]"
              }`}
            >
              All Products
            </button>
          </li>
          {items.map((cat) => (
            <li key={cat.slug}>
              <button
                onClick={() => setCategory(cat.slug)}
                className={`w-full text-left px-4 py-2.5 rounded-[var(--radius-sm)] text-sm transition-colors ${
                  activeCategory === cat.slug
                    ? "bg-[var(--color-charcoal)] text-white font-medium"
                    : "text-[var(--color-charcoal)] hover:bg-[var(--color-off-white)]"
                }`}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
        {activeCategory && (
          <Button
            variant="ghost"
            size="sm"
            className="mt-4 w-full"
            onClick={() => setCategory(null)}
          >
            Clear Filter
          </Button>
        )}
      </div>
    </aside>
  );
}
