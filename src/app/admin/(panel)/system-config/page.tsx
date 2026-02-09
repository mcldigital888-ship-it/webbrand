import { requireAdminPanel } from "@/lib/admin/rbac";

export default async function AdminSystemConfigPage() {
  await requireAdminPanel();

  return (
    <div className="space-y-2">
      <div className="text-sm font-semibold text-[var(--ds-text)]">System Config</div>
      <div className="text-sm text-[var(--ds-muted)]">Coming next.</div>
    </div>
  );
}
