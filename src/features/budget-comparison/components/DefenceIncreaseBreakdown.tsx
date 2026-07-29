import { CheckCircle2 } from 'lucide-react';

import { DEFENCE_INCREASE_BREAKDOWN } from '@/features/budget-comparison/lib/defenceContent';

export default function DefenceIncreaseBreakdown() {
  return (
    <section
      id="increase-breakdown"
      aria-labelledby="defence-increase-breakdown-heading"
      className="scroll-mt-24"
    >
      <h2
        id="defence-increase-breakdown-heading"
        className="mb-4 font-bold text-[#0b1736] text-xl sm:text-2xl"
      >
        {DEFENCE_INCREASE_BREAKDOWN.title}
      </h2>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {DEFENCE_INCREASE_BREAKDOWN.items.map((item) => {
          const Icon = item.icon;

          return (
            <article
              key={item.id}
              className="rounded-xl border-[1.5px] border-slate-300 bg-white p-4 text-center shadow-sm sm:p-5"
            >
              <Icon className="mx-auto h-8 w-8 text-emerald-800" aria-hidden="true" />
              <h3 className="mt-3 font-semibold text-slate-600 text-sm sm:text-base">
                {item.label}
              </h3>
              <p className="mt-1 font-bold text-[#0b1736] text-lg leading-6">{item.value}</p>
            </article>
          );
        })}
      </div>
      <p className="mt-4 flex items-start gap-2 rounded-lg border border-emerald-300 bg-emerald-50/60 px-4 py-3 font-medium text-emerald-900 text-sm leading-6 sm:text-base">
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
        {DEFENCE_INCREASE_BREAKDOWN.summary}
      </p>
    </section>
  );
}
