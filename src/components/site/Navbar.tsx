"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navLinks, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";
import { FlagStrip } from "./FlagStrip";
import { Logo } from "./Logo";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-gold/20 bg-green-deep/95 shadow-lg shadow-black/40 backdrop-blur">
      <FlagStrip />
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <Logo size={52} />
          <span className="sr-only">{siteConfig.name}</span>
        </Link>

        <ul className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "border-b-2 py-1 text-[11px] font-bold uppercase tracking-widest transition-colors hover:text-gold-light",
                  isActive(link.href)
                    ? "border-gold text-gold-light"
                    : "border-transparent text-cream",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <ButtonLink href="#follow" className="hidden sm:inline-flex">
            Follow Us
          </ButtonLink>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="rounded p-2 text-2xl leading-none text-gold-light lg:hidden"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-gold/20 bg-green-deep lg:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col px-4 py-2 sm:px-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block border-b border-gold/10 py-3 text-xs font-bold uppercase tracking-widest",
                    isActive(link.href) ? "text-gold-light" : "text-cream",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="py-4">
              <ButtonLink href="#follow" onClick={() => setOpen(false)}>
                Follow Us
              </ButtonLink>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
