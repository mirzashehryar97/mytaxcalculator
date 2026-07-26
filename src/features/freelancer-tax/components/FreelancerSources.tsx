import SourcesCard from '@/components/calculator/SourcesCard';

import {
  FREELANCER_GUIDE_COPY,
  FREELANCER_SOURCE_LINKS,
} from '@/features/freelancer-tax/lib/content';

export default function FreelancerSources() {
  return (
    <SourcesCard
      headingId="freelancer-sources-heading"
      title={FREELANCER_GUIDE_COPY.sourcesTitle}
      description={FREELANCER_GUIDE_COPY.sourcesDescription}
      links={FREELANCER_SOURCE_LINKS}
      reviewedLabel={FREELANCER_GUIDE_COPY.reviewedLabel}
      reviewedDateTime={FREELANCER_GUIDE_COPY.reviewedDateTime}
    />
  );
}
