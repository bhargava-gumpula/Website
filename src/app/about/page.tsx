import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";
import { aboutContent } from "@/data/siteContent";

export default function AboutPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-6 md:gap-10 md:py-16">
      <SectionHeader eyebrow={aboutContent.eyebrow} title={aboutContent.title} description={aboutContent.description} />

      <section className="grid w-full max-w-5xl self-center gap-5 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[1.25fr_1fr] md:p-5">
        <div className="order-2 space-y-4 text-slate-700 md:order-1">
          {aboutContent.bioParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="order-1 flex items-center justify-center p-4 md:order-2">
          <div className="relative h-52 w-40 overflow-hidden rounded-xl sm:h-60 sm:w-48 md:h-[18rem] md:w-56">
            <Image
              src="/images/bhargava-photo-v4.png"
              alt="Bhargava Gumpula portrait"
              fill
              sizes="(min-width: 768px) 16rem, (min-width: 640px) 13rem, 11rem"
              className="object-cover object-[50%_88%] scale-[1.14] drop-shadow-[0_12px_25px_rgba(15,23,42,0.18)]"
            />
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">{aboutContent.skillsTitle}</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {aboutContent.skills.map((skill) => (
              <span key={skill} className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                {skill}
              </span>
            ))}
          </div>
        </article>

        <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">{aboutContent.achievementsTitle}</h2>
          <ul className="mt-4 list-inside list-disc space-y-2 text-slate-700">
            {aboutContent.achievements.map((achievement) => (
              <li key={achievement}>{achievement}</li>
            ))}
          </ul>
        </article>
      </section>
    </div>
  );
}
