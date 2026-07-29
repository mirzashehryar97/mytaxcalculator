import OfficialSourcesSection from '@/components/calculator/OfficialSourcesSection';

import { OFFICIAL_SOURCES_COPY, SALARY_OFFICIAL_SOURCES } from '@/lib/officialSources';

import { SALARY_GUIDE_COPY } from '@/features/salary-tax/lib/content';

export default function SalaryOfficialSources() {
  return (
    <OfficialSourcesSection
      id="salary-official-sources"
      eyebrow={OFFICIAL_SOURCES_COPY.eyebrow}
      title={OFFICIAL_SOURCES_COPY.title}
      description={OFFICIAL_SOURCES_COPY.description}
      sources={SALARY_OFFICIAL_SOURCES}
      reviewedLabel={SALARY_GUIDE_COPY.reviewedLabel}
      reviewedDateTime={SALARY_GUIDE_COPY.reviewedDateTime}
    />
  );
}
