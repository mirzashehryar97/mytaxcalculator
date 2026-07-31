import RelatedCalculators from '@/components/calculator/RelatedCalculators';

import CashWithdrawalCalculator from '@/features/withholding-tax/components/CashWithdrawalCalculator';
import WithholdingAdjustableNote from '@/features/withholding-tax/components/WithholdingAdjustableNote';
import WithholdingFaq from '@/features/withholding-tax/components/WithholdingFaq';
import WithholdingHero from '@/features/withholding-tax/components/WithholdingHero';
import WithholdingModeSwitchCards from '@/features/withholding-tax/components/WithholdingModeSwitchCards';
import WithholdingOfficialSources from '@/features/withholding-tax/components/WithholdingOfficialSources';
import { CASH_WITHDRAWAL_ROUTE } from '@/features/withholding-tax/lib/modes';

export default function CashWithdrawalTaxView() {
  return (
    <>
      <WithholdingHero mode="cash-withdrawal" />
      <CashWithdrawalCalculator />
      <WithholdingAdjustableNote />
      <WithholdingModeSwitchCards activeMode="cash-withdrawal" />
      <WithholdingFaq mode="cash-withdrawal" />
      <RelatedCalculators currentHref={CASH_WITHDRAWAL_ROUTE} />
      <WithholdingOfficialSources mode="cash-withdrawal" />
    </>
  );
}
