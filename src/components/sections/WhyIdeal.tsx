"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

const reasons = [
  {
    title: "30+ Years of Excellence",
    description:
      "Three decades of crafting premium sanitaryware for homes and commercial spaces across India.",
  },
  {
    title: "In-House Manufacturing",
    description:
      "Every product is manufactured in our state-of-the-art facility under rigorous quality controls.",
  },
  {
    title: "7D Flush Technology",
    description:
      "Patented 360° flush technology delivers superior hygiene with every use.",
  },
  {
    title: "ISI & ISO Certified",
    description:
      "All products meet the highest industry standards for quality, safety, and durability.",
  },
  {
    title: "Anti-Bacterial Glaze",
    description:
      "Our proprietary glaze inhibits bacterial growth, keeping your bathroom healthier for longer.",
  },
  {
    title: "Nationwide Service",
    description:
      "Dedicated after-sales support and a wide dealer network across 500+ cities.",
  },
];

export function WhyIdeal() {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section ref={ref} className="py-24 bg-[var(--color-off-white)]" aria-labelledby="why-heading">
      <div className="max-w-[var(--container-max)] mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[var(--color-gold)] font-body text-sm uppercase tracking-[0.2em] mb-3">
            Why Choose Us
          </p>
          <h2
            id="why-heading"
            className="font-heading text-4xl md:text-5xl text-[var(--color-charcoal)]"
          >
            The Ideal Difference
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex gap-5"
            >
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 rounded-full bg-[var(--color-gold)] flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{i + 1}</span>
                </div>
              </div>
              <div>
                <h3 className="font-heading text-xl text-[var(--color-charcoal)] mb-2">
                  {reason.title}
                </h3>
                <p className="text-sm text-[var(--color-warm-gray)] leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
