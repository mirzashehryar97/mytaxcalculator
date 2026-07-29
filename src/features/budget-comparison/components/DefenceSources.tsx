import BudgetDetailSources from '@/features/budget-comparison/components/BudgetDetailSources';
import {
  DEFENCE_PAGE_LABELS,
  DEFENCE_SOURCES,
} from '@/features/budget-comparison/lib/defenceContent';

export default function DefenceSources() {
  return (
    <BudgetDetailSources
      headingId="defence-sources-heading"
      heading={DEFENCE_PAGE_LABELS.sourcesTitle}
      sources={DEFENCE_SOURCES}
    />
  );
}
