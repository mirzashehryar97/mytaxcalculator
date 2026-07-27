import ResultCard from '@/components/calculator/ResultCard';

import type { EmbedSalaryTaxPeriodPresentation } from '@/features/embed-salary-tax/types';

interface EmbedSalaryTaxResultColumnProps {
  presentation: EmbedSalaryTaxPeriodPresentation;
}

export default function EmbedSalaryTaxResultColumn({
  presentation,
}: EmbedSalaryTaxResultColumnProps) {
  return (
    <article className="min-w-0 overflow-hidden rounded-2xl border border-emerald-100 bg-white">
      <h3 className="border-emerald-100 border-b bg-emerald-50 px-4 py-3 font-bold text-emerald-800 text-sm uppercase tracking-wider">
        {presentation.title}
      </h3>
      <div className="px-4">
        <ResultCard
          label={presentation.grossLabel}
          value={presentation.grossValue}
          tone="neutral"
          weight="semibold"
        />
        <ResultCard
          label={presentation.taxLabel}
          value={presentation.taxValue}
          tone="negative"
          weight="semibold"
          highlight
        />
      </div>
      <div className="mx-3 mb-3 rounded-xl border border-emerald-300 bg-emerald-50 px-3">
        <ResultCard
          label={presentation.takeHomeLabel}
          value={presentation.takeHomeValue}
          tone="positive"
          weight="bold"
          highlight
          last
        />
      </div>
    </article>
  );
}
