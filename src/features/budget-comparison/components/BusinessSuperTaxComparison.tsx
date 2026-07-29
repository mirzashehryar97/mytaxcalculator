import BudgetDetailComparison from '@/features/budget-comparison/components/BudgetDetailComparison';
import {
  BUSINESS_SUPER_TAX_COMPARISON,
  BUSINESS_SUPER_TAX_COMPARISON_NOTE,
  BUSINESS_SUPER_TAX_PAGE_LABELS,
} from '@/features/budget-comparison/lib/businessSuperTaxContent';

export default function BusinessSuperTaxComparison() {
  return (
    <BudgetDetailComparison
      sectionId="comparison"
      headingId="business-super-tax-comparison-heading"
      heading={BUSINESS_SUPER_TAX_PAGE_LABELS.comparisonTitle}
      rows={BUSINESS_SUPER_TAX_COMPARISON}
      note={BUSINESS_SUPER_TAX_COMPARISON_NOTE}
    />
  );
}
