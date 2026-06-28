import type { Metadata } from "next";
import Link from "next/link";
import { getAllCollections } from "@/services/collectionService";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Explore Ideal Bathware's lifestyle collections — Urban, Luxury, Minimal, and Commercial. Premium sanitaryware curated for every taste.",
};

export default async function CollectionsPage() {
  const collections = await getAllCollections().catch(() => []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[var(--color-charcoal)] py-24">
        <div className="max-w-[var(--container-max)] mx-auto px-6 lg:px-10">
          <p className="text-[var(--color-gold)] text-sm uppercase tracking-[0.2em] mb-3">
            Curated Lifestyles
          </p>
          <h1 className="font-heading text-5xl md:text-6xl text-white">Our Collections</h1>
        </div>
      </div>

      <div className="max-w-[var(--container-max)] mx-auto px-6 lg:px-10 py-16">
        {collections.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-heading text-2xl text-[var(--color-charcoal)] mb-2">
              Collections coming soon
            </p>
            <p className="text-[var(--color-warm-gray)]">
              Check back shortly for our curated collections.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {collections.map((col) => (
              <Link
                key={col._id}
                href={`/collections/${col.slug}`}
                className="group relative overflow-hidden rounded-[var(--radius-card)] aspect-[16/9] block"
              >
                {col.heroImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={col.heroImage}
                    alt={col.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-charcoal)] to-[#4a4a4a] transition-transform duration-500 group-hover:scale-105" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h2 className="font-heading text-3xl text-white mb-2">{col.name}</h2>
                  {col.description && (
                    <p className="text-white/70 text-sm mb-4">{col.description}</p>
                  )}
                  <span className="text-[var(--color-gold-light)] text-sm font-medium group-hover:underline">
                    Explore collection →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
