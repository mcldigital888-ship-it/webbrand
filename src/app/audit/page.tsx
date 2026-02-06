"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { trackEvent } from "@/lib/tracking";
import { getUtmFromUrl } from "@/lib/utm";
import SectionBand from "@/components/SectionBand";
import LocaleLink from "@/components/LocaleLink";
import { useLocale } from "@/i18n/LocaleProvider";

type AuditStep = 0 | 1 | 2 | 3;

type PainPoint =
  | "low_leads"
  | "low_conversion"
  | "no_follow_up"
  | "manual_work"
  | "no_visibility";

type BiggestBottleneck =
  | "traffic"
  | "conversion"
  | "follow_up"
  | "ops"
  | "visibility";

export default function AuditPage() {
  const router = useRouter();
  const { t, locale } = useLocale();
  const [step, setStep] = useState<AuditStep>(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [thankYouOpen, setThankYouOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const startedAtRef = useRef<number | null>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!thankYouOpen) return;
    const t = window.setTimeout(() => {
      router.push(`/${locale}`);
    }, 2500);
    return () => window.clearTimeout(t);
  }, [thankYouOpen, router, locale]);

  const [form, setForm] = useState({
    goal: "",
    businessType: "",
    industry: "",
    teamSize: "",
    monthlyRevenueRange: "",
    primaryOffer: "",
    avgTicketRange: "",
    monthlyLeadVolumeRange: "",
    pain: [] as PainPoint[],
    biggestBottleneck: "" as BiggestBottleneck | "",
    toolsUsed: [] as string[],
    targetMarket: "",
    name: "",
    email: "",
    company: "",
    whatsapp: "",
    consent: false,
    hp: "",
  });

  const goalOptions = useMemo(
    () => [
      { value: "more_leads", label: t("audit.goal.more_leads") },
      { value: "more_sales", label: t("audit.goal.more_sales") },
      { value: "automate_operations", label: t("audit.goal.automate_operations") },
      { value: "ai_for_business", label: t("audit.goal.ai_for_business") },
      { value: "smart_retail_food", label: t("audit.goal.smart_retail_food") },
    ],
    [t]
  );

  const toolOptions = useMemo(
    () => [
      "Meta Ads",
      "Google Ads",
      "GA4",
      "HubSpot",
      "GoHighLevel (GHL)",
      "Shopify",
      "POS",
      "WhatsApp",
      "Mailchimp",
      t("audit.tools.other"),
    ],
    [t]
  );

  const painOptions = useMemo(
    () =>
      [
        { value: "low_leads" as const, label: t("audit.pain.low_leads") },
        { value: "low_conversion" as const, label: t("audit.pain.low_conversion") },
        { value: "no_follow_up" as const, label: t("audit.pain.no_follow_up") },
        { value: "manual_work" as const, label: t("audit.pain.manual_work") },
        { value: "no_visibility" as const, label: t("audit.pain.no_visibility") },
      ] satisfies Array<{ value: PainPoint; label: string }>,
    [t]
  );

  function setField<Name extends keyof typeof form>(name: Name, value: (typeof form)[Name]) {
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name as string]) return prev;
      const next = { ...prev };
      delete next[name as string];
      return next;
    });
  }

  function toggleTool(v: string) {
    setForm((prev) => {
      const exists = prev.toolsUsed.includes(v);
      const nextTools = exists
        ? prev.toolsUsed.filter((t) => t !== v)
        : [...prev.toolsUsed, v];
      return { ...prev, toolsUsed: nextTools };
    });
  }

  function togglePain(v: PainPoint) {
    setForm((prev) => {
      const exists = prev.pain.includes(v);
      const nextPain = exists ? prev.pain.filter((p) => p !== v) : [...prev.pain, v];
      return { ...prev, pain: nextPain };
    });
    setErrors((prev) => {
      if (!prev.pain) return prev;
      const next = { ...prev };
      delete next.pain;
      return next;
    });
  }

  function validateStep(s: AuditStep) {
    const next: Record<string, string> = {};

    if (s >= 0 && !form.goal) next.goal = t("audit.validation.goal_required");

    if (s >= 1) {
      if (!form.businessType.trim()) next.businessType = t("audit.validation.business_type_required");
      if (!form.industry.trim()) next.industry = t("audit.validation.industry_required");
      if (!form.teamSize) next.teamSize = t("audit.validation.team_size_required");
      if (!form.monthlyRevenueRange) next.monthlyRevenueRange = t("audit.validation.monthly_revenue_required");
      if (!form.primaryOffer.trim()) next.primaryOffer = t("audit.validation.primary_offer_required");
      if (!form.avgTicketRange) next.avgTicketRange = t("audit.validation.avg_ticket_required");
      if (!form.monthlyLeadVolumeRange) next.monthlyLeadVolumeRange = t("audit.validation.monthly_leads_required");
    }

    if (s >= 2) {
      if (!form.pain || form.pain.length === 0) next.pain = t("audit.validation.pain_required");
      if (!form.biggestBottleneck) next.biggestBottleneck = t("audit.validation.bottleneck_required");
      if (!form.targetMarket) next.targetMarket = t("audit.validation.target_market_required");
    }

    if (s >= 3) {
      if (!form.name.trim()) next.name = t("audit.validation.name_required");
      if (!form.email.trim()) next.email = t("audit.validation.email_required");
      if (
        form.email.trim() &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
      ) {
        next.email = t("audit.validation.email_invalid");
      }
      if (!form.company.trim()) next.company = t("audit.validation.company_required");
      if (!form.consent) next.consent = t("audit.validation.consent_required");
    }

    return next;
  }

  function nextStep() {
    const nextErrors = validateStep(step);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      trackEvent("form_error", { form_name: "audit" });
      return;
    }
    setStep((s) => (s < 3 ? ((s + 1) as AuditStep) : s));
  }

  function prevStep() {
    setStep((s) => (s > 0 ? ((s - 1) as AuditStep) : s));
  }

  function mapServerError(message: string) {
    if (message === "Invalid payload") return t("audit.errors.invalid_payload");
    if (message === "Server configuration error") return t("audit.errors.server_config_error");
    return message;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);

    if (form.hp) return;

    const startedAt = startedAtRef.current;
    if (startedAt && Date.now() - startedAt < 1200) {
      setSubmitError(t("audit.submit_wait"));
      return;
    }

    const nextErrors = validateStep(3);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      trackEvent("form_error", { form_name: "audit" });
      return;
    }

    setSubmitting(true);
    try {
      const pageUrl = typeof window === "undefined" ? "" : window.location.href;
      const utm = typeof window === "undefined" ? {} : getUtmFromUrl(window.location.href);

      const res = await fetch("/api/audit/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pageUrl,
          utm,
          consent: form.consent,

          goal: form.goal,
          businessType: form.businessType,
          industry: form.industry,
          teamSize: form.teamSize,
          revenueRange: form.monthlyRevenueRange,
          offer: form.primaryOffer,
          avgTicketRange: form.avgTicketRange,
          monthlyLeadsRange: form.monthlyLeadVolumeRange,

          painPoints: form.pain,
          biggestBottleneck: form.biggestBottleneck,
          toolsUsed: form.toolsUsed,
          targetMarket: form.targetMarket,

          name: form.name,
          email: form.email,
          company: form.company,
          whatsapp: form.whatsapp,
        }),
      });

      const data = (await res.json().catch(() => null)) as
        | { ok: true; auditId: string }
        | { ok: false; error: string }
        | null;

      if (!res.ok || !data || data.ok === false) {
        setSubmitError(
          data && data.ok === false ? mapServerError(data.error) : t("audit.submit_failed")
        );
        return;
      }

      setSubmitError(null);
      setThankYouOpen(true);
    } catch {
      setSubmitError(t("audit.submit_failed_local"));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-10">
      {thankYouOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[var(--ds-bg)] p-6 shadow-2xl">
            <div className="space-y-2">
              <div className="text-sm font-semibold tracking-wide text-[var(--ds-muted)]">
                {t("audit.thank_you.kicker")}
              </div>
              <div className="text-xl font-semibold text-[var(--ds-text)]">
                {t("audit.thank_you.title")}
              </div>
              <div className="text-sm leading-6 text-[var(--ds-muted)]">
                {t("audit.thank_you.subtitle")}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setThankYouOpen(false);
                  router.push(`/${locale}`);
                }}
                className="inline-flex w-fit rounded-full bg-[var(--color-blue)] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-95"
              >
                {t("audit.thank_you.cta")}
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <SectionBand tone="accent" className="overflow-hidden">
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="text-sm font-semibold tracking-wide text-[var(--ds-muted)]">
              {t("audit.hero.brand")}
            </div>
            <h1 className="max-w-4xl font-[var(--font-display)] text-4xl font-semibold tracking-tight text-[var(--ds-text)] sm:text-6xl">
              {t("audit.hero.title")}
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-[var(--ds-muted)]">
              {t("audit.hero.subtitle")}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="#audit"
                className="inline-flex w-fit rounded-full bg-[var(--color-blue)] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-95"
              >
                {t("audit.hero.cta_primary")}
              </a>
              <LocaleLink
                href="/"
                className="inline-flex w-fit rounded-full border border-white/15 bg-white/[0.02] px-6 py-3 text-sm font-semibold text-[var(--ds-text)] transition-colors hover:border-white/25 hover:bg-white/[0.04]"
              >
                {t("audit.hero.cta_secondary")}
              </LocaleLink>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="ds-glass rounded-2xl p-6">
              <div className="text-sm font-semibold text-[var(--ds-text)]">
                {t("audit.you_will_receive.title")}
              </div>
              <div className="mt-3 space-y-2 text-sm leading-6 text-[var(--ds-muted)]">
                {[
                  t("audit.you_will_receive.item_1"),
                  t("audit.you_will_receive.item_2"),
                  t("audit.you_will_receive.item_3"),
                  t("audit.you_will_receive.item_4"),
                  t("audit.you_will_receive.item_5"),
                ].map((item) => (
                  <div key={item} className="flex gap-3">
                    <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-blue)]" />
                    <div>{item}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="ds-glass rounded-2xl p-6">
              <div className="text-sm font-semibold text-[var(--ds-text)]">
                {t("audit.industry.title")}
              </div>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  t("audit.industry.badge_food"),
                  t("audit.industry.badge_retail"),
                  t("audit.industry.badge_b2b"),
                  t("audit.industry.badge_franchise"),
                  t("audit.industry.badge_pros"),
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm font-semibold text-[var(--ds-text)]"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm leading-6 text-[var(--ds-muted)]">
                {t("audit.industry.note")}
              </p>
            </div>
          </div>
        </div>
      </SectionBand>

      <SectionBand tone="muted">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-[var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--ds-text)]">
              {t("audit.results.title")}
            </h2>
            <p className="max-w-3xl text-sm leading-6 text-[var(--ds-muted)]">
              {t("audit.results.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="ds-glass rounded-2xl p-6">
              <div className="text-3xl font-semibold tracking-tight text-[var(--ds-text)]">+127%</div>
              <div className="mt-2 text-sm leading-6 text-[var(--ds-muted)]">{t("audit.results.card_1")}</div>
            </div>
            <div className="ds-glass rounded-2xl p-6">
              <div className="text-3xl font-semibold tracking-tight text-[var(--ds-text)]">–43%</div>
              <div className="mt-2 text-sm leading-6 text-[var(--ds-muted)]">{t("audit.results.card_2")}</div>
            </div>
            <div className="ds-glass rounded-2xl p-6">
              <div className="text-3xl font-semibold tracking-tight text-[var(--ds-text)]">+18%</div>
              <div className="mt-2 text-sm leading-6 text-[var(--ds-muted)]">{t("audit.results.card_3")}</div>
            </div>
            <div className="ds-glass rounded-2xl p-6">
              <div className="text-3xl font-semibold tracking-tight text-[var(--ds-text)]">–64%</div>
              <div className="mt-2 text-sm leading-6 text-[var(--ds-muted)]">{t("audit.results.card_4")}</div>
            </div>
          </div>
        </div>
      </SectionBand>

      <SectionBand tone="light">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-[var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--ds-text)]">
              {t("audit.system.title")}
            </h2>
            <p className="max-w-3xl text-sm leading-6 text-[var(--ds-muted)]">
              {t("audit.system.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-5">
            {[
              t("audit.system.badge_web"),
              t("audit.system.badge_marketing"),
              t("audit.system.badge_crm"),
              t("audit.system.badge_ai"),
              t("audit.system.badge_integrations"),
            ].map((m) => (
              <div
                key={m}
                className="ds-glass rounded-2xl p-5 text-sm font-semibold text-[var(--ds-text)]"
              >
                {m}
              </div>
            ))}
          </div>

          <p className="text-sm leading-6 text-[var(--ds-muted)]">
            {t("audit.system.note")}
          </p>
        </div>
      </SectionBand>

      <SectionBand tone="light">
        <div id="audit" className="scroll-mt-24 space-y-6">
          <div className="space-y-2">
            <h2 className="font-[var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--ds-text)]">
              {t("audit.title")}
            </h2>
            <p className="max-w-3xl text-sm leading-6 text-[var(--ds-muted)]">
              {t("audit.subtitle")}
            </p>
          </div>

          <div className="ds-glass rounded-2xl p-6 sm:p-8">
            <form
              onSubmit={onSubmit}
              className="space-y-8"
              onFocusCapture={() => {
                if (!started) {
                  setStarted(true);
                  startedAtRef.current = Date.now();
                  trackEvent("form_start", { form_name: "audit" });
                }
              }}
            >
              <input
                value={form.hp}
                onChange={(e) => setField("hp", e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-xs font-semibold tracking-wide text-[var(--ds-muted)]">
                  {t("audit.form.step_progress", { step: step + 1, total: 4 })}
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full border border-white/10 bg-[var(--ds-line)] sm:max-w-xs">
                  <div
                    className="h-full bg-[var(--color-blue)]"
                    style={{ width: `${((step + 1) / 4) * 100}%` }}
                  />
                </div>
              </div>

              {step === 0 ? (
                <div className="space-y-3">
                  <div className="text-sm font-semibold text-[var(--ds-text)]">
                    {t("audit.form.step_1_title")}
                  </div>
                  {errors.goal ? (
                    <div className="text-xs font-medium text-[var(--ds-muted)]">{errors.goal}</div>
                  ) : null}
                  <div className="grid grid-cols-1 gap-3">
                    {goalOptions.map((o) => (
                      <label
                        key={o.value}
                        className="flex cursor-pointer items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4 hover:bg-white/[0.04]"
                      >
                        <input
                          type="radio"
                          name="goal"
                          value={o.value}
                          checked={form.goal === o.value}
                          onChange={(e) => setField("goal", e.target.value)}
                          className="mt-1 h-4 w-4"
                        />
                        <span className="text-sm font-semibold text-[var(--ds-text)]">{o.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ) : null}

              {step === 1 ? (
                <div className="space-y-5">
                  <div className="text-sm font-semibold text-[var(--ds-text)]">
                    {t("audit.form.step_2_title")}
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold tracking-wide text-[var(--ds-muted)]">
                        {t("audit.form.business_type")}
                      </label>
                      <input
                        value={form.businessType}
                        onChange={(e) => setField("businessType", e.target.value)}
                        className="ds-input"
                        placeholder={t("audit.form.business_type_placeholder")}
                      />
                      {errors.businessType ? (
                        <div className="text-xs font-medium text-[var(--ds-muted)]">{errors.businessType}</div>
                      ) : null}
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold tracking-wide text-[var(--ds-muted)]">
                        {t("audit.form.industry")}
                      </label>
                      <input
                        value={form.industry}
                        onChange={(e) => setField("industry", e.target.value)}
                        className="ds-input"
                        placeholder={t("audit.form.industry_placeholder")}
                      />
                      {errors.industry ? (
                        <div className="text-xs font-medium text-[var(--ds-muted)]">{errors.industry}</div>
                      ) : null}
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-semibold tracking-wide text-[var(--ds-muted)]">
                        {t("audit.form.primary_offer")}
                      </label>
                      <input
                        value={form.primaryOffer}
                        onChange={(e) => setField("primaryOffer", e.target.value)}
                        className="ds-input"
                        placeholder={t("audit.form.primary_offer_placeholder")}
                      />
                      {errors.primaryOffer ? (
                        <div className="text-xs font-medium text-[var(--ds-muted)]">{errors.primaryOffer}</div>
                      ) : null}
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold tracking-wide text-[var(--ds-muted)]">
                        {t("audit.form.team_size")}
                      </label>
                      <select
                        value={form.teamSize}
                        onChange={(e) => setField("teamSize", e.target.value)}
                        className="ds-input"
                      >
                        <option value="">{t("audit.form.select")}</option>
                        {[
                          "1-5",
                          "6-20",
                          "21-50",
                          "51-200",
                          "200+",
                        ].map((v) => (
                          <option key={v} value={v}>
                            {v}
                          </option>
                        ))}
                      </select>
                      {errors.teamSize ? (
                        <div className="text-xs font-medium text-[var(--ds-muted)]">{errors.teamSize}</div>
                      ) : null}
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold tracking-wide text-[var(--ds-muted)]">
                        {t("audit.form.monthly_revenue")}
                      </label>
                      <select
                        value={form.monthlyRevenueRange}
                        onChange={(e) => setField("monthlyRevenueRange", e.target.value)}
                        className="ds-input"
                      >
                        <option value="">{t("audit.form.select")}</option>
                        {[
                          "< €10k",
                          "€10k–€50k",
                          "€50k–€200k",
                          "€200k–€1M",
                          "€1M+",
                        ].map((v) => (
                          <option key={v} value={v}>
                            {v}
                          </option>
                        ))}
                      </select>
                      {errors.monthlyRevenueRange ? (
                        <div className="text-xs font-medium text-[var(--ds-muted)]">{errors.monthlyRevenueRange}</div>
                      ) : null}
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold tracking-wide text-[var(--ds-muted)]">
                        {t("audit.form.avg_ticket")}
                      </label>
                      <select
                        value={form.avgTicketRange}
                        onChange={(e) => setField("avgTicketRange", e.target.value)}
                        className="ds-input"
                      >
                        <option value="">{t("audit.form.select")}</option>
                        {["< €50", "€50–€200", "€200–€1k", "€1k–€10k", "€10k+"].map((v) => (
                          <option key={v} value={v}>
                            {v}
                          </option>
                        ))}
                      </select>
                      {errors.avgTicketRange ? (
                        <div className="text-xs font-medium text-[var(--ds-muted)]">{errors.avgTicketRange}</div>
                      ) : null}
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold tracking-wide text-[var(--ds-muted)]">
                        {t("audit.form.monthly_leads")}
                      </label>
                      <select
                        value={form.monthlyLeadVolumeRange}
                        onChange={(e) => setField("monthlyLeadVolumeRange", e.target.value)}
                        className="ds-input"
                      >
                        <option value="">{t("audit.form.select")}</option>
                        {["0–10", "10–50", "50–200", "200–1,000", "1,000+"].map((v) => (
                          <option key={v} value={v}>
                            {v}
                          </option>
                        ))}
                      </select>
                      {errors.monthlyLeadVolumeRange ? (
                        <div className="text-xs font-medium text-[var(--ds-muted)]">{errors.monthlyLeadVolumeRange}</div>
                      ) : null}
                    </div>
                  </div>
                </div>
              ) : null}

              {step === 2 ? (
                <div className="space-y-3">
                  <div className="text-sm font-semibold text-[var(--ds-text)]">
                    {t("audit.form.step_3_title")}
                  </div>
                  <div className="text-sm leading-6 text-[var(--ds-muted)]">
                    {t("audit.form.step_3_subtitle")}
                  </div>
                  {errors.pain ? (
                    <div className="text-xs font-medium text-[var(--ds-muted)]">{errors.pain}</div>
                  ) : null}

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {painOptions.map((o) => (
                      <label
                        key={o.value}
                        className="flex cursor-pointer items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4 hover:bg-white/[0.04]"
                      >
                        <input
                          type="checkbox"
                          checked={form.pain.includes(o.value)}
                          onChange={() => togglePain(o.value)}
                          className="h-4 w-4"
                        />
                        <span className="text-sm font-semibold text-[var(--ds-text)]">{o.label}</span>
                      </label>
                    ))}
                  </div>

                  <div className="pt-2" />

                  <div className="space-y-2">
                    <div className="text-sm font-semibold text-[var(--ds-text)]">
                      {t("audit.form.bottleneck")}
                    </div>
                    {errors.biggestBottleneck ? (
                      <div className="text-xs font-medium text-[var(--ds-muted)]">{errors.biggestBottleneck}</div>
                    ) : null}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {(
                        [
                          { value: "traffic", label: t("audit.bottleneck.traffic") },
                          { value: "conversion", label: t("audit.bottleneck.conversion") },
                          { value: "follow_up", label: t("audit.bottleneck.follow_up") },
                          { value: "ops", label: t("audit.bottleneck.ops") },
                          { value: "visibility", label: t("audit.bottleneck.visibility") },
                        ] as const
                      ).map((o) => (
                        <label
                          key={o.value}
                          className="flex cursor-pointer items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4 hover:bg-white/[0.04]"
                        >
                          <input
                            type="radio"
                            name="biggestBottleneck"
                            value={o.value}
                            checked={form.biggestBottleneck === o.value}
                            onChange={(e) => setField("biggestBottleneck", e.target.value as BiggestBottleneck)}
                            className="h-4 w-4"
                          />
                          <span className="text-sm font-semibold text-[var(--ds-text)]">{o.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-semibold text-[var(--ds-text)]">
                      {t("audit.form.tools_used")}
                    </div>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {toolOptions.map((t) => (
                        <label
                          key={t}
                          className="flex cursor-pointer items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4 hover:bg-white/[0.04]"
                        >
                          <input
                            type="checkbox"
                            checked={form.toolsUsed.includes(t)}
                            onChange={() => toggleTool(t)}
                            className="h-4 w-4"
                          />
                          <span className="text-sm font-semibold text-[var(--ds-text)]">{t}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-semibold text-[var(--ds-text)]">
                      {t("audit.form.target_market")}
                    </div>
                    {errors.targetMarket ? (
                      <div className="text-xs font-medium text-[var(--ds-muted)]">{errors.targetMarket}</div>
                    ) : null}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {[
                        { value: "IT", label: "IT" },
                        { value: "EN", label: "EN" },
                      ].map((o) => (
                        <label
                          key={o.value}
                          className="flex cursor-pointer items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4 hover:bg-white/[0.04]"
                        >
                          <input
                            type="radio"
                            name="targetMarket"
                            value={o.value}
                            checked={form.targetMarket === o.value}
                            onChange={(e) => setField("targetMarket", e.target.value)}
                            className="h-4 w-4"
                          />
                          <span className="text-sm font-semibold text-[var(--ds-text)]">{o.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}

              {step === 3 ? (
                <div className="space-y-5">
                  <div className="text-sm font-semibold text-[var(--ds-text)]">
                    {t("audit.form.step_4_title")}
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold tracking-wide text-[var(--ds-muted)]">
                        {t("audit.form.name")}
                      </label>
                      <input
                        value={form.name}
                        onChange={(e) => setField("name", e.target.value)}
                        className="ds-input"
                        placeholder={t("audit.form.name_placeholder")}
                      />
                      {errors.name ? (
                        <div className="text-xs font-medium text-[var(--ds-muted)]">{errors.name}</div>
                      ) : null}
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold tracking-wide text-[var(--ds-muted)]">
                        {t("audit.form.email")}
                      </label>
                      <input
                        value={form.email}
                        onChange={(e) => setField("email", e.target.value)}
                        className="ds-input"
                        placeholder={t("audit.form.email_placeholder")}
                      />
                      {errors.email ? (
                        <div className="text-xs font-medium text-[var(--ds-muted)]">{errors.email}</div>
                      ) : null}
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold tracking-wide text-[var(--ds-muted)]">
                        {t("audit.form.company")}
                      </label>
                      <input
                        value={form.company}
                        onChange={(e) => setField("company", e.target.value)}
                        className="ds-input"
                        placeholder={t("audit.form.company_placeholder")}
                      />
                      {errors.company ? (
                        <div className="text-xs font-medium text-[var(--ds-muted)]">{errors.company}</div>
                      ) : null}
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold tracking-wide text-[var(--ds-muted)]">
                        {t("audit.form.whatsapp")}
                      </label>
                      <input
                        value={form.whatsapp}
                        onChange={(e) => setField("whatsapp", e.target.value)}
                        className="ds-input"
                        placeholder={t("audit.form.whatsapp_placeholder")}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                      <input
                        type="checkbox"
                        checked={form.consent}
                        onChange={(e) => setField("consent", e.target.checked)}
                        className="mt-1 h-4 w-4"
                      />
                      <span className="text-sm text-[var(--ds-muted)]">
                        {t("audit.form.consent")}
                      </span>
                    </label>
                    {errors.consent ? (
                      <div className="text-xs font-medium text-[var(--ds-muted)]">{errors.consent}</div>
                    ) : null}
                  </div>
                </div>
              ) : null}

              {submitError ? (
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-sm text-[var(--ds-muted)]">
                  {submitError}
                </div>
              ) : null}

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex gap-3">
                  {step > 0 ? (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="inline-flex w-fit rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-[var(--ds-text)] transition-colors hover:border-white/25 hover:bg-white/[0.04]"
                    >
                      {t("audit.form.back")}
                    </button>
                  ) : null}
                </div>

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="inline-flex w-fit rounded-full bg-[var(--color-blue)] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-95"
                  >
                    {t("audit.form.continue")}
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex w-fit rounded-full bg-[var(--color-blue)] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-95 disabled:opacity-60"
                  >
                    {submitting ? t("audit.form.submitting") : t("audit.form.submit")}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </SectionBand>
    </div>
  );
}
