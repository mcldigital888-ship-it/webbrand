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
        <div className="text-sm font-semibold text-[var(--color-navy)]">Health</div>
        <div className="text-sm text-[var(--color-slate)]">
          If localhost links don’t work, use this page to verify base URL, API and DB.
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-black/5 bg-white p-5">
          <div className="text-xs font-semibold text-[var(--color-slate)]">Base URL</div>
          <div className="mt-2 break-all text-sm font-semibold text-[var(--color-navy)]">{baseUrl}</div>
        </div>
        <div className="rounded-2xl border border-black/5 bg-white p-5">
          <div className="text-xs font-semibold text-[var(--color-slate)]">DB counts</div>
          <div className="mt-2 text-sm text-[var(--color-navy)]">Leads: {leadCount}</div>
          <div className="text-sm text-[var(--color-navy)]">Deals: {dealCount}</div>
          <div className="text-sm text-[var(--color-navy)]">Events: {eventCount}</div>
          <div className="text-sm text-[var(--color-navy)]">Logs: {logCount}</div>
        </div>
        <div className="rounded-2xl border border-black/5 bg-white p-5">
          <div className="text-xs font-semibold text-[var(--color-slate)]">Environment</div>
          <div className="mt-2 text-sm text-[var(--color-navy)]">NODE_ENV: {process.env.NODE_ENV}</div>
          <div className="text-sm text-[var(--color-navy)]">DB: sqlite</div>
        </div>
        <div className="rounded-2xl border border-black/5 bg-white p-5">
          <div className="text-xs font-semibold text-[var(--color-slate)]">Last event</div>
          <div className="mt-2 text-sm text-[var(--color-navy)]">(use viewer for details)</div>
        </div>
      </div>

      <HealthClient />
    </div>
  );
}
