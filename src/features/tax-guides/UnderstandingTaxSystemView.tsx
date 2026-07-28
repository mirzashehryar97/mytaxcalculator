import TaxGuideArticleLayout from '@/features/tax-guides/components/article/TaxGuideArticleLayout';
import TaxGuideRelatedArticles from '@/features/tax-guides/components/article/TaxGuideRelatedArticles';
import DeadlinesAndRecords from '@/features/tax-guides/components/understanding/DeadlinesAndRecords';
import FilingObligations from '@/features/tax-guides/components/understanding/FilingObligations';
import IncomeHeads from '@/features/tax-guides/components/understanding/IncomeHeads';
import SalaryTaxExample from '@/features/tax-guides/components/understanding/SalaryTaxExample';
import SalaryTaxSlabs from '@/features/tax-guides/components/understanding/SalaryTaxSlabs';
import TaxSystemOverview from '@/features/tax-guides/components/understanding/TaxSystemOverview';
import TaxYearResidency from '@/features/tax-guides/components/understanding/TaxYearResidency';
import {
  UNDERSTANDING_RELATED_ARTICLES,
  UNDERSTANDING_SECTION_COPY,
  UNDERSTANDING_TAX_SYSTEM_HERO,
  UNDERSTANDING_TAX_SYSTEM_SOURCES,
  UNDERSTANDING_TAX_SYSTEM_TAKEAWAYS,
  UNDERSTANDING_TAX_SYSTEM_TOC,
  UNDERSTANDING_TAX_SYSTEM_TOOLS,
} from '@/features/tax-guides/lib/understandingTaxSystemContent';

export default function UnderstandingTaxSystemView() {
  return (
    <TaxGuideArticleLayout
      hero={UNDERSTANDING_TAX_SYSTEM_HERO}
      toc={UNDERSTANDING_TAX_SYSTEM_TOC}
      tools={UNDERSTANDING_TAX_SYSTEM_TOOLS}
      sources={UNDERSTANDING_TAX_SYSTEM_SOURCES}
      takeaways={UNDERSTANDING_TAX_SYSTEM_TAKEAWAYS}
      wideChildren={
        <>
          <IncomeHeads />
          <div className="grid items-stretch gap-3 sm:grid-cols-2">
            <SalaryTaxSlabs />
            <SalaryTaxExample />
          </div>
          <FilingObligations />
          <DeadlinesAndRecords />
          <TaxGuideRelatedArticles
            number={8}
            title={UNDERSTANDING_SECTION_COPY.continueTitle}
            description={UNDERSTANDING_SECTION_COPY.continueDescription}
            articles={UNDERSTANDING_RELATED_ARTICLES}
          />
        </>
      }
    >
      <TaxSystemOverview />
      <TaxYearResidency />
    </TaxGuideArticleLayout>
  );
}
