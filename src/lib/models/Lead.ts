import mongoose, { type Model, type Document } from "mongoose";

interface ILeadDoc extends Document {
  name: string;
  email: string;
  phone: string;
  message: string;
  productSlug: string;
  source: "contact" | "catalogue" | "product_enquiry";
}

const LeadSchema = new mongoose.Schema<ILeadDoc>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true },
    message: { type: String, default: "" },
    productSlug: { type: String, default: "" },
    source: { type: String, enum: ["contact", "catalogue", "product_enquiry"], required: true },
  },
  { timestamps: true }
);

export const Lead: Model<ILeadDoc> =
  (mongoose.models["Lead"] as Model<ILeadDoc>) ??
  mongoose.model<ILeadDoc>("Lead", LeadSchema);
