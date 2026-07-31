import { Lock } from 'lucide-react';

import DateInput from '@/components/calculator/DateInput';
import FilerToggle from '@/components/calculator/FilerToggle';
import NumberInput from '@/components/calculator/NumberInput';
import SegmentedControl from '@/components/calculator/SegmentedControl';
import InfoTooltip from '@/components/ui/InfoTooltip';

import CapitalGainsGainPreview from '@/features/capital-gains-tax/components/CapitalGainsGainPreview';
import CapitalGainsTaxYearNotice from '@/features/capital-gains-tax/components/CapitalGainsTaxYearNotice';
import {
  CAPITAL_GAINS_FORM_COPY,
  CAPITAL_GAINS_PAGE_COPY,
  CAPITAL_GAINS_TERMS,
  FUND_CLASS_OPTIONS,
  INVESTOR_TYPE_OPTIONS,
  MUTUAL_FUND_FORM_COPY,
} from '@/features/capital-gains-tax/lib/content';
import { getCapitalGainsTaxYearNotice } from '@/features/capital-gains-tax/lib/presentation';
import type {
  CapitalGainsTaxYearResolution,
  MutualFundFormState,
  MutualFundResult,
  UpdateMutualFundField,
} from '@/features/capital-gains-tax/types';

interface MutualFundFormProps {
  formState: MutualFundFormState;
  taxYear: CapitalGainsTaxYearResolution;
  result: MutualFundResult;
  isValid: boolean;
  updateField: UpdateMutualFundField;
}

const REDEMPTION_DATE_ID = 'fund-redemption-date';

export default function MutualFundForm({
  formState,
  taxYear,
  result,
  isValid,
  updateField,
}: MutualFundFormProps) {
  const taxYearNotice = getCapitalGainsTaxYearNotice(
    taxYear,
    formState.redemptionDate,
    'date you cashed in',
  );

  return (
    <div className="space-y-5">
      <h2 className="border-gray-100 border-b pb-5 font-bold text-gray-900 text-xl">
        {CAPITAL_GAINS_PAGE_COPY['mutual-funds'].formTitle}
      </h2>

      <SegmentedControl
        label={CAPITAL_GAINS_FORM_COPY.investorTypeLabel}
        name="fund-investor-type"
        options={INVESTOR_TYPE_OPTIONS}
        value={formState.investorType}
        onChange={(value) => updateField('investorType', value)}
        helpText={CAPITAL_GAINS_TERMS.investorType.text}
      />

      <SegmentedControl
        label={MUTUAL_FUND_FORM_COPY.fundClassLabel}
        name="fund-class"
        options={FUND_CLASS_OPTIONS}
        value={formState.fundClass}
        onChange={(value) => updateField('fundClass', value)}
        helpText={MUTUAL_FUND_FORM_COPY.fundClassHelp}
      />

      <NumberInput
        id="fund-purchase-cost"
        label={MUTUAL_FUND_FORM_COPY.purchaseCostLabel}
        value={formState.purchaseCost}
        onChange={(value) => updateField('purchaseCost', value)}
        prefix="Rs."
        placeholder="2000000"
        helpText={MUTUAL_FUND_FORM_COPY.purchaseCostHelp}
        labelAdornment={
          <InfoTooltip
            label={CAPITAL_GAINS_TERMS.purchaseCost.label}
            text={CAPITAL_GAINS_TERMS.purchaseCost.text}
          />
        }
      />

      <NumberInput
        id="fund-proceeds"
        label={MUTUAL_FUND_FORM_COPY.proceedsLabel}
        value={formState.redemptionProceeds}
        onChange={(value) => updateField('redemptionProceeds', value)}
        prefix="Rs."
        placeholder="3000000"
        helpText={MUTUAL_FUND_FORM_COPY.proceedsHelp}
        labelAdornment={
          <InfoTooltip
            label={CAPITAL_GAINS_TERMS.fundCompany.label}
            text={CAPITAL_GAINS_TERMS.fundCompany.text}
          />
        }
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <DateInput
          id="fund-acquisition-date"
          label={MUTUAL_FUND_FORM_COPY.acquisitionDateLabel}
          value={formState.acquisitionDate}
          onChange={(value) => updateField('acquisitionDate', value)}
          max={formState.redemptionDate || undefined}
          helpText={MUTUAL_FUND_FORM_COPY.acquisitionDateHelp}
          labelAdornment={
            <InfoTooltip
              label={CAPITAL_GAINS_TERMS.buyingDate.label}
              text={CAPITAL_GAINS_TERMS.buyingDate.text}
            />
          }
        />
        <DateInput
          id={REDEMPTION_DATE_ID}
          label={MUTUAL_FUND_FORM_COPY.redemptionDateLabel}
          value={formState.redemptionDate}
          onChange={(value) => updateField('redemptionDate', value)}
          min={formState.acquisitionDate || undefined}
          helpText={MUTUAL_FUND_FORM_COPY.redemptionDateHelp}
          labelAdornment={
            <InfoTooltip
              label={CAPITAL_GAINS_TERMS.sellingDate.label}
              text={CAPITAL_GAINS_TERMS.sellingDate.text}
            />
          }
        />
      </div>

      <CapitalGainsTaxYearNotice notice={taxYearNotice} htmlFor={REDEMPTION_DATE_ID} />

      <FilerToggle
        label={CAPITAL_GAINS_FORM_COPY.statusLabel}
        filer={formState.filer}
        onChange={(filer) => updateField('filer', filer)}
        description={CAPITAL_GAINS_FORM_COPY.statusHelp}
      />

      <CapitalGainsGainPreview
        label={MUTUAL_FUND_FORM_COPY.gainPreviewLabel}
        gain={result.capitalGain}
        isLoss={result.isLoss}
        lossAmount={result.lossAmount}
      />

      {isValid ? null : (
        <p className="text-red-600 text-sm" role="alert">
          {CAPITAL_GAINS_FORM_COPY.invalidProceedsMessage}
        </p>
      )}

      {result.datesAreValid ? null : (
        <p className="text-red-600 text-sm" role="alert">
          {CAPITAL_GAINS_FORM_COPY.invalidDatesMessage}
        </p>
      )}

      <p className="flex items-center gap-2 text-gray-500 text-xs leading-relaxed">
        <Lock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        {CAPITAL_GAINS_FORM_COPY.privacyNote}
      </p>
    </div>
  );
}
