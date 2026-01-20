"use client";

import Link from "next/link";
import { useState } from "react";
import { LangToggle } from "@/components/LangToggle";
import Bilingual from "@/components/Bilingual";

const navItems = [
  { href: "/", label: <Bilingual en="Home" it="Home" /> },
  { href: "/about", label: <Bilingual en="About" it="Chi siamo" /> },
  { href: "/services", label: <Bilingual en="Services" it="Servizi" /> },
  { href: "/contact", label: <Bilingual en="Contact" it="Contatti" /> },
  { href: "/privacy", label: <Bilingual en="Privacy" it="Privacy" /> },
  { href: "/terms", label: <Bilingual en="Terms" it="Termini" /> },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[rgba(10,10,12,0.55)] backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
        <Link
          href="/"
          className="font-semibold tracking-tight text-[var(--ds-text)]"
          onClick={() => setOpen(false)}
        >
          Webrrand
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[var(--ds-muted)] transition-colors duration-150 hover:text-[var(--ds-text)]"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/admin"
            className="text-sm font-medium text-[var(--ds-muted)] transition-colors duration-150 hover:text-[var(--ds-text)]"
          >
            <Bilingual en="Admin Panel" it="Pannello admin" />
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <LangToggle />
          </div>

          <Link
            href="/audit"
            className="hidden ds-btn ds-btn-primary ds-btn-sm md:inline-flex"
          >
            <Bilingual en="Get a Free System Audit" it="Get a Free System Audit" />
          </Link>
          <Link
            href="/admin"
            className="hidden ds-btn ds-btn-ghost ds-btn-sm md:inline-flex"
          >
            <Bilingual en="Open Admin" it="Apri admin" />
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] px-4 text-sm font-semibold text-[var(--ds-text)] backdrop-blur transition-colors duration-150 hover:border-white/15 hover:bg-white/[0.04] md:hidden"
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            Menu
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-[rgba(10,10,12,0.70)] backdrop-blur md:hidden">
          <div className="mx-auto w-full max-w-6xl px-4 py-4">
            <div className="flex flex-col gap-3">
              <div className="w-fit">
                <LangToggle />
              </div>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2 text-sm font-semibold text-[var(--ds-text)] transition-colors duration-150 hover:bg-white/[0.04]"
                >
                  {item.label}
                </Link>
              ))}

              <Link
                href="/audit"
                onClick={() => setOpen(false)}
                className="mt-1 ds-btn ds-btn-primary"
              >
                <Bilingual en="Get a Free System Audit" it="Get a Free System Audit" />
              </Link>
              <Link
                href="/admin"
                onClick={() => setOpen(false)}
                className="ds-btn ds-btn-ghost"
              >
                <Bilingual en="Open Admin Panel" it="Apri pannello admin" />
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
