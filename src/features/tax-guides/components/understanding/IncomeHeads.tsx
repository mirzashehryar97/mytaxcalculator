import TaxGuideArticleSectionHeading from '@/features/tax-guides/components/article/TaxGuideArticleSectionHeading';
import {
  TAX_INCOME_HEADS,
  UNDERSTANDING_SECTION_COPY,
} from '@/features/tax-guides/lib/understandingTaxSystemContent';

export default function IncomeHeads() {
  return (
    <section aria-labelledby="five-heads-of-income">
      <TaxGuideArticleSectionHeading id="five-heads-of-income" number={3}>
        {UNDERSTANDING_SECTION_COPY.incomeHeadsTitle}
      </TaxGuideArticleSectionHeading>
      <ol className="mt-3 grid overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm sm:grid-cols-2 md:grid-cols-5">
        {TAX_INCOME_HEADS.map((head, index) => (
          <li
            key={head.id}
            className="border-slate-200 border-b p-3 last:border-b-0 sm:border-r md:border-b-0 md:last:border-r-0 sm:[&:nth-child(even)]:border-r-0 md:[&:nth-child(even)]:border-r"
          >
            <div className="flex items-start gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-800 font-bold text-white text-xs">
                {index + 1}
              </span>
              <div>
                <h3 className="font-bold text-[#0b1736] text-sm leading-5">{head.title}</h3>
                <p className="mt-1 text-[13px] text-slate-600 leading-[1.4]">{head.description}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
