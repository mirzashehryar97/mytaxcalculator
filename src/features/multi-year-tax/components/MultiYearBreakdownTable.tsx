import { Fragment } from 'react';

import MultiYearAllocationBar from '@/features/multi-year-tax/components/MultiYearAllocationBar';
import { MULTI_YEAR_RESULT_COPY } from '@/features/multi-year-tax/lib/content';
import { formatMonths, formatPercent, formatPkr } from '@/features/multi-year-tax/lib/formatting';
import { getAllocationLabel } from '@/features/multi-year-tax/lib/presentation';
import type { MultiYearResult } from '@/features/multi-year-tax/types';

interface MultiYearBreakdownTableProps {
  result: MultiYearResult;
}

const HEAD_CELL_CLASS = 'px-3 py-2 text-right font-medium';
const CELL_CLASS = 'px-3 pt-3 pb-1 text-right tabular-nums';

/** Wide layout: one row per fiscal year, with its take-home / tax split beneath. */
export default function MultiYearBreakdownTable({ result }: MultiYearBreakdownTableProps) {
  return (
    <div className="-mx-1 overflow-x-auto px-1">
      <table className="w-full min-w-[40rem] text-sm">
        <thead>
          <tr className="border-gray-200 border-b text-gray-500 text-xs uppercase tracking-wide">
            <th className="py-2 pr-3 text-left font-medium" scope="col">
              {MULTI_YEAR_RESULT_COPY.fiscalYearLabel}
            </th>
            <th className={HEAD_CELL_CLASS} scope="col">
              {MULTI_YEAR_RESULT_COPY.coverageLabel}
            </th>
            <th className={HEAD_CELL_CLASS} scope="col">
              {MULTI_YEAR_RESULT_COPY.grossLabel}
            </th>
            <th className={HEAD_CELL_CLASS} scope="col">
              {MULTI_YEAR_RESULT_COPY.taxLabel}
            </th>
            <th className={HEAD_CELL_CLASS} scope="col">
              {MULTI_YEAR_RESULT_COPY.takeHomeLabel}
            </th>
            <th className={`${HEAD_CELL_CLASS} pr-0`} scope="col">
              {MULTI_YEAR_RESULT_COPY.rateLabel}
            </th>
          </tr>
        </thead>
        <tbody>
          {result.breakdown.map((year) => (
            <Fragment key={year.fiscalYear}>
              <tr>
                <th className="pt-3 pr-3 pb-1 text-left font-semibold text-gray-900" scope="row">
                  {year.label}
                </th>
                <td className={`${CELL_CLASS} text-gray-600`}>{formatMonths(year.months)}</td>
                <td className={`${CELL_CLASS} text-gray-900`}>{formatPkr(year.gross)}</td>
                <td className={`${CELL_CLASS} text-red-600`}>{formatPkr(year.tax)}</td>
                <td className={`${CELL_CLASS} text-emerald-600`}>{formatPkr(year.takeHome)}</td>
                <td className={`${CELL_CLASS} pr-0 font-semibold text-gray-900`}>
                  {formatPercent(year.effectiveRate)}
                </td>
              </tr>
              <tr>
                <td className="pb-3" colSpan={6}>
                  <MultiYearAllocationBar
                    label={getAllocationLabel(year)}
                    takeHomePercent={year.takeHomePercent}
                    taxPercent={year.taxPercent}
                  />
                </td>
              </tr>
            </Fragment>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-gray-200 border-t bg-gray-50 font-semibold">
            <th className="rounded-l-lg py-3 pr-3 pl-3 text-left text-gray-900" scope="row">
              {MULTI_YEAR_RESULT_COPY.totalRowLabel}
            </th>
            <td className="px-3 py-3 text-right text-gray-600 tabular-nums">
              {formatMonths(result.totalMonths)}
            </td>
            <td className="px-3 py-3 text-right text-gray-900 tabular-nums">
              {formatPkr(result.totalGross)}
            </td>
            <td className="px-3 py-3 text-right text-red-600 tabular-nums">
              {formatPkr(result.totalTax)}
            </td>
            <td className="px-3 py-3 text-right text-emerald-600 tabular-nums">
              {formatPkr(result.totalTakeHome)}
            </td>
            <td className="rounded-r-lg px-3 py-3 text-right text-gray-900 tabular-nums">
              {formatPercent(result.effectiveRate)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
