import { requireCrmSession } from "@/lib/crm/rbac";

export default async function TasksPage() {
  await requireCrmSession();

  return (
    <div className="space-y-2">
      <div className="text-sm font-semibold text-[var(--color-navy)]">Tasks</div>
      <div className="text-sm text-[var(--color-slate)]">
        Task list + overdue highlighting will be implemented next.
      </div>
    </div>
  );
}
