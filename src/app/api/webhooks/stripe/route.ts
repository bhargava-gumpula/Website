import { NextResponse } from "next/server";
import { markSlotsBookedIfFull } from "@/lib/calendarSlots";
import { findOrderById, markOrderExpired, markOrderPaid } from "@/lib/orders";
import { sendOrderConfirmationEmails } from "@/lib/sendOrderConfirmation";
import { getStripe, getCheckoutSessionCustomerName, getCheckoutSessionCustomerPhone } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET?.trim();

  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET is not configured.");
    return NextResponse.json({ error: "Webhook is not configured." }, { status: 503 });
  }

  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing Stripe signature." }, { status: 400 });
  }

  let event;

  try {
    const body = await request.text();
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    console.error("Stripe webhook signature verification failed:", error);
    return NextResponse.json({ error: "Invalid webhook signature." }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const orderId = session.metadata?.orderId;

      if (orderId) {
        const existing = await findOrderById(orderId);

        if (existing?.status !== "paid") {
          const customerEmail =
            session.customer_details?.email ?? session.customer_email ?? undefined;
          const customerName = getCheckoutSessionCustomerName(session);
          const customerPhone = getCheckoutSessionCustomerPhone(session);

          const order = await markOrderPaid({
            orderId,
            stripeSessionId: session.id,
            customerEmail,
            customerPhone
          });

          if (order) {
            try {
              await sendOrderConfirmationEmails({ order, customerName });
            } catch (emailError) {
              console.error("Failed to send order confirmation emails:", emailError);
            }

            try {
              await markSlotsBookedIfFull(order.items);
            } catch (bookedError) {
              console.error("Failed to update calendar booked status:", bookedError);
            }
          }
        }
      }
    }

    if (event.type === "checkout.session.expired") {
      const session = event.data.object;
      const orderId = session.metadata?.orderId;

      if (orderId) {
        await markOrderExpired(orderId);
      }
    }
  } catch (error) {
    console.error("Stripe webhook handler failed:", error);
    return NextResponse.json({ error: "Webhook handler failed." }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
