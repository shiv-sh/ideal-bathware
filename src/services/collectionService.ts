import { connectDB } from "@/lib/db";
import { Collection } from "@/lib/models/Collection";
import type { ICollection } from "@/types/collection";

type RawDoc = Record<string, unknown>;

function toId(val: unknown): string {
  if (!val) return "";
  if (typeof val === "object" && val !== null && "toString" in val) {
    return (val as { toString(): string }).toString();
  }
  return String(val);
}

function normalizeCollection(doc: RawDoc): ICollection {
  return {
    _id: toId(doc["_id"]),
    name: String(doc["name"] ?? ""),
    slug: String(doc["slug"] ?? ""),
    description: doc["description"] ? String(doc["description"]) : undefined,
    heroImage: doc["heroImage"] ? String(doc["heroImage"]) : undefined,
    gallery: Array.isArray(doc["gallery"]) ? doc["gallery"].map(String) : [],
    productCount: Array.isArray(doc["products"]) ? doc["products"].length : undefined,
    createdAt: String(doc["createdAt"] ?? ""),
    updatedAt: String(doc["updatedAt"] ?? ""),
  };
}

export async function getAllCollections(): Promise<ICollection[]> {
  await connectDB();
  const docs = await Collection.find().sort({ createdAt: -1 }).lean<RawDoc[]>();
  return docs.map(normalizeCollection);
}

export async function getFeaturedCollections(limit = 3): Promise<ICollection[]> {
  await connectDB();
  const docs = await Collection.find().limit(limit).sort({ createdAt: -1 }).lean<RawDoc[]>();
  return docs.map(normalizeCollection);
}

export async function getCollectionBySlug(slug: string): Promise<ICollection | null> {
  await connectDB();
  const doc = await Collection.findOne({ slug }).lean<RawDoc>();
  if (!doc) return null;
  return normalizeCollection(doc);
}

export async function getAllCollectionSlugs(): Promise<{ slug: string; updatedAt: string }[]> {
  await connectDB();
  const docs = await Collection.find({}, "slug updatedAt").lean<
    { slug: string; updatedAt: Date }[]
  >();
  return docs.map((d) => ({ slug: d.slug, updatedAt: d.updatedAt.toISOString() }));
}
