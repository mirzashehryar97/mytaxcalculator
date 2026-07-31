import OfficialSourcesSection from '@/components/calculator/OfficialSourcesSection';

import {
  AGRICULTURAL_GUIDE_COPY,
  AGRICULTURAL_OFFICIAL_SOURCES,
  AGRICULTURAL_SOURCES_COPY,
} from '@/features/agricultural-tax/lib/content';

export default function AgriculturalOfficialSources() {
  return (
    <OfficialSourcesSection
      id="agricultural-official-sources"
      eyebrow={AGRICULTURAL_SOURCES_COPY.eyebrow}
      title={AGRICULTURAL_SOURCES_COPY.title}
      description={AGRICULTURAL_SOURCES_COPY.description}
      sources={AGRICULTURAL_OFFICIAL_SOURCES}
      reviewedLabel={AGRICULTURAL_GUIDE_COPY.reviewedLabel}
      reviewedDateTime={AGRICULTURAL_GUIDE_COPY.reviewedDateTime}
    />
  );
}
