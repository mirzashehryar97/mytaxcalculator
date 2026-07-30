import { TrendingDown } from 'lucide-react';

import { PROPERTY_RESULT_COPY } from '@/features/property-tax/lib/content';
import { formatPercent, formatPkr } from '@/features/property-tax/lib/formatting';
import type { PropertyTransferResult } from '@/features/property-tax/types';

interface PropertyFilerComparisonProps {
  result: PropertyTransferResult;
}

/**
 * What the same transfer costs off the Active Taxpayer List. Property is where
 * the filer gap is widest, so this is the page's strongest argument for filing.
 */
export default function PropertyFilerComparison({ result }: PropertyFilerComparisonProps) {
  if (result.status === 'non-filer' || result.filerSaving <= 0) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
      <p className="font-semibold text-gray-700 text-sm">
        {PROPERTY_RESULT_COPY.nonFilerComparisonTitle}
      </p>

      <div className="mt-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <span className="font-bold text-2xl text-gray-900 tabular-nums">
          {formatPercent(result.nonFilerRate)}
        </span>
        <span className="amount-wrap font-bold text-lg text-red-600 tabular-nums">
          {formatPkr(result.nonFilerTax)}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
        <span className="flex items-center gap-2 font-semibold text-emerald-800 text-sm">
          <TrendingDown className="h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
          {PROPERTY_RESULT_COPY.filerSavingLabel}
        </span>
        <span className="amount-wrap font-bold text-emerald-700 text-lg tabular-nums">
          {formatPkr(result.filerSaving)}
        </span>
      </div>
    </div>
  );
}
