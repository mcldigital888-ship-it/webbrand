import { getAdminSession } from "@/lib/admin/session";
import AdminDashboardClient from "@/app/admin/_components/AdminDashboardClient";
import AdminLoginClient from "@/app/admin/_components/AdminLoginClient";

export default async function AdminHomePage() {
  const session = await getAdminSession();

  if (!session) {
    return <AdminLoginClient initialLang="en" />;
  }

  return <AdminDashboardClient initialLang="en" />;
}
