import Stripe from "stripe";

let stripeClient: Stripe | null = null;

export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY?.trim());
}

export function getStripe(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY?.trim();

  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY is not configured.");
  }

  if (!stripeClient) {
    stripeClient = new Stripe(secretKey);
  }

  return stripeClient;
}

const priceEnvBySlug: Record<string, string | undefined> = {
  "rubiks-cubing-1-on-1": process.env.STRIPE_PRICE_RUBIKS_1_ON_1,
  "rubiks-cubing-group": process.env.STRIPE_PRICE_RUBIKS_GROUP,
  "python-fundamentals-1-on-1": process.env.STRIPE_PRICE_PYTHON_1_ON_1,
  "python-fundamentals-group": process.env.STRIPE_PRICE_PYTHON_GROUP
};

export function getStripePriceIdForSlug(classSlug: string): string | null {
  const priceId = priceEnvBySlug[classSlug]?.trim();
  return priceId || null;
}

export function areStripePricesConfigured(): boolean {
  return Object.keys(priceEnvBySlug).every((slug) => Boolean(getStripePriceIdForSlug(slug)));
}

export function getSiteUrl(request: Request): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) {
    return configured.replace(/\/$/, "");
  }

  const origin = request.headers.get("origin")?.trim();
  if (origin) {
    return origin.replace(/\/$/, "");
  }

  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  const protocol = request.headers.get("x-forwarded-proto") ?? "http";

  if (host) {
    return `${protocol}://${host}`.replace(/\/$/, "");
  }

  return "http://localhost:3000";
}

export function getCheckoutSessionCustomerName(session: Stripe.Checkout.Session): string {
  const details = session.customer_details;
  const collected = session.collected_information;

  const name =
    details?.individual_name?.trim() ||
    details?.name?.trim() ||
    collected?.individual_name?.trim() ||
    "";

  return name || "Customer";
}
