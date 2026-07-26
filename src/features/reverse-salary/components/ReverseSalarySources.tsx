import SourcesCard from '@/components/calculator/SourcesCard';

import {
  REVERSE_SALARY_GUIDE_COPY,
  REVERSE_SALARY_SOURCE_LINKS,
} from '@/features/reverse-salary/lib/content';

export default function ReverseSalarySources() {
  return (
    <SourcesCard
      headingId="reverse-salary-sources-heading"
      title={REVERSE_SALARY_GUIDE_COPY.sourcesTitle}
      description={REVERSE_SALARY_GUIDE_COPY.sourcesDescription}
      links={REVERSE_SALARY_SOURCE_LINKS}
      reviewedLabel={REVERSE_SALARY_GUIDE_COPY.reviewedLabel}
      reviewedDateTime={REVERSE_SALARY_GUIDE_COPY.reviewedDateTime}
    />
  );
}
