import { AlertTriangle, BadgeCheck, CheckCircle2, Info } from 'lucide-react';

import ResultCard from '@/components/calculator/ResultCard';
import InfoTooltip from '@/components/ui/InfoTooltip';

import WithholdingWorkingNote from '@/features/withholding-tax/components/WithholdingWorkingNote';
import {
  TELECOM_RESULT_COPY,
  WITHHOLDING_PAGE_COPY,
  WITHHOLDING_TERMS,
} from '@/features/withholding-tax/lib/content';
import {
  formatPercent,
  formatPkr,
  formatPkrExact,
  formatWithholdingFiscalYear,
} from '@/features/withholding-tax/lib/formatting';
import {
  getTelecomTransactionLabel,
  getTelecomWorking,
} from '@/features/withholding-tax/lib/presentation';
import type { TelecomResult } from '@/features/withholding-tax/types';

interface PhoneInternetResultSummaryProps {
  result: TelecomResult;
}

export default function PhoneInternetResultSummary({ result }: PhoneInternetResultSummaryProps) {
  const isTopUp = result.payment === 'top-up';
  const isLandline = result.service === 'landline';

  return (
    <div id="phone-internet-result" className="scroll-mt-24 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-gray-100 border-b pb-5">
        <h2 className="font-bold text-gray-900 text-xl">
          {WITHHOLDING_PAGE_COPY['phone-internet'].resultTitle}
        </h2>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 font-semibold text-blue-700 text-xs">
          {getTelecomTransactionLabel(result)} · {formatWithholdingFiscalYear(result.fiscalYear)}
        </span>
      </div>

      <div>
        <p className="text-gray-600 text-sm">{TELECOM_RESULT_COPY.appliedRateLabel}</p>
        <p className="mt-1 font-bold text-4xl text-blue-600 tabular-nums">
          {formatPercent(result.rate)}
        </p>
      </div>

      <div className="border-gray-100 border-t pt-1">
        <ResultCard
          label={TELECOM_RESULT_COPY.amountLabel}
          value={formatPkr(result.amount)}
          tone="neutral"
        />
        {isLandline ? (
          <ResultCard
            label={TELECOM_RESULT_COPY.taxableLabel}
            value={formatPkr(result.taxableAmount)}
            tone="neutral"
            weight="semibold"
            labelAdornment={
              <InfoTooltip
                label={WITHHOLDING_TERMS.landlineRule.label}
                text={WITHHOLDING_TERMS.landlineRule.text}
              />
            }
          />
        ) : null}
        <ResultCard
          label={TELECOM_RESULT_COPY.taxLabel}
          value={formatPkrExact(result.tax)}
          tone="negative"
          highlight
        />
        <ResultCard
          label={TELECOM_RESULT_COPY.effectiveRateLabel}
          value={formatPercent(result.effectiveRate)}
          tone="info"
          weight="semibold"
          labelAdornment={
            <InfoTooltip
              label={WITHHOLDING_TERMS.effectiveRate.label}
              text={WITHHOLDING_TERMS.effectiveRate.text}
            />
          }
        />
        {isTopUp ? (
          <ResultCard
            label={TELECOM_RESULT_COPY.receivedLabel}
            value={formatPkrExact(result.amountReceived)}
            tone="positive"
            highlight
            last
          />
        ) : (
          <ResultCard
            label={TELECOM_RESULT_COPY.totalLabel}
            value={formatPkrExact(result.totalPayable)}
            tone="neutral"
            highlight
            last
          />
        )}
      </div>

      {result.tax === 0 ? (
        <p className="flex gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-950 text-sm leading-relaxed">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
          <span>
            <strong className="font-semibold">{TELECOM_RESULT_COPY.noTaxTitle}</strong>{' '}
            {TELECOM_RESULT_COPY.landlineFreeBody}
          </span>
        </p>
      ) : null}

      <p className="flex gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4 text-gray-600 text-sm leading-relaxed">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-gray-400" aria-hidden="true" />
        <span>
          <strong className="font-semibold text-gray-900">
            {TELECOM_RESULT_COPY.sameForEveryoneTitle}
          </strong>{' '}
          {TELECOM_RESULT_COPY.sameForEveryoneBody}
        </span>
      </p>

      {result.namedDefaulterRate === null ? null : (
        <p className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-950 text-sm leading-relaxed">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden="true" />
          <span>
            <strong className="font-semibold">{TELECOM_RESULT_COPY.namedRateTitle}</strong> If the
            FBR has published an order naming you for not filing a return, this amount is charged{' '}
            {formatPercent(result.namedDefaulterRate)} instead —{' '}
            {formatPkrExact(result.namedDefaulterTax)}.{' '}
            <InfoTooltip
              label={WITHHOLDING_TERMS.namedForNotFiling.label}
              text={WITHHOLDING_TERMS.namedForNotFiling.text}
            />
          </span>
        </p>
      )}

      <p className="flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-center font-semibold text-emerald-800 text-sm">
        <BadgeCheck className="h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
        {TELECOM_RESULT_COPY.adjustableBadge}
        <InfoTooltip
          label={WITHHOLDING_TERMS.countsTowardsTax.label}
          text={WITHHOLDING_TERMS.countsTowardsTax.text}
        />
      </p>

      <WithholdingWorkingNote
        title={TELECOM_RESULT_COPY.workingTitle}
        body={getTelecomWorking(result)}
      />
    </div>
  );
}
