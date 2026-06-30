import Link from "next/link";
import { getClassRegistrationTitle, type ClassOffering } from "@/data/siteContent";

type ClassCardProps = {
  classItem: ClassOffering;
};

export function ClassCard({ classItem }: ClassCardProps) {
  const isComingSoon = classItem.status === "Coming Soon";
  const registrationTitle = getClassRegistrationTitle(classItem);

  return (
    <article className="hover-lift rounded-xl border border-slate-700/70 bg-slate-900 p-5 shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <h3 className="min-w-0 text-lg font-semibold [word-spacing:0.06em] text-slate-100">
          {classItem.titleSubline ? (
            <>
              <span className="block">{classItem.title}</span>
              <span className="block">{classItem.titleSubline}</span>
            </>
          ) : (
            classItem.title
          )}
        </h3>
        <div className="flex shrink-0 items-center gap-1.5">
          {!isComingSoon && classItem.priceBadge ? (
            <span
              className="whitespace-nowrap rounded-full bg-brand-500/20 px-2.5 py-1 text-xs font-bold text-brand-300 ring-1 ring-brand-400/40"
              aria-label={`Price ${classItem.priceBadge}`}
            >
              {classItem.priceBadge}
            </span>
          ) : null}
          <span
            className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${
              isComingSoon
                ? "bg-amber-950/60 text-amber-300 ring-1 ring-amber-800/60"
                : "bg-emerald-950/60 text-emerald-300 ring-1 ring-emerald-800/60"
            }`}
          >
            {classItem.status}
          </span>
        </div>
      </div>
      <p className="mt-2 text-sm text-slate-400">{classItem.summary}</p>
      <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium text-slate-300">
        <span className="rounded-full bg-slate-800 px-2.5 py-1">{classItem.category}</span>
        <span className="rounded-full bg-slate-800 px-2.5 py-1">{classItem.format}</span>
        <span className="rounded-full bg-slate-800 px-2.5 py-1">{classItem.level}</span>
      </div>
      <div className="mt-5">
        {isComingSoon ? (
          <button
            type="button"
            disabled
            aria-disabled="true"
            className="inline-block cursor-not-allowed rounded-md border border-brand-400 px-3 py-1.5 text-xs font-semibold text-brand-400 saturate-0 opacity-50"
          >
            Register
          </button>
        ) : (
          <Link
            href={`/contact?class=${encodeURIComponent(registrationTitle)}`}
            className="inline-block rounded-md border border-brand-400 px-3 py-1.5 text-xs font-semibold text-brand-400 transition hover:-translate-y-0.5 hover:bg-brand-50"
          >
            Register
          </Link>
        )}
      </div>
    </article>
  );
}
