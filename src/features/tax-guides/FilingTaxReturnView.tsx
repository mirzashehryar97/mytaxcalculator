import TaxGuideArticleLayout from '@/features/tax-guides/components/article/TaxGuideArticleLayout';
import TaxGuideRelatedArticles from '@/features/tax-guides/components/article/TaxGuideRelatedArticles';
import AfterFiling from '@/features/tax-guides/components/filing/AfterFiling';
import BeforeFilingStart from '@/features/tax-guides/components/filing/BeforeFilingStart';
import BeforeSubmitting from '@/features/tax-guides/components/filing/BeforeSubmitting';
import FilingCommonMistakes from '@/features/tax-guides/components/filing/FilingCommonMistakes';
import FilingDeadlineAlert from '@/features/tax-guides/components/filing/FilingDeadlineAlert';
import FilingDocumentsChecklist from '@/features/tax-guides/components/filing/FilingDocumentsChecklist';
import FilingProcessSteps from '@/features/tax-guides/components/filing/FilingProcessSteps';
import FilingSidebarDeadline from '@/features/tax-guides/components/filing/FilingSidebarDeadline';
import ReturnWealthNotice from '@/features/tax-guides/components/filing/ReturnWealthNotice';
import WealthReconciliation from '@/features/tax-guides/components/filing/WealthReconciliation';
import {
  FILING_OFFICIAL_LINKS,
  FILING_RELATED_ARTICLES,
  FILING_SECTION_COPY,
  FILING_TAX_RETURN_HERO,
  FILING_TAX_RETURN_SOURCES,
  FILING_TAX_RETURN_TOC,
} from '@/features/tax-guides/lib/filingTaxReturnContent';

export default function FilingTaxReturnView() {
  return (
    <TaxGuideArticleLayout
      hero={FILING_TAX_RETURN_HERO}
      toc={FILING_TAX_RETURN_TOC}
      tools={FILING_OFFICIAL_LINKS}
      toolsTitle="Official links"
      sources={FILING_TAX_RETURN_SOURCES}
      leadContent={<FilingDeadlineAlert />}
      sidebarFooterContent={<FilingSidebarDeadline />}
      sectionPresentation="plain"
      printLabel="Print checklist"
    >
      <BeforeFilingStart />
      <FilingDocumentsChecklist />
      <FilingProcessSteps />
      <ReturnWealthNotice />
      <WealthReconciliation />
      <BeforeSubmitting />
      <FilingCommonMistakes />
      <AfterFiling />
      <TaxGuideRelatedArticles
        number={10}
        title={FILING_SECTION_COPY.continueTitle}
        description={FILING_SECTION_COPY.continueDescription}
        articles={FILING_RELATED_ARTICLES}
      />
    </TaxGuideArticleLayout>
  );
}
