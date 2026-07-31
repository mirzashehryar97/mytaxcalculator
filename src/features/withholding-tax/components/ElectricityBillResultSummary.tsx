import { BadgeCheck, CheckCircle2, Info } from 'lucide-react';

import ResultCard from '@/components/calculator/ResultCard';
import InfoTooltip from '@/components/ui/InfoTooltip';

import WithholdingFilerComparison from '@/features/withholding-tax/components/WithholdingFilerComparison';
import WithholdingWorkingNote from '@/features/withholding-tax/components/WithholdingWorkingNote';
import {
  ELECTRICITY_RESULT_COPY,
  WITHHOLDING_PAGE_COPY,
  WITHHOLDING_TERMS,
} from '@/features/withholding-tax/lib/content';
import {
  formatPercent,
  formatPkr,
  formatWithholdingFiscalYear,
} from '@/features/withholding-tax/lib/formatting';
import {
  getElectricityConnectionLabel,
  getElectricityNoTaxReason,
  getElectricityWorking,
} from '@/features/withholding-tax/lib/presentation';
import type { ElectricityResult } from '@/features/withholding-tax/types';

interface ElectricityBillResultSummaryProps {
  result: ElectricityResult;
}

export default function ElectricityBillResultSummary({
  result,
}: ElectricityBillResultSummaryProps) {
  const isDomestic = result.connection === 'domestic';
  const noTax = result.tax === 0;

  return (
    <div id="electricity-bill-result" className="scroll-mt-24 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-gray-100 border-b pb-5">
        <h2 className="font-bold text-gray-900 text-xl">
          {WITHHOLDING_PAGE_COPY.electricity.resultTitle}
        </h2>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 font-semibold text-amber-700 text-xs">
          <span className="capitalize">{getElectricityConnectionLabel(result.connection)}</span> ·{' '}
          {formatWithholdingFiscalYear(result.fiscalYear)}
        </span>
      </div>

      <div>
        <p className="text-gray-600 text-sm">{ELECTRICITY_RESULT_COPY.appliedRateLabel}</p>
        <p className="mt-1 font-bold text-4xl text-blue-600 tabular-nums">
          {formatPercent(noTax ? 0 : result.rate)}
        </p>
        {result.fixed > 0 && !noTax ? (
          <p className="mt-1 text-gray-500 text-sm leading-relaxed">
            plus a fixed {formatPkr(result.fixed)}, on the part of the bill above{' '}
            {formatPkr(result.rateAppliesAbove)}
          </p>
        ) : null}
      </div>

      <div className="border-gray-100 border-t pt-1">
        <ResultCard
          label={ELECTRICITY_RESULT_COPY.billLabel}
          value={formatPkr(result.billAmount)}
          tone="neutral"
        />
        <ResultCard
          label={ELECTRICITY_RESULT_COPY.taxLabel}
          value={formatPkr(result.tax)}
          tone="negative"
          highlight
        />
        <ResultCard
          label={ELECTRICITY_RESULT_COPY.effectiveRateLabel}
          value={formatPercent(result.effectiveRate)}
          tone="info"
          weight="semibold"
        />
        <ResultCard
          label={ELECTRICITY_RESULT_COPY.totalLabel}
          value={formatPkr(result.totalPayable)}
          tone="neutral"
          highlight
          last
        />
      </div>

      {noTax ? (
        <p className="flex gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-950 text-sm leading-relaxed">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
          <span>
            <strong className="font-semibold">{ELECTRICITY_RESULT_COPY.noTaxTitle}</strong>{' '}
            {getElectricityNoTaxReason(result)}
          </span>
        </p>
      ) : null}

      {isDomestic && !result.filer && result.saving > 0 ? (
        <WithholdingFilerComparison
          title={ELECTRICITY_RESULT_COPY.joinListTitle}
          body={ELECTRICITY_RESULT_COPY.joinListBody}
          savingLabel={ELECTRICITY_RESULT_COPY.savingLabel}
          saving={result.saving}
        />
      ) : null}

      {result.sameForEveryone ? (
        <p className="flex gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4 text-gray-600 text-sm leading-relaxed">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-gray-400" aria-hidden="true" />
          <span>
            <strong className="font-semibold text-gray-900">
              {ELECTRICITY_RESULT_COPY.sameForEveryoneTitle}
            </strong>{' '}
            {ELECTRICITY_RESULT_COPY.sameForEveryoneBody}
          </span>
        </p>
      ) : null}

      <p className="flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-center font-semibold text-emerald-800 text-sm">
        <BadgeCheck className="h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
        {ELECTRICITY_RESULT_COPY.adjustableBadge}
        <InfoTooltip
          label={WITHHOLDING_TERMS.countsTowardsTax.label}
          text={WITHHOLDING_TERMS.countsTowardsTax.text}
        />
      </p>

      <WithholdingWorkingNote
        title={ELECTRICITY_RESULT_COPY.workingTitle}
        body={getElectricityWorking(result)}
      />
    </div>
  );
}
