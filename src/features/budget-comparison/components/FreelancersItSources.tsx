import BudgetDetailSources from '@/features/budget-comparison/components/BudgetDetailSources';
import {
  FREELANCERS_IT_PAGE_LABELS,
  FREELANCERS_IT_SOURCES,
} from '@/features/budget-comparison/lib/freelancersItContent';

export default function FreelancersItSources() {
  return (
    <BudgetDetailSources
      headingId="freelancers-it-sources-heading"
      heading={FREELANCERS_IT_PAGE_LABELS.sourcesTitle}
      sources={FREELANCERS_IT_SOURCES}
    />
  );
}
