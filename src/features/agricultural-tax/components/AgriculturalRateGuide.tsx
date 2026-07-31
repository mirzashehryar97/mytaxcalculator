import { Info } from 'lucide-react';

import {
  AGRICULTURAL_GUIDE_COPY,
  AGRICULTURAL_PAGE_COPY,
} from '@/features/agricultural-tax/lib/content';
import { buildSlabRows } from '@/features/agricultural-tax/lib/presentation';

export default function AgriculturalRateGuide() {
  const rows = buildSlabRows();

  return (
    <section
      id="agricultural-rate-table"
      className="mt-12 scroll-mt-24 rounded-3xl border border-white/70 bg-white/95 p-5 shadow-emerald-950/10 shadow-xl sm:mt-16 sm:p-8"
      aria-labelledby="agricultural-rate-guide-heading"
    >
      <h2
        id="agricultural-rate-guide-heading"
        className="font-bold text-gray-900 text-xl tracking-tight sm:text-2xl"
      >
        {AGRICULTURAL_GUIDE_COPY.rateTitle}
      </h2>
      <p className="mt-3 max-w-4xl text-gray-600 leading-relaxed">
        {AGRICULTURAL_GUIDE_COPY.rateDescription}
      </p>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-gray-200">
        <table className="w-full min-w-[480px] text-left text-sm">
          <caption className="sr-only">{AGRICULTURAL_PAGE_COPY.title} rate table</caption>
          <thead>
            <tr className="bg-emerald-50 text-emerald-950">
              <th scope="col" className="px-4 py-3 font-semibold">
                {AGRICULTURAL_GUIDE_COPY.bandColumn}
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                {AGRICULTURAL_GUIDE_COPY.rateColumn}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((row) => (
              <tr key={row.id} className="even:bg-gray-50/70">
                <td className="px-4 py-3 font-medium text-gray-900">{row.band}</td>
                <td className="px-4 py-3 font-bold text-emerald-700">{row.rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 flex items-start gap-2 text-gray-500 text-sm leading-relaxed">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" aria-hidden="true" />
        <span>{AGRICULTURAL_GUIDE_COPY.rateNote}</span>
      </p>
    </section>
  );
}
