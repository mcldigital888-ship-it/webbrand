import Link from "next/link";
import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";

export default function CTASection({
  title,
  subtitle,
  primary,
  secondary,
}: {
  title: ReactNode;
  subtitle: ReactNode;
  primary: { href: string; label: ReactNode };
  secondary?: { href: string; label: ReactNode };
}) {
  return (
    <Reveal>
      <section className="ds-glass ds-lift relative overflow-hidden rounded-2xl p-8">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[var(--ds-accent2)]/12 blur-3xl" />
          <div className="absolute -left-20 -bottom-20 h-56 w-56 rounded-full bg-[var(--ds-accent)]/10 blur-3xl" />
        </div>
        <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <h2 className="max-w-3xl font-[var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--ds-text)] sm:text-4xl">
              {title}
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-[var(--ds-muted)]">
              {subtitle}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={primary.href}
              className="ds-btn ds-btn-primary"
            >
              {primary.label}
            </Link>
            {secondary ? (
              <Link
                href={secondary.href}
                className="ds-btn ds-btn-ghost"
              >
                {secondary.label}
              </Link>
            ) : null}
          </div>
        </div>
      </section>
    </Reveal>
  );
}
