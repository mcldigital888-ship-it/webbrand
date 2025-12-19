"use client";

import { useMemo, useState } from "react";
import { submitIntegrationForm } from "@/lib/webhook";
import { trackEvent } from "@/lib/tracking";

const OBJECTIVES = [
  "Website",
  "Landing",
  "CRM setup",
  "Integrations",
  "AI automations",
] as const;

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [started, setStarted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    objective: "",
    consent: false,
    hp: "",
  });

  const whatsappHref = useMemo(() => {
    return "https://wa.me/";
  }, []);

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
    setErrors({});

    if (form.hp) return;

    const next = validate();
    if (Object.keys(next).length > 0) {
      setErrors(next);
      trackEvent("form_error", { form_name: "chat_lead" });
      return;
    }

    setSubmitting(true);
    try {
      await submitIntegrationForm({
        formName: "chat_lead",
        consent: form.consent,
        fields: {
          name: form.name,
          email: form.email,
          objective: form.objective,
        },
      });
      setOpen(false);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-[55]">
      {open ? (
        <div className="w-[320px] rounded-2xl border border-black/10 bg-[var(--color-surface)] shadow-sm">
          <div className="flex items-center justify-between border-b border-black/5 px-4 py-3">
            <div className="text-sm font-semibold text-[var(--color-navy)]">Chat</div>
            <button
              type="button"
              className="text-sm font-semibold text-[var(--color-slate)]"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>

          <form
            onSubmit={onSubmit}
            className="space-y-3 px-4 py-4"
            onFocusCapture={() => {
              if (!started) {
                setStarted(true);
                trackEvent("form_start", { form_name: "chat_lead" });
              }
            }}
          >
            <input
              value={form.hp}
              onChange={(e) => setForm((p) => ({ ...p, hp: e.target.value }))}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <label className="block space-y-1">
              <div className="text-xs font-semibold text-[var(--color-navy)]">Name</div>
              <input
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                className="h-10 w-full rounded-xl border border-black/10 bg-white px-3 text-sm text-[var(--color-navy)] outline-none focus:border-[var(--color-blue)]"
              />
              {errors.name ? (
                <div className="text-xs text-[var(--color-slate)]">{errors.name}</div>
              ) : null}
            </label>

            <label className="block space-y-1">
              <div className="text-xs font-semibold text-[var(--color-navy)]">Email</div>
              <input
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                className="h-10 w-full rounded-xl border border-black/10 bg-white px-3 text-sm text-[var(--color-navy)] outline-none focus:border-[var(--color-blue)]"
                inputMode="email"
              />
              {errors.email ? (
                <div className="text-xs text-[var(--color-slate)]">{errors.email}</div>
              ) : null}
            </label>

            <label className="block space-y-1">
              <div className="text-xs font-semibold text-[var(--color-navy)]">Objective</div>
              <select
                value={form.objective}
                onChange={(e) => setForm((p) => ({ ...p, objective: e.target.value }))}
                className="h-10 w-full rounded-xl border border-black/10 bg-white px-3 text-sm text-[var(--color-navy)] outline-none focus:border-[var(--color-blue)]"
              >
                <option value="">Select</option>
                {OBJECTIVES.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
              {errors.objective ? (
                <div className="text-xs text-[var(--color-slate)]">{errors.objective}</div>
              ) : null}
            </label>

            <label className="flex items-start gap-2 text-xs text-[var(--color-slate)]">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(e) => setForm((p) => ({ ...p, consent: e.target.checked }))}
                className="mt-1"
              />
              <span>
                I agree to be contacted. Consent required.
                {errors.consent ? (
                  <span className="block text-[var(--color-slate)]">{errors.consent}</span>
                ) : null}
              </span>
            </label>

            <div className="flex flex-col gap-2">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex w-fit rounded-full bg-[var(--color-blue)] px-4 py-2 text-sm font-semibold text-white hover:opacity-95"
              >
                {submitting ? "Sending..." : "Send"}
              </button>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-fit rounded-full border border-[var(--color-navy)]/15 px-4 py-2 text-sm font-semibold text-[var(--color-navy)] hover:border-[var(--color-navy)]/25 hover:bg-[var(--color-navy)]/[0.03]"
              >
                Talk to human
              </a>
            </div>
          </form>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="ml-auto inline-flex h-12 items-center justify-center rounded-full bg-[var(--color-blue)] px-5 text-sm font-semibold text-white shadow-sm hover:opacity-95"
      >
        {open ? "Close" : "Chat"}
      </button>
    </div>
  );
}
