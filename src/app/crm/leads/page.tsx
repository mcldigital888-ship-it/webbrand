import Link from "next/link";
import { prisma } from "@/lib/db";
import { requireCrmSession } from "@/lib/crm/rbac";

export default async function LeadsPage() {
  const session = await requireCrmSession();

  const leads = await prisma.lead.findMany({
    where: session.role === "sales" ? { ownerId: session.userId } : {},
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-[var(--color-navy)]">Leads</div>
          <div className="text-xs text-[var(--color-slate)]">Latest 100</div>
        </div>
        <Link
          href="/crm/leads/new"
          className="inline-flex w-fit rounded-full bg-[var(--color-blue)] px-4 py-2 text-sm font-semibold text-white hover:opacity-95"
        >
          New lead
        </Link>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-black/5 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-black/5 text-xs text-[var(--color-slate)]">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Score</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Created</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((l: (typeof leads)[number]) => (
              <tr key={l.id} className="border-b border-black/5 last:border-b-0">
                <td className="px-4 py-3 font-semibold text-[var(--color-navy)]">
                  <Link href={`/crm/leads/${l.id}`} className="hover:underline">
                    {l.name}
                  </Link>
                </td>
                <td className="px-4 py-3 text-[var(--color-slate)]">{l.email}</td>
                <td className="px-4 py-3 text-[var(--color-slate)]">{l.score}</td>
                <td className="px-4 py-3 text-[var(--color-slate)]">{l.status}</td>
                <td className="px-4 py-3 text-[var(--color-slate)]">
                  {new Date(l.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
