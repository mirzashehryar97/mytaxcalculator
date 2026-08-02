import { Layers3 } from 'lucide-react';

import { formatCompactPkr } from '@/features/salary-tax/lib/insights';
import type { TaxBandInsights } from '@/features/salary-tax/types';

interface ActiveTaxBandCardProps {
  insights: TaxBandInsights;
}

export default function ActiveTaxBandCard({ insights }: ActiveTaxBandCardProps) {
  return (
    <aside className="rounded-xl border border-emerald-100 bg-gradient-to-br from-emerald-50/80 to-white p-4 sm:p-5">
      <p className="font-bold text-emerald-700 text-xs uppercase tracking-wider">
        Your active band
      </p>

      <div className="mt-4 flex items-start gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <Layers3 aria-hidden className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p className="font-bold text-3xl text-emerald-700 tabular-nums">{insights.activeRate}%</p>
          <p className="font-semibold text-gray-800 text-sm">Marginal tax rate</p>
          <p className="mt-1 text-gray-500 text-xs">Applies only to income in this band</p>
        </div>
      </div>

      <p className="mt-4 rounded-lg bg-white/80 p-3 text-gray-600 text-xs leading-relaxed ring-1 ring-emerald-100">
        Your whole salary is not taxed at {insights.activeRate}%. Each portion is taxed at its own
        band rate.
      </p>

      <dl className="mt-4 divide-y divide-gray-200 border-gray-200 border-t text-sm">
        <div className="flex items-center justify-between gap-4 py-3">
          <dt className="text-gray-600">Active band</dt>
          <dd className="max-w-[8rem] text-right font-semibold text-emerald-700 text-xs">
            {insights.activeBandLabel}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4 py-3">
          <dt className="text-gray-600">Effective tax rate</dt>
          <dd className="font-bold text-emerald-700 tabular-nums">
            {insights.effectiveRate.toFixed(2)}%
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4 py-3">
          <dt className="text-gray-600">Annual taxable income</dt>
          <dd className="font-semibold text-gray-800 tabular-nums">
            {formatCompactPkr(insights.annualIncome)}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4 py-3">
          <dt className="text-gray-600">{insights.periodLabel} tax</dt>
          <dd className="font-bold text-red-600 tabular-nums">
            {formatCompactPkr(insights.totalTax)}
          </dd>
        </div>
      </dl>
    </aside>
  );
}
