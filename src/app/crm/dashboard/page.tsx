import { requireCrmSession } from "@/lib/crm/rbac";

export default async function DashboardPage() {
  const session = await requireCrmSession();

  return (
    <div className="space-y-2">
      <div className="text-sm font-semibold text-[var(--color-navy)]">Dashboard</div>
      <div className="text-sm text-[var(--color-slate)]">
        {session.role === "admin"
          ? "Admin dashboard KPIs will be implemented next."
          : "Sales dashboard KPIs will be implemented next."}
      </div>
    </div>
  );
}
