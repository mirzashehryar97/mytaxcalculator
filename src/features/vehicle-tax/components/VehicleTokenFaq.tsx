import CalculatorFaq from '@/components/calculator/CalculatorFaq';

import {
  VEHICLE_TOKEN_FAQS,
  VEHICLE_TOKEN_PAGE_COPY,
  VEHICLE_TOKEN_SECTION_COPY,
} from '@/features/vehicle-tax/lib/content';

export default function VehicleTokenFaq() {
  return (
    <CalculatorFaq
      headingId="vehicle-token-faq-heading"
      eyebrow={VEHICLE_TOKEN_SECTION_COPY.faqEyebrow}
      title={VEHICLE_TOKEN_SECTION_COPY.faqTitle}
      description={VEHICLE_TOKEN_SECTION_COPY.faqDescription}
      disclaimer={VEHICLE_TOKEN_PAGE_COPY.bottomDisclaimer}
      items={VEHICLE_TOKEN_FAQS}
    />
  );
}
