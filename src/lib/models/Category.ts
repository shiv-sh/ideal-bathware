import mongoose, { type Model, type Document } from "mongoose";

interface ICategoryDoc extends Document {
  name: string;
  slug: string;
  description: string;
  image: string;
  sortOrder: number;
}

const CategorySchema = new mongoose.Schema<ICategoryDoc>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Category: Model<ICategoryDoc> =
  (mongoose.models["Category"] as Model<ICategoryDoc>) ??
  mongoose.model<ICategoryDoc>("Category", CategorySchema);
