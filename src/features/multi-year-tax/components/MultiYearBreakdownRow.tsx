import MultiYearAllocationBar from '@/features/multi-year-tax/components/MultiYearAllocationBar';
import { MULTI_YEAR_RESULT_COPY } from '@/features/multi-year-tax/lib/content';
import type { BreakdownRow } from '@/features/multi-year-tax/types';

interface MultiYearBreakdownRowProps {
  row: BreakdownRow;
}

const CAPTION_CLASS = 'font-semibold text-gray-500 text-xs uppercase tracking-wide';

/**
 * One fiscal year on a single line: the year and how much of it is covered on
 * the left, its tax on the right, the income it came from underneath. It fits
 * the panel at tablet width, where the table would have to scroll sideways.
 */
export default function MultiYearBreakdownRow({ row }: MultiYearBreakdownRowProps) {
  return (
    <article
      className={`rounded-xl px-4 py-3 ${row.isTotal ? 'bg-gray-50' : 'border border-gray-200'}`}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <h4 className="min-w-0 font-bold text-base text-gray-900">
          {row.label}{' '}
          <span className="font-medium text-gray-500 text-sm tabular-nums">
            ({row.monthsLabel})
          </span>
        </h4>
        <p className="flex shrink-0 items-baseline gap-1.5">
          <span className={CAPTION_CLASS}>{MULTI_YEAR_RESULT_COPY.taxLabel}</span>
          <span
            className={`amount-wrap font-bold text-red-600 tabular-nums ${
              row.isTotal ? 'text-lg' : ''
            }`}
          >
            {row.taxLabel}
          </span>
        </p>
      </div>

      <div className="mt-1 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 text-sm">
        <p className="flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-0.5">
          <span className="amount-wrap text-gray-500 tabular-nums">
            {MULTI_YEAR_RESULT_COPY.grossShortLabel}: {row.grossLabel}
          </span>
          <span className="amount-wrap font-semibold text-emerald-600 tabular-nums">
            {MULTI_YEAR_RESULT_COPY.takeHomeLabel}: {row.takeHomeLabel}
          </span>
        </p>
        <span className="shrink-0 text-gray-500 text-xs tabular-nums">
          {MULTI_YEAR_RESULT_COPY.effectiveRateLabel} {row.rateLabel}
        </span>
      </div>

      {row.allocation ? (
        <div className="mt-2.5">
          <MultiYearAllocationBar
            label={row.allocation.label}
            takeHomePercent={row.allocation.takeHomePercent}
            taxPercent={row.allocation.taxPercent}
            thickness="thick"
          />
        </div>
      ) : null}
    </article>
  );
}
