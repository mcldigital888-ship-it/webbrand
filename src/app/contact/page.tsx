"use client";

import { useState } from "react";
import PageShell from "@/components/PageShell";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    budgetRange: "",
    message: "",
  });

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
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = "Enter a valid email.";
    }
    if (!form.budgetRange) next.budgetRange = "Select a budget range.";
    if (!form.message.trim()) next.message = "Message is required.";
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
          source: "contact",
          businessType: "",
          goal: "contact",
          email: form.email,
          answers: {
            name: form.name,
            email: form.email,
            company: form.company,
            budgetRange: form.budgetRange,
            message: form.message,
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
          throw new Error(data?.error || "Invio non riuscito. / Failed to submit.");
        }

        setSubmitted(true);
      } catch (err) {
        setSubmitError(
          err instanceof Error ? err.message : "Invio non riuscito. / Failed to submit."
        );
      } finally {
        setSubmitting(false);
      }
    })();
  }

  return (
    <PageShell
      kicker="Contact"
      title="Book a call or send the brief"
      subtitle="Share your goal, constraints, and timeline. We’ll reply with a clear next step."
    >
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6 md:col-span-2">
          {!submitted ? (
            <form onSubmit={onSubmit} className="space-y-6">
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
                <Field label="Budget range" required error={errors.budgetRange}>
                  <select
                    value={form.budgetRange}
                    onChange={(e) => setField("budgetRange", e.target.value)}
                    className={inputClassName(!!errors.budgetRange)}
                  >
                    <option value="">Select</option>
                    <option value="<5k">&lt; €5k</option>
                    <option value="5-10k">€5k–€10k</option>
                    <option value="10-25k">€10k–€25k</option>
                    <option value="25k+">€25k+</option>
                  </select>
                </Field>
              </div>

              <Field label="Message" required error={errors.message}>
                <textarea
                  value={form.message}
                  onChange={(e) => setField("message", e.target.value)}
                  className={[inputClassName(!!errors.message), "h-28 py-3"].join(" ")}
                  placeholder="Goal, timeline, current setup..."
                />
              </Field>

              <div className="flex flex-col gap-2 text-xs text-[var(--color-slate)]">
                <div>Response time: 24–48 hours.</div>
                <div>Privacy-first. No spam.</div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex w-fit rounded-full bg-[var(--color-blue)] px-5 py-3 text-sm font-semibold text-white hover:opacity-95"
                >
                  {submitting ? "Submitting..." : "Send"}
                </button>
                <a
                  href="mailto:hello@webbrand.studio"
                  className="inline-flex w-fit rounded-full border border-[var(--color-navy)]/15 px-5 py-3 text-sm font-semibold text-[var(--color-navy)] hover:border-[var(--color-navy)]/25 hover:bg-[var(--color-navy)]/[0.03]"
                >
                  Email us
                </a>
                <a
                  href="#book"
                  className="inline-flex w-fit rounded-full border border-[var(--color-navy)]/15 px-5 py-3 text-sm font-semibold text-[var(--color-navy)] hover:border-[var(--color-navy)]/25 hover:bg-[var(--color-navy)]/[0.03]"
                >
                  Book a Call
                </a>
              </div>

              {submitError ? (
                <div className="text-sm text-[var(--color-slate)]">
                  {submitError}
                </div>
              ) : null}
            </form>
          ) : (
            <div className="space-y-4">
              <div className="text-sm font-semibold text-[var(--color-success)]">Sent.</div>
              <div className="text-sm leading-6 text-[var(--color-slate)]">
                We received your message. Next step: we’ll reply with the fastest plan.
              </div>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="inline-flex w-fit rounded-full border border-[var(--color-navy)]/15 px-5 py-3 text-sm font-semibold text-[var(--color-navy)] hover:border-[var(--color-navy)]/25 hover:bg-[var(--color-navy)]/[0.03]"
              >
                Send another message
              </button>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6">
          <div className="space-y-3">
            <div className="text-sm font-semibold text-[var(--color-navy)]">What happens next?</div>
            <ul className="space-y-2 text-sm text-[var(--color-slate)]">
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
        <div className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6">
          <div className="text-sm font-semibold text-[var(--color-navy)]">Mini FAQ</div>
          <div className="mt-4 space-y-4 text-sm leading-6 text-[var(--color-slate)]">
            <div>
              <div className="font-semibold text-[var(--color-navy)]">Do you work with small teams?</div>
              <div>Yes. If the goal is clear and the decision-making is fast.</div>
            </div>
            <div>
              <div className="font-semibold text-[var(--color-navy)]">What’s the usual timeline?</div>
              <div>Most launches ship in weeks, not months. Scope defines speed.</div>
            </div>
            <div>
              <div className="font-semibold text-[var(--color-navy)]">Do you use AI?</div>
              <div>Yes. AI accelerates cycles. Humans decide what ships.</div>
            </div>
            <div>
              <div className="font-semibold text-[var(--color-navy)]">Can we start with a small sprint?</div>
              <div>Yes. We can begin with a strategy + structure sprint, then build.</div>
            </div>
          </div>
        </div>
        <div
          id="book"
          className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6"
        >
          <div className="text-sm font-semibold text-[var(--color-navy)]">Book a call</div>
          <div className="mt-3 text-sm leading-6 text-[var(--color-slate)]">
            Add your calendar link here (Calendly, Cal.com, etc.).
          </div>
          <div className="mt-5 inline-flex w-fit rounded-full bg-[var(--color-blue)] px-5 py-3 text-sm font-semibold text-white">
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
