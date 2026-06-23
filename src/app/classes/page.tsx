import Link from "next/link";
import { ClassCard } from "@/components/ClassCard";
import { SectionHeader } from "@/components/SectionHeader";
import { classes, classesPageContent } from "@/data/siteContent";

export default function ClassesPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 md:py-16">
      <SectionHeader
        eyebrow={classesPageContent.eyebrow}
        title={classesPageContent.title}
        description={classesPageContent.description}
      />

      <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {classes.map((classItem) => (
          <ClassCard key={classItem.title} classItem={classItem} />
        ))}
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">{classesPageContent.ctaTitle}</h2>
        <p className="mt-2 max-w-2xl text-slate-600">{classesPageContent.ctaDescription}</p>
        <Link
          href={classesPageContent.ctaHref}
          className="mt-4 inline-block rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-700"
        >
          {classesPageContent.ctaLabel}
        </Link>
      </section>
    </div>
  );
}
