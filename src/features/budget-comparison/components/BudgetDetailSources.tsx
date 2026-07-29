import BudgetSectionHeading from '@/features/budget-comparison/components/BudgetSectionHeading';
import BudgetSourceGrid from '@/features/budget-comparison/components/BudgetSourceGrid';
import type { BudgetSource } from '@/features/budget-comparison/types';

interface BudgetDetailSourcesProps {
  headingId: string;
  heading: string;
  sources: readonly BudgetSource[];
}

export default function BudgetDetailSources({
  headingId,
  heading,
  sources,
}: BudgetDetailSourcesProps) {
  return (
    <section id="official-sources" aria-labelledby={headingId} className="scroll-mt-24">
      <BudgetSectionHeading id={headingId}>{heading}</BudgetSectionHeading>
      <BudgetSourceGrid sources={sources} columns={2} />
    </section>
  );
}
