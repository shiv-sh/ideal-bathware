import Link from "next/link";
import { cn } from "@/utils/cn";

export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Collections", href: "/collections" },
  { label: "Products", href: "/products" },
  { label: "Technology", href: "/technology" },
  { label: "About", href: "/about" },
  { label: "Catalogue", href: "/catalogue" },
  { label: "Contact", href: "/contact" },
];

interface NavProps {
  transparent?: boolean;
}

export function Nav({ transparent = false }: NavProps) {
  return (
    <nav aria-label="Main navigation" className="hidden md:flex items-center gap-1">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-[var(--radius-sm)] transition-colors duration-200 relative group",
            transparent
              ? "text-white hover:text-[var(--color-gold-light)]"
              : "text-[var(--color-charcoal)] hover:text-[var(--color-gold)]"
          )}
        >
          {link.label}
          <span className="absolute bottom-1 left-4 right-4 h-px bg-[var(--color-gold)] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
        </Link>
      ))}
    </nav>
  );
}
