"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useInView } from "@/hooks/useInView";
import { Button } from "@/components/ui/Button";
import { BookOpen } from "lucide-react";

export function CatalogueCTA() {
  const { ref, inView } = useInView({ threshold: 0.2 });

  return (
    <section
      ref={ref}
      className="py-24 bg-[var(--color-cream)]"
      aria-labelledby="catalogue-heading"
    >
      <div className="max-w-[var(--container-max)] mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row items-center justify-between gap-10 rounded-[var(--radius-card)] bg-white p-10 md:p-16 shadow-[var(--shadow-card)]"
        >
          <div className="flex-1 text-center md:text-left">
            <p className="text-[var(--color-gold)] font-body text-sm uppercase tracking-[0.2em] mb-3">
              Free Download
            </p>
            <h2
              id="catalogue-heading"
              className="font-heading text-3xl md:text-4xl text-[var(--color-charcoal)] mb-4"
            >
              Download Our Product Catalogue
            </h2>
            <p className="text-[var(--color-warm-gray)] leading-relaxed max-w-md">
              Explore our complete range of premium sanitaryware. Over 200 products with
              specifications, dimensions, and installation details — all in one document.
            </p>
          </div>
          <div className="flex-shrink-0">
            <BookOpen
              size={80}
              className="text-[var(--color-gold)] mb-6 mx-auto md:mx-0"
              aria-hidden
            />
            <Button variant="primary" size="lg" asChild={false}>
              <Link href="/catalogue">Get Free Catalogue</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
