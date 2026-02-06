"use client";

import LocaleLink from "@/components/LocaleLink";
import SectionBand from "@/components/SectionBand";
import { useLocale } from "@/i18n/LocaleProvider";
import topBandBg from "../../fotos/Webrrand-background-foto.png";
import leak1 from "../../fotos/leak1.png";
import leak2 from "../../fotos/leak2.png";
import tools1 from "../../fotos/tools1.png";
import tools2 from "../../fotos/tools2.png";

export default function HomeClient() {
  const { t } = useLocale();

  return (
    <div className="space-y-10">
      <div className="-mt-14 h-80 overflow-hidden rounded-3xl border border-white/10">
        <div
          className="h-full w-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${topBandBg.src})` }}
          aria-hidden="true"
        />
      </div>

      <SectionBand tone="accent" className="relative overflow-hidden">
        <div className="hero-content space-y-8">
          <div className="space-y-3">
            <div className="text-sm font-semibold tracking-wide text-[var(--ds-muted)]">
              {t("home.hero.brand")}
            </div>
            <h1 className="max-w-4xl font-[var(--font-display)] text-5xl font-semibold tracking-tight text-[var(--ds-text)] sm:text-6xl">
              {t("home.hero.title")}
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-[var(--ds-muted)]">
              {t("home.hero.subtitle")}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <LocaleLink href="/audit" className="ds-btn ds-btn-primary ds-btn-lg">
                {t("home.hero.cta_primary")}
              </LocaleLink>
              <LocaleLink href="#how-it-works" className="ds-btn ds-btn-ghost">
                {t("home.hero.cta_secondary")}
              </LocaleLink>
            </div>
            <p className="text-sm font-medium text-[var(--ds-muted)]">
              {t("home.hero.note")}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="ds-glass ds-lift rounded-2xl p-6">
              <div className="text-sm font-semibold text-[var(--ds-text)]">
                {t("home.hero_cards.more_leads_title")}
              </div>
              <div className="mt-2 text-sm leading-6 text-[var(--ds-muted)]">
                {t("home.hero_cards.more_leads_desc")}
              </div>
            </div>
            <div className="ds-glass ds-lift rounded-2xl p-6">
              <div className="text-sm font-semibold text-[var(--ds-text)]">
                {t("home.hero_cards.auto_followup_title")}
              </div>
              <div className="mt-2 text-sm leading-6 text-[var(--ds-muted)]">
                {t("home.hero_cards.auto_followup_desc")}
              </div>
            </div>
            <div className="ds-glass ds-lift rounded-2xl p-6 md:col-span-3">
              <div className="text-sm font-semibold text-[var(--ds-text)]">
                {t("home.hero_cards.sales_clarity_title")}
              </div>
              <div className="mt-2 text-sm leading-6 text-[var(--ds-muted)]">
                {t("home.hero_cards.sales_clarity_desc")}
              </div>
            </div>
          </div>
        </div>
      </SectionBand>

      <SectionBand tone="muted">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="space-y-2">
            <h2 className="font-[var(--font-display)] text-2xl font-semibold tracking-tight text-[var(--ds-text)] sm:text-3xl">
              {t("home.audit_cta.title")}
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-[var(--ds-muted)]">
              {t("home.audit_cta.subtitle")}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <LocaleLink href="/audit" className="ds-btn ds-btn-primary ds-btn-lg">
              {t("home.audit_cta.primary")}
            </LocaleLink>
            <LocaleLink href="/contact" className="ds-btn ds-btn-ghost ds-btn-lg">
              {t("home.audit_cta.secondary")}
            </LocaleLink>
          </div>
        </div>
      </SectionBand>

      <SectionBand tone="light">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-[var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--ds-text)]">
              {t("home.industry.title")}
            </h2>
            <p className="max-w-3xl text-sm leading-6 text-[var(--ds-muted)]">
              {t("home.industry.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-5">
            {["food", "retail", "b2b", "franchise", "pros"].map((k) => (
              <div
                key={k}
                className="ds-glass rounded-2xl p-5 text-sm font-semibold text-[var(--ds-text)]"
              >
                {t(`home.industry.badge_${k}`)}
              </div>
            ))}
          </div>
        </div>
      </SectionBand>

      <div className="overflow-hidden rounded-3xl border border-white/10">
        <div
          className="h-64 w-full bg-contain bg-center bg-no-repeat md:h-72"
          style={{ backgroundImage: `url(${leak1.src})` }}
          aria-hidden="true"
        />
      </div>

      <SectionBand tone="muted">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-[var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--ds-text)]">
              {t("home.leak.title")}
            </h2>
            <p className="max-w-3xl text-sm leading-relaxed text-[var(--ds-muted)]">
              {t("home.leak.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="ds-glass ds-lift rounded-2xl p-6">
              <div className="text-sm font-semibold text-[var(--ds-text)]">
                {t("home.leak.today_title")}
              </div>
              <div className="mt-3 space-y-2 text-sm leading-relaxed text-[var(--ds-muted)]">
                {[
                  "item_1",
                  "item_2",
                  "item_3",
                  "item_4",
                  "item_5",
                ].map((k) => (
                  <div key={k} className="flex gap-3">
                    <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--ds-accent)]" />
                    <div>{t(`home.leak.today_${k}`)}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="ds-glass ds-lift rounded-2xl p-6">
              <div className="text-sm font-semibold text-[var(--ds-text)]">
                {t("home.leak.cost_title")}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[var(--ds-muted)]">
                {t("home.leak.cost_desc")}
              </p>
              <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                <div className="text-xs font-semibold tracking-wide text-[var(--ds-muted)]">
                  {t("home.leak.simple_fix_label")}
                </div>
                <div className="mt-2 text-sm font-semibold text-[var(--ds-text)]">
                  {t("home.leak.simple_fix_title")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionBand>

      <div className="overflow-hidden rounded-3xl border border-white/10">
        <div
          className="h-64 w-full bg-contain bg-center bg-no-repeat md:h-72"
          style={{ backgroundImage: `url(${leak2.src})` }}
          aria-hidden="true"
        />
      </div>

      <SectionBand tone="light">
        <div id="how-it-works" className="scroll-mt-24 space-y-6">
          <div className="space-y-2">
            <h2 className="font-[var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--ds-text)]">
              {t("home.flow.title")}
            </h2>
            <p className="max-w-3xl text-sm leading-relaxed text-[var(--ds-muted)]">
              {t("home.flow.subtitle")}
            </p>
          </div>

          <div className="ds-glass rounded-2xl p-6">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-6">
              <div className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm font-semibold text-[var(--ds-text)]">
                {t("home.flow.step_traffic")}
              </div>
              <div className="hidden items-center justify-center text-[var(--ds-muted)] md:flex">→</div>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm font-semibold text-[var(--ds-text)]">
                {t("home.flow.step_landing")}
              </div>
              <div className="hidden items-center justify-center text-[var(--ds-muted)] md:flex">→</div>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm font-semibold text-[var(--ds-text)]">
                {t("home.flow.step_crm")}
              </div>
              <div className="hidden items-center justify-center text-[var(--ds-muted)] md:flex">→</div>
            </div>

            <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-6">
              <div className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm font-semibold text-[var(--ds-text)]">
                {t("home.flow.step_automation")}
              </div>
              <div className="hidden items-center justify-center text-[var(--ds-muted)] md:flex">→</div>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm font-semibold text-[var(--ds-text)]">
                {t("home.flow.step_sales")}
              </div>
              <div className="hidden items-center justify-center text-[var(--ds-muted)] md:flex">→</div>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm font-semibold text-[var(--ds-text)] md:col-span-2">
                {t("home.flow.step_dashboard")}
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-[var(--ds-muted)]">
              {t("home.flow.note")}
            </p>
          </div>
        </div>
      </SectionBand>

      <SectionBand tone="light">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-[var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--ds-text)]">
              {t("home.tools.title")}
            </h2>
            <p className="max-w-3xl text-sm leading-6 text-[var(--ds-muted)]">
              {t("home.tools.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-5">
            {["web", "marketing", "crm", "ai", "integrations"].map((k) => (
              <div
                key={k}
                className="ds-glass rounded-2xl p-5 text-sm font-semibold text-[var(--ds-text)]"
              >
                {t(`home.tools.badge_${k}`)}
              </div>
            ))}
          </div>

          <div className="ds-glass rounded-2xl p-5">
            <div className="text-sm font-semibold text-[var(--ds-text)]">
              {t("home.tools.together_title")}
            </div>
            <p className="mt-2 text-sm leading-6 text-[var(--ds-muted)]">
              {t("home.tools.together_desc")}
            </p>
          </div>
        </div>
      </SectionBand>

      <div className="overflow-hidden rounded-3xl border border-white/10">
        <div
          className="h-64 w-full bg-contain bg-center bg-no-repeat md:h-72"
          style={{ backgroundImage: `url(${tools2.src})` }}
          aria-hidden="true"
        />
      </div>

      <SectionBand tone="muted">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-[var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--ds-text)]">
              {t("home.results.title")}
            </h2>
            <p className="max-w-3xl text-sm leading-6 text-[var(--ds-muted)]">
              {t("home.results.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="ds-glass ds-lift rounded-2xl p-6">
              <div className="text-lg font-semibold text-[var(--ds-text)]">
                {t("home.results.card_1_title")}
              </div>
              <div className="mt-2 text-sm leading-relaxed text-[var(--ds-muted)]">
                {t("home.results.card_1_desc")}
              </div>
            </div>
            <div className="ds-glass ds-lift rounded-2xl p-6">
              <div className="text-lg font-semibold text-[var(--ds-text)]">
                {t("home.results.card_2_title")}
              </div>
              <div className="mt-2 text-sm leading-relaxed text-[var(--ds-muted)]">
                {t("home.results.card_2_desc")}
              </div>
            </div>
            <div className="ds-glass ds-lift rounded-2xl p-6">
              <div className="text-lg font-semibold text-[var(--ds-text)]">
                {t("home.results.card_3_title")}
              </div>
              <div className="mt-2 text-sm leading-relaxed text-[var(--ds-muted)]">
                {t("home.results.card_3_desc")}
              </div>
            </div>
          </div>
        </div>
      </SectionBand>

      <SectionBand tone="light">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-[var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--ds-text)]">
              {t("home.for.title")}
            </h2>
            <p className="max-w-3xl text-sm leading-relaxed text-[var(--ds-muted)]">
              {t("home.for.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
            {[
              { k: "b2b", title: "title", desc: "desc" },
              { k: "agencies", title: "title", desc: "desc" },
              { k: "restaurants", title: "title", desc: "desc" },
              { k: "franchises", title: "title", desc: "desc" },
              { k: "services", title: "title", desc: "desc" },
            ].map((item) => (
              <div key={item.k} className="ds-glass ds-lift rounded-2xl p-6">
                <div className="text-sm font-semibold text-[var(--ds-text)]">
                  {t(`home.for.${item.k}_${item.title}`)}
                </div>
                <div className="mt-2 text-sm leading-relaxed text-[var(--ds-muted)]">
                  {t(`home.for.${item.k}_${item.desc}`)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionBand>

      <div className="overflow-hidden rounded-3xl border border-white/10">
        <div
          className="h-64 w-full bg-contain bg-center bg-no-repeat md:h-72"
          style={{ backgroundImage: `url(${tools1.src})` }}
          aria-hidden="true"
        />
      </div>

      <SectionBand tone="muted">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-[var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--ds-text)]">
              {t("home.process.title")}
            </h2>
            <p className="max-w-3xl text-sm leading-relaxed text-[var(--ds-muted)]">
              {t("home.process.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {["01", "02", "03"].map((n, idx) => (
              <div key={n} className="ds-glass ds-lift rounded-2xl p-6">
                <div className="text-xs font-semibold tracking-wide text-[var(--ds-muted)]">
                  {n}
                </div>
                <div className="mt-2 text-lg font-semibold text-[var(--ds-text)]">
                  {t(`home.process.step_${idx + 1}_title`)}
                </div>
                <div className="mt-2 text-sm leading-relaxed text-[var(--ds-muted)]">
                  {t(`home.process.step_${idx + 1}_desc`)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionBand>

      <SectionBand tone="light">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-[var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--ds-text)]">
              {t("home.packages.title")}
            </h2>
            <p className="max-w-3xl text-sm leading-relaxed text-[var(--ds-muted)]">
              {t("home.packages.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {["leads", "sales", "ops", "retail"].map((k) => (
              <div key={k} className="ds-glass ds-lift rounded-2xl p-6">
                <div className="text-sm font-semibold text-[var(--ds-text)]">
                  {t(`home.packages.${k}_title`)}
                </div>
                <div className="mt-2 text-sm leading-relaxed text-[var(--ds-muted)]">
                  {t(`home.packages.${k}_desc`)}
                </div>
                <div className="mt-5">
                  <LocaleLink href="/audit" className="ds-btn ds-btn-ghost ds-btn-sm">
                    {t("home.packages.start_audit")}
                  </LocaleLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionBand>

      <SectionBand tone="accent">
        <div className="space-y-4">
          <h2 className="font-[var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--ds-text)]">
            {t("home.final_cta.title")}
          </h2>
          <p className="max-w-3xl text-sm leading-relaxed text-[var(--ds-muted)]">
            {t("home.final_cta.subtitle")}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <LocaleLink href="/audit" className="ds-btn ds-btn-primary ds-btn-lg">
              {t("home.final_cta.primary")}
            </LocaleLink>
            <LocaleLink href="/audit" className="ds-btn ds-btn-ghost ds-btn-lg">
              {t("home.final_cta.secondary")}
            </LocaleLink>
          </div>
        </div>
      </SectionBand>
    </div>
  );
}
