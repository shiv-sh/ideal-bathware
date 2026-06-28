import { z } from "zod";

export const GalleryItemSchema = z.object({
  url: z.string().url(),
  alt: z.string(),
  publicId: z.string().optional(),
});

export const SpecificationSchema = z.record(z.string());

export const DownloadSchema = z.object({
  name: z.string(),
  url: z.string().url(),
});

export const ProductSchema = z.object({
  name: z.string().min(1).max(200),
  slug: z.string().min(1),
  sku: z.string().min(1),
  category: z.string(),
  collection: z.string().optional(),
  description: z.string(),
  features: z.array(z.string()).default([]),
  specifications: SpecificationSchema.default({}),
  gallery: z.array(GalleryItemSchema).default([]),
  downloads: z.array(DownloadSchema).default([]),
  status: z.enum(["active", "inactive", "discontinued"]).default("active"),
  isFeatured: z.boolean().default(false),
});

export type ProductInput = z.infer<typeof ProductSchema>;

export interface IGalleryItem {
  url: string;
  alt: string;
  publicId?: string;
}

export interface IDownload {
  name: string;
  url: string;
}

export interface IProduct {
  _id: string;
  id: string;
  name: string;
  slug: string;
  sku: string;
  category: { _id: string; name: string; slug: string } | string;
  collection?: { _id: string; name: string; slug: string } | string;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  gallery: IGalleryItem[];
  downloads: IDownload[];
  status: "active" | "inactive" | "discontinued";
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}
