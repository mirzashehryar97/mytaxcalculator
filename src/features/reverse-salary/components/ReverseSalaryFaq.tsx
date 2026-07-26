import CalculatorFaq from '@/components/calculator/CalculatorFaq';

import {
  REVERSE_SALARY_FAQS,
  REVERSE_SALARY_GUIDE_COPY,
} from '@/features/reverse-salary/lib/content';

export default function ReverseSalaryFaq() {
  return (
    <CalculatorFaq
      headingId="reverse-salary-faq-heading"
      eyebrow={REVERSE_SALARY_GUIDE_COPY.faqEyebrow}
      title={REVERSE_SALARY_GUIDE_COPY.faqTitle}
      description={REVERSE_SALARY_GUIDE_COPY.faqDescription}
      disclaimer={REVERSE_SALARY_GUIDE_COPY.estimateDisclaimer}
      items={REVERSE_SALARY_FAQS}
    />
  );
}
