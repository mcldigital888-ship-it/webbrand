import Link from "next/link";
import { requireCrmSession } from "@/lib/crm/rbac";

export default async function CrmHomePage() {
  const session = await requireCrmSession();

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <div className="text-sm font-semibold text-[var(--color-navy)]">
          Welcome
        </div>
        <div className="text-sm text-[var(--color-slate)]">
          Signed in as {session.role}.
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link
          href="/crm/leads"
          className="rounded-2xl border border-black/5 bg-white p-5 text-sm font-semibold text-[var(--color-navy)] hover:bg-[var(--color-background)]"
        >
          Leads
        </Link>
        <Link
          href="/crm/deals"
          className="rounded-2xl border border-black/5 bg-white p-5 text-sm font-semibold text-[var(--color-navy)] hover:bg-[var(--color-background)]"
        >
          Deals
        </Link>
        <Link
          href="/crm/tasks"
          className="rounded-2xl border border-black/5 bg-white p-5 text-sm font-semibold text-[var(--color-navy)] hover:bg-[var(--color-background)]"
        >
          Tasks
        </Link>
        <Link
          href="/crm/dashboard"
          className="rounded-2xl border border-black/5 bg-white p-5 text-sm font-semibold text-[var(--color-navy)] hover:bg-[var(--color-background)]"
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
}
