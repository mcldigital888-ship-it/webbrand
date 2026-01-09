import Link from "next/link";
import Bilingual from "@/components/Bilingual";

const links = [
  { href: "/", label: <Bilingual en="Home" it="Home" /> },
  { href: "/about", label: <Bilingual en="About" it="Chi siamo" /> },
  { href: "/services", label: <Bilingual en="Services" it="Servizi" /> },
  { href: "/contact", label: <Bilingual en="Contact" it="Contatti" /> },
  { href: "/privacy", label: <Bilingual en="Privacy" it="Privacy" /> },
  { href: "/terms", label: <Bilingual en="Terms" it="Termini" /> },
];

export default function Footer() {
  return (
    <footer className="border-t border-black/5 bg-[var(--color-surface)]">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-4 py-14 md:grid-cols-3">
        <div className="space-y-3">
          <div className="font-semibold tracking-tight text-[var(--color-navy)]">
            Webrrand
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
            <Link
              href="/admin"
              className="text-sm font-medium text-[var(--color-slate)] hover:text-[var(--color-navy)]"
            >
              <Bilingual en="Admin Panel" it="Pannello admin" />
            </Link>
          </div>

          <div className="mt-10 flex flex-col gap-2 text-xs text-[var(--color-slate)] sm:flex-row sm:items-center sm:justify-between">
            <div>© {new Date().getFullYear()} Webrrand</div>
            <div>Privacy-first. No spam.</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
