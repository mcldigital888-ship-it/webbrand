import { prisma } from "@/lib/db";
import { requireCrmSession } from "@/lib/crm/rbac";
import KanbanClient from "@/app/crm/deals/KanbanClient";

export default async function DealsPage() {
  const session = await requireCrmSession();

  const stages = await prisma.pipelineStage.findMany({
    orderBy: { order: "asc" },
  });

  const deals = await prisma.deal.findMany({
    where: session.role === "sales" ? { ownerId: session.userId } : {},
    include: {
      lead: { select: { name: true, email: true } },
    },
    orderBy: { updatedAt: "desc" },
    take: 500,
  });

  return (
    <KanbanClient
      stages={stages}
      initialDeals={deals}
      canMoveAny={session.role === "admin"}
    />
  );
}
