import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin/session";
import AdminLoginClient from "@/app/admin/_components/AdminLoginClient";

export default async function AdminLoginPage() {
  const session = await getAdminSession();
  if (session) {
    redirect("/admin");
  }

  return <AdminLoginClient initialLang="en" />;
}
