import { NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { LeadSchema } from "@/types/lead";
import { createLead } from "@/services/leadService";

// Only create rate limiter if Upstash env vars are set
const ratelimit =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Ratelimit({
        redis: Redis.fromEnv(),
        limiter: Ratelimit.slidingWindow(5, "1 h"),
        analytics: false,
      })
    : null;

export async function POST(request: Request) {
  try {
    // Rate limiting
    if (ratelimit) {
      const ip = request.headers.get("x-forwarded-for") ?? "anonymous";
      const { success } = await ratelimit.limit(ip);
      if (!success) {
        return NextResponse.json(
          { error: "Too many requests. Please try again later." },
          { status: 429 }
        );
      }
    }

    const body: unknown = await request.json();
    const result = LeadSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid data", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const lead = await createLead(result.data);
    return NextResponse.json(lead, { status: 201 });
  } catch (err) {
    console.error("[POST /api/leads]", err);
    return NextResponse.json({ error: "Failed to submit enquiry" }, { status: 500 });
  }
}
