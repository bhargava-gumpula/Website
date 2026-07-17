import type { StoredTestimonial } from "@/types/testimonial";
import {
  createMailTransporter,
  getNotifyEmail,
  getSmtpConfig,
  websiteAdminSubjectPrefix,
} from "@/lib/smtp";

function buildEmailBody(testimonial: StoredTestimonial) {
  return [
    "New testimonial awaiting approval",
    "",
    `Name: ${testimonial.name}`,
    `Email: ${testimonial.email}`,
    `Class: ${testimonial.className}`,
    `Public attribution: ${testimonial.anonymous ? "Anonymous" : testimonial.name}`,
    "",
    "Testimonial:",
    testimonial.text,
    "",
    "Review it at:",
    `${process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://www.bhargava-gumpula.com"}/admin/testimonials`,
  ].join("\n");
}

export async function sendTestimonialNotification(testimonial: StoredTestimonial): Promise<boolean> {
  const smtpConfig = getSmtpConfig();
  if (!smtpConfig) {
    console.warn("Testimonial email skipped: set SMTP_USER and SMTP_PASS.");
    return false;
  }

  const transporter = createMailTransporter();
  if (!transporter) return false;

  await transporter.sendMail({
    from: smtpConfig.auth.user,
    to: getNotifyEmail(),
    replyTo: testimonial.email,
    subject: `${websiteAdminSubjectPrefix} testimonial from ${testimonial.name}`,
    text: buildEmailBody(testimonial),
  });

  return true;
}
