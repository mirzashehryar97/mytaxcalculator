import { Info } from 'lucide-react';

import { PROPERTY_SECTION_COPY } from '@/features/property-tax/lib/content';
import { formatPropertyFiscalYear } from '@/features/property-tax/lib/formatting';
import {
  buildPropertyRateGuideRows,
  getPropertySectionLabel,
} from '@/features/property-tax/lib/presentation';
import type { PropertyFiscalYear } from '@/features/property-tax/types';

interface PropertyRateGuideProps {
  mode: 'purchase' | 'sale';
  fiscalYear: PropertyFiscalYear;
}

/**
 * The selected year's rate table. Rebuilt from the same data the maths reads, so
 * the published table cannot drift away from what the calculator charges.
 */
export default function PropertyRateGuide({ mode, fiscalYear }: PropertyRateGuideProps) {
  const rows = buildPropertyRateGuideRows(mode, fiscalYear);
  const showLateFiler = rows.some((row) => row.lateFilerRate !== '—');

  return (
    <section aria-labelledby="property-rate-guide-heading">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 id="property-rate-guide-heading" className="font-bold text-gray-900 text-lg">
          {PROPERTY_SECTION_COPY.rateGuideTitle}
        </h3>
        <span className="font-semibold text-emerald-700 text-sm">
          {getPropertySectionLabel(mode)} · {formatPropertyFiscalYear(fiscalYear)}
        </span>
      </div>
      <p className="mt-1 text-gray-500 text-sm leading-relaxed">
        {PROPERTY_SECTION_COPY.rateGuideDescription}
      </p>

      <div className="mt-4 overflow-x-auto rounded-2xl border border-gray-200">
        <table className="w-full min-w-[30rem] border-collapse text-left text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3 font-semibold text-gray-700">
                Property value
              </th>
              <th scope="col" className="px-4 py-3 text-right font-semibold text-gray-700">
                Filer
              </th>
              {showLateFiler ? (
                <th scope="col" className="px-4 py-3 text-right font-semibold text-gray-700">
                  Late filer
                </th>
              ) : null}
              <th scope="col" className="px-4 py-3 text-right font-semibold text-gray-700">
                Non-filer
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-gray-100 border-t">
                <th scope="row" className="px-4 py-3 font-medium text-gray-700">
                  {row.band}
                </th>
                <td className="px-4 py-3 text-right font-semibold text-emerald-700 tabular-nums">
                  {row.filerRate}
                </td>
                {showLateFiler ? (
                  <td className="px-4 py-3 text-right font-semibold text-amber-600 tabular-nums">
                    {row.lateFilerRate}
                  </td>
                ) : null}
                <td className="px-4 py-3 text-right font-semibold text-red-600 tabular-nums">
                  {row.nonFilerRate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showLateFiler ? null : (
        <p className="mt-3 flex gap-2 text-gray-500 text-xs leading-relaxed">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" aria-hidden="true" />
          This year has no late-filer tier — it only existed for 2024-25 and 2025-26.
        </p>
      )}
    </section>
  );
}
