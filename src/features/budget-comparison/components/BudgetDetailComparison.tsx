import BudgetSectionHeading from '@/features/budget-comparison/components/BudgetSectionHeading';
import { getComparisonImpactClass } from '@/features/budget-comparison/lib/styles';
import type { BudgetComparisonRow } from '@/features/budget-comparison/types';

interface BudgetDetailComparisonProps {
  sectionId: string;
  headingId: string;
  heading: string;
  rows: readonly BudgetComparisonRow[];
  note: string;
}

export default function BudgetDetailComparison({
  sectionId,
  headingId,
  heading,
  rows,
  note,
}: BudgetDetailComparisonProps) {
  return (
    <section id={sectionId} aria-labelledby={headingId} className="scroll-mt-24">
      <BudgetSectionHeading id={headingId}>{heading}</BudgetSectionHeading>

      <div className="hidden overflow-hidden rounded-xl border-[1.5px] border-slate-300 bg-white shadow-sm md:block">
        <table className="w-full table-fixed border-collapse text-left text-sm lg:text-base">
          <thead className="bg-slate-100 text-[#0b1736]">
            <tr>
              <th scope="col" className="w-[29%] px-4 py-3 font-bold">
                Measure
              </th>
              <th scope="col" className="w-[25%] border-slate-300 border-l px-4 py-3 font-bold">
                FY 2025–26
              </th>
              <th scope="col" className="w-[28%] border-slate-300 border-l px-4 py-3 font-bold">
                FY 2026–27
              </th>
              <th scope="col" className="w-[18%] border-slate-300 border-l px-4 py-3 font-bold">
                Impact
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.id} className="border-slate-200 border-t align-top">
                <th scope="row" className="px-4 py-3 font-semibold text-[#0b1736] leading-6">
                  {index + 1}. {row.measure}
                </th>
                <td className="border-slate-200 border-l px-4 py-3 text-slate-700 leading-6">
                  {row.previous}
                </td>
                <td className="border-slate-200 border-l px-4 py-3 text-slate-700 leading-6">
                  {row.current}
                </td>
                <td className="border-slate-200 border-l px-4 py-3">
                  <span
                    className={`inline-flex rounded-md px-3 py-1 font-semibold text-sm ring-1 ring-inset ${getComparisonImpactClass(row.tone)}`}
                  >
                    {row.impact}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-4 md:hidden">
        {rows.map((row, index) => (
          <article
            key={row.id}
            className="rounded-xl border-[1.5px] border-slate-300 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-bold text-[#0b1736] text-base leading-6">
                {index + 1}. {row.measure}
              </h3>
              <span
                className={`shrink-0 rounded-md px-2.5 py-1 font-semibold text-xs ring-1 ring-inset ${getComparisonImpactClass(row.tone)}`}
              >
                {row.impact}
              </span>
            </div>
            <dl className="mt-4 grid gap-3 text-sm">
              <div>
                <dt className="font-semibold text-slate-500">FY 2025–26</dt>
                <dd className="mt-1 text-slate-700 leading-6">{row.previous}</dd>
              </div>
              <div className="border-slate-200 border-t pt-3">
                <dt className="font-semibold text-slate-500">FY 2026–27</dt>
                <dd className="mt-1 text-slate-700 leading-6">{row.current}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>

      <p className="mt-3 text-slate-600 text-sm leading-6">{note}</p>
    </section>
  );
}
