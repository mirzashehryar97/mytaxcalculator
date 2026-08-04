import { PTA_RATE_GUIDE_COPY } from '@/features/pta-tax/lib/content';
import type { PtaRateGuideRow } from '@/features/pta-tax/types';

/**
 * What each charge is gets explained by the info icons on the result itself and
 * by the three notes under this section — repeating a tooltip on all 28 rows
 * would put 56 buttons in the page for four distinct explanations.
 */
const CHARGE_COLUMNS = [
  { key: 'regulatoryDuty', heading: PTA_RATE_GUIDE_COPY.regulatoryDutyColumn },
  { key: 'salesTax', heading: PTA_RATE_GUIDE_COPY.salesTaxColumn },
  { key: 'incomeTax148', heading: PTA_RATE_GUIDE_COPY.incomeTaxColumn },
  { key: 'handsetLevy', heading: PTA_RATE_GUIDE_COPY.handsetLevyColumn },
] as const satisfies readonly { key: keyof PtaRateGuideRow; heading: string }[];

interface PtaRateTableProps {
  id: string;
  heading: string;
  /** Source line under the heading, naming the Act or SRO the year comes from. */
  sources: string;
  rows: readonly PtaRateGuideRow[];
  /** Marks the year currently in force, so the two tables cannot be confused. */
  current?: boolean;
}

/**
 * Stacked cards on a phone and a real table from `md` up. Five columns will not
 * fit a 320px screen at a readable size, and a table that has to be scrolled
 * sideways to be read is one most visitors never read.
 */
export default function PtaRateTable({ id, heading, sources, rows, current }: PtaRateTableProps) {
  return (
    <section aria-labelledby={`${id}-heading`} className="min-w-0">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="font-bold text-gray-900 text-lg" id={`${id}-heading`}>
          {heading}
        </h3>
        {current ? (
          <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 font-semibold text-emerald-800 text-xs">
            {PTA_RATE_GUIDE_COPY.currentYearLabel}
          </span>
        ) : null}
      </div>
      <p className="mt-1 text-gray-500 text-sm leading-relaxed">{sources}</p>

      <ul className="mt-4 space-y-3 md:hidden">
        {rows.map((row) => (
          <li key={row.id} className="min-w-0 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <p className="font-semibold text-gray-900 text-sm">{row.band}</p>
            <dl className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              {CHARGE_COLUMNS.map((column) => (
                <div className="min-w-0" key={column.key}>
                  <dt className="text-gray-500 text-xs">{column.heading}</dt>
                  <dd className="amount-wrap font-semibold text-gray-900 tabular-nums">
                    {row[column.key]}
                  </dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>

      <div className="mt-4 hidden overflow-x-auto rounded-2xl border border-gray-200 md:block">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">{heading}</caption>
          <thead>
            <tr className="bg-emerald-50 text-emerald-950">
              <th className="px-4 py-3 font-semibold" scope="col">
                {PTA_RATE_GUIDE_COPY.bandColumn}
              </th>
              {CHARGE_COLUMNS.map((column) => (
                <th className="px-4 py-3 font-semibold" key={column.key} scope="col">
                  {column.heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((row) => (
              <tr key={row.id} className="even:bg-gray-50/70">
                <th className="px-4 py-3 text-left font-medium text-gray-900" scope="row">
                  {row.band}
                </th>
                {CHARGE_COLUMNS.map((column) => (
                  <td
                    className={`px-4 py-3 tabular-nums ${
                      column.key === 'salesTax' ? 'font-semibold text-emerald-700' : 'text-gray-700'
                    }`}
                    key={column.key}
                  >
                    {row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
