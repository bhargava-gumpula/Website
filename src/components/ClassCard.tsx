"use client";

import Link from "next/link";
import type { ClassOffering } from "@/data/siteContent";
import { getClassRegistrationTitle } from "@/data/siteContent";
import { useCart } from "@/context/CartContext";

type ClassCardProps = {
  classItem: ClassOffering;
};

export function ClassCard({ classItem }: ClassCardProps) {
  const { openAddModal } = useCart();
  const isComingSoon = classItem.status === "Coming Soon";
  const displayTitle = getClassRegistrationTitle(classItem);

  return (
    <article className="group hover-lift relative flex h-full flex-col rounded-xl border border-slate-700/70 bg-slate-900 p-5 shadow-soft">
      {!isComingSoon ? (
        <Link
          href={`/classes/${classItem.slug}`}
          aria-label={`View ${displayTitle} details`}
          className="absolute inset-0 rounded-xl"
        />
      ) : null}
      <div className="relative flex items-start justify-between gap-3">
        <h3 className="min-w-0 text-lg font-semibold [word-spacing:0.06em] text-slate-100 transition group-hover:text-brand-300">
          {classItem.titleSubline ? (
            <>
              <span className="block">{classItem.title}</span>
              <span className="block">{classItem.titleSubline}</span>
            </>
          ) : (
            displayTitle
          )}
        </h3>
        <div className="flex shrink-0 items-center gap-1.5">
          {!isComingSoon && classItem.priceBadge && classItem.showPriceBadge !== false ? (
            <span
              className="whitespace-nowrap rounded-full bg-brand-500/20 px-2.5 py-1 text-xs font-bold text-brand-300 ring-1 ring-brand-400/40"
              aria-label={`Price ${classItem.priceBadge}`}
            >
              {classItem.priceBadge}
            </span>
          ) : null}
          {classItem.showStatusBadge !== false ? (
            <span
              className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${
                isComingSoon
                  ? "bg-amber-950/60 text-amber-300 ring-1 ring-amber-800/60"
                  : "bg-emerald-950/60 text-emerald-300 ring-1 ring-emerald-800/60"
              }`}
            >
              {classItem.status}
            </span>
          ) : null}
        </div>
      </div>
      <p className="relative mt-2 text-sm text-slate-400">{classItem.summary}</p>
      <div className="relative mt-4 flex flex-wrap gap-2 text-xs font-medium text-slate-300">
        <span className="rounded-full bg-slate-800 px-2.5 py-1">{classItem.category}</span>
        <span className="rounded-full bg-slate-800 px-2.5 py-1">{classItem.format}</span>
        <span className="rounded-full bg-slate-800 px-2.5 py-1">{classItem.level}</span>
      </div>
      <div className="relative z-10 mt-auto flex flex-wrap items-center gap-3 pt-5">
        {isComingSoon ? (
          <button
            type="button"
            disabled
            aria-disabled="true"
            className="inline-block cursor-not-allowed rounded-md border border-brand-400 px-3 py-1.5 text-xs font-semibold text-brand-400 saturate-0 opacity-50"
          >
            Add
          </button>
        ) : (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              openAddModal(classItem);
            }}
            className="inline-block rounded-md border border-brand-400 px-3 py-1.5 text-xs font-semibold text-brand-400 transition hover:-translate-y-0.5 hover:bg-brand-50"
          >
            Add
          </button>
        )}
        {isComingSoon ? (
          <span
            aria-disabled="true"
            className="inline-block cursor-not-allowed rounded-md border border-slate-600 bg-slate-800/60 px-3 py-1.5 text-xs font-semibold text-slate-500 saturate-0 opacity-50"
          >
            View details
          </span>
        ) : (
          <Link
            href={`/classes/${classItem.slug}`}
            onClick={(event) => event.stopPropagation()}
            className="inline-block rounded-md border border-slate-600 bg-slate-800/60 px-3 py-1.5 text-xs font-semibold text-slate-200 transition duration-300 hover:-translate-y-0.5 hover:border-brand-400/70 hover:bg-slate-800 hover:text-brand-300"
          >
            View details
          </Link>
        )}
      </div>
    </article>
  );
}
