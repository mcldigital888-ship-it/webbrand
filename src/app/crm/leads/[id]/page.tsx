import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireCrmSession } from "@/lib/crm/rbac";
import CreateDealClient from "@/app/crm/leads/[id]/CreateDealClient";
import AssignOwnerClient from "@/app/crm/leads/[id]/AssignOwnerClient";

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await requireCrmSession();
  const { id } = await params;

  const lead = await prisma.lead.findUnique({
    where: { id },
    include: {
      owner: true,
      deals: true,
      tasks: true,
    },
  });

  if (!lead) return notFound();

  if (session.role === "sales" && lead.ownerId !== session.userId) {
    return notFound();
  }

  const logs = await prisma.activityLog.findMany({
    where: { entityType: "lead", entityId: lead.id },
    orderBy: { timestamp: "desc" },
    take: 50,
  });

  const salesUsers =
    session.role === "admin"
      ? await prisma.user.findMany({
          where: { role: "sales", active: true },
          orderBy: { email: "asc" },
          select: { id: true, email: true },
        })
      : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <div className="text-sm font-semibold text-[var(--color-navy)]">{lead.name}</div>
          <div className="text-sm text-[var(--color-slate)]">{lead.email}</div>
        </div>

        <div className="flex flex-col items-start gap-3">
          {session.role === "admin" ? (
            <AssignOwnerClient
              leadId={lead.id}
              currentOwnerId={lead.ownerId}
              salesUsers={salesUsers}
            />
          ) : null}
          <CreateDealClient leadId={lead.id} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-black/5 bg-white p-5 md:col-span-2">
          <div className="text-sm font-semibold text-[var(--color-navy)]">Details</div>
          <div className="mt-4 space-y-2 text-sm text-[var(--color-slate)]">
            <div><span className="font-semibold text-[var(--color-navy)]">Phone:</span> {lead.phone || "-"}</div>
            <div><span className="font-semibold text-[var(--color-navy)]">Source:</span> {lead.source || "-"}</div>
            <div><span className="font-semibold text-[var(--color-navy)]">Score:</span> {lead.score}</div>
            <div><span className="font-semibold text-[var(--color-navy)]">Status:</span> {lead.status}</div>
            <div><span className="font-semibold text-[var(--color-navy)]">Owner:</span> {lead.owner?.email || "Unassigned"}</div>
          </div>
        </div>

        <div className="rounded-2xl border border-black/5 bg-white p-5">
          <div className="text-sm font-semibold text-[var(--color-navy)]">Activity</div>
          <div className="mt-4 space-y-2 text-xs text-[var(--color-slate)]">
            {logs.length === 0 ? <div>No activity yet.</div> : null}
            {logs.map((l: (typeof logs)[number]) => (
              <div key={l.id} className="rounded-xl border border-black/5 bg-[var(--color-surface)] p-3">
                <div className="font-semibold text-[var(--color-navy)]">{l.action}</div>
                <div>{new Date(l.timestamp).toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
