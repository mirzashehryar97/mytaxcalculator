import { ArrowRight, CheckCircle2 } from 'lucide-react';

import TaxGuideArticleSectionHeading from '@/features/tax-guides/components/article/TaxGuideArticleSectionHeading';
import {
  TAX_RESIDENCY_CARDS,
  TAX_YEAR_RANGE,
  UNDERSTANDING_SECTION_COPY,
} from '@/features/tax-guides/lib/understandingTaxSystemContent';

export default function TaxYearResidency() {
  return (
    <section aria-labelledby="tax-year-residency">
      <TaxGuideArticleSectionHeading id="tax-year-residency" number={2}>
        {UNDERSTANDING_SECTION_COPY.taxYearTitle}
      </TaxGuideArticleSectionHeading>

      <div className="mt-3 grid gap-4 sm:grid-cols-2">
        <div>
          <h3 className="font-bold text-[#0b1736] text-[15px]">
            {UNDERSTANDING_SECTION_COPY.taxYearLabel}
          </h3>
          <p className="mt-1 text-slate-600 text-sm leading-5">
            {UNDERSTANDING_SECTION_COPY.taxYearDescription}
          </p>
          <div className="mt-2 flex items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white px-3 py-3 shadow-sm">
            <span className="flex items-center gap-2 font-semibold text-[#0b1736] text-[13px]">
              <TAX_YEAR_RANGE.startIcon className="h-5 w-5 text-emerald-800" aria-hidden="true" />
              {TAX_YEAR_RANGE.start}
            </span>
            <ArrowRight className="h-5 w-8 shrink-0 text-emerald-800" aria-hidden="true" />
            <span className="flex items-center gap-2 font-semibold text-[#0b1736] text-[13px]">
              <TAX_YEAR_RANGE.endIcon className="h-5 w-5 text-emerald-800" aria-hidden="true" />
              {TAX_YEAR_RANGE.end}
            </span>
          </div>
          <p className="mt-2 text-[13px] text-slate-600 leading-5">
            {UNDERSTANDING_SECTION_COPY.taxYearNamingNote}
          </p>
        </div>

        <div>
          <h3 className="font-bold text-[#0b1736] text-[15px]">
            {UNDERSTANDING_SECTION_COPY.residencyLabel}
          </h3>
          <p className="mt-1 text-slate-600 text-sm leading-5">
            {UNDERSTANDING_SECTION_COPY.residencyDescription}
          </p>
        </div>
      </div>

      <div className="mt-3 grid gap-4 sm:grid-cols-2">
        {TAX_RESIDENCY_CARDS.map((card) => (
          <article
            key={card.id}
            className={`rounded-lg border p-4 ${
              card.tone === 'emerald'
                ? 'border-emerald-200 bg-emerald-50/45'
                : 'border-amber-200 bg-amber-50/45'
            }`}
          >
            <h3 className="font-bold text-[#0b1736] text-[15px]">{card.title}</h3>
            <ul className="mt-2 space-y-2">
              {card.items.map((item) => (
                <li key={item} className="flex gap-2 text-[13px] text-slate-700 leading-5">
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-emerald-800"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
