import OfficialSourcesSection from '@/components/calculator/OfficialSourcesSection';

import { OFFICIAL_SOURCES_COPY } from '@/lib/officialSources';

import { CORPORATE_GUIDE_COPY } from '@/features/corporate-tax/lib/content';
import { CORPORATE_OFFICIAL_SOURCES } from '@/features/corporate-tax/lib/modeContent';
import type { CorporateMode } from '@/features/corporate-tax/types';

interface CorporateOfficialSourcesProps {
  mode: CorporateMode;
}

export default function CorporateOfficialSources({ mode }: CorporateOfficialSourcesProps) {
  return (
    <OfficialSourcesSection
      id="corporate-official-sources"
      eyebrow={OFFICIAL_SOURCES_COPY.eyebrow}
      title={OFFICIAL_SOURCES_COPY.title}
      description={OFFICIAL_SOURCES_COPY.description}
      sources={CORPORATE_OFFICIAL_SOURCES[mode]}
      reviewedLabel={CORPORATE_GUIDE_COPY.reviewedLabel}
      reviewedDateTime={CORPORATE_GUIDE_COPY.reviewedDateTime}
    />
  );
}
