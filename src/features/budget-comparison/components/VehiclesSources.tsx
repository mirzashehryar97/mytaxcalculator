import BudgetDetailSources from '@/features/budget-comparison/components/BudgetDetailSources';
import {
  VEHICLES_PAGE_LABELS,
  VEHICLES_SOURCES,
} from '@/features/budget-comparison/lib/vehiclesContent';

export default function VehiclesSources() {
  return (
    <BudgetDetailSources
      headingId="vehicles-sources-heading"
      heading={VEHICLES_PAGE_LABELS.sourcesTitle}
      sources={VEHICLES_SOURCES}
    />
  );
}
