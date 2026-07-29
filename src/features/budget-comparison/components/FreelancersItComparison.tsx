import BudgetDetailComparison from '@/features/budget-comparison/components/BudgetDetailComparison';
import {
  FREELANCERS_IT_COMPARISON,
  FREELANCERS_IT_COMPARISON_NOTE,
  FREELANCERS_IT_PAGE_LABELS,
} from '@/features/budget-comparison/lib/freelancersItContent';

export default function FreelancersItComparison() {
  return (
    <BudgetDetailComparison
      sectionId="comparison"
      headingId="freelancers-it-comparison-heading"
      heading={FREELANCERS_IT_PAGE_LABELS.comparisonTitle}
      rows={FREELANCERS_IT_COMPARISON}
      note={FREELANCERS_IT_COMPARISON_NOTE}
    />
  );
}
