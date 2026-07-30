import CalculatorFaq from '@/components/calculator/CalculatorFaq';

import {
  PROPERTY_FAQS,
  PROPERTY_PAGE_COPY,
  PROPERTY_SECTION_COPY,
} from '@/features/property-tax/lib/content';
import type { PropertyMode } from '@/features/property-tax/types';

interface PropertyFaqProps {
  mode: PropertyMode;
}

export default function PropertyFaq({ mode }: PropertyFaqProps) {
  return (
    <CalculatorFaq
      headingId="property-faq-heading"
      eyebrow={PROPERTY_SECTION_COPY.faqEyebrow}
      title={PROPERTY_SECTION_COPY.faqTitle}
      description={PROPERTY_SECTION_COPY.faqDescription}
      disclaimer={PROPERTY_PAGE_COPY[mode].bottomDisclaimer}
      items={PROPERTY_FAQS[mode]}
    />
  );
}
