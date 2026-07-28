import TaxGuideArticleSectionHeading from '@/features/tax-guides/components/article/TaxGuideArticleSectionHeading';
import {
  DEDUCTIONS_SECTION_COPY,
  RELIEF_FINDER_ROWS,
} from '@/features/tax-guides/lib/taxDeductionsCreditsContent';

export default function ReliefFinder() {
  return (
    <section aria-labelledby="relief-finder">
      <TaxGuideArticleSectionHeading id="relief-finder" number={3}>
        {DEDUCTIONS_SECTION_COPY.reliefFinderTitle}
      </TaxGuideArticleSectionHeading>
      <div className="mt-3 space-y-3 sm:hidden">
        {RELIEF_FINDER_ROWS.map((row) => {
          const Icon = row.icon;

          return (
            <article
              key={row.id}
              className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-emerald-800" aria-hidden="true" />
                <h3 className="font-semibold text-[#0b1736] text-sm leading-5">{row.payment}</h3>
              </div>
              <dl className="mt-3 grid gap-2 border-slate-200 border-t pt-3 text-xs">
                <div className="grid grid-cols-[92px_minmax(0,1fr)] gap-3">
                  <dt className="font-semibold text-emerald-800">Typical evidence</dt>
                  <dd className="text-slate-700">{row.evidence}</dd>
                </div>
                <div className="grid grid-cols-[92px_minmax(0,1fr)] items-center gap-3">
                  <dt className="font-semibold text-emerald-800">Verify</dt>
                  <dd>
                    <span className="inline-flex rounded-md border border-amber-300 bg-amber-50 px-2 py-1 text-[11px] text-amber-900">
                      {row.verification}
                    </span>
                  </dd>
                </div>
              </dl>
            </article>
          );
        })}
      </div>
      <div className="mt-3 hidden overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm sm:block">
        <table className="w-full min-w-[620px] border-collapse text-left">
          <thead className="bg-[#f3f8f5] text-emerald-900 text-xs">
            <tr>
              <th className="w-[42%] px-4 py-3 font-semibold">Payment / potential relief</th>
              <th className="w-[28%] px-4 py-3 font-semibold">Typical evidence</th>
              <th className="px-4 py-3 font-semibold">Verify</th>
            </tr>
          </thead>
          <tbody>
            {RELIEF_FINDER_ROWS.map((row) => {
              const Icon = row.icon;

              return (
                <tr key={row.id} className="border-slate-200 border-t">
                  <td className="px-4 py-3 text-slate-700 text-sm">
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 shrink-0 text-emerald-800" aria-hidden="true" />
                      <span>{row.payment}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-700 text-sm">{row.evidence}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex rounded-md border border-amber-300 bg-amber-50 px-2 py-1 text-[11px] text-amber-900">
                      {row.verification}
                    </span>
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
