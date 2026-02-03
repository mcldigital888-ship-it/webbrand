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
        <div className="text-sm font-semibold text-[var(--color-navy)]">Audit not found</div>
        <Link
          href="/admin/audits"
          className="inline-flex w-fit rounded-full border border-[var(--color-navy)]/15 px-5 py-2.5 text-sm font-semibold text-[var(--color-navy)] hover:border-[var(--color-navy)]/25 hover:bg-[var(--color-navy)]/[0.03]"
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
          <div className="text-sm font-semibold text-[var(--color-navy)]">Audit PDF Editor</div>
          <div className="text-xs text-[var(--color-slate)]">{item.id}</div>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/admin/audits/${item.id}`}
            className="inline-flex w-fit rounded-full border border-[var(--color-navy)]/15 px-5 py-2.5 text-sm font-semibold text-[var(--color-navy)] hover:border-[var(--color-navy)]/25 hover:bg-[var(--color-navy)]/[0.03]"
          >
            Back to audit
          </Link>
          <Link
            href="/admin/audits"
            className="inline-flex w-fit rounded-full border border-[var(--color-navy)]/15 px-5 py-2.5 text-sm font-semibold text-[var(--color-navy)] hover:border-[var(--color-navy)]/25 hover:bg-[var(--color-navy)]/[0.03]"
          >
            Back to list
          </Link>
        </div>
      </div>

      <AuditPdfEditorClient
        auditId={item.id}
        initialProposalJson={(item.proposalJson as unknown) ?? null}
        initialPdfUrl={pdfUrl}
      />
    </div>
  );
}
