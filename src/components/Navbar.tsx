"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { externalLinks, siteIdentity } from "@/data/siteContent";
import { GitHubIcon, LinkedInIcon, RubiksCubeIcon, YouTubeIcon } from "@/components/SocialIcons";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/classes", label: "Classes" }
];

const socialLinks = [
  { href: externalLinks.github, label: "GitHub", Icon: GitHubIcon, hoverClass: "hover:border-slate-500" },
  { href: externalLinks.linkedin, label: "LinkedIn", Icon: LinkedInIcon, hoverClass: "hover:border-blue-500/70" },
  { href: externalLinks.youtube, label: "YouTube", Icon: YouTubeIcon, hoverClass: "hover:border-red-500/70" },
  { href: externalLinks.wca, label: "WCA", Icon: RubiksCubeIcon, hoverClass: "hover:border-orange-500/70" }
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
                  className={`group relative inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-800/80 transition duration-300 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-sm ${link.hoverClass}`}
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
                    className={`group relative inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-800/80 transition duration-300 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-sm ${link.hoverClass}`}
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
