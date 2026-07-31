import CalculatorFaq from '@/components/calculator/CalculatorFaq';

import {
  CAPITAL_GAINS_FAQS,
  CAPITAL_GAINS_PAGE_COPY,
  CAPITAL_GAINS_SECTION_COPY,
} from '@/features/capital-gains-tax/lib/content';
import type { CapitalGainsMode } from '@/features/capital-gains-tax/types';

interface CapitalGainsFaqProps {
  mode: CapitalGainsMode;
}

export default function CapitalGainsFaq({ mode }: CapitalGainsFaqProps) {
  const copy = CAPITAL_GAINS_SECTION_COPY[mode];

  return (
    <CalculatorFaq
      headingId={`capital-gains-${mode}-faq-heading`}
      eyebrow={copy.faqEyebrow}
      title={copy.faqTitle}
      description={copy.faqDescription}
      disclaimer={CAPITAL_GAINS_PAGE_COPY[mode].bottomDisclaimer}
      items={CAPITAL_GAINS_FAQS[mode]}
    />
  );
}
