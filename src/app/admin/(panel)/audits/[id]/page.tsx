import Link from "next/link";
import { prisma } from "@/lib/db";
import { requireAdminPanel } from "@/lib/admin/rbac";
import AuditSubmissionEditorClient from "@/app/admin/(panel)/audits/AuditSubmissionEditorClient";

export default async function AdminAuditDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdminPanel();

  const { id } = await params;

  const item = await prisma.auditSubmission.findUnique({ where: { id } });

  if (!item) {
    return (
      <div className="space-y-3">
        <div className="text-sm font-semibold text-[var(--ds-text)]">Audit not found</div>
        <Link
          href="/admin/audits"
          className="inline-flex w-fit rounded-full border border-[var(--ds-border)] px-5 py-2.5 text-sm font-semibold text-[var(--ds-text)] hover:bg-[var(--ds-surface-2)]"
        >
          Back
        </Link>
      </div>
    );
  }

  const initial = {
    ...item,
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="text-sm font-semibold text-[var(--ds-text)]">Audit</div>
          <div className="text-xs text-[var(--ds-muted)]">{item.id}</div>
        </div>
        <Link
          href="/admin/audits"
          className="inline-flex w-fit rounded-full border border-[var(--ds-border)] px-5 py-2.5 text-sm font-semibold text-[var(--ds-text)] hover:bg-[var(--ds-surface-2)]"
        >
          Back to list
        </Link>
      </div>

      <AuditSubmissionEditorClient initialItem={initial} />
    </div>
  );
}
