import { BadgeCheck, Info, Layers } from 'lucide-react';

import InfoTooltip from '@/components/ui/InfoTooltip';

import PropertyFilerComparison from '@/features/property-tax/components/PropertyFilerComparison';
import {
  PROPERTY_PAGE_COPY,
  PROPERTY_RESULT_COPY,
  PROPERTY_TERMS,
} from '@/features/property-tax/lib/content';
import {
  formatPercent,
  formatPkr,
  formatPropertyFiscalYear,
} from '@/features/property-tax/lib/formatting';
import {
  getPropertyStatusLabel,
  getPropertyTransferWorking,
} from '@/features/property-tax/lib/presentation';
import type { PropertyTransferResult } from '@/features/property-tax/types';

interface PropertyTransferResultSummaryProps {
  result: PropertyTransferResult;
}

export default function PropertyTransferResultSummary({
  result,
}: PropertyTransferResultSummaryProps) {
  const { mode } = result;
  const fiscalYearLabel = formatPropertyFiscalYear(result.fiscalYear);
  const sectionTerm = mode === 'purchase' ? PROPERTY_TERMS.section236K : PROPERTY_TERMS.section236C;

  return (
    <div id="property-tax-result" className="scroll-mt-24 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-gray-100 border-b pb-5">
        <h2 className="flex items-center gap-1.5 font-bold text-gray-900 text-xl">
          {PROPERTY_PAGE_COPY[mode].resultTitle}
          <InfoTooltip label={sectionTerm.label} text={sectionTerm.text} />
        </h2>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-700 text-xs">
          {getPropertyStatusLabel(result.status)} · {fiscalYearLabel}
        </span>
      </div>

      <div>
        <p className="text-gray-600 text-sm">
          {PROPERTY_RESULT_COPY.appliedRateLabel} ({fiscalYearLabel})
        </p>
        <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
          <span className="font-bold text-4xl text-gray-900 tabular-nums">
            {formatPercent(result.rate)}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-700 text-xs">
            <BadgeCheck className="h-4 w-4" aria-hidden="true" />
            Adjustable
            <InfoTooltip
              label={PROPERTY_TERMS.adjustable.label}
              text={PROPERTY_TERMS.adjustable.text}
            />
          </span>
        </div>
      </div>

      <div className="border-gray-100 border-t pt-5">
        <p className="text-gray-600 text-sm">{PROPERTY_RESULT_COPY.advanceTaxLabel[mode]}</p>
        <p className="amount-wrap mt-1 font-bold text-4xl text-red-600 tabular-nums">
          {formatPkr(result.tax)}
        </p>
      </div>

      <p className="flex gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4 text-blue-950 text-sm leading-relaxed">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" aria-hidden="true" />
        {PROPERTY_RESULT_COPY.higherValueNote}
      </p>

      <PropertyFilerComparison result={result} />

      {mode === 'sale' ? (
        <p className="flex gap-3 rounded-xl border border-violet-200 bg-violet-50 p-4 text-sm text-violet-950 leading-relaxed">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-violet-600" aria-hidden="true" />
          {PROPERTY_RESULT_COPY.setOffNote}
        </p>
      ) : null}

      <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-semibold text-emerald-900 text-sm">
            {PROPERTY_RESULT_COPY.workingTitle}
          </h3>
          <span className="inline-flex items-center gap-1.5 font-bold text-emerald-700 text-lg tabular-nums">
            <Layers className="h-4 w-4" aria-hidden="true" />
            {formatPercent(result.rate)}
          </span>
        </div>
        <p className="mt-2 text-emerald-950/80 text-sm leading-relaxed">
          {getPropertyTransferWorking(result)}
        </p>
      </div>
    </div>
  );
}
