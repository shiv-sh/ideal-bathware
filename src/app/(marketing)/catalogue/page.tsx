import type { Metadata } from "next";
import { CatalogueForm } from "@/features/leads/CatalogueForm";
import { BookOpen, CheckCircle } from "lucide-react";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Product Catalogue",
  description:
    "Download Ideal Bathware's free product catalogue — 200+ premium sanitaryware products with specifications and dimensions.",
};

const features = [
  "200+ products with full specifications",
  "Technical dimensions and installation details",
  "Available in digital PDF format",
  "Updated with latest collections",
];

export default function CataloguePage() {
  return (
    <div className="min-h-screen bg-[var(--color-off-white)]">
      <div className="bg-[var(--color-charcoal)] py-24">
        <div className="max-w-[var(--container-max)] mx-auto px-6 lg:px-10">
          <p className="text-[var(--color-gold)] text-sm uppercase tracking-[0.2em] mb-3">
            Free Download
          </p>
          <h1 className="font-heading text-5xl md:text-6xl text-white">Product Catalogue</h1>
        </div>
      </div>

      <div className="max-w-[var(--container-max)] mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left — info */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <BookOpen size={64} className="text-[var(--color-gold)]" aria-hidden />
              <div>
                <p className="font-heading text-2xl text-[var(--color-charcoal)]">
                  Ideal Bathware Catalogue 2024
                </p>
                <p className="text-[var(--color-warm-gray)] text-sm">PDF • ~12 MB • Free</p>
              </div>
            </div>
            <p className="text-[var(--color-charcoal-light)] leading-relaxed mb-8">
              Our comprehensive product catalogue covers our entire range of premium sanitaryware —
              from one-piece closets and wall-hung fixtures to designer wash basins and accessories.
              Each product entry includes full specifications, available finishes, and installation
              requirements.
            </p>
            <ul className="flex flex-col gap-3">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-[var(--color-charcoal-light)]">
                  <CheckCircle size={18} className="text-[var(--color-gold)] flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Right — form */}
          <div className="bg-white rounded-[var(--radius-card)] shadow-[var(--shadow-card)] p-8 md:p-10">
            <h2 className="font-heading text-2xl text-[var(--color-charcoal)] mb-2">
              Download for Free
            </h2>
            <p className="text-[var(--color-warm-gray)] text-sm mb-6">
              Enter your details below to receive the catalogue.
            </p>
            <CatalogueForm />
          </div>
        </div>
      </div>
    </div>
  );
}
