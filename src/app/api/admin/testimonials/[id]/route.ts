import { NextResponse } from "next/server";
import {
  getCookieValue,
  testimonialAdminCookie,
  verifyTestimonialAdminSession,
} from "@/lib/testimonialAdminAuth";
import { updateTestimonialStatus } from "@/lib/testimonials";
import type { TestimonialStatus } from "@/types/testimonial";

export const runtime = "nodejs";

const allowedStatuses = new Set<TestimonialStatus>(["approved", "rejected"]);

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const token = getCookieValue(request, testimonialAdminCookie);
  if (!verifyTestimonialAdminSession(token)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const payload = (await request.json()) as { status?: TestimonialStatus };
    if (!payload.status || !allowedStatuses.has(payload.status)) {
      return NextResponse.json({ error: "Invalid status." }, { status: 400 });
    }

    const { id } = await context.params;
    const testimonial = await updateTestimonialStatus(id, payload.status);
    if (!testimonial) {
      return NextResponse.json({ error: "Testimonial not found." }, { status: 404 });
    }

    return NextResponse.json({ ok: true, status: testimonial.status });
  } catch (error) {
    console.error("Failed to update testimonial:", error);
    return NextResponse.json({ error: "Unable to update testimonial." }, { status: 500 });
  }
}
