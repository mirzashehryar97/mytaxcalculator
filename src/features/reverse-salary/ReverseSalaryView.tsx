import RelatedCalculators from '@/components/calculator/RelatedCalculators';

import ReverseSalaryCalculator from '@/features/reverse-salary/components/ReverseSalaryCalculator';
import ReverseSalaryFaq from '@/features/reverse-salary/components/ReverseSalaryFaq';
import ReverseSalaryHero from '@/features/reverse-salary/components/ReverseSalaryHero';
import ReverseSalaryMethodology from '@/features/reverse-salary/components/ReverseSalaryMethodology';
import ReverseSalarySources from '@/features/reverse-salary/components/ReverseSalarySources';
import { REVERSE_SALARY_ROUTE } from '@/features/reverse-salary/lib/content';

export default function ReverseSalaryView() {
  return (
    <>
      <ReverseSalaryHero />
      <ReverseSalaryCalculator />
      <ReverseSalaryMethodology />
      <ReverseSalarySources />
      <ReverseSalaryFaq />
      <RelatedCalculators currentHref={REVERSE_SALARY_ROUTE} />
    </>
  );
}
