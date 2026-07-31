import { BarChart3 } from 'lucide-react';

import type { CorporateYearRow } from '@/features/corporate-tax/lib/presentation';

interface CorporateYearComparisonProps {
  title: string;
  description: string;
  rows: readonly CorporateYearRow[];
}

/** Same figure charged under each tax year we cover, as a bar per year. */
export default function CorporateYearComparison({
  title,
  description,
  rows,
}: CorporateYearComparisonProps) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
      <div className="flex items-center gap-2">
        <BarChart3 className="h-5 w-5 text-emerald-600" aria-hidden="true" />
        <h3 className="font-bold text-gray-900 text-lg">{title}</h3>
      </div>
      <p className="mt-1.5 text-gray-500 text-sm leading-relaxed">{description}</p>

      <ul className="mt-5 space-y-3">
        {rows.map((row) => (
          <li key={row.fiscalYear} className="flex items-center gap-3">
            <span className="w-16 shrink-0 font-semibold text-gray-500 text-xs tabular-nums">
              {row.label}
            </span>
            <span className="relative h-7 min-w-0 flex-1 overflow-hidden rounded-lg bg-gray-100">
              <span
                className="absolute inset-y-0 left-0 rounded-lg bg-gradient-to-r from-red-500 to-rose-500 transition-all duration-300"
                style={{ width: `${Math.max(row.share * 100, row.tax > 0 ? 4 : 0)}%` }}
              />
            </span>
            <span className="amount-wrap w-28 shrink-0 text-right font-bold text-red-600 text-sm tabular-nums">
              {row.formattedTax}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
