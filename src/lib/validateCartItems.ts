import {
  classes,
  getClassRegistrationTitle,
  parsePriceBadgeToCents,
  type ClassOffering
} from "@/data/siteContent";
import type { CheckoutItemPayload } from "@/lib/cartTypes";
import { resolveCalendarSlot } from "@/lib/calendarSlots";
import { formatSlotTimeLocal } from "@/lib/formatSlotTime";
import type { OrderLineItem } from "@/lib/orders";
import { getStripePriceIdForSlug } from "@/lib/stripe";

const openClassesBySlug = new Map(
  classes.filter((classItem) => classItem.status === "Open").map((classItem) => [classItem.slug, classItem])
);

function isCheckoutItemPayload(value: unknown): value is CheckoutItemPayload {
  if (!value || typeof value !== "object") return false;

  const item = value as Partial<CheckoutItemPayload>;

  return (
    typeof item.classSlug === "string" &&
    (item.delivery === "in-person" || item.delivery === "online") &&
    (item.audience === "young" || item.audience === "adult") &&
    typeof item.timeSlotId === "string"
  );
}

async function validateSingleItem(
  payload: CheckoutItemPayload,
  reservedInCart: Map<string, number>
): Promise<{ ok: true; item: OrderLineItem } | { ok: false; error: string }> {
  const classItem = openClassesBySlug.get(payload.classSlug) as ClassOffering | undefined;

  if (!classItem) {
    return { ok: false, error: "One or more classes are invalid or unavailable." };
  }

  if (!classItem.priceBadge) {
    return { ok: false, error: "One or more classes are missing pricing." };
  }

  const priceCents = parsePriceBadgeToCents(classItem.priceBadge);

  if (priceCents <= 0) {
    return { ok: false, error: "One or more classes have invalid pricing." };
  }

  const stripePriceId = getStripePriceIdForSlug(classItem.slug);

  if (!stripePriceId) {
    return { ok: false, error: "Checkout is not configured for one or more classes." };
  }

  if (classItem.format === "Group" && payload.delivery !== "in-person") {
    return { ok: false, error: "Group classes must be in person." };
  }

  const slotKey = `${payload.classSlug}:${payload.timeSlotId}`;
  const alreadyInCart = reservedInCart.get(slotKey) ?? 0;

  const slotResult = await resolveCalendarSlot({
    classSlug: payload.classSlug,
    eventId: payload.timeSlotId,
    extraReserved: alreadyInCart
  });

  if (!slotResult.ok) {
    return slotResult;
  }

  reservedInCart.set(slotKey, alreadyInCart + 1);

  return {
    ok: true,
    item: {
      classSlug: classItem.slug,
      title: getClassRegistrationTitle(classItem),
      priceCents,
      priceLabel: classItem.priceBadge,
      delivery: payload.delivery,
      audience: payload.audience,
      timeSlotId: slotResult.slot.id,
      startsAt: slotResult.slot.startsAt,
      timeZone: payload.timeZone?.trim() || undefined,
      timeLabel: formatSlotTimeLocal(
        slotResult.slot.startsAt,
        payload.timeZone?.trim() || undefined
      ),
      stripePriceId
    }
  };
}

export async function validateCheckoutItems(
  payload: unknown
): Promise<{ ok: true; items: OrderLineItem[] } | { ok: false; error: string }> {
  if (!payload || typeof payload !== "object") {
    return { ok: false, error: "Invalid checkout request." };
  }

  const items = (payload as { items?: unknown }).items;

  if (!Array.isArray(items) || items.length === 0) {
    return { ok: false, error: "Your cart is empty." };
  }

  if (items.length > 20) {
    return { ok: false, error: "Too many items in cart." };
  }

  if (!items.every(isCheckoutItemPayload)) {
    return { ok: false, error: "Invalid cart item data." };
  }

  const validated: OrderLineItem[] = [];
  const reservedInCart = new Map<string, number>();

  for (const item of items) {
    const result = await validateSingleItem(item, reservedInCart);

    if (!result.ok) {
      return result;
    }

    validated.push(result.item);
  }

  return { ok: true, items: validated };
}
