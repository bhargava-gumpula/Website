import Link from "next/link";

export default function CheckoutCancelPage() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-16 text-center">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Checkout cancelled</p>
      <h1 className="mt-2 text-3xl font-bold text-slate-100">Payment was not completed</h1>
      <p className="mt-4 text-slate-400">
        No charge was made. Your cart items are still saved in this browser.
      </p>
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
