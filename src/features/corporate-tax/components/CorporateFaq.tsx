import CalculatorFaq from '@/components/calculator/CalculatorFaq';

import {
  CORPORATE_FAQS,
  CORPORATE_PAGE_COPY,
  CORPORATE_SECTION_COPY,
} from '@/features/corporate-tax/lib/modeContent';
import type { CorporateMode } from '@/features/corporate-tax/types';

interface CorporateFaqProps {
  mode: CorporateMode;
}

export default function CorporateFaq({ mode }: CorporateFaqProps) {
  const sectionCopy = CORPORATE_SECTION_COPY[mode];

  return (
    <CalculatorFaq
      headingId="corporate-faq-heading"
      eyebrow={sectionCopy.faqEyebrow}
      title={sectionCopy.faqTitle}
      description={sectionCopy.faqDescription}
      disclaimer={CORPORATE_PAGE_COPY[mode].bottomDisclaimer}
      items={CORPORATE_FAQS[mode]}
    />
  );
}
