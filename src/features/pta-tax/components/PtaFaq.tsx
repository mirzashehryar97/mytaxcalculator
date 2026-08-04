import CalculatorFaq from '@/components/calculator/CalculatorFaq';

import { PTA_FAQ_COPY, PTA_FAQ_ITEMS } from '@/features/pta-tax/lib/content';

export default function PtaFaq() {
  return (
    <CalculatorFaq
      description={PTA_FAQ_COPY.description}
      disclaimer={PTA_FAQ_COPY.disclaimer}
      eyebrow={PTA_FAQ_COPY.eyebrow}
      headingId="pta-faq-heading"
      items={PTA_FAQ_ITEMS}
      title={PTA_FAQ_COPY.title}
    />
  );
}
