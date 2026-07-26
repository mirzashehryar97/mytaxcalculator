import CalculatorFaq from '@/components/calculator/CalculatorFaq';

import {
  JOB_OFFER_COMPARISON_FAQS,
  JOB_OFFER_COMPARISON_GUIDE_COPY,
} from '@/features/salary-increment/lib/content';

export default function JobOfferComparisonFaq() {
  return (
    <CalculatorFaq
      headingId="job-offer-comparison-faq-heading"
      eyebrow={JOB_OFFER_COMPARISON_GUIDE_COPY.faqEyebrow}
      title={JOB_OFFER_COMPARISON_GUIDE_COPY.faqTitle}
      description={JOB_OFFER_COMPARISON_GUIDE_COPY.faqDescription}
      disclaimer={JOB_OFFER_COMPARISON_GUIDE_COPY.estimateDisclaimer}
      items={JOB_OFFER_COMPARISON_FAQS}
    />
  );
}
