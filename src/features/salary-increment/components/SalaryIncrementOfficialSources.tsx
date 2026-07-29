import OfficialSourcesSection from '@/components/calculator/OfficialSourcesSection';

import { OFFICIAL_SOURCES_COPY, SALARY_OFFICIAL_SOURCES } from '@/lib/officialSources';

import { SALARY_INCREMENT_GUIDE_COPY } from '@/features/salary-increment/lib/content';

export default function SalaryIncrementOfficialSources() {
  return (
    <OfficialSourcesSection
      id="salary-increment-official-sources"
      eyebrow={OFFICIAL_SOURCES_COPY.eyebrow}
      title={OFFICIAL_SOURCES_COPY.title}
      description={OFFICIAL_SOURCES_COPY.description}
      sources={SALARY_OFFICIAL_SOURCES}
      reviewedLabel={SALARY_INCREMENT_GUIDE_COPY.reviewedLabel}
      reviewedDateTime={SALARY_INCREMENT_GUIDE_COPY.reviewedDateTime}
    />
  );
}
