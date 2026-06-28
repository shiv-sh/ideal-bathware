import { z } from "zod";

export const LeadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(/^\+?[0-9\s\-()\\.]{7,20}$/, "Please enter a valid phone number"),
  message: z.string().max(500).optional(),
  productSlug: z.string().optional(),
  source: z.enum(["contact", "catalogue", "product_enquiry"]),
});

export type LeadInput = z.infer<typeof LeadSchema>;

export interface ILead {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message?: string;
  productSlug?: string;
  source: "contact" | "catalogue" | "product_enquiry";
  createdAt: string;
}
