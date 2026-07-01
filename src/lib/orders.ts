import { access, mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import type { CartAudience, CartDelivery } from "@/lib/cartTypes";

export type OrderLineItem = {
  classSlug: string;
  title: string;
  priceCents: number;
  priceLabel: string;
  delivery: CartDelivery;
  audience: CartAudience;
  timeSlotId: string;
  timeLabel: string;
  startsAt?: string;
  timeZone?: string;
  stripePriceId: string;
};

export type OrderStatus = "pending" | "paid" | "expired";

export type StoredOrder = {
  id: string;
  createdAt: string;
  status: OrderStatus;
  stripeSessionId?: string;
  customerEmail?: string;
  totalCents: number;
  items: OrderLineItem[];
  paidAt?: string;
};

const ordersDir = path.join(process.cwd(), "data");
const ordersFile = path.join(ordersDir, "orders.json");
const ordersTempFile = path.join(ordersDir, "orders.json.tmp");

async function ensureOrdersFile() {
  await mkdir(ordersDir, { recursive: true });

  try {
    await access(ordersFile);
  } catch {
    await writeFile(ordersFile, "[]\n", "utf8");
  }
}

function isStoredOrder(value: unknown): value is StoredOrder {
  if (!value || typeof value !== "object") return false;

  const order = value as Partial<StoredOrder>;

  return (
    typeof order.id === "string" &&
    typeof order.createdAt === "string" &&
    (order.status === "pending" || order.status === "paid" || order.status === "expired") &&
    typeof order.totalCents === "number" &&
    Array.isArray(order.items)
  );
}

export async function loadOrders(): Promise<StoredOrder[]> {
  await ensureOrdersFile();

  try {
    const contents = await readFile(ordersFile, "utf8");
    const parsed = JSON.parse(contents) as unknown;

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(isStoredOrder);
  } catch {
    return [];
  }
}

async function saveOrders(orders: StoredOrder[]) {
  await ensureOrdersFile();
  const payload = `${JSON.stringify(orders, null, 2)}\n`;
  await writeFile(ordersTempFile, payload, "utf8");
  await rename(ordersTempFile, ordersFile);
}

export async function createPendingOrder(items: OrderLineItem[]): Promise<StoredOrder> {
  const order: StoredOrder = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: "pending",
    totalCents: items.reduce((sum, item) => sum + item.priceCents, 0),
    items
  };

  const orders = await loadOrders();
  orders.push(order);
  await saveOrders(orders);

  return order;
}

export async function attachStripeSessionToOrder(orderId: string, stripeSessionId: string): Promise<StoredOrder | null> {
  const orders = await loadOrders();
  const index = orders.findIndex((order) => order.id === orderId);

  if (index === -1) {
    return null;
  }

  orders[index] = { ...orders[index], stripeSessionId };
  await saveOrders(orders);

  return orders[index];
}

export async function markOrderPaid(params: {
  orderId: string;
  stripeSessionId: string;
  customerEmail?: string;
}): Promise<StoredOrder | null> {
  const orders = await loadOrders();
  const index = orders.findIndex((order) => order.id === params.orderId);

  if (index === -1) {
    return null;
  }

  const existing = orders[index];

  if (existing.status === "paid") {
    return existing;
  }

  orders[index] = {
    ...existing,
    status: "paid",
    stripeSessionId: params.stripeSessionId,
    customerEmail: params.customerEmail,
    paidAt: new Date().toISOString()
  };

  await saveOrders(orders);

  return orders[index];
}

export async function markOrderExpired(orderId: string): Promise<StoredOrder | null> {
  const orders = await loadOrders();
  const index = orders.findIndex((order) => order.id === orderId);

  if (index === -1) {
    return null;
  }

  if (orders[index].status === "paid") {
    return orders[index];
  }

  orders[index] = { ...orders[index], status: "expired" };
  await saveOrders(orders);

  return orders[index];
}

export async function findOrderById(orderId: string): Promise<StoredOrder | null> {
  const orders = await loadOrders();
  return orders.find((order) => order.id === orderId) ?? null;
}
