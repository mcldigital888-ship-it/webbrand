"use client";

import { useState } from "react";
import LocaleLink from "@/components/LocaleLink";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLocale } from "@/i18n/LocaleProvider";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { t } = useLocale();

  const navItems = [
    { href: "/", label: t("nav.home") },
    { href: "/about", label: t("nav.about") },
    { href: "/services", label: t("nav.services") },
    { href: "/contact", label: t("nav.contact") },
    { href: "/terms", label: t("nav.legal") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[rgba(10,10,12,0.55)] backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
        <LocaleLink
          href="/"
          className="font-semibold tracking-tight text-[var(--ds-text)]"
          onClick={() => setOpen(false)}
        >
          Webrrand
        </LocaleLink>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <LocaleLink
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[var(--ds-muted)] transition-colors duration-150 hover:text-[var(--ds-text)]"
            >
              {item.label}
            </LocaleLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>

          <LocaleLink
            href="/audit"
            className="hidden ds-btn ds-btn-primary ds-btn-sm md:inline-flex"
          >
            {t("nav.get_audit")}
          </LocaleLink>
          <LocaleLink
            href="/admin"
            className="hidden ds-btn ds-btn-ghost ds-btn-sm md:inline-flex"
          >
            {t("nav.open_admin")}
          </LocaleLink>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] px-4 text-sm font-semibold text-[var(--ds-text)] backdrop-blur transition-colors duration-150 hover:border-white/15 hover:bg-white/[0.04] md:hidden"
            aria-expanded={open}
            aria-label={t("nav.toggle_menu_aria")}
          >
            {t("nav.menu")}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-[rgba(10,10,12,0.70)] backdrop-blur md:hidden">
          <div className="mx-auto w-full max-w-6xl px-4 py-4">
            <div className="flex flex-col gap-3">
              <div className="w-fit">
                <LanguageSwitcher />
              </div>
              {navItems.map((item) => (
                <LocaleLink
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2 text-sm font-semibold text-[var(--ds-text)] transition-colors duration-150 hover:bg-white/[0.04]"
                >
                  {item.label}
                </LocaleLink>
              ))}

              <LocaleLink
                href="/audit"
                onClick={() => setOpen(false)}
                className="mt-1 ds-btn ds-btn-primary"
              >
                {t("nav.get_audit")}
              </LocaleLink>
              <LocaleLink
                href="/admin"
                onClick={() => setOpen(false)}
                className="ds-btn ds-btn-ghost"
              >
                {t("nav.open_admin_panel")}
              </LocaleLink>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
