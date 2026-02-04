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
  const editorHref = `/admin/audits/${encodeURIComponent(auditId)}/pdf`;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2">
        <a
          href={editorHref}
          className="rounded-full border border-white/15 bg-white/[0.02] px-3 py-1.5 text-xs font-semibold text-[var(--ds-text)] hover:border-white/25 hover:bg-white/[0.04]"
        >
          Open editor
        </a>
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
    </div>
  );
}
