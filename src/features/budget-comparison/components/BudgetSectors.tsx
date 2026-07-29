import BudgetSectionHeading from '@/features/budget-comparison/components/BudgetSectionHeading';
import BudgetSectorGrid from '@/features/budget-comparison/components/BudgetSectorGrid';
import {
  BUDGET_PAGE_LABELS,
  BUDGET_SECTOR_SUMMARIES,
} from '@/features/budget-comparison/lib/content';

export default function BudgetSectors() {
  return (
    <section
      id="sector-comparison"
      aria-labelledby="sector-comparison-heading"
      className="scroll-mt-24"
    >
      <BudgetSectionHeading id="sector-comparison-heading">
        {BUDGET_PAGE_LABELS.sectorsTitle}
      </BudgetSectionHeading>
      <BudgetSectorGrid
        sectors={BUDGET_SECTOR_SUMMARIES}
        linkLabel={BUDGET_PAGE_LABELS.sectorLinkLabel}
      />
    </section>
  );
}
