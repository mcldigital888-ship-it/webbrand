import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/crm/rbac";
import ScoringRulesClient from "@/app/crm/admin/scoring-rules/ScoringRulesClient";

export default async function ScoringRulesPage() {
  await requireAdmin();

  const rules = await prisma.scoringRule.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <ScoringRulesClient initialRules={rules} />;
}
