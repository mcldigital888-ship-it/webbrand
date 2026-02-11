"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type GeneratedContent = {
  title: string;
  slug: string;
  metaDescription: string;
  outline: string;
  markdown: string;
};

type FormState = {
  topic: string;
  audience: string;
  primaryKeyword: string;
  secondaryKeywords: string;
  language: "en" | "it";
  tone: "professional" | "friendly" | "direct";
  length: "short" | "medium" | "long";
  includeCta: boolean;
};

const DEFAULT_FORM: FormState = {
  topic: "Marketing service: Revenue System Blueprint for B2B lead generation",
  audience: "Founders and marketing managers at small/medium businesses",
  primaryKeyword: "marketing service",
  secondaryKeywords: "revenue system, lead generation, conversion rate optimization",
  language: "en",
  tone: "direct",
  length: "medium",
  includeCta: true,
};

function safeString(v: unknown) {
  return typeof v === "string" ? v : "";
}

export default function AdminBlogGenerateClient() {
  const [form, setForm] = useState<FormState>(DEFAULT_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GeneratedContent | null>(null);

  const canSubmit = useMemo(() => {
    return (
      form.topic.trim().length >= 2 &&
      form.audience.trim().length >= 2 &&
      form.primaryKeyword.trim().length >= 2
    );
  }, [form]);

  async function generate() {
    if (!canSubmit || loading) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/admin/api/blog/auto-generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = (await res.json().catch(() => null)) as any;

      if (!res.ok || !data?.ok) {
        const msg = safeString(data?.error) || `Request failed (${res.status})`;
        throw new Error(msg);
      }

      const content = data?.content as GeneratedContent | undefined;
      if (!content?.title || !content?.markdown) {
        throw new Error("Invalid response");
      }

      setResult(content);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Generation failed";
      setError(msg);
      setResult(null);
    } finally {
      setLoading(false);
    }
  }

  async function copyMarkdown() {
    if (!result?.markdown) return;
    await navigator.clipboard.writeText(result.markdown);
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <div className="text-sm font-semibold text-[var(--ds-text)]">Automatic Blog Generator</div>
        <h1 className="font-[var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--ds-text)]">
          About marketing service
        </h1>
        <div className="text-sm text-[var(--ds-muted)]">
          Creates an SEO-ready post using the API. Output includes title, slug, meta description, outline and markdown.
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-[var(--ds-border)] bg-[var(--ds-surface)] p-5">
          <div className="space-y-4">
            <div className="text-sm font-semibold text-[var(--ds-text)]">Inputs</div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-[var(--ds-muted)]">Topic</label>
              <input
                value={form.topic}
                onChange={(e) => setForm((p) => ({ ...p, topic: e.target.value }))}
                className="w-full rounded-xl border border-[var(--ds-border)] bg-[var(--ds-surface-2)] px-3 py-2 text-sm text-[var(--ds-text)] outline-none"
                placeholder="e.g. Automatic blog generator for marketing services"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-[var(--ds-muted)]">Audience</label>
              <input
                value={form.audience}
                onChange={(e) => setForm((p) => ({ ...p, audience: e.target.value }))}
                className="w-full rounded-xl border border-[var(--ds-border)] bg-[var(--ds-surface-2)] px-3 py-2 text-sm text-[var(--ds-text)] outline-none"
                placeholder="e.g. Founders, marketing managers"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[var(--ds-muted)]">Primary keyword</label>
                <input
                  value={form.primaryKeyword}
                  onChange={(e) => setForm((p) => ({ ...p, primaryKeyword: e.target.value }))}
                  className="w-full rounded-xl border border-[var(--ds-border)] bg-[var(--ds-surface-2)] px-3 py-2 text-sm text-[var(--ds-text)] outline-none"
                  placeholder="marketing service"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-[var(--ds-muted)]">Language</label>
                <select
                  value={form.language}
                  onChange={(e) => setForm((p) => ({ ...p, language: e.target.value as FormState["language"] }))}
                  className="w-full rounded-xl border border-[var(--ds-border)] bg-[var(--ds-surface-2)] px-3 py-2 text-sm text-[var(--ds-text)] outline-none"
                >
                  <option value="en">English</option>
                  <option value="it">Italian</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-[var(--ds-muted)]">Secondary keywords (comma-separated)</label>
              <input
                value={form.secondaryKeywords}
                onChange={(e) => setForm((p) => ({ ...p, secondaryKeywords: e.target.value }))}
                className="w-full rounded-xl border border-[var(--ds-border)] bg-[var(--ds-surface-2)] px-3 py-2 text-sm text-[var(--ds-text)] outline-none"
                placeholder="revenue system, lead gen, CRO"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[var(--ds-muted)]">Tone</label>
                <select
                  value={form.tone}
                  onChange={(e) => setForm((p) => ({ ...p, tone: e.target.value as FormState["tone"] }))}
                  className="w-full rounded-xl border border-[var(--ds-border)] bg-[var(--ds-surface-2)] px-3 py-2 text-sm text-[var(--ds-text)] outline-none"
                >
                  <option value="professional">Professional</option>
                  <option value="friendly">Friendly</option>
                  <option value="direct">Direct</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-[var(--ds-muted)]">Length</label>
                <select
                  value={form.length}
                  onChange={(e) => setForm((p) => ({ ...p, length: e.target.value as FormState["length"] }))}
                  className="w-full rounded-xl border border-[var(--ds-border)] bg-[var(--ds-surface-2)] px-3 py-2 text-sm text-[var(--ds-text)] outline-none"
                >
                  <option value="short">Short</option>
                  <option value="medium">Medium</option>
                  <option value="long">Long</option>
                </select>
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-[var(--ds-text)]">
              <input
                type="checkbox"
                checked={form.includeCta}
                onChange={(e) => setForm((p) => ({ ...p, includeCta: e.target.checked }))}
                className="h-4 w-4 accent-[var(--color-blue)]"
              />
              Include CTA section
            </label>

            {error ? (
              <div className="rounded-xl border border-[var(--ds-border)] bg-[var(--ds-surface-2)] px-3 py-2 text-sm text-red-400">
                {error}
              </div>
            ) : null}

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                disabled={!canSubmit || loading}
                onClick={generate}
                className="inline-flex rounded-full bg-[var(--color-blue)] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-95 disabled:opacity-60"
              >
                {loading ? "Generating…" : "Generate"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setForm(DEFAULT_FORM);
                  setResult(null);
                  setError(null);
                }}
                className="inline-flex rounded-full border border-[var(--ds-border)] bg-[var(--ds-surface)] px-5 py-2.5 text-sm font-semibold text-[var(--ds-text)] transition-colors hover:bg-[var(--ds-surface-2)]"
              >
                Reset
              </button>

              <Link className="text-sm font-semibold text-[var(--color-blue)]" href="/admin">
                Back to Admin
              </Link>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--ds-border)] bg-[var(--ds-surface)] p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-semibold text-[var(--ds-text)]">Preview</div>
            <button
              type="button"
              onClick={copyMarkdown}
              disabled={!result?.markdown}
              className="inline-flex rounded-full border border-[var(--ds-border)] bg-[var(--ds-surface)] px-4 py-2 text-sm font-semibold text-[var(--ds-text)] transition-colors hover:bg-[var(--ds-surface-2)] disabled:opacity-60"
            >
              Copy markdown
            </button>
          </div>

          {!result ? (
            <div className="mt-3 text-sm text-[var(--ds-muted)]">Generate to see output.</div>
          ) : (
            <div className="mt-4 space-y-4">
              <div className="space-y-1">
                <div className="text-xs font-semibold text-[var(--ds-muted)]">Title</div>
                <div className="text-sm font-semibold text-[var(--ds-text)]">{result.title}</div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-[var(--ds-muted)]">Slug</div>
                  <div className="text-sm text-[var(--ds-text)]">{result.slug}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-[var(--ds-muted)]">Meta description</div>
                  <div className="text-sm text-[var(--ds-text)]">{result.metaDescription}</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-semibold text-[var(--ds-muted)]">Outline</div>
                <pre className="whitespace-pre-wrap rounded-xl border border-[var(--ds-border)] bg-[var(--ds-surface-2)] px-3 py-2 text-xs text-[var(--ds-text)]">
                  {result.outline}
                </pre>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-semibold text-[var(--ds-muted)]">Markdown</div>
                <pre className="max-h-[520px] overflow-auto whitespace-pre-wrap rounded-xl border border-[var(--ds-border)] bg-[var(--ds-surface-2)] px-3 py-2 text-xs text-[var(--ds-text)]">
                  {result.markdown}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-[var(--ds-border)] bg-[var(--ds-surface)] p-5">
        <div className="text-sm font-semibold text-[var(--ds-text)]">Notes</div>
        <div className="mt-2 text-sm text-[var(--ds-muted)]">
          Make sure `OPENAI_API_KEY` is set in `.env.local` for generation.
        </div>
      </div>
    </div>
  );
}
