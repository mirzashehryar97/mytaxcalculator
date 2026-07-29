import { WalletCards } from 'lucide-react';

import InfoTooltip from '@/components/ui/InfoTooltip';

import {
  formatCompactPkr,
  formatPkr,
  getFiscalComparisonPeriodAmount,
  getFiscalComparisonSecondaryAmount,
} from '@/features/salary-tax/lib/insights';
import {
  MARGINAL_RATE_TOOLTIP,
  SALARY_INSIGHT_PERIOD_COPY,
} from '@/features/salary-tax/lib/insightsContent';
import type {
  FiscalComparisonSummary as FiscalComparisonSummaryData,
  SalaryInsightPeriod,
  SalaryTaxResult,
} from '@/features/salary-tax/types';

interface FiscalComparisonSummaryProps {
  activeBandLabel: string;
  marginalRate: number;
  period: SalaryInsightPeriod;
  result: SalaryTaxResult;
  summary: FiscalComparisonSummaryData | null;
}

const OUTCOME_CONTENT = {
  save: {
    eyebrow: 'Your saving',
    phrase: 'less tax than',
    tone: 'text-emerald-700',
  },
  'pay-more': {
    eyebrow: 'Tax difference',
    phrase: 'more tax than',
    tone: 'text-red-600',
  },
  same: {
    eyebrow: 'No difference',
    phrase: 'change from',
    tone: 'text-gray-700',
  },
} as const;

export default function FiscalComparisonSummary({
  activeBandLabel,
  marginalRate,
  period,
  result,
  summary,
}: FiscalComparisonSummaryProps) {
  const content = summary ? OUTCOME_CONTENT[summary.outcome] : OUTCOME_CONTENT.same;
  const periodCopy = SALARY_INSIGHT_PERIOD_COPY[period];
  const difference = summary
    ? getFiscalComparisonPeriodAmount(summary.annualDifference, period)
    : 0;
  const secondaryDifference = summary ? getFiscalComparisonSecondaryAmount(summary, period) : 0;
  const takeHome = getFiscalComparisonPeriodAmount(result.yearlyIncomeAfterTax, period);

  return (
    <aside className="rounded-xl border border-emerald-100 bg-gradient-to-br from-emerald-50/80 to-white p-4 sm:p-5">
      <p className="font-bold text-emerald-700 text-xs uppercase tracking-wider">
        {content.eyebrow}
      </p>

      <div className="mt-4 flex items-start gap-2">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <WalletCards aria-hidden className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p
            className={`whitespace-nowrap font-bold text-lg tabular-nums sm:text-xl ${content.tone}`}
          >
            {formatCompactPkr(difference)}
            <span className="ml-1 text-xs sm:text-sm">{periodCopy.headlineSuffix}</span>
          </p>
          {summary && (
            <p className="mt-0.5 text-gray-700 text-sm">
              {content.phrase} {summary.comparisonYearLabel}
            </p>
          )}
          {summary && summary.outcome !== 'same' && (
            <p className="mt-2 text-gray-500 text-xs">
              {formatPkr(secondaryDifference)} {summary.outcome === 'save' ? 'more' : 'less'}{' '}
              take-home each {periodCopy.secondaryPeriod}
            </p>
          )}
        </div>
      </div>

      <dl className="mt-5 divide-y divide-gray-200 border-gray-200 border-t text-sm">
        <div className="flex items-center justify-between gap-4 py-3">
          <dt className="inline-flex items-center gap-1.5 text-gray-600">
            Marginal rate
            <InfoTooltip label={MARGINAL_RATE_TOOLTIP.label} text={MARGINAL_RATE_TOOLTIP.text} />
          </dt>
          <dd className="font-bold text-emerald-700 tabular-nums">{marginalRate}%</dd>
        </div>
        <div className="flex items-center justify-between gap-4 py-3">
          <dt className="text-gray-600">Active band</dt>
          <dd className="max-w-[8rem] text-right font-semibold text-emerald-700 text-xs">
            {activeBandLabel}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4 py-3">
          <dt className="text-gray-600">{periodCopy.takeHomeLabel}</dt>
          <dd className="text-right font-bold text-emerald-700 tabular-nums">
            {formatCompactPkr(takeHome)}
          </dd>
        </div>
      </dl>
    </aside>
  );
}
