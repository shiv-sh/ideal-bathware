import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllTechnologies } from "@/services/technologyService";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Technology",
  description:
    "Discover Ideal Bathware's innovative technologies — 7D Flush, Anti-Bacterial Glaze, Water Saving, and more.",
};

export default async function TechnologyPage() {
  const technologies = await getAllTechnologies().catch(() => []);

  const placeholderTechs = [
    { _id: "1", slug: "7d-flush", name: "7D Flush Technology", shortDescription: "360° directional flush ensures every inch is cleaned with powerful, silent efficiency.", fullDescription: "", icon: "", images: [], relatedProducts: [], createdAt: "", updatedAt: "" },
    { _id: "2", slug: "anti-bacterial-glaze", name: "Anti-Bacterial Glaze", shortDescription: "A proprietary surface treatment that inhibits bacterial growth for a cleaner bathroom.", fullDescription: "", icon: "", images: [], relatedProducts: [], createdAt: "", updatedAt: "" },
    { _id: "3", slug: "water-saving", name: "Water Saving Technology", shortDescription: "Dual-flush and optimized water flow systems that reduce consumption without compromising performance.", fullDescription: "", icon: "", images: [], relatedProducts: [], createdAt: "", updatedAt: "" },
    { _id: "4", slug: "soft-close-seat", name: "Soft Close Seat", shortDescription: "Precision-engineered hinges that close the seat gently and silently every time.", fullDescription: "", icon: "", images: [], relatedProducts: [], createdAt: "", updatedAt: "" },
  ];

  const items = technologies.length > 0 ? technologies : placeholderTechs;

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[var(--color-charcoal)] py-24">
        <div className="max-w-[var(--container-max)] mx-auto px-6 lg:px-10">
          <p className="text-[var(--color-gold)] text-sm uppercase tracking-[0.2em] mb-3">Innovation</p>
          <h1 className="font-heading text-5xl md:text-6xl text-white">Our Technology</h1>
          <p className="text-white/70 mt-4 max-w-xl text-lg">
            Every Ideal Bathware product is engineered with purpose — from the glaze to the flush mechanism.
          </p>
        </div>
      </div>

      <div className="max-w-[var(--container-max)] mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((tech) => (
            <Link
              key={tech._id}
              href={`/technology/${tech.slug}`}
              className="group block rounded-[var(--radius-card)] border border-[var(--color-warm-gray-light)] p-10 hover:border-[var(--color-gold)] hover:shadow-[var(--shadow-hover)] transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-full bg-[var(--color-cream)] flex items-center justify-center mb-6 group-hover:bg-[var(--color-gold)] transition-colors">
                <span className="w-6 h-6 rounded-sm bg-[var(--color-warm-gray)] group-hover:bg-white transition-colors" aria-hidden />
              </div>
              <h2 className="font-heading text-2xl text-[var(--color-charcoal)] mb-3 group-hover:text-[var(--color-gold)] transition-colors">
                {tech.name}
              </h2>
              <p className="text-[var(--color-warm-gray)] leading-relaxed mb-5">
                {tech.shortDescription}
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-charcoal)] group-hover:text-[var(--color-gold)] transition-colors">
                Learn More <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
