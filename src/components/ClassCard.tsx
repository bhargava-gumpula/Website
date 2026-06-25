import Link from "next/link";
import type { ClassOffering } from "@/data/siteContent";

type ClassCardProps = {
  classItem: ClassOffering;
};

export function ClassCard({ classItem }: ClassCardProps) {
  const isComingSoon = classItem.status === "Coming Soon";

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <h3 className="min-w-0 text-lg font-semibold text-slate-900">{classItem.title}</h3>
        <span
          className={`shrink-0 whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${
            isComingSoon ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
          }`}
        >
          {classItem.status}
        </span>
      </div>
      <p className="mt-2 text-sm text-slate-600">{classItem.summary}</p>
      <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium text-slate-700">
        <span className="rounded-full bg-slate-100 px-2.5 py-1">{classItem.category}</span>
        <span className="rounded-full bg-slate-100 px-2.5 py-1">{classItem.format}</span>
        <span className="rounded-full bg-slate-100 px-2.5 py-1">{classItem.level}</span>
      </div>
      <div className="mt-5">
        {isComingSoon ? (
          <button
            type="button"
            disabled
            aria-disabled="true"
            className="inline-block cursor-not-allowed rounded-md border border-brand-600 px-3 py-1.5 text-xs font-semibold text-brand-600 saturate-0 opacity-50"
          >
            Register
          </button>
        ) : (
          <Link
            href={`/contact?class=${encodeURIComponent(classItem.title)}`}
            className="inline-block rounded-md border border-brand-600 px-3 py-1.5 text-xs font-semibold text-brand-600 transition hover:-translate-y-0.5 hover:bg-brand-50"
          >
            Register
          </Link>
        )}
      </div>
    </article>
  );
}
