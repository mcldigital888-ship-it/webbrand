import Link from "next/link";
import { requireAdminPanel } from "@/lib/admin/rbac";

export default async function AdminBlogGeneratePage() {
  await requireAdminPanel();

  return (
    <div className="space-y-4">
      <div className="text-sm font-semibold text-[var(--ds-text)]">Auto Blog Generator</div>
      <h1 className="font-[var(--font-display)] text-3xl font-semibold text-[var(--ds-text)]">
        Generate blog post
      </h1>
      <div className="text-sm text-[var(--ds-muted)]">Placeholder page.</div>
      <Link
        className="inline-flex w-fit rounded-full bg-[var(--color-blue)] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-95"
        href="/admin/blog/auto-generator"
      >
        Auto Blog Generator
      </Link>
      <Link className="text-sm font-semibold text-[var(--color-blue)]" href="/admin">
        Back to Admin
      </Link>
    </div>
  );
}
