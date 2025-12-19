import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireCrmSession } from "@/lib/crm/rbac";
import EditDealClient from "@/app/crm/deals/[id]/EditDealClient";

export default async function DealDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await requireCrmSession();
  const { id } = await params;

  const deal = await prisma.deal.findUnique({
    where: { id },
    include: {
      lead: true,
      stage: true,
      owner: true,
      company: true,
    },
  });

  if (!deal) return notFound();

  if (session.role === "sales" && deal.ownerId !== session.userId) {
    return notFound();
  }

  const logs = await prisma.activityLog.findMany({
    where: { entityType: "deal", entityId: deal.id },
    orderBy: { timestamp: "desc" },
    take: 50,
  });

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <div className="text-xs font-semibold text-[var(--color-slate)]">Deal</div>
        <div className="text-2xl font-semibold text-[var(--color-navy)]">
          {deal.lead.name}
        </div>
        <div className="text-sm text-[var(--color-slate)]">{deal.lead.email}</div>
      </header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-black/5 bg-white p-6 md:col-span-2">
          <div className="space-y-4">
            <div className="text-sm font-semibold text-[var(--color-navy)]">Details</div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 text-sm text-[var(--color-slate)]">
              <div>
                <span className="font-semibold text-[var(--color-navy)]">Stage:</span> {deal.stage.name}
              </div>
              <div>
                <span className="font-semibold text-[var(--color-navy)]">Owner:</span> {deal.owner?.email || "-"}
              </div>
              <div>
                <span className="font-semibold text-[var(--color-navy)]">Company:</span> {deal.company?.name || "-"}
              </div>
              <div>
                <span className="font-semibold text-[var(--color-navy)]">Lead:</span>{" "}
                <Link href={`/crm/leads/${deal.leadId}`} className="underline">
                  Open lead
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-5">
              <EditDealClient
                dealId={deal.id}
                initialValue={deal.value}
                initialProbability={deal.probability}
                probabilityManual={deal.probabilityManual}
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-black/5 bg-white p-6">
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
