import Link from "next/link";
import Bilingual from "@/components/Bilingual";

const links = [
  { href: "/", label: <Bilingual en="Home" it="Home" /> },
  { href: "/about", label: <Bilingual en="About" it="Chi siamo" /> },
  { href: "/services", label: <Bilingual en="Services" it="Servizi" /> },
  { href: "/contact", label: <Bilingual en="Contact" it="Contatti" /> },
  { href: "/terms", label: <Bilingual en="Legal" it="Legal" /> },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[rgba(10,10,12,0.55)] backdrop-blur">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-4 py-14 md:grid-cols-3">
        <div className="space-y-3">
          <div className="font-semibold tracking-tight text-[var(--ds-text)]">
            Webrrand
          </div>
          <p className="text-sm leading-6 text-[var(--ds-muted)]">
            AI + data + craft.
            Built for measurable growth.
          </p>
          <div className="text-sm font-medium text-[var(--ds-muted)]">Berlin · Remote</div>
          <div className="text-sm font-medium text-[var(--ds-muted)]">hello@webbrand.studio</div>
        </div>

        <div className="md:col-span-2">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-[var(--ds-muted)] transition-colors duration-150 hover:text-[var(--ds-text)]"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-2 text-xs text-[var(--ds-muted)] sm:flex-row sm:items-center sm:justify-between">
            <div>© {new Date().getFullYear()} Webrrand</div>
            <div>Privacy-first. No spam.</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
