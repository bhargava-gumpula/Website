import { externalLinks } from "@/data/siteContent";

const links = [
  { label: "GitHub", href: externalLinks.github },
  { label: "YouTube", href: externalLinks.youtube },
  { label: "WCA", href: externalLinks.wca }
];

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
        <p>Built for portfolio, teaching, and community learning.</p>
        <div className="flex gap-4">
          {links.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="hover:text-brand-400">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
