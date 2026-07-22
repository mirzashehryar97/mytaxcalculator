'use client';

import { type ReactNode, useState } from 'react';

import type { LucideIcon } from 'lucide-react';
import { Check, ChevronDown, Equal, Info, TrendingDown, TrendingUp, Wallet } from 'lucide-react';

import {
  type BudgetYearComparison,
  comparableFiscalYears,
  compareWithFiscalYear,
  getPreviousFiscalYear,
} from '@/lib/budgetComparison';

interface SingleYearBudgetSavingsNoteProps {
  monthlySalary: number;
  selectedYear: string;
}

function formatAmount(value: number) {
  return `Rs. ${value.toLocaleString('en-PK')}`;
}

function formatFyLabel(fiscalYear: string) {
  const [start, end] = fiscalYear.split('-');
  return `FY ${start}-${end?.slice(-2) ?? end}`;
}

interface VariantConfig {
  ariaLabel: (monthly: number, annual: number, previousYear: string) => string;
  containerClass: string;
  dividerClass: string;
  icon: LucideIcon;
  iconClass: string;
  badgeIcon: LucideIcon;
  badgeClass: string;
  badgeText: string;
  amountClass: string;
  walletClass: string;
  headline: (amount: string, amountClass: string) => ReactNode;
}

const VARIANTS: Record<BudgetYearComparison['type'], VariantConfig> = {
  save: {
    ariaLabel: (monthly, annual, previousYear) =>
      `You save ${formatAmount(monthly)} per month, ${formatAmount(annual)} per year, compared with ${formatFyLabel(previousYear)}`,
    containerClass:
      'border-emerald-200 bg-gradient-to-br from-emerald-100/90 via-emerald-50/60 to-white sm:bg-gradient-to-r',
    dividerClass: 'bg-gray-200 sm:w-px',
    icon: TrendingUp,
    iconClass: 'bg-emerald-600 text-white',
    badgeIcon: Check,
    badgeClass: 'bg-emerald-100 text-emerald-800',
    badgeText: 'Great news!',
    amountClass: 'text-emerald-700',
    walletClass: 'bg-emerald-100/80 ring-emerald-200/60 text-emerald-700',
    headline: (amount, amountClass) => (
      <>
        You save{' '}
        <span
          className={`inline font-semibold text-xl tabular-nums max-[400px]:text-sm sm:text-2xl ${amountClass}`}
        >
          {amount}
        </span>{' '}
        per month
      </>
    ),
  },
  'pay-more': {
    ariaLabel: (monthly, annual, previousYear) =>
      `You pay ${formatAmount(monthly)} more per month, ${formatAmount(annual)} more per year, compared with ${formatFyLabel(previousYear)}`,
    containerClass:
      'border-rose-200 bg-gradient-to-br from-rose-100/90 via-rose-50/60 to-white sm:bg-gradient-to-r',
    dividerClass: 'bg-rose-200 sm:bg-transparent sm:border-l sm:border-dashed sm:border-rose-300',
    icon: TrendingDown,
    iconClass: 'bg-white text-rose-600 ring-1 ring-rose-200',
    badgeIcon: Info,
    badgeClass: 'bg-rose-100 text-rose-800',
    badgeText: 'Heads up',
    amountClass: 'text-rose-600',
    walletClass: 'bg-rose-100/80 ring-rose-200/60 text-rose-600',
    headline: (amount, amountClass) => (
      <>
        You pay{' '}
        <span
          className={`inline font-semibold text-xl tabular-nums max-[400px]:text-sm sm:text-2xl ${amountClass}`}
        >
          {amount}
        </span>{' '}
        more per month
      </>
    ),
  },
  same: {
    ariaLabel: (_monthly, _annual, previousYear) =>
      `Your salary tax is unchanged compared with ${formatFyLabel(previousYear)}`,
    containerClass:
      'border-slate-200 bg-gradient-to-br from-slate-100/90 via-slate-50/60 to-white sm:bg-gradient-to-r',
    dividerClass: 'bg-gray-200 sm:w-px',
    icon: Equal,
    iconClass: 'bg-slate-500 text-white',
    badgeIcon: Equal,
    badgeClass: 'bg-slate-200 text-slate-700',
    badgeText: 'No change',
    amountClass: 'text-slate-700',
    walletClass: 'bg-slate-100/80 ring-slate-200/60 text-slate-700',
    headline: () => <>Your salary tax is unchanged</>,
  },
};

