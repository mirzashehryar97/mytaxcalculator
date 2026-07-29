import OfficialSourcesSection from '@/components/calculator/OfficialSourcesSection';

import { OFFICIAL_SOURCES_COPY, SALARY_OFFICIAL_SOURCES } from '@/lib/officialSources';

import { JOB_OFFER_COMPARISON_GUIDE_COPY } from '@/features/salary-increment/lib/content';

export default function JobOfferComparisonOfficialSources() {
  return (
    <OfficialSourcesSection
      id="job-offer-comparison-official-sources"
      eyebrow={OFFICIAL_SOURCES_COPY.eyebrow}
      title={OFFICIAL_SOURCES_COPY.title}
      description={OFFICIAL_SOURCES_COPY.description}
      sources={SALARY_OFFICIAL_SOURCES}
      reviewedLabel={JOB_OFFER_COMPARISON_GUIDE_COPY.reviewedLabel}
      reviewedDateTime={JOB_OFFER_COMPARISON_GUIDE_COPY.reviewedDateTime}
    />
  );
}
