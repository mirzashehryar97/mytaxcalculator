import type { ReactNode } from 'react';

import type { LucideIcon } from 'lucide-react';
import { Check, Info, TrendingDown, TrendingUp, Wallet } from 'lucide-react';

import { type BudgetYearComparison, compareWithPreviousFiscalYear } from '@/lib/budgetComparison';

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
};

export default function SingleYearBudgetSavingsNote({
  monthlySalary,
  selectedYear,
}: SingleYearBudgetSavingsNoteProps) {
  const comparison = compareWithPreviousFiscalYear(monthlySalary, selectedYear);

  if (!comparison) return null;

  const config = VARIANTS[comparison.type];
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
              <p className="mt-1 text-gray-500 text-sm">
                compared with{' '}
                <span className="font-semibold text-gray-600">
                  {formatFyLabel(comparison.previousYear)}.
                </span>
              </p>
            </div>
          </div>
        </div>

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
      </div>
    </aside>
  );
}
