import Link from "next/link";

export default function CrmSystemPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <div className="text-sm font-semibold tracking-wide text-[var(--color-cyan)]">
          CRM System
        </div>
        <h1 className="max-w-4xl font-[var(--font-display)] text-4xl font-semibold tracking-tight text-[var(--color-navy)] sm:text-5xl">
          A CRM setup that closes deals.
        </h1>
        <p className="max-w-3xl text-sm leading-6 text-[var(--color-slate)]">
          This page explains the logic and structure of a CRM + pipeline. It does not implement CRM software.
        </p>
      </header>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6 md:col-span-2">
          <div className="space-y-4 text-sm leading-6 text-[var(--color-slate)]">
            <div>
              We design: lead capture fields, pipeline stages, ownership rules, scoring, follow-ups, and reporting.
            </div>
            <div>
              We connect: website forms → webhook automation → your CRM (HubSpot/Zoho/GHL/etc.).
            </div>
            <div>
              We do not build: a custom CRM product.
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6">
          <div className="space-y-3">
            <div className="text-sm font-semibold text-[var(--color-navy)]">Start</div>
            <div className="text-sm text-[var(--color-slate)]">
              Use Oracolo to generate a brief, or book a call.
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <Link
                href="/oracolo"
                className="inline-flex w-fit rounded-full bg-[var(--color-blue)] px-5 py-3 text-sm font-semibold text-white hover:opacity-95"
                data-cta="crm_oracolo"
              >
                Start Oracolo
              </Link>
              <Link
                href="/contact"
                className="inline-flex w-fit rounded-full border border-[var(--color-navy)]/15 px-5 py-3 text-sm font-semibold text-[var(--color-navy)] hover:border-[var(--color-navy)]/25 hover:bg-[var(--color-navy)]/[0.03]"
                data-cta="crm_contact"
              >
                Book a call
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
