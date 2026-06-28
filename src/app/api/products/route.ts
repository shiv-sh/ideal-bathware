import { NextResponse } from "next/server";
import { getProducts } from "@/services/productService";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
    const limit = Math.min(24, Math.max(1, parseInt(searchParams.get("limit") ?? "12", 10)));
    const category = searchParams.get("category") ?? undefined;
    const collection = searchParams.get("collection") ?? undefined;
    const search = searchParams.get("search") ?? undefined;

    const result = await getProducts({ page, limit, category, collection, search });
    return NextResponse.json(result);
  } catch (err) {
    console.error("[GET /api/products]", err);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
