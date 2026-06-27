"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { externalLinks, siteIdentity } from "@/data/siteContent";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/classes", label: "Classes" }
];

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12 2a10 10 0 0 0-3.162 19.487c.5.092.682-.216.682-.481 0-.237-.009-.866-.013-1.7-2.777.603-3.363-1.34-3.363-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.607.069-.607 1.004.07 1.532 1.031 1.532 1.031.893 1.53 2.343 1.088 2.914.833.09-.647.35-1.088.636-1.338-2.217-.252-4.549-1.109-4.549-4.938 0-1.09.39-1.98 1.03-2.678-.102-.253-.447-1.268.098-2.643 0 0 .84-.269 2.75 1.023A9.56 9.56 0 0 1 12 6.844c.85.004 1.706.115 2.505.337 1.909-1.292 2.747-1.023 2.747-1.023.547 1.375.202 2.39.099 2.643.64.698 1.028 1.588 1.028 2.678 0 3.839-2.336 4.683-4.56 4.93.359.309.678.92.678 1.855 0 1.339-.012 2.419-.012 2.748 0 .267.18.577.688.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M21.582 7.196a2.993 2.993 0 0 0-2.106-2.118C17.615 4.5 12 4.5 12 4.5s-5.615 0-7.476.578A2.993 2.993 0 0 0 2.418 7.196C1.84 9.07 1.84 12 1.84 12s0 2.93.578 4.804a2.993 2.993 0 0 0 2.106 2.118C6.385 19.5 12 19.5 12 19.5s5.615 0 7.476-.578a2.993 2.993 0 0 0 2.106-2.118C22.16 14.93 22.16 12 22.16 12s0-2.93-.578-4.804ZM10.2 15.2V8.8L15.8 12l-5.6 3.2Z" />
    </svg>
  );
}

function CubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="m12 2 8 4.5v11L12 22 4 17.5v-11L12 2Z" />
      <path d="M12 22V11.5M20 6.5l-8 5-8-5" />
    </svg>
  );
}

const socialLinks = [
  { href: externalLinks.github, label: "GitHub", Icon: GitHubIcon },
  { href: externalLinks.youtube, label: "YouTube", Icon: YouTubeIcon },
  { href: externalLinks.wca, label: "WCA", Icon: CubeIcon }
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => setIsMenuOpen(false);
  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 shadow-sm backdrop-blur-md">
      <nav className="mx-auto w-full max-w-6xl px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight text-slate-100 transition duration-300 hover:text-brand-400"
            onClick={closeMenu}
          >
            {siteIdentity.brandName}
          </Link>

          <button
            type="button"
            className="rounded-md border border-slate-600 px-3 py-1.5 text-sm font-medium text-slate-300 md:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? "Close" : "Menu"}
          </button>

          <ul className="hidden gap-8 text-sm font-medium md:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  className={`nav-link ${isActive(item.href) ? "nav-link-active" : "text-slate-400"}`}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 text-sm font-medium md:flex">
            <Link
              href="/contact"
              className="rounded-lg border border-slate-700 px-3.5 py-1.5 text-slate-300 transition duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:bg-brand-50 hover:text-brand-400 hover:shadow-sm"
            >
              Contact
            </Link>
            <div className="flex items-center gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.label}
                  title={link.label}
                  className="group relative inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-slate-400 transition duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:bg-brand-50 hover:text-brand-400 hover:shadow-sm"
                >
                  <link.Icon className="h-4 w-4" />
                  <span className="sr-only">{link.label}</span>
                  <span className="pointer-events-none absolute top-10 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded bg-slate-700 px-2 py-1 text-[10px] font-medium text-slate-100 opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
                    {link.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className={`md:hidden ${isMenuOpen ? "mt-4 block" : "hidden"}`}>
          <ul className="space-y-2 rounded-xl border border-slate-700 bg-slate-900 p-3 text-sm font-medium text-slate-300 shadow-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  className={`block rounded-lg px-3 py-2 transition duration-300 hover:bg-brand-50 hover:text-brand-400 ${
                    isActive(item.href) ? "bg-brand-50 text-brand-400" : "text-slate-400"
                  }`}
                  href={item.href}
                  onClick={closeMenu}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-1">
              <Link
                href="/contact"
                onClick={closeMenu}
                className="block rounded-md border border-slate-600 px-3 py-2 text-center text-slate-300 transition hover:bg-slate-800"
              >
                Contact
              </Link>
            </li>
            <li className="pt-1">
              <div className="flex items-center justify-center gap-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={link.label}
                    title={link.label}
                    className="group relative inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-slate-400 transition duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:bg-brand-50 hover:text-brand-400 hover:shadow-sm"
                  >
                    <link.Icon className="h-4 w-4" />
                    <span className="sr-only">{link.label}</span>
                    <span className="pointer-events-none absolute top-10 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded bg-slate-700 px-2 py-1 text-[10px] font-medium text-slate-100 opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
                      {link.label}
                    </span>
                  </a>
                ))}
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
