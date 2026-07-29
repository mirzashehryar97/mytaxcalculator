import BudgetDetailSources from '@/features/budget-comparison/components/BudgetDetailSources';
import { SOLAR_PAGE_LABELS, SOLAR_SOURCES } from '@/features/budget-comparison/lib/solarContent';

export default function SolarSources() {
  return (
    <BudgetDetailSources
      headingId="solar-sources-heading"
      heading={SOLAR_PAGE_LABELS.sourcesTitle}
      sources={SOLAR_SOURCES}
    />
  );
}
