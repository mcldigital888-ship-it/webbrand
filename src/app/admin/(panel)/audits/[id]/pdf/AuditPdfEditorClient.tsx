"use client";

import { useMemo, useState } from "react";

function safeStringify(v: unknown) {
  try {
    return JSON.stringify(v ?? null, null, 2);
  } catch {
    return "";
  }
}

function parseJson(text: string): { ok: true; value: unknown } | { ok: false; error: string } {
  const t = text.trim();
  if (!t) return { ok: true, value: undefined };
  try {
    return { ok: true, value: JSON.parse(t) };
  } catch {
    return { ok: false, error: "Invalid JSON" };
  }
}

export default function AuditPdfEditorClient({
  auditId,
  initialProposalJson,
  initialPdfUrl,
}: {
  auditId: string;
  initialProposalJson: unknown | null;
  initialPdfUrl: string | null;
}) {
  const [proposalJsonText, setProposalJsonText] = useState(safeStringify(initialProposalJson));
  const [pdfUrl, setPdfUrl] = useState<string | null>(initialPdfUrl);
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);

  const canSave = useMemo(() => !saving && !generating, [saving, generating]);

  async function saveOnly() {
    setError(null);
    setOk(null);

    const parsed = parseJson(proposalJsonText);
    if (!parsed.ok) {
      setError(`proposalJson: ${parsed.error}`);
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`/admin/api/audits/${encodeURIComponent(auditId)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ proposalJson: parsed.value }),
      });

      const data = (await res.json().catch(() => null)) as any;
      if (!res.ok || !data?.ok) {
        setError((data && data.error) || "Save failed");
        return;
      }

      setOk("Saved.");
    } catch {
      setError("Save failed");
    } finally {
      setSaving(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  async function regeneratePdf() {
    setError(null);
    setOk(null);

    const parsed = parseJson(proposalJsonText);
    if (!parsed.ok) {
      setError(`proposalJson: ${parsed.error}`);
      return;
    }

    setGenerating(true);
    try {
      const saveRes = await fetch(`/admin/api/audits/${encodeURIComponent(auditId)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ proposalJson: parsed.value }),
      });

      const saveData = (await saveRes.json().catch(() => null)) as any;
      if (!saveRes.ok || !saveData?.ok) {
        setError((saveData && saveData.error) || "Save failed");
        return;
      }

      const genRes = await fetch(`/admin/api/audits/${encodeURIComponent(auditId)}/generate-pdf`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ force: true }),
      });

      const genData = (await genRes.json().catch(() => null)) as any;
      if (!genRes.ok || !genData?.ok || !genData?.pdfUrl) {
        setError((genData && genData.error) || "Generation failed");
        return;
      }

      setPdfUrl(genData.pdfUrl);
      setOk("PDF generated.");
      window.open(genData.pdfUrl, "_blank", "noopener,noreferrer");
    } catch {
      setError("Generation failed");
    } finally {
      setGenerating(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-white/10 bg-[var(--color-surface)] p-5">
        <div className="space-y-1">
          <div className="text-sm font-semibold text-[var(--ds-text)]">PDF content (proposalJson)</div>
          <div className="text-xs text-[var(--ds-muted)]">Edit JSON, save, then generate the final PDF.</div>
        </div>

        {error ? <div className="mt-3 text-sm text-red-600">{error}</div> : null}
        {ok ? <div className="mt-3 text-sm text-emerald-700">{ok}</div> : null}

        <div className="mt-4">
          <textarea
            value={proposalJsonText}
            onChange={(e) => setProposalJsonText(e.target.value)}
            className="min-h-[420px] w-full rounded-xl border border-white/10 bg-[var(--color-background)] p-3 text-xs text-[var(--ds-text)] outline-none focus:border-[var(--color-blue)]"
          />
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-end gap-2">
          {pdfUrl ? (
            <a
              href={pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/15 bg-white/[0.02] px-5 py-2.5 text-sm font-semibold text-[var(--ds-text)] hover:border-white/25 hover:bg-white/[0.04]"
            >
              Download current PDF
            </a>
          ) : null}

          <button
            type="button"
            disabled={!canSave}
            onClick={saveOnly}
            className="rounded-full border border-white/15 bg-white/[0.02] px-5 py-2.5 text-sm font-semibold text-[var(--ds-text)] hover:border-white/25 hover:bg-white/[0.04] disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save"}
          </button>

          <button
            type="button"
            disabled={!canSave}
            onClick={regeneratePdf}
            className="rounded-full bg-[var(--color-blue)] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-95 disabled:opacity-60"
          >
            {generating ? "Generating…" : "Regenerate PDF"}
          </button>
        </div>
      </div>
    </div>
  );
}
