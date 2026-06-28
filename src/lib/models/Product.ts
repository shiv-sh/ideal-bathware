import mongoose, { type Model, type Document, type Types } from "mongoose";

interface IGalleryItemDoc {
  url: string;
  alt: string;
  publicId: string;
}

interface IDownloadDoc {
  name: string;
  url: string;
}

// Omit 'collection' because Mongoose Document already defines it as the MongoDB Collection object.
// Our field 'collection' (a reference to a Collection document) must be excluded from the Document interface.
interface IProductDoc extends Omit<Document, "collection"> {
  name: string;
  slug: string;
  sku: string;
  category: Types.ObjectId;
  collection: Types.ObjectId | null;
  description: string;
  features: string[];
  specifications: Map<string, string>;
  gallery: IGalleryItemDoc[];
  downloads: IDownloadDoc[];
  status: "active" | "inactive" | "discontinued";
  isFeatured: boolean;
}

const GalleryItemSchema = new mongoose.Schema<IGalleryItemDoc>(
  { url: { type: String, required: true }, alt: { type: String, required: true }, publicId: { type: String, default: "" } },
  { _id: false }
);

const DownloadSchema = new mongoose.Schema<IDownloadDoc>(
  { name: { type: String, required: true }, url: { type: String, required: true } },
  { _id: false }
);

const ProductSchema = new mongoose.Schema<IProductDoc>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    sku: { type: String, required: true, unique: true, uppercase: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    collection: { type: mongoose.Schema.Types.ObjectId, ref: "Collection", default: null },
    description: { type: String, required: true },
    features: [{ type: String }],
    specifications: { type: Map, of: String, default: {} },
    gallery: [GalleryItemSchema],
    downloads: [DownloadSchema],
    status: { type: String, enum: ["active", "inactive", "discontinued"], default: "active" },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

ProductSchema.index({ slug: 1 });
ProductSchema.index({ category: 1, status: 1 });
ProductSchema.index({ isFeatured: 1, status: 1 });

export const Product: Model<IProductDoc> =
  (mongoose.models["Product"] as Model<IProductDoc>) ??
  mongoose.model<IProductDoc>("Product", ProductSchema);
