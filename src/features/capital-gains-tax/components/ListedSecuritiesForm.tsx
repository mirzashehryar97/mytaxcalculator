import { Lock } from 'lucide-react';

import DateInput from '@/components/calculator/DateInput';
import FilerToggle from '@/components/calculator/FilerToggle';
import NumberInput from '@/components/calculator/NumberInput';
import InfoTooltip from '@/components/ui/InfoTooltip';

import CapitalGainsGainPreview from '@/features/capital-gains-tax/components/CapitalGainsGainPreview';
import CapitalGainsTaxYearNotice from '@/features/capital-gains-tax/components/CapitalGainsTaxYearNotice';
import {
  CAPITAL_GAINS_FORM_COPY,
  CAPITAL_GAINS_PAGE_COPY,
  CAPITAL_GAINS_TERMS,
  LISTED_SECURITIES_FORM_COPY,
} from '@/features/capital-gains-tax/lib/content';
import { getCapitalGainsTaxYearNotice } from '@/features/capital-gains-tax/lib/presentation';
import type {
  CapitalGainsTaxYearResolution,
  ListedSecuritiesFormState,
  ListedSecuritiesResult,
  UpdateListedSecuritiesField,
} from '@/features/capital-gains-tax/types';

interface ListedSecuritiesFormProps {
  formState: ListedSecuritiesFormState;
  /** Tax year read off the selling date — shown, not selected. */
  taxYear: CapitalGainsTaxYearResolution;
  result: ListedSecuritiesResult;
  isValid: boolean;
  updateField: UpdateListedSecuritiesField;
}

const DISPOSAL_DATE_ID = 'listed-disposal-date';

export default function ListedSecuritiesForm({
  formState,
  taxYear,
  result,
  isValid,
  updateField,
}: ListedSecuritiesFormProps) {
  const taxYearNotice = getCapitalGainsTaxYearNotice(
    taxYear,
    formState.disposalDate,
    'date you sold',
  );

  return (
    <div className="space-y-5">
      <h2 className="border-gray-100 border-b pb-5 font-bold text-gray-900 text-xl">
        {CAPITAL_GAINS_PAGE_COPY['listed-securities'].formTitle}
      </h2>

      <NumberInput
        id="listed-purchase-cost"
        label={LISTED_SECURITIES_FORM_COPY.purchaseCostLabel}
        value={formState.purchaseCost}
        onChange={(value) => updateField('purchaseCost', value)}
        prefix="Rs."
        placeholder="2000000"
        helpText={LISTED_SECURITIES_FORM_COPY.purchaseCostHelp}
        labelAdornment={
          <InfoTooltip
            label={CAPITAL_GAINS_TERMS.purchaseCost.label}
            text={CAPITAL_GAINS_TERMS.purchaseCost.text}
          />
        }
      />

      <NumberInput
        id="listed-sale-proceeds"
        label={LISTED_SECURITIES_FORM_COPY.saleProceedsLabel}
        value={formState.saleProceeds}
        onChange={(value) => updateField('saleProceeds', value)}
        prefix="Rs."
        placeholder="3000000"
        helpText={LISTED_SECURITIES_FORM_COPY.saleProceedsHelp}
        labelAdornment={
          <InfoTooltip
            label={CAPITAL_GAINS_TERMS.saleProceeds.label}
            text={CAPITAL_GAINS_TERMS.saleProceeds.text}
          />
        }
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <DateInput
          id="listed-acquisition-date"
          label={LISTED_SECURITIES_FORM_COPY.acquisitionDateLabel}
          value={formState.acquisitionDate}
          onChange={(value) => updateField('acquisitionDate', value)}
          max={formState.disposalDate || undefined}
          helpText={LISTED_SECURITIES_FORM_COPY.acquisitionDateHelp}
          labelAdornment={
            <InfoTooltip
              label={CAPITAL_GAINS_TERMS.buyingDate.label}
              text={CAPITAL_GAINS_TERMS.buyingDate.text}
            />
          }
        />
        <DateInput
          id={DISPOSAL_DATE_ID}
          label={LISTED_SECURITIES_FORM_COPY.disposalDateLabel}
          value={formState.disposalDate}
          onChange={(value) => updateField('disposalDate', value)}
          min={formState.acquisitionDate || undefined}
          helpText={LISTED_SECURITIES_FORM_COPY.disposalDateHelp}
          labelAdornment={
            <InfoTooltip
              label={CAPITAL_GAINS_TERMS.sellingDate.label}
              text={CAPITAL_GAINS_TERMS.sellingDate.text}
            />
          }
        />
      </div>

      <CapitalGainsTaxYearNotice notice={taxYearNotice} htmlFor={DISPOSAL_DATE_ID} />

      <FilerToggle
        label={CAPITAL_GAINS_FORM_COPY.statusLabel}
        filer={formState.filer}
        onChange={(filer) => updateField('filer', filer)}
        description={CAPITAL_GAINS_FORM_COPY.statusHelp}
      />

      <CapitalGainsGainPreview
        label={LISTED_SECURITIES_FORM_COPY.gainPreviewLabel}
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
