import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";

export const testimonialAdminCookie = "testimonial_admin_session";
export const testimonialAdminSessionSeconds = 60 * 60 * 12;

function getAdminPassword() {
  return process.env.TESTIMONIALS_ADMIN_PASSWORD?.trim() || "";
}

function getSessionSecret() {
  return process.env.TESTIMONIALS_ADMIN_SESSION_SECRET?.trim() || "";
}

export function isTestimonialAdminConfigured() {
  return Boolean(getAdminPassword() && getSessionSecret());
}

function safeEqual(left: string, right: string) {
  const leftHash = createHmac("sha256", "testimonial-password-check").update(left).digest();
  const rightHash = createHmac("sha256", "testimonial-password-check").update(right).digest();
  return timingSafeEqual(leftHash, rightHash);
}

function sign(value: string) {
  const secret = getSessionSecret();
  if (!secret) return "";
  return createHmac("sha256", secret).update(value).digest("base64url");
}

export function verifyTestimonialAdminPassword(password: string) {
  const configuredPassword = getAdminPassword();
  return Boolean(configuredPassword) && safeEqual(password, configuredPassword);
}

export function createTestimonialAdminSession() {
  if (!isTestimonialAdminConfigured()) return null;
  const payload = Buffer.from(
    JSON.stringify({ expiresAt: Date.now() + testimonialAdminSessionSeconds * 1000 }),
  ).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function verifyTestimonialAdminSession(token: string | undefined) {
  if (!token || !isTestimonialAdminConfigured()) return false;
  const [payload, signature, extra] = token.split(".");
  if (!payload || !signature || extra) return false;
  if (!safeEqual(signature, sign(payload))) return false;

  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
      expiresAt?: unknown;
    };
    return typeof parsed.expiresAt === "number" && parsed.expiresAt > Date.now();
  } catch {
    return false;
  }
}

export function getCookieValue(request: Request, name: string) {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const match = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`));
  if (!match) return undefined;
  try {
    return decodeURIComponent(match.slice(name.length + 1));
  } catch {
    return undefined;
  }
}
