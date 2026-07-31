import { AlertTriangle, Info, Scale } from 'lucide-react';

import ResultCard from '@/components/calculator/ResultCard';
import InfoTooltip from '@/components/ui/InfoTooltip';

import { CORPORATE_TERMS } from '@/features/corporate-tax/lib/content';
import {
  formatCorporateFiscalYear,
  formatPercent,
  formatPkr,
} from '@/features/corporate-tax/lib/formatting';
import { MINIMUM_TAX_RESULT_COPY } from '@/features/corporate-tax/lib/minimumTaxContent';
import { CORPORATE_PAGE_COPY } from '@/features/corporate-tax/lib/modeContent';
import { getMinimumTaxSectorLabel } from '@/features/corporate-tax/lib/presentation';
import type { MinimumTaxResult } from '@/features/corporate-tax/types';

interface MinimumTurnoverTaxResultSummaryProps {
  result: MinimumTaxResult;
}

function getVerdict(result: MinimumTaxResult): string {
  if (!result.isCovered) {
    return MINIMUM_TAX_RESULT_COPY.notCovered;
  }
  return result.minimumTaxApplies
    ? MINIMUM_TAX_RESULT_COPY.minimumApplies
    : MINIMUM_TAX_RESULT_COPY.normalApplies;
}

export default function MinimumTurnoverTaxResultSummary({
  result,
}: MinimumTurnoverTaxResultSummaryProps) {
  const fiscalYearLabel = formatCorporateFiscalYear(result.fiscalYear);
  const pageCopy = CORPORATE_PAGE_COPY['minimum-tax'];

  return (
    <div id="minimum-tax-result" className="scroll-mt-24 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-gray-100 border-b pb-5">
        <h2 className="font-bold text-gray-900 text-xl">{pageCopy.resultTitle}</h2>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-3 py-1 font-semibold text-violet-700 text-xs">
          {getMinimumTaxSectorLabel(result.sector)} · {fiscalYearLabel}
        </span>
      </div>

      {result.isCovered ? null : (
        <div className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-950 text-sm leading-relaxed">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden="true" />
          <p>{MINIMUM_TAX_RESULT_COPY.notCovered}</p>
        </div>
      )}

      <section className="stat-card border-violet-200 bg-gradient-to-br from-violet-50 to-indigo-50">
        <h3 className="mb-2 font-bold text-sm text-violet-700 uppercase tracking-wider">
          {MINIMUM_TAX_RESULT_COPY.breakdownTitle}
        </h3>
        <ResultCard
          label={MINIMUM_TAX_RESULT_COPY.turnover}
          value={formatPkr(result.turnover)}
          tone="neutral"
          weight="semibold"
          labelAdornment={
            <InfoTooltip
              label={CORPORATE_TERMS.turnover.label}
              text={CORPORATE_TERMS.turnover.text}
            />
          }
        />
        <ResultCard
          label={MINIMUM_TAX_RESULT_COPY.rate}
          value={formatPercent(result.rate)}
          tone="info"
          weight="semibold"
        />
        <ResultCard
          label={MINIMUM_TAX_RESULT_COPY.minimumTax}
          value={formatPkr(result.minimumTax)}
          tone="negative"
          weight="semibold"
          labelAdornment={
            <InfoTooltip
              label={CORPORATE_TERMS.minimumTax.label}
              text={CORPORATE_TERMS.minimumTax.text}
            />
          }
        />
        <ResultCard
          label={MINIMUM_TAX_RESULT_COPY.normalTax}
          value={formatPkr(result.normalTax)}
          tone="negative"
          weight="semibold"
          labelAdornment={
            <InfoTooltip
              label={CORPORATE_TERMS.normalTax.label}
              text={CORPORATE_TERMS.normalTax.text}
            />
          }
        />
        <ResultCard
          label={MINIMUM_TAX_RESULT_COPY.taxPayable}
          value={formatPkr(result.taxPayable)}
          tone="negative"
          weight="semibold"
          highlight
        />
        <ResultCard
          label={MINIMUM_TAX_RESULT_COPY.carryForward}
          value={formatPkr(result.carryForward)}
          tone="positive"
          weight="semibold"
          last
          labelAdornment={
            <InfoTooltip
              label={CORPORATE_TERMS.carryForward.label}
              text={CORPORATE_TERMS.carryForward.text}
            />
          }
        />
      </section>

      <div className="rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-indigo-50 p-5">
        <h3 className="flex items-center gap-2 font-semibold text-sm text-violet-900">
          <Scale className="h-4 w-4" aria-hidden="true" />
          {MINIMUM_TAX_RESULT_COPY.verdictTitle}
        </h3>
        <p className="mt-2 text-sm text-violet-950/80 leading-relaxed">{getVerdict(result)}</p>
        {result.carryForward > 0 ? (
          <p className="mt-2 text-sm text-violet-950/80 leading-relaxed">
            {MINIMUM_TAX_RESULT_COPY.carryForwardNote}
          </p>
        ) : null}
      </div>

      <div className="flex gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4 text-gray-600 text-sm leading-relaxed">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-gray-400" aria-hidden="true" />
        <p>{pageCopy.assessedNote}</p>
      </div>
    </div>
  );
}
