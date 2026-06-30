"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { CartAudience, CartDelivery } from "@/lib/cartTypes";
import type { ClassOffering } from "@/data/siteContent";

export type { CartAudience, CartDelivery } from "@/lib/cartTypes";

export type CartItem = {
  id: string;
  classSlug: string;
  title: string;
  priceCents: number;
  priceLabel: string;
  delivery: CartDelivery;
  audience: CartAudience;
  timeSlotId: string;
  timeLabel: string;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  totalCents: number;
  isOpen: boolean;
  isHydrated: boolean;
  addModalClass: ClassOffering | null;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  openAddModal: (classItem: ClassOffering) => void;
  closeAddModal: () => void;
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

const STORAGE_KEY = "bg-website-cart-v1";

const CartContext = createContext<CartContextValue | null>(null);

function isCartItem(value: unknown): value is CartItem {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<CartItem>;
  return (
    typeof item.id === "string" &&
    typeof item.classSlug === "string" &&
    typeof item.title === "string" &&
    typeof item.priceCents === "number" &&
    typeof item.priceLabel === "string" &&
    (item.delivery === "in-person" || item.delivery === "online") &&
    (item.audience === "young" || item.audience === "adult") &&
    typeof item.timeSlotId === "string" &&
    typeof item.timeLabel === "string"
  );
}

function readStoredCart(): CartItem[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isCartItem);
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [addModalClass, setAddModalClass] = useState<ClassOffering | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setItems(readStoredCart());
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, isHydrated]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((open) => !open), []);

  const openAddModal = useCallback((classItem: ClassOffering) => setAddModalClass(classItem), []);
  const closeAddModal = useCallback(() => setAddModalClass(null), []);

  const addItem = useCallback((item: Omit<CartItem, "id">) => {
    setItems((current) => [...current, { ...item, id: crypto.randomUUID() }]);
    setIsOpen(true);
    setAddModalClass(null);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const itemCount = items.length;
  const totalCents = useMemo(() => items.reduce((sum, item) => sum + item.priceCents, 0), [items]);

  const value = useMemo(
    () => ({
      items,
      itemCount,
      totalCents,
      isOpen,
      isHydrated,
      addModalClass,
      openCart,
      closeCart,
      toggleCart,
      openAddModal,
      closeAddModal,
      addItem,
      removeItem,
      clearCart
    }),
    [items, itemCount, totalCents, isOpen, isHydrated, addModalClass, openCart, closeCart, toggleCart, openAddModal, closeAddModal, addItem, removeItem, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}

export function formatCartDelivery(delivery: CartDelivery): string {
  return delivery === "in-person" ? "In person" : "Online";
}

export function formatCartAudience(audience: CartAudience): string {
  return audience === "young" ? "Young" : "Adult";
}

export function formatCartTotal(cents: number): string {
  return `$${(cents / 100).toFixed(cents % 100 === 0 ? 0 : 2)}`;
}
