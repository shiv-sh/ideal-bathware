import type { MetadataRoute } from "next";
import { getAllProductSlugs } from "@/services/productService";
import { getAllCollectionSlugs } from "@/services/collectionService";
import { getAllTechnologySlugs } from "@/services/technologyService";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://idealbathware.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [productSlugs, collectionSlugs, technologySlugs] = await Promise.all([
    getAllProductSlugs().catch(() => [] as { slug: string; updatedAt: string }[]),
    getAllCollectionSlugs().catch(() => [] as { slug: string; updatedAt: string }[]),
    getAllTechnologySlugs().catch(() => [] as { slug: string; updatedAt: string }[]),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/products`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/collections`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/technology`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/catalogue`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  const productPages: MetadataRoute.Sitemap = productSlugs.map((p) => ({
    url: `${BASE_URL}/products/${p.slug}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const collectionPages: MetadataRoute.Sitemap = collectionSlugs.map((c) => ({
    url: `${BASE_URL}/collections/${c.slug}`,
    lastModified: new Date(c.updatedAt),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const technologyPages: MetadataRoute.Sitemap = technologySlugs.map((t) => ({
    url: `${BASE_URL}/technology/${t.slug}`,
    lastModified: new Date(t.updatedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...productPages, ...collectionPages, ...technologyPages];
}
