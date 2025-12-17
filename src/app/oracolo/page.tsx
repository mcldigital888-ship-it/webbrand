"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import PageShell from "@/components/PageShell";

export default function OracoloPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    businessType: "",
    primaryGoal: "",
    currentSituation: "",
    adBudgetRange: "",
    timeline: "",
    fullName: "",
    email: "",
    company: "",
    website: "",
  });

  const primaryGoalOptions = useMemo(() => {
    const base = [
      { value: "sales-website", label: "Sales website (conversion-first)" },
      { value: "ads-landing", label: "Ads landing page" },
      { value: "lead-system", label: "Lead system (funnel + CRM + nurture)" },
      { value: "crm", label: "CRM & sales system" },
      { value: "ai", label: "AI / automation" },
      { value: "kiosk", label: "Food/Retail kiosk solution" },
    ];

    if (form.businessType === "food-retail") {
      return base.filter((o) => o.value !== "crm");
    }

    return base;
  }, [form.businessType]);

  const recommendation = useMemo(() => {
    const goal = form.primaryGoal;
    const businessType = form.businessType;

    if (goal === "sales-website") {
      return {
        modules: ["Website Conversion", "CRM & Sales System"],
        timeline: "30–60 days",
        kpi: "Expected conversion uplift: 25–40%",
      };
    }

    if (goal === "ads-landing") {
      return {
        modules: ["Landing Page for Ads", "Lead Generation / Growth Engine"],
        timeline: "14–30 days",
        kpi: "Expected CPL improvement: 15–35%",
      };
    }

    if (goal === "lead-system") {
      return {
        modules: ["Lead Generation / Growth Engine", "CRM & Sales System"],
        timeline: "30–60 days",
        kpi: "Expected lead-to-meeting uplift: 20–35%",
      };
    }

    if (goal === "crm") {
      return {
        modules: ["CRM & Sales System", "Automations"],
        timeline: "14–30 days",
        kpi: "Expected response time reduction: 30–60%",
      };
    }

    if (goal === "ai") {
      return {
        modules: ["AI Assistants", "Automations"],
        timeline: "30–60 days",
        kpi: "Expected manual work reduction: 15–30%",
      };
    }

    if (goal === "kiosk" || businessType === "food-retail") {
      return {
        modules: ["Food / Retail Smart Solutions", "Ordering Kiosk"],
        timeline: "30–60 days",
        kpi: "Expected throughput uplift: 10–25%",
      };
    }

    return {
      modules: ["Website Conversion"],
      timeline: "14–30 days",
      kpi: "Expected KPI uplift: 10–20%",
    };
  }, [form.businessType, form.primaryGoal]);

  function setField(name: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }

  function validate() {
    const next: Record<string, string> = {};
    if (!form.businessType) next.businessType = "Select a business type.";
    if (!form.primaryGoal) next.primaryGoal = "Select a primary goal.";
    if (!form.currentSituation) next.currentSituation = "Select your current situation.";
    if (!form.timeline) next.timeline = "Select a timeline.";
    if (!form.fullName.trim()) next.fullName = "Name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = "Enter a valid email.";
    }
    return next;
  }

  function onSubmit(e: React.FormEvent) {
    void (async () => {
      e.preventDefault();
      setSubmitError(null);
      const next = validate();
      setErrors(next);
      if (Object.keys(next).length > 0) return;

      const leadsEndpointEnabled =
        process.env.NEXT_PUBLIC_LEADS_ENDPOINT_ENABLED === "true";

      if (!leadsEndpointEnabled) {
        setSubmitted(true);
        return;
      }

      setSubmitting(true);
      try {
        const payload = {
          source: "oracolo",
          businessType: form.businessType,
          goal: form.primaryGoal,
          email: form.email,
          answers: {
            businessType: form.businessType,
            primaryGoal: form.primaryGoal,
            currentSituation: form.currentSituation,
            adBudgetRange: form.adBudgetRange,
            timeline: form.timeline,
            fullName: form.fullName,
            email: form.email,
            company: form.company,
            website: form.website,
          },
          timestamp: new Date().toISOString(),
        };

        const res = await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const data = (await res.json().catch(() => null)) as
            | { error?: string }
            | null;
          throw new Error(data?.error || "Failed to submit");
        }

        setSubmitted(true);
      } catch (err) {
        setSubmitError(err instanceof Error ? err.message : "Failed to submit");
      } finally {
        setSubmitting(false);
      }
    })();
  }

  return (
    <PageShell
      kicker="Oracolo"
      title="2-minute smart intake → auto brief"
      subtitle={
        <>
          Answer a few questions and receive a structured brief for the fastest next steps.
          <br />
          Rispondi a poche domande e ricevi un brief strutturato per i prossimi step più rapidi.
        </>
      }
    >
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6 md:col-span-2">
          {!submitted ? (
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field
                  label="Business type"
                  error={errors.businessType}
                  required
                >
                  <select
                    value={form.businessType}
                    onChange={(e) => setField("businessType", e.target.value)}
                    className={inputClassName(!!errors.businessType)}
                  >
                    <option value="">Select</option>
                    <option value="b2b">B2B</option>
                    <option value="food-retail">Food / Retail</option>
                    <option value="service">Service business</option>
                  </select>
                </Field>

                <Field label="Primary goal" error={errors.primaryGoal} required>
                  <select
                    value={form.primaryGoal}
                    onChange={(e) => setField("primaryGoal", e.target.value)}
                    className={inputClassName(!!errors.primaryGoal)}
                  >
                    <option value="">Select</option>
                    {primaryGoalOptions.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field
                  label="Current situation"
                  error={errors.currentSituation}
                  required
                >
                  <select
                    value={form.currentSituation}
                    onChange={(e) => setField("currentSituation", e.target.value)}
                    className={inputClassName(!!errors.currentSituation)}
                  >
                    <option value="">Select</option>
                    <option value="starting">Starting from scratch</option>
                    <option value="have-traffic-no-leads">Traffic exists, leads are weak</option>
                    <option value="have-leads-no-system">Leads exist, no follow-up system</option>
                    <option value="crm-mess">CRM exists but messy / unused</option>
                    <option value="ops-heavy">Ops heavy, lots of manual work</option>
                  </select>
                </Field>

                <Field label="Timeline" error={errors.timeline} required>
                  <select
                    value={form.timeline}
                    onChange={(e) => setField("timeline", e.target.value)}
                    className={inputClassName(!!errors.timeline)}
                  >
                    <option value="">Select</option>
                    <option value="urgent">Urgent</option>
                    <option value="30">30 days</option>
                    <option value="60+">60+ days</option>
                  </select>
                </Field>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Monthly ad budget (optional)">
                  <select
                    value={form.adBudgetRange}
                    onChange={(e) => setField("adBudgetRange", e.target.value)}
                    className={inputClassName(false)}
                  >
                    <option value="">Select</option>
                    <option value="0">No ads</option>
                    <option value="1-2k">$1k–$2k</option>
                    <option value="2-5k">$2k–$5k</option>
                    <option value="5-10k">$5k–$10k</option>
                    <option value="10k+">$10k+</option>
                  </select>
                </Field>

                <Field label="Website (optional)">
                  <input
                    value={form.website}
                    onChange={(e) => setField("website", e.target.value)}
                    className={inputClassName(false)}
                    placeholder="https://..."
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Full name" error={errors.fullName} required>
                  <input
                    value={form.fullName}
                    onChange={(e) => setField("fullName", e.target.value)}
                    className={inputClassName(!!errors.fullName)}
                    placeholder="Your name"
                  />
                </Field>

                <Field label="Email" error={errors.email} required>
                  <input
                    value={form.email}
                    onChange={(e) => setField("email", e.target.value)}
                    className={inputClassName(!!errors.email)}
                    placeholder="you@company.com"
                    inputMode="email"
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Company (optional)">
                  <input
                    value={form.company}
                    onChange={(e) => setField("company", e.target.value)}
                    className={inputClassName(false)}
                    placeholder="Company name"
                  />
                </Field>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex w-fit rounded-full bg-[var(--color-blue)] px-5 py-3 text-sm font-semibold text-white hover:opacity-95"
                >
                  {submitting ? "Submitting..." : "Generate Auto Brief"}
                </button>
                <Link
                  href="/contact"
                  className="inline-flex w-fit rounded-full border border-[var(--color-navy)]/15 px-5 py-3 text-sm font-semibold text-[var(--color-navy)] hover:border-[var(--color-navy)]/25 hover:bg-[var(--color-navy)]/[0.03]"
                >
                  Prefer a call? Contact
                </Link>
              </div>

              {submitError ? (
                <div className="text-sm text-[var(--color-slate)]">
                  {submitError}
                </div>
              ) : null}
            </form>
          ) : (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="text-sm font-semibold text-[var(--color-navy)]">
                  Auto Brief / Brief automatico
                </div>
                <div className="text-sm leading-6 text-[var(--color-slate)]">
                  Copy this brief into your CRM, email, or call notes.
                  <br />
                  Copia questo brief nel tuo CRM, email o note della call.
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6">
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-[var(--color-slate)]">
                      Recommended modules / Moduli consigliati
                    </div>
                    <ul className="space-y-2 text-sm text-[var(--color-navy)]">
                      {recommendation.modules.map((m) => (
                        <li key={m} className="flex gap-2">
                          <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-cyan)]" />
                          <span className="font-semibold">{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6">
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-[var(--color-slate)]">
                      Estimated timeline / Timeline stimata
                    </div>
                    <div className="text-sm font-semibold text-[var(--color-navy)]">
                      {recommendation.timeline}
                    </div>
                    <div className="text-sm leading-6 text-[var(--color-slate)]">
                      Based on scope and integrations.
                      <br />
                      In base a scope e integrazioni.
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6">
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-[var(--color-slate)]">
                      KPI preview / Anteprima KPI
                    </div>
                    <div className="text-sm font-semibold text-[var(--color-navy)]">
                      {recommendation.kpi}
                    </div>
                    <div className="text-sm leading-6 text-[var(--color-slate)]">
                      We validate with tracking and iterate weekly.
                      <br />
                      Validiamo con tracking e iteriamo settimanalmente.
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-black/5 bg-[var(--color-background)] p-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <BriefItem label="Business type" value={form.businessType} />
                  <BriefItem label="Primary goal" value={form.primaryGoal} />
                  <BriefItem label="Current situation" value={form.currentSituation} />
                  <BriefItem label="Timeline" value={form.timeline} />
                  <BriefItem
                    label="Monthly ad budget"
                    value={form.adBudgetRange || "Not specified"}
                  />
                  <BriefItem label="Website" value={form.website || "Not specified"} />
                  <BriefItem label="Name" value={form.fullName} />
                  <BriefItem label="Email" value={form.email} />
                  <BriefItem label="Company" value={form.company || "Not specified"} />
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex w-fit rounded-full bg-[var(--color-blue)] px-5 py-3 text-sm font-semibold text-white hover:opacity-95"
                >
                  Request a Call / Richiedi una call
                </Link>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="inline-flex w-fit rounded-full border border-[var(--color-navy)]/15 px-5 py-3 text-sm font-semibold text-[var(--color-navy)] hover:border-[var(--color-navy)]/25 hover:bg-[var(--color-navy)]/[0.03]"
                >
                  Edit answers
                </button>
              </div>
            </div>
          )}
        </div>

        <aside className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6">
          <div className="space-y-3">
            <div className="text-sm font-semibold text-[var(--color-navy)]">
              Why Oracolo works
            </div>
            <ul className="space-y-2 text-sm text-[var(--color-slate)]">
              <li className="flex gap-2">
                <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-cyan)]" />
                <span>One goal → one recommended system.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-cyan)]" />
                <span>Brief format is CRM-ready.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-cyan)]" />
                <span>Fastest path to a relevant proposal.</span>
              </li>
            </ul>
            <Link
              href="/solutions"
              className="inline-flex w-fit rounded-full border border-[var(--color-navy)]/15 px-4 py-2 text-sm font-semibold text-[var(--color-navy)] hover:border-[var(--color-navy)]/25 hover:bg-[var(--color-navy)]/[0.03]"
            >
              See solutions
            </Link>
          </div>
        </aside>
      </section>
    </PageShell>
  );
}

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-[var(--color-navy)]">
          {label}
          {required ? <span className="text-[var(--color-slate)]"> *</span> : null}
        </span>
        {error ? (
          <span className="text-xs font-medium text-[var(--color-slate)]">
            {error}
          </span>
        ) : null}
      </div>
      {children}
    </label>
  );
}

function inputClassName(isError: boolean) {
  return [
    "h-11 w-full rounded-xl border bg-white px-3 text-sm text-[var(--color-navy)] outline-none",
    isError ? "border-[var(--color-cyan)]" : "border-black/10",
    "focus:border-[var(--color-blue)]",
  ].join(" ");
}

function BriefItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <div className="text-xs font-semibold text-[var(--color-slate)]">{label}</div>
      <div className="text-sm font-medium text-[var(--color-navy)]">{value}</div>
    </div>
  );
}
