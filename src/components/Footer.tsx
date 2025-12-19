import Link from "next/link";

const links = [
  { href: "/solutions", label: "Solutions" },
  { href: "/crm-system", label: "CRM System" },
  { href: "/ai-systems", label: "AI Systems" },
  { href: "/integrations", label: "Integrations" },
  { href: "/oracolo", label: "Oracolo" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export default function Footer() {
  return (
    <footer className="border-t border-black/5 bg-[var(--color-surface)]">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-4 py-14 md:grid-cols-3">
        <div className="space-y-3">
          <div className="font-semibold tracking-tight text-[var(--color-navy)]">
            Webbrand
          </div>
          <p className="text-sm leading-6 text-[var(--color-slate)]">
            AI + data + craft.
            Built for measurable growth.
          </p>
          <div className="text-sm font-medium text-[var(--color-slate)]">Berlin · Remote</div>
          <div className="text-sm font-medium text-[var(--color-slate)]">hello@webbrand.studio</div>
        </div>

        <div className="md:col-span-2">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-[var(--color-slate)] hover:text-[var(--color-navy)]"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-2 text-xs text-[var(--color-slate)] sm:flex-row sm:items-center sm:justify-between">
            <div>© {new Date().getFullYear()} Webbrand</div>
            <div>Privacy-first. No spam.</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
