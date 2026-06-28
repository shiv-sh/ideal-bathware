"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useInView } from "@/hooks/useInView";

const technologies = [
  { slug: "7d-flush", name: "7D Flush Technology", description: "360° powerful, silent flush" },
  { slug: "anti-bacterial-glaze", name: "Anti-Bacterial Glaze", description: "Hygiene-first surface protection" },
  { slug: "water-saving", name: "Water Saving", description: "Up to 6L per flush saved" },
  { slug: "soft-close-seat", name: "Soft Close Seat", description: "Gentle, noise-free closing" },
];

export function TechnologyStrip() {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section ref={ref} className="py-20 bg-[var(--color-charcoal)]" aria-labelledby="tech-heading">
      <div className="max-w-[var(--container-max)] mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-[var(--color-gold)] font-body text-sm uppercase tracking-[0.2em] mb-3">
            Innovation
          </p>
          <h2
            id="tech-heading"
            className="font-heading text-4xl md:text-5xl text-white"
          >
            Built-In Technology
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-[var(--radius-card)] overflow-hidden">
          {technologies.map((tech, i) => (
            <motion.div
              key={tech.slug}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href={`/technology/${tech.slug}`}
                className="group flex flex-col p-8 bg-[var(--color-charcoal)] hover:bg-white/5 transition-colors duration-300 h-full"
              >
                <div className="w-10 h-10 rounded-full border border-[var(--color-gold)] flex items-center justify-center mb-5 group-hover:bg-[var(--color-gold)] transition-colors">
                  <span className="w-3 h-3 rounded-sm bg-[var(--color-gold)] group-hover:bg-white transition-colors" aria-hidden />
                </div>
                <h3 className="font-heading text-lg text-white mb-2 group-hover:text-[var(--color-gold-light)] transition-colors">
                  {tech.name}
                </h3>
                <p className="text-sm text-[var(--color-warm-gray)] leading-relaxed">
                  {tech.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
