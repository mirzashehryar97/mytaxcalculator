import { CheckCircle2, FileText, Receipt } from 'lucide-react';

import { RENTAL_ADJUSTABLE_COPY } from '@/features/rental-income-tax/lib/content';

/** Explains that the deducted tax is a credit, not the landlord's final bill. */
export default function RentalAdjustableNote() {
  return (
    <section
      className="h-full rounded-3xl border border-white/70 bg-white/95 p-5 shadow-emerald-950/10 shadow-xl sm:p-6"
      aria-labelledby="rental-adjustable-heading"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-sm">
          <Receipt className="h-5 w-5" aria-hidden="true" />
        </span>
        <h2 id="rental-adjustable-heading" className="font-bold text-gray-900 text-lg">
          {RENTAL_ADJUSTABLE_COPY.title}
        </h2>
      </div>

      <ul className="mt-5 space-y-3">
        {RENTAL_ADJUSTABLE_COPY.points.map((point) => (
          <li key={point} className="flex gap-3 text-gray-600 text-sm leading-relaxed">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
            <span>{point}</span>
          </li>
        ))}
      </ul>

      <p className="mt-5 flex gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900 text-sm leading-relaxed">
        <FileText className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
        <span>{RENTAL_ADJUSTABLE_COPY.note}</span>
      </p>
    </section>
  );
}
