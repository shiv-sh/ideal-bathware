import mongoose, { type Model, type Document, type Types } from "mongoose";

interface ITechnologyDoc extends Document {
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  images: string[];
  relatedProducts: Types.ObjectId[];
}

const TechnologySchema = new mongoose.Schema<ITechnologyDoc>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    shortDescription: { type: String, required: true },
    fullDescription: { type: String, required: true },
    icon: { type: String, default: "" },
    images: [{ type: String }],
    relatedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

export const Technology: Model<ITechnologyDoc> =
  (mongoose.models["Technology"] as Model<ITechnologyDoc>) ??
  mongoose.model<ITechnologyDoc>("Technology", TechnologySchema);
