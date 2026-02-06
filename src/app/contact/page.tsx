"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import PageShell from "@/components/PageShell";
import { CONFIG } from "@/lib/integrations";
import { submitIntegrationForm } from "@/lib/webhook";
import { trackEvent } from "@/lib/tracking";
import { useLocale } from "@/i18n/LocaleProvider";

export default function ContactPage() {
  const router = useRouter();
  const { t, locale } = useLocale();
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
    () => [
      t("contact.objective_options.website"),
      t("contact.objective_options.landing"),
      t("contact.objective_options.crm_setup"),
      t("contact.objective_options.integrations"),
      t("contact.objective_options.ai_automations"),
    ],
    [t]
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
    if (!form.name.trim()) next.name = t("contact.validation.name_required");
    if (!form.email.trim()) next.email = t("contact.validation.email_required");
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = t("contact.validation.email_invalid");
    }
    if (!form.objective) next.objective = t("contact.validation.objective_required");
    if (!form.consent) next.consent = t("contact.validation.consent_required");
    return next;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);

    if (form.hp) return;

    const startedAt = startedAtRef.current;
    if (startedAt && Date.now() - startedAt < 1200) {
      setSubmitError(t("contact.submit_wait"));
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

      router.push(`/${locale}/thank-you`);
    } catch {
      setSubmitError(t("contact.submit_failed_local"));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <PageShell
      kicker={t("contact.kicker")}
      title={t("contact.title")}
      subtitle={t("contact.subtitle")}
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
                <Field label={t("contact.field_name")} required error={errors.name}>
                  <input
                    value={form.name}
                    onChange={(e) => setField("name", e.target.value)}
                    className={inputClassName(!!errors.name)}
                    placeholder={t("contact.placeholder_name")}
                  />
                </Field>
                <Field label={t("contact.field_email")} required error={errors.email}>
                  <input
                    value={form.email}
                    onChange={(e) => setField("email", e.target.value)}
                    className={inputClassName(!!errors.email)}
                    placeholder={t("contact.placeholder_email")}
                    inputMode="email"
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label={t("contact.field_company")}>
                  <input
                    value={form.company}
                    onChange={(e) => setField("company", e.target.value)}
                    className={inputClassName(false)}
                    placeholder={t("contact.placeholder_company")}
                  />
                </Field>
                <Field label={t("contact.field_objective")} required error={errors.objective}>
                  <select
                    value={form.objective}
                    onChange={(e) => setField("objective", e.target.value)}
                    className={inputClassName(!!errors.objective)}
                  >
                    <option value="">{t("contact.objective_select")}</option>
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
                  {t("contact.consent_label")}
                  {errors.consent ? (
                    <span className="block">{errors.consent}</span>
                  ) : null}
                </span>
              </label>

              <div className="flex flex-col gap-2 text-xs text-[var(--ds-muted)]">
                <div>{t("contact.response_time")}</div>
                <div>{t("common.privacy_first")}</div>
                {!CONFIG.WEBHOOK_URL ? (
                  <div>{t("contact.webhook_missing")}</div>
                ) : null}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  disabled={submitting}
                  className="ds-btn ds-btn-primary ds-btn-lg"
                >
                  {submitting ? t("contact.sending") : t("contact.send")}
                </button>
                <a
                  href="mailto:hello@webbrand.studio"
                  className="ds-btn ds-btn-ghost ds-btn-lg"
                >
                  {t("contact.email_us")}
                </a>
                <a
                  href="#book"
                  className="ds-btn ds-btn-ghost ds-btn-lg"
                >
                  {t("contact.book_call")}
                </a>
              </div>

              {submitError ? (
                <div className="text-sm text-[var(--ds-muted)]">{submitError}</div>
              ) : null}
          </form>
        </div>

        <div className="ds-glass rounded-2xl p-6">
          <div className="space-y-3">
            <div className="text-sm font-semibold text-[var(--ds-text)]">{t("contact.what_next")}</div>
            <ul className="space-y-2 text-sm text-[var(--ds-muted)]">
              <li className="flex gap-2">
                <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-cyan)]" />
                <span>{t("contact.next_1")}</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-cyan)]" />
                <span>{t("contact.next_2")}</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-cyan)]" />
                <span>{t("contact.next_3")}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="ds-glass rounded-2xl p-6">
          <div className="text-sm font-semibold text-[var(--ds-text)]">{t("contact.mini_faq")}</div>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-[var(--ds-muted)]">
            <div>
              <div className="font-semibold text-[var(--ds-text)]">{t("contact.faq_1_q")}</div>
              <div>{t("contact.faq_1_a")}</div>
            </div>
            <div>
              <div className="font-semibold text-[var(--ds-text)]">{t("contact.faq_2_q")}</div>
              <div>{t("contact.faq_2_a")}</div>
            </div>
            <div>
              <div className="font-semibold text-[var(--ds-text)]">{t("contact.faq_3_q")}</div>
              <div>{t("contact.faq_3_a")}</div>
            </div>
            <div>
              <div className="font-semibold text-[var(--ds-text)]">{t("contact.faq_4_q")}</div>
              <div>{t("contact.faq_4_a")}</div>
            </div>
          </div>
        </div>
        <div
          id="book"
          className="ds-glass rounded-2xl p-6"
        >
          <div className="text-sm font-semibold text-[var(--ds-text)]">{t("contact.book_a_call")}</div>
          <div className="mt-3 text-sm leading-relaxed text-[var(--ds-muted)]">
            {t("contact.book_placeholder")}
          </div>
          <div className="mt-5 inline-flex w-fit rounded-full bg-[var(--ds-accent)] px-5 py-3 text-sm font-semibold text-white">
            {t("contact.calendar_cta")}
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
