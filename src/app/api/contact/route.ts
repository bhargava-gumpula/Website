import { NextResponse } from "next/server";
import { access, mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { classes } from "@/data/siteContent";
import { sendContactNotification } from "@/lib/sendContactNotification";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ContactPayload = {
  name: string;
  email: string;
  inquiryType: string;
  registeredClass?: string;
  message: string;
};

const allowedInquiryTypes = new Set(["Class Registration", "General Question"]);
const openClassTitles = new Set(
  classes.filter((classItem) => classItem.status === "Open").map((classItem) => classItem.title)
);

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

type StoredSubmission = {
  id: string;
  submittedAt: string;
  name: string;
  email: string;
  inquiryType: string;
  registeredClass?: string;
  message: string;
};

const submissionsDir = path.join(process.cwd(), "data");
const submissionsFile = path.join(submissionsDir, "contact-submissions.json");
const submissionsTempFile = path.join(submissionsDir, "contact-submissions.json.tmp");

async function ensureSubmissionsFile() {
  await mkdir(submissionsDir, { recursive: true });

  try {
    await access(submissionsFile);
  } catch {
    await writeFile(submissionsFile, "[]\n", "utf8");
  }
}

async function loadSubmissions(): Promise<StoredSubmission[]> {
  await ensureSubmissionsFile();

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

async function saveSubmissions(submissions: StoredSubmission[]) {
  await ensureSubmissionsFile();
  const payload = `${JSON.stringify(submissions, null, 2)}\n`;
  await writeFile(submissionsTempFile, payload, "utf8");
  await rename(submissionsTempFile, submissionsFile);
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Partial<ContactPayload>;

    const name = payload.name?.trim() ?? "";
    const email = payload.email?.trim() ?? "";
    const inquiryType = payload.inquiryType?.trim() ?? "";
    const registeredClass = payload.registeredClass?.trim() ?? "";
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

    if (inquiryType === "Class Registration") {
      if (!registeredClass) {
        return NextResponse.json({ error: "Please select a class." }, { status: 400 });
      }

      if (!openClassTitles.has(registeredClass)) {
        return NextResponse.json({ error: "Please select a valid open class." }, { status: 400 });
      }
    }

    const nextSubmission: StoredSubmission = {
      id: crypto.randomUUID(),
      submittedAt: new Date().toISOString(),
      name,
      email,
      inquiryType,
      ...(inquiryType === "Class Registration" ? { registeredClass } : {}),
      message
    };

    const existing = await loadSubmissions();
    existing.push(nextSubmission);
    await saveSubmissions(existing);

    try {
      await sendContactNotification({
        name,
        email,
        inquiryType,
        ...(inquiryType === "Class Registration" ? { registeredClass } : {}),
        message
      });
    } catch (emailError) {
      console.error("Failed to send contact notification email:", emailError);
    }

    return NextResponse.json(
      {
        ok: true,
        message: "Thanks! Your message was submitted. I will follow up soon."
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to save contact submission:", error);
    return NextResponse.json(
      { error: "Your message could not be saved right now. Please try again." },
      { status: 500 }
    );
  }
}
