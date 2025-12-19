import { prisma } from "@/lib/db";
import { requireAdminPanel } from "@/lib/admin/rbac";
import AutomationRulesClient from "@/app/admin/(panel)/automation-rules/AutomationRulesClient";

export default async function AdminAutomationRulesPage() {
  await requireAdminPanel();

  const rules = await prisma.automationRule.findMany({
    orderBy: { createdAt: "desc" },
  });

  const initialRules = rules.map((r) => ({
    id: r.id,
    eventName: r.eventName,
    active: r.active,
    description: r.description,
    conditionJson: r.conditionJson,
    createdAt: r.createdAt.toISOString(),
    updatedAt: r.updatedAt.toISOString(),
  }));

  return <AutomationRulesClient initialRules={initialRules} />;
}
