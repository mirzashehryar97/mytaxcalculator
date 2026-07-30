import OfficialSourcesSection from '@/components/calculator/OfficialSourcesSection';

import { OFFICIAL_SOURCES_COPY } from '@/lib/officialSources';

import {
  VEHICLE_GUIDE_COPY,
  VEHICLE_REGISTRATION_OFFICIAL_SOURCES,
} from '@/features/vehicle-tax/lib/content';

export default function VehicleRegistrationOfficialSources() {
  return (
    <OfficialSourcesSection
      id="vehicle-registration-official-sources"
      eyebrow={OFFICIAL_SOURCES_COPY.eyebrow}
      title={OFFICIAL_SOURCES_COPY.title}
      description={OFFICIAL_SOURCES_COPY.description}
      sources={VEHICLE_REGISTRATION_OFFICIAL_SOURCES}
      columns={2}
      reviewedLabel={VEHICLE_GUIDE_COPY.reviewedLabel}
      reviewedDateTime={VEHICLE_GUIDE_COPY.reviewedDateTime}
    />
  );
}
