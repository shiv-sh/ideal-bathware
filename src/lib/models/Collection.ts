import mongoose, { type Model, type Document, type Types } from "mongoose";

interface ICollectionDoc extends Document {
  name: string;
  slug: string;
  description: string;
  heroImage: string;
  gallery: string[];
  products: Types.ObjectId[];
}

const CollectionSchema = new mongoose.Schema<ICollectionDoc>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, default: "" },
    heroImage: { type: String, default: "" },
    gallery: [{ type: String }],
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

export const Collection: Model<ICollectionDoc> =
  (mongoose.models["Collection"] as Model<ICollectionDoc>) ??
  mongoose.model<ICollectionDoc>("Collection", CollectionSchema);
