import BudgetDetailComparison from '@/features/budget-comparison/components/BudgetDetailComparison';
import {
  PROPERTY_COMPARISON,
  PROPERTY_COMPARISON_NOTE,
  PROPERTY_PAGE_LABELS,
} from '@/features/budget-comparison/lib/propertyContent';

export default function PropertyComparison() {
  return (
    <BudgetDetailComparison
      sectionId="comparison"
      headingId="property-comparison-heading"
      heading={PROPERTY_PAGE_LABELS.comparisonTitle}
      rows={PROPERTY_COMPARISON}
      note={PROPERTY_COMPARISON_NOTE}
    />
  );
}
