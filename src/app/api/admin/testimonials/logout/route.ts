import { NextResponse } from "next/server";
import { testimonialAdminCookie } from "@/lib/testimonialAdminAuth";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(testimonialAdminCookie, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
  return response;
}
