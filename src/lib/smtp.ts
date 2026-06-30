import nodemailer from "nodemailer";

export const defaultNotifyEmail = "bhargava.gumpula@gmail.com";

/** Subject prefix for admin mail — matches Gmail filters for contact form (`Website contact from …`). */
export const websiteAdminSubjectPrefix = "Website";

export function getSmtpConfig() {
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

export function getNotifyEmail() {
  return process.env.CONTACT_NOTIFY_EMAIL?.trim() || defaultNotifyEmail;
}

export function createMailTransporter() {
  const smtpConfig = getSmtpConfig();
  if (!smtpConfig) return null;
  return nodemailer.createTransport(smtpConfig);
}

export function isEmailConfigured() {
  return getSmtpConfig() !== null;
}
