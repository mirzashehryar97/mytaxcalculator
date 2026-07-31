import RelatedCalculators from '@/components/calculator/RelatedCalculators';

import ElectricityBillCalculator from '@/features/withholding-tax/components/ElectricityBillCalculator';
import WithholdingAdjustableNote from '@/features/withholding-tax/components/WithholdingAdjustableNote';
import WithholdingFaq from '@/features/withholding-tax/components/WithholdingFaq';
import WithholdingHero from '@/features/withholding-tax/components/WithholdingHero';
import WithholdingModeSwitchCards from '@/features/withholding-tax/components/WithholdingModeSwitchCards';
import WithholdingOfficialSources from '@/features/withholding-tax/components/WithholdingOfficialSources';
import { ELECTRICITY_ROUTE } from '@/features/withholding-tax/lib/modes';

export default function ElectricityBillTaxView() {
  return (
    <>
      <WithholdingHero mode="electricity" />
      <ElectricityBillCalculator />
      <WithholdingAdjustableNote />
      <WithholdingModeSwitchCards activeMode="electricity" />
      <WithholdingFaq mode="electricity" />
      <RelatedCalculators currentHref={ELECTRICITY_ROUTE} />
      <WithholdingOfficialSources mode="electricity" />
    </>
  );
}
