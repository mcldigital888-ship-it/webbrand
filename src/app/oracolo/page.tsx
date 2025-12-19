"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { submitIntegrationForm } from "@/lib/webhook";
import { trackEvent } from "@/lib/tracking";

type OracoloStep = 0 | 1 | 2 | 3 | 4;

export default function OracoloPage() {
  const router = useRouter();
  const [step, setStep] = useState<OracoloStep>(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const startedAtRef = useRef<number | null>(null);
  const [started, setStarted] = useState(false);

  const [form, setForm] = useState({
    objective: "",
    companySize: "",
    budgetRange: "",
    urgency: "",
    email: "",
    consent: false,
    hp: "",
  });

  const objectiveOptions = useMemo(
    () => [
      { value: "website", label: "Website" },
      { value: "landing", label: "Landing" },
      { value: "crm", label: "CRM" },
      { value: "integrations", label: "Integrations" },
      { value: "ai", label: "AI" },
    ],
    []
  );

  function setField(name: keyof typeof form, value: string | boolean) {
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }

  function validateStep(s: OracoloStep) {
    const next: Record<string, string> = {};
    if (s >= 0 && !form.objective) next.objective = "Select an objective.";
    if (s >= 1 && !form.companySize) next.companySize = "Select company size.";
    if (s >= 2 && !form.budgetRange) next.budgetRange = "Select a budget range.";
    if (s >= 3 && !form.urgency) next.urgency = "Select urgency.";
    if (s >= 4) {
      if (!form.email.trim()) next.email = "Email is required.";
      if (
        form.email.trim() &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
      ) {
        next.email = "Enter a valid email.";
      }
      if (!form.consent) next.consent = "Consent is required.";
    }
    return next;
  }

  function nextStep() {
    const nextErrors = validateStep(step);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      trackEvent("form_error", { form_name: "oracolo" });
      return;
    }
    setStep((s) => (s < 4 ? ((s + 1) as OracoloStep) : s));
  }

  function prevStep() {
    setStep((s) => (s > 0 ? ((s - 1) as OracoloStep) : s));
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

    const nextErrors = validateStep(4);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      trackEvent("form_error", { form_name: "oracolo" });
      return;
    }

    setSubmitting(true);
    try {
      await submitIntegrationForm({
        formName: "oracolo",
        consent: form.consent,
        fields: {
          objective: form.objective,
          company_size: form.companySize,
          budget_range: form.budgetRange,
          urgency: form.urgency,
          email: form.email,
        },
      });
      router.push("/thank-you");
    } catch {
      setSubmitError("Failed to submit. Payload saved locally.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-black/5 bg-[#ff5a1f] px-6 py-10 text-black sm:px-10">
        <div className="space-y-6">
          <div className="space-y-3">
            <h1 className="font-[var(--font-display)] text-4xl font-semibold tracking-tight sm:text-5xl">
              Oracolo webrrand™ — dimmi cosa vuoi costruire
              <br />
              <span className="text-black/70">Webrrand oracle™ — tell us what to build</span>
            </h1>
            <p className="max-w-3xl text-sm leading-6 text-black/75">
              Compili 2 minuti. L&apos;Oracolo fa le domande giuste e genera: Brief completo + Roadmap implementazione + Stima
              tempi + KPI target + proposta modulare.
              <span className="text-black/60"> / </span>
              A 2-minute intake. We ask the right questions and generate: a full brief + implementation roadmap +
              timeline + KPI targets + modular quote.
            </p>
          </div>

          <div className="rounded-2xl border border-black/10 bg-black/10 p-6">
            <div className="text-sm font-semibold text-black">
              Cosa ottieni
              <span className="text-black/60"> / </span>
              What you get
            </div>
            <div className="mt-2 text-sm leading-6 text-black/75">
              Project Brief (obiettivo, target, vincoli), Page/Flow Blueprint, Deliverables & Timeline, Stima ROI/KPI,
              Preventivo modulare.
              <span className="text-black/60"> / </span>
              Project brief (objective, target, constraints), page/flow blueprint, deliverables & timeline, ROI/KPI
              estimate, modular quote.
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-black/5 bg-[var(--color-surface)] p-6 sm:p-8">
        <form
          onSubmit={onSubmit}
          className="space-y-8"
          onFocusCapture={() => {
            if (!started) {
              setStarted(true);
              startedAtRef.current = Date.now();
              trackEvent("form_start", { form_name: "oracolo" });
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

          <div className="text-xs font-semibold tracking-wide text-[var(--color-slate)]">
            Step {step + 1} / 5
          </div>

          {step === 0 ? (
            <div className="space-y-3">
              <div className="text-sm font-semibold text-[var(--color-navy)]">
                Objective
              </div>
              {errors.objective ? (
                <div className="text-xs font-medium text-[var(--color-slate)]">{errors.objective}</div>
              ) : null}
              <div className="grid grid-cols-1 gap-3">
                {objectiveOptions.map((o) => (
                  <label
                    key={o.value}
                    className="flex cursor-pointer items-start gap-3 rounded-2xl border border-black/10 bg-white p-4 hover:bg-[var(--color-background)]"
                  >
                    <input
                      type="radio"
                      name="objective"
                      value={o.value}
                      checked={form.objective === o.value}
                      onChange={(e) => setField("objective", e.target.value)}
                      className="mt-1 h-4 w-4"
                    />
                    <span className="text-sm font-semibold text-[var(--color-navy)]">
                      {o.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ) : null}

          {step === 1 ? (
            <div className="space-y-3">
              <div className="text-sm font-semibold text-[var(--color-navy)]">
                Company size
              </div>
              {errors.companySize ? (
                <div className="text-xs font-medium text-[var(--color-slate)]">{errors.companySize}</div>
              ) : null}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {["1-5", "6-20", "21-100", "100+"].map((v) => (
                  <label
                    key={v}
                    className="flex cursor-pointer items-center gap-3 rounded-2xl border border-black/10 bg-white p-4 hover:bg-[var(--color-background)]"
                  >
                    <input
                      type="radio"
                      name="companySize"
                      value={v}
                      checked={form.companySize === v}
                      onChange={(e) => setField("companySize", e.target.value)}
                      className="h-4 w-4"
                    />
                    <span className="text-sm font-semibold text-[var(--color-navy)]">{v}</span>
                  </label>
                ))}
              </div>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="space-y-3">
              <div className="text-sm font-semibold text-[var(--color-navy)]">
                Budget range
              </div>
              {errors.budgetRange ? (
                <div className="text-xs font-medium text-[var(--color-slate)]">{errors.budgetRange}</div>
              ) : null}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {["<5k", "5-10k", "10-25k", "25k+"].map((v) => (
                  <label
                    key={v}
                    className="flex cursor-pointer items-center gap-3 rounded-2xl border border-black/10 bg-white p-4 hover:bg-[var(--color-background)]"
                  >
                    <input
                      type="radio"
                      name="budgetRange"
                      value={v}
                      checked={form.budgetRange === v}
                      onChange={(e) => setField("budgetRange", e.target.value)}
                      className="h-4 w-4"
                    />
                    <span className="text-sm font-semibold text-[var(--color-navy)]">{v}</span>
                  </label>
                ))}
              </div>
            </div>
          ) : null}

          {step === 3 ? (
            <div className="space-y-3">
              <div className="text-sm font-semibold text-[var(--color-navy)]">
                Urgency
              </div>
              {errors.urgency ? (
                <div className="text-xs font-medium text-[var(--color-slate)]">{errors.urgency}</div>
              ) : null}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  { value: "asap", label: "ASAP" },
                  { value: "30", label: "Within 30 days" },
                  { value: "60", label: "Within 60 days" },
                  { value: "90+", label: "90+ days" },
                ].map((o) => (
                  <label
                    key={o.value}
                    className="flex cursor-pointer items-center gap-3 rounded-2xl border border-black/10 bg-white p-4 hover:bg-[var(--color-background)]"
                  >
                    <input
                      type="radio"
                      name="urgency"
                      value={o.value}
                      checked={form.urgency === o.value}
                      onChange={(e) => setField("urgency", e.target.value)}
                      className="h-4 w-4"
                    />
                    <span className="text-sm font-semibold text-[var(--color-navy)]">{o.label}</span>
                  </label>
                ))}
              </div>
            </div>
          ) : null}

          {step === 4 ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="text-sm font-semibold text-[var(--color-navy)]">
                  Email
                </div>
                <input
                  value={form.email}
                  onChange={(e) => setField("email", e.target.value)}
                  className={inputClassName(!!errors.email)}
                  placeholder="you@company.com"
                  inputMode="email"
                />
                {errors.email ? (
                  <div className="text-xs font-medium text-[var(--color-slate)]">{errors.email}</div>
                ) : null}
              </div>

              <label className="flex items-start gap-2 text-xs text-[var(--color-slate)]">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => setField("consent", e.target.checked)}
                  className="mt-1"
                />
                <span>
                  I agree to be contacted and accept the Privacy policy.
                  {errors.consent ? (
                    <span className="block">{errors.consent}</span>
                  ) : null}
                </span>
              </label>

              {submitError ? (
                <div className="rounded-2xl border border-[var(--color-cyan)]/40 bg-[var(--color-background)] p-4 text-sm text-[var(--color-slate)]">
                  {submitError}
                </div>
              ) : null}
            </div>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-xs text-[var(--color-slate)]">
              We will reply within 24–48 hours.
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              {step > 0 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="inline-flex w-fit rounded-full border border-[var(--color-navy)]/15 px-6 py-3 text-sm font-semibold text-[var(--color-navy)] hover:border-[var(--color-navy)]/25 hover:bg-[var(--color-navy)]/[0.03]"
                >
                  Back
                </button>
              ) : null}
              {step < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="inline-flex w-fit rounded-full bg-[var(--color-blue)] px-6 py-3 text-sm font-semibold text-white hover:opacity-95"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex w-fit rounded-full bg-[var(--color-blue)] px-6 py-3 text-sm font-semibold text-white hover:opacity-95"
                >
                  {submitting ? "Sending..." : "Submit"}
                </button>
              )}
            </div>
          </div>
        </form>
      </section>
    </div>
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
