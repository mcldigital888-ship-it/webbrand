"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { trackEvent } from "@/lib/tracking";
import { getUtmFromUrl } from "@/lib/utm";
import SectionBand from "@/components/SectionBand";

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
  const [step, setStep] = useState<AuditStep>(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const startedAtRef = useRef<number | null>(null);
  const [started, setStarted] = useState(false);

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
      { value: "more_leads", label: "I want more leads" },
      { value: "more_sales", label: "I want more sales" },
      { value: "automate_operations", label: "I want to automate operations" },
      { value: "ai_for_business", label: "I want AI for my business" },
      { value: "smart_retail_food", label: "I want smart retail / food system" },
    ],
    []
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
      "Other",
    ],
    []
  );

  const painOptions = useMemo(
    () =>
      [
        { value: "low_leads" as const, label: "Low leads" },
        { value: "low_conversion" as const, label: "Low conversion" },
        { value: "no_follow_up" as const, label: "No follow-up" },
        { value: "manual_work" as const, label: "Manual work" },
        { value: "no_visibility" as const, label: "No visibility" },
      ] satisfies Array<{ value: PainPoint; label: string }>,
    []
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

    if (s >= 0 && !form.goal) next.goal = "Choose a goal.";

    if (s >= 1) {
      if (!form.businessType.trim()) next.businessType = "Business type is required.";
      if (!form.industry.trim()) next.industry = "Industry is required.";
      if (!form.teamSize) next.teamSize = "Select team size.";
      if (!form.monthlyRevenueRange) next.monthlyRevenueRange = "Select monthly revenue range.";
      if (!form.primaryOffer.trim()) next.primaryOffer = "Primary offer is required.";
      if (!form.avgTicketRange) next.avgTicketRange = "Select avg deal value / ticket range.";
      if (!form.monthlyLeadVolumeRange) next.monthlyLeadVolumeRange = "Select monthly lead volume.";
    }

    if (s >= 2) {
      if (!form.pain || form.pain.length === 0) next.pain = "Select at least one pain point.";
      if (!form.biggestBottleneck) next.biggestBottleneck = "Select the biggest bottleneck.";
      if (!form.targetMarket) next.targetMarket = "Select target country/language.";
    }

    if (s >= 3) {
      if (!form.name.trim()) next.name = "Name is required.";
      if (!form.email.trim()) next.email = "Email is required.";
      if (
        form.email.trim() &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
      ) {
        next.email = "Enter a valid email.";
      }
      if (!form.company.trim()) next.company = "Company is required.";
      if (!form.consent) next.consent = "Consent is required.";
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

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);

    if (form.hp) return;

    const startedAt = startedAtRef.current;
    if (startedAt && Date.now() - startedAt < 1200) {
      setSubmitError("Please wait a moment and try again.");
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
        setSubmitError(data && data.ok === false ? data.error : "Failed to submit");
        return;
      }

      router.push("/audit/thanks");
    } catch {
      setSubmitError("Failed to submit. Payload saved locally.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-10">
      <SectionBand tone="accent" className="overflow-hidden">
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="text-sm font-semibold tracking-wide text-[var(--ds-muted)]">WEBRRAND</div>
            <h1 className="max-w-4xl font-[var(--font-display)] text-4xl font-semibold tracking-tight text-[var(--ds-text)] sm:text-6xl">
              Get your full Revenue System Blueprint in 24 hours
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-[var(--ds-muted)]">
              Answer a few strategic questions and Webbrand will generate your funnel map, CRM & automation plan, timeline,
              and expected ROI.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="#audit"
                className="inline-flex w-fit rounded-full bg-[var(--color-blue)] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-95"
              >
                Start the 2-minute audit
              </a>
              <Link
                href="/"
                className="inline-flex w-fit rounded-full border border-white/15 bg-white/[0.02] px-6 py-3 text-sm font-semibold text-[var(--ds-text)] transition-colors hover:border-white/25 hover:bg-white/[0.04]"
              >
                See the system
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="ds-glass rounded-2xl p-6">
              <div className="text-sm font-semibold text-[var(--ds-text)]">You will receive</div>
              <div className="mt-3 space-y-2 text-sm leading-6 text-[var(--ds-muted)]">
                {[
                  "Project Brief (goal, target, constraints)",
                  "Funnel & Page Blueprint",
                  "Deliverables & Timeline",
                  "KPI & ROI estimate",
                  "Modular price proposal",
                ].map((t) => (
                  <div key={t} className="flex gap-3">
                    <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-blue)]" />
                    <div>{t}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="ds-glass rounded-2xl p-6">
              <div className="text-sm font-semibold text-[var(--ds-text)]">Built for your industry</div>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  "Food & Hospitality",
                  "Retail",
                  "B2B Services",
                  "Franchise",
                  "Professionals",
                ].map((t) => (
                  <div
                    key={t}
                    className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm font-semibold text-[var(--ds-text)]"
                  >
                    {t}
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm leading-6 text-[var(--ds-muted)]">
                Each system is pre-optimized for your sector with proven KPIs.
              </p>
            </div>
          </div>
        </div>
      </SectionBand>

      <SectionBand tone="muted">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-[var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--ds-text)]">
              Real results
            </h2>
            <p className="max-w-3xl text-sm leading-6 text-[var(--ds-muted)]">
              Outcomes when the full system is installed — not just a website.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="ds-glass rounded-2xl p-6">
              <div className="text-3xl font-semibold tracking-tight text-[var(--ds-text)]">+127%</div>
              <div className="mt-2 text-sm leading-6 text-[var(--ds-muted)]">Qualified leads (E-commerce)</div>
            </div>
            <div className="ds-glass rounded-2xl p-6">
              <div className="text-3xl font-semibold tracking-tight text-[var(--ds-text)]">–43%</div>
              <div className="mt-2 text-sm leading-6 text-[var(--ds-muted)]">Sales cycle (B2B)</div>
            </div>
            <div className="ds-glass rounded-2xl p-6">
              <div className="text-3xl font-semibold tracking-tight text-[var(--ds-text)]">+18%</div>
              <div className="mt-2 text-sm leading-6 text-[var(--ds-muted)]">Average ticket (Restaurant)</div>
            </div>
            <div className="ds-glass rounded-2xl p-6">
              <div className="text-3xl font-semibold tracking-tight text-[var(--ds-text)]">–64%</div>
              <div className="mt-2 text-sm leading-6 text-[var(--ds-muted)]">No-show (Hotel)</div>
            </div>
          </div>
        </div>
      </SectionBand>

      <SectionBand tone="light">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-[var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--ds-text)]">
              System, not tools
            </h2>
            <p className="max-w-3xl text-sm leading-6 text-[var(--ds-muted)]">
              We don’t sell tools. We install revenue systems.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-5">
            {[
              "Web",
              "Marketing",
              "CRM",
              "AI",
              "Integrations",
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
            Everything works together in one measurable system.
          </p>
        </div>
      </SectionBand>

      <SectionBand tone="light">
        <div id="audit" className="scroll-mt-24 space-y-6">
          <div className="space-y-2">
            <h2 className="font-[var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--ds-text)]">
              Start the 2-minute audit
            </h2>
            <p className="max-w-3xl text-sm leading-6 text-[var(--ds-muted)]">
              This is a diagnostic funnel — not a contact form.
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
                  Step {step + 1} / 4
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
                  <div className="text-sm font-semibold text-[var(--ds-text)]">Step 1 — Choose your goal</div>
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
                  <div className="text-sm font-semibold text-[var(--ds-text)]">Step 2 — Your business</div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold tracking-wide text-[var(--ds-muted)]">Business type</label>
                      <input
                        value={form.businessType}
                        onChange={(e) => setField("businessType", e.target.value)}
                        className="ds-input"
                        placeholder="e.g., agency, restaurant group, service company"
                      />
                      {errors.businessType ? (
                        <div className="text-xs font-medium text-[var(--ds-muted)]">{errors.businessType}</div>
                      ) : null}
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold tracking-wide text-[var(--ds-muted)]">Industry</label>
                      <input
                        value={form.industry}
                        onChange={(e) => setField("industry", e.target.value)}
                        className="ds-input"
                        placeholder="e.g., retail, hospitality, B2B services"
                      />
                      {errors.industry ? (
                        <div className="text-xs font-medium text-[var(--ds-muted)]">{errors.industry}</div>
                      ) : null}
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-semibold tracking-wide text-[var(--ds-muted)]">
                        Primary offer (what do you sell?)
                      </label>
                      <input
                        value={form.primaryOffer}
                        onChange={(e) => setField("primaryOffer", e.target.value)}
                        className="ds-input"
                        placeholder="e.g., monthly retainers, dinners, consultations, subscriptions"
                      />
                      {errors.primaryOffer ? (
                        <div className="text-xs font-medium text-[var(--ds-muted)]">{errors.primaryOffer}</div>
                      ) : null}
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold tracking-wide text-[var(--ds-muted)]">Team size</label>
                      <select
                        value={form.teamSize}
                        onChange={(e) => setField("teamSize", e.target.value)}
                        className="ds-input"
                      >
                        <option value="">Select…</option>
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
                        Monthly revenue range
                      </label>
                      <select
                        value={form.monthlyRevenueRange}
                        onChange={(e) => setField("monthlyRevenueRange", e.target.value)}
                        className="ds-input"
                      >
                        <option value="">Select…</option>
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
                        Avg deal value / ticket
                      </label>
                      <select
                        value={form.avgTicketRange}
                        onChange={(e) => setField("avgTicketRange", e.target.value)}
                        className="ds-input"
                      >
                        <option value="">Select…</option>
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
                        Monthly lead volume
                      </label>
                      <select
                        value={form.monthlyLeadVolumeRange}
                        onChange={(e) => setField("monthlyLeadVolumeRange", e.target.value)}
                        className="ds-input"
                      >
                        <option value="">Select…</option>
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
                  <div className="text-sm font-semibold text-[var(--ds-text)]">Step 3 — Pain</div>
                  <div className="text-sm leading-6 text-[var(--ds-muted)]">Where do you lose money today?</div>
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
                    <div className="text-sm font-semibold text-[var(--ds-text)]">Biggest bottleneck</div>
                    {errors.biggestBottleneck ? (
                      <div className="text-xs font-medium text-[var(--ds-muted)]">{errors.biggestBottleneck}</div>
                    ) : null}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {(
                        [
                          { value: "traffic", label: "Traffic" },
                          { value: "conversion", label: "Conversion" },
                          { value: "follow_up", label: "Follow-up" },
                          { value: "ops", label: "Ops" },
                          { value: "visibility", label: "Visibility" },
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
                    <div className="text-sm font-semibold text-[var(--ds-text)]">Tools you use today</div>
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
                    <div className="text-sm font-semibold text-[var(--ds-text)]">Target country/language</div>
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
                  <div className="text-sm font-semibold text-[var(--ds-text)]">Step 4 — Contact</div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold tracking-wide text-[var(--ds-muted)]">Name</label>
                      <input
                        value={form.name}
                        onChange={(e) => setField("name", e.target.value)}
                        className="ds-input"
                        placeholder="Your name"
                      />
                      {errors.name ? (
                        <div className="text-xs font-medium text-[var(--ds-muted)]">{errors.name}</div>
                      ) : null}
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold tracking-wide text-[var(--ds-muted)]">Email</label>
                      <input
                        value={form.email}
                        onChange={(e) => setField("email", e.target.value)}
                        className="ds-input"
                        placeholder="you@company.com"
                      />
                      {errors.email ? (
                        <div className="text-xs font-medium text-[var(--ds-muted)]">{errors.email}</div>
                      ) : null}
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold tracking-wide text-[var(--ds-muted)]">Company</label>
                      <input
                        value={form.company}
                        onChange={(e) => setField("company", e.target.value)}
                        className="ds-input"
                        placeholder="Company name"
                      />
                      {errors.company ? (
                        <div className="text-xs font-medium text-[var(--ds-muted)]">{errors.company}</div>
                      ) : null}
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold tracking-wide text-[var(--ds-muted)]">
                        WhatsApp (optional)
                      </label>
                      <input
                        value={form.whatsapp}
                        onChange={(e) => setField("whatsapp", e.target.value)}
                        className="ds-input"
                        placeholder="+39 ..."
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
                        I agree to be contacted about this audit.
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
                      Back
                    </button>
                  ) : null}
                </div>

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="inline-flex w-fit rounded-full bg-[var(--color-blue)] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-95"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex w-fit rounded-full bg-[var(--color-blue)] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-95 disabled:opacity-60"
                  >
                    {submitting ? "Submitting…" : "Generate my blueprint"}
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
