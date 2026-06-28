"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { cn } from "@/utils/cn";
import {
  LayoutDashboard,
  Package,
  FolderOpen,
  Layers,
  Cpu,
  Inbox,
  LogOut,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: FolderOpen },
  { href: "/admin/collections", label: "Collections", icon: Layers },
  { href: "/admin/technologies", label: "Technologies", icon: Cpu },
  { href: "/admin/leads", label: "Leads", icon: Inbox },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 flex-shrink-0 bg-[var(--color-charcoal)] min-h-screen flex flex-col">
      <div className="p-6 border-b border-white/10">
        <p className="font-heading text-lg text-white">Ideal Bathware</p>
        <p className="text-xs text-[var(--color-warm-gray)] mt-0.5">Admin Dashboard</p>
      </div>

      <nav className="flex-1 p-4 flex flex-col gap-1">
        {navItems.map((item) => {
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-[var(--radius-sm)] text-sm transition-colors",
                active
                  ? "bg-[var(--color-gold)] text-white font-medium"
                  : "text-[var(--color-warm-gray)] hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon size={18} aria-hidden />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex items-center gap-3 px-4 py-2.5 w-full rounded-[var(--radius-sm)] text-sm text-[var(--color-warm-gray)] hover:text-white hover:bg-white/5 transition-colors"
        >
          <LogOut size={18} aria-hidden />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
