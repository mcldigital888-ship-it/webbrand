import { redirect } from "next/navigation";
import { getCrmSession } from "@/lib/crm/session";

export async function requireCrmSession() {
  const session = await getCrmSession();
  if (!session) {
    redirect("/crm/login");
  }
  return session;
}

export async function requireAdmin() {
  const session = await requireCrmSession();
  if (session.role !== "admin") {
    redirect("/crm");
  }
  return session;
}
