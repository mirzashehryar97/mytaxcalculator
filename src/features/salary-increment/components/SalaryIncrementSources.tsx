import SourcesCard from '@/components/calculator/SourcesCard';

import {
  SALARY_INCREMENT_GUIDE_COPY,
  SALARY_INCREMENT_SOURCE_LINKS,
} from '@/features/salary-increment/lib/content';

export default function SalaryIncrementSources() {
  return (
    <SourcesCard
      headingId="salary-increment-sources-heading"
      title={SALARY_INCREMENT_GUIDE_COPY.sourcesTitle}
      description={SALARY_INCREMENT_GUIDE_COPY.sourcesDescription}
      links={SALARY_INCREMENT_SOURCE_LINKS}
      reviewedLabel={SALARY_INCREMENT_GUIDE_COPY.reviewedLabel}
      reviewedDateTime={SALARY_INCREMENT_GUIDE_COPY.reviewedDateTime}
    />
  );
}
