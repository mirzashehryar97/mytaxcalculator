import { PROPERTY_SECTION_COPY } from '@/features/property-tax/lib/content';
import { buildPropertyYearComparison } from '@/features/property-tax/lib/presentation';
import type { PropertyFilerStatus, PropertyFiscalYear } from '@/features/property-tax/types';

interface PropertyYearComparisonProps {
  mode: 'purchase' | 'sale';
  taxBase: number;
  status: PropertyFilerStatus;
  selectedYear: PropertyFiscalYear;
}

/** The same transaction priced under every year we cover. */
export default function PropertyYearComparison({
  mode,
  taxBase,
  status,
  selectedYear,
}: PropertyYearComparisonProps) {
  if (taxBase <= 0) {
    return null;
  }

  const rows = buildPropertyYearComparison(mode, taxBase, status);

  return (
    <section aria-labelledby="property-year-comparison-heading">
      <h3 id="property-year-comparison-heading" className="font-bold text-gray-900 text-lg">
        {PROPERTY_SECTION_COPY.yearComparisonTitle}
      </h3>
      <p className="mt-1 text-gray-500 text-sm leading-relaxed">
        {PROPERTY_SECTION_COPY.yearComparisonDescription}
      </p>

      <ul className="mt-4 space-y-3">
        {rows.map((row) => {
          const active = row.fiscalYear === selectedYear;

          return (
            <li key={row.fiscalYear} className="min-w-0">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                <span
                  className={`font-semibold text-sm ${active ? 'text-emerald-700' : 'text-gray-600'}`}
                >
                  {row.label}
                  <span className="ml-2 font-normal text-gray-400 text-xs tabular-nums">
                    {row.formattedRate}
                  </span>
                </span>
                <span
                  className={`amount-wrap font-bold text-sm tabular-nums ${
                    active ? 'text-emerald-700' : 'text-gray-700'
                  }`}
                >
                  {row.formattedTax}
                </span>
              </div>
              <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  className={`h-full rounded-full ${active ? 'bg-emerald-600' : 'bg-gray-300'}`}
                  style={{ width: `${Math.max(row.share * 100, 2)}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
