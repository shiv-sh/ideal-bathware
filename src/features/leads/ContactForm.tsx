"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { LeadSchema, type LeadInput } from "@/types/lead";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LeadInput>({
    resolver: zodResolver(LeadSchema),
    defaultValues: { source: "contact" },
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

  if (submitted) {
    return (
      <div className="text-center py-12 rounded-[var(--radius-card)] bg-[var(--color-off-white)]">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <span className="text-green-600 text-2xl">✓</span>
        </div>
        <h3 className="font-heading text-2xl text-[var(--color-charcoal)] mb-2">Message Sent!</h3>
        <p className="text-[var(--color-warm-gray)]">
          We&apos;ll get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
      <input type="hidden" {...register("source")} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label="Full Name"
          placeholder="Your name"
          error={errors.name?.message}
          autoComplete="name"
          {...register("name")}
        />
        <Input
          label="Phone Number"
          type="tel"
          placeholder="+91 98765 43210"
          error={errors.phone?.message}
          autoComplete="tel"
          {...register("phone")}
        />
      </div>
      <Input
        label="Email Address"
        type="email"
        placeholder="you@example.com"
        error={errors.email?.message}
        autoComplete="email"
        {...register("email")}
      />
      <Textarea
        label="Message"
        placeholder="How can we help you?"
        error={errors.message?.message}
        rows={5}
        {...register("message")}
      />
      <Button type="submit" variant="primary" size="lg" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
