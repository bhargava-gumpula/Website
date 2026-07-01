import {
  createMailTransporter,
  getNotifyEmail,
  getSmtpConfig,
  isEmailConfigured,
  websiteAdminSubjectPrefix
} from "@/lib/smtp";

export type ContactNotification = {
  name: string;
  email: string;
  message: string;
};

function buildEmailBody(submission: ContactNotification) {
  const lines = [
    "New contact form submission",
    "",
    `Name: ${submission.name}`,
    `Email: ${submission.email}`,
    "",
    "Message:",
    submission.message
  ];

  return lines.join("\n");
}

export async function sendContactNotification(submission: ContactNotification): Promise<boolean> {
  const smtpConfig = getSmtpConfig();

  if (!smtpConfig) {
    console.warn("Contact email skipped: set SMTP_USER and SMTP_PASS in environment variables.");
    return false;
  }

  const notifyEmail = getNotifyEmail();
  const transporter = createMailTransporter();
  if (!transporter) return false;

  await transporter.sendMail({
    from: smtpConfig.auth.user,
    to: notifyEmail,
    replyTo: submission.email,
    subject: `${websiteAdminSubjectPrefix} contact from ${submission.name}`,
    text: buildEmailBody(submission)
  });

  return true;
}

export function isContactEmailConfigured() {
  return isEmailConfigured();
}
