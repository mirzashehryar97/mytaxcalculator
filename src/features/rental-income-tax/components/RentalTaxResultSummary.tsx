import { BadgeCheck, Layers } from 'lucide-react';

import ResultCard from '@/components/calculator/ResultCard';
import TaxBreakdownCard from '@/components/calculator/TaxBreakdownCard';
import InfoTooltip from '@/components/ui/InfoTooltip';

import RentalFilerComparison from '@/features/rental-income-tax/components/RentalFilerComparison';
import {
  RENTAL_PAGE_COPY,
  RENTAL_RESULT_COPY,
  RENTAL_TERMS,
} from '@/features/rental-income-tax/lib/content';
import {
  formatPercent,
  formatPkr,
  formatRentalFiscalYear,
} from '@/features/rental-income-tax/lib/formatting';
import {
  getRentalOwnerLabel,
  getRentalWorkingDescription,
} from '@/features/rental-income-tax/lib/presentation';
import type { RentalTaxResult } from '@/features/rental-income-tax/types';

interface RentalTaxResultSummaryProps {
  result: RentalTaxResult;
}

/** Shared row labels so the monthly and yearly cards stay identical. */
const rentLabel = (
  <>
    {RENTAL_RESULT_COPY.rentLabel}
    <InfoTooltip label={RENTAL_TERMS.grossRent.label} text={RENTAL_TERMS.grossRent.text} />
  </>
);

const taxLabel = (
  <>
    {RENTAL_RESULT_COPY.taxLabel}
    <InfoTooltip label={RENTAL_TERMS.deductedTax.label} text={RENTAL_TERMS.deductedTax.text} />
  </>
);

export default function RentalTaxResultSummary({ result }: RentalTaxResultSummaryProps) {
  const fiscalYearLabel = formatRentalFiscalYear(result.fiscalYear);

  return (
    <div id="rental-tax-result" className="scroll-mt-24 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-gray-100 border-b pb-5">
        <h2 className="font-bold text-gray-900 text-xl">{RENTAL_PAGE_COPY.resultTitle}</h2>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-700 text-xs">
          {getRentalOwnerLabel(result.ownerType)} · {fiscalYearLabel}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TaxBreakdownCard
          title={RENTAL_RESULT_COPY.monthlyBreakdownTitle}
          grossLabel={rentLabel}
          taxLabel={taxLabel}
          netLabel={RENTAL_RESULT_COPY.rentAfterTaxLabel}
          grossValue={formatPkr(result.monthlyRent)}
          taxValue={formatPkr(result.monthlyTax)}
          netValue={formatPkr(result.monthlyRentAfterTax)}
          taxNote={
            <span className="mt-1 block text-gray-500 text-xs leading-relaxed">
              {RENTAL_RESULT_COPY.monthlyTaxNote}
            </span>
          }
        />
        <TaxBreakdownCard
          title={RENTAL_RESULT_COPY.annualBreakdownTitle}
          grossLabel={rentLabel}
          taxLabel={taxLabel}
          netLabel={RENTAL_RESULT_COPY.rentAfterTaxLabel}
          grossValue={formatPkr(result.annualRent)}
          taxValue={formatPkr(result.tax)}
          netValue={formatPkr(result.rentAfterTax)}
        />
      </div>

      <ResultCard
        label={RENTAL_RESULT_COPY.effectiveRate}
        value={formatPercent(result.effectiveRate)}
        tone="info"
        weight="semibold"
        last
        labelAdornment={
          <InfoTooltip
            label={RENTAL_TERMS.effectiveRate.label}
            text={RENTAL_TERMS.effectiveRate.text}
          />
        }
      />

      <p className="flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-center font-semibold text-emerald-800 text-sm">
        <BadgeCheck className="h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
        {RENTAL_RESULT_COPY.adjustableBadge}
        <InfoTooltip label={RENTAL_TERMS.adjustable.label} text={RENTAL_TERMS.adjustable.text} />
      </p>

      <RentalFilerComparison result={result} />

      <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="flex items-center gap-1.5">
            <h3 className="font-semibold text-emerald-900 text-sm">
              {RENTAL_RESULT_COPY.workingTitle} ({fiscalYearLabel})
            </h3>
            <InfoTooltip label={RENTAL_TERMS.taxBand.label} text={RENTAL_TERMS.taxBand.text} />
          </span>
          <span className="inline-flex items-center gap-1.5 font-bold text-emerald-700 text-lg tabular-nums">
            <Layers className="h-4 w-4" aria-hidden="true" />
            {formatPercent(result.usesFlatRate ? (result.flatRate ?? 0) : result.marginalRate)}
          </span>
        </div>
        <p className="mt-2 text-emerald-950/80 text-sm leading-relaxed">
          {getRentalWorkingDescription(result)}
        </p>
      </div>
    </div>
  );
}
