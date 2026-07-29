import BudgetDetailComparison from '@/features/budget-comparison/components/BudgetDetailComparison';
import {
  SOLAR_COMPARISON,
  SOLAR_COMPARISON_NOTE,
  SOLAR_PAGE_LABELS,
} from '@/features/budget-comparison/lib/solarContent';

export default function SolarComparison() {
  return (
    <BudgetDetailComparison
      sectionId="comparison"
      headingId="solar-comparison-heading"
      heading={SOLAR_PAGE_LABELS.comparisonTitle}
      rows={SOLAR_COMPARISON}
      note={SOLAR_COMPARISON_NOTE}
    />
  );
}
