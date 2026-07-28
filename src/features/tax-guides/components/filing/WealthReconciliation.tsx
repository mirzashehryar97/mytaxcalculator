import TaxGuideArticleSectionHeading from '@/features/tax-guides/components/article/TaxGuideArticleSectionHeading';
import {
  FILING_SECTION_COPY,
  WEALTH_EXAMPLE_ROWS,
  WEALTH_FORMULA_ITEMS,
} from '@/features/tax-guides/lib/filingTaxReturnContent';

export default function WealthReconciliation() {
  return (
    <section aria-labelledby="wealth-reconciliation">
      <TaxGuideArticleSectionHeading id="wealth-reconciliation" number={6}>
        {FILING_SECTION_COPY.reconciliationTitle}
      </TaxGuideArticleSectionHeading>
      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_230px]">
        <div className="flex flex-col gap-2 sm:grid sm:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] sm:items-center sm:gap-x-2">
          {WEALTH_FORMULA_ITEMS.map((item) => (
            <div key={item.id} className="flex flex-col items-center gap-2 sm:contents">
              <div
                className={`flex min-h-20 w-full items-center justify-center rounded-lg border px-3 py-3 text-center font-semibold text-sm leading-5 ${
                  item.id === 'closing'
                    ? 'border-emerald-300 bg-emerald-50/60 text-emerald-950'
                    : 'border-slate-300 bg-white text-[#0b1736]'
                }`}
              >
                {item.label}
              </div>
              {'operator' in item ? (
                <span
                  className={`font-bold text-2xl ${
                    item.operator === '-' ? 'text-red-600' : 'text-emerald-800'
                  }`}
                  aria-hidden="true"
                >
                  {item.operator}
                </span>
              ) : null}
            </div>
          ))}
        </div>

        <div className="rounded-lg border border-slate-300 bg-white p-4 shadow-sm">
          <h3 className="font-bold text-[#0b1736] text-sm">
            {FILING_SECTION_COPY.exampleTitle}{' '}
            <span className="font-normal text-slate-500 text-xs">
              ({FILING_SECTION_COPY.exampleCaption})
            </span>
          </h3>
          <dl className="mt-2 space-y-2">
            {WEALTH_EXAMPLE_ROWS.map((row) => (
              <div
                key={row.id}
                className={`flex items-center justify-between gap-3 text-[13px] ${
                  'emphasized' in row && row.emphasized
                    ? 'border-slate-200 border-t pt-2 font-bold text-emerald-900'
                    : ''
                }`}
              >
                <dt>{row.label}</dt>
                <dd className="font-semibold">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
