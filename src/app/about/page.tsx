import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";
import { aboutContent } from "@/data/siteContent";

export default function AboutPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-6 md:gap-10 md:py-16">
      <SectionHeader eyebrow={aboutContent.eyebrow} title={aboutContent.title} description={aboutContent.description} />

      <section className="grid w-full max-w-5xl self-center gap-5 rounded-xl border border-slate-700 bg-slate-900 px-4 pt-4 pb-3 shadow-sm md:grid-cols-[1.25fr_1fr] md:px-5 md:pt-5 md:pb-4">
        <div className="order-2 space-y-4 text-slate-300 md:order-1">
          {aboutContent.bioParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="order-1 flex items-center justify-center px-4 pt-4 pb-2 md:order-2 md:pb-3">
          <div className="relative h-52 w-40 overflow-hidden rounded-xl sm:h-60 sm:w-48 md:h-[18rem] md:w-56">
            <Image
              src="/images/bhargava-photo-v4.png"
              alt="Bhargava Gumpula portrait"
              fill
              sizes="(min-width: 768px) 16rem, (min-width: 640px) 13rem, 11rem"
              className="object-cover object-[50%_88%] scale-[1.14] drop-shadow-[0_12px_25px_rgba(0,0,0,0.45)]"
            />
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <article className="rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-100">{aboutContent.skillsTitle}</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {aboutContent.skills.map((skill) => (
              <span key={skill} className="rounded-full bg-slate-800 px-3 py-1 text-sm font-medium text-slate-300">
                {skill}
              </span>
            ))}
          </div>
        </article>

        <article className="rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-100">{aboutContent.achievementsTitle}</h2>
          <ul className="mt-4 list-inside list-disc space-y-2 text-slate-300">
            {aboutContent.achievements.map((achievement) => (
              <li key={achievement.label}>
                {achievement.certificateUrl ? (
                  <>
                    <span className="align-middle">{achievement.label}</span>
                    <a
                      href={achievement.certificateUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group ml-2 inline-flex items-center gap-1.5 rounded-full border border-brand-400/60 bg-brand-50/60 px-2.5 py-0.5 align-middle text-xs font-semibold text-brand-400 transition duration-300 hover:-translate-y-0.5 hover:border-brand-400 hover:bg-brand-50 hover:text-brand-700 hover:shadow-sm"
                    >
                      View certificate
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="h-3 w-3 shrink-0 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M14 5h5v5M10 14 19 5M15 10v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h8" />
                      </svg>
                    </a>
                  </>
                ) : (
                  achievement.label
                )}
              </li>
            ))}
          </ul>
        </article>
      </section>
    </div>
  );
}
