import Link from "next/link";

const navItems = [
  { href: "/solutions", label: "Solutions / Soluzioni" },
  { href: "/process", label: "Process / Processo" },
  { href: "/case-studies", label: "Case Studies / Casi" },
  { href: "/plans", label: "Plans / Piani" },
  { href: "/oracolo", label: "Oracolo" },
  { href: "/contact", label: "Contact / Contatto" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[var(--color-surface)]/80 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
        <Link
          href="/"
          className="font-semibold tracking-tight text-[var(--color-navy)]"
        >
          webbrand
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[var(--color-slate)] transition-colors hover:text-[var(--color-navy)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden rounded-full border border-[var(--color-navy)]/15 px-4 py-2 text-sm font-medium text-[var(--color-navy)] transition-colors hover:border-[var(--color-navy)]/25 hover:bg-[var(--color-navy)]/[0.03] md:inline-flex"
          >
            Request a Call / Richiedi una call
          </Link>
          <Link
            href="/oracolo"
            className="inline-flex rounded-full bg-[var(--color-blue)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:opacity-95"
          >
            Start Oracolo / Avvia Oracolo
          </Link>
        </div>
      </div>
    </header>
  );
}
