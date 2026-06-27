type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-brand-400">{eyebrow}</p> : null}
      <h2 className="text-2xl font-bold tracking-tight text-slate-100 md:text-3xl">{title}</h2>
      {description ? <p className="mt-3 leading-relaxed text-slate-400">{description}</p> : null}
    </div>
  );
}
