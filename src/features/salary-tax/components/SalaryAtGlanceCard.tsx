import { WalletCards } from 'lucide-react';

import InfoTooltip from '@/components/ui/InfoTooltip';

import { formatCompactPkr, formatPkr } from '@/features/salary-tax/lib/insights';
import { MARGINAL_RATE_TOOLTIP } from '@/features/salary-tax/lib/insightsContent';
import type { SalaryPeriodBreakdown } from '@/features/salary-tax/types';

interface SalaryAtGlanceCardProps {
  annualTax: number;
  breakdown: SalaryPeriodBreakdown;
  marginalRate: number;
}

export default function SalaryAtGlanceCard({
  annualTax,
  breakdown,
  marginalRate,
}: SalaryAtGlanceCardProps) {
  return (
    <aside className="rounded-xl border border-emerald-100 bg-gradient-to-br from-emerald-50/80 to-white p-4 sm:p-5">
      <p className="font-bold text-emerald-700 text-xs uppercase tracking-wider">At a glance</p>
      <div className="mt-4 flex items-start gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <WalletCards aria-hidden className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p className="amount-wrap font-bold text-emerald-700 text-xl tabular-nums sm:text-2xl">
            {formatPkr(breakdown.net)}
          </p>
          <p className="font-semibold text-gray-700 text-sm">{breakdown.periodLabel} take-home</p>
          <p className="mt-1 text-gray-500 text-xs">
            {formatCompactPkr(breakdown.secondaryNet)} {breakdown.secondaryPeriodLabel}
          </p>
        </div>
      </div>

      <dl className="mt-5 divide-y divide-gray-200 border-gray-200 border-t text-sm">
        <div className="flex items-center justify-between gap-4 py-3">
          <dt className="text-gray-600">{breakdown.periodLabel} tax</dt>
          <dd className="amount-wrap text-right font-bold text-red-600 tabular-nums">
            {formatPkr(breakdown.tax)}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4 py-3">
          <dt className="text-gray-600">Annual tax</dt>
          <dd className="font-bold text-red-600 tabular-nums">{formatCompactPkr(annualTax)}</dd>
        </div>
        <div className="flex items-center justify-between gap-4 py-3">
          <dt className="inline-flex items-center gap-1.5 text-gray-600">
            Marginal rate
            <InfoTooltip label={MARGINAL_RATE_TOOLTIP.label} text={MARGINAL_RATE_TOOLTIP.text} />
          </dt>
          <dd className="font-bold text-emerald-700 tabular-nums">{marginalRate}%</dd>
        </div>
      </dl>
    </aside>
  );
}
