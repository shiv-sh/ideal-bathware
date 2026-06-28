import { z } from "zod";

export const TechnologySchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  shortDescription: z.string(),
  fullDescription: z.string(),
  icon: z.string().optional(),
  images: z.array(z.string()).default([]),
});

export type TechnologyInput = z.infer<typeof TechnologySchema>;

export interface ITechnology {
  _id: string;
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  icon?: string;
  images: string[];
  relatedProducts: string[];
  createdAt: string;
  updatedAt: string;
}
