"use client";

import { useMemo, useState } from "react";

type Meta = {
  company: string;
  industry: string;
  goal: string;
};

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
  meta,
}: {
  auditId: string;
  initialProposalJson: unknown | null;
  initialPdfUrl: string | null;
  meta: Meta;
}) {
  const [proposalJsonText, setProposalJsonText] = useState(safeStringify(initialProposalJson));
  const [pdfUrl, setPdfUrl] = useState<string | null>(initialPdfUrl);
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [validating, setValidating] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);
  const [validationIssues, setValidationIssues] = useState<Array<{ path: string; message: string }> | null>(null);

  const canSave = useMemo(
    () => !saving && !generating && !validating && !aiGenerating,
    [saving, generating, validating, aiGenerating]
  );

  function buildTemplate() {
    return {
      summary: {
        oneLiner: `Revenue system blueprint for ${meta.company} in ${meta.industry}.`,
        coreProblem: `The current revenue process is not structured end-to-end (traffic → conversion → CRM → automation → sales).`,
        primaryGoal: meta.goal || "Increase qualified leads and conversions.",
        expectedImpact: {
          leads: "+20–40% qualified leads in 60–90 days",
          conversion: "+10–20% landing → lead conversion",
          sales: "+10–25% close rate with follow-up automation",
          ops: "Lower manual workload via automation + dashboards",
        },
      },
      currentState: {
        assumptions: [
          "There is already a core offer and a target customer segment.",
          "Traffic sources exist (organic, paid, partners, or outbound).",
        ],
        risks: [
          "Low-quality lead flow due to unclear positioning.",
          "Manual follow-up causing leakage.",
        ],
        quickWins: [
          "Clarify ICP + core promise (one-liner) and update hero section.",
          "Add one primary CTA and remove competing CTAs.",
          "Create a simple lead magnet / audit booking flow.",
          "Set up CRM pipeline stages and required fields.",
          "Install automated follow-up sequence for new leads (email/WhatsApp).",
        ],
      },
      blueprint: {
        systemFlow: ["Traffic", "Landing", "CRM", "Automation", "Sales", "Dashboard"],
        recommendedModules: [
          {
            module: "WEB",
            why: "Convert traffic into qualified leads with one clear funnel.",
            deliverables: ["Landing page revamp", "Offer positioning", "CTA + form optimization"],
            kpis: ["Landing conversion rate", "Cost per lead"],
          },
          {
            module: "CRM",
            why: "Track every lead and enforce a consistent sales process.",
            deliverables: ["Pipeline stages", "Lead scoring rules", "Sales tasks"],
            kpis: ["Speed to lead", "Lead-to-opportunity rate"],
          },
          {
            module: "AI",
            why: "Prevent leakage with automated follow-ups and next-best-action suggestions.",
            deliverables: ["Follow-up playbooks", "Next action suggestions", "Sales enablement prompts"],
            kpis: ["Reply rate", "Show-up rate"],
          },
        ],
        timeline: [
          {
            phase: "Diagnose",
            duration: "Week 1",
            deliverables: ["Audit funnel + CRM", "Messaging + offer refinement"],
          },
          {
            phase: "Build",
            duration: "Weeks 2–4",
            deliverables: ["Landing + tracking", "CRM pipeline", "Automations"],
          },
          {
            phase: "Scale",
            duration: "Weeks 5–8",
            deliverables: ["Traffic experiments", "Conversion improvements", "Reporting dashboards"],
          },
        ],
      },
      kpiPlan: {
        northStar: "Qualified sales conversations booked per week",
        metrics: [
          { name: "Qualified leads", definition: "Leads matching ICP", target: "+30% in 60 days" },
          { name: "Speed to lead", definition: "Time from lead to first response", target: "< 5 minutes" },
          { name: "Show-up rate", definition: "Booked calls that happen", target: "> 70%" },
        ],
      },
      offer: {
        recommendedPackage: "Full System",
        scope: [
          "Offer + messaging",
          "Landing conversion system",
          "CRM pipeline + tracking",
          "Automation sequences",
          "Sales follow-up process",
        ],
        options: [
          {
            name: "Starter",
            adds: ["Landing improvements", "Basic CRM setup"],
            impact: {
              leads: "+10–20%",
              conversion: "+5–10%",
              sales: "+0–5%",
              ops: "+10%",
            },
          },
          {
            name: "Growth",
            adds: ["Automation sequences", "Lead scoring"],
            impact: {
              leads: "+20–30%",
              conversion: "+10–15%",
              sales: "+10–15%",
              ops: "+20–30%",
            },
          },
          {
            name: "Full System",
            adds: ["End-to-end funnel", "Reporting + dashboards", "Iteration plan"],
            impact: {
              leads: "+30–50%",
              conversion: "+15–25%",
              sales: "+15–25%",
              ops: "+30–50%",
            },
          },
        ],
        pricingNote: "Final pricing depends on scope, timeline, and traffic channels.",
      },
      nextSteps: {
        actions: [
          "Align on ICP + offer",
          "Confirm traffic channels",
          "Implement landing + CRM tracking",
          "Launch automations and iterate weekly",
        ],
        callToAction: "Reply with 3 available time slots for a 20-minute implementation call.",
      },
    };
  }

  function fillTemplate() {
    setError(null);
    setOk(null);
    setValidationIssues(null);
    setProposalJsonText(JSON.stringify(buildTemplate(), null, 2));
  }

  async function validateJson() {
    setError(null);
    setOk(null);
    setValidationIssues(null);

    const parsed = parseJson(proposalJsonText);
    if (!parsed.ok) {
      setError(`proposalJson: ${parsed.error}`);
      return;
    }

    setValidating(true);
    try {
      const res = await fetch(`/admin/api/audits/${encodeURIComponent(auditId)}/validate-proposal`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ proposalJson: parsed.value }),
      });

      const data = (await res.json().catch(() => null)) as any;
      if (!res.ok || !data) {
        setError("Validation failed");
        return;
      }

      if (data.ok) {
        setOk("Valid.");
        setValidationIssues(null);
        return;
      }

      setError(data.error || "Invalid");
      setValidationIssues(Array.isArray(data.issues) ? data.issues : []);
    } catch {
      setError("Validation failed");
    } finally {
      setValidating(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  async function generateWithOpenAi() {
    setError(null);
    setOk(null);
    setValidationIssues(null);
    setAiGenerating(true);
    try {
      const res = await fetch(`/admin/api/audits/${encodeURIComponent(auditId)}/generate-proposal`, {
        method: "POST",
      });

      const data = (await res.json().catch(() => null)) as any;
      if (!res.ok || !data?.ok || !data?.proposalJson) {
        setError((data && data.error) || "OpenAI generation failed");
        return;
      }

      setProposalJsonText(JSON.stringify(data.proposalJson, null, 2));
      setOk("Generated via OpenAI.");
    } catch {
      setError("OpenAI generation failed");
    } finally {
      setAiGenerating(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  async function saveOnly() {
    setError(null);
    setOk(null);
    setValidationIssues(null);

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
    setValidationIssues(null);

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
        {validationIssues && validationIssues.length ? (
          <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.02] p-3">
            <div className="text-xs font-semibold text-[var(--ds-text)]">Validation issues</div>
            <div className="mt-2 space-y-1 text-xs text-[var(--ds-muted)]">
              {validationIssues.slice(0, 20).map((it, idx) => (
                <div key={`${it.path}-${idx}`}>
                  <span className="text-[var(--ds-text)]">{it.path || "(root)"}</span>: {it.message}
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-4">
          <textarea
            value={proposalJsonText}
            onChange={(e) => setProposalJsonText(e.target.value)}
            className="min-h-[420px] w-full rounded-xl border border-white/10 bg-[var(--color-background)] p-3 text-xs text-[var(--ds-text)] outline-none focus:border-[var(--color-blue)]"
          />
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-end gap-2">
          <button
            type="button"
            disabled={!canSave}
            onClick={fillTemplate}
            className="rounded-full border border-white/15 bg-white/[0.02] px-5 py-2.5 text-sm font-semibold text-[var(--ds-text)] hover:border-white/25 hover:bg-white/[0.04] disabled:opacity-60"
          >
            Template ile doldur
          </button>

          <button
            type="button"
            disabled={!canSave}
            onClick={validateJson}
            className="rounded-full border border-white/15 bg-white/[0.02] px-5 py-2.5 text-sm font-semibold text-[var(--ds-text)] hover:border-white/25 hover:bg-white/[0.04] disabled:opacity-60"
          >
            {validating ? "Validating…" : "Validate JSON"}
          </button>

          <button
            type="button"
            disabled={!canSave}
            onClick={generateWithOpenAi}
            className="rounded-full border border-white/15 bg-white/[0.02] px-5 py-2.5 text-sm font-semibold text-[var(--ds-text)] hover:border-white/25 hover:bg-white/[0.04] disabled:opacity-60"
          >
            {aiGenerating ? "Generating…" : "OpenAI ile üret"}
          </button>

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
