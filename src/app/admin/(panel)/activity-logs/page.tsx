import { requireAdminPanel } from "@/lib/admin/rbac";

export default async function AdminActivityLogsPage() {
  await requireAdminPanel();

  return (
    <div className="space-y-2">
      <div className="text-sm font-semibold text-[var(--color-navy)]">Activity Logs</div>
      <div className="text-sm text-[var(--color-slate)]">Coming next.</div>
    </div>
  );
}
