import { Info, Lock } from 'lucide-react';

import FilerToggle from '@/components/calculator/FilerToggle';
import FiscalYearSelect from '@/components/calculator/FiscalYearSelect';
import NumberInput from '@/components/calculator/NumberInput';
import SegmentedControl from '@/components/calculator/SegmentedControl';
import InfoTooltip from '@/components/ui/InfoTooltip';

import {
  ELECTRICITY_CONNECTION_OPTIONS,
  ELECTRICITY_FORM_COPY,
  WITHHOLDING_FORM_COPY,
  WITHHOLDING_PAGE_COPY,
  WITHHOLDING_TERMS,
} from '@/features/withholding-tax/lib/content';
import { formatPercent, formatPkr } from '@/features/withholding-tax/lib/formatting';
import { resolveElectricityConnection } from '@/features/withholding-tax/lib/input';
import {
  resolveWithholdingFiscalYear,
  WITHHOLDING_FISCAL_YEARS,
} from '@/features/withholding-tax/lib/rates';
import type {
  ElectricityFormState,
  ElectricityResult,
  UpdateElectricityField,
} from '@/features/withholding-tax/types';

interface ElectricityBillFormProps {
  formState: ElectricityFormState;
  result: ElectricityResult;
  isValid: boolean;
  updateField: UpdateElectricityField;
}

export default function ElectricityBillForm({
  formState,
  result,
  isValid,
  updateField,
}: ElectricityBillFormProps) {
  const isDomestic = formState.connection === 'domestic';

  return (
    <div className="space-y-5">
      <h2 className="border-gray-100 border-b pb-5 font-bold text-gray-900 text-xl">
        {WITHHOLDING_PAGE_COPY.electricity.formTitle}
      </h2>

      <FiscalYearSelect
        id="electricity-fiscal-year"
        label={WITHHOLDING_FORM_COPY.fiscalYearLabel}
        years={WITHHOLDING_FISCAL_YEARS}
        value={formState.fiscalYear}
        onChange={(value) => updateField('fiscalYear', resolveWithholdingFiscalYear(value))}
      />

      <SegmentedControl
        label={ELECTRICITY_FORM_COPY.connectionLabel}
        name="electricity-connection"
        options={ELECTRICITY_CONNECTION_OPTIONS}
        value={formState.connection}
        onChange={(value) => updateField('connection', resolveElectricityConnection(value))}
        helpText={ELECTRICITY_FORM_COPY.connectionHelp}
      />

      <NumberInput
        id="electricity-bill-amount"
        label={ELECTRICITY_FORM_COPY.billLabel}
        value={formState.billAmount}
        onChange={(value) => updateField('billAmount', value)}
        prefix="Rs."
        placeholder={ELECTRICITY_FORM_COPY.billPlaceholder}
        helpText={ELECTRICITY_FORM_COPY.billHelp}
        labelAdornment={
          <InfoTooltip
            label={WITHHOLDING_TERMS.grossBill.label}
            text={WITHHOLDING_TERMS.grossBill.text}
          />
        }
      />

      <FilerToggle
        label={ELECTRICITY_FORM_COPY.statusLabel}
        filer={formState.filer}
        onChange={(filer) => updateField('filer', filer)}
        description={
          isDomestic
            ? ELECTRICITY_FORM_COPY.statusHelpDomestic
            : ELECTRICITY_FORM_COPY.statusHelpBusiness
        }
      />

      <div className="flex gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" aria-hidden="true" />
        <p className="min-w-0 text-blue-950/85 text-sm leading-relaxed">
          {isDomestic ? (
            <>
              A home meter is charged {formatPercent(result.rate)} of the bill, and only when the
              bill reaches {formatPkr(result.domesticThreshold)} and the owner is a non-filer.{' '}
              <InfoTooltip
                label={WITHHOLDING_TERMS.homeMeterRule.label}
                text={WITHHOLDING_TERMS.homeMeterRule.text}
              />
            </>
          ) : (
            <>
              A shop, office or factory meter is charged from its own table and pays the same for
              filers and non-filers.{' '}
              <InfoTooltip
                label={WITHHOLDING_TERMS.sameForEveryone.label}
                text={WITHHOLDING_TERMS.sameForEveryone.text}
              />
            </>
          )}
        </p>
      </div>

      {isValid ? null : (
        <p className="text-red-600 text-sm" role="alert">
          {WITHHOLDING_FORM_COPY.invalidAmountMessage}
        </p>
      )}

      <p className="flex items-center gap-2 text-gray-500 text-xs leading-relaxed">
        <Lock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        {WITHHOLDING_FORM_COPY.privacyNote}
      </p>
    </div>
  );
}
