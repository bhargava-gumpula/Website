import type { Project } from "@/data/siteContent";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <h3 className="text-lg font-semibold text-slate-900">{project.title}</h3>
      <p className="mt-2 text-sm text-slate-600">{project.summary}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <span key={item} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
            {item}
          </span>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-3 text-sm">
        {project.githubUrl ? (
          <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-brand-600 hover:text-brand-700">
            GitHub
          </a>
        ) : null}
        {project.demoUrl ? (
          <a href={project.demoUrl} target="_blank" rel="noreferrer" className="text-brand-600 hover:text-brand-700">
            Demo
          </a>
        ) : null}
        {project.youtubeUrl ? (
          <a href={project.youtubeUrl} target="_blank" rel="noreferrer" className="text-brand-600 hover:text-brand-700">
            YouTube
          </a>
        ) : null}
      </div>
    </article>
  );
}
