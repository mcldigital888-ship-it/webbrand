import os from "node:os";
import path from "node:path";

export function getAuditPdfDir() {
  const configured = process.env.AUDIT_PDF_DIR;
  if (configured && configured.trim()) return configured.trim();

  return path.join(os.tmpdir(), "webrrand-pdfs");
}

export function getAuditPdfPath(auditId: string) {
  return path.join(getAuditPdfDir(), `audit-${auditId}.pdf`);
}
