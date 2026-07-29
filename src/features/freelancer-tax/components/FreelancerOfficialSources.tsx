import OfficialSourcesSection from '@/components/calculator/OfficialSourcesSection';

import { OFFICIAL_SOURCES_COPY } from '@/lib/officialSources';

import {
  FREELANCER_GUIDE_COPY,
  FREELANCER_OFFICIAL_SOURCES,
} from '@/features/freelancer-tax/lib/content';

export default function FreelancerOfficialSources() {
  return (
    <OfficialSourcesSection
      id="freelancer-official-sources"
      eyebrow={OFFICIAL_SOURCES_COPY.eyebrow}
      title={OFFICIAL_SOURCES_COPY.title}
      description={OFFICIAL_SOURCES_COPY.description}
      sources={FREELANCER_OFFICIAL_SOURCES}
      columns={2}
      reviewedLabel={FREELANCER_GUIDE_COPY.reviewedLabel}
      reviewedDateTime={FREELANCER_GUIDE_COPY.reviewedDateTime}
    />
  );
}
