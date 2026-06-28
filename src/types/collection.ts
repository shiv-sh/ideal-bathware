import { z } from "zod";

export const CollectionSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional(),
  heroImage: z.string().optional(),
  gallery: z.array(z.string()).default([]),
});

export type CollectionInput = z.infer<typeof CollectionSchema>;

export interface ICollection {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  heroImage?: string;
  gallery: string[];
  productCount?: number;
  createdAt: string;
  updatedAt: string;
}
