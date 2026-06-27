import type { Project } from "@/data/siteContent";
import { ExternalLinkIcon, GitHubIcon, YouTubeIcon } from "@/components/SocialIcons";

type ProjectCardProps = {
  project: Project;
};

const iconLinkClass =
  "inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-800/80 transition duration-300 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-sm";

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="hover-lift rounded-xl border border-slate-700/70 bg-slate-900 p-5 shadow-soft">
      <h3 className="text-lg font-semibold text-slate-100">{project.title}</h3>
      <p className="mt-2 text-sm text-slate-400">{project.summary}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <span key={item} className="rounded-full bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-300">
            {item}
          </span>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.githubUrl ? (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            title="GitHub"
            className={`${iconLinkClass} hover:border-slate-500`}
          >
            <GitHubIcon className="h-4 w-4" />
          </a>
        ) : null}
        {project.demoUrl ? (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Demo"
            title="Demo"
            className={`${iconLinkClass} hover:border-brand-400/70`}
          >
            <ExternalLinkIcon className="h-4 w-4" />
          </a>
        ) : null}
        {project.youtubeUrl ? (
          <a
            href={project.youtubeUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="YouTube"
            title="YouTube"
            className={`${iconLinkClass} hover:border-red-500/70`}
          >
            <YouTubeIcon className="h-4 w-4" />
          </a>
        ) : null}
      </div>
    </article>
  );
}
