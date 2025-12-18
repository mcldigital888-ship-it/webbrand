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
      <section className="relative overflow-hidden rounded-2xl border border-black/5 bg-[var(--color-surface)] p-8">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[var(--color-cyan)]/12 blur-3xl" />
          <div className="absolute -left-20 -bottom-20 h-56 w-56 rounded-full bg-[var(--color-blue)]/10 blur-3xl" />
        </div>
        <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <h2 className="max-w-3xl font-[var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--color-navy)] sm:text-4xl">
              {title}
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-[var(--color-slate)]">
              {subtitle}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={primary.href}
              className="inline-flex w-fit rounded-full bg-[var(--color-blue)] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-95"
            >
              {primary.label}
            </Link>
            {secondary ? (
              <Link
                href={secondary.href}
                className="inline-flex w-fit rounded-full border border-[var(--color-navy)]/15 px-6 py-3 text-sm font-semibold text-[var(--color-navy)] transition-colors hover:border-[var(--color-navy)]/25 hover:bg-[var(--color-navy)]/[0.03]"
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
