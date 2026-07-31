import OfficialSourcesSection from '@/components/calculator/OfficialSourcesSection';

import { OFFICIAL_SOURCES_COPY } from '@/lib/officialSources';

import {
  WITHHOLDING_GUIDE_COPY,
  WITHHOLDING_OFFICIAL_SOURCES,
} from '@/features/withholding-tax/lib/content';
import type { WithholdingMode } from '@/features/withholding-tax/types';

interface WithholdingOfficialSourcesProps {
  mode: WithholdingMode;
}

export default function WithholdingOfficialSources({ mode }: WithholdingOfficialSourcesProps) {
  return (
    <OfficialSourcesSection
      id={`withholding-${mode}-official-sources`}
      eyebrow={OFFICIAL_SOURCES_COPY.eyebrow}
      title={OFFICIAL_SOURCES_COPY.title}
      description={OFFICIAL_SOURCES_COPY.description}
      sources={WITHHOLDING_OFFICIAL_SOURCES[mode]}
      reviewedLabel={WITHHOLDING_GUIDE_COPY.reviewedLabel}
      reviewedDateTime={WITHHOLDING_GUIDE_COPY.reviewedDateTime}
    />
  );
}
