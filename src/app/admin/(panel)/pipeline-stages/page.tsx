import { prisma } from "@/lib/db";
import { requireAdminPanel } from "@/lib/admin/rbac";
import PipelineStagesClient from "@/app/crm/admin/pipeline-stages/PipelineStagesClient";

export default async function AdminPipelineStagesPage() {
  await requireAdminPanel();

  const stages = await prisma.pipelineStage.findMany({
    orderBy: { order: "asc" },
  });

  return <PipelineStagesClient initialStages={stages} />;
}
