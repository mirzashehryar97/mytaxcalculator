import CalculatorFaq from '@/components/calculator/CalculatorFaq';

import {
  VEHICLE_REGISTRATION_FAQS,
  VEHICLE_REGISTRATION_PAGE_COPY,
  VEHICLE_REGISTRATION_SECTION_COPY,
} from '@/features/vehicle-tax/lib/content';

export default function VehicleRegistrationFaq() {
  return (
    <CalculatorFaq
      headingId="vehicle-registration-faq-heading"
      eyebrow={VEHICLE_REGISTRATION_SECTION_COPY.faqEyebrow}
      title={VEHICLE_REGISTRATION_SECTION_COPY.faqTitle}
      description={VEHICLE_REGISTRATION_SECTION_COPY.faqDescription}
      disclaimer={VEHICLE_REGISTRATION_PAGE_COPY.bottomDisclaimer}
      items={VEHICLE_REGISTRATION_FAQS}
    />
  );
}
