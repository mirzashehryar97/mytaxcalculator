import CapitalGainsFilerComparison from '@/features/capital-gains-tax/components/CapitalGainsFilerComparison';
import CapitalGainsResultSummary from '@/features/capital-gains-tax/components/CapitalGainsResultSummary';
import CapitalGainsWorkingNote from '@/features/capital-gains-tax/components/CapitalGainsWorkingNote';
import {
  CAPITAL_GAINS_PAGE_COPY,
  CAPITAL_GAINS_RESULT_COPY,
  MUTUAL_FUND_RESULT_COPY,
} from '@/features/capital-gains-tax/lib/content';
import {
  buildMutualFundResultRows,
  getHoldingLabel,
  getMutualFundRuleLabel,
  getMutualFundWorking,
} from '@/features/capital-gains-tax/lib/presentation';
import type { MutualFundResult } from '@/features/capital-gains-tax/types';

interface MutualFundResultSummaryProps {
  result: MutualFundResult;
}

export default function MutualFundResultSummary({ result }: MutualFundResultSummaryProps) {
  const holdingLabel = getHoldingLabel(result);

  return (
    <CapitalGainsResultSummary
      id="mutual-fund-result"
      title={CAPITAL_GAINS_PAGE_COPY['mutual-funds'].resultTitle}
      fiscalYear={result.fiscalYear}
      filer={result.filer}
      rate={result.rate}
      ruleLabel={getMutualFundRuleLabel(result)}
      rows={buildMutualFundResultRows(result)}
      confidence={result.confidence}
    >
      {holdingLabel ? (
        <p className="text-gray-500 text-sm">
          {MUTUAL_FUND_RESULT_COPY.holdingLabel}{' '}
          <strong className="font-semibold text-gray-700">{holdingLabel}</strong>.
        </p>
      ) : null}

      {result.isSixYearExempt ? (
        <p className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-950 text-sm leading-relaxed">
          <strong className="font-semibold">{MUTUAL_FUND_RESULT_COPY.sixYearTitle}</strong>{' '}
          {MUTUAL_FUND_RESULT_COPY.sixYearBody}
        </p>
      ) : null}

      {result.isLoss ? (
        <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-950 text-sm leading-relaxed">
          <strong className="font-semibold">{CAPITAL_GAINS_RESULT_COPY.lossTitle}</strong>{' '}
          {CAPITAL_GAINS_RESULT_COPY.lossBody}
        </p>
      ) : null}

      {result.saving > 0 ? <CapitalGainsFilerComparison saving={result.saving} /> : null}

      <CapitalGainsWorkingNote
        title={CAPITAL_GAINS_RESULT_COPY.workingTitle}
        body={getMutualFundWorking(result)}
        footnote={MUTUAL_FUND_RESULT_COPY.collectorNote}
      />
    </CapitalGainsResultSummary>
  );
}
