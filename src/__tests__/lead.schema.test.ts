import { describe, it, expect } from "vitest";
import { LeadSchema } from "@/types/lead";

describe("LeadSchema", () => {
  it("accepts valid lead data", () => {
    const result = LeadSchema.safeParse({
      name: "Ramesh Kumar",
      email: "ramesh@example.com",
      phone: "+91 98765 43210",
      source: "contact",
    });
    expect(result.success).toBe(true);
  });

  it("rejects name too short", () => {
    const result = LeadSchema.safeParse({
      name: "R",
      email: "r@example.com",
      phone: "9876543210",
      source: "contact",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = LeadSchema.safeParse({
      name: "Ramesh Kumar",
      email: "not-an-email",
      phone: "9876543210",
      source: "contact",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid source", () => {
    const result = LeadSchema.safeParse({
      name: "Ramesh Kumar",
      email: "r@example.com",
      phone: "9876543210",
      source: "unknown",
    });
    expect(result.success).toBe(false);
  });

  it("allows optional message", () => {
    const result = LeadSchema.safeParse({
      name: "Ramesh Kumar",
      email: "r@example.com",
      phone: "9876543210",
      source: "product_enquiry",
      productSlug: "aqua-one-piece",
      message: "I need more details about this product.",
    });
    expect(result.success).toBe(true);
  });
});
