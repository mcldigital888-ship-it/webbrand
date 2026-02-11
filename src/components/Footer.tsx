"use client";

import LocaleLink from "@/components/LocaleLink";
import { useLocale } from "@/i18n/LocaleProvider";

export default function Footer() {
  const { t } = useLocale();
  const links = [
    { href: "/", label: t("nav.home") },
    { href: "/about", label: t("nav.about") },
    { href: "/services", label: t("nav.services") },
    { href: "/insights", label: t("nav.blog") },
    { href: "/contact", label: t("nav.contact") },
    { href: "/terms", label: t("nav.legal") },
  ];

  return (
    <footer className="border-t border-white/10 bg-[rgba(10,10,12,0.55)] backdrop-blur">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-4 py-14 md:grid-cols-3">
        <div className="space-y-3">
          <div className="font-semibold tracking-tight text-[var(--ds-text)]">
            Webrrand
          </div>
          <p className="text-sm leading-6 text-[var(--ds-muted)]">
            {t("common.brand_tagline")}
          </p>
          <div className="text-sm font-medium text-[var(--ds-muted)]">{t("common.berlin_remote")}</div>
          <div className="text-sm font-medium text-[var(--ds-muted)]">hello@webbrand.studio</div>
        </div>

        <div className="md:col-span-2">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {links.map((l) => (
              <LocaleLink
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-[var(--ds-muted)] transition-colors duration-150 hover:text-[var(--ds-text)]"
              >
                {l.label}
              </LocaleLink>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-2 text-xs text-[var(--ds-muted)] sm:flex-row sm:items-center sm:justify-between">
            <div>{t("footer.copyright", { year: new Date().getFullYear() })}</div>
            <div>{t("common.privacy_first")}</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
