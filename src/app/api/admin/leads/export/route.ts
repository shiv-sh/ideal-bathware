import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getAllLeads } from "@/services/leadService";

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { leads } = await getAllLeads(1, 10000);

  const headers = ["Name", "Email", "Phone", "Source", "Product", "Message", "Date"];
  const rows = leads.map((lead) => [
    `"${lead.name.replace(/"/g, '""')}"`,
    `"${lead.email}"`,
    `"${lead.phone}"`,
    `"${lead.source}"`,
    `"${lead.productSlug ?? ""}"`,
    `"${(lead.message ?? "").replace(/"/g, '""')}"`,
    `"${new Date(lead.createdAt).toISOString()}"`,
  ]);

  const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="leads-${Date.now()}.csv"`,
    },
  });
}
