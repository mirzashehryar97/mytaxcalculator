import CapitalGainsFilerComparison from '@/features/capital-gains-tax/components/CapitalGainsFilerComparison';
import CapitalGainsResultSummary from '@/features/capital-gains-tax/components/CapitalGainsResultSummary';
import CapitalGainsWorkingNote from '@/features/capital-gains-tax/components/CapitalGainsWorkingNote';
import {
  CAPITAL_GAINS_PAGE_COPY,
  CAPITAL_GAINS_RESULT_COPY,
  LISTED_SECURITIES_RESULT_COPY,
} from '@/features/capital-gains-tax/lib/content';
import {
  buildListedResultRows,
  getHoldingLabel,
  getListedRuleLabel,
  getListedWorking,
} from '@/features/capital-gains-tax/lib/presentation';
import type { ListedSecuritiesResult } from '@/features/capital-gains-tax/types';

interface ListedSecuritiesResultSummaryProps {
  result: ListedSecuritiesResult;
}

export default function ListedSecuritiesResultSummary({
  result,
}: ListedSecuritiesResultSummaryProps) {
  const holdingLabel = getHoldingLabel(result);

  return (
    <CapitalGainsResultSummary
      id="listed-securities-result"
      title={CAPITAL_GAINS_PAGE_COPY['listed-securities'].resultTitle}
      fiscalYear={result.fiscalYear}
      filer={result.filer}
      rate={result.rate}
      ruleLabel={getListedRuleLabel(result)}
      rows={buildListedResultRows(result)}
      confidence={result.confidence}
    >
      {holdingLabel ? (
        <p className="text-gray-500 text-sm">
          {LISTED_SECURITIES_RESULT_COPY.holdingLabel}{' '}
          <strong className="font-semibold text-gray-700">{holdingLabel}</strong>.
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
        body={getListedWorking(result)}
        footnote={`${LISTED_SECURITIES_RESULT_COPY.collectorNote} ${LISTED_SECURITIES_RESULT_COPY.estimateNote}`}
      />
    </CapitalGainsResultSummary>
  );
}
