"use client";

import { CartProvider } from "@/context/CartContext";
import { AddToCartModalHost } from "@/components/AddToCartModal";
import { CartSidePanel } from "@/components/CartSidePanel";

export function CartShell({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <CartSidePanel />
      <AddToCartModalHost />
    </CartProvider>
  );
}
