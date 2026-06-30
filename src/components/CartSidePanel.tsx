"use client";

import Link from "next/link";
import { useState } from "react";
import {
  formatCartAudience,
  formatCartDelivery,
  formatCartTotal,
  useCart
} from "@/context/CartContext";

function CartIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

export function CartSidePanel() {
  const { items, itemCount, totalCents, isOpen, isHydrated, closeCart, removeItem } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const canCheckout = isHydrated && items.length > 0 && !isCheckingOut;

  async function handleCheckout() {
    if (!canCheckout) return;

    setCheckoutError(null);
    setIsCheckingOut(true);

    try {
      const response = await fetch("/api/checkout/create-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            classSlug: item.classSlug,
            delivery: item.delivery,
            audience: item.audience,
            timeSlotId: item.timeSlotId
          }))
        })
      });

      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !data.url) {
        setCheckoutError(data.error ?? "Could not start checkout. Please try again.");
        return;
      }

      window.location.href = data.url;
    } catch {
      setCheckoutError("Could not start checkout. Please try again.");
    } finally {
      setIsCheckingOut(false);
    }
  }

  if (!isOpen) return null;

  return (
    <>
      <button
        type="button"
        aria-label="Close cart"
        className="fixed inset-0 z-[55] bg-slate-950/60 backdrop-blur-[1px]"
        onClick={closeCart}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Your cart"
        className="fixed inset-y-0 right-0 z-[60] flex w-full max-w-sm flex-col border-l border-slate-700 bg-slate-900 shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-slate-700 px-5 py-4">
          <div className="flex items-center gap-2">
            <CartIcon className="h-5 w-5 text-brand-400" />
            <h2 className="text-lg font-semibold text-slate-100">Your cart</h2>
            {isHydrated && itemCount > 0 ? (
              <span className="rounded-full bg-brand-500/20 px-2 py-0.5 text-xs font-semibold text-brand-300">
                {itemCount}
              </span>
            ) : null}
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close"
            className="rounded-md border border-slate-600 px-2.5 py-1 text-sm text-slate-300 transition hover:bg-slate-800"
          >
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {!isHydrated ? (
            <p className="text-sm text-slate-400">Loading cart...</p>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
              <CartIcon className="h-10 w-10 text-slate-600" />
              <p className="text-sm font-medium text-slate-300">Your cart is empty</p>
              <p className="max-w-xs text-sm text-slate-500">
                Add classes from the Classes page. Scheduling opens soon.
              </p>
              <Link
                href="/classes"
                onClick={closeCart}
                className="mt-2 rounded-md border border-brand-400 px-3 py-1.5 text-sm font-semibold text-brand-400 transition hover:-translate-y-0.5 hover:bg-brand-50"
              >
                View classes
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.id} className="rounded-xl border border-slate-700/70 bg-slate-950/50 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-100">{item.title}</p>
                      <p className="mt-1 text-xs text-slate-400">
                        {formatCartDelivery(item.delivery)} · {formatCartAudience(item.audience)}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">{item.timeLabel}</p>
                    </div>
                    <p className="shrink-0 text-sm font-semibold text-brand-300">{item.priceLabel}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="mt-3 text-xs font-medium text-slate-400 underline-offset-2 transition hover:text-rose-300 hover:underline"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-slate-700 px-5 py-4">
          <div className="mb-4 flex items-center justify-between text-sm">
            <span className="text-slate-400">Total</span>
            <span className="text-lg font-semibold text-slate-100">{formatCartTotal(totalCents)}</span>
          </div>
          {checkoutError ? (
            <p className="mb-3 text-center text-xs text-rose-300" role="alert">
              {checkoutError}
            </p>
          ) : null}
          <button
            type="button"
            disabled={!canCheckout}
            onClick={handleCheckout}
            className="w-full rounded-lg border border-brand-500 bg-brand-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-brand-400 disabled:cursor-not-allowed disabled:border-slate-600 disabled:bg-slate-800 disabled:text-slate-500"
          >
            {isCheckingOut ? "Redirecting to checkout..." : "Checkout"}
          </button>
          {items.length === 0 ? (
            <p className="mt-2 text-center text-xs text-slate-500">
              Add classes with an available time slot to checkout.
            </p>
          ) : null}
          <p className="mt-2 text-center text-xs text-slate-500">
            Questions?{" "}
            <Link href="/contact" onClick={closeCart} className="text-brand-400 underline-offset-2 hover:underline">
              Contact
            </Link>
          </p>
        </div>
      </aside>
    </>
  );
}

export function CartNavButton({ className }: { className?: string }) {
  const { itemCount, isHydrated, toggleCart } = useCart();

  return (
    <button
      type="button"
      onClick={toggleCart}
      aria-label={itemCount > 0 ? `Open cart, ${itemCount} items` : "Open cart"}
      className={
        className ??
        "relative inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-800/80 text-slate-300 transition duration-300 hover:-translate-y-0.5 hover:border-brand-400/50 hover:text-brand-400 hover:shadow-sm"
      }
    >
      <CartIcon className="h-4 w-4" />
      {isHydrated && itemCount > 0 ? (
        <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-500 px-1 text-[10px] font-bold text-slate-950">
          {itemCount > 9 ? "9+" : itemCount}
        </span>
      ) : null}
    </button>
  );
}
