import BudgetDetailMetrics from '@/features/budget-comparison/components/BudgetDetailMetrics';
import {
  BUSINESS_SUPER_TAX_METRICS,
  BUSINESS_SUPER_TAX_PAGE_LABELS,
} from '@/features/budget-comparison/lib/businessSuperTaxContent';

export default function BusinessSuperTaxOverview() {
  return (
    <BudgetDetailMetrics
      sectionId="overview"
      headingId="business-super-tax-overview-heading"
      heading={BUSINESS_SUPER_TAX_PAGE_LABELS.overviewTitle}
      metrics={BUSINESS_SUPER_TAX_METRICS}
    />
  );
}
