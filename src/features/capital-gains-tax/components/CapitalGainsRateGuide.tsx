import { CAPITAL_GAINS_SECTION_COPY } from '@/features/capital-gains-tax/lib/content';
import type { CapitalGainsMode, CapitalGainsRateRow } from '@/features/capital-gains-tax/types';

interface CapitalGainsRateGuideProps {
  mode: CapitalGainsMode;
  rows: readonly CapitalGainsRateRow[];
  /** Row matching what the form currently says, highlighted so it is easy to find. */
  activeRowId: string | null;
}

/**
 * The whole rate table under the calculator, with both filer statuses side by
 * side. It scrolls inside its own box on a narrow screen so the page itself never
 * scrolls sideways.
 */
export default function CapitalGainsRateGuide({
  mode,
  rows,
  activeRowId,
}: CapitalGainsRateGuideProps) {
  const copy = CAPITAL_GAINS_SECTION_COPY[mode];

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-6">
      <h3 className="font-bold text-gray-900 text-lg">{copy.rateGuideTitle}</h3>
      <p className="mt-1 text-gray-600 text-sm leading-relaxed">{copy.rateGuideDescription}</p>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
          <thead>
            <tr className="border-gray-200 border-b text-gray-500 text-xs uppercase tracking-wide">
              <th scope="col" className="py-2 pr-4 font-semibold">
                When you bought
              </th>
              <th scope="col" className="py-2 pr-4 text-right font-semibold">
                Filer
              </th>
              <th scope="col" className="py-2 text-right font-semibold">
                Non-filer
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const active = row.id === activeRowId;

              return (
                <tr
                  key={row.id}
                  className={`border-gray-100 border-b last:border-b-0 ${
                    active ? 'bg-emerald-50/70' : ''
                  }`}
                >
                  <th
                    scope="row"
                    className={`py-3 pr-4 font-medium leading-relaxed ${
                      active ? 'text-emerald-900' : 'text-gray-700'
                    }`}
                  >
                    {row.situation}
                  </th>
                  <td
                    className={`py-3 pr-4 text-right tabular-nums ${
                      active ? 'font-bold text-emerald-700' : 'font-semibold text-gray-900'
                    }`}
                  >
                    {row.filerRate}
                  </td>
                  <td
                    className={`py-3 text-right tabular-nums ${
                      active ? 'font-bold text-emerald-700' : 'font-semibold text-gray-900'
                    }`}
                  >
                    {row.nonFilerRate}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
