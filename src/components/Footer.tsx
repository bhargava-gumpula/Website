import { externalLinks } from "@/data/siteContent";

const links = [
  { label: "GitHub", href: externalLinks.github },
  { label: "LinkedIn", href: externalLinks.linkedin },
  { label: "YouTube", href: externalLinks.youtube },
  { label: "WCA", href: externalLinks.wca }
];

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto flex w-full max-w-6xl justify-center px-4 py-8 text-sm text-slate-400">
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
