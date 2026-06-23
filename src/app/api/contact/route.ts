import { NextResponse } from "next/server";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

type ContactPayload = {
  name: string;
  email: string;
  inquiryType: string;
  message: string;
};

const allowedInquiryTypes = new Set(["Class Registration", "General Question", "Collaboration"]);

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

type StoredSubmission = ContactPayload & {
  id: string;
  submittedAt: string;
};

const submissionsDir = path.join(process.cwd(), "data");
const submissionsFile = path.join(submissionsDir, "contact-submissions.json");

async function loadSubmissions(): Promise<StoredSubmission[]> {
  try {
    const contents = await readFile(submissionsFile, "utf8");
    const parsed = JSON.parse(contents) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter((item): item is StoredSubmission => {
      if (!item || typeof item !== "object") return false;
      const record = item as Partial<StoredSubmission>;
      return (
        typeof record.id === "string" &&
        typeof record.submittedAt === "string" &&
        typeof record.name === "string" &&
        typeof record.email === "string" &&
        typeof record.inquiryType === "string" &&
        typeof record.message === "string"
      );
    });
  } catch {
    return [];
  }
}

export async function POST(request: Request) {
  const payload = (await request.json()) as Partial<ContactPayload>;

  const name = payload.name?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const inquiryType = payload.inquiryType?.trim() ?? "";
  const message = payload.message?.trim() ?? "";

  if (!name || !email || !inquiryType || !message) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  if (!allowedInquiryTypes.has(inquiryType)) {
    return NextResponse.json({ error: "Invalid inquiry type selected." }, { status: 400 });
  }

  const nextSubmission: StoredSubmission = {
    id: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
    name,
    email,
    inquiryType,
    message
  };

  const existing = await loadSubmissions();
  existing.push(nextSubmission);

  await mkdir(submissionsDir, { recursive: true });
  await writeFile(submissionsFile, JSON.stringify(existing, null, 2), "utf8");

  return NextResponse.json(
    {
      ok: true,
      message: "Thanks! Your message was submitted. I will follow up soon."
    },
    { status: 200 }
  );
}
