import OfficialSourcesSection from '@/components/calculator/OfficialSourcesSection';

import { OFFICIAL_SOURCES_COPY } from '@/lib/officialSources';

import {
  PROPERTY_CGT_OFFICIAL_SOURCES,
  PROPERTY_GUIDE_COPY,
  PROPERTY_TRANSFER_OFFICIAL_SOURCES,
} from '@/features/property-tax/lib/content';
import type { PropertyMode } from '@/features/property-tax/types';

interface PropertyOfficialSourcesProps {
  mode: PropertyMode;
}

export default function PropertyOfficialSources({ mode }: PropertyOfficialSourcesProps) {
  return (
    <OfficialSourcesSection
      id="property-official-sources"
      eyebrow={OFFICIAL_SOURCES_COPY.eyebrow}
      title={OFFICIAL_SOURCES_COPY.title}
      description={OFFICIAL_SOURCES_COPY.description}
      sources={
        mode === 'capital-gains'
          ? PROPERTY_CGT_OFFICIAL_SOURCES
          : PROPERTY_TRANSFER_OFFICIAL_SOURCES
      }
      columns={2}
      reviewedLabel={PROPERTY_GUIDE_COPY.reviewedLabel}
      reviewedDateTime={PROPERTY_GUIDE_COPY.reviewedDateTime}
    />
  );
}
