import TaxGuideArticleLayout from '@/features/tax-guides/components/article/TaxGuideArticleLayout';
import TaxGuideRelatedArticles from '@/features/tax-guides/components/article/TaxGuideRelatedArticles';
import BeforeYouClaim from '@/features/tax-guides/components/deductions/BeforeYouClaim';
import ClaimingReliefInIris from '@/features/tax-guides/components/deductions/ClaimingReliefInIris';
import DeductionCreditComparison from '@/features/tax-guides/components/deductions/DeductionCreditComparison';
import DeductionsRecords from '@/features/tax-guides/components/deductions/DeductionsRecords';
import DeductionsWorkedExample from '@/features/tax-guides/components/deductions/DeductionsWorkedExample';
import PersonalExpenseNotice from '@/features/tax-guides/components/deductions/PersonalExpenseNotice';
import ReliefCategories from '@/features/tax-guides/components/deductions/ReliefCategories';
import ReliefFinder from '@/features/tax-guides/components/deductions/ReliefFinder';
import {
  DEDUCTIONS_CREDITS_HERO,
  DEDUCTIONS_CREDITS_SOURCES,
  DEDUCTIONS_CREDITS_TOC,
  DEDUCTIONS_CREDITS_TOOLS,
  DEDUCTIONS_RELATED_ARTICLES,
  DEDUCTIONS_SECTION_COPY,
} from '@/features/tax-guides/lib/taxDeductionsCreditsContent';

export default function TaxDeductionsCreditsView() {
  return (
    <TaxGuideArticleLayout
      hero={DEDUCTIONS_CREDITS_HERO}
      toc={DEDUCTIONS_CREDITS_TOC}
      tools={DEDUCTIONS_CREDITS_TOOLS}
      toolsTitle="Related tools"
      sources={DEDUCTIONS_CREDITS_SOURCES}
      leadContent={<BeforeYouClaim />}
      sectionPresentation="plain"
    >
      <DeductionCreditComparison />
      <ReliefFinder />
      <ReliefCategories />
      <PersonalExpenseNotice />
      <DeductionsWorkedExample />
      <DeductionsRecords />
      <ClaimingReliefInIris />
      <TaxGuideRelatedArticles
        number={9}
        title={DEDUCTIONS_SECTION_COPY.continueTitle}
        description={DEDUCTIONS_SECTION_COPY.continueDescription}
        articles={DEDUCTIONS_RELATED_ARTICLES}
      />
    </TaxGuideArticleLayout>
  );
}
