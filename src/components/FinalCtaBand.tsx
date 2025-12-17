import Link from "next/link";
import type { ReactNode } from "react";

export default function FinalCtaBand({
  title,
  subtitle,
}: {
  title: ReactNode;
  subtitle: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <h2 className="font-[var(--font-display)] text-2xl font-semibold text-[var(--color-navy)]">
            {title}
          </h2>
          <p className="max-w-2xl text-sm leading-6 text-[var(--color-slate)]">
            {subtitle}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex w-fit rounded-full bg-[var(--color-blue)] px-5 py-3 text-sm font-semibold text-white hover:opacity-95"
          >
            Richiedi una call
            <br />
            Request a call
          </Link>
          <Link
            href="/oracolo"
            className="inline-flex w-fit rounded-full border border-[var(--color-navy)]/15 px-5 py-3 text-sm font-semibold text-[var(--color-navy)] hover:border-[var(--color-navy)]/25 hover:bg-[var(--color-navy)]/[0.03]"
          >
            Avvia Oracolo
            <br />
            Start Oracolo
          </Link>
        </div>
      </div>
    </section>
  );
}
