"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminLangToggleClient, { type AdminLang } from "@/app/admin/_components/AdminLangToggleClient";

const t = {
  en: {
    top: "Webrrand Admin",
    logout: "Logout",
    title: "Dashboard",
    crmTitle: "CRM Control Panel",
    crmCustomers: "Customers",
    crmLeads: "Leads",
    crmRules: "Automation Rules",
    crmLogs: "Activity Logs",
    auditsQuickTitle: "Audit Submissions",
    auditsQuickCta: "Open audit lists",
    blogTitle: "Auto Blog Generator",
    blogGenerate: "Generate blog post",
    blogProducts: "Fetch products & create drafts",
    blogQueue: "Review queue",
    statusTitle: "System Status",
    lastRunTitle: "Last Run",
    errorsTitle: "Errors",
  },
  it: {
    top: "Webrrand Admin",
    logout: "Logout",
    title: "Dashboard",
    crmTitle: "Pannello di Controllo CRM",
    crmCustomers: "Clienti",
    crmLeads: "Contatti",
    crmRules: "Regole di Automazione",
    crmLogs: "Log Attività",
    auditsQuickTitle: "Invii Audit",
    auditsQuickCta: "Apri liste audit",
    blogTitle: "Generatore Blog Automatico",
    blogGenerate: "Genera articolo",
    blogProducts: "Importa prodotti e crea bozze",
    blogQueue: "Coda di revisione",
    statusTitle: "Stato Sistema",
    lastRunTitle: "Ultima Esecuzione",
    errorsTitle: "Errori",
  },
} as const;

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6 shadow-sm">
      <div className="text-sm font-semibold text-[var(--ds-text)]">{title}</div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function PillLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex w-fit rounded-full border border-white/15 bg-white/[0.02] px-4 py-2 text-sm font-semibold text-[var(--ds-text)] transition-colors hover:border-white/25 hover:bg-white/[0.04]"
    >
      {children}
    </Link>
  );
}

export default function AdminDashboardClient({
  initialLang = "en",
}: {
  initialLang?: AdminLang;
}) {
  const router = useRouter();
  const [lang, setLang] = useState<AdminLang>(initialLang);
  const copy = t[lang];
  const [loggingOut, setLoggingOut] = useState(false);

  async function logout() {
    setLoggingOut(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.refresh();
      router.push("/admin");
    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[var(--color-background)] px-4 py-10">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <div className="text-sm font-semibold text-[var(--ds-text)]">{copy.top}</div>
            <div className="font-[var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--ds-text)]">
              {copy.title}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <AdminLangToggleClient value={lang} onChange={setLang} />
            <button
              type="button"
              onClick={logout}
              disabled={loggingOut}
              className="inline-flex rounded-full border border-white/15 bg-white/[0.02] px-4 py-2 text-sm font-semibold text-[var(--ds-text)] hover:border-white/25 hover:bg-white/[0.04] disabled:opacity-60"
            >
              {loggingOut ? "…" : copy.logout}
            </button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            <Card title={copy.crmTitle}>
              <div className="flex flex-wrap gap-2">
                <PillLink href="/admin/crm/customers">{copy.crmCustomers}</PillLink>
                <PillLink href="/admin/crm/leads">{copy.crmLeads}</PillLink>
                <PillLink href="/admin/automation-rules">{copy.crmRules}</PillLink>
                <PillLink href="/admin/logs">{copy.crmLogs}</PillLink>
                <PillLink href="/admin/audits">Audits</PillLink>
              </div>
            </Card>

            <Card title={copy.blogTitle}>
              <div className="flex flex-wrap gap-2">
                <PillLink href="/admin/blog/generate">{copy.blogGenerate}</PillLink>
                <PillLink href="/admin/blog/products">{copy.blogProducts}</PillLink>
                <PillLink href="/admin/blog/queue">{copy.blogQueue}</PillLink>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <Card title={copy.statusTitle}>
              <div className="text-sm text-[var(--color-slate)]">OK (placeholder)</div>
            </Card>
            <Card title={copy.lastRunTitle}>
              <div className="text-sm text-[var(--color-slate)]">—</div>
            </Card>
            <Card title={copy.errorsTitle}>
              <div className="text-sm text-[var(--color-slate)]">0</div>
            </Card>
            <Card title={copy.auditsQuickTitle}>
              <Link
                href="/admin/audits"
                className="inline-flex w-fit rounded-full bg-[var(--color-blue)] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-95"
              >
                {copy.auditsQuickCta}
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
