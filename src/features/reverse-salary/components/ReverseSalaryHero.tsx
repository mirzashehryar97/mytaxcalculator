import CalculatorHero from '@/components/calculator/CalculatorHero';

import { REVERSE_SALARY_PAGE_COPY } from '@/features/reverse-salary/lib/content';

export default function ReverseSalaryHero() {
  return (
    <CalculatorHero
      eyebrow={REVERSE_SALARY_PAGE_COPY.eyebrow}
      title={REVERSE_SALARY_PAGE_COPY.title}
      subtitle={REVERSE_SALARY_PAGE_COPY.subtitle}
    />
  );
}
