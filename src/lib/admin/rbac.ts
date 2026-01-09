import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin/session";

export async function requireAdminPanel() {
  const session = await getAdminSession();
  if (!session || session.role !== "admin") {
    redirect("/admin/login");
  }
  return session;
}
