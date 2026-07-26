import CalculatorMethodology from '@/components/calculator/CalculatorMethodology';

import { SALARY_INCREMENT_METHODOLOGY_COPY } from '@/features/salary-increment/lib/content';

export default function SalaryIncrementMethodology() {
  return (
    <CalculatorMethodology
      headingId="salary-increment-methodology-heading"
      eyebrow={SALARY_INCREMENT_METHODOLOGY_COPY.eyebrow}
      title={SALARY_INCREMENT_METHODOLOGY_COPY.title}
      description={SALARY_INCREMENT_METHODOLOGY_COPY.description}
      items={SALARY_INCREMENT_METHODOLOGY_COPY.items}
    />
  );
}
