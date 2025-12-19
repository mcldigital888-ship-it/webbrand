import { redirect } from "next/navigation";
import { getCrmSession } from "@/lib/crm/session";

export async function requireAdminPanel() {
  const session = await getCrmSession();
  if (!session || session.role !== "admin") {
    redirect("/admin/login");
  }
  return session;
}
