"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useInView } from "@/hooks/useInView";
import { Button } from "@/components/ui/Button";
import { Phone, MessageCircle } from "lucide-react";

export function ContactCTA() {
  const { ref, inView } = useInView({ threshold: 0.2 });

  return (
    <section
      id="contact"
      ref={ref}
      className="py-24 bg-[var(--color-charcoal)]"
      aria-labelledby="contact-cta-heading"
    >
      <div className="max-w-[var(--container-max)] mx-auto px-6 lg:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-[var(--color-gold)] font-body text-sm uppercase tracking-[0.2em] mb-4">
            Get In Touch
          </p>
          <h2
            id="contact-cta-heading"
            className="font-heading text-4xl md:text-5xl text-white mb-6"
          >
            Ready to Transform Your Bathroom?
          </h2>
          <p className="text-white/70 text-lg leading-relaxed max-w-xl mx-auto mb-10">
            Our team of experts is ready to help you find the perfect sanitaryware for your project.
            Talk to us today.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button variant="secondary" size="lg" asChild={false}>
              <Link href="/contact" className="flex items-center gap-2">
                <Phone size={18} />
                Contact Us
              </Link>
            </Button>
            <a
              href="https://wa.me/911234567890"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 h-14 px-8 text-lg font-medium rounded-[var(--radius-sm)] border border-white text-white hover:bg-white hover:text-[var(--color-charcoal)] transition-all duration-200"
            >
              <MessageCircle size={18} />
              WhatsApp Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
