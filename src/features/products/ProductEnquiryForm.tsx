"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { LeadSchema, type LeadInput } from "@/types/lead";
import { MessageCircle } from "lucide-react";

interface ProductEnquiryFormProps {
  productName: string;
  productSlug: string;
}

export function ProductEnquiryForm({ productName, productSlug }: ProductEnquiryFormProps) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LeadInput>({
    resolver: zodResolver(LeadSchema),
    defaultValues: { source: "product_enquiry", productSlug },
  });

  async function onSubmit(data: LeadInput) {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setSubmitted(true);
      reset();
    }
  }

  return (
    <>
      <Button variant="primary" size="lg" onClick={() => setOpen(true)} className="w-full">
        Enquire Now
      </Button>

      <Modal
        open={open}
        onOpenChange={(v) => {
          setOpen(v);
          if (!v) setSubmitted(false);
        }}
        title={submitted ? "Thank You!" : `Enquire About ${productName}`}
        description={
          submitted
            ? "We've received your enquiry and will contact you shortly."
            : "Fill in your details and our team will get back to you within 24 hours."
        }
      >
        {submitted ? (
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <span className="text-green-600 text-2xl">✓</span>
            </div>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <input type="hidden" {...register("source")} />
            <input type="hidden" {...register("productSlug")} />
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
            <Textarea
              label="Message (optional)"
              placeholder="Any specific requirements or questions?"
              error={errors.message?.message}
              {...register("message")}
            />
            <Button type="submit" variant="primary" size="lg" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Enquiry"}
            </Button>
          </form>
        )}
      </Modal>

      <a
        href={`https://wa.me/911234567890?text=${encodeURIComponent(`Hi, I'm interested in ${productName} (${productSlug}). Can you share more details?`)}`}
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-center gap-2 h-11 w-full rounded-[var(--radius-sm)] border border-[var(--color-charcoal)] text-[var(--color-charcoal)] hover:bg-[var(--color-charcoal)] hover:text-white transition-all duration-200 text-sm font-medium"
      >
        <MessageCircle size={18} />
        WhatsApp Us
      </a>
    </>
  );
}
