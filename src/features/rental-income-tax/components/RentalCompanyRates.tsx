import { Building2, Info } from 'lucide-react';

import { RENTAL_GUIDE_COPY } from '@/features/rental-income-tax/lib/content';
import { formatPercent } from '@/features/rental-income-tax/lib/formatting';
import { RENTAL_RATES } from '@/features/rental-income-tax/lib/rates';

const CURRENT_YEAR_RATES = RENTAL_RATES['2026-2027'];

export default function RentalCompanyRates() {
  return (
    <section
      className="mt-6 rounded-3xl border border-white/70 bg-white/95 p-5 shadow-emerald-950/10 shadow-xl sm:p-8"
      aria-labelledby="rental-company-rates-heading"
    >
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-sm">
          <Building2 className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <h2
            id="rental-company-rates-heading"
            className="font-bold text-gray-900 text-xl tracking-tight sm:text-2xl"
          >
            {RENTAL_GUIDE_COPY.companyTitle}
          </h2>
          <p className="mt-3 max-w-3xl text-gray-600 leading-relaxed">
            {RENTAL_GUIDE_COPY.companyDescription}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center">
          <p className="font-bold text-4xl text-emerald-700 tabular-nums">
            {formatPercent(CURRENT_YEAR_RATES.companyFilerRate)}
          </p>
          <p className="mt-1 font-semibold text-emerald-800 text-sm">
            {RENTAL_GUIDE_COPY.companyFilerLabel}
          </p>
        </div>
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-center">
          <p className="font-bold text-4xl text-red-600 tabular-nums">
            {formatPercent(CURRENT_YEAR_RATES.companyNonFilerRate)}
          </p>
          <p className="mt-1 font-semibold text-red-700 text-sm">
            {RENTAL_GUIDE_COPY.companyNonFilerLabel}
          </p>
        </div>
      </div>

      <p className="mt-4 flex items-start gap-2 text-gray-500 text-sm leading-relaxed">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
        <span>{RENTAL_GUIDE_COPY.companyNote}</span>
      </p>
    </section>
  );
}
