import RelatedCalculators from '@/components/calculator/RelatedCalculators';

import ReverseSalaryCalculator from '@/features/reverse-salary/components/ReverseSalaryCalculator';
import ReverseSalaryFaq from '@/features/reverse-salary/components/ReverseSalaryFaq';
import ReverseSalaryHero from '@/features/reverse-salary/components/ReverseSalaryHero';
import ReverseSalaryMethodology from '@/features/reverse-salary/components/ReverseSalaryMethodology';
import ReverseSalaryOfficialSources from '@/features/reverse-salary/components/ReverseSalaryOfficialSources';
import { REVERSE_SALARY_ROUTE } from '@/features/reverse-salary/lib/content';

export default function ReverseSalaryView() {
  return (
    <>
      <ReverseSalaryHero />
      <ReverseSalaryCalculator />
      <ReverseSalaryMethodology />
      <ReverseSalaryFaq />
      <RelatedCalculators currentHref={REVERSE_SALARY_ROUTE} />
      <ReverseSalaryOfficialSources />
    </>
  );
}
