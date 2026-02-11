import { redirect } from "next/navigation";
import { requireAdminPanel } from "@/lib/admin/rbac";

export default async function AdminAutoGeneratorRedirectPage() {
  await requireAdminPanel();
  redirect("/admin/blog/generate");
}
