"use client";

import { useLocale } from "@/i18n/LocaleProvider";

export default function TermsPage() {
  const { t } = useLocale();

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <div className="text-sm font-semibold tracking-wide text-[var(--color-cyan)]">
          {t("legal.kicker")}
        </div>
        <h1 className="max-w-3xl font-[var(--font-display)] text-4xl font-semibold tracking-tight text-[var(--color-navy)] sm:text-5xl">
          {t("legal.title")}
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-[var(--color-slate)]">
          {t("legal.subtitle")}
        </p>
      </header>

      <section className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6">
        <div className="space-y-3 text-sm leading-6 text-[var(--color-slate)]">
          <div className="text-sm font-semibold tracking-wide text-[var(--color-cyan)]">
            {t("legal.privacy")}
          </div>
          <div>
            {t("legal.privacy_p1")}
          </div>
          <div>{t("legal.privacy_p2")}</div>
          <div>{t("legal.privacy_p3")}</div>
        </div>
      </section>

      <section className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6">
        <div className="space-y-3 text-sm leading-6 text-[var(--color-slate)]">
          <div className="text-sm font-semibold tracking-wide text-[var(--color-cyan)]">
            {t("legal.terms")}
          </div>
          <div>{t("legal.terms_p1")}</div>
          <div>{t("legal.terms_p2")}</div>
        </div>
      </section>
    </div>
  );
}
