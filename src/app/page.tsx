import Image from "next/image";
import Link from "next/link";
import { ClassCard } from "@/components/ClassCard";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeader } from "@/components/SectionHeader";
import { classes, highlights, homeContent, projects } from "@/data/siteContent";

export default function HomePage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-10 md:gap-16 md:py-16">
      <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8 md:p-12">
        <div className="grid items-center gap-8 md:grid-cols-[1.25fr_auto]">
          <div>
            <p className="text-sm font-semibold text-brand-600">{homeContent.heroEyebrow}</p>
            <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
              {homeContent.heroTitle}
            </h1>
            <p className="mt-4 max-w-2xl text-slate-600">{homeContent.heroDescription}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={homeContent.primaryCtaHref}
                className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-400"
              >
                {homeContent.primaryCtaLabel}
              </Link>
              <Link
                href={homeContent.secondaryCtaHref}
                className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-400"
              >
                {homeContent.secondaryCtaLabel}
              </Link>
            </div>
          </div>
          <div className="mx-auto">
            <div className="relative h-52 w-40 overflow-hidden rounded-xl sm:h-60 sm:w-48 md:h-[18rem] md:w-56">
              <Image
                src="/images/bhargava-photo-v4.png"
                alt="Bhargava Gumpula portrait"
                fill
                sizes="(min-width: 768px) 16rem, (min-width: 640px) 13rem, 10rem"
                priority
                className="object-cover object-[50%_88%] scale-[1.14] drop-shadow-[0_12px_25px_rgba(15,23,42,0.2)]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {highlights.map((item) => (
          <div key={item.label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-600">{item.label}</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {item.value}
              {item.suffix ?? ""}
            </p>
          </div>
        ))}
      </section>

      <section className="space-y-6">
        <SectionHeader
          eyebrow={homeContent.projectsSection.eyebrow}
          title={homeContent.projectsSection.title}
          description={homeContent.projectsSection.description}
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeader
          eyebrow={homeContent.classesSection.eyebrow}
          title={homeContent.classesSection.title}
          description={homeContent.classesSection.description}
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {classes.map((classItem) => (
            <ClassCard key={classItem.title} classItem={classItem} />
          ))}
        </div>
      </section>

    </div>
  );
}
