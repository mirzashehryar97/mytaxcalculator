import { AlertTriangle, Info, Layers } from 'lucide-react';

import ResultCard from '@/components/calculator/ResultCard';
import InfoTooltip from '@/components/ui/InfoTooltip';

import { CORPORATE_TERMS } from '@/features/corporate-tax/lib/content';
import {
  formatCorporateFiscalYear,
  formatMillions,
  formatPercent,
  formatPkr,
} from '@/features/corporate-tax/lib/formatting';
import { CORPORATE_PAGE_COPY } from '@/features/corporate-tax/lib/modeContent';
import {
  getSuperTaxBandDescription,
  getSuperTaxpayerLabel,
} from '@/features/corporate-tax/lib/presentation';
import { SUPER_TAX_RESULT_COPY } from '@/features/corporate-tax/lib/superTaxContent';
import type { SuperTaxResult } from '@/features/corporate-tax/types';

interface SuperTaxResultSummaryProps {
  result: SuperTaxResult;
}

function getNextBandNote(result: SuperTaxResult): string | null {
  if (result.isExportExempt || result.nextBandOver === null || result.nextBandRate === null) {
    return null;
  }
  return `Above ${formatMillions(result.nextBandOver)} the rate becomes ${formatPercent(
    result.nextBandRate,
  )} of the whole income.`;
}

export default function SuperTaxResultSummary({ result }: SuperTaxResultSummaryProps) {
  const fiscalYearLabel = formatCorporateFiscalYear(result.fiscalYear);
  const pageCopy = CORPORATE_PAGE_COPY['super-tax'];
  const nextBandNote = getNextBandNote(result);

  return (
    <div id="super-tax-result" className="scroll-mt-24 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-gray-100 border-b pb-5">
        <h2 className="font-bold text-gray-900 text-xl">{pageCopy.resultTitle}</h2>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 font-semibold text-amber-700 text-xs">
          {getSuperTaxpayerLabel(result.taxpayerType)} · {fiscalYearLabel}
        </span>
      </div>

      {result.isExportExempt ? (
        <div className="flex gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-950 text-sm leading-relaxed">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
          <p>{SUPER_TAX_RESULT_COPY.exportExempt}</p>
        </div>
      ) : null}

      <section className="stat-card border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
        <h3 className="mb-2 font-bold text-amber-700 text-sm uppercase tracking-wider">
          {SUPER_TAX_RESULT_COPY.breakdownTitle}
        </h3>
        <ResultCard
          label={SUPER_TAX_RESULT_COPY.income}
          value={formatPkr(result.income)}
          tone="neutral"
          weight="semibold"
          labelAdornment={
            <InfoTooltip
              label={CORPORATE_TERMS.superTaxIncome.label}
              text={CORPORATE_TERMS.superTaxIncome.text}
            />
          }
        />
        <ResultCard
          label={SUPER_TAX_RESULT_COPY.rate}
          value={formatPercent(result.rate)}
          tone="info"
          weight="semibold"
          labelAdornment={
            <InfoTooltip
              label={CORPORATE_TERMS.wholeIncomeRule.label}
              text={CORPORATE_TERMS.wholeIncomeRule.text}
            />
          }
        />
        <ResultCard
          label={SUPER_TAX_RESULT_COPY.superTax}
          value={formatPkr(result.superTax)}
          tone="negative"
          weight="semibold"
          highlight
          labelAdornment={
            <InfoTooltip
              label={CORPORATE_TERMS.superTax.label}
              text={CORPORATE_TERMS.superTax.text}
            />
          }
        />
        <ResultCard
          label={SUPER_TAX_RESULT_COPY.incomeAfterSuperTax}
          value={formatPkr(result.incomeAfterSuperTax)}
          tone="positive"
          weight="semibold"
          highlight
          last
        />
      </section>

      <div className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-semibold text-amber-900 text-sm">
            {SUPER_TAX_RESULT_COPY.verdictTitle} ({fiscalYearLabel})
          </h3>
          <span className="inline-flex items-center gap-1.5 font-bold text-amber-700 text-lg tabular-nums">
            <Layers className="h-4 w-4" aria-hidden="true" />
            {formatPercent(result.rate)}
          </span>
        </div>
        <p className="mt-2 text-amber-950/80 text-sm leading-relaxed">
          {result.isExportExempt
            ? SUPER_TAX_RESULT_COPY.exportExempt
            : getSuperTaxBandDescription(result)}
        </p>
        {nextBandNote ? (
          <p className="mt-2 text-amber-950/80 text-sm leading-relaxed">{nextBandNote}</p>
        ) : null}
      </div>

      <div className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50/60 p-4 text-amber-950 text-sm leading-relaxed">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden="true" />
        <p>{SUPER_TAX_RESULT_COPY.cliffWarning}</p>
      </div>

      <div className="flex gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4 text-gray-600 text-sm leading-relaxed">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-gray-400" aria-hidden="true" />
        <p>{pageCopy.assessedNote}</p>
      </div>
    </div>
  );
}
