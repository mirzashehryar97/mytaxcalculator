import { CheckCircle2 } from 'lucide-react';

import type { BudgetHeroContent } from '@/features/budget-comparison/types';

interface BudgetHeroSummaryProps {
  content: BudgetHeroContent;
}

export default function BudgetHeroSummary({ content }: BudgetHeroSummaryProps) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.55)] sm:p-5">
      <div className="flex items-start gap-3 rounded-xl bg-emerald-50 px-4 py-4 ring-1 ring-emerald-100">
        <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-emerald-700" aria-hidden="true" />
        <p className="text-sm leading-6">
          <span className="block font-bold text-emerald-900">{content.statusTitle}</span>
          <span className="text-emerald-800">{content.statusDetail}</span>
        </p>
      </div>

      <dl className="mt-3 space-y-2">
        {content.meta.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3.5"
            >
              <Icon className="h-5 w-5 shrink-0 text-emerald-700" aria-hidden="true" />
              <dd className="font-semibold text-slate-700 text-sm">
                {item.dateTime ? <time dateTime={item.dateTime}>{item.label}</time> : item.label}
              </dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}
