import SalaryComparisonPage from '@/features/salary-increment/components/SalaryComparisonPage';
import SalaryIncrementFaq from '@/features/salary-increment/components/SalaryIncrementFaq';
import SalaryIncrementHero from '@/features/salary-increment/components/SalaryIncrementHero';
import SalaryIncrementMethodology from '@/features/salary-increment/components/SalaryIncrementMethodology';
import SalaryIncrementSources from '@/features/salary-increment/components/SalaryIncrementSources';
import { SALARY_INCREMENT_ROUTE } from '@/features/salary-increment/lib/content';

export default function SalaryIncrementView() {
  return (
    <SalaryComparisonPage
      mode="increment"
      currentHref={SALARY_INCREMENT_ROUTE}
      hero={<SalaryIncrementHero />}
      methodology={<SalaryIncrementMethodology />}
      sources={<SalaryIncrementSources />}
      faq={<SalaryIncrementFaq />}
    />
  );
}
