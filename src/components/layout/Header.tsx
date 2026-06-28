"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { cn } from "@/utils/cn";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { Nav, navLinks } from "./Nav";
import { MobileMenu } from "./MobileMenu";
import { Button } from "@/components/ui/Button";

interface HeaderProps {
  /** When true, header starts transparent (for hero pages). */
  transparent?: boolean;
}

export function Header({ transparent = false }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollY = useScrollPosition();

  const isScrolled = scrollY > 80;
  const showSolid = !transparent || isScrolled;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-30 transition-all duration-300",
          showSolid
            ? "bg-white shadow-[var(--shadow-soft)]"
            : "bg-transparent"
        )}
      >
        <div className="max-w-[var(--container-max)] mx-auto px-6 lg:px-10 flex items-center justify-between h-18">
          {/* Logo */}
          <Link
            href="/"
            className={cn(
              "font-heading text-xl font-semibold tracking-tight transition-colors duration-300",
              showSolid ? "text-[var(--color-charcoal)]" : "text-white"
            )}
            aria-label="Ideal Bathware — Home"
          >
            Ideal Bathware
          </Link>

          {/* Desktop nav */}
          <Nav transparent={!showSolid} />

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              size="sm"
              className="hidden md:inline-flex"
              asChild={false}
              onClick={() => {
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Enquire Now
            </Button>
            <button
              className={cn(
                "md:hidden p-2 rounded-[var(--radius-sm)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]",
                showSolid
                  ? "text-[var(--color-charcoal)] hover:bg-[var(--color-off-white)]"
                  : "text-white hover:bg-white/10"
              )}
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Spacer — only when header is not transparent */}
      {!transparent && <div className="h-18" aria-hidden />}

      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={navLinks}
      />
    </>
  );
}
