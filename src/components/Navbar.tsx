"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LangToggle } from "@/components/LangToggle";
import Bilingual from "@/components/Bilingual";

const navItems = [
  { href: "/solutions", label: <Bilingual en="Solutions" it="Soluzioni" /> },
  { href: "/crm-system", label: <Bilingual en="CRM System" it="CRM" /> },
  { href: "/ai-systems", label: <Bilingual en="AI Systems" it="AI" /> },
  { href: "/integrations", label: <Bilingual en="Integrations" it="Integrazioni" /> },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [adminCta, setAdminCta] = useState<
    | { show: false }
    | { show: true; href: string; label: string }
    | null
  >(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/admin/api/auth/status", { cache: "no-store" })
      .then((r) => r.json())
      .then((data: any) => {
        if (cancelled) return;
        if (!data || data.ok !== true) {
          setAdminCta({ show: true, href: "/admin/login", label: "Admin Login" });
          return;
        }
        if (data.show) {
          setAdminCta({ show: true, href: data.href, label: data.label });
          return;
        }
        setAdminCta({ show: false });
      })
      .catch(() => {
        if (cancelled) return;
        setAdminCta({ show: true, href: "/admin/login", label: "Admin Login" });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[var(--color-surface)]/80 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
        <Link
          href="/"
          className="font-semibold tracking-tight text-[var(--color-navy)]"
          onClick={() => setOpen(false)}
        >
          Webbrand
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[var(--color-slate)] transition-colors hover:text-[var(--color-navy)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <LangToggle />
          </div>
          {adminCta && adminCta.show ? (
            <Link
              href={adminCta.href}
              className="hidden rounded-full border border-[var(--color-navy)]/15 px-4 py-2 text-sm font-semibold text-[var(--color-navy)] transition-colors hover:border-[var(--color-navy)]/25 hover:bg-[var(--color-navy)]/[0.03] md:inline-flex"
            >
              {adminCta.label}
            </Link>
          ) : null}
          <Link
            href="/oracolo"
            className="hidden rounded-full border border-[var(--color-navy)]/15 px-4 py-2 text-sm font-semibold text-[var(--color-navy)] transition-colors hover:border-[var(--color-navy)]/25 hover:bg-[var(--color-navy)]/[0.03] md:inline-flex"
          >
            <Bilingual en="Oracolo" it="Oracolo" />
          </Link>
          <Link
            href="/contact"
            className="hidden rounded-full bg-[var(--color-blue)] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-95 md:inline-flex"
          >
            <Bilingual en="Book a Call" it="Prenota una call" />
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 items-center justify-center rounded-full border border-[var(--color-navy)]/15 px-4 text-sm font-semibold text-[var(--color-navy)] hover:border-[var(--color-navy)]/25 hover:bg-[var(--color-navy)]/[0.03] md:hidden"
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            Menu
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-black/5 bg-[var(--color-surface)] md:hidden">
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
                  className="rounded-xl px-3 py-2 text-sm font-semibold text-[var(--color-navy)] hover:bg-black/[0.03]"
                >
                  {item.label}
                </Link>
              ))}
              {adminCta && adminCta.show ? (
                <Link
                  href={adminCta.href}
                  onClick={() => setOpen(false)}
                  className="mt-1 inline-flex w-fit rounded-full border border-[var(--color-navy)]/15 px-5 py-3 text-sm font-semibold text-[var(--color-navy)] transition-colors hover:border-[var(--color-navy)]/25 hover:bg-[var(--color-navy)]/[0.03]"
                >
                  {adminCta.label}
                </Link>
              ) : null}
              <Link
                href="/oracolo"
                onClick={() => setOpen(false)}
                className="mt-1 inline-flex w-fit rounded-full border border-[var(--color-navy)]/15 px-5 py-3 text-sm font-semibold text-[var(--color-navy)] transition-colors hover:border-[var(--color-navy)]/25 hover:bg-[var(--color-navy)]/[0.03]"
              >
                <Bilingual en="Oracolo" it="Oracolo" />
              </Link>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="mt-1 inline-flex w-fit rounded-full bg-[var(--color-blue)] px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-95"
              >
                <Bilingual en="Book a Call" it="Prenota una call" />
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
