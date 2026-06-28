"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";
import type { NavLink } from "./Nav";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: NavLink[];
}

export function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.nav
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            aria-label="Mobile navigation"
            className="fixed right-0 top-0 z-50 h-full w-72 bg-white shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-[var(--color-warm-gray-light)]">
              <span className="font-heading text-lg text-[var(--color-charcoal)]">Menu</span>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="p-2 rounded-[var(--radius-sm)] text-[var(--color-warm-gray)] hover:text-[var(--color-charcoal)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
              >
                <X size={20} />
              </button>
            </div>
            <ul className="flex flex-col p-6 gap-1">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="block px-4 py-3 font-body text-[var(--color-charcoal)] hover:text-[var(--color-gold)] hover:bg-[var(--color-off-white)] rounded-[var(--radius-sm)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-auto p-6 border-t border-[var(--color-warm-gray-light)]">
              <p className="text-sm text-[var(--color-warm-gray)]">
                Premium Sanitaryware Since 1990
              </p>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
