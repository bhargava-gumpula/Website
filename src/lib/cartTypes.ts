export type CartDelivery = "in-person" | "online";
export type CartAudience = "young" | "adult";

export type CheckoutItemPayload = {
  classSlug: string;
  delivery: CartDelivery;
  audience: CartAudience;
  timeSlotId: string;
};
