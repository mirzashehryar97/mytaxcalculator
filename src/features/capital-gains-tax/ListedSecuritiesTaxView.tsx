import RelatedCalculators from '@/components/calculator/RelatedCalculators';

import CapitalGainsFaq from '@/features/capital-gains-tax/components/CapitalGainsFaq';
import CapitalGainsFormulaStrip from '@/features/capital-gains-tax/components/CapitalGainsFormulaStrip';
import CapitalGainsHero from '@/features/capital-gains-tax/components/CapitalGainsHero';
import CapitalGainsModeSwitchCards from '@/features/capital-gains-tax/components/CapitalGainsModeSwitchCards';
import CapitalGainsOfficialSources from '@/features/capital-gains-tax/components/CapitalGainsOfficialSources';
import ListedSecuritiesCalculator from '@/features/capital-gains-tax/components/ListedSecuritiesCalculator';
import { LISTED_SECURITIES_FORM_COPY } from '@/features/capital-gains-tax/lib/content';
import { LISTED_SECURITIES_ROUTE } from '@/features/capital-gains-tax/lib/modes';

export default function ListedSecuritiesTaxView() {
  return (
    <>
      <CapitalGainsHero mode="listed-securities" />
      <ListedSecuritiesCalculator />
      <div className="mx-auto mt-6 max-w-6xl">
        <CapitalGainsFormulaStrip
          proceedsLabel={LISTED_SECURITIES_FORM_COPY.saleProceedsLabel}
          costLabel={LISTED_SECURITIES_FORM_COPY.purchaseCostLabel}
        />
      </div>
      <CapitalGainsModeSwitchCards activeMode="listed-securities" />
      <CapitalGainsFaq mode="listed-securities" />
      <RelatedCalculators currentHref={LISTED_SECURITIES_ROUTE} />
      <CapitalGainsOfficialSources mode="listed-securities" />
    </>
  );
}
