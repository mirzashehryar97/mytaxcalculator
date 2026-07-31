import { Info } from 'lucide-react';

import { CORPORATE_GUIDE_COPY } from '@/features/corporate-tax/lib/content';
import {
  CORPORATE_RATE_ROWS,
  CORPORATE_SECTION_COPY,
} from '@/features/corporate-tax/lib/modeContent';
import type { CorporateMode } from '@/features/corporate-tax/types';

interface CorporateRateGuideProps {
  mode: CorporateMode;
}

export default function CorporateRateGuide({ mode }: CorporateRateGuideProps) {
  const copy = CORPORATE_SECTION_COPY[mode];
  const rows = CORPORATE_RATE_ROWS[mode];

  return (
    <section
      id="corporate-rate-table"
      className="mt-12 scroll-mt-24 rounded-3xl border border-white/70 bg-white/95 p-5 shadow-emerald-950/10 shadow-xl sm:mt-16 sm:p-8"
      aria-labelledby="corporate-rate-guide-heading"
    >
      <h2
        id="corporate-rate-guide-heading"
        className="font-bold text-gray-900 text-xl tracking-tight sm:text-2xl"
      >
        {copy.rateTitle}
      </h2>
      <p className="mt-3 max-w-4xl text-gray-600 leading-relaxed">{copy.rateDescription}</p>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-gray-200">
        <table className="w-full min-w-[560px] text-left text-sm">
          <caption className="sr-only">{copy.rateTitle}</caption>
          <thead>
            <tr className="bg-emerald-50 text-emerald-950">
              <th scope="col" className="px-4 py-3 font-semibold">
                {CORPORATE_GUIDE_COPY.subjectColumn}
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                {CORPORATE_GUIDE_COPY.rateColumn}
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                {CORPORATE_GUIDE_COPY.noteColumn}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((row) => (
              <tr key={row.id} className="even:bg-gray-50/70">
                <td className="px-4 py-3 font-medium text-gray-900">{row.subject}</td>
                <td className="px-4 py-3 font-bold text-emerald-700">{row.rate}</td>
                <td className="px-4 py-3 text-gray-600">{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 flex items-start gap-2 text-gray-500 text-sm leading-relaxed">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" aria-hidden="true" />
        <span>{copy.rateNote}</span>
      </p>
    </section>
  );
}
