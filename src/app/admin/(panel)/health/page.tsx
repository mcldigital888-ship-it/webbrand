import { headers } from "next/headers";
import { prisma } from "@/lib/db";
import { requireAdminPanel } from "@/lib/admin/rbac";
import HealthClient from "@/app/admin/(panel)/health/HealthClient";

export default async function AdminHealthPage() {
  await requireAdminPanel();

  const h = await headers();
  const host = h.get("x-forwarded-host") || h.get("host") || "";
  const proto = h.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
  const baseUrl = host ? `${proto}://${host}` : "(unknown)";

  const [leadCount, dealCount, eventCount, logCount] = await Promise.all([
    prisma.lead.count(),
    prisma.deal.count(),
    prisma.automationEvent.count(),
    prisma.activityLog.count(),
  ]);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <div className="text-sm font-semibold text-[var(--ds-text)]">Health</div>
        <div className="text-sm text-[var(--ds-muted)]">
          If localhost links don’t work, use this page to verify base URL, API and DB.
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-[var(--ds-border)] bg-[var(--ds-surface)] p-5">
          <div className="text-xs font-semibold text-[var(--ds-muted)]">Base URL</div>
          <div className="mt-2 break-all text-sm font-semibold text-[var(--ds-text)]">{baseUrl}</div>
        </div>
        <div className="rounded-2xl border border-[var(--ds-border)] bg-[var(--ds-surface)] p-5">
          <div className="text-xs font-semibold text-[var(--ds-muted)]">DB counts</div>
          <div className="mt-2 text-sm text-[var(--ds-text)]">Leads: {leadCount}</div>
          <div className="text-sm text-[var(--ds-text)]">Deals: {dealCount}</div>
          <div className="text-sm text-[var(--ds-text)]">Events: {eventCount}</div>
          <div className="text-sm text-[var(--ds-text)]">Logs: {logCount}</div>
        </div>
        <div className="rounded-2xl border border-[var(--ds-border)] bg-[var(--ds-surface)] p-5">
          <div className="text-xs font-semibold text-[var(--ds-muted)]">Environment</div>
          <div className="mt-2 text-sm text-[var(--ds-text)]">NODE_ENV: {process.env.NODE_ENV}</div>
          <div className="text-sm text-[var(--ds-text)]">DB: sqlite</div>
        </div>
        <div className="rounded-2xl border border-[var(--ds-border)] bg-[var(--ds-surface)] p-5">
          <div className="text-xs font-semibold text-[var(--ds-muted)]">Last event</div>
          <div className="mt-2 text-sm text-[var(--ds-text)]">(use viewer for details)</div>
        </div>
      </div>

      <HealthClient />
    </div>
  );
}
