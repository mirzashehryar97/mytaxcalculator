import RelatedCalculators from '@/components/calculator/RelatedCalculators';

import PhoneInternetCalculator from '@/features/withholding-tax/components/PhoneInternetCalculator';
import WithholdingAdjustableNote from '@/features/withholding-tax/components/WithholdingAdjustableNote';
import WithholdingFaq from '@/features/withholding-tax/components/WithholdingFaq';
import WithholdingHero from '@/features/withholding-tax/components/WithholdingHero';
import WithholdingModeSwitchCards from '@/features/withholding-tax/components/WithholdingModeSwitchCards';
import WithholdingOfficialSources from '@/features/withholding-tax/components/WithholdingOfficialSources';
import { PHONE_INTERNET_ROUTE } from '@/features/withholding-tax/lib/modes';

export default function PhoneInternetTaxView() {
  return (
    <>
      <WithholdingHero mode="phone-internet" />
      <PhoneInternetCalculator />
      <WithholdingAdjustableNote />
      <WithholdingModeSwitchCards activeMode="phone-internet" />
      <WithholdingFaq mode="phone-internet" />
      <RelatedCalculators currentHref={PHONE_INTERNET_ROUTE} />
      <WithholdingOfficialSources mode="phone-internet" />
    </>
  );
}
