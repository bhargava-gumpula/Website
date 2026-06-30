"use client";

import Link from "next/link";
import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/context/CartContext";

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { clearCart, closeCart } = useCart();

  useEffect(() => {
    if (sessionId) {
      clearCart();
      closeCart();
    }
  }, [sessionId, clearCart, closeCart]);

  return (
    <section className="mx-auto max-w-2xl px-4 py-16 text-center">
      <p className="text-xs font-semibold uppercase tracking-wide text-brand-400">Payment received</p>
      <h1 className="mt-2 text-3xl font-bold text-slate-100">Thank you for your registration</h1>
      <p className="mt-4 text-slate-400">
        Your payment was successful. A confirmation email has been sent to the address you used at checkout.
      </p>
      {sessionId ? (
        <p className="mt-2 text-xs text-slate-500">Reference: {sessionId.slice(0, 20)}...</p>
      ) : null}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/classes"
          className="rounded-lg border border-brand-500 bg-brand-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-brand-400"
        >
          Back to classes
        </Link>
        <Link
          href="/contact"
          className="rounded-lg border border-slate-600 px-4 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-slate-800"
        >
          Contact
        </Link>
      </div>
    </section>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <section className="mx-auto max-w-2xl px-4 py-16 text-center">
          <p className="text-slate-400">Loading confirmation...</p>
        </section>
      }
    >
      <CheckoutSuccessContent />
    </Suspense>
  );
}
