import Link from "next/link";
import { requireAdminPanel } from "@/lib/admin/rbac";
import AdminBlogGenerateClient from "./AdminBlogGenerateClient";

export default async function AdminBlogGeneratePage() {
  await requireAdminPanel();

  return (
    <div className="mx-auto w-full max-w-6xl space-y-4 px-4 py-6">
      <AdminBlogGenerateClient />

      <Link
        className="inline-flex w-fit rounded-full border border-[var(--ds-border)] bg-[var(--ds-surface)] px-5 py-2.5 text-sm font-semibold text-[var(--ds-text)] transition-colors hover:bg-[var(--ds-surface-2)]"
        href="/admin/blog/auto-generator"
      >
        Legacy link
      </Link>
    </div>
  );
}
