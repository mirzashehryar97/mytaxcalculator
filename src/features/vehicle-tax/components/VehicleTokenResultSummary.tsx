import { BadgeCheck, Info } from 'lucide-react';

import ResultCard from '@/components/calculator/ResultCard';
import InfoTooltip from '@/components/ui/InfoTooltip';

import VehicleFilerComparison from '@/features/vehicle-tax/components/VehicleFilerComparison';
import VehicleTokenLines from '@/features/vehicle-tax/components/VehicleTokenLines';
import VehicleTokenNotCovered from '@/features/vehicle-tax/components/VehicleTokenNotCovered';
import VehicleTokenSourceNote from '@/features/vehicle-tax/components/VehicleTokenSourceNote';
import VehicleWorkingNote from '@/features/vehicle-tax/components/VehicleWorkingNote';
import {
  VEHICLE_TERMS,
  VEHICLE_TOKEN_PAGE_COPY,
  VEHICLE_TOKEN_RESULT_COPY,
} from '@/features/vehicle-tax/lib/content';
import { formatPkr, formatVehicleFiscalYear } from '@/features/vehicle-tax/lib/formatting';
import {
  getFederalLabel,
  getTokenVehicleSummary,
  getTokenWorking,
} from '@/features/vehicle-tax/lib/presentation';
import { getVehicleProvince } from '@/features/vehicle-tax/lib/rates';
import type { VehicleTokenResult } from '@/features/vehicle-tax/types';

interface VehicleTokenResultSummaryProps {
  result: VehicleTokenResult;
}

export default function VehicleTokenResultSummary({ result }: VehicleTokenResultSummaryProps) {
  const province = getVehicleProvince(result.province);
  const fiscalYearLabel = formatVehicleFiscalYear(result.fiscalYear);

  return (
    <div id="vehicle-token-result" className="scroll-mt-24 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-gray-100 border-b pb-5">
        <h2 className="font-bold text-gray-900 text-xl">{VEHICLE_TOKEN_PAGE_COPY.resultTitle}</h2>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1 font-semibold text-teal-700 text-xs">
          {province.label} · {fiscalYearLabel}
        </span>
      </div>

      <p className="text-gray-500 text-sm">{getTokenVehicleSummary(result)}</p>

      {result.tokenCovered && result.tokenSource ? (
        <>
          {result.tokenSource.tier === 'official' ? null : (
            <VehicleTokenSourceNote source={result.tokenSource} />
          )}
          <VehicleTokenLines result={result} />
        </>
      ) : (
        <>
          <VehicleTokenNotCovered province={province} />
          <ResultCard
            label={getFederalLabel(result)}
            value={formatPkr(result.federalTax)}
            tone="negative"
            last
            labelAdornment={
              <InfoTooltip
                label={VEHICLE_TERMS.federalYearlyTax.label}
                text={VEHICLE_TERMS.federalYearlyTax.text}
              />
            }
          />
        </>
      )}

      <div className="rounded-2xl border border-teal-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-5">
        <p className="text-gray-600 text-sm">{VEHICLE_TOKEN_RESULT_COPY.totalLabel}</p>
        <p className="amount-wrap mt-1 font-bold text-3xl text-red-600 tabular-nums sm:text-4xl">
          {formatPkr(result.total)}
        </p>
        <p className="mt-2 text-gray-600 text-sm leading-relaxed">
          {result.tokenFrequency === 'lifetime'
            ? VEHICLE_TOKEN_RESULT_COPY.oneOffBadge
            : VEHICLE_TOKEN_RESULT_COPY.annualBadge}
        </p>
      </div>

      {result.federalExempt ? (
        <p className="flex gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-950 text-sm leading-relaxed">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
          <span>
            <strong className="font-semibold">
              {VEHICLE_TOKEN_RESULT_COPY.federalExemptTitle}
            </strong>{' '}
            {VEHICLE_TOKEN_RESULT_COPY.federalExemptBody}
          </span>
        </p>
      ) : null}

      <p className="flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-center font-semibold text-emerald-800 text-sm">
        <BadgeCheck className="h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
        {VEHICLE_TOKEN_RESULT_COPY.adjustableBadge}
        <InfoTooltip label={VEHICLE_TERMS.adjustable.label} text={VEHICLE_TERMS.adjustable.text} />
      </p>

      <p className="flex gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4 text-gray-600 text-sm leading-relaxed">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" aria-hidden="true" />
        <span>{VEHICLE_TOKEN_RESULT_COPY.provincialNotAdjustable}</span>
      </p>

      {result.tokenCovered && result.tokenSource?.tier === 'official' ? (
        <VehicleTokenSourceNote source={result.tokenSource} />
      ) : null}

      {result.federalExempt ? null : (
        <VehicleFilerComparison
          title={VEHICLE_TOKEN_RESULT_COPY.comparisonTitle}
          subtitle={VEHICLE_TOKEN_RESULT_COPY.comparisonSubtitle}
          filerLabel={VEHICLE_TOKEN_RESULT_COPY.filerLabel}
          nonFilerLabel={VEHICLE_TOKEN_RESULT_COPY.nonFilerLabel}
          savingLabel={VEHICLE_TOKEN_RESULT_COPY.savingLabel}
          filerTax={result.federalFilerTax}
          nonFilerTax={result.federalNonFilerTax}
          saving={result.filerSaving}
          term={VEHICLE_TERMS.tokenFilerStatus}
          filer={result.filer}
        />
      )}

      <VehicleWorkingNote
        title={VEHICLE_TOKEN_RESULT_COPY.workingTitle}
        body={getTokenWorking(result)}
      />
    </div>
  );
}
