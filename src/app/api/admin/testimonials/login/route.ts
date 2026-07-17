import { NextResponse } from "next/server";
import {
  createTestimonialAdminSession,
  isTestimonialAdminConfigured,
  testimonialAdminCookie,
  verifyTestimonialAdminPassword,
} from "@/lib/testimonialAdminAuth";

export const runtime = "nodejs";

const attempts = new Map<string, number[]>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 10;

function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("cf-connecting-ip") || "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (attempts.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_ATTEMPTS) return true;
  recent.push(now);
  attempts.set(ip, recent);
  return false;
}

export async function POST(request: Request) {
  if (!isTestimonialAdminConfigured()) {
    return NextResponse.json(
      { error: "Testimonial admin access is not configured." },
      { status: 503 },
    );
  }

  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many attempts. Try again later." }, { status: 429 });
  }

  try {
    const payload = (await request.json()) as { password?: string };
    if (!payload.password || !verifyTestimonialAdminPassword(payload.password)) {
      return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
    }

    attempts.delete(ip);
    const token = createTestimonialAdminSession();
    if (!token) {
      return NextResponse.json({ error: "Admin access is not configured." }, { status: 503 });
    }

    const response = NextResponse.json({ ok: true });
    // No maxAge: a session cookie is discarded when the browser closes,
    // so the admin is signed out as soon as they close the page.
    response.cookies.set(testimonialAdminCookie, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });
    return response;
  } catch {
    return NextResponse.json({ error: "Unable to sign in." }, { status: 400 });
  }
}
