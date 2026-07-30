import { AlertTriangle, CalendarClock, Info } from 'lucide-react';

import ResultCard from '@/components/calculator/ResultCard';
import InfoTooltip from '@/components/ui/InfoTooltip';

import {
  PROPERTY_PAGE_COPY,
  PROPERTY_RESULT_COPY,
  PROPERTY_TERMS,
} from '@/features/property-tax/lib/content';
import {
  formatHoldingPeriod,
  formatPercent,
  formatPkr,
  formatPropertyFiscalYear,
} from '@/features/property-tax/lib/formatting';
import {
  getPropertyCapitalGainsCreditNote,
  getPropertyCapitalGainsWorking,
  getPropertyStatusLabel,
} from '@/features/property-tax/lib/presentation';
import type { PropertyCapitalGainsResult } from '@/features/property-tax/types';

interface PropertyCapitalGainsResultSummaryProps {
  result: PropertyCapitalGainsResult;
}

export default function PropertyCapitalGainsResultSummary({
  result,
}: PropertyCapitalGainsResultSummaryProps) {
  const isFlatRegime = result.regime === 'flat-15';

  return (
    <div id="property-cgt-result" className="scroll-mt-24 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-gray-100 border-b pb-5">
        <h2 className="font-bold text-gray-900 text-xl">
          {PROPERTY_PAGE_COPY['capital-gains'].resultTitle}
        </h2>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-700 text-xs">
          {getPropertyStatusLabel(result.status)} · {formatPropertyFiscalYear(result.fiscalYear)}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-semibold text-xs ${
            isFlatRegime ? 'bg-amber-50 text-amber-700' : 'bg-blue-50 text-blue-700'
          }`}
        >
          <CalendarClock className="h-4 w-4" aria-hidden="true" />
          {isFlatRegime
            ? PROPERTY_RESULT_COPY.regimeFlatBadge
            : PROPERTY_RESULT_COPY.regimeGridBadge}
        </span>
        {result.datesAreValid ? (
          <span className="text-gray-500 text-xs">
            {PROPERTY_RESULT_COPY.holdingPeriodLabel}: {formatHoldingPeriod(result.holdingYears)}
          </span>
        ) : null}
      </div>

      <div>
        <ResultCard
          label={PROPERTY_RESULT_COPY.capitalGainLabel}
          value={formatPkr(result.gain)}
          tone="neutral"
          labelAdornment={
            <InfoTooltip
              label={PROPERTY_TERMS.capitalGain.label}
              text={PROPERTY_TERMS.capitalGain.text}
            />
          }
        />
        <ResultCard
          label={`${PROPERTY_RESULT_COPY.appliedCgtRateLabel}${result.rateIsMinimum ? ' (minimum)' : ''}`}
          value={formatPercent(result.rate)}
          tone="info"
          weight="semibold"
        />
        <ResultCard
          label={PROPERTY_RESULT_COPY.grossCgtLabel}
          value={formatPkr(result.grossTax)}
          tone="negative"
        />
        <ResultCard
          label={PROPERTY_RESULT_COPY.transferCreditLabel}
          value={`− ${formatPkr(result.transferTaxCredit)}`}
          tone="positive"
          last
          labelAdornment={
            <InfoTooltip
              label={PROPERTY_TERMS.transferCredit.label}
              text={PROPERTY_TERMS.transferCredit.text}
            />
          }
        />
      </div>

      <div className="border-gray-100 border-t pt-5">
        <p className="flex items-center gap-1.5 text-gray-600 text-sm">
          {PROPERTY_RESULT_COPY.netCgtLabel}
          <InfoTooltip label={PROPERTY_TERMS.finalTax.label} text={PROPERTY_TERMS.finalTax.text} />
        </p>
        <p className="amount-wrap mt-1 font-bold text-4xl text-red-600 tabular-nums">
          {formatPkr(result.netTax)}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-medium text-emerald-800 text-sm">
            {PROPERTY_RESULT_COPY.gainAfterTaxLabel}
          </p>
          <p className="amount-wrap mt-1 font-bold text-emerald-700 text-xl tabular-nums">
            {formatPkr(result.gainAfterTax)}
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
          <p className="font-medium text-gray-600 text-sm">
            {PROPERTY_RESULT_COPY.effectiveRateLabel}
          </p>
          <p className="mt-1 font-bold text-gray-900 text-xl tabular-nums">
            {formatPercent(result.effectiveRate)}
          </p>
        </div>
      </div>

      {result.rateIsMinimum ? (
        <p className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-950 text-sm leading-relaxed">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden="true" />
          {PROPERTY_RESULT_COPY.minimumRateNote}
        </p>
      ) : null}

      {result.isLoss ? (
        <p className="flex gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4 text-blue-950 text-sm leading-relaxed">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" aria-hidden="true" />
          {PROPERTY_RESULT_COPY.lossNote}
        </p>
      ) : null}

      {result.fullyCovered ? (
        <p className="flex gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-950 text-sm leading-relaxed">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
          {PROPERTY_RESULT_COPY.fullyCoveredNote}
        </p>
      ) : null}

      <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-5">
        <h3 className="font-semibold text-emerald-900 text-sm">
          {PROPERTY_RESULT_COPY.workingTitle}
        </h3>
        <p className="mt-2 text-emerald-950/80 text-sm leading-relaxed">
          {getPropertyCapitalGainsWorking(result)}
        </p>
        <p className="mt-3 text-emerald-950/60 text-xs leading-relaxed">
          {getPropertyCapitalGainsCreditNote(result)}
        </p>
      </div>
    </div>
  );
}
