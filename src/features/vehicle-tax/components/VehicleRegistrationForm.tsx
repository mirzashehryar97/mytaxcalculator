import { Lock } from 'lucide-react';

import DateInput from '@/components/calculator/DateInput';
import FilerToggle from '@/components/calculator/FilerToggle';
import FiscalYearSelect from '@/components/calculator/FiscalYearSelect';
import NumberInput from '@/components/calculator/NumberInput';
import SegmentedControl from '@/components/calculator/SegmentedControl';
import InfoTooltip from '@/components/ui/InfoTooltip';

import {
  VEHICLE_ENGINE_TYPE_OPTIONS,
  VEHICLE_MODE_OPTIONS,
  VEHICLE_REGISTRATION_FORM_COPY,
  VEHICLE_REGISTRATION_PAGE_COPY,
  VEHICLE_TERMS,
} from '@/features/vehicle-tax/lib/content';
import {
  parseVehicleNumberInput,
  type UpdateVehicleRegistrationField,
  type VehicleRegistrationFormState,
} from '@/features/vehicle-tax/lib/input';
import { getRegistrationInvalidMessage } from '@/features/vehicle-tax/lib/presentation';
import { resolveVehicleFiscalYear, VEHICLE_FISCAL_YEARS } from '@/features/vehicle-tax/lib/rates';

interface VehicleRegistrationFormProps {
  formState: VehicleRegistrationFormState;
  isValid: boolean;
  todayIso: string;
  updateField: UpdateVehicleRegistrationField;
}

export default function VehicleRegistrationForm({
  formState,
  isValid,
  todayIso,
  updateField,
}: VehicleRegistrationFormProps) {
  const isTransfer = formState.mode === 'transfer';
  const isElectric = formState.engineType === 'electric';
  const needsValue = !isTransfer || isElectric;

  return (
    <div className="space-y-5">
      <h2 className="border-gray-100 border-b pb-5 font-bold text-gray-900 text-xl">
        {VEHICLE_REGISTRATION_PAGE_COPY.formTitle}
      </h2>

      <SegmentedControl
        label={VEHICLE_REGISTRATION_FORM_COPY.modeLabel}
        name="vehicle-mode"
        options={VEHICLE_MODE_OPTIONS}
        value={formState.mode}
        onChange={(value) => updateField('mode', value)}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <FiscalYearSelect
          id="vehicle-fiscal-year"
          label={VEHICLE_REGISTRATION_FORM_COPY.fiscalYearLabel}
          years={VEHICLE_FISCAL_YEARS}
          value={formState.fiscalYear}
          onChange={(value) => updateField('fiscalYear', resolveVehicleFiscalYear(value))}
        />

        {isElectric ? null : (
          <NumberInput
            id="vehicle-engine-cc"
            label={VEHICLE_REGISTRATION_FORM_COPY.engineCcLabel}
            value={formState.engineCc}
            onChange={(value) => updateField('engineCc', value)}
            suffix="cc"
            step={1}
            placeholder={VEHICLE_REGISTRATION_FORM_COPY.engineCcPlaceholder}
            helpText={VEHICLE_REGISTRATION_FORM_COPY.engineCcHelp}
            labelAdornment={
              <InfoTooltip
                label={VEHICLE_TERMS.engineSize.label}
                text={VEHICLE_TERMS.engineSize.text}
              />
            }
          />
        )}
      </div>

      <SegmentedControl
        label={VEHICLE_REGISTRATION_FORM_COPY.engineTypeLabel}
        name="vehicle-engine-type"
        options={VEHICLE_ENGINE_TYPE_OPTIONS}
        value={formState.engineType}
        onChange={(value) => updateField('engineType', value)}
      />

      {needsValue ? (
        <NumberInput
          id="vehicle-value"
          label={VEHICLE_REGISTRATION_FORM_COPY.vehicleValueLabel}
          value={formState.vehicleValue}
          onChange={(value) => updateField('vehicleValue', value)}
          prefix="Rs."
          placeholder={VEHICLE_REGISTRATION_FORM_COPY.vehicleValuePlaceholder}
          helpText={
            isTransfer
              ? VEHICLE_REGISTRATION_FORM_COPY.vehicleValueTransferHelp
              : VEHICLE_REGISTRATION_FORM_COPY.vehicleValueHelp
          }
          labelAdornment={
            <InfoTooltip
              label={VEHICLE_TERMS.vehicleValue.label}
              text={VEHICLE_TERMS.vehicleValue.text}
            />
          }
        />
      ) : null}

      <FilerToggle
        label={VEHICLE_REGISTRATION_FORM_COPY.filerLabel}
        filer={formState.filer}
        onChange={(filer) => updateField('filer', filer)}
        description={VEHICLE_REGISTRATION_FORM_COPY.filerHelp}
      />

      {isTransfer ? (
        <DateInput
          id="vehicle-first-registration"
          label={VEHICLE_REGISTRATION_FORM_COPY.firstRegistrationLabel}
          value={formState.firstRegistrationDate}
          onChange={(value) => updateField('firstRegistrationDate', value)}
          max={todayIso}
          helpText={
            formState.firstRegistrationDate
              ? VEHICLE_REGISTRATION_FORM_COPY.firstRegistrationHelp
              : VEHICLE_REGISTRATION_FORM_COPY.firstRegistrationMissing
          }
          labelAdornment={
            <InfoTooltip
              label={VEHICLE_TERMS.firstRegistration.label}
              text={VEHICLE_TERMS.firstRegistration.text}
            />
          }
        />
      ) : null}

      {isValid ? null : (
        <p className="text-red-600 text-sm" role="alert">
          {getRegistrationInvalidMessage(
            formState.engineType,
            parseVehicleNumberInput(formState.engineCc),
          )}
        </p>
      )}

      <p className="flex items-center gap-2 text-gray-500 text-xs">
        <Lock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        {VEHICLE_REGISTRATION_FORM_COPY.privacyNote}
      </p>
    </div>
  );
}
