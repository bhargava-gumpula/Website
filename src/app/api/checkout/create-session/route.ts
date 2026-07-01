import { NextResponse } from "next/server";
import { attachStripeSessionToOrder, createPendingOrder } from "@/lib/orders";
import { areStripePricesConfigured, getSiteUrl, getStripe, isStripeConfigured } from "@/lib/stripe";
import { validateCheckoutItems } from "@/lib/validateCartItems";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    if (!isStripeConfigured() || !areStripePricesConfigured()) {
      return NextResponse.json(
        { error: "Checkout is not configured yet. Please try again later." },
        { status: 503 }
      );
    }

    const body = (await request.json()) as unknown;
    const validation = await validateCheckoutItems(body);

    if (!validation.ok) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const pendingOrder = await createPendingOrder(validation.items);
    const stripe = getStripe();
    const siteUrl = getSiteUrl(request);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      allow_promotion_codes: true,
      line_items: validation.items.map((item) => ({
        price: item.stripePriceId,
        quantity: 1
      })),
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/checkout/cancel`,
      metadata: {
        orderId: pendingOrder.id
      },
      payment_intent_data: {
        metadata: {
          orderId: pendingOrder.id
        },
        statement_descriptor_suffix: "BHARGAVA GUM"
      }
    });

    if (!session.url) {
      return NextResponse.json({ error: "Could not start checkout." }, { status: 500 });
    }

    await attachStripeSessionToOrder(pendingOrder.id, session.id);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Failed to create checkout session:", error);
    return NextResponse.json({ error: "Could not start checkout. Please try again." }, { status: 500 });
  }
}
