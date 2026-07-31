import OfficialSourcesSection from '@/components/calculator/OfficialSourcesSection';

import { OFFICIAL_SOURCES_COPY } from '@/lib/officialSources';

import {
  CAPITAL_GAINS_GUIDE_COPY,
  CAPITAL_GAINS_OFFICIAL_SOURCES,
} from '@/features/capital-gains-tax/lib/content';
import type { CapitalGainsMode } from '@/features/capital-gains-tax/types';

interface CapitalGainsOfficialSourcesProps {
  mode: CapitalGainsMode;
}

export default function CapitalGainsOfficialSources({ mode }: CapitalGainsOfficialSourcesProps) {
  return (
    <OfficialSourcesSection
      id={`capital-gains-${mode}-official-sources`}
      eyebrow={OFFICIAL_SOURCES_COPY.eyebrow}
      title={OFFICIAL_SOURCES_COPY.title}
      description={OFFICIAL_SOURCES_COPY.description}
      sources={CAPITAL_GAINS_OFFICIAL_SOURCES}
      reviewedLabel={CAPITAL_GAINS_GUIDE_COPY.reviewedLabel}
      reviewedDateTime={CAPITAL_GAINS_GUIDE_COPY.reviewedDateTime}
    />
  );
}
