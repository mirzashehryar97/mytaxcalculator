import { formatCompactPkr } from '@/features/salary-tax/lib/insights';
import type { SalaryPeriodBreakdown } from '@/features/salary-tax/types';

interface SalaryCashFlowChartProps {
  breakdown: SalaryPeriodBreakdown;
}

export default function SalaryCashFlowChart({ breakdown }: SalaryCashFlowChartProps) {
  return (
    <figure>
      <figcaption className="mb-3 font-semibold text-gray-800">
        {breakdown.periodLabel} cash flow
      </figcaption>
      <div
        aria-label={`${breakdown.periodLabel} gross salary ${formatCompactPkr(breakdown.gross)}, tax ${formatCompactPkr(breakdown.tax)}, and take-home ${formatCompactPkr(breakdown.net)}`}
        className="relative mx-auto h-44 max-w-xl px-1 pt-1 sm:h-52 sm:px-4"
        role="img"
      >
        <div
          aria-hidden
          className="absolute top-1 right-1/2 left-[16.67%] border-gray-400 border-t-2 border-dashed"
        />
        <div
          aria-hidden
          className="absolute right-[16.67%] left-1/2 border-gray-400 border-t-2 border-dashed"
          style={{ top: `${breakdown.taxPercent}%` }}
        />
        <div className="relative z-10 grid h-full grid-cols-3 items-stretch gap-5 sm:gap-10">
          <div className="h-full self-end rounded-md bg-gradient-to-b from-slate-600 to-slate-800 shadow-sm" />
          <div
            className="self-start rounded-md bg-gradient-to-b from-red-500 to-red-600 shadow-sm"
            style={{ height: `${breakdown.taxPercent}%` }}
          />
          <div
            className="self-end rounded-md bg-gradient-to-b from-emerald-600 to-emerald-700 shadow-sm"
            style={{ height: `${breakdown.takeHomePercent}%` }}
          />
        </div>
      </div>

      <div className="mt-2 grid grid-cols-3 gap-2 text-center text-xs sm:text-sm">
        <div className="min-w-0">
          <p className="text-gray-500">Gross salary</p>
          <p className="amount-wrap font-bold text-gray-900 tabular-nums">
            {formatCompactPkr(breakdown.gross)}
          </p>
        </div>
        <div className="min-w-0">
          <p className="text-gray-500">Tax</p>
          <p className="amount-wrap font-bold text-red-600 tabular-nums">
            − {formatCompactPkr(breakdown.tax)}
          </p>
        </div>
        <div className="min-w-0">
          <p className="text-gray-500">Take-home</p>
          <p className="amount-wrap font-bold text-emerald-700 tabular-nums">
            {formatCompactPkr(breakdown.net)}
          </p>
        </div>
      </div>

      <p className="mt-3 text-center text-gray-500 text-xs sm:text-sm">
        Tax reduces your {breakdown.periodLabel.toLowerCase()} salary by{' '}
        <span className="font-bold text-emerald-700 tabular-nums">
          {breakdown.taxPercent.toFixed(2)}%
        </span>
      </p>
    </figure>
  );
}
