import SourcesCard from '@/components/calculator/SourcesCard';

import { SALARY_GUIDE_COPY, SALARY_SOURCE_LINKS } from '@/features/salary-tax/lib/content';

export default function SalarySources() {
  return (
    <SourcesCard
      headingId="salary-sources-heading"
      title={SALARY_GUIDE_COPY.sourcesTitle}
      description={SALARY_GUIDE_COPY.sourcesDescription}
      links={SALARY_SOURCE_LINKS}
      reviewedLabel={SALARY_GUIDE_COPY.reviewedLabel}
      reviewedDateTime={SALARY_GUIDE_COPY.reviewedDateTime}
    />
  );
}
