import { connectDB } from "@/lib/db";
import { Lead } from "@/lib/models/Lead";
import type { ILead, LeadInput } from "@/types/lead";

type RawDoc = Record<string, unknown>;

function toId(val: unknown): string {
  if (!val) return "";
  if (typeof val === "object" && val !== null && "toString" in val) {
    return (val as { toString(): string }).toString();
  }
  return String(val);
}

function normalizeLead(doc: RawDoc): ILead {
  return {
    _id: toId(doc["_id"]),
    name: String(doc["name"] ?? ""),
    email: String(doc["email"] ?? ""),
    phone: String(doc["phone"] ?? ""),
    message: doc["message"] ? String(doc["message"]) : undefined,
    productSlug: doc["productSlug"] ? String(doc["productSlug"]) : undefined,
    source: doc["source"] as ILead["source"],
    createdAt: String(doc["createdAt"] ?? ""),
  };
}

export async function createLead(data: LeadInput): Promise<ILead> {
  await connectDB();
  const doc = await Lead.create(data);
  return normalizeLead(doc.toObject() as unknown as RawDoc);
}

export async function getAllLeads(page = 1, limit = 50): Promise<{ leads: ILead[]; total: number }> {
  await connectDB();
  const skip = (page - 1) * limit;
  const [docs, total] = await Promise.all([
    Lead.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean<RawDoc[]>(),
    Lead.countDocuments(),
  ]);
  return { leads: docs.map(normalizeLead), total };
}

export async function getLeadCount(): Promise<number> {
  await connectDB();
  return Lead.countDocuments();
}
