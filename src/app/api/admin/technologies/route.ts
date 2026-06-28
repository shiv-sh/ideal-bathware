import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Technology } from "@/lib/models/Technology";

async function requireAdmin() {
  const session = await auth();
  if (!session) return false;
  return true;
}

const TechnologySchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  shortDescription: z.string().min(1),
  fullDescription: z.string().min(1),
  icon: z.string().optional(),
});

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const technologies = await Technology.find().sort({ name: 1 }).lean();
  return NextResponse.json(technologies);
}

export async function POST(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body: unknown = await request.json();
  const result = TechnologySchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: "Invalid data", details: result.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  await connectDB();
  const technology = await Technology.create(result.data);
  return NextResponse.json(technology, { status: 201 });
}
