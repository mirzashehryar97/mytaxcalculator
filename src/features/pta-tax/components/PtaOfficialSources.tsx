import OfficialSourcesSection from '@/components/calculator/OfficialSourcesSection';

import {
  PTA_OFFICIAL_SOURCES,
  PTA_REVIEW_COPY,
  PTA_SOURCES_COPY,
} from '@/features/pta-tax/lib/content';

export default function PtaOfficialSources() {
  return (
    <OfficialSourcesSection
      description={PTA_SOURCES_COPY.description}
      eyebrow={PTA_SOURCES_COPY.eyebrow}
      id="pta-official-sources"
      reviewedDateTime={PTA_REVIEW_COPY.reviewedDateTime}
      reviewedLabel={PTA_REVIEW_COPY.reviewedLabel}
      sources={PTA_OFFICIAL_SOURCES}
      title={PTA_SOURCES_COPY.title}
    />
  );
}
