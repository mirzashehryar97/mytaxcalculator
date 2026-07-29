import { ChevronDown } from 'lucide-react';

import BudgetSectionHeading from '@/features/budget-comparison/components/BudgetSectionHeading';
import { BUDGET_PAGE_LABELS } from '@/features/budget-comparison/lib/content';
import type { BudgetFaqItem } from '@/features/budget-comparison/types';

interface BudgetFaqsProps {
  faqs: readonly BudgetFaqItem[];
  title?: string;
}

export default function BudgetFaqs({ faqs, title = BUDGET_PAGE_LABELS.faqTitle }: BudgetFaqsProps) {
  return (
    <section id="faqs" aria-labelledby="faqs-heading" className="scroll-mt-24">
      <BudgetSectionHeading id="faqs-heading">{title}</BudgetSectionHeading>
      <div className="overflow-hidden rounded-xl border-[1.5px] border-slate-300 bg-white shadow-sm">
        {faqs.map((faq) => (
          <details key={faq.question} className="group border-slate-200 border-b last:border-b-0">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4 font-semibold text-[#0b1736] text-base leading-6 transition marker:content-none hover:bg-emerald-50/40 sm:gap-4 sm:px-5 sm:text-lg sm:leading-7">
              <span className="min-w-0 flex-1 text-pretty break-words">{faq.question}</span>
              <ChevronDown
                className="h-5 w-5 shrink-0 text-slate-500 transition-transform group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <p className="break-words px-4 pb-4 text-[15px] text-slate-600 leading-7 sm:px-5 sm:pb-5 sm:text-base">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
