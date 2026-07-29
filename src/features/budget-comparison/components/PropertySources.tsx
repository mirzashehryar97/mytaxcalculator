import BudgetDetailSources from '@/features/budget-comparison/components/BudgetDetailSources';
import {
  PROPERTY_PAGE_LABELS,
  PROPERTY_SOURCES,
} from '@/features/budget-comparison/lib/propertyContent';

export default function PropertySources() {
  return (
    <BudgetDetailSources
      headingId="property-sources-heading"
      heading={PROPERTY_PAGE_LABELS.sourcesTitle}
      sources={PROPERTY_SOURCES}
    />
  );
}
