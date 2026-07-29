import { FileText, Info } from 'lucide-react';

import InfoTooltip from '@/components/ui/InfoTooltip';

import { RENTAL_DEDUCTIONS_COPY, RENTAL_TERMS } from '@/features/rental-income-tax/lib/content';

/** The costs a landlord can take off the rent at return time (Section 15A). */
export default function RentalDeductions() {
  return (
    <section
      className="h-full rounded-3xl border border-white/70 bg-white/95 p-5 shadow-emerald-950/10 shadow-xl sm:p-6"
      aria-labelledby="rental-deductions-heading"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-sm">
          <FileText className="h-5 w-5" aria-hidden="true" />
        </span>
        <h2 id="rental-deductions-heading" className="font-bold text-gray-900 text-lg">
          {RENTAL_DEDUCTIONS_COPY.title}
        </h2>
        <InfoTooltip
          label={RENTAL_TERMS.repairAllowance.label}
          text={RENTAL_TERMS.repairAllowance.text}
        />
      </div>

      <p className="mt-3 text-gray-600 text-sm leading-relaxed">{RENTAL_DEDUCTIONS_COPY.intro}</p>

      <ul className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {RENTAL_DEDUCTIONS_COPY.items.map((item) => (
          <li key={item.id} className="flex gap-2 text-gray-600 text-sm leading-relaxed">
            <span
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500"
              aria-hidden="true"
            />
            <span>{item.text}</span>
          </li>
        ))}
      </ul>

      <p className="mt-5 flex gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4 text-blue-950 text-sm leading-relaxed">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" aria-hidden="true" />
        <span>{RENTAL_DEDUCTIONS_COPY.note}</span>
      </p>
    </section>
  );
}
