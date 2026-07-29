import { AlertCircle, CheckCircle2 } from 'lucide-react';

import BudgetSectionHeading from '@/features/budget-comparison/components/BudgetSectionHeading';
import { BUDGET_IMPACT_LISTS, BUDGET_PAGE_LABELS } from '@/features/budget-comparison/lib/content';

export default function BudgetImpact() {
  return (
    <section id="winners" aria-labelledby="winners-heading" className="scroll-mt-24">
      <BudgetSectionHeading id="winners-heading">
        {BUDGET_PAGE_LABELS.impactTitle}
      </BudgetSectionHeading>
      <div className="grid gap-4 sm:grid-cols-2">
        {BUDGET_IMPACT_LISTS.map((list) => {
          const positive = list.tone === 'positive';
          const Icon = positive ? CheckCircle2 : AlertCircle;

          return (
            <article
              key={list.id}
              className={`rounded-xl border-[1.5px] p-5 shadow-sm sm:p-6 ${
                positive ? 'border-emerald-300 bg-emerald-50/40' : 'border-red-300 bg-red-50/40'
              }`}
            >
              <h3
                className={`flex items-center gap-3 font-bold text-xl ${positive ? 'text-emerald-900' : 'text-red-700'}`}
              >
                <Icon className="h-6 w-6" aria-hidden="true" />
                {list.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {list.items.map((item) => (
                  <li key={item} className="flex gap-2.5 text-base text-slate-700 leading-6">
                    <CheckCircle2
                      className={`mt-0.5 h-5 w-5 shrink-0 ${positive ? 'text-emerald-700' : 'text-red-600'}`}
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
}
