import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Product } from "@/lib/models/Product";
import { ProductSchema } from "@/types/product";

async function requireAdmin() {
  const session = await auth();
  if (!session) return false;
  return true;
}

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await connectDB();
  const products = await Product.find()
    .populate("category", "name slug")
    .sort({ createdAt: -1 })
    .lean();
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body: unknown = await request.json();
  const result = ProductSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: "Invalid data", details: result.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  await connectDB();
  try {
    const product = await Product.create(result.data);
    return NextResponse.json(product, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Database error";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
