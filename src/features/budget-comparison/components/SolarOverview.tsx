import BudgetDetailMetrics from '@/features/budget-comparison/components/BudgetDetailMetrics';
import { SOLAR_METRICS, SOLAR_PAGE_LABELS } from '@/features/budget-comparison/lib/solarContent';

export default function SolarOverview() {
  return (
    <BudgetDetailMetrics
      sectionId="overview"
      headingId="solar-overview-heading"
      heading={SOLAR_PAGE_LABELS.overviewTitle}
      metrics={SOLAR_METRICS}
    />
  );
}
