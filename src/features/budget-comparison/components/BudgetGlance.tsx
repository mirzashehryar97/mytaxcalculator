import BudgetSectionHeading from '@/features/budget-comparison/components/BudgetSectionHeading';
import { BUDGET_METRICS, BUDGET_PAGE_LABELS } from '@/features/budget-comparison/lib/content';
import { getMetricToneStyle } from '@/features/budget-comparison/lib/styles';

export default function BudgetGlance() {
  return (
    <section id="at-a-glance" aria-labelledby="at-a-glance-heading" className="scroll-mt-24">
      <BudgetSectionHeading id="at-a-glance-heading">
        {BUDGET_PAGE_LABELS.glanceTitle}
      </BudgetSectionHeading>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {BUDGET_METRICS.map((metric) => {
          const Icon = metric.icon;
          const toneStyle = getMetricToneStyle(metric.tone);
          const ChangeIcon = toneStyle.icon;

          return (
            <article
              key={metric.id}
              className="rounded-xl border-[1.5px] border-slate-300 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center gap-2.5">
                <Icon className="h-8 w-8 text-emerald-800" strokeWidth={1.7} aria-hidden="true" />
                <h3 className="font-bold text-[#0b1736] text-base leading-5">{metric.label}</h3>
              </div>
              <p className="mt-5 font-bold text-[#0b1736] text-xl">{metric.previousValue}</p>
              <p className="mt-1 text-slate-500 text-sm">{metric.previousLabel}</p>
              <p className="mt-4 font-bold text-[#0b1736] text-xl">{metric.currentValue}</p>
              <p className="mt-1 text-slate-500 text-sm">{metric.currentLabel}</p>
              <span
                className={`mt-4 inline-flex min-h-8 items-center gap-1.5 rounded-md px-3 font-semibold text-sm ${toneStyle.badgeClass}`}
              >
                <ChangeIcon className="h-4 w-4" aria-hidden="true" />
                {metric.change}
              </span>
            </article>
          );
        })}
      </div>
    </section>
  );
}
