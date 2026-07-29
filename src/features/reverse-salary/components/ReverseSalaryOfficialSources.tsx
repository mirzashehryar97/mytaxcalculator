import OfficialSourcesSection from '@/components/calculator/OfficialSourcesSection';

import { OFFICIAL_SOURCES_COPY, SALARY_OFFICIAL_SOURCES } from '@/lib/officialSources';

import { REVERSE_SALARY_GUIDE_COPY } from '@/features/reverse-salary/lib/content';

export default function ReverseSalaryOfficialSources() {
  return (
    <OfficialSourcesSection
      id="reverse-salary-official-sources"
      eyebrow={OFFICIAL_SOURCES_COPY.eyebrow}
      title={OFFICIAL_SOURCES_COPY.title}
      description={OFFICIAL_SOURCES_COPY.description}
      sources={SALARY_OFFICIAL_SOURCES}
      reviewedLabel={REVERSE_SALARY_GUIDE_COPY.reviewedLabel}
      reviewedDateTime={REVERSE_SALARY_GUIDE_COPY.reviewedDateTime}
    />
  );
}
