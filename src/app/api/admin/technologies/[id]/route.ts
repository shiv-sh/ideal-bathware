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

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body: unknown = await request.json();
  const result = TechnologySchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: "Invalid data", details: result.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  await connectDB();

  const technology = await Technology.findByIdAndUpdate(id, result.data, {
    new: true,
    runValidators: true,
  }).lean();

  if (!technology) {
    return NextResponse.json(
      { error: "Technology not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(technology);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await connectDB();

  const technology = await Technology.findByIdAndDelete(id).lean();

  if (!technology) {
    return NextResponse.json(
      { error: "Technology not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ message: "Technology deleted successfully" });
}
