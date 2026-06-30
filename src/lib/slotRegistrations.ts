import { loadOrders } from "@/lib/orders";

const PENDING_HOLD_MS = 30 * 60 * 1000;

export async function countRegistrationsForSlot(classSlug: string, eventId: string): Promise<number> {
  const orders = await loadOrders();
  const cutoff = Date.now() - PENDING_HOLD_MS;
  let count = 0;

  for (const order of orders) {
    const isPaid = order.status === "paid";
    const isRecentPending =
      order.status === "pending" && new Date(order.createdAt).getTime() >= cutoff;

    if (!isPaid && !isRecentPending) {
      continue;
    }

    for (const item of order.items) {
      if (item.classSlug === classSlug && item.timeSlotId === eventId) {
        count += 1;
      }
    }
  }

  return count;
}
