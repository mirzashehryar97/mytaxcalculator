import { BadgeCheck, CheckCircle2 } from 'lucide-react';

import ResultCard from '@/components/calculator/ResultCard';
import InfoTooltip from '@/components/ui/InfoTooltip';

import WithholdingFilerComparison from '@/features/withholding-tax/components/WithholdingFilerComparison';
import WithholdingWorkingNote from '@/features/withholding-tax/components/WithholdingWorkingNote';
import {
  CASH_WITHDRAWAL_RESULT_COPY,
  WITHHOLDING_PAGE_COPY,
  WITHHOLDING_TERMS,
} from '@/features/withholding-tax/lib/content';
import {
  formatPercent,
  formatPkr,
  formatWithholdingFiscalYear,
} from '@/features/withholding-tax/lib/formatting';
import {
  getCashWithdrawalWorking,
  getFilerStatusLabel,
} from '@/features/withholding-tax/lib/presentation';
import type { CashWithdrawalResult } from '@/features/withholding-tax/types';

interface CashWithdrawalResultSummaryProps {
  result: CashWithdrawalResult;
}

export default function CashWithdrawalResultSummary({ result }: CashWithdrawalResultSummaryProps) {
  const noDeduction = result.tax === 0;

  return (
    <div id="cash-withdrawal-result" className="scroll-mt-24 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-gray-100 border-b pb-5">
        <h2 className="font-bold text-gray-900 text-xl">
          {WITHHOLDING_PAGE_COPY['cash-withdrawal'].resultTitle}
        </h2>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-700 text-xs">
          {getFilerStatusLabel(result.filer)} · {formatWithholdingFiscalYear(result.fiscalYear)}
        </span>
      </div>

      <div>
        <p className="text-gray-600 text-sm">{CASH_WITHDRAWAL_RESULT_COPY.appliedRateLabel}</p>
        <p className="mt-1 font-bold text-4xl text-blue-600 tabular-nums">
          {formatPercent(result.rate)}
        </p>
      </div>

      <div className="border-gray-100 border-t pt-1">
        <ResultCard
          label={CASH_WITHDRAWAL_RESULT_COPY.cashLabel}
          value={formatPkr(result.dailyWithdrawal)}
          tone="neutral"
        />
        <ResultCard
          label={CASH_WITHDRAWAL_RESULT_COPY.taxLabel}
          value={formatPkr(result.tax)}
          tone="negative"
          highlight
        />
        <ResultCard
          label={CASH_WITHDRAWAL_RESULT_COPY.inHandLabel}
          value={formatPkr(result.cashInHand)}
          tone="positive"
          highlight
          last
          labelAdornment={
            <InfoTooltip
              label={WITHHOLDING_TERMS.cashInHand.label}
              text={WITHHOLDING_TERMS.cashInHand.text}
            />
          }
        />
      </div>

      {noDeduction ? (
        <p className="flex gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-950 text-sm leading-relaxed">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
          <span>
            <strong className="font-semibold">{CASH_WITHDRAWAL_RESULT_COPY.noTaxTitle}</strong>{' '}
            {result.filer
              ? CASH_WITHDRAWAL_RESULT_COPY.filerBody
              : CASH_WITHDRAWAL_RESULT_COPY.belowThresholdBody}
          </span>
        </p>
      ) : (
        <WithholdingFilerComparison
          title={CASH_WITHDRAWAL_RESULT_COPY.joinListTitle}
          body={CASH_WITHDRAWAL_RESULT_COPY.joinListBody}
          savingLabel={CASH_WITHDRAWAL_RESULT_COPY.savingLabel}
          saving={result.saving}
        />
      )}

      <p className="flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-center font-semibold text-emerald-800 text-sm">
        <BadgeCheck className="h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
        {CASH_WITHDRAWAL_RESULT_COPY.adjustableBadge}
        <InfoTooltip
          label={WITHHOLDING_TERMS.countsTowardsTax.label}
          text={WITHHOLDING_TERMS.countsTowardsTax.text}
        />
      </p>

      <WithholdingWorkingNote
        title={CASH_WITHDRAWAL_RESULT_COPY.workingTitle}
        body={getCashWithdrawalWorking(result)}
      />
    </div>
  );
}
