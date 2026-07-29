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
      <h2 id={headingId} className="sr-only">
        {heading}
      </h2>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <article
              key={metric.id}
              className="rounded-xl border-[1.5px] border-slate-300 bg-white p-4 shadow-sm sm:p-5"
            >
              <Icon className="h-9 w-9 text-emerald-800" strokeWidth={1.7} aria-hidden="true" />
              <p className="mt-4 font-bold text-2xl text-[#0b1736] leading-tight">{metric.value}</p>
              <p className="mt-1 text-base text-slate-700 leading-6">{metric.label}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
