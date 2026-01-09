import Link from "next/link";
import Bilingual from "@/components/Bilingual";

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <div className="text-sm font-semibold tracking-wide text-[var(--color-cyan)]">
          <Bilingual en="Thank you" it="Grazie" />
        </div>
        <h1 className="max-w-3xl font-[var(--font-display)] text-4xl font-semibold tracking-tight text-[var(--color-navy)] sm:text-5xl">
          <Bilingual en="We received your request." it="Abbiamo ricevuto il tuo messaggio." />
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-[var(--color-slate)]">
          <Bilingual
            en="Next step: we’ll review it and reply with a clear recommendation."
            it="Prossimo step: lo leggiamo e ti rispondiamo con una raccomandazione chiara."
          />
        </p>
      </header>

      <section className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6">
        <div className="space-y-3 text-sm text-[var(--color-slate)]">
          <div>
            <Bilingual en="Typical response time: 24–48 hours." it="Tempo di risposta tipico: 24–48 ore." />
          </div>
          <div>
            <Bilingual
              en="If you need something urgent, use the chat widget to reach a human."
              it="Se hai urgenza, usa il widget chat per parlare con una persona."
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex w-fit rounded-full bg-[var(--color-blue)] px-5 py-3 text-sm font-semibold text-white hover:opacity-95"
            data-cta="thankyou_home"
          >
            <Bilingual en="Back to home" it="Torna alla home" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex w-fit rounded-full border border-[var(--color-navy)]/15 px-5 py-3 text-sm font-semibold text-[var(--color-navy)] hover:border-[var(--color-navy)]/25 hover:bg-[var(--color-navy)]/[0.03]"
            data-cta="thankyou_contact"
          >
            <Bilingual en="Contact" it="Contatti" />
          </Link>
        </div>
      </section>
    </div>
  );
}
