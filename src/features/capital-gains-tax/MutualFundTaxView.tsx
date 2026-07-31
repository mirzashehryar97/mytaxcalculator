import RelatedCalculators from '@/components/calculator/RelatedCalculators';

import CapitalGainsFaq from '@/features/capital-gains-tax/components/CapitalGainsFaq';
import CapitalGainsFormulaStrip from '@/features/capital-gains-tax/components/CapitalGainsFormulaStrip';
import CapitalGainsHero from '@/features/capital-gains-tax/components/CapitalGainsHero';
import CapitalGainsModeSwitchCards from '@/features/capital-gains-tax/components/CapitalGainsModeSwitchCards';
import CapitalGainsOfficialSources from '@/features/capital-gains-tax/components/CapitalGainsOfficialSources';
import MutualFundCalculator from '@/features/capital-gains-tax/components/MutualFundCalculator';
import { MUTUAL_FUND_FORM_COPY } from '@/features/capital-gains-tax/lib/content';
import { MUTUAL_FUND_ROUTE } from '@/features/capital-gains-tax/lib/modes';

export default function MutualFundTaxView() {
  return (
    <>
      <CapitalGainsHero mode="mutual-funds" />
      <MutualFundCalculator />
      <div className="mx-auto mt-6 max-w-6xl">
        <CapitalGainsFormulaStrip
          proceedsLabel={MUTUAL_FUND_FORM_COPY.proceedsLabel}
          costLabel={MUTUAL_FUND_FORM_COPY.purchaseCostLabel}
        />
      </div>
      <CapitalGainsModeSwitchCards activeMode="mutual-funds" />
      <CapitalGainsFaq mode="mutual-funds" />
      <RelatedCalculators currentHref={MUTUAL_FUND_ROUTE} />
      <CapitalGainsOfficialSources mode="mutual-funds" />
    </>
  );
}
