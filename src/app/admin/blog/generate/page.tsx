import Link from "next/link";
import { requireAdminPanel } from "@/lib/admin/rbac";

export default async function AdminBlogGeneratePage() {
  await requireAdminPanel();

  return (
    <div className="space-y-4">
      <div className="text-sm font-semibold text-[var(--color-navy)]">Auto Blog Generator</div>
      <h1 className="font-[var(--font-display)] text-3xl font-semibold text-[var(--color-navy)]">
        Generate blog post
      </h1>
      <div className="text-sm text-[var(--color-slate)]">Placeholder page.</div>
      <Link className="text-sm font-semibold text-[var(--color-blue)]" href="/admin">
        Back to Admin
      </Link>
    </div>
  );
}
