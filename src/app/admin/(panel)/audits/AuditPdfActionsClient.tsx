"use client";

import { useState } from "react";

export default function AuditPdfActionsClient({
  auditId,
  initialPdfUrl,
}: {
  auditId: string;
  initialPdfUrl: string | null;
}) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(initialPdfUrl);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function createPdf() {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`/admin/api/audits/${encodeURIComponent(auditId)}/generate-pdf`, {
        method: "POST",
      });

      const data = (await res.json().catch(() => null)) as any;
      if (!res.ok || !data?.ok || !data?.pdfUrl) {
        setError((data && data.error) || "Generation failed");
        return;
      }

      setPdfUrl(data.pdfUrl);
      window.location.href = `/admin/audits/${encodeURIComponent(auditId)}/pdf`;
    } catch {
      setError("Generation failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          disabled={loading}
          onClick={createPdf}
          className="rounded-full border border-white/15 bg-white/[0.02] px-3 py-1.5 text-xs font-semibold text-[var(--ds-text)] hover:border-white/25 hover:bg-white/[0.04] disabled:opacity-60"
        >
          {loading ? "Creating…" : "Create PDF"}
        </button>
        {pdfUrl ? (
          <a
            href={pdfUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-[var(--color-blue)] px-3 py-1.5 text-xs font-semibold text-white hover:opacity-95"
          >
            Download
          </a>
        ) : null}
      </div>
      {error ? <div className="text-[11px] text-red-600">{error}</div> : null}
    </div>
  );
}
