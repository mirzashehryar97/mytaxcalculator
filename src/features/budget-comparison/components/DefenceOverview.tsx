import BudgetDetailMetrics from '@/features/budget-comparison/components/BudgetDetailMetrics';
import {
  DEFENCE_METRICS,
  DEFENCE_PAGE_LABELS,
} from '@/features/budget-comparison/lib/defenceContent';

export default function DefenceOverview() {
  return (
    <BudgetDetailMetrics
      sectionId="overview"
      headingId="defence-overview-heading"
      heading={DEFENCE_PAGE_LABELS.overviewTitle}
      metrics={DEFENCE_METRICS}
    />
  );
}
