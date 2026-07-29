import { BarChart2 } from 'lucide-react';

import { formatFiscalYear, formatPkr } from '@/features/salary-tax/lib/insights';

interface SalaryInsightsHeaderProps {
  effectiveRate: number;
  monthlyIncome: number;
  onHide: () => void;
  selectedYear: string;
}

export default function SalaryInsightsHeader({
  effectiveRate,
  monthlyIncome,
  onHide,
  selectedYear,
}: SalaryInsightsHeaderProps) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <p className="font-bold text-emerald-700 text-xs uppercase tracking-[0.12em]">
          Salary insights
        </p>
        <h3
          id="salary-insights-heading"
          className="mt-1 scroll-mt-24 font-bold text-gray-900 text-xl sm:text-2xl"
        >
          Understand your tax at a glance
        </h3>
        <p className="mt-1 text-gray-500 text-sm">
          <span className="tabular-nums">{formatPkr(monthlyIncome)}</span> per month
          <span aria-hidden className="mx-2 text-gray-300">
            •
          </span>
          {formatFiscalYear(selectedYear)}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 sm:flex-nowrap sm:justify-end">
        <div className="text-left sm:text-right">
          <p className="font-bold text-2xl text-emerald-600 tabular-nums sm:text-3xl">
            {effectiveRate.toFixed(2)}%
          </p>
          <p className="text-gray-500 text-xs">Effective tax rate</p>
        </div>
        <button
          type="button"
          onClick={onHide}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 font-semibold text-gray-600 text-sm shadow-sm transition-colors hover:border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-emerald-600/15"
        >
          <BarChart2 aria-hidden className="h-4 w-4" />
          Hide insights
        </button>
      </div>
    </header>
  );
}
