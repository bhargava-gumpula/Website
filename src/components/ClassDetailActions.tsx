"use client";

import Link from "next/link";
import type { ClassOffering } from "@/data/siteContent";
import { useCart } from "@/context/CartContext";

type ClassDetailActionsProps = {
  classItem: ClassOffering;
};

export function ClassDetailActions({ classItem }: ClassDetailActionsProps) {
  const { openAddModal } = useCart();
  const isComingSoon = classItem.status === "Coming Soon";

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Link
        href="/classes"
        className="inline-block rounded-lg border border-slate-600 px-4 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-slate-800"
      >
        Back to classes
      </Link>
      {isComingSoon ? (
        <Link
          href="/contact"
          className="inline-block rounded-lg border border-brand-500 bg-brand-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-brand-400"
        >
          Get in touch
        </Link>
      ) : (
        <button
          type="button"
          onClick={() => openAddModal(classItem)}
          className="inline-block rounded-lg border border-brand-500 bg-brand-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-brand-400"
        >
          Add to cart
        </button>
      )}
    </div>
  );
}