export default function SingleYearBudgetSavingsNote({
  monthlySalary,
  selectedYear,
}: SingleYearBudgetSavingsNoteProps) {
  const comparisonOptions = comparableFiscalYears(selectedYear);
  const [comparisonYear, setComparisonYear] = useState(
    () => getPreviousFiscalYear(selectedYear) ?? comparisonOptions[0] ?? '',
  );
  const comparison = compareWithFiscalYear(monthlySalary, selectedYear, comparisonYear);

  if (!comparison) return null;

  const config = VARIANTS[comparison.type];
  const isSame = comparison.type === 'same';
  const Icon = config.icon;
  const BadgeIcon = config.badgeIcon;
  const monthlyFormatted = formatAmount(comparison.monthlyAmount);
  const annualFormatted = formatAmount(comparison.annualAmount);

  const badge = (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-semibold text-xs ${config.badgeClass}`}
    >
      <BadgeIcon aria-hidden className="h-3 w-3" strokeWidth={3} />
      {config.badgeText}
    </span>
  );

  return (
    <aside
      aria-label={config.ariaLabel(
        comparison.monthlyAmount,
        comparison.annualAmount,
        comparison.previousYear,
      )}
      className={`overflow-hidden rounded-2xl border ${config.containerClass}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center">
        <div className="flex min-w-0 flex-1 flex-col gap-2.5 p-3.5 sm:flex-row sm:items-center sm:gap-4 sm:p-5">
          <div className="flex justify-center sm:hidden">{badge}</div>

          <div className="flex min-w-0 items-start gap-3 sm:items-center">
            <div
              aria-hidden
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full sm:h-12 sm:w-12 ${config.iconClass}`}
            >
              <Icon className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2.5} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="mb-1.5 hidden sm:block">{badge}</p>
              <p className="font-bold text-gray-900 text-lg leading-snug max-[400px]:text-sm">
                {config.headline(monthlyFormatted, config.amountClass)}
              </p>
              <p className="mt-1 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-gray-500 text-sm">
                compared with
                <label htmlFor="single-year-comparison-year" className="sr-only">
                  Comparison fiscal year
                </label>
                <span className="relative inline-flex items-center">
                  <select
                    id="single-year-comparison-year"
                    value={comparisonYear}
                    onChange={(event) => setComparisonYear(event.target.value)}
                    className="cursor-pointer appearance-none rounded-md border border-gray-300 bg-white py-0.5 pr-7 pl-2.5 font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                  >
                    {comparisonOptions.map((year) => (
                      <option key={year} value={year}>
                        {formatFyLabel(year)}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    aria-hidden
                    className="pointer-events-none absolute right-2 h-3.5 w-3.5 text-gray-400"
                    strokeWidth={2.5}
                  />
                </span>
              </p>
            </div>
          </div>
        </div>

        {!isSame && (
          <>
            <div
              aria-hidden
              className={`mx-3.5 h-px shrink-0 sm:mx-0 sm:h-14 ${config.dividerClass}`}
            />

            <div className="flex items-center justify-center gap-3 px-3.5 pt-3.5 pb-3.5 sm:justify-end sm:gap-5 sm:px-5 sm:py-4">
              <div className="min-w-0 text-center">
                <p className="text-base text-gray-500 max-[400px]:text-sm sm:hidden">
                  That&apos;s{' '}
                  <span className={`font-semibold tabular-nums ${config.amountClass}`}>
                    {annualFormatted}
                  </span>{' '}
                  <span className="whitespace-nowrap">per year</span>
                </p>

                <div className="hidden sm:block">
                  <p className="text-gray-400 text-xs">That&apos;s</p>
                  <p className={`font-semibold text-xl tabular-nums ${config.amountClass}`}>
                    {annualFormatted}
                  </p>
                  <p className="text-gray-400 text-xs">per year</p>
                </div>
              </div>

              <div
                aria-hidden
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ring-1 sm:h-12 sm:w-12 ${config.walletClass}`}
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
