import { connectDB } from "@/lib/db";
import { Product } from "@/lib/models/Product";
import "@/lib/models/Collection";
import "@/lib/models/Category";
import type { IProduct } from "@/types/product";

interface ProductFilters {
  category?: string;
  collection?: string;
  search?: string;
  page?: number;
  limit?: number;
  featuredOnly?: boolean;
}

interface ProductListResult {
  products: IProduct[];
  total: number;
  page: number;
  totalPages: number;
}

type RawDoc = Record<string, unknown>;

function toId(val: unknown): string {
  if (!val) return "";
  if (typeof val === "object" && val !== null && "toString" in val) {
    return (val as { toString(): string }).toString();
  }
  return String(val);
}

function toRefObject(val: unknown): { _id: string; name: string; slug: string } | string {
  if (val && typeof val === "object" && "_id" in val) {
    const v = val as RawDoc;
    return { _id: toId(v["_id"]), name: String(v["name"] ?? ""), slug: String(v["slug"] ?? "") };
  }
  return toId(val);
}

function normalizeProduct(doc: RawDoc): IProduct {
  const specs = doc["specifications"];
  const specObj: Record<string, string> =
    specs instanceof Map
      ? Object.fromEntries(specs)
      : specs && typeof specs === "object"
        ? (specs as Record<string, string>)
        : {};

  return {
    _id: toId(doc["_id"]),
    id: toId(doc["_id"]),
    name: String(doc["name"] ?? ""),
    slug: String(doc["slug"] ?? ""),
    sku: String(doc["sku"] ?? ""),
    category: toRefObject(doc["category"]),
    collection: doc["collection"] ? toRefObject(doc["collection"]) : undefined,
    description: String(doc["description"] ?? ""),
    features: Array.isArray(doc["features"]) ? doc["features"].map(String) : [],
    specifications: specObj,
    gallery: Array.isArray(doc["gallery"])
      ? doc["gallery"].map((g) => ({
          url: String((g as RawDoc)["url"] ?? ""),
          alt: String((g as RawDoc)["alt"] ?? ""),
          publicId: String((g as RawDoc)["publicId"] ?? ""),
        }))
      : [],
    downloads: Array.isArray(doc["downloads"])
      ? doc["downloads"].map((d) => ({
          name: String((d as RawDoc)["name"] ?? ""),
          url: String((d as RawDoc)["url"] ?? ""),
        }))
      : [],
    status: (doc["status"] as IProduct["status"]) ?? "active",
    isFeatured: Boolean(doc["isFeatured"]),
    createdAt: String(doc["createdAt"] ?? ""),
    updatedAt: String(doc["updatedAt"] ?? ""),
  };
}

export async function getProducts(filters: ProductFilters = {}): Promise<ProductListResult> {
  await connectDB();

  const { category, collection, search, page = 1, limit = 12, featuredOnly = false } = filters;

  const query: Record<string, unknown> = { status: "active" };
  if (category) query["category"] = category;
  if (collection) query["collection"] = collection;
  if (featuredOnly) query["isFeatured"] = true;
  if (search) {
    query["$or"] = [
      { name: { $regex: search, $options: "i" } },
      { sku: { $regex: search, $options: "i" } },
    ];
  }

  const skip = (page - 1) * limit;

  const [rawDocs, total] = await Promise.all([
    Product.find(query)
      .populate("category", "name slug")
      .populate("collection", "name slug")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean<RawDoc[]>(),
    Product.countDocuments(query),
  ]);

  return {
    products: rawDocs.map(normalizeProduct),
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getProductBySlug(slug: string): Promise<IProduct | null> {
  await connectDB();

  const doc = await Product.findOne({ slug, status: "active" })
    .populate("category", "name slug")
    .populate("collection", "name slug")
    .lean<RawDoc>();

  if (!doc) return null;
  return normalizeProduct(doc);
}

export async function getFeaturedProducts(limit = 4): Promise<IProduct[]> {
  await connectDB();

  const docs = await Product.find({ isFeatured: true, status: "active" })
    .populate("category", "name slug")
    .limit(limit)
    .sort({ createdAt: -1 })
    .lean<RawDoc[]>();

  return docs.map(normalizeProduct);
}

export async function getRelatedProducts(
  slug: string,
  categoryId: string,
  limit = 4
): Promise<IProduct[]> {
  await connectDB();

  const docs = await Product.find({
    category: categoryId,
    slug: { $ne: slug },
    status: "active",
  })
    .populate("category", "name slug")
    .limit(limit)
    .lean<RawDoc[]>();

  return docs.map(normalizeProduct);
}

export async function getAllProductSlugs(): Promise<{ slug: string; updatedAt: string }[]> {
  await connectDB();
  const docs = await Product.find({ status: "active" }, "slug updatedAt").lean<
    { slug: string; updatedAt: Date }[]
  >();
  return docs.map((d) => ({ slug: d.slug, updatedAt: d.updatedAt.toISOString() }));
}
