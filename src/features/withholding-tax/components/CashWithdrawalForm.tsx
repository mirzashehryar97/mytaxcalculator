import { Info, Lock } from 'lucide-react';

import FilerToggle from '@/components/calculator/FilerToggle';
import FiscalYearSelect from '@/components/calculator/FiscalYearSelect';
import NumberInput from '@/components/calculator/NumberInput';
import InfoTooltip from '@/components/ui/InfoTooltip';

import {
  CASH_WITHDRAWAL_FORM_COPY,
  WITHHOLDING_FORM_COPY,
  WITHHOLDING_PAGE_COPY,
  WITHHOLDING_TERMS,
} from '@/features/withholding-tax/lib/content';
import { formatPercent, formatPkr } from '@/features/withholding-tax/lib/formatting';
import {
  resolveWithholdingFiscalYear,
  WITHHOLDING_FISCAL_YEARS,
} from '@/features/withholding-tax/lib/rates';
import type {
  CashWithdrawalFormState,
  CashWithdrawalResult,
  UpdateCashWithdrawalField,
} from '@/features/withholding-tax/types';

interface CashWithdrawalFormProps {
  formState: CashWithdrawalFormState;
  result: CashWithdrawalResult;
  isValid: boolean;
  updateField: UpdateCashWithdrawalField;
}

export default function CashWithdrawalForm({
  formState,
  result,
  isValid,
  updateField,
}: CashWithdrawalFormProps) {
  return (
    <div className="space-y-5">
      <h2 className="border-gray-100 border-b pb-5 font-bold text-gray-900 text-xl">
        {WITHHOLDING_PAGE_COPY['cash-withdrawal'].formTitle}
      </h2>

      <FiscalYearSelect
        id="cash-withdrawal-fiscal-year"
        label={WITHHOLDING_FORM_COPY.fiscalYearLabel}
        years={WITHHOLDING_FISCAL_YEARS}
        value={formState.fiscalYear}
        onChange={(value) => updateField('fiscalYear', resolveWithholdingFiscalYear(value))}
      />

      <NumberInput
        id="cash-withdrawal-amount"
        label={CASH_WITHDRAWAL_FORM_COPY.amountLabel}
        value={formState.dailyWithdrawal}
        onChange={(value) => updateField('dailyWithdrawal', value)}
        prefix="Rs."
        placeholder={CASH_WITHDRAWAL_FORM_COPY.amountPlaceholder}
        helpText={CASH_WITHDRAWAL_FORM_COPY.amountHelp}
        labelAdornment={
          <InfoTooltip
            label={WITHHOLDING_TERMS.dailyTotal.label}
            text={WITHHOLDING_TERMS.dailyTotal.text}
          />
        }
      />

      <FilerToggle
        label={CASH_WITHDRAWAL_FORM_COPY.statusLabel}
        filer={formState.filer}
        onChange={(filer) => updateField('filer', filer)}
        description={CASH_WITHDRAWAL_FORM_COPY.statusHelp}
      />

      <div className="flex gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" aria-hidden="true" />
        <p className="min-w-0 text-blue-950/85 text-sm leading-relaxed">
          Nothing comes off until the day’s cash passes {formatPkr(result.dailyThreshold)}. After
          that, {formatPercent(result.nonFilerRate)} is taken from the whole amount, not just the
          part above it.{' '}
          <InfoTooltip
            label={WITHHOLDING_TERMS.wholeAmount.label}
            text={WITHHOLDING_TERMS.wholeAmount.text}
          />
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
