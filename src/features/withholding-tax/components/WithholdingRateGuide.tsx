import { WITHHOLDING_RATE_GUIDE_COPY } from '@/features/withholding-tax/lib/content';
import type { WithholdingMode, WithholdingRateRow } from '@/features/withholding-tax/types';

interface WithholdingRateGuideProps {
  mode: WithholdingMode;
  rows: readonly WithholdingRateRow[];
  /** Highlighted row, e.g. the tax year the reader has selected. */
  activeRowId?: string;
}

/**
 * The full table behind the answer. A real table on wide screens, and stacked
 * cards on a phone, so nothing has to be scrolled sideways to be read.
 */
export default function WithholdingRateGuide({
  mode,
  rows,
  activeRowId,
}: WithholdingRateGuideProps) {
  const copy = WITHHOLDING_RATE_GUIDE_COPY[mode];

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
      <h3 className="font-bold text-gray-900 text-lg">{copy.title}</h3>
      <p className="mt-1 text-gray-600 text-sm leading-relaxed">{copy.description}</p>

      <ul className="mt-5 space-y-3 md:hidden">
        {rows.map((row) => (
          <li
            key={row.id}
            className={`rounded-xl border p-4 ${
              row.id === activeRowId
                ? 'border-emerald-300 bg-emerald-50'
                : 'border-gray-200 bg-gray-50'
            }`}
          >
            <p className="font-semibold text-gray-900 text-sm">{row.situation}</p>
            <p className="mt-1 text-gray-600 text-sm leading-relaxed">{row.charge}</p>
          </li>
        ))}
      </ul>

      <div className="mt-5 hidden overflow-x-auto md:block">
        <table className="w-full min-w-full text-left text-sm">
          <thead>
            <tr className="border-gray-200 border-b">
              <th scope="col" className="py-3 pr-4 font-semibold text-gray-500">
                {copy.situationHeading}
              </th>
              <th scope="col" className="py-3 font-semibold text-gray-500">
                {copy.chargeHeading}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.id}
                className={`border-gray-100 border-b last:border-b-0 ${
                  row.id === activeRowId ? 'bg-emerald-50' : ''
                }`}
              >
                <th scope="row" className="py-3 pr-4 align-top font-semibold text-gray-900 text-sm">
                  {row.situation}
                </th>
                <td className="py-3 align-top text-gray-600 leading-relaxed">{row.charge}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
