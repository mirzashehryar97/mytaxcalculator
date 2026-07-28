import { ArrowRight } from 'lucide-react';

import TaxGuideArticleSectionHeading from '@/features/tax-guides/components/article/TaxGuideArticleSectionHeading';
import {
  DEDUCTIONS_SECTION_COPY,
  RELIEF_CATEGORIES,
} from '@/features/tax-guides/lib/taxDeductionsCreditsContent';

export default function ReliefCategories() {
  return (
    <section aria-labelledby="common-relief-categories">
      <TaxGuideArticleSectionHeading id="common-relief-categories" number={4}>
        {DEDUCTIONS_SECTION_COPY.categoriesTitle}
      </TaxGuideArticleSectionHeading>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {RELIEF_CATEGORIES.map((category) => {
          const Icon = category.icon;

          return (
            <article
              key={category.id}
              className="flex flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start gap-3 xl:block">
                <Icon className="h-12 w-12 shrink-0 text-emerald-800" aria-hidden="true" />
                <h3 className="font-bold text-[#0b1736] text-base leading-6 xl:mt-4">
                  {category.title}
                </h3>
              </div>
              <div className="mt-5 space-y-4 text-slate-700 text-sm leading-6">
                <div>
                  <p className="font-semibold text-emerald-800">What it may do</p>
                  <p>{category.effect}</p>
                </div>
                <div>
                  <p className="font-semibold text-emerald-800">Evidence to keep</p>
                  <p>{category.evidence}</p>
                </div>
              </div>
              <a
                href={category.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-2 pt-6 font-semibold text-emerald-800 text-sm hover:underline"
              >
                Verify section & limits
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </article>
          );
        })}
      </div>
    </section>
  );
}
