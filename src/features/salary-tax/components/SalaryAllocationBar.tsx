import { formatPkr } from '@/features/salary-tax/lib/insights';
import type { SalaryAllocation } from '@/features/salary-tax/types';

interface SalaryAllocationBarProps extends SalaryAllocation {
  annualIncome: number;
}

// Segment widths are exact percentages, so a label is only drawn when its
// segment is wide enough to hold it at the narrowest bar width — the figures
// below the bar carry the numbers either way.
const MIN_TAKE_HOME_LABEL_PERCENT = 45;
const MIN_TAX_LABEL_PERCENT = 30;

export default function SalaryAllocationBar({
  annualIncome,
  takeHomePercent,
  taxPercent,
}: SalaryAllocationBarProps) {
  return (
    <figure className="rounded-xl border border-gray-200 bg-white p-3 sm:p-4">
      <figcaption className="mb-2 font-semibold text-gray-700 text-sm">
        For every Rs. 100 earned
      </figcaption>
      <div
        aria-label={`${takeHomePercent.toFixed(2)} percent take-home and ${taxPercent.toFixed(2)} percent tax on ${formatPkr(annualIncome)} annual income`}
        className="flex h-9 overflow-hidden rounded-md bg-gray-100 text-white text-xs sm:text-sm"
        role="img"
      >
        <div
          className="flex min-w-0 shrink-0 items-center justify-center overflow-hidden bg-gradient-to-r from-emerald-700 to-emerald-600 px-1 font-bold tabular-nums transition-[width]"
          style={{ width: `${takeHomePercent}%` }}
        >
          {takeHomePercent >= MIN_TAKE_HOME_LABEL_PERCENT &&
            `${takeHomePercent.toFixed(2)}% take-home`}
        </div>
        <div
          className="flex min-w-0 shrink-0 items-center justify-center overflow-hidden bg-gradient-to-r from-red-600 to-red-500 px-1 font-bold tabular-nums transition-[width]"
          style={{ width: `${taxPercent}%` }}
        >
          {taxPercent >= MIN_TAX_LABEL_PERCENT && `${taxPercent.toFixed(2)}% tax`}
        </div>
      </div>
      <div className="mt-2 flex items-start justify-between gap-4 text-xs">
        <span className="font-semibold text-emerald-700 tabular-nums">
          Rs. {takeHomePercent.toFixed(2)} you keep
        </span>
        <span className="text-right font-semibold text-red-600 tabular-nums">
          Rs. {taxPercent.toFixed(2)} tax
        </span>
      </div>
    </figure>
  );
}
