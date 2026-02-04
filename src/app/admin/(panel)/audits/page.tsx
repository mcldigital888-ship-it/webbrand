import Link from "next/link";
import { prisma } from "@/lib/db";
import { requireAdminPanel } from "@/lib/admin/rbac";
import AuditPdfActionsClient from "@/app/admin/(panel)/audits/AuditPdfActionsClient";

const PAGE_SIZE = 20;

export default async function AdminAuditsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireAdminPanel();

  const sp = await searchParams;
  const email = typeof sp.email === "string" ? sp.email : "";
  const status = typeof sp.status === "string" ? sp.status : "";
  const pageRaw = typeof sp.page === "string" ? sp.page : "1";
  const sort = typeof sp.sort === "string" ? sp.sort : "desc";
  const page = Math.max(1, Number.parseInt(pageRaw || "1", 10) || 1);

  const where: any = {};
  if (email.trim()) where.email = { contains: email.trim(), mode: "insensitive" };
  if (status.trim()) where.status = status.trim();

  let total = 0;
  let items: Array<{
    id: string;
    createdAt: Date;
    name: string;
    email: string;
    company: string | null;
    businessType: string;
    industry: string;
    status: string;
    pdfPath: string | null;
    attemptCount: number;
    lastError: string | null;
  }> = [];

  try {
    const result = await Promise.all([
      prisma.auditSubmission.count({ where }),
      prisma.auditSubmission.findMany({
        where,
        orderBy: { createdAt: sort === "asc" ? "asc" : "desc" },
        skip: (page - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
        select: {
          id: true,
          createdAt: true,
          name: true,
          email: true,
          company: true,
          businessType: true,
          industry: true,
          status: true,
          pdfPath: true,
          attemptCount: true,
          lastError: true,
        },
      }),
    ]);

    total = result[0];
    items = result[1];
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return (
      <div className="space-y-4">
        <div className="space-y-1">
          <div className="text-sm font-semibold text-[var(--ds-text)]">Audits</div>
          <div className="text-sm text-[var(--ds-muted)]">Failed to load audit submissions.</div>
        </div>
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-[var(--ds-text)]">
          <div className="font-semibold">Server error</div>
          <div className="mt-2 break-words font-mono text-xs text-[var(--ds-muted)]">{message}</div>
        </div>
      </div>
    );
  }

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  function buildHref(nextPage: number) {
    const p = new URLSearchParams();
    if (email) p.set("email", email);
    if (status) p.set("status", status);
    if (sort) p.set("sort", sort);
    p.set("page", String(nextPage));
    return `/admin/audits?${p.toString()}`;
  }

  const sortHref = (() => {
    const p = new URLSearchParams();
    if (email) p.set("email", email);
    if (status) p.set("status", status);
    p.set("sort", sort === "asc" ? "desc" : "asc");
    p.set("page", "1");
    return `/admin/audits?${p.toString()}`;
  })();

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <div className="text-sm font-semibold text-[var(--ds-text)]">Audits</div>
        <div className="text-sm text-[var(--ds-muted)]">All audit submissions.</div>
      </div>

      <form className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-[var(--color-surface)] p-4 md:flex-row md:items-end" method="get">
        <label className="flex w-full flex-col gap-1 md:max-w-sm">
          <span className="text-xs font-semibold text-[var(--ds-muted)]">Email</span>
          <input
            name="email"
            defaultValue={email}
            className="h-10 w-full rounded-xl border border-white/10 bg-[var(--color-background)] px-3 text-sm text-[var(--ds-text)] outline-none placeholder:text-[var(--ds-muted)] focus:border-[var(--color-blue)]"
          />
        </label>

        <label className="flex w-full flex-col gap-1 md:max-w-xs">
          <span className="text-xs font-semibold text-[var(--ds-muted)]">Status</span>
          <select
            name="status"
            defaultValue={status}
            className="h-10 w-full rounded-xl border border-white/10 bg-[var(--color-background)] px-3 text-sm text-[var(--ds-text)] outline-none focus:border-[var(--color-blue)]"
          >
            <option value="">All</option>
            <option value="RECEIVED">RECEIVED</option>
            <option value="GENERATED">GENERATED</option>
            <option value="FAILED">FAILED</option>
          </select>
        </label>

        <input type="hidden" name="page" value="1" />
        <input type="hidden" name="sort" value={sort} />

        <button
          type="submit"
          className="inline-flex w-fit rounded-full bg-[var(--color-blue)] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-95"
        >
          Apply
        </button>

        <Link
          href="/admin/audits"
          className="inline-flex w-fit rounded-full border border-white/15 bg-white/[0.02] px-5 py-2.5 text-sm font-semibold text-[var(--ds-text)] hover:border-white/25 hover:bg-white/[0.04]"
        >
          Reset
        </Link>
      </form>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[var(--color-surface)]">
        <table className="w-full text-left text-sm">
          <thead className="bg-[var(--color-background)] text-xs font-semibold text-[var(--ds-muted)]">
            <tr>
              <th className="px-4 py-3">
                <Link href={sortHref} className="inline-flex items-center gap-2 hover:text-[var(--ds-text)]">
                  Created
                  <span className="text-[10px]">{sort === "asc" ? "ASC" : "DESC"}</span>
                </Link>
              </th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Business Type</th>
              <th className="px-4 py-3">Industry</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">pdfPath</th>
              <th className="px-4 py-3">Actions</th>
              <th className="px-4 py-3">Attempts</th>
              <th className="px-4 py-3">Last error</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it) => (
              <tr key={it.id} className="border-t border-white/10 hover:bg-white/[0.03]">
                <td className="px-4 py-3 text-xs text-[var(--ds-muted)]">
                  <Link href={`/admin/audits/${it.id}`} className="block">
                    {it.createdAt.toISOString()}
                  </Link>
                </td>
                <td className="px-4 py-3 font-semibold text-[var(--ds-text)]">
                  <Link href={`/admin/audits/${it.id}`} className="block hover:underline">
                    {it.name}
                  </Link>
                </td>
                <td className="px-4 py-3 text-[var(--ds-muted)]">
                  <Link href={`/admin/audits/${it.id}`} className="block">
                    {it.email}
                  </Link>
                </td>
                <td className="px-4 py-3 text-[var(--ds-muted)]">
                  <Link href={`/admin/audits/${it.id}`} className="block">
                    {it.company || ""}
                  </Link>
                </td>
                <td className="px-4 py-3 text-[var(--ds-muted)]">
                  <Link href={`/admin/audits/${it.id}`} className="block">
                    {it.businessType}
                  </Link>
                </td>
                <td className="px-4 py-3 text-[var(--ds-muted)]">
                  <Link href={`/admin/audits/${it.id}`} className="block">
                    {it.industry}
                  </Link>
                </td>
                <td className="px-4 py-3 text-[var(--ds-muted)]">
                  <Link href={`/admin/audits/${it.id}`} className="block">
                    {it.status}
                  </Link>
                </td>
                <td className="px-4 py-3 text-[var(--ds-muted)]">
                  <Link href={`/admin/audits/${it.id}`} className="block">
                    {it.pdfPath || ""}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <AuditPdfActionsClient
                    auditId={it.id}
                    initialPdfUrl={it.status === "GENERATED" && it.pdfPath ? `/api/audit/download?auditId=${encodeURIComponent(it.id)}` : null}
                  />
                </td>
                <td className="px-4 py-3 text-[var(--ds-muted)]">
                  <Link href={`/admin/audits/${it.id}`} className="block">
                    {it.attemptCount}
                  </Link>
                </td>
                <td className="px-4 py-3 text-[var(--ds-muted)]">
                  <Link href={`/admin/audits/${it.id}`} className="block">
                    {it.lastError || ""}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-xs text-[var(--ds-muted)]">
          Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, total)} of {total}
        </div>
        <div className="flex gap-2">
          <Link
            href={buildHref(Math.max(1, page - 1))}
            aria-disabled={page <= 1}
            className={
              page <= 1
                ? "pointer-events-none rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-xs font-semibold text-[var(--ds-muted)] opacity-60"
                : "rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-xs font-semibold text-[var(--ds-text)]"
            }
          >
            Prev
          </Link>
          <div className="rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-xs font-semibold text-[var(--ds-muted)]">
            Page {page} / {totalPages}
          </div>
          <Link
            href={buildHref(Math.min(totalPages, page + 1))}
            aria-disabled={page >= totalPages}
            className={
              page >= totalPages
                ? "pointer-events-none rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-xs font-semibold text-[var(--ds-muted)] opacity-60"
                : "rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-xs font-semibold text-[var(--ds-text)]"
            }
          >
            Next
          </Link>
        </div>
      </div>
    </div>
  );
}
