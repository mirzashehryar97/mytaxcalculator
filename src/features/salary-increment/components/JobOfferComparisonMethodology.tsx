import CalculatorMethodology from '@/components/calculator/CalculatorMethodology';

import { JOB_OFFER_COMPARISON_METHODOLOGY_COPY } from '@/features/salary-increment/lib/content';

export default function JobOfferComparisonMethodology() {
  return (
    <CalculatorMethodology
      headingId="job-offer-comparison-methodology-heading"
      eyebrow={JOB_OFFER_COMPARISON_METHODOLOGY_COPY.eyebrow}
      title={JOB_OFFER_COMPARISON_METHODOLOGY_COPY.title}
      description={JOB_OFFER_COMPARISON_METHODOLOGY_COPY.description}
      items={JOB_OFFER_COMPARISON_METHODOLOGY_COPY.items}
    />
  );
}
