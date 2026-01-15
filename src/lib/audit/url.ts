export function getAuditDownloadUrl(auditId: string) {
  return `/api/audit/download?auditId=${encodeURIComponent(auditId)}`;
}
