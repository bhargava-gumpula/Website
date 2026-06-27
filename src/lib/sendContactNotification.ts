import nodemailer from "nodemailer";

export type ContactNotification = {
  name: string;
  email: string;
  inquiryType: string;
  registeredClass?: string;
  message: string;
};

const defaultNotifyEmail = "bhargava.gumpula@gmail.com";

function getSmtpConfig() {
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();

  if (!user || !pass) {
    return null;
  }

  const port = Number(process.env.SMTP_PORT ?? "587");

  return {
    host: process.env.SMTP_HOST?.trim() || "smtp.gmail.com",
    port: Number.isFinite(port) ? port : 587,
    secure: process.env.SMTP_SECURE === "true",
    auth: { user, pass }
  };
}

function buildEmailBody(submission: ContactNotification) {
  const lines = [
    "New contact form submission",
    "",
    `Name: ${submission.name}`,
    `Email: ${submission.email}`,
    `Inquiry type: ${submission.inquiryType}`
  ];

  if (submission.registeredClass) {
    lines.push(`Class: ${submission.registeredClass}`);
  }

  lines.push("", "Message:", submission.message);

  return lines.join("\n");
}

export async function sendContactNotification(submission: ContactNotification): Promise<boolean> {
  const smtpConfig = getSmtpConfig();

  if (!smtpConfig) {
    console.warn("Contact email skipped: set SMTP_USER and SMTP_PASS in environment variables.");
    return false;
  }

  const notifyEmail = process.env.CONTACT_NOTIFY_EMAIL?.trim() || defaultNotifyEmail;
  const transporter = nodemailer.createTransport(smtpConfig);

  await transporter.sendMail({
    from: smtpConfig.auth.user,
    to: notifyEmail,
    replyTo: submission.email,
    subject: `Website contact from ${submission.name}`,
    text: buildEmailBody(submission)
  });

  return true;
}

export function isContactEmailConfigured() {
  return getSmtpConfig() !== null;
}
