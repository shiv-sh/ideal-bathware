import { connectDB } from "@/lib/db";
import { Category } from "@/lib/models/Category";
import type { ICategory } from "@/types/category";

type RawDoc = Record<string, unknown>;

function toId(val: unknown): string {
  if (!val) return "";
  if (typeof val === "object" && val !== null && "toString" in val) {
    return (val as { toString(): string }).toString();
  }
  return String(val);
}

function normalizeCategory(doc: RawDoc): ICategory {
  return {
    _id: toId(doc["_id"]),
    name: String(doc["name"] ?? ""),
    slug: String(doc["slug"] ?? ""),
    description: doc["description"] ? String(doc["description"]) : undefined,
    image: doc["image"] ? String(doc["image"]) : undefined,
    sortOrder: Number(doc["sortOrder"] ?? 0),
    createdAt: String(doc["createdAt"] ?? ""),
    updatedAt: String(doc["updatedAt"] ?? ""),
  };
}

export async function getAllCategories(): Promise<ICategory[]> {
  await connectDB();
  const docs = await Category.find().sort({ sortOrder: 1 }).lean<RawDoc[]>();
  return docs.map(normalizeCategory);
}

export async function getCategoryBySlug(slug: string): Promise<ICategory | null> {
  await connectDB();
  const doc = await Category.findOne({ slug }).lean<RawDoc>();
  if (!doc) return null;
  return normalizeCategory(doc);
}
