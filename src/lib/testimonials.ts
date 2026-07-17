import "server-only";

import { access, mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import type { PublicTestimonial, StoredTestimonial, TestimonialStatus } from "@/types/testimonial";

const dataDir = path.join(process.cwd(), "data");
const testimonialsFile = path.join(dataDir, "testimonials.json");
const testimonialsTempFile = path.join(dataDir, "testimonials.json.tmp");

let writeQueue: Promise<void> = Promise.resolve();

function isStatus(value: unknown): value is TestimonialStatus {
  return value === "pending" || value === "approved" || value === "rejected";
}

function isStoredTestimonial(value: unknown): value is StoredTestimonial {
  if (!value || typeof value !== "object") return false;
  const record = value as Partial<StoredTestimonial>;

  return (
    typeof record.id === "string" &&
    typeof record.submittedAt === "string" &&
    typeof record.updatedAt === "string" &&
    typeof record.name === "string" &&
    typeof record.email === "string" &&
    typeof record.className === "string" &&
    typeof record.text === "string" &&
    typeof record.anonymous === "boolean" &&
    record.publishConsent === true &&
    isStatus(record.status)
  );
}

async function ensureTestimonialsFile() {
  await mkdir(dataDir, { recursive: true });

  try {
    await access(testimonialsFile);
  } catch {
    await writeFile(testimonialsFile, "[]\n", "utf8");
  }
}

async function loadTestimonialsUnsafe(): Promise<StoredTestimonial[]> {
  await ensureTestimonialsFile();

  try {
    const contents = await readFile(testimonialsFile, "utf8");
    const parsed = JSON.parse(contents) as unknown;
    return Array.isArray(parsed) ? parsed.filter(isStoredTestimonial) : [];
  } catch {
    return [];
  }
}

async function saveTestimonialsUnsafe(testimonials: StoredTestimonial[]) {
  await ensureTestimonialsFile();
  const payload = `${JSON.stringify(testimonials, null, 2)}\n`;
  await writeFile(testimonialsTempFile, payload, "utf8");
  await rename(testimonialsTempFile, testimonialsFile);
}

async function queueWrite<T>(operation: () => Promise<T>): Promise<T> {
  const result = writeQueue.then(operation, operation);
  writeQueue = result.then(
    () => undefined,
    () => undefined,
  );
  return result;
}

export async function listTestimonials(): Promise<StoredTestimonial[]> {
  await writeQueue;
  const testimonials = await loadTestimonialsUnsafe();
  return testimonials.sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));
}

export async function listApprovedTestimonials(): Promise<PublicTestimonial[]> {
  const testimonials = await listTestimonials();

  return testimonials
    .filter((testimonial) => testimonial.status === "approved")
    .map((testimonial) => ({
      id: testimonial.id,
      displayName: testimonial.anonymous ? "Anonymous" : testimonial.name,
      className: testimonial.className,
      text: testimonial.text,
    }));
}

export async function createTestimonial(
  input: Pick<StoredTestimonial, "name" | "email" | "className" | "text" | "anonymous" | "publishConsent">,
): Promise<StoredTestimonial> {
  return queueWrite(async () => {
    const now = new Date().toISOString();
    const testimonial: StoredTestimonial = {
      id: crypto.randomUUID(),
      submittedAt: now,
      updatedAt: now,
      status: "pending",
      ...input,
    };
    const testimonials = await loadTestimonialsUnsafe();
    testimonials.push(testimonial);
    await saveTestimonialsUnsafe(testimonials);
    return testimonial;
  });
}

export async function updateTestimonialStatus(
  id: string,
  status: TestimonialStatus,
): Promise<StoredTestimonial | null> {
  return queueWrite(async () => {
    const testimonials = await loadTestimonialsUnsafe();
    const testimonial = testimonials.find((item) => item.id === id);
    if (!testimonial) return null;

    testimonial.status = status;
    testimonial.updatedAt = new Date().toISOString();
    await saveTestimonialsUnsafe(testimonials);
    return testimonial;
  });
}
