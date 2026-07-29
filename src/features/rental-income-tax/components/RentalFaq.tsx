import CalculatorFaq from '@/components/calculator/CalculatorFaq';

import {
  RENTAL_FAQS,
  RENTAL_PAGE_COPY,
  RENTAL_SECTION_COPY,
} from '@/features/rental-income-tax/lib/content';

export default function RentalFaq() {
  return (
    <CalculatorFaq
      headingId="rental-faq-heading"
      eyebrow={RENTAL_SECTION_COPY.faqEyebrow}
      title={RENTAL_SECTION_COPY.faqTitle}
      description={RENTAL_SECTION_COPY.faqDescription}
      disclaimer={RENTAL_PAGE_COPY.bottomDisclaimer}
      items={RENTAL_FAQS}
    />
  );
}
