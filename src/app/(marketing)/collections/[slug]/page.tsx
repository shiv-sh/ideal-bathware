import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCollectionBySlug, getAllCollectionSlugs } from "@/services/collectionService";
import { getProducts } from "@/services/productService";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, ChevronRight } from "lucide-react";

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllCollectionSlugs().catch(() => []);
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);
  if (!collection) return { title: "Collection Not Found" };
  return {
    title: collection.name,
    description: collection.description ?? `Explore the ${collection.name} from Ideal Bathware.`,
  };
}

export default async function CollectionDetailPage({ params }: Props) {
  const { slug } = await params;
  const [collection, productResult] = await Promise.all([
    getCollectionBySlug(slug),
    getProducts({ collection: slug, limit: 12 }),
  ]);

  if (!collection) notFound();

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-[var(--color-warm-gray-light)]">
        <div className="max-w-[var(--container-max)] mx-auto px-6 lg:px-10 py-4">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-[var(--color-warm-gray)]">
              <li><Link href="/" className="hover:text-[var(--color-gold)] transition-colors">Home</Link></li>
              <li aria-hidden><ChevronRight size={14} /></li>
              <li><Link href="/collections" className="hover:text-[var(--color-gold)] transition-colors">Collections</Link></li>
              <li aria-hidden><ChevronRight size={14} /></li>
              <li className="text-[var(--color-charcoal)] font-medium" aria-current="page">{collection.name}</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <div className="relative h-80 md:h-96 overflow-hidden">
        {collection.heroImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={collection.heroImage}
            alt={collection.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-[var(--color-charcoal)] via-[#4a4a4a] to-[#2a2a2a]" />
        )}
        <div className="absolute inset-0 bg-black/50 flex items-center">
          <div className="max-w-[var(--container-max)] mx-auto px-6 lg:px-10 w-full">
            <p className="text-[var(--color-gold)] text-sm uppercase tracking-[0.2em] mb-3">Collection</p>
            <h1 className="font-heading text-5xl text-white">{collection.name}</h1>
            {collection.description && (
              <p className="text-white/80 mt-4 max-w-xl text-lg">{collection.description}</p>
            )}
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-[var(--container-max)] mx-auto px-6 lg:px-10 py-16">
        <h2 className="font-heading text-3xl text-[var(--color-charcoal)] mb-10">
          Products in this Collection{" "}
          <Badge variant="subtle" className="ml-2 text-sm font-body">{productResult.total}</Badge>
        </h2>

        {productResult.products.length === 0 ? (
          <p className="text-[var(--color-warm-gray)]">No products found in this collection yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productResult.products.map((product) => (
              <Link
                key={product._id}
                href={`/products/${product.slug}`}
                className="group block bg-white rounded-[var(--radius-card)] overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] transition-all"
              >
                <div className="aspect-[4/3] bg-[var(--color-off-white)]">
                  {product.gallery[0] && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={product.gallery[0].url}
                      alt={product.gallery[0].alt}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-lg text-[var(--color-charcoal)] group-hover:text-[var(--color-gold)] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-[var(--color-warm-gray)] mt-1 flex items-center gap-1 group-hover:text-[var(--color-gold)] transition-colors">
                    View Product <ArrowRight size={12} />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
