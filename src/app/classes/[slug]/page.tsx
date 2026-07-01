import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ClassDetailActions } from "@/components/ClassDetailActions";
import { SectionHeader } from "@/components/SectionHeader";
import { classes, getClassBySlug, getClassRegistrationTitle } from "@/data/siteContent";

type ClassDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return classes.map((classItem) => ({ slug: classItem.slug }));
}

export async function generateMetadata({ params }: ClassDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const classItem = getClassBySlug(slug);

  if (!classItem) {
    return { title: "Class not found" };
  }

  const title = getClassRegistrationTitle(classItem);

  return {
    title: `${title} | Bhargava Gumpula`,
    description: classItem.detail.overview
  };
}

export default async function ClassDetailPage({ params }: ClassDetailPageProps) {
  const { slug } = await params;
  const classItem = getClassBySlug(slug);

  if (!classItem) {
    notFound();
  }

  const displayTitle = getClassRegistrationTitle(classItem);
  const isComingSoon = classItem.status === "Coming Soon";
  const { detail } = classItem;
  const { location } = detail;

  const showHeaderPrice =
    !isComingSoon && classItem.priceBadge && classItem.detail.showHeaderPrice !== false;
  const showHeaderStatus = classItem.detail.showHeaderStatus !== false;
  const isGroupClass = Boolean(detail.groupSize);
  const detailColumnClass =
    "border-t border-slate-700/70 pt-5 sm:border-t-0 sm:border-l sm:pl-6 sm:pt-0";

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 md:py-16">
      <div className="flex flex-col gap-4">
        <Link
          href="/classes"
          className="w-fit text-sm font-medium text-brand-400 transition hover:text-brand-300"
        >
          ← All classes
        </Link>
        <SectionHeader eyebrow={classItem.category} title={displayTitle} description={detail.overview} />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300">
          {classItem.format}
        </span>
        <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300">
          {classItem.level}
        </span>
        {showHeaderPrice ? (
          <span className="rounded-full bg-brand-500/20 px-3 py-1 text-xs font-bold text-brand-300 ring-1 ring-brand-400/40">
            {classItem.priceBadge} per session
          </span>
        ) : null}
        {showHeaderStatus ? (
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              isComingSoon
                ? "bg-amber-950/60 text-amber-300 ring-1 ring-amber-800/60"
                : "bg-emerald-950/60 text-emerald-300 ring-1 ring-emerald-800/60"
            }`}
          >
            {classItem.status}
          </span>
        ) : null}
      </div>

      <article className="rounded-xl border border-slate-700/70 bg-slate-900 p-5 shadow-soft">
        <div
          className={`grid grid-cols-1 gap-5 sm:gap-6 ${isGroupClass ? "sm:grid-cols-4" : "sm:grid-cols-3"}`}
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Session length</p>
            <p className="mt-2 text-sm font-medium text-slate-100">{detail.sessionLength}</p>
          </div>

          <div className={detailColumnClass}>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Price</p>
            <p className="mt-2 text-sm font-medium text-slate-100">{detail.pricingDetail}</p>
          </div>

          {isGroupClass ? (
            <div className={detailColumnClass}>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Group size</p>
              <p className="mt-2 text-sm font-medium text-slate-100">{detail.groupSize}</p>
            </div>
          ) : null}

          <div className={detailColumnClass}>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Location</p>
            <div className="mt-2 space-y-1 text-sm font-medium text-slate-100">
              {location.announcement ? <p>{location.announcement}</p> : null}
              {location.inPerson ? <p>{location.inPerson}</p> : null}
              {location.online ? <p>{location.online}</p> : null}
            </div>
          </div>
        </div>
      </article>

      {detail.timelineNote ? (
        <p className="rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-sm text-slate-300">
          {detail.timelineNote}
        </p>
      ) : null}

      <div className="grid gap-5 lg:grid-cols-2">
        {detail.sections.map((section) => (
          <article
            key={section.title}
            className="rounded-xl border border-slate-700/70 bg-slate-900 p-5 shadow-soft"
          >
            <h2 className="text-lg font-semibold text-slate-100">{section.title}</h2>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-300">
              {section.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <ClassDetailActions classItem={classItem} />
    </div>
  );
}
