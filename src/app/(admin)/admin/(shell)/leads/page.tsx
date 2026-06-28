import { getAllLeads } from "@/services/leadService";

export default async function AdminLeadsPage() {
  const { leads, total } = await getAllLeads();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl text-[var(--color-charcoal)]">Enquiries</h1>
          <p className="text-[var(--color-warm-gray)] text-sm mt-1">{total} total enquiries</p>
        </div>
        <a
          href="/api/admin/leads/export"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-[var(--radius-sm)] border border-[var(--color-charcoal)] text-sm font-medium text-[var(--color-charcoal)] hover:bg-[var(--color-charcoal)] hover:text-white transition-colors"
        >
          Export CSV
        </a>
      </div>

      <div className="bg-white rounded-[var(--radius-card)] shadow-[var(--shadow-card)] overflow-hidden">
        {leads.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-[var(--color-warm-gray)]">No enquiries yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[var(--color-off-white)]">
                <tr>
                  {["Name", "Email", "Phone", "Source", "Product", "Date"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 font-medium text-[var(--color-charcoal)]">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leads.map((lead, i) => (
                  <tr key={lead._id} className={i % 2 === 0 ? "bg-white" : "bg-[var(--color-off-white)]/50"}>
                    <td className="px-4 py-3 font-medium text-[var(--color-charcoal)]">{lead.name}</td>
                    <td className="px-4 py-3 text-[var(--color-warm-gray)]">{lead.email}</td>
                    <td className="px-4 py-3 text-[var(--color-warm-gray)]">{lead.phone}</td>
                    <td className="px-4 py-3">
                      <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-[var(--color-cream)] text-[var(--color-charcoal)] capitalize">
                        {lead.source.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[var(--color-warm-gray)]">{lead.productSlug ?? "—"}</td>
                    <td className="px-4 py-3 text-[var(--color-warm-gray)]">
                      {new Date(lead.createdAt).toLocaleDateString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
