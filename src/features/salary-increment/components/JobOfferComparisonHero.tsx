import CalculatorHero from '@/components/calculator/CalculatorHero';

import { JOB_OFFER_COMPARISON_PAGE_COPY } from '@/features/salary-increment/lib/content';

export default function JobOfferComparisonHero() {
  return (
    <CalculatorHero
      eyebrow={JOB_OFFER_COMPARISON_PAGE_COPY.eyebrow}
      title={JOB_OFFER_COMPARISON_PAGE_COPY.title}
      subtitle={JOB_OFFER_COMPARISON_PAGE_COPY.subtitle}
    />
  );
}
