import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/crm/rbac";
import PipelineStagesClient from "@/app/crm/admin/pipeline-stages/PipelineStagesClient";

export default async function PipelineStagesPage() {
  await requireAdmin();

  const stages = await prisma.pipelineStage.findMany({
    orderBy: { order: "asc" },
  });

  return <PipelineStagesClient initialStages={stages} />;
}
