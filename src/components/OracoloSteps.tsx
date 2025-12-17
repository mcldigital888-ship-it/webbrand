import Link from "next/link";

export default function OracoloSteps() {
  const steps = [
    {
      en: "Answer a few guided questions",
      it: "Rispondi a poche domande guidate",
    },
    {
      en: "We organize your inputs into a brief",
      it: "Organizziamo i tuoi input in un brief",
    },
    {
      en: "You receive recommended next steps",
      it: "Ricevi i prossimi step consigliati",
    },
    {
      en: "Optional technical call",
      it: "Call tecnica opzionale",
    },
  ];

  return (
    <section className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-3">
          <div className="text-sm font-semibold tracking-wide text-[var(--color-cyan)]">
            Oracolo
          </div>
          <h2 className="font-[var(--font-display)] text-2xl font-semibold text-[var(--color-navy)]">
            Scegli il tuo obiettivo
            <br />
            Choose your goal
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-[var(--color-slate)]">
            {steps.map((s) => (
              <li key={s.en} className="flex gap-2">
                <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-cyan)]" />
                <span>
                  {s.it}
                  <br />
                  {s.en}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/oracolo"
            className="inline-flex w-fit rounded-full bg-[var(--color-blue)] px-5 py-3 text-sm font-semibold text-white hover:opacity-95"
          >
            Avvia Oracolo
            <br />
            Start Oracolo
          </Link>
          <Link
            href="/contact"
            className="inline-flex w-fit rounded-full border border-[var(--color-navy)]/15 px-5 py-3 text-sm font-semibold text-[var(--color-navy)] hover:border-[var(--color-navy)]/25 hover:bg-[var(--color-navy)]/[0.03]"
          >
            Richiedi una call
            <br />
            Request a call
          </Link>
        </div>
      </div>
    </section>
  );
}
