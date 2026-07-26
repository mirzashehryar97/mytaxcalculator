import CalculatorHero from '@/components/calculator/CalculatorHero';

import { SALARY_INCREMENT_PAGE_COPY } from '@/features/salary-increment/lib/content';

export default function SalaryIncrementHero() {
  return (
    <CalculatorHero
      eyebrow={SALARY_INCREMENT_PAGE_COPY.eyebrow}
      title={SALARY_INCREMENT_PAGE_COPY.title}
      subtitle={SALARY_INCREMENT_PAGE_COPY.subtitle}
    />
  );
}
