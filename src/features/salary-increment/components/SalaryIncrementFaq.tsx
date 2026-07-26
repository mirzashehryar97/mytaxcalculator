import CalculatorFaq from '@/components/calculator/CalculatorFaq';

import {
  SALARY_INCREMENT_FAQS,
  SALARY_INCREMENT_GUIDE_COPY,
} from '@/features/salary-increment/lib/content';

export default function SalaryIncrementFaq() {
  return (
    <CalculatorFaq
      headingId="salary-increment-faq-heading"
      eyebrow={SALARY_INCREMENT_GUIDE_COPY.faqEyebrow}
      title={SALARY_INCREMENT_GUIDE_COPY.faqTitle}
      description={SALARY_INCREMENT_GUIDE_COPY.faqDescription}
      disclaimer={SALARY_INCREMENT_GUIDE_COPY.estimateDisclaimer}
      items={SALARY_INCREMENT_FAQS}
    />
  );
}
