"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Item = {
  href: string;
  label: string;
  icon: (active: boolean) => React.ReactNode;
};

type Group = {
  title: string;
  items: Item[];
};

function cls(active: boolean) {
  return active
    ? "flex items-center gap-2 rounded-xl bg-[var(--color-background)] px-3 py-2 text-[var(--ds-text)]"
    : "flex items-center gap-2 rounded-xl px-3 py-2 text-[var(--ds-muted)] hover:bg-[var(--color-background)] hover:text-[var(--ds-text)]";
}

function IconWrap({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex h-5 w-5 items-center justify-center">{children}</span>;
}

function CircleIcon(active: boolean) {
  return (
    <IconWrap>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="9" stroke={active ? "currentColor" : "currentColor"} strokeWidth="2" opacity={active ? 1 : 0.8} />
      </svg>
    </IconWrap>
  );
}

function BoltIcon(active: boolean) {
  return (
    <IconWrap>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M13 2L3 14h7l-1 8 12-14h-7l-1-6z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
          opacity={active ? 1 : 0.85}
        />
      </svg>
    </IconWrap>
  );
}

function GridIcon(active: boolean) {
  return (
    <IconWrap>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zm9 0h7v7h-7v-7z" fill="currentColor" opacity={active ? 1 : 0.85} />
      </svg>
    </IconWrap>
  );
}

function UsersIcon(active: boolean) {
  return (
    <IconWrap>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={active ? 1 : 0.85}
        />
        <path
          d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={active ? 1 : 0.85}
        />
        <path
          d="M23 21v-2a4 4 0 0 0-3-3.87"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={active ? 1 : 0.65}
        />
        <path
          d="M16 3.13a4 4 0 0 1 0 7.75"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={active ? 1 : 0.65}
        />
      </svg>
    </IconWrap>
  );
}

function HeartbeatIcon(active: boolean) {
  return (
    <IconWrap>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M3 12h4l2-5 4 10 2-5h6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={active ? 1 : 0.85}
        />
      </svg>
    </IconWrap>
  );
}

function FileTextIcon(active: boolean) {
  return (
    <IconWrap>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={active ? 1 : 0.85}
        />
        <path d="M14 2v6h6" stroke="currentColor" strokeWidth="2" opacity={active ? 1 : 0.85} />
        <path d="M16 13H8" stroke="currentColor" strokeWidth="2" opacity={active ? 1 : 0.85} />
        <path d="M16 17H8" stroke="currentColor" strokeWidth="2" opacity={active ? 1 : 0.85} />
        <path d="M10 9H8" stroke="currentColor" strokeWidth="2" opacity={active ? 1 : 0.85} />
      </svg>
    </IconWrap>
  );
}

function SettingsIcon(active: boolean) {
  return (
    <IconWrap>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"
          stroke="currentColor"
          strokeWidth="2"
          opacity={active ? 1 : 0.85}
        />
        <path
          d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-1.41 3.41h-.17a1.65 1.65 0 0 0-1.52 1.11 2 2 0 0 1-3.78 0 1.65 1.65 0 0 0-1.52-1.11H9.6a1.65 1.65 0 0 0-1.82.33l-.06.06A2 2 0 0 1 4.3 19.8v-.17a1.65 1.65 0 0 0-1.11-1.52 2 2 0 0 1 0-3.78 1.65 1.65 0 0 0 1.11-1.52V9.6A1.65 1.65 0 0 0 4 7.78l-.06-.06A2 2 0 0 1 5.35 4.3h.17a1.65 1.65 0 0 0 1.52-1.11 2 2 0 0 1 3.78 0 1.65 1.65 0 0 0 1.52 1.11h1.8a1.65 1.65 0 0 0 1.52-1.11 2 2 0 0 1 3.78 0 1.65 1.65 0 0 0 1.52 1.11h.17a2 2 0 0 1 1.41 3.41l-.06.06A1.65 1.65 0 0 0 19.4 9v.17a1.65 1.65 0 0 0 1.11 1.52 2 2 0 0 1 0 3.78A1.65 1.65 0 0 0 19.4 15z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
          opacity={active ? 1 : 0.65}
        />
      </svg>
    </IconWrap>
  );
}

const groups: Group[] = [
  {
    title: "OVERVIEW",
    items: [
      { href: "/admin", label: "Dashboard", icon: GridIcon },
      { href: "/admin/audits", label: "Audits", icon: FileTextIcon },
      { href: "/admin/health", label: "System Health", icon: HeartbeatIcon },
    ],
  },
  {
    title: "CRM CORE",
    items: [
      { href: "/crm/leads", label: "Leads", icon: CircleIcon },
      { href: "/crm/deals", label: "Deals / Pipeline", icon: CircleIcon },
      { href: "/crm/tasks", label: "Tasks", icon: CircleIcon },
    ],
  },
  {
    title: "AUTOMATION & LOGIC",
    items: [
      { href: "/admin/scoring-rules", label: "Scoring Rules", icon: BoltIcon },
      { href: "/admin/automation-rules", label: "Automation Rules", icon: BoltIcon },
      { href: "/admin/automation-events", label: "Automation Events", icon: FileTextIcon },
      { href: "/admin/activity-logs", label: "Activity Logs", icon: FileTextIcon },
    ],
  },
  {
    title: "SYSTEM",
    items: [
      { href: "/admin/pipeline-stages", label: "Pipeline Stages", icon: SettingsIcon },
      { href: "/admin/users", label: "Users", icon: UsersIcon },
      { href: "/admin/system-config", label: "System Config", icon: SettingsIcon },
    ],
  },
];

export default function SidebarClient() {
  const pathname = usePathname() || "";

  return (
    <nav className="space-y-4 text-sm">
      {groups.map((g) => (
        <div key={g.title}>
          <div className="px-3 pb-1 text-[11px] font-semibold tracking-wide text-[var(--ds-muted)]">
            {g.title}
          </div>
          <div className="space-y-1">
            {g.items.map((it) => {
              const active = pathname === it.href || (it.href !== "/" && pathname.startsWith(it.href + "/"));
              return (
                <Link key={it.href} href={it.href} className={cls(active)}>
                  {it.icon(active)}
                  <span className="truncate">{it.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}
