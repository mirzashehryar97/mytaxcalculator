import { CheckCircle2, Equal, Info, TrendingDown, TrendingUp, Wallet } from 'lucide-react';

import { SALARY_COMPARISON_RESULT_COPY } from '@/features/salary-increment/lib/content';
import { formatPkr } from '@/features/salary-increment/lib/formatting';
import {
  buildSalaryComparisonPresentation,
  type ComparisonDirection,
} from '@/features/salary-increment/lib/presentation';
import { SALARY_COMPARISON_SUMMARY_STYLES } from '@/features/salary-increment/lib/presentationStyles';
import type { SalaryComparison } from '@/features/salary-increment/types';

const SUMMARY_ICONS: Record<
  ComparisonDirection,
  { badge: typeof CheckCircle2; trend: typeof TrendingUp }
> = {
  increase: { badge: CheckCircle2, trend: TrendingUp },
  decrease: { badge: Info, trend: TrendingDown },
  same: { badge: Equal, trend: Equal },
};

interface ComparisonSummaryProps {
  comparison: SalaryComparison;
}

export default function ComparisonSummary({ comparison }: ComparisonSummaryProps) {
  const presentation = buildSalaryComparisonPresentation(comparison);
  const isSame = presentation.variant === 'same';
  const variant = SALARY_COMPARISON_SUMMARY_STYLES[presentation.variant];
  const icons = SUMMARY_ICONS[presentation.variant];
  const TrendIcon = icons.trend;
  const BadgeIcon = icons.badge;

  const badge = (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-semibold text-xs ${variant.badge}`}
    >
      <BadgeIcon aria-hidden className="h-3.5 w-3.5" strokeWidth={2.5} />
      {presentation.badgeLabel}
    </span>
  );

  return (
    <aside className={`overflow-hidden rounded-2xl border ${variant.container}`}>
      <div className="flex flex-col sm:flex-row sm:items-center">
        <div className="flex min-w-0 flex-1 flex-col gap-2.5 p-4 sm:flex-row sm:items-center sm:gap-4 sm:p-5">
          <div className="flex justify-center sm:hidden">{badge}</div>

          <div className="flex min-w-0 items-start gap-3 sm:items-center sm:gap-4">
            <div
              aria-hidden
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full sm:h-12 sm:w-12 ${variant.icon}`}
            >
              <TrendIcon className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2.5} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="mb-1.5 hidden sm:block">{badge}</p>
              <p className="amount-wrap font-bold text-gray-900 text-lg leading-snug max-[400px]:text-sm sm:text-xl">
                {presentation.grossLead}
                {presentation.grossAmount === null ? null : (
                  <>
                    {' '}
                    <span className={`amount-wrap tabular-nums ${variant.amount}`}>
                      {formatPkr(presentation.grossAmount)}
                    </span>
                  </>
                )}
              </p>
              <p className="amount-wrap mt-1 text-gray-600 text-sm sm:text-base">
                {presentation.takeHomeLead}
                {presentation.takeHomeMonthlyAmount === null ? null : (
                  <>
                    {' '}
                    <span className={`amount-wrap font-semibold tabular-nums ${variant.amount}`}>
                      {formatPkr(presentation.takeHomeMonthlyAmount)}
                    </span>
                  </>
                )}{' '}
                {SALARY_COMPARISON_RESULT_COPY.afterTax}
              </p>
            </div>
          </div>
        </div>

        {isSame ? null : (
          <>
            <div aria-hidden className={`mx-4 h-px shrink-0 sm:mx-0 sm:h-14 ${variant.divider}`} />

            <div className="flex min-w-0 items-center justify-center gap-3 p-4 sm:max-w-[50%] sm:flex-none sm:justify-end sm:gap-5 sm:px-5 sm:py-4">
              <div className="min-w-0 text-center">
                <p className="text-left text-base text-gray-500 max-[400px]:text-sm sm:hidden">
                  That&apos;s{' '}
                  <span className={`amount-wrap font-semibold tabular-nums ${variant.amount}`}>
                    {formatPkr(presentation.takeHomeAnnualAmount)}
                  </span>{' '}
                  <span className="whitespace-nowrap">{presentation.annualSuffix}</span>
                </p>

                <div className="hidden sm:block">
                  <p className="text-gray-400 text-xs">That&apos;s</p>
                  <p className={`amount-wrap font-semibold text-xl tabular-nums ${variant.amount}`}>
                    {formatPkr(presentation.takeHomeAnnualAmount)}
                  </p>
                  <p className="text-gray-400 text-xs">{presentation.annualSuffix}</p>
                </div>
              </div>

              <div
                aria-hidden
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ring-1 sm:h-12 sm:w-12 ${variant.wallet}`}
              >
                <Wallet className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2} />
              </div>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
