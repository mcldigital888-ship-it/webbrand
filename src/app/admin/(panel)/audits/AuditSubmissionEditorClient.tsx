"use client";

import { useMemo, useState } from "react";

type AuditStatus = "RECEIVED" | "GENERATED" | "FAILED";

type AuditItem = {
  id: string;
  createdAt: string;
  updatedAt: string;

  goal: string;
  businessType: string;
  industry: string;
  teamSize: string;
  revenueRange: string;
  offer: string | null;
  avgTicketRange: string | null;
  monthlyLeadsRange: string | null;

  painPoints: unknown;
  biggestBottleneck: string | null;
  toolsUsed: unknown | null;
  targetMarket: string | null;

  name: string;
  email: string;
  company: string;
  whatsapp: string | null;

  proposalJson: unknown | null;
  pdfPath: string | null;
  status: AuditStatus;
  attemptCount: number;
  lastError: string | null;
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

export default function AuditSubmissionEditorClient({ initialItem }: { initialItem: AuditItem }) {
  const [item, setItem] = useState<AuditItem>(initialItem);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);

  const [painPointsText, setPainPointsText] = useState(safeStringify(initialItem.painPoints));
  const [toolsUsedText, setToolsUsedText] = useState(safeStringify(initialItem.toolsUsed));
  const [proposalJsonText, setProposalJsonText] = useState(safeStringify(initialItem.proposalJson));

  const canSave = useMemo(() => !saving, [saving]);

  async function save() {
    setError(null);
    setOk(null);

    const pain = parseJson(painPointsText);
    if (!pain.ok) {
      setError(`painPoints: ${pain.error}`);
      return;
    }

    const tools = parseJson(toolsUsedText);
    if (!tools.ok) {
      setError(`toolsUsed: ${tools.error}`);
      return;
    }

    const proposal = parseJson(proposalJsonText);
    if (!proposal.ok) {
      setError(`proposalJson: ${proposal.error}`);
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`/admin/api/audits/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          goal: item.goal,
          businessType: item.businessType,
          industry: item.industry,
          teamSize: item.teamSize,
          revenueRange: item.revenueRange,
          offer: item.offer ?? "",
          avgTicketRange: item.avgTicketRange ?? "",
          monthlyLeadsRange: item.monthlyLeadsRange ?? "",

          painPoints: pain.value,
          biggestBottleneck: item.biggestBottleneck ?? "",
          toolsUsed: tools.value,
          targetMarket: item.targetMarket ?? "",

          name: item.name,
          email: item.email,
          company: item.company,
          whatsapp: item.whatsapp ?? "",

          proposalJson: proposal.value,
          pdfPath: item.pdfPath ?? "",
          status: item.status,
          attemptCount: item.attemptCount,
          lastError: item.lastError ?? "",
        }),
      });

      const data = (await res.json().catch(() => null)) as any;
      if (!res.ok || !data?.ok) {
        setError((data && data.error) || "Save failed");
        return;
      }

      setItem(data.item);
      setOk("Saved.");
    } catch {
      setError("Save failed");
    } finally {
      setSaving(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-white/10 bg-[var(--color-surface)] p-5">
        <div className="space-y-1">
          <div className="text-sm font-semibold text-[var(--ds-text)]">Meta</div>
          <div className="text-xs text-[var(--ds-muted)]">Edit fields and press Save.</div>
        </div>

        {error ? <div className="mt-3 text-sm text-red-600">{error}</div> : null}
        {ok ? <div className="mt-3 text-sm text-emerald-700">{ok}</div> : null}

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <label className="space-y-1">
            <div className="text-xs font-semibold text-[var(--ds-muted)]">Status</div>
            <select
              value={item.status}
              onChange={(e) => setItem((p) => ({ ...p, status: e.target.value as AuditStatus }))}
              className="h-10 w-full rounded-xl border border-white/10 bg-[var(--color-background)] px-3 text-sm text-[var(--ds-text)] outline-none focus:border-[var(--color-blue)]"
            >
              <option value="RECEIVED">RECEIVED</option>
              <option value="GENERATED">GENERATED</option>
              <option value="FAILED">FAILED</option>
            </select>
            <div className="text-[11px] text-[var(--ds-muted)]">Workflow state for the submission.</div>
          </label>

          <label className="space-y-1">
            <div className="text-xs font-semibold text-[var(--ds-muted)]">Attempt count</div>
            <input
              value={String(item.attemptCount)}
              onChange={(e) =>
                setItem((p) => ({
                  ...p,
                  attemptCount: Number.parseInt(e.target.value || "0", 10) || 0,
                }))
              }
              className="h-10 w-full rounded-xl border border-white/10 bg-[var(--color-background)] px-3 text-sm text-[var(--ds-text)] outline-none focus:border-[var(--color-blue)]"
            />
            <div className="text-[11px] text-[var(--ds-muted)]">Retries for PDF generation.</div>
          </label>

          <label className="space-y-1">
            <div className="text-xs font-semibold text-[var(--ds-muted)]">pdfPath</div>
            <input
              value={item.pdfPath || ""}
              onChange={(e) => setItem((p) => ({ ...p, pdfPath: e.target.value }))}
              className="h-10 w-full rounded-xl border border-white/10 bg-[var(--color-background)] px-3 text-sm text-[var(--ds-text)] outline-none focus:border-[var(--color-blue)]"
            />
            <div className="text-[11px] text-[var(--ds-muted)]">Local filesystem path if generated.</div>
          </label>

          <label className="space-y-1 md:col-span-3">
            <div className="text-xs font-semibold text-[var(--ds-muted)]">lastError</div>
            <input
              value={item.lastError || ""}
              onChange={(e) => setItem((p) => ({ ...p, lastError: e.target.value }))}
              className="h-10 w-full rounded-xl border border-white/10 bg-[var(--color-background)] px-3 text-sm text-[var(--ds-text)] outline-none focus:border-[var(--color-blue)]"
            />
          </label>
        </div>

        <div className="mt-5 flex items-center justify-end">
          <button
            type="button"
            disabled={!canSave}
            onClick={save}
            className="inline-flex w-fit rounded-full bg-[var(--color-blue)] px-6 py-3 text-sm font-semibold text-white transition-opacity disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[var(--color-surface)] p-5">
        <div className="space-y-1">
          <div className="text-sm font-semibold text-[var(--ds-text)]">Contact</div>
          <div className="text-xs text-[var(--ds-muted)]">User provided details.</div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="space-y-1">
            <div className="text-xs font-semibold text-[var(--ds-muted)]">Name</div>
            <input
              value={item.name}
              onChange={(e) => setItem((p) => ({ ...p, name: e.target.value }))}
              className="h-10 w-full rounded-xl border border-white/10 bg-[var(--color-background)] px-3 text-sm text-[var(--ds-text)] outline-none focus:border-[var(--color-blue)]"
            />
          </label>

          <label className="space-y-1">
            <div className="text-xs font-semibold text-[var(--ds-muted)]">Email</div>
            <input
              value={item.email}
              onChange={(e) => setItem((p) => ({ ...p, email: e.target.value }))}
              className="h-10 w-full rounded-xl border border-white/10 bg-[var(--color-background)] px-3 text-sm text-[var(--ds-text)] outline-none focus:border-[var(--color-blue)]"
            />
          </label>

          <label className="space-y-1">
            <div className="text-xs font-semibold text-[var(--ds-muted)]">Company</div>
            <input
              value={item.company}
              onChange={(e) => setItem((p) => ({ ...p, company: e.target.value }))}
              className="h-10 w-full rounded-xl border border-white/10 bg-[var(--color-background)] px-3 text-sm text-[var(--ds-text)] outline-none focus:border-[var(--color-blue)]"
            />
          </label>

          <label className="space-y-1">
            <div className="text-xs font-semibold text-[var(--ds-muted)]">WhatsApp</div>
            <input
              value={item.whatsapp || ""}
              onChange={(e) => setItem((p) => ({ ...p, whatsapp: e.target.value }))}
              className="h-10 w-full rounded-xl border border-white/10 bg-[var(--color-background)] px-3 text-sm text-[var(--ds-text)] outline-none focus:border-[var(--color-blue)]"
            />
          </label>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[var(--color-surface)] p-5">
        <div className="space-y-1">
          <div className="text-sm font-semibold text-[var(--ds-text)]">Business</div>
          <div className="text-xs text-[var(--ds-muted)]">Core audit answers.</div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="space-y-1">
            <div className="text-xs font-semibold text-[var(--ds-muted)]">Goal</div>
            <input
              value={item.goal}
              onChange={(e) => setItem((p) => ({ ...p, goal: e.target.value }))}
              className="h-10 w-full rounded-xl border border-white/10 bg-[var(--color-background)] px-3 text-sm text-[var(--ds-text)] outline-none focus:border-[var(--color-blue)]"
            />
          </label>

          <label className="space-y-1">
            <div className="text-xs font-semibold text-[var(--ds-muted)]">Business type</div>
            <input
              value={item.businessType}
              onChange={(e) => setItem((p) => ({ ...p, businessType: e.target.value }))}
              className="h-10 w-full rounded-xl border border-white/10 bg-[var(--color-background)] px-3 text-sm text-[var(--ds-text)] outline-none focus:border-[var(--color-blue)]"
            />
          </label>

          <label className="space-y-1">
            <div className="text-xs font-semibold text-[var(--ds-muted)]">Industry</div>
            <input
              value={item.industry}
              onChange={(e) => setItem((p) => ({ ...p, industry: e.target.value }))}
              className="h-10 w-full rounded-xl border border-white/10 bg-[var(--color-background)] px-3 text-sm text-[var(--ds-text)] outline-none focus:border-[var(--color-blue)]"
            />
          </label>

          <label className="space-y-1">
            <div className="text-xs font-semibold text-[var(--ds-muted)]">Team size</div>
            <input
              value={item.teamSize}
              onChange={(e) => setItem((p) => ({ ...p, teamSize: e.target.value }))}
              className="h-10 w-full rounded-xl border border-white/10 bg-[var(--color-background)] px-3 text-sm text-[var(--ds-text)] outline-none focus:border-[var(--color-blue)]"
            />
          </label>

          <label className="space-y-1">
            <div className="text-xs font-semibold text-[var(--ds-muted)]">Revenue range</div>
            <input
              value={item.revenueRange}
              onChange={(e) => setItem((p) => ({ ...p, revenueRange: e.target.value }))}
              className="h-10 w-full rounded-xl border border-white/10 bg-[var(--color-background)] px-3 text-sm text-[var(--ds-text)] outline-none focus:border-[var(--color-blue)]"
            />
          </label>

          <label className="space-y-1">
            <div className="text-xs font-semibold text-[var(--ds-muted)]">Avg ticket range</div>
            <input
              value={item.avgTicketRange || ""}
              onChange={(e) => setItem((p) => ({ ...p, avgTicketRange: e.target.value }))}
              className="h-10 w-full rounded-xl border border-white/10 bg-[var(--color-background)] px-3 text-sm text-[var(--ds-text)] outline-none focus:border-[var(--color-blue)]"
            />
          </label>

          <label className="space-y-1">
            <div className="text-xs font-semibold text-[var(--ds-muted)]">Monthly leads range</div>
            <input
              value={item.monthlyLeadsRange || ""}
              onChange={(e) => setItem((p) => ({ ...p, monthlyLeadsRange: e.target.value }))}
              className="h-10 w-full rounded-xl border border-white/10 bg-[var(--color-background)] px-3 text-sm text-[var(--ds-text)] outline-none focus:border-[var(--color-blue)]"
            />
          </label>

          <label className="space-y-1 md:col-span-2">
            <div className="text-xs font-semibold text-[var(--ds-muted)]">Offer</div>
            <input
              value={item.offer || ""}
              onChange={(e) => setItem((p) => ({ ...p, offer: e.target.value }))}
              className="h-10 w-full rounded-xl border border-white/10 bg-[var(--color-background)] px-3 text-sm text-[var(--ds-text)] outline-none focus:border-[var(--color-blue)]"
            />
          </label>

          <label className="space-y-1">
            <div className="text-xs font-semibold text-[var(--ds-muted)]">Biggest bottleneck</div>
            <input
              value={item.biggestBottleneck || ""}
              onChange={(e) => setItem((p) => ({ ...p, biggestBottleneck: e.target.value }))}
              className="h-10 w-full rounded-xl border border-white/10 bg-[var(--color-background)] px-3 text-sm text-[var(--ds-text)] outline-none focus:border-[var(--color-blue)]"
            />
          </label>

          <label className="space-y-1">
            <div className="text-xs font-semibold text-[var(--ds-muted)]">Target market</div>
            <input
              value={item.targetMarket || ""}
              onChange={(e) => setItem((p) => ({ ...p, targetMarket: e.target.value }))}
              className="h-10 w-full rounded-xl border border-white/10 bg-[var(--color-background)] px-3 text-sm text-[var(--ds-text)] outline-none focus:border-[var(--color-blue)]"
            />
          </label>

          <label className="space-y-1 md:col-span-2">
            <div className="text-xs font-semibold text-[var(--ds-muted)]">Pain points (JSON)</div>
            <textarea
              value={painPointsText}
              onChange={(e) => setPainPointsText(e.target.value)}
              className="min-h-[140px] w-full rounded-xl border border-white/10 bg-[var(--color-background)] p-3 text-xs text-[var(--ds-text)] outline-none focus:border-[var(--color-blue)]"
            />
            <div className="text-[11px] text-[var(--ds-muted)]">Stored as JSON in DB.</div>
          </label>

          <label className="space-y-1 md:col-span-2">
            <div className="text-xs font-semibold text-[var(--ds-muted)]">Tools used (JSON)</div>
            <textarea
              value={toolsUsedText}
              onChange={(e) => setToolsUsedText(e.target.value)}
              className="min-h-[140px] w-full rounded-xl border border-white/10 bg-[var(--color-background)] p-3 text-xs text-[var(--ds-text)] outline-none focus:border-[var(--color-blue)]"
            />
          </label>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[var(--color-surface)] p-5">
        <div className="space-y-1">
          <div className="text-sm font-semibold text-[var(--ds-text)]">Proposal JSON</div>
          <div className="text-xs text-[var(--ds-muted)]">Stored as JSON in DB.</div>
        </div>
        <div className="mt-4">
          <textarea
            value={proposalJsonText}
            onChange={(e) => setProposalJsonText(e.target.value)}
            className="min-h-[220px] w-full rounded-xl border border-white/10 bg-[var(--color-background)] p-3 text-xs text-[var(--ds-text)] outline-none focus:border-[var(--color-blue)]"
          />
        </div>
      </div>
    </div>
  );
}
