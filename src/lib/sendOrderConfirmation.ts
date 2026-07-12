import type { CartAudience, CartDelivery } from "@/lib/cartTypes";
import { classVenueInPersonLine, classVenueOnlineLine, getClassBySlug } from "@/data/siteContent";
import { formatSlotTimeLocal } from "@/lib/formatSlotTime";
import type { OrderLineItem, StoredOrder } from "@/lib/orders";
import {
  createMailTransporter,
  getNotifyEmail,
  getSmtpConfig,
  isEmailConfigured,
  websiteAdminSubjectPrefix
} from "@/lib/smtp";

export type OrderEmailParams = {
  order: StoredOrder;
  customerName: string;
};

function formatDelivery(delivery: CartDelivery): string {
  return delivery === "in-person" ? "In person" : "Online";
}

function formatLocation(delivery: CartDelivery): string {
  return delivery === "in-person" ? classVenueInPersonLine : classVenueOnlineLine;
}

function formatAudience(audience: CartAudience): string {
  return audience === "young" ? "Young (below high school)" : "Adult (high school and above)";
}

function formatTotal(cents: number): string {
  return `$${(cents / 100).toFixed(cents % 100 === 0 ? 0 : 2)}`;
}

function formatSessionTime(item: OrderLineItem): string {
  if (item.startsAt) {
    return formatSlotTimeLocal(item.startsAt, item.timeZone);
  }

  return item.timeLabel;
}

function buildWhatToBringLines(items: OrderLineItem[]): string[] {
  const categories = new Set(
    items.map((item) => getClassBySlug(item.classSlug)?.category).filter(Boolean)
  );

  const notes: string[] = [];

  if (categories.has("Rubik's Cubing")) {
    notes.push("Please bring your own Rubik's Cube to class.");
  }

  if (categories.has("Python")) {
    notes.push("Please bring a laptop or computer to class.");
  }

  if (notes.length === 0) {
    return [];
  }

  return ["", "What to bring:", ...notes.map((note) => `- ${note}`)];
}

function buildCustomerBody(params: OrderEmailParams): string {
  const { order, customerName } = params;
  const lines = [
    `Hi ${customerName},`,
    "",
    "Thank you for registering for a class on bhargava-gumpula.com.",
    "",
    "Order summary:",
    ""
  ];

  for (const item of order.items) {
    lines.push(
      `- ${item.title}`,
      `  ${formatDelivery(item.delivery)} · ${formatAudience(item.audience)}`,
      `  ${formatLocation(item.delivery)}`,
      `  ${formatSessionTime(item)} · ${item.priceLabel}`,
      ""
    );
  }

  lines.push(`Total: ${formatTotal(order.totalCents)}`, ...buildWhatToBringLines(order.items), "", "I will follow up with any next steps before your session.");

  if (order.id) {
    lines.push("", `Reference: ${order.id}`);
  }

  return lines.join("\n");
}

function buildAdminBody(params: OrderEmailParams): string {
  const { order, customerName } = params;
  const email = order.customerEmail ?? "(no email)";

  const lines = [
    "New class registration (paid)",
    "",
    `Name: ${customerName}`,
    `Email: ${email}`,
    `Total: ${formatTotal(order.totalCents)}`,
    `Order ID: ${order.id}`
  ];

  if (order.stripeSessionId) {
    lines.push(`Stripe session: ${order.stripeSessionId}`);
  }

  lines.push("", "Sessions:");

  for (const item of order.items) {
    lines.push(
      "",
      `- ${item.title}`,
      `  ${formatDelivery(item.delivery)} · ${formatAudience(item.audience)}`,
      `  ${formatLocation(item.delivery)}`,
      `  ${formatSessionTime(item)} · ${item.priceLabel}`
    );
  }

  return lines.join("\n");
}

export async function sendOrderConfirmationEmails(params: OrderEmailParams): Promise<boolean> {
  const smtpConfig = getSmtpConfig();
  const customerEmail = params.order.customerEmail?.trim();

  if (!smtpConfig || !customerEmail) {
    console.warn("Order email skipped: SMTP or customer email not configured.");
    return false;
  }

  const transporter = createMailTransporter();
  if (!transporter) return false;

  const from = smtpConfig.auth.user;
  const notifyEmail = getNotifyEmail();
  const customerName = params.customerName.trim() || "there";

  await transporter.sendMail({
    from,
    to: customerEmail,
    replyTo: notifyEmail,
    subject: "Your class registration — bhargava-gumpula.com",
    text: buildCustomerBody({ ...params, customerName })
  });

  await transporter.sendMail({
    from,
    to: notifyEmail,
    replyTo: customerEmail,
    subject: `${websiteAdminSubjectPrefix} class registration from ${customerName}`,
    text: buildAdminBody({ ...params, customerName })
  });

  return true;
}

export function isOrderEmailConfigured() {
  return isEmailConfigured();
}
