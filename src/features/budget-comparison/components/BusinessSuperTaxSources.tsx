import BudgetDetailSources from '@/features/budget-comparison/components/BudgetDetailSources';
import {
  BUSINESS_SUPER_TAX_PAGE_LABELS,
  BUSINESS_SUPER_TAX_SOURCES,
} from '@/features/budget-comparison/lib/businessSuperTaxContent';

export default function BusinessSuperTaxSources() {
  return (
    <BudgetDetailSources
      headingId="business-super-tax-sources-heading"
      heading={BUSINESS_SUPER_TAX_PAGE_LABELS.sourcesTitle}
      sources={BUSINESS_SUPER_TAX_SOURCES}
    />
  );
}
