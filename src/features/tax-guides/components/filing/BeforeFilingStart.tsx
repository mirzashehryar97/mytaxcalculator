import TaxGuideArticleSectionHeading from '@/features/tax-guides/components/article/TaxGuideArticleSectionHeading';
import {
  FILING_PREPARATION_CARDS,
  FILING_SECTION_COPY,
} from '@/features/tax-guides/lib/filingTaxReturnContent';

export default function BeforeFilingStart() {
  return (
    <section aria-labelledby="before-you-start">
      <TaxGuideArticleSectionHeading id="before-you-start" number={2}>
        {FILING_SECTION_COPY.beforeStartTitle}
      </TaxGuideArticleSectionHeading>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {FILING_PREPARATION_CARDS.map((card) => {
          const Icon = card.icon;

          return (
            <article
              key={card.id}
              className="flex min-h-36 items-start gap-4 rounded-lg border border-slate-300 bg-white p-4 shadow-sm sm:block"
            >
              <Icon className="h-10 w-10 shrink-0 text-emerald-800" aria-hidden="true" />
              <div className="sm:mt-3">
                <h3 className="font-bold text-[#0b1736] text-base leading-5">{card.title}</h3>
                <p className="mt-1 text-slate-600 text-sm leading-5">{card.description}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
