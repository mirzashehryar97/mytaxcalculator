import BudgetSectionHeading from '@/features/budget-comparison/components/BudgetSectionHeading';
import BudgetSourceGrid from '@/features/budget-comparison/components/BudgetSourceGrid';
import { BUDGET_PAGE_LABELS, BUDGET_SOURCES } from '@/features/budget-comparison/lib/content';

export default function BudgetOfficialSources() {
  return (
    <section
      id="official-sources"
      aria-labelledby="official-sources-heading"
      className="scroll-mt-24"
    >
      <BudgetSectionHeading id="official-sources-heading">
        {BUDGET_PAGE_LABELS.sourcesTitle}
      </BudgetSectionHeading>
      <BudgetSourceGrid sources={BUDGET_SOURCES} columns={2} />
    </section>
  );
}
