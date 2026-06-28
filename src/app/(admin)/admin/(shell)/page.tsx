import { getLeadCount } from "@/services/leadService";
import { getProducts } from "@/services/productService";
import { getAllCategories } from "@/services/categoryService";

export default async function AdminDashboard() {
  const [leadCount, { total: productCount }, categories] = await Promise.all([
    getLeadCount(),
    getProducts({ limit: 1 }),
    getAllCategories(),
  ]);

  const stats = [
    { label: "Total Products", value: productCount },
    { label: "Categories", value: categories.length },
    { label: "Enquiries Received", value: leadCount },
  ];

  return (
    <div>
      <h1 className="font-heading text-3xl text-[var(--color-charcoal)] mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-[var(--radius-card)] shadow-[var(--shadow-card)] p-6"
          >
            <p className="text-[var(--color-warm-gray)] text-sm mb-1">{stat.label}</p>
            <p className="font-heading text-4xl text-[var(--color-charcoal)]">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[var(--radius-card)] shadow-[var(--shadow-card)] p-6">
        <h2 className="font-heading text-xl text-[var(--color-charcoal)] mb-4">Quick Links</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Add Product", href: "/admin/products" },
            { label: "View Leads", href: "/admin/leads" },
            { label: "Manage Collections", href: "/admin/collections" },
            { label: "View Site", href: "/", target: "_blank" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.target}
              className="block px-4 py-3 rounded-[var(--radius-sm)] border border-[var(--color-warm-gray-light)] text-sm text-center text-[var(--color-charcoal)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
