import { Info, Lock } from 'lucide-react';

import FiscalYearSelect from '@/components/calculator/FiscalYearSelect';
import NumberInput from '@/components/calculator/NumberInput';
import SegmentedControl from '@/components/calculator/SegmentedControl';
import InfoTooltip from '@/components/ui/InfoTooltip';

import {
  TELECOM_FORM_COPY,
  TELECOM_PAYMENT_OPTIONS,
  TELECOM_SERVICE_OPTIONS,
  WITHHOLDING_FORM_COPY,
  WITHHOLDING_PAGE_COPY,
  WITHHOLDING_TERMS,
} from '@/features/withholding-tax/lib/content';
import { formatPercent, formatPkr } from '@/features/withholding-tax/lib/formatting';
import { resolveTelecomPayment, resolveTelecomService } from '@/features/withholding-tax/lib/input';
import {
  resolveWithholdingFiscalYear,
  WITHHOLDING_FISCAL_YEARS,
} from '@/features/withholding-tax/lib/rates';
import type {
  TelecomFormState,
  TelecomResult,
  UpdateTelecomField,
} from '@/features/withholding-tax/types';

interface PhoneInternetFormProps {
  formState: TelecomFormState;
  result: TelecomResult;
  isValid: boolean;
  updateField: UpdateTelecomField;
}

export default function PhoneInternetForm({
  formState,
  result,
  isValid,
  updateField,
}: PhoneInternetFormProps) {
  const isLandline = formState.service === 'landline';
  const isTopUp = result.payment === 'top-up';

  return (
    <div className="space-y-5">
      <h2 className="border-gray-100 border-b pb-5 font-bold text-gray-900 text-xl">
        {WITHHOLDING_PAGE_COPY['phone-internet'].formTitle}
      </h2>

      <FiscalYearSelect
        id="phone-internet-fiscal-year"
        label={WITHHOLDING_FORM_COPY.fiscalYearLabel}
        years={WITHHOLDING_FISCAL_YEARS}
        value={formState.fiscalYear}
        onChange={(value) => updateField('fiscalYear', resolveWithholdingFiscalYear(value))}
      />

      <SegmentedControl
        label={TELECOM_FORM_COPY.serviceLabel}
        name="telecom-service"
        options={TELECOM_SERVICE_OPTIONS}
        value={formState.service}
        onChange={(value) => updateField('service', resolveTelecomService(value))}
      />

      {isLandline ? null : (
        <SegmentedControl
          label={TELECOM_FORM_COPY.paymentLabel}
          name="telecom-payment"
          options={TELECOM_PAYMENT_OPTIONS}
          value={formState.payment}
          onChange={(value) => updateField('payment', resolveTelecomPayment(value))}
          helpText={TELECOM_FORM_COPY.paymentHelp}
        />
      )}

      <NumberInput
        id="phone-internet-amount"
        label={isTopUp ? TELECOM_FORM_COPY.amountLabelTopUp : TELECOM_FORM_COPY.amountLabelBill}
        value={formState.amount}
        onChange={(value) => updateField('amount', value)}
        prefix="Rs."
        placeholder={TELECOM_FORM_COPY.amountPlaceholder}
        helpText={isTopUp ? TELECOM_FORM_COPY.amountHelpTopUp : TELECOM_FORM_COPY.amountHelpBill}
        labelAdornment={
          <InfoTooltip
            label={isTopUp ? WITHHOLDING_TERMS.topUp.label : WITHHOLDING_TERMS.phoneBill.label}
            text={isTopUp ? WITHHOLDING_TERMS.topUp.text : WITHHOLDING_TERMS.phoneBill.text}
          />
        }
      />

      <div className="flex gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" aria-hidden="true" />
        <p className="min-w-0 text-blue-950/85 text-sm leading-relaxed">
          {isLandline ? (
            <>
              A landline is taxed at {formatPercent(result.rate)}, and only on the part of the bill
              above {formatPkr(result.landlineThreshold)}.{' '}
              <InfoTooltip
                label={WITHHOLDING_TERMS.landlineRule.label}
                text={WITHHOLDING_TERMS.landlineRule.text}
              />
            </>
          ) : (
            <>
              Mobile, internet and prepaid loads are all taxed at {formatPercent(result.rate)}, the
              same for everyone. On a load it comes out of your balance; on a bill it is added on
              top.
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
