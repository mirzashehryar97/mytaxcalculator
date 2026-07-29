import OfficialSourcesSection from '@/components/calculator/OfficialSourcesSection';

import { OFFICIAL_SOURCES_COPY } from '@/lib/officialSources';

import {
  RENTAL_GUIDE_COPY,
  RENTAL_OFFICIAL_SOURCES,
} from '@/features/rental-income-tax/lib/content';

export default function RentalOfficialSources() {
  return (
    <OfficialSourcesSection
      id="rental-official-sources"
      eyebrow={OFFICIAL_SOURCES_COPY.eyebrow}
      title={OFFICIAL_SOURCES_COPY.title}
      description={OFFICIAL_SOURCES_COPY.description}
      sources={RENTAL_OFFICIAL_SOURCES}
      columns={2}
      reviewedLabel={RENTAL_GUIDE_COPY.reviewedLabel}
      reviewedDateTime={RENTAL_GUIDE_COPY.reviewedDateTime}
    />
  );
}
