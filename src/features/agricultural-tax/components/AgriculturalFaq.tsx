import CalculatorFaq from '@/components/calculator/CalculatorFaq';

import {
  AGRICULTURAL_FAQS,
  AGRICULTURAL_GUIDE_COPY,
  AGRICULTURAL_PAGE_COPY,
} from '@/features/agricultural-tax/lib/content';

export default function AgriculturalFaq() {
  return (
    <CalculatorFaq
      headingId="agricultural-faq-heading"
      eyebrow={AGRICULTURAL_GUIDE_COPY.faqEyebrow}
      title={AGRICULTURAL_GUIDE_COPY.faqTitle}
      description={AGRICULTURAL_GUIDE_COPY.faqDescription}
      disclaimer={AGRICULTURAL_PAGE_COPY.bottomDisclaimer}
      items={AGRICULTURAL_FAQS}
    />
  );
}
