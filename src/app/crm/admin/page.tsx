import { requireAdmin } from "@/lib/crm/rbac";
import Link from "next/link";

export default async function AdminPage() {
  await requireAdmin();

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <div className="text-sm font-semibold text-[var(--color-navy)]">Admin Settings</div>
        <div className="text-sm text-[var(--color-slate)]">
          Control layer for pipeline, scoring, automation config, and system settings.
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Link
          href="/crm/admin/pipeline-stages"
          className="rounded-2xl border border-black/5 bg-white p-5 text-sm font-semibold text-[var(--color-navy)] hover:bg-[var(--color-background)]"
        >
          PipelineStage CRUD
        </Link>
        <Link
          href="/crm/admin/scoring-rules"
          className="rounded-2xl border border-black/5 bg-white p-5 text-sm font-semibold text-[var(--color-navy)] hover:bg-[var(--color-background)]"
        >
          ScoringRule CRUD
        </Link>
        <div className="rounded-2xl border border-black/5 bg-white p-5 text-sm font-semibold text-[var(--color-navy)] opacity-60">
          AutomationRule CRUD (next)
        </div>
        <div className="rounded-2xl border border-black/5 bg-white p-5 text-sm font-semibold text-[var(--color-navy)] opacity-60">
          SystemConfig (next)
        </div>
        <div className="rounded-2xl border border-black/5 bg-white p-5 text-sm font-semibold text-[var(--color-navy)] opacity-60">
          AutomationEvent viewer (next)
        </div>
      </div>
    </div>
  );
}
