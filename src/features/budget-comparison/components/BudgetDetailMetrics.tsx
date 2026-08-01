import type { BudgetDetailMetric } from '@/features/budget-comparison/types';

interface BudgetDetailMetricsProps {
  sectionId: string;
  headingId: string;
  heading: string;
  metrics: readonly BudgetDetailMetric[];
}

export default function BudgetDetailMetrics({
  sectionId,
  headingId,
  heading,
  metrics,
}: BudgetDetailMetricsProps) {
  return (
    <section id={sectionId} aria-labelledby={headingId} className="scroll-mt-24">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.62fr)_minmax(0,1.8fr)] lg:items-start lg:gap-12">
        <div>
          <p className="font-bold text-emerald-700 text-xs uppercase tracking-[0.16em]">
            At a glance
          </p>
          <h2
            id={headingId}
            className="mt-3 font-bold text-2xl text-slate-900 tracking-tight sm:text-3xl"
          >
            {heading}
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {metrics.map((metric) => {
            const Icon = metric.icon;

            return (
              <article
                key={metric.id}
                className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-slate-900/5 shadow-sm sm:p-6"
              >
                <Icon className="h-8 w-8 text-emerald-800" strokeWidth={1.6} aria-hidden="true" />
                <p className="mt-5 font-bold text-2xl text-slate-900 leading-tight">
                  {metric.value}
                </p>
                <p className="mt-2 text-[15px] text-slate-600 leading-relaxed">{metric.label}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
