import SectionBand from "@/components/SectionBand";
export default async function AuditThanksPage() {
  return (
    <div className="space-y-10">
      <SectionBand tone="accent">
        <div className="space-y-4">
          <h1 className="max-w-4xl font-[var(--font-display)] text-4xl font-semibold tracking-tight text-[var(--ds-text)] sm:text-5xl">
            Thank you
          </h1>
          <p className="max-w-3xl text-sm leading-6 text-[var(--ds-muted)]">
            Your request has been received. We’ll get back to you within 1 week.
          </p>
          <p className="text-xs leading-5 text-[var(--ds-muted)]">You can close this page now.</p>
        </div>
      </SectionBand>
    </div>
  );
}
