import BudgetDetailMetrics from '@/features/budget-comparison/components/BudgetDetailMetrics';
import {
  VEHICLES_METRICS,
  VEHICLES_PAGE_LABELS,
} from '@/features/budget-comparison/lib/vehiclesContent';

export default function VehiclesOverview() {
  return (
    <BudgetDetailMetrics
      sectionId="overview"
      headingId="vehicles-overview-heading"
      heading={VEHICLES_PAGE_LABELS.overviewTitle}
      metrics={VEHICLES_METRICS}
    />
  );
}
