import BudgetDetailMetrics from '@/features/budget-comparison/components/BudgetDetailMetrics';
import {
  PROPERTY_METRICS,
  PROPERTY_PAGE_LABELS,
} from '@/features/budget-comparison/lib/propertyContent';

export default function PropertyOverview() {
  return (
    <BudgetDetailMetrics
      sectionId="overview"
      headingId="property-overview-heading"
      heading={PROPERTY_PAGE_LABELS.overviewTitle}
      metrics={PROPERTY_METRICS}
    />
  );
}
