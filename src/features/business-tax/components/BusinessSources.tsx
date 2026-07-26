import SourcesCard from '@/components/calculator/SourcesCard';

import { BUSINESS_GUIDE_COPY, BUSINESS_SOURCE_LINKS } from '@/features/business-tax/lib/content';

export default function BusinessSources() {
  return (
    <SourcesCard
      headingId="business-sources-heading"
      title={BUSINESS_GUIDE_COPY.sourcesTitle}
      description={BUSINESS_GUIDE_COPY.sourcesDescription}
      links={BUSINESS_SOURCE_LINKS}
      reviewedLabel={BUSINESS_GUIDE_COPY.reviewedLabel}
      reviewedDateTime={BUSINESS_GUIDE_COPY.reviewedDateTime}
    />
  );
}
