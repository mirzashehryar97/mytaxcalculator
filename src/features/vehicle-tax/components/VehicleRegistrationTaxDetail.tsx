import { BadgeCheck, Info } from 'lucide-react';

import ResultCard from '@/components/calculator/ResultCard';
import InfoTooltip from '@/components/ui/InfoTooltip';

import VehicleFilerComparison from '@/features/vehicle-tax/components/VehicleFilerComparison';
import {
  VEHICLE_REGISTRATION_RESULT_COPY,
  VEHICLE_TERMS,
} from '@/features/vehicle-tax/lib/content';
import { formatCharge, formatPercent, formatPkr } from '@/features/vehicle-tax/lib/formatting';
import type { VehicleRegistrationResult } from '@/features/vehicle-tax/types';

interface VehicleRegistrationTaxDetailProps {
  result: VehicleRegistrationResult;
}

/** The figures themselves, once we know the law does set a charge. */
export default function VehicleRegistrationTaxDetail({
  result,
}: VehicleRegistrationTaxDetailProps) {
  const showReduction = result.mode === 'transfer';

  return (
    <>
      <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-5">
        <p className="flex items-center gap-1.5 text-gray-600 text-sm">
          {VEHICLE_REGISTRATION_RESULT_COPY.taxLabel}
          <InfoTooltip
            label={VEHICLE_TERMS.advanceTax.label}
            text={VEHICLE_TERMS.advanceTax.text}
          />
        </p>
        <p className="amount-wrap mt-1 font-bold text-3xl text-red-600 tabular-nums sm:text-4xl">
          {formatPkr(result.tax)}
        </p>
        {result.tierLabel ? (
          <p className="mt-2 text-gray-600 text-sm">
            {result.tierLabel}
            {result.charge ? ` · ${formatCharge(result.charge)}` : null}
          </p>
        ) : null}
      </div>

      {result.pastFiveYears ? (
        <p className="flex gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-950 text-sm leading-relaxed">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
          <span>
            <strong className="font-semibold">
              {VEHICLE_REGISTRATION_RESULT_COPY.pastCutoffTitle}
            </strong>{' '}
            {VEHICLE_REGISTRATION_RESULT_COPY.pastCutoffBody}
          </span>
        </p>
      ) : null}

      <div>
        {showReduction ? (
          <>
            <ResultCard
              label={VEHICLE_REGISTRATION_RESULT_COPY.beforeReductionLabel}
              value={formatPkr(result.taxBeforeReduction)}
              tone="neutral"
              weight="semibold"
            />
            <ResultCard
              label={VEHICLE_REGISTRATION_RESULT_COPY.reductionLabel}
              value={formatPercent(result.reductionPercent)}
              tone="positive"
              weight="semibold"
              labelAdornment={
                <InfoTooltip
                  label={VEHICLE_TERMS.transferReduction.label}
                  text={VEHICLE_TERMS.transferReduction.text}
                />
              }
            />
          </>
        ) : null}
        <ResultCard
          label={VEHICLE_REGISTRATION_RESULT_COPY.effectiveRateLabel}
          value={formatPercent(result.effectiveRate)}
          tone="info"
          weight="semibold"
          last
          labelAdornment={
            <InfoTooltip
              label={VEHICLE_TERMS.effectiveRate.label}
              text={VEHICLE_TERMS.effectiveRate.text}
            />
          }
        />
      </div>

      <p className="flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-center font-semibold text-emerald-800 text-sm">
        <BadgeCheck className="h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
        {VEHICLE_REGISTRATION_RESULT_COPY.adjustableBadge}
        <InfoTooltip label={VEHICLE_TERMS.adjustable.label} text={VEHICLE_TERMS.adjustable.text} />
      </p>

      <VehicleFilerComparison
        title={VEHICLE_REGISTRATION_RESULT_COPY.comparisonTitle}
        subtitle={VEHICLE_REGISTRATION_RESULT_COPY.comparisonSubtitle}
        filerLabel={VEHICLE_REGISTRATION_RESULT_COPY.filerTaxLabel}
        nonFilerLabel={VEHICLE_REGISTRATION_RESULT_COPY.nonFilerTaxLabel}
        savingLabel={VEHICLE_REGISTRATION_RESULT_COPY.savingLabel}
        filerTax={result.filerTax}
        nonFilerTax={result.nonFilerTax}
        saving={result.filerSaving}
        filer={result.filer}
      />
    </>
  );
}
