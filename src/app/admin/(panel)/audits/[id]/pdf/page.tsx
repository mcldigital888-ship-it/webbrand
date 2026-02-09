import Link from "next/link";
import { prisma } from "@/lib/db";
import { requireAdminPanel } from "@/lib/admin/rbac";
import { getAuditDownloadUrl } from "@/lib/audit/url";
import AuditPdfEditorClient from "@/app/admin/(panel)/audits/[id]/pdf/AuditPdfEditorClient";

export default async function AdminAuditPdfPage({
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

  const pdfUrl = item.status === "GENERATED" && item.pdfPath ? getAuditDownloadUrl(item.id) : null;

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="text-sm font-semibold text-[var(--ds-text)]">Audit PDF Editor</div>
          <div className="text-xs text-[var(--ds-muted)]">{item.id}</div>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/admin/audits/${item.id}`}
            className="inline-flex w-fit rounded-full border border-[var(--ds-border)] px-5 py-2.5 text-sm font-semibold text-[var(--ds-text)] hover:bg-[var(--ds-surface-2)]"
          >
            Back to audit
          </Link>
          <Link
            href="/admin/audits"
            className="inline-flex w-fit rounded-full border border-[var(--ds-border)] px-5 py-2.5 text-sm font-semibold text-[var(--ds-text)] hover:bg-[var(--ds-surface-2)]"
          >
            Back to list
          </Link>
        </div>
      </div>

      <AuditPdfEditorClient
        auditId={item.id}
        initialProposalJson={(item.proposalJson as unknown) ?? null}
        initialPdfUrl={pdfUrl}
        meta={{
          company: item.company,
          industry: item.industry,
          goal: item.goal,
        }}
      />
    </div>
  );
}
