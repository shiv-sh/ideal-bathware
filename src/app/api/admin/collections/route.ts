import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Collection } from "@/lib/models/Collection";

async function requireAdmin() {
  const session = await auth();
  if (!session) return false;
  return true;
}

const CollectionSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional(),
  heroImage: z.string().optional(),
});

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const collections = await Collection.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(collections);
}

export async function POST(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body: unknown = await request.json();
  const result = CollectionSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: "Invalid data", details: result.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  await connectDB();
  const collection = await Collection.create(result.data);
  return NextResponse.json(collection, { status: 201 });
}
