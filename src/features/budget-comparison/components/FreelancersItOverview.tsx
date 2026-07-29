import BudgetDetailMetrics from '@/features/budget-comparison/components/BudgetDetailMetrics';
import { FREELANCERS_IT_METRICS } from '@/features/budget-comparison/lib/freelancersItContent';

export default function FreelancersItOverview() {
  return (
    <BudgetDetailMetrics
      sectionId="overview"
      headingId="freelancers-it-overview-heading"
      heading="Freelancers and IT budget changes overview"
      metrics={FREELANCERS_IT_METRICS}
    />
  );
}
