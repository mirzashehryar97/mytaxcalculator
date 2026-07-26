import CalculatorMethodology from '@/components/calculator/CalculatorMethodology';

import { REVERSE_SALARY_METHODOLOGY_COPY } from '@/features/reverse-salary/lib/content';

export default function ReverseSalaryMethodology() {
  return (
    <CalculatorMethodology
      headingId="reverse-salary-methodology-heading"
      eyebrow={REVERSE_SALARY_METHODOLOGY_COPY.eyebrow}
      title={REVERSE_SALARY_METHODOLOGY_COPY.title}
      description={REVERSE_SALARY_METHODOLOGY_COPY.description}
      items={REVERSE_SALARY_METHODOLOGY_COPY.items}
    />
  );
}
