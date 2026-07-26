import SourcesCard from '@/components/calculator/SourcesCard';

import {
  JOB_OFFER_COMPARISON_GUIDE_COPY,
  SALARY_INCREMENT_SOURCE_LINKS,
} from '@/features/salary-increment/lib/content';

export default function JobOfferComparisonSources() {
  return (
    <SourcesCard
      headingId="job-offer-comparison-sources-heading"
      title={JOB_OFFER_COMPARISON_GUIDE_COPY.sourcesTitle}
      description={JOB_OFFER_COMPARISON_GUIDE_COPY.sourcesDescription}
      links={SALARY_INCREMENT_SOURCE_LINKS}
      reviewedLabel={JOB_OFFER_COMPARISON_GUIDE_COPY.reviewedLabel}
      reviewedDateTime={JOB_OFFER_COMPARISON_GUIDE_COPY.reviewedDateTime}
    />
  );
}
