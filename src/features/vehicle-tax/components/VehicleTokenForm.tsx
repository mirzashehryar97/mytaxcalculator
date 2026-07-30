import { Lock } from 'lucide-react';

import DateInput from '@/components/calculator/DateInput';
import FilerToggle from '@/components/calculator/FilerToggle';
import FiscalYearSelect from '@/components/calculator/FiscalYearSelect';
import NumberInput from '@/components/calculator/NumberInput';
import SwitchToggle from '@/components/calculator/SwitchToggle';
import InfoTooltip from '@/components/ui/InfoTooltip';

import {
  VEHICLE_TERMS,
  VEHICLE_TOKEN_FORM_COPY,
  VEHICLE_TOKEN_PAGE_COPY,
} from '@/features/vehicle-tax/lib/content';
import type {
  UpdateVehicleTokenField,
  VehicleTokenFormState,
} from '@/features/vehicle-tax/lib/input';
import {
  getVehicleProvince,
  resolveVehicleProvince,
  resolveVehicleTokenFiscalYear,
  VEHICLE_PROVINCES,
  VEHICLE_TOKEN_FISCAL_YEARS,
} from '@/features/vehicle-tax/lib/rates';

interface VehicleTokenFormProps {
  formState: VehicleTokenFormState;
  isValid: boolean;
  todayIso: string;
  updateField: UpdateVehicleTokenField;
}

export default function VehicleTokenForm({
  formState,
  isValid,
  todayIso,
  updateField,
}: VehicleTokenFormProps) {
  const province = getVehicleProvince(formState.province);
  const schedule = province.schedules[formState.fiscalYear];
  const discount = schedule?.earlyPaymentDiscount ?? 0;

  return (
    <div className="space-y-5">
      <h2 className="border-gray-100 border-b pb-5 font-bold text-gray-900 text-xl">
        {VEHICLE_TOKEN_PAGE_COPY.formTitle}
      </h2>

      <div className="grid gap-5 sm:grid-cols-2">
        <FiscalYearSelect
          id="vehicle-token-fiscal-year"
          label={VEHICLE_TOKEN_FORM_COPY.fiscalYearLabel}
          years={VEHICLE_TOKEN_FISCAL_YEARS}
          value={formState.fiscalYear}
          onChange={(value) => updateField('fiscalYear', resolveVehicleTokenFiscalYear(value))}
        />

        <div className="min-w-0">
          <label htmlFor="vehicle-token-province" className="form-label">
            {VEHICLE_TOKEN_FORM_COPY.provinceLabel}
          </label>
          <select
            id="vehicle-token-province"
            value={formState.province}
            onChange={(event) =>
              updateField('province', resolveVehicleProvince(event.target.value))
            }
            className="form-select"
          >
            {VEHICLE_PROVINCES.map((entry) => (
              <option key={entry.province} value={entry.province}>
                {entry.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <NumberInput
          id="vehicle-token-engine-cc"
          label={VEHICLE_TOKEN_FORM_COPY.engineCcLabel}
          value={formState.engineCc}
          onChange={(value) => updateField('engineCc', value)}
          suffix="cc"
          step={1}
          placeholder={VEHICLE_TOKEN_FORM_COPY.engineCcPlaceholder}
          helpText={VEHICLE_TOKEN_FORM_COPY.engineCcHelp}
          labelAdornment={
            <InfoTooltip
              label={VEHICLE_TERMS.engineSize.label}
              text={VEHICLE_TERMS.engineSize.text}
            />
          }
        />

        <NumberInput
          id="vehicle-token-invoice-value"
          label={VEHICLE_TOKEN_FORM_COPY.invoiceValueLabel}
          value={formState.invoiceValue}
          onChange={(value) => updateField('invoiceValue', value)}
          prefix="Rs."
          placeholder={VEHICLE_TOKEN_FORM_COPY.invoiceValuePlaceholder}
          helpText={VEHICLE_TOKEN_FORM_COPY.invoiceValueHelp}
          labelAdornment={
            <InfoTooltip
              label={VEHICLE_TERMS.invoiceValue.label}
              text={VEHICLE_TERMS.invoiceValue.text}
            />
          }
        />
      </div>

      <FilerToggle
        label={VEHICLE_TOKEN_FORM_COPY.filerLabel}
        filer={formState.filer}
        onChange={(filer) => updateField('filer', filer)}
        description={VEHICLE_TOKEN_FORM_COPY.filerHelp}
      />

      <DateInput
        id="vehicle-token-first-registration"
        label={VEHICLE_TOKEN_FORM_COPY.firstRegistrationLabel}
        value={formState.firstRegistrationDate}
        onChange={(value) => updateField('firstRegistrationDate', value)}
        max={todayIso}
        helpText={VEHICLE_TOKEN_FORM_COPY.firstRegistrationHelp}
        labelAdornment={
          <InfoTooltip
            label={VEHICLE_TERMS.firstRegistration.label}
            text={VEHICLE_TERMS.firstRegistration.text}
          />
        }
      />

      {discount > 0 && schedule?.earlyPaymentDeadline ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <SwitchToggle
            id="vehicle-token-pay-early"
            label={VEHICLE_TOKEN_FORM_COPY.payEarlyLabel}
            checked={formState.payEarly}
            onChange={(checked) => updateField('payEarly', checked)}
            description={`${province.label} takes ${discount}% off the yearly token if you pay it all by ${schedule.earlyPaymentDeadline}.`}
          />
        </div>
      ) : null}

      {isValid ? null : (
        <p className="text-red-600 text-sm" role="alert">
          {VEHICLE_TOKEN_FORM_COPY.invalidEngineMessage}
        </p>
      )}

      <p className="flex items-center gap-2 text-gray-500 text-xs">
        <Lock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        {VEHICLE_TOKEN_FORM_COPY.privacyNote}
      </p>
    </div>
  );
}
