import { Info, Layers } from 'lucide-react';

import ResultCard from '@/components/calculator/ResultCard';
import InfoTooltip from '@/components/ui/InfoTooltip';

import {
  BUSINESS_PAGE_COPY,
  BUSINESS_RESULT_COPY,
  BUSINESS_TERMS,
} from '@/features/business-tax/lib/content';
import {
  formatBusinessFiscalYear,
  formatPercent,
  formatPkr,
} from '@/features/business-tax/lib/formatting';
import {
  getBusinessTaxpayerLabel,
  getMarginalBandDescription,
} from '@/features/business-tax/lib/presentation';
import type { BusinessTaxResult } from '@/features/business-tax/types';

interface BusinessTaxResultSummaryProps {
  result: BusinessTaxResult;
}

export default function BusinessTaxResultSummary({ result }: BusinessTaxResultSummaryProps) {
  const fiscalYearLabel = formatBusinessFiscalYear(result.fiscalYear);

  return (
    <div id="business-tax-result" className="scroll-mt-24 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-gray-100 border-b pb-5">
        <h2 className="font-bold text-gray-900 text-xl">{BUSINESS_PAGE_COPY.resultTitle}</h2>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-700 text-xs">
          {getBusinessTaxpayerLabel(result.taxpayerType)} · {fiscalYearLabel}
        </span>
      </div>

      <section className="stat-card border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50">
        <h3 className="mb-2 font-bold text-emerald-700 text-sm uppercase tracking-wider">
          {BUSINESS_RESULT_COPY.annualBreakdownTitle}
        </h3>
        <ResultCard
          label={BUSINESS_RESULT_COPY.taxableIncome}
          value={formatPkr(result.netIncome)}
          tone="neutral"
          weight="semibold"
          labelAdornment={
            <InfoTooltip
              label={BUSINESS_TERMS.taxableIncome.label}
              text={BUSINESS_TERMS.taxableIncome.text}
            />
          }
        />
        <ResultCard
          label={BUSINESS_RESULT_COPY.baseTax}
          value={formatPkr(result.baseTax)}
          tone="negative"
          weight="semibold"
        />
        {result.hasSurchargeRegime ? (
          <ResultCard
            label={BUSINESS_RESULT_COPY.surcharge}
            value={formatPkr(result.surcharge)}
            tone="negative"
            weight="semibold"
            labelAdornment={
              <InfoTooltip
                label={BUSINESS_TERMS.surcharge.label}
                text={BUSINESS_TERMS.surcharge.text}
              />
            }
          />
        ) : null}
        <ResultCard
          label={BUSINESS_RESULT_COPY.totalTax}
          value={formatPkr(result.totalTax)}
          tone="negative"
          weight="semibold"
          highlight
        />
        <ResultCard
          label={BUSINESS_RESULT_COPY.advanceTax}
          value={formatPkr(result.advanceTaxPaid)}
          tone="positive"
          weight="semibold"
          labelAdornment={
            <InfoTooltip
              label={BUSINESS_TERMS.advanceTax.label}
              text={BUSINESS_TERMS.advanceTax.text}
            />
          }
        />
        <ResultCard
          label={BUSINESS_RESULT_COPY.remainingTax}
          value={formatPkr(result.remainingTax)}
          tone="negative"
          weight="semibold"
          highlight
        />
        <ResultCard
          label={BUSINESS_RESULT_COPY.incomeAfterTax}
          value={formatPkr(result.incomeAfterTax)}
          tone="positive"
          weight="semibold"
          highlight
        />
        <ResultCard
          label={BUSINESS_RESULT_COPY.effectiveRate}
          value={formatPercent(result.effectiveRate)}
          tone="info"
          weight="semibold"
          last
          labelAdornment={
            <InfoTooltip
              label={BUSINESS_TERMS.effectiveRate.label}
              text={BUSINESS_TERMS.effectiveRate.text}
            />
          }
        />
      </section>

      <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="flex items-center gap-1.5 font-semibold text-emerald-900 text-sm">
            {BUSINESS_RESULT_COPY.marginalTitle} ({fiscalYearLabel})
            <InfoTooltip label={BUSINESS_TERMS.taxBand.label} text={BUSINESS_TERMS.taxBand.text} />
          </h3>
          <span className="inline-flex items-center gap-1.5 font-bold text-emerald-700 text-lg tabular-nums">
            <Layers className="h-4 w-4" aria-hidden="true" />
            {formatPercent(result.marginalRate)}
          </span>
        </div>
        <p className="mt-2 text-emerald-950/80 text-sm leading-relaxed">
          {getMarginalBandDescription(result)}
        </p>
      </div>

      <div className="flex gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4 text-gray-600 text-sm leading-relaxed">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-gray-400" aria-hidden="true" />
        <p>{BUSINESS_PAGE_COPY.assessedNote}</p>
      </div>
    </div>
  );
}
