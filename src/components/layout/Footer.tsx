import Link from "next/link";
import { navLinks } from "./Nav";

const productCategories = [
  { label: "One Piece Closets", href: "/products?category=one-piece-closets" },
  { label: "Wall Hung Closets", href: "/products?category=wall-hung-closets" },
  { label: "Water Closets", href: "/products?category=water-closets" },
  { label: "Wash Basins", href: "/products?category=wash-basins" },
  { label: "Pedestal Basins", href: "/products?category=pedestal-basins" },
  { label: "Urinals", href: "/products?category=urinals" },
];

const collections = [
  { label: "Urban Collection", href: "/collections/urban" },
  { label: "Luxury Collection", href: "/collections/luxury" },
  { label: "Minimal Collection", href: "/collections/minimal" },
  { label: "Commercial Collection", href: "/collections/commercial" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-charcoal)] text-white" role="contentinfo">
      <div className="max-w-[var(--container-max)] mx-auto px-6 lg:px-10 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <p className="font-heading text-2xl font-semibold text-white mb-4">
              Ideal Bathware
            </p>
            <p className="text-sm text-[var(--color-warm-gray)] leading-relaxed mb-6">
              Premium sanitaryware crafted for modern living. Elevate your bathroom experience with
              quality and elegance.
            </p>
            <div className="flex gap-4">
              <a
                href="https://wa.me/911234567890"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="text-[var(--color-warm-gray)] hover:text-[var(--color-gold)] transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-body font-semibold text-sm uppercase tracking-widest text-[var(--color-gold)] mb-4">
              Company
            </h3>
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--color-warm-gray)] hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-body font-semibold text-sm uppercase tracking-widest text-[var(--color-gold)] mb-4">
              Products
            </h3>
            <ul className="flex flex-col gap-2">
              {productCategories.map((cat) => (
                <li key={cat.href}>
                  <Link
                    href={cat.href}
                    className="text-sm text-[var(--color-warm-gray)] hover:text-white transition-colors"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Collections */}
          <div>
            <h3 className="font-body font-semibold text-sm uppercase tracking-widest text-[var(--color-gold)] mb-4">
              Collections
            </h3>
            <ul className="flex flex-col gap-2">
              {collections.map((col) => (
                <li key={col.href}>
                  <Link
                    href={col.href}
                    className="text-sm text-[var(--color-warm-gray)] hover:text-white transition-colors"
                  >
                    {col.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[var(--color-warm-gray)]">
            &copy; {year} Ideal Bathware. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-sm text-[var(--color-warm-gray)] hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-[var(--color-warm-gray)] hover:text-white transition-colors"
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
