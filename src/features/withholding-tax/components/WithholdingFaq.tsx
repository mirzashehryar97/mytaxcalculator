import CalculatorFaq from '@/components/calculator/CalculatorFaq';

import {
  WITHHOLDING_FAQS,
  WITHHOLDING_PAGE_COPY,
  WITHHOLDING_SECTION_COPY,
} from '@/features/withholding-tax/lib/content';
import type { WithholdingMode } from '@/features/withholding-tax/types';

interface WithholdingFaqProps {
  mode: WithholdingMode;
}

export default function WithholdingFaq({ mode }: WithholdingFaqProps) {
  const copy = WITHHOLDING_SECTION_COPY[mode];

  return (
    <CalculatorFaq
      headingId={`withholding-${mode}-faq-heading`}
      eyebrow={copy.faqEyebrow}
      title={copy.faqTitle}
      description={copy.faqDescription}
      disclaimer={WITHHOLDING_PAGE_COPY[mode].bottomDisclaimer}
      items={WITHHOLDING_FAQS[mode]}
    />
  );
}
