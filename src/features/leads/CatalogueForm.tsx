"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { LeadSchema, type LeadInput } from "@/types/lead";
import { Download } from "lucide-react";

export function CatalogueForm() {
  const [submitted, setSubmitted] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LeadInput>({
    resolver: zodResolver(LeadSchema),
    defaultValues: { source: "catalogue" },
  });

  async function onSubmit(data: LeadInput) {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const json = await res.json() as { downloadUrl?: string };
      setDownloadUrl(json.downloadUrl ?? null);
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <span className="text-green-600 text-2xl">✓</span>
        </div>
        <h3 className="font-heading text-2xl text-[var(--color-charcoal)] mb-2">
          Your Catalogue is Ready!
        </h3>
        <p className="text-[var(--color-warm-gray)] mb-6">
          Click below to download your free product catalogue.
        </p>
        <a
          href={downloadUrl ?? "#"}
          download="Ideal-Bathware-Catalogue.pdf"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-gold)] text-white rounded-[var(--radius-sm)] font-medium hover:bg-[var(--color-gold-dark)] transition-colors"
        >
          <Download size={18} />
          Download Catalogue
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
      <input type="hidden" {...register("source")} />
      <Input
        label="Full Name"
        placeholder="Your name"
        error={errors.name?.message}
        {...register("name")}
      />
      <Input
        label="Email Address"
        type="email"
        placeholder="you@example.com"
        error={errors.email?.message}
        {...register("email")}
      />
      <Input
        label="Phone Number"
        type="tel"
        placeholder="+91 98765 43210"
        error={errors.phone?.message}
        {...register("phone")}
      />
      <Button type="submit" variant="secondary" size="lg" disabled={isSubmitting}>
        {isSubmitting ? "Processing..." : "Get Free Catalogue"}
      </Button>
      <p className="text-xs text-[var(--color-warm-gray)] text-center">
        By submitting this form, you agree to receive occasional product updates from Ideal Bathware.
      </p>
    </form>
  );
}
