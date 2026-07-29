import BudgetDetailComparison from '@/features/budget-comparison/components/BudgetDetailComparison';
import {
  VEHICLES_COMPARISON,
  VEHICLES_COMPARISON_NOTE,
  VEHICLES_PAGE_LABELS,
} from '@/features/budget-comparison/lib/vehiclesContent';

export default function VehiclesComparison() {
  return (
    <BudgetDetailComparison
      sectionId="comparison"
      headingId="vehicles-comparison-heading"
      heading={VEHICLES_PAGE_LABELS.comparisonTitle}
      rows={VEHICLES_COMPARISON}
      note={VEHICLES_COMPARISON_NOTE}
    />
  );
}
