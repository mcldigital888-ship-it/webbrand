import Link from "next/link";

const links = [
  { href: "/solutions", label: "Solutions / Soluzioni" },
  { href: "/process", label: "Process / Processo" },
  { href: "/case-studies", label: "Case Studies / Casi" },
  { href: "/plans", label: "Plans / Piani" },
  { href: "/oracolo", label: "Oracolo" },
  { href: "/contact", label: "Contact / Contatto" },
];

export default function Footer() {
  return (
    <footer className="border-t border-black/5 bg-[var(--color-surface)]">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-4 py-14 md:grid-cols-3">
        <div className="space-y-3">
          <div className="font-semibold tracking-tight text-[var(--color-navy)]">
            webrrand
          </div>
          <p className="text-sm leading-6 text-[var(--color-slate)]">
            Conversion-first websites, landing pages, CRM systems, and AI automation.
            <br />
            Siti orientati alla conversione, landing, CRM e automazione AI.
          </p>
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
            <div>© {new Date().getFullYear()} webrrand</div>
            <div>Privacy-first. No spam. / Privacy prima di tutto. Niente spam.</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
