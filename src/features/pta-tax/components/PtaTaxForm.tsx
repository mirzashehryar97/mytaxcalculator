import { Lock } from 'lucide-react';

import FiscalYearSelect from '@/components/calculator/FiscalYearSelect';
import NumberInput from '@/components/calculator/NumberInput';
import SegmentedControl from '@/components/calculator/SegmentedControl';
import type { SelectOption } from '@/components/calculator/select';
import InfoTooltip from '@/components/ui/InfoTooltip';

import PtaUsedPhoneNote from '@/features/pta-tax/components/PtaUsedPhoneNote';
import PtaValuePicker from '@/features/pta-tax/components/PtaValuePicker';
import {
  PTA_CONDITION_OPTIONS,
  PTA_DEVICE_KIND_OPTIONS,
  PTA_FORM_COPY,
  PTA_PAGE_COPY,
  PTA_ROUTE_OPTIONS,
  PTA_TERMS,
  PTA_VALUE_SOURCE_OPTIONS,
} from '@/features/pta-tax/lib/content';
import type { PtaFormState, UpdatePtaField } from '@/features/pta-tax/lib/input';
import {
  getDeviceKindHelp,
  getExchangeRateHelp,
  getRouteHelp,
} from '@/features/pta-tax/lib/presentation';
import { PTA_FISCAL_YEARS, resolvePtaFiscalYear } from '@/features/pta-tax/lib/rates';
import type { PtaPhone } from '@/features/pta-tax/types';

interface PtaTaxFormProps {
  formState: PtaFormState;
  variantOptions: readonly SelectOption<string>[];
  officialCnfUsd: number | null;
  /** The old-and-used ruling's figure for the same handset, where it has one. */
  usedPhone: PtaPhone | null;
  updateField: UpdatePtaField;
}

export default function PtaTaxForm({
  formState,
  variantOptions,
  officialCnfUsd,
  usedPhone,
  updateField,
}: PtaTaxFormProps) {
  return (
    <div className="space-y-5">
      <h2 className="border-gray-100 border-b pb-5 font-bold text-gray-900 text-xl">
        {PTA_PAGE_COPY.formTitle}
      </h2>

      <div className="grid gap-5 sm:grid-cols-2">
        <FiscalYearSelect
          id="pta-fiscal-year"
          label={PTA_FORM_COPY.fiscalYearLabel}
          years={PTA_FISCAL_YEARS}
          value={formState.fiscalYear}
          onChange={(value) => updateField('fiscalYear', resolvePtaFiscalYear(value))}
        />

        <NumberInput
          id="pta-exchange-rate"
          label={PTA_FORM_COPY.exchangeRateLabel}
          value={formState.exchangeRate}
          onChange={(value) => updateField('exchangeRate', value)}
          prefix="Rs."
          suffix="per US$"
          placeholder={PTA_FORM_COPY.exchangeRatePlaceholder}
          helpText={getExchangeRateHelp()}
          labelAdornment={
            <InfoTooltip label={PTA_TERMS.exchangeRate.label} text={PTA_TERMS.exchangeRate.text} />
          }
        />
      </div>

      <SegmentedControl
        label={PTA_FORM_COPY.routeLabel}
        labelAdornment={<InfoTooltip label={PTA_TERMS.route.label} text={PTA_TERMS.route.text} />}
        name="pta-route"
        options={PTA_ROUTE_OPTIONS}
        value={formState.route}
        onChange={(value) => updateField('route', value)}
        helpText={getRouteHelp(formState.route)}
      />

      <div className="grid gap-5">
        <SegmentedControl
          label={PTA_FORM_COPY.deviceKindLabel}
          labelAdornment={
            <InfoTooltip label={PTA_TERMS.deviceKind.label} text={PTA_TERMS.deviceKind.text} />
          }
          name="pta-device-kind"
          options={PTA_DEVICE_KIND_OPTIONS}
          value={formState.deviceKind}
          onChange={(value) => updateField('deviceKind', value)}
          helpText={getDeviceKindHelp()}
        />

        <SegmentedControl
          label={PTA_FORM_COPY.conditionLabel}
          labelAdornment={
            <InfoTooltip label={PTA_TERMS.condition.label} text={PTA_TERMS.condition.text} />
          }
          name="pta-condition"
          options={PTA_CONDITION_OPTIONS}
          value={formState.condition}
          onChange={(value) => updateField('condition', value)}
        />
      </div>

      {formState.condition === 'used' ? <PtaUsedPhoneNote usedPhone={usedPhone} /> : null}

      <SegmentedControl
        label={PTA_FORM_COPY.valueSourceLabel}
        labelAdornment={
          <InfoTooltip label={PTA_TERMS.valueSource.label} text={PTA_TERMS.valueSource.text} />
        }
        name="pta-value-source"
        options={PTA_VALUE_SOURCE_OPTIONS}
        value={formState.valueSource}
        onChange={(value) => updateField('valueSource', value)}
      />

      <PtaValuePicker
        formState={formState}
        officialCnfUsd={officialCnfUsd}
        updateField={updateField}
        variantOptions={variantOptions}
      />

      <p className="flex items-center gap-2 text-gray-500 text-xs">
        <Lock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        {PTA_FORM_COPY.privacyNote}
      </p>
    </div>
  );
}
