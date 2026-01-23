export default function TermsPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <div className="text-sm font-semibold tracking-wide text-[var(--color-cyan)]">
          Legal
        </div>
        <h1 className="max-w-3xl font-[var(--font-display)] text-4xl font-semibold tracking-tight text-[var(--color-navy)] sm:text-5xl">
          Terms & Privacy (placeholder)
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-[var(--color-slate)]">
          This page is a placeholder. Replace it with your legal text.
        </p>
      </header>

      <section className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6">
        <div className="space-y-3 text-sm leading-6 text-[var(--color-slate)]">
          <div className="text-sm font-semibold tracking-wide text-[var(--color-cyan)]">Privacy</div>
          <div>
            We collect data only when you submit a form (name, email, company, objective, and other fields you provide).
          </div>
          <div>We may send your submission to your chosen CRM/automation tools via webhooks.</div>
          <div>Analytics/marketing scripts should only run after consent.</div>
        </div>
      </section>

      <section className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6">
        <div className="space-y-3 text-sm leading-6 text-[var(--color-slate)]">
          <div className="text-sm font-semibold tracking-wide text-[var(--color-cyan)]">Terms</div>
          <div>No CRM, WhatsApp system, email sending, or AI logic is implemented on this site.</div>
          <div>The website is intended as an integration hub and forwards form submissions via webhooks.</div>
        </div>
      </section>
    </div>
  );
}
