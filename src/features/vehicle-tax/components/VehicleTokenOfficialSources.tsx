import OfficialSourcesSection from '@/components/calculator/OfficialSourcesSection';

import {
  VEHICLE_GUIDE_COPY,
  VEHICLE_TOKEN_OFFICIAL_SOURCES,
  VEHICLE_TOKEN_SOURCES_COPY,
} from '@/features/vehicle-tax/lib/content';

export default function VehicleTokenOfficialSources() {
  return (
    <OfficialSourcesSection
      id="vehicle-token-official-sources"
      eyebrow={VEHICLE_TOKEN_SOURCES_COPY.eyebrow}
      title={VEHICLE_TOKEN_SOURCES_COPY.title}
      description={VEHICLE_TOKEN_SOURCES_COPY.description}
      sources={VEHICLE_TOKEN_OFFICIAL_SOURCES}
      columns={2}
      reviewedLabel={VEHICLE_GUIDE_COPY.reviewedLabel}
      reviewedDateTime={VEHICLE_GUIDE_COPY.reviewedDateTime}
    />
  );
}
