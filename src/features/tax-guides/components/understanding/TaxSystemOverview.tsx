import TaxGuideArticleSectionHeading from '@/features/tax-guides/components/article/TaxGuideArticleSectionHeading';
import {
  TAX_SYSTEM_OVERVIEW_CARDS,
  UNDERSTANDING_SECTION_COPY,
} from '@/features/tax-guides/lib/understandingTaxSystemContent';

export default function TaxSystemOverview() {
  return (
    <section aria-labelledby="how-the-system-works">
      <TaxGuideArticleSectionHeading id="how-the-system-works" number={1}>
        {UNDERSTANDING_SECTION_COPY.systemTitle}
      </TaxGuideArticleSectionHeading>
      <p className="mt-2 text-slate-700 text-sm leading-6 sm:text-[15px]">
        {UNDERSTANDING_SECTION_COPY.systemDescription}
      </p>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        {TAX_SYSTEM_OVERVIEW_CARDS.map((card) => {
          const Icon = card.icon;

          return (
            <article
              key={card.id}
              className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
            >
              <Icon className="h-9 w-9 text-emerald-800" aria-hidden="true" />
              <h3 className="mt-3 font-bold text-[#0b1736] text-[15px] leading-5">{card.title}</h3>
              <p className="mt-2 text-slate-700 text-sm leading-5">{card.description}</p>
              <p className="mt-2 text-slate-600 text-sm leading-5">{card.detail}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
