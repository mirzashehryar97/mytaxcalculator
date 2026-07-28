import TaxGuideArticleNotice from '@/features/tax-guides/components/article/TaxGuideArticleNotice';
import { FILING_SECTION_COPY } from '@/features/tax-guides/lib/filingTaxReturnContent';

export default function ReturnWealthNotice() {
  return (
    <section id="return-and-wealth-statement" className="scroll-mt-24">
      <TaxGuideArticleNotice tone="blue" title={FILING_SECTION_COPY.returnWealthTitle}>
        {FILING_SECTION_COPY.returnWealthDescription}
      </TaxGuideArticleNotice>
    </section>
  );
}
