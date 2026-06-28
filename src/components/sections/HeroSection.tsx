"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-screen min-h-[600px] flex items-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Parallax background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0"
        aria-hidden
      >
        {/* Placeholder gradient until real Cloudinary image is wired */}
        <div className="h-full w-full bg-gradient-to-br from-[var(--color-charcoal)] via-[#4a4a4a] to-[#2a2a2a]" />
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-[var(--container-max)] mx-auto px-6 lg:px-10 w-full"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
          className="max-w-2xl"
        >
          <p className="text-[var(--color-gold)] font-body text-sm uppercase tracking-[0.2em] mb-4">
            Premium Sanitaryware
          </p>
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6">
            Elevate Your{" "}
            <span className="italic text-[var(--color-gold-light)]">Bathroom</span>{" "}
            Experience
          </h1>
          <p className="text-white/80 text-lg leading-relaxed mb-10 max-w-lg">
            Discover our collection of premium sanitaryware — crafted with precision, designed for
            lasting elegance.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="secondary" size="lg" asChild={false}>
              <Link href="/collections" className="flex items-center gap-2">
                Explore Collections <ArrowRight size={18} />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-[var(--color-charcoal)]"
            >
              <Link href="/catalogue">Download Catalogue</Link>
            </Button>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        aria-hidden
      >
        <span className="text-white/60 text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
