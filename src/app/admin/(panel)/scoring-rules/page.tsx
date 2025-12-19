import { prisma } from "@/lib/db";
import { requireAdminPanel } from "@/lib/admin/rbac";
import ScoringRulesClient from "@/app/crm/admin/scoring-rules/ScoringRulesClient";

export default async function AdminScoringRulesPage() {
  await requireAdminPanel();

  const rules = await prisma.scoringRule.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <ScoringRulesClient initialRules={rules} />;
}
