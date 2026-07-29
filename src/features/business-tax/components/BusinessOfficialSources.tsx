import OfficialSourcesSection from '@/components/calculator/OfficialSourcesSection';

import { OFFICIAL_SOURCES_COPY } from '@/lib/officialSources';

import {
  BUSINESS_GUIDE_COPY,
  BUSINESS_OFFICIAL_SOURCES,
} from '@/features/business-tax/lib/content';

export default function BusinessOfficialSources() {
  return (
    <OfficialSourcesSection
      id="business-official-sources"
      eyebrow={OFFICIAL_SOURCES_COPY.eyebrow}
      title={OFFICIAL_SOURCES_COPY.title}
      description={OFFICIAL_SOURCES_COPY.description}
      sources={BUSINESS_OFFICIAL_SOURCES}
      reviewedLabel={BUSINESS_GUIDE_COPY.reviewedLabel}
      reviewedDateTime={BUSINESS_GUIDE_COPY.reviewedDateTime}
    />
  );
}
