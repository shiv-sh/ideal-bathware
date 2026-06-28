import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Category } from "@/lib/models/Category";

async function requireAdmin() {
  const session = await auth();
  if (!session) return false;
  return true;
}

const CategorySchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional(),
  image: z.string().optional(),
  sortOrder: z.number().default(0),
});

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const categories = await Category.find().sort({ sortOrder: 1 }).lean();
  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body: unknown = await request.json();
  const result = CategorySchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: "Invalid data", details: result.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  await connectDB();
  const category = await Category.create(result.data);
  return NextResponse.json(category, { status: 201 });
}
