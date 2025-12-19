import Link from "next/link";
import { prisma } from "@/lib/db";
import { requireAdminPanel } from "@/lib/admin/rbac";

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function startOfWeek(d: Date) {
  const x = startOfDay(d);
  const day = x.getDay();
  const diff = (day === 0 ? -6 : 1) - day;
  x.setDate(x.getDate() + diff);
  return x;
}

export default async function AdminHomePage() {
  await requireAdminPanel();

  const now = new Date();
  const today = startOfDay(now);
  const week = startOfWeek(now);

  const [
    leadsToday,
    leadsWeek,
    overdueTasks,
    deals,
    stages,
    latestEvents,
    latestLogs,
  ] = await Promise.all([
    prisma.lead.count({ where: { createdAt: { gte: today } } }),
    prisma.lead.count({ where: { createdAt: { gte: week } } }),
    prisma.task.count({ where: { completed: false, dueDate: { lt: now } } }),
    prisma.deal.findMany({ select: { stageId: true } }),
    prisma.pipelineStage.findMany({ select: { id: true, name: true, isWon: true, isLost: true } }),
    prisma.automationEvent.findMany({ orderBy: { createdAt: "desc" }, take: 20 }),
    prisma.activityLog.findMany({ orderBy: { timestamp: "desc" }, take: 20 }),
  ]);

  const dealsByStage = new Map<string, number>();
  for (const d of deals) dealsByStage.set(d.stageId, (dealsByStage.get(d.stageId) || 0) + 1);

  const wonStageIds = new Set(stages.filter((s) => s.isWon).map((s) => s.id));
  const lostStageIds = new Set(stages.filter((s) => s.isLost).map((s) => s.id));

  let wonCount = 0;
  let lostCount = 0;
  for (const d of deals) {
    if (wonStageIds.has(d.stageId)) wonCount += 1;
    if (lostStageIds.has(d.stageId)) lostCount += 1;
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <div className="text-sm font-semibold text-[var(--color-navy)]">Website Management Panel</div>
        <div className="text-sm text-[var(--color-slate)]">
          Control center for CRM, automation, and system configuration.
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-black/5 bg-white p-5">
          <div className="text-xs font-semibold text-[var(--color-slate)]">New leads today</div>
          <div className="mt-2 text-2xl font-semibold text-[var(--color-navy)]">{leadsToday}</div>
        </div>
        <div className="rounded-2xl border border-black/5 bg-white p-5">
          <div className="text-xs font-semibold text-[var(--color-slate)]">New leads this week</div>
          <div className="mt-2 text-2xl font-semibold text-[var(--color-navy)]">{leadsWeek}</div>
        </div>
        <div className="rounded-2xl border border-black/5 bg-white p-5">
          <div className="text-xs font-semibold text-[var(--color-slate)]">Won deals</div>
          <div className="mt-2 text-2xl font-semibold text-[var(--color-navy)]">{wonCount}</div>
        </div>
        <div className="rounded-2xl border border-black/5 bg-white p-5">
          <div className="text-xs font-semibold text-[var(--color-slate)]">Overdue tasks</div>
          <div className="mt-2 text-2xl font-semibold text-[var(--color-navy)]">{overdueTasks}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-black/5 bg-white p-5 lg:col-span-1">
          <div className="text-sm font-semibold text-[var(--color-navy)]">Navigation</div>
          <div className="mt-4 grid grid-cols-1 gap-2">
            <Link href="/admin/users" className="rounded-xl border border-black/5 bg-[var(--color-background)] px-3 py-2 text-sm font-semibold text-[var(--color-navy)]">
              Users
            </Link>
            <Link href="/admin/pipeline-stages" className="rounded-xl border border-black/5 bg-[var(--color-background)] px-3 py-2 text-sm font-semibold text-[var(--color-navy)]">
              Pipeline Stages
            </Link>
            <Link href="/admin/scoring-rules" className="rounded-xl border border-black/5 bg-[var(--color-background)] px-3 py-2 text-sm font-semibold text-[var(--color-navy)]">
              Scoring Rules
            </Link>
            <Link href="/admin/automation-rules" className="rounded-xl border border-black/5 bg-[var(--color-background)] px-3 py-2 text-sm font-semibold text-[var(--color-navy)]">
              Automation Rules
            </Link>
            <Link href="/admin/system-config" className="rounded-xl border border-black/5 bg-[var(--color-background)] px-3 py-2 text-sm font-semibold text-[var(--color-navy)]">
              System Config
            </Link>
            <Link href="/admin/automation-events" className="rounded-xl border border-black/5 bg-[var(--color-background)] px-3 py-2 text-sm font-semibold text-[var(--color-navy)]">
              Automation Events
            </Link>
            <Link href="/admin/activity-logs" className="rounded-xl border border-black/5 bg-[var(--color-background)] px-3 py-2 text-sm font-semibold text-[var(--color-navy)]">
              Activity Logs
            </Link>
            <Link href="/admin/health" className="rounded-xl border border-black/5 bg-[var(--color-background)] px-3 py-2 text-sm font-semibold text-[var(--color-navy)]">
              Health
            </Link>
          </div>

          <div className="mt-5 text-xs font-semibold text-[var(--color-slate)]">Quick CRM links</div>
          <div className="mt-2 grid grid-cols-1 gap-2">
            <Link href="/crm/leads" className="rounded-xl border border-black/5 px-3 py-2 text-sm text-[var(--color-slate)] hover:text-[var(--color-navy)]">
              /crm/leads
            </Link>
            <Link href="/crm/deals" className="rounded-xl border border-black/5 px-3 py-2 text-sm text-[var(--color-slate)] hover:text-[var(--color-navy)]">
              /crm/deals
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-black/5 bg-white p-5 lg:col-span-1">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-[var(--color-navy)]">Deals by stage</div>
            <div className="text-xs font-semibold text-[var(--color-slate)]">Total: {deals.length}</div>
          </div>
          <div className="mt-4 space-y-2">
            {stages.map((s) => (
              <div key={s.id} className="flex items-center justify-between rounded-xl border border-black/5 px-3 py-2">
                <div className="text-sm text-[var(--color-navy)]">{s.name}</div>
                <div className="text-sm font-semibold text-[var(--color-navy)]">{dealsByStage.get(s.id) || 0}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 text-xs text-[var(--color-slate)]">Won: {wonCount} · Lost: {lostCount}</div>
        </div>

        <div className="space-y-4 lg:col-span-1">
          <div className="rounded-2xl border border-black/5 bg-white p-5">
            <div className="text-sm font-semibold text-[var(--color-navy)]">Latest AutomationEvents</div>
            <div className="mt-4 space-y-2">
              {latestEvents.map((e) => (
                <div key={e.id} className="rounded-xl border border-black/5 px-3 py-2">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-semibold text-[var(--color-navy)]">{e.eventName}</div>
                    <div className="text-xs text-[var(--color-slate)]">{e.status}</div>
                  </div>
                  <div className="mt-1 text-xs text-[var(--color-slate)]">{e.entityType}:{e.entityId}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-black/5 bg-white p-5">
            <div className="text-sm font-semibold text-[var(--color-navy)]">Latest ActivityLogs</div>
            <div className="mt-4 space-y-2">
              {latestLogs.map((l) => (
                <div key={l.id} className="rounded-xl border border-black/5 px-3 py-2">
                  <div className="text-xs font-semibold text-[var(--color-navy)]">{l.action}</div>
                  <div className="mt-1 text-xs text-[var(--color-slate)]">{l.entityType}:{l.entityId}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
