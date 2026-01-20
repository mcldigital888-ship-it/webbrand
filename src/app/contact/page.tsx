"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import PageShell from "@/components/PageShell";
import Bilingual from "@/components/Bilingual";
import { CONFIG } from "@/lib/integrations";
import { submitIntegrationForm } from "@/lib/webhook";
import { trackEvent } from "@/lib/tracking";

export default function ContactPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const startedAtRef = useRef<number | null>(null);
  const [started, setStarted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    objective: "",
    consent: false,
    hp: "",
  });

  const objectiveOptions = useMemo(
    () => ["Website", "Landing", "CRM setup", "Integrations", "AI automations"],
    []
  );

  useEffect(() => {
    setSubmitError(null);
  }, []);

  function setField(name: keyof typeof form, value: string | boolean) {
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
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = "Enter a valid email.";
    }
    if (!form.objective) next.objective = "Select an objective.";
    if (!form.consent) next.consent = "Consent is required.";
    return next;
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

    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) {
      trackEvent("form_error", { form_name: "contact_book_call" });
      return;
    }

    setSubmitting(true);
    try {
      await submitIntegrationForm({
        formName: "contact_book_call",
        consent: form.consent,
        fields: {
          name: form.name,
          email: form.email,
          company: form.company,
          objective: form.objective,
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
    <PageShell
      kicker={<Bilingual en="Contact" it="Contatti" />}
      title={<Bilingual en="Book a call or send the brief" it="Prenota una call o invia il brief" />}
      subtitle={
        <Bilingual
          en="Share your goal, constraints, and timeline. We’ll reply with a clear next step."
          it="Condividi obiettivo, vincoli e tempistiche. Rispondiamo con un prossimo step chiaro."
        />
      }
    >
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="ds-glass rounded-2xl p-6 md:col-span-2">
          <form
            onSubmit={onSubmit}
            className="space-y-6"
            onFocusCapture={() => {
              if (!started) {
                setStarted(true);
                startedAtRef.current = Date.now();
                trackEvent("form_start", { form_name: "contact_book_call" });
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

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Name" required error={errors.name}>
                  <input
                    value={form.name}
                    onChange={(e) => setField("name", e.target.value)}
                    className={inputClassName(!!errors.name)}
                    placeholder="Your name"
                  />
                </Field>
                <Field label="Email" required error={errors.email}>
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
                <Field label="Company">
                  <input
                    value={form.company}
                    onChange={(e) => setField("company", e.target.value)}
                    className={inputClassName(false)}
                    placeholder="Company name"
                  />
                </Field>
                <Field label="Objective" required error={errors.objective}>
                  <select
                    value={form.objective}
                    onChange={(e) => setField("objective", e.target.value)}
                    className={inputClassName(!!errors.objective)}
                  >
                    <option value="">Select</option>
                    {objectiveOptions.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <label className="flex items-start gap-2 text-xs text-[var(--ds-muted)]">
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

              <div className="flex flex-col gap-2 text-xs text-[var(--ds-muted)]">
                <div>Response time: within 24 hours.</div>
                <div>Privacy-first. No spam.</div>
                {!CONFIG.WEBHOOK_URL ? (
                  <div>Webhook not set: submissions are stored locally.</div>
                ) : null}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  disabled={submitting}
                  className="ds-btn ds-btn-primary ds-btn-lg"
                >
                  {submitting ? "Submitting..." : "Send"}
                </button>
                <a
                  href="mailto:hello@webbrand.studio"
                  className="ds-btn ds-btn-ghost ds-btn-lg"
                >
                  Email us
                </a>
                <a
                  href="#book"
                  className="ds-btn ds-btn-ghost ds-btn-lg"
                >
                  Book a Call
                </a>
              </div>

              {submitError ? (
                <div className="text-sm text-[var(--ds-muted)]">{submitError}</div>
              ) : null}
          </form>
        </div>

        <div className="ds-glass rounded-2xl p-6">
          <div className="space-y-3">
            <div className="text-sm font-semibold text-[var(--ds-text)]">What happens next?</div>
            <ul className="space-y-2 text-sm text-[var(--ds-muted)]">
              <li className="flex gap-2">
                <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-cyan)]" />
                <span>We review your message</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-cyan)]" />
                <span>We reply with a clear recommendation</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-cyan)]" />
                <span>We align scope, timeline, and next actions</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="ds-glass rounded-2xl p-6">
          <div className="text-sm font-semibold text-[var(--ds-text)]">Mini FAQ</div>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-[var(--ds-muted)]">
            <div>
              <div className="font-semibold text-[var(--ds-text)]">Do you work with small teams?</div>
              <div>Yes. If the goal is clear and the decision-making is fast.</div>
            </div>
            <div>
              <div className="font-semibold text-[var(--ds-text)]">What’s the usual timeline?</div>
              <div>Most launches ship in weeks, not months. Scope defines speed.</div>
            </div>
            <div>
              <div className="font-semibold text-[var(--ds-text)]">Do you use AI?</div>
              <div>Yes. AI accelerates cycles. Humans decide what ships.</div>
            </div>
            <div>
              <div className="font-semibold text-[var(--ds-text)]">Can we start with a small sprint?</div>
              <div>Yes. We can begin with a strategy + structure sprint, then build.</div>
            </div>
          </div>
        </div>
        <div
          id="book"
          className="ds-glass rounded-2xl p-6"
        >
          <div className="text-sm font-semibold text-[var(--ds-text)]">Book a call</div>
          <div className="mt-3 text-sm leading-relaxed text-[var(--ds-muted)]">
            Add your calendar link here (Calendly, Cal.com, etc.).
          </div>
          <div className="mt-5 inline-flex w-fit rounded-full bg-[var(--ds-accent)] px-5 py-3 text-sm font-semibold text-white">
            Calendar CTA
          </div>
        </div>
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
        <span className="text-sm font-semibold text-[var(--ds-text)]">
          {label}
          {required ? <span className="text-[var(--ds-muted)]"> *</span> : null}
        </span>
        {error ? (
          <span className="text-xs font-medium text-[var(--ds-muted)]">
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
    "ds-input h-11",
    isError ? "border-[var(--ds-accent2)]" : "border-white/10",
    "focus:border-[var(--ds-accent)]",
  ].join(" ");
}
