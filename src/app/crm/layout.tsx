import Link from "next/link";
import { requireCrmSession } from "@/lib/crm/rbac";

export default async function CrmLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireCrmSession();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <header className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/crm" className="font-semibold text-[var(--color-navy)]">
            CRM
          </Link>
          <nav className="hidden items-center gap-4 md:flex">
            <Link href="/crm/leads" className="text-sm text-[var(--color-slate)] hover:text-[var(--color-navy)]">
              Leads
            </Link>
            <Link href="/crm/deals" className="text-sm text-[var(--color-slate)] hover:text-[var(--color-navy)]">
              Deals
            </Link>
            <Link href="/crm/tasks" className="text-sm text-[var(--color-slate)] hover:text-[var(--color-navy)]">
              Tasks
            </Link>
            <Link href="/crm/dashboard" className="text-sm text-[var(--color-slate)] hover:text-[var(--color-navy)]">
              Dashboard
            </Link>
            {session.role === "admin" ? (
              <Link href="/crm/admin" className="text-sm text-[var(--color-slate)] hover:text-[var(--color-navy)]">
                Admin
              </Link>
            ) : null}
          </nav>
        </div>

        <form action="/crm/api/auth/logout" method="post">
          <button
            type="submit"
            className="inline-flex w-fit rounded-full border border-[var(--color-navy)]/15 px-4 py-2 text-sm font-semibold text-[var(--color-navy)] hover:border-[var(--color-navy)]/25 hover:bg-[var(--color-navy)]/[0.03]"
          >
            Logout
          </button>
        </form>
      </header>

      <div className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6">
        {children}
      </div>
    </div>
  );
}
