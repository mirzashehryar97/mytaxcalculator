import BudgetDetailComparison from '@/features/budget-comparison/components/BudgetDetailComparison';
import {
  DEFENCE_COMPARISON,
  DEFENCE_COMPARISON_NOTE,
  DEFENCE_PAGE_LABELS,
} from '@/features/budget-comparison/lib/defenceContent';

export default function DefenceComparison() {
  return (
    <BudgetDetailComparison
      sectionId="comparison"
      headingId="defence-comparison-heading"
      heading={DEFENCE_PAGE_LABELS.comparisonTitle}
      rows={DEFENCE_COMPARISON}
      note={DEFENCE_COMPARISON_NOTE}
    />
  );
}
