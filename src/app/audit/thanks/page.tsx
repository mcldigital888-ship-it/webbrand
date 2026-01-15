"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import SectionBand from "@/components/SectionBand";
import { getAuditDownloadUrl } from "@/lib/audit/url";

type StatusResponse =
  | { ok: true; status: string; pdfUrl: string | null; error: string | null }
  | { ok: false; error: string };

type GenerateResponse =
  | { ok: true; pdfUrl: string }
  | { ok: false; error: string };

export const metadata = {
  robots: { index: false, follow: false },
};

export default function AuditThanksPage() {
  const searchParams = useSearchParams();
  const auditId = searchParams.get("auditId") || "";

  const [status, setStatus] = useState<"RECEIVED" | "GENERATED" | "FAILED" | "UNKNOWN">(
    "UNKNOWN"
  );
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);

  const startedRef = useRef(false);

  const isValid = useMemo(() => auditId.trim().length > 0, [auditId]);

  async function fetchStatus() {
    if (!isValid) return;

    try {
      const res = await fetch(`/api/audit/status?auditId=${encodeURIComponent(auditId)}`, {
        cache: "no-store",
      });
      const data = (await res.json().catch(() => null)) as StatusResponse | null;
      if (!res.ok || !data || data.ok === false) {
        setError(data && data.ok === false ? data.error : "Failed");
        return;
      }

      setStatus((data.status as typeof status) || "UNKNOWN");
      setPdfUrl(data.pdfUrl);
      setError(data.error);
    } catch {
      setError("Failed");
    }
  }

  async function startGenerate() {
    if (!isValid) return;
    if (startedRef.current) return;
    startedRef.current = true;

    setGenerating(true);
    try {
      const res = await fetch("/api/audit/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ auditId }),
      });
      const data = (await res.json().catch(() => null)) as GenerateResponse | null;
      if (!res.ok || !data || data.ok === false) {
        setError(data && data.ok === false ? data.error : "Generation failed");
        setStatus("FAILED");
        return;
      }

      setPdfUrl(data.pdfUrl);
      setStatus("GENERATED");
    } catch {
      setError("Generation failed");
      setStatus("FAILED");
    } finally {
      setGenerating(false);
    }
  }

  useEffect(() => {
    if (!isValid) return;
    fetchStatus();
    startGenerate();

    const t = window.setInterval(() => {
      fetchStatus();
    }, 2500);

    return () => window.clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auditId, isValid]);

  if (!isValid) {
    return (
      <div className="space-y-10">
        <SectionBand tone="accent">
          <div className="space-y-3">
            <h1 className="font-[var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--color-navy)]">
              Missing auditId
            </h1>
            <p className="text-sm leading-6 text-[var(--color-slate)]">
              This page requires an auditId.
            </p>
            <Link
              href="/audit"
              className="inline-flex w-fit rounded-full bg-[var(--color-blue)] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-95"
            >
              Back to audit
            </Link>
          </div>
        </SectionBand>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <SectionBand tone="accent">
        <div className="space-y-4">
          <h1 className="max-w-4xl font-[var(--font-display)] text-4xl font-semibold tracking-tight text-[var(--color-navy)] sm:text-5xl">
            {status === "GENERATED" ? "Your blueprint is ready." : "Generating your blueprint…"}
          </h1>
          <p className="max-w-3xl text-sm leading-6 text-[var(--color-slate)]">
            Audit ID: <span className="font-semibold text-[var(--color-navy)]">{auditId}</span>
          </p>

          {error ? (
            <div className="rounded-2xl border border-black/5 bg-white/70 p-4 text-sm text-[var(--color-slate)]">
              {error}
            </div>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row">
            {status === "GENERATED" ? (
              <a
                href={getAuditDownloadUrl(auditId)}
                className="inline-flex w-fit rounded-full bg-[var(--color-blue)] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-95"
                download
              >
                Download PDF
              </a>
            ) : (
              <button
                type="button"
                disabled={generating}
                onClick={() => {
                  startedRef.current = false;
                  startGenerate();
                }}
                className="inline-flex w-fit rounded-full bg-[var(--color-blue)] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-95 disabled:opacity-60"
              >
                {generating ? "Generating…" : "Generate PDF"}
              </button>
            )}

            <Link
              href="/contact"
              className="inline-flex w-fit rounded-full border border-[var(--color-navy)]/15 bg-white/60 px-6 py-3 text-sm font-semibold text-[var(--color-navy)] transition-colors hover:border-[var(--color-navy)]/25 hover:bg-white"
            >
              Book a 15-min call
            </Link>
          </div>

          <p className="text-xs leading-5 text-[var(--color-slate)]">
            If your PDF doesn’t appear, keep this tab open for a minute. Generation runs server-side.
          </p>
        </div>
      </SectionBand>
    </div>
  );
}
