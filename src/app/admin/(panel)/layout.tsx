import { prisma } from "@/lib/db";
import { requireAdminPanel } from "@/lib/admin/rbac";
import SidebarClient from "@/app/admin/(panel)/SidebarClient";

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdminPanel();
  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { email: true },
  });

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <div className="mx-auto flex w-full max-w-7xl gap-6 px-4 py-8">
        <aside className="hidden w-64 shrink-0 rounded-2xl border border-black/5 bg-white p-4 md:block">
          <div className="mb-4 space-y-1">
            <div className="text-sm font-semibold text-[var(--color-navy)]">Admin</div>
            <div className="truncate text-xs text-[var(--color-slate)]">{user?.email || ""}</div>
          </div>

          <SidebarClient />

          <form action="/admin/api/auth/logout" method="post" className="mt-4">
            <button
              type="submit"
              className="inline-flex w-fit rounded-full border border-[var(--color-navy)]/15 px-4 py-2 text-sm font-semibold text-[var(--color-navy)] hover:border-[var(--color-navy)]/25 hover:bg-[var(--color-navy)]/[0.03]"
            >
              Logout
            </button>
          </form>
        </aside>

        <main className="w-full rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
