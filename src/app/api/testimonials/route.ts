import { NextResponse } from "next/server";
import { createTestimonial, listApprovedTestimonials } from "@/lib/testimonials";
import { sendTestimonialNotification } from "@/lib/sendTestimonialNotification";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type TestimonialPayload = {
  name?: string;
  email?: string;
  className?: string;
  text?: string;
  anonymous?: boolean;
  publishConsent?: boolean;
  website?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const requestTimes = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("cf-connecting-ip") || "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (requestTimes.get(ip) ?? []).filter((time) => now - time < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX) {
    requestTimes.set(ip, recent);
    return true;
  }
  recent.push(now);
  requestTimes.set(ip, recent);
  return false;
}

export async function GET() {
  const testimonials = await listApprovedTestimonials();
  return NextResponse.json(
    { testimonials },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}

export async function POST(request: Request) {
  try {
    if (isRateLimited(getClientIp(request))) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 },
      );
    }

    const payload = (await request.json()) as TestimonialPayload;

    // Honeypot: bots often fill hidden fields. Return success without storing it.
    if (payload.website?.trim()) {
      return NextResponse.json({
        ok: true,
        message: "Thank you! Your testimonial was submitted for review.",
      });
    }

    const name = payload.name?.trim() ?? "";
    const email = payload.email?.trim().toLowerCase() ?? "";
    const className = payload.className?.trim() ?? "";
    const text = payload.text?.trim() ?? "";

    if (!name || !email || !className || !text) {
      return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
    }
    if (name.length > 100 || className.length > 100 || text.length > 1000) {
      return NextResponse.json({ error: "One or more fields are too long." }, { status: 400 });
    }
    if (!emailPattern.test(email) || email.length > 254) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }
    if (payload.publishConsent !== true) {
      return NextResponse.json(
        { error: "Please confirm that your testimonial may be published." },
        { status: 400 },
      );
    }

    const testimonial = await createTestimonial({
      name,
      email,
      className,
      text,
      anonymous: false,
      publishConsent: true,
    });

    try {
      await sendTestimonialNotification(testimonial);
    } catch (error) {
      console.error("Failed to send testimonial notification:", error);
    }

    return NextResponse.json(
      {
        ok: true,
        message: "Thank you! Your testimonial was submitted for review.",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Failed to submit testimonial:", error);
    return NextResponse.json(
      { error: "Your testimonial could not be submitted. Please try again." },
      { status: 500 },
    );
  }
}
