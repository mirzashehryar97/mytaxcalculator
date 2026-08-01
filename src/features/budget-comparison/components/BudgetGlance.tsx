import BudgetSectionHeading from '@/features/budget-comparison/components/BudgetSectionHeading';
import { BUDGET_METRICS, BUDGET_PAGE_LABELS } from '@/features/budget-comparison/lib/content';
import { getMetricToneStyle } from '@/features/budget-comparison/lib/styles';

export default function BudgetGlance() {
  return (
    <section id="at-a-glance" aria-labelledby="at-a-glance-heading" className="scroll-mt-24">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.62fr)_minmax(0,1.8fr)] lg:items-start lg:gap-12">
        <div>
          <p className="font-bold text-emerald-700 text-xs uppercase tracking-[0.16em]">
            At a glance
          </p>
          <BudgetSectionHeading id="at-a-glance-heading">
            {BUDGET_PAGE_LABELS.glanceTitle}
          </BudgetSectionHeading>
          <p className="-mt-2 max-w-md text-[15px] text-slate-600 leading-relaxed">
            {BUDGET_PAGE_LABELS.glanceDescription}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {BUDGET_METRICS.map((metric) => {
            const Icon = metric.icon;
            const toneStyle = getMetricToneStyle(metric.tone);
            const ChangeIcon = toneStyle.icon;

            return (
              <article
                key={metric.id}
                className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-slate-900/5 shadow-sm sm:p-6"
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-8 w-8 text-emerald-800" strokeWidth={1.6} aria-hidden="true" />
                  <h3 className="font-bold text-base text-slate-900 leading-5">{metric.label}</h3>
                </div>
                <div className="mt-5 flex items-end justify-between gap-4">
                  <div>
                    <p className="font-bold text-slate-900 text-xl">{metric.previousValue}</p>
                    <p className="mt-1 text-slate-500 text-xs">{metric.previousLabel}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-slate-900 text-xl">{metric.currentValue}</p>
                    <p className="mt-1 text-slate-500 text-xs">{metric.currentLabel}</p>
                  </div>
                </div>
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
      </div>
    </section>
  );
}
