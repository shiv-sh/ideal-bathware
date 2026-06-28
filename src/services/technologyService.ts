import { connectDB } from "@/lib/db";
import { Technology } from "@/lib/models/Technology";
import type { ITechnology } from "@/types/technology";

type RawDoc = Record<string, unknown>;

function toId(val: unknown): string {
  if (!val) return "";
  if (typeof val === "object" && val !== null && "toString" in val) {
    return (val as { toString(): string }).toString();
  }
  return String(val);
}

function normalizeTechnology(doc: RawDoc): ITechnology {
  return {
    _id: toId(doc["_id"]),
    name: String(doc["name"] ?? ""),
    slug: String(doc["slug"] ?? ""),
    shortDescription: String(doc["shortDescription"] ?? ""),
    fullDescription: String(doc["fullDescription"] ?? ""),
    icon: doc["icon"] ? String(doc["icon"]) : undefined,
    images: Array.isArray(doc["images"]) ? doc["images"].map(String) : [],
    relatedProducts: Array.isArray(doc["relatedProducts"])
      ? doc["relatedProducts"].map(toId)
      : [],
    createdAt: String(doc["createdAt"] ?? ""),
    updatedAt: String(doc["updatedAt"] ?? ""),
  };
}

export async function getAllTechnologies(): Promise<ITechnology[]> {
  await connectDB();
  const docs = await Technology.find().sort({ name: 1 }).lean<RawDoc[]>();
  return docs.map(normalizeTechnology);
}

export async function getTechnologyBySlug(slug: string): Promise<ITechnology | null> {
  await connectDB();
  const doc = await Technology.findOne({ slug }).lean<RawDoc>();
  if (!doc) return null;
  return normalizeTechnology(doc);
}

export async function getAllTechnologySlugs(): Promise<{ slug: string; updatedAt: string }[]> {
  await connectDB();
  const docs = await Technology.find({}, "slug updatedAt").lean<
    { slug: string; updatedAt: Date }[]
  >();
  return docs.map((d) => ({ slug: d.slug, updatedAt: d.updatedAt.toISOString() }));
}
