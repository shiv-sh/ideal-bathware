import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductBySlug, getAllProductSlugs, getRelatedProducts } from "@/services/productService";
import { Badge } from "@/components/ui/Badge";
import { ProductEnquiryForm } from "@/features/products/ProductEnquiryForm";
import { ChevronRight, Download } from "lucide-react";

export const revalidate = 1800;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: product.name,
    description: product.description.slice(0, 160),
    openGraph: {
      title: `${product.name} | Ideal Bathware`,
      description: product.description.slice(0, 160),
      images: product.gallery[0] ? [{ url: product.gallery[0].url, width: 1200, height: 630 }] : [],
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/products/${slug}`,
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const categoryId = typeof product.category === "object" ? product.category._id : product.category;
  const related = await getRelatedProducts(slug, categoryId);

  const categoryName = typeof product.category === "object" ? product.category.name : "";
  const categorySlug = typeof product.category === "object" ? product.category.slug : "";

  const specEntries = Object.entries(product.specifications);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-[var(--color-warm-gray-light)]">
        <div className="max-w-[var(--container-max)] mx-auto px-6 lg:px-10 py-4">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-[var(--color-warm-gray)]">
              <li><Link href="/" className="hover:text-[var(--color-gold)] transition-colors">Home</Link></li>
              <li aria-hidden><ChevronRight size={14} /></li>
              <li><Link href="/products" className="hover:text-[var(--color-gold)] transition-colors">Products</Link></li>
              {categoryName && (
                <>
                  <li aria-hidden><ChevronRight size={14} /></li>
                  <li>
                    <Link href={`/products?category=${categorySlug}`} className="hover:text-[var(--color-gold)] transition-colors">
                      {categoryName}
                    </Link>
                  </li>
                </>
              )}
              <li aria-hidden><ChevronRight size={14} /></li>
              <li className="text-[var(--color-charcoal)] font-medium" aria-current="page">{product.name}</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Product hero */}
      <div className="max-w-[var(--container-max)] mx-auto px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Gallery */}
          <div>
            <div className="aspect-square bg-[var(--color-off-white)] rounded-[var(--radius-card)] overflow-hidden mb-4">
              {product.gallery[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={product.gallery[0].url}
                  alt={product.gallery[0].alt}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-[var(--color-warm-gray-light)] to-[var(--color-cream)]" />
              )}
            </div>
            {product.gallery.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.gallery.slice(1, 5).map((img, i) => (
                  <div key={i} className="aspect-square rounded-[var(--radius-sm)] overflow-hidden bg-[var(--color-off-white)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.url} alt={img.alt} className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              {categoryName && <Badge variant="outline">{categoryName}</Badge>}
              {product.isFeatured && <Badge variant="gold">Featured</Badge>}
            </div>
            <h1 className="font-heading text-4xl text-[var(--color-charcoal)] mb-2">{product.name}</h1>
            <p className="text-sm text-[var(--color-warm-gray)] mb-6">SKU: {product.sku}</p>
            <p className="text-[var(--color-charcoal-light)] leading-relaxed mb-8">{product.description}</p>

            {product.features.length > 0 && (
              <ul className="flex flex-col gap-2 mb-8">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[var(--color-gold)] flex items-center justify-center mt-0.5">
                      <span className="text-white text-xs">✓</span>
                    </span>
                    <span className="text-[var(--color-charcoal-light)]">{f}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="flex flex-col gap-3">
              <ProductEnquiryForm productName={product.name} productSlug={product.slug} />
            </div>
          </div>
        </div>

        {/* Tabs: Specifications + Downloads */}
        {(specEntries.length > 0 || product.downloads.length > 0) && (
          <div className="border-t border-[var(--color-warm-gray-light)] pt-12 mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {specEntries.length > 0 && (
                <div>
                  <h2 className="font-heading text-2xl text-[var(--color-charcoal)] mb-6">Specifications</h2>
                  <table className="w-full text-sm">
                    <tbody>
                      {specEntries.map(([key, val]) => (
                        <tr key={key} className="border-b border-[var(--color-warm-gray-light)]">
                          <td className="py-3 pr-4 font-medium text-[var(--color-charcoal)] w-1/2">{key}</td>
                          <td className="py-3 text-[var(--color-warm-gray)]">{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {product.downloads.length > 0 && (
                <div>
                  <h2 className="font-heading text-2xl text-[var(--color-charcoal)] mb-6">Downloads</h2>
                  <ul className="flex flex-col gap-3">
                    {product.downloads.map((dl, i) => (
                      <li key={i}>
                        <a
                          href={dl.url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-3 p-4 rounded-[var(--radius-sm)] border border-[var(--color-warm-gray-light)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-colors group"
                        >
                          <Download size={18} className="text-[var(--color-warm-gray)] group-hover:text-[var(--color-gold)] transition-colors" />
                          <span className="text-sm font-medium">{dl.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Related products */}
        {related.length > 0 && (
          <div>
            <h2 className="font-heading text-2xl text-[var(--color-charcoal)] mb-8">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {related.map((rel) => (
                <Link
                  key={rel._id}
                  href={`/products/${rel.slug}`}
                  className="group block bg-white rounded-[var(--radius-card)] overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] transition-all"
                >
                  <div className="aspect-[4/3] bg-[var(--color-off-white)]">
                    {rel.gallery[0] && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={rel.gallery[0].url} alt={rel.gallery[0].alt} className="h-full w-full object-cover" />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-heading text-sm text-[var(--color-charcoal)] group-hover:text-[var(--color-gold)] transition-colors">
                      {rel.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
