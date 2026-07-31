import { Info, Percent, TrendingUp } from 'lucide-react';

import ResultCard from '@/components/calculator/ResultCard';
import InfoTooltip from '@/components/ui/InfoTooltip';

import AgriculturalDisputeNotice from '@/features/agricultural-tax/components/AgriculturalDisputeNotice';
import AgriculturalLandTaxCard from '@/features/agricultural-tax/components/AgriculturalLandTaxCard';
import {
  AGRICULTURAL_PAGE_COPY,
  AGRICULTURAL_RESULT_COPY,
  AGRICULTURAL_TERMS,
} from '@/features/agricultural-tax/lib/content';
import {
  formatAgriculturalFiscalYear,
  formatPercent,
  formatPkr,
} from '@/features/agricultural-tax/lib/formatting';
import {
  getAgriculturalProvince,
  hasDisputedRates,
} from '@/features/agricultural-tax/lib/provinces';
import type { AgriculturalTaxResult } from '@/features/agricultural-tax/types';

interface AgriculturalResultSummaryProps {
  result: AgriculturalTaxResult;
}

export default function AgriculturalResultSummary({ result }: AgriculturalResultSummaryProps) {
  const province = getAgriculturalProvince(result.province);
  const isFarmer = result.taxpayerType === 'farmer';
  const hasPaidSomething = result.taxAlreadyPaid > 0;

  return (
    <div id="agricultural-result" className="scroll-mt-24 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-gray-100 border-b pb-5">
        <h2 className="font-bold text-gray-900 text-xl">{AGRICULTURAL_PAGE_COPY.resultTitle}</h2>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-700 text-xs">
          {province.shortLabel} · {formatAgriculturalFiscalYear(result.fiscalYear)}
        </span>
      </div>

      {hasDisputedRates(result.province) ? <AgriculturalDisputeNotice /> : null}

      <p className="flex gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4 text-blue-950 text-sm leading-relaxed">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" aria-hidden="true" />
        <span>{AGRICULTURAL_RESULT_COPY.federalNote}</span>
      </p>

      <section className="stat-card border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50">
        <h3 className="mb-2 font-bold text-emerald-700 text-sm uppercase tracking-wider">
          {AGRICULTURAL_RESULT_COPY.breakdownTitle}
        </h3>

        <ResultCard
          label={AGRICULTURAL_RESULT_COPY.income}
          value={formatPkr(result.income)}
          tone="neutral"
          weight="semibold"
          labelAdornment={
            <InfoTooltip
              label={AGRICULTURAL_TERMS.farmIncome.label}
              text={AGRICULTURAL_TERMS.farmIncome.text}
            />
          }
        />

        {isFarmer ? (
          <ResultCard
            label={AGRICULTURAL_RESULT_COPY.taxFreePart}
            value={formatPkr(result.exemptThreshold)}
            tone="positive"
            weight="semibold"
            labelAdornment={
              <InfoTooltip
                label={AGRICULTURAL_TERMS.taxFreePart.label}
                text={AGRICULTURAL_TERMS.taxFreePart.text}
              />
            }
          />
        ) : null}

        {isFarmer ? (
          <ResultCard
            label={AGRICULTURAL_RESULT_COPY.taxedPart}
            value={formatPkr(result.taxableIncome)}
            tone="neutral"
            weight="semibold"
          />
        ) : null}

        <ResultCard
          label={isFarmer ? AGRICULTURAL_RESULT_COPY.rate : AGRICULTURAL_RESULT_COPY.flatRate}
          value={formatPercent(result.rate)}
          tone="info"
          weight="semibold"
        />

        <ResultCard
          label={AGRICULTURAL_RESULT_COPY.incomeTax}
          value={formatPkr(result.incomeTax)}
          tone="negative"
          weight="semibold"
          highlight={!result.superTaxApplies}
        />

        {result.superTaxApplies ? (
          <ResultCard
            label={`${AGRICULTURAL_RESULT_COPY.superTax} (${formatPercent(result.superTaxRate)})`}
            value={formatPkr(result.superTax)}
            tone="negative"
            weight="semibold"
            labelAdornment={
              <InfoTooltip
                label={AGRICULTURAL_TERMS.superTax.label}
                text={AGRICULTURAL_TERMS.superTax.text}
              />
            }
          />
        ) : null}

        {result.superTaxApplies ? (
          <ResultCard
            label={AGRICULTURAL_RESULT_COPY.totalTax}
            value={formatPkr(result.totalTax)}
            tone="negative"
            weight="semibold"
            highlight
          />
        ) : null}

        {hasPaidSomething ? (
          <ResultCard
            label={AGRICULTURAL_RESULT_COPY.taxAlreadyPaid}
            value={formatPkr(result.taxAlreadyPaid)}
            tone="positive"
            weight="semibold"
            labelAdornment={
              <InfoTooltip
                label={AGRICULTURAL_TERMS.taxAlreadyPaid.label}
                text={AGRICULTURAL_TERMS.taxAlreadyPaid.text}
              />
            }
          />
        ) : null}

        {hasPaidSomething ? (
          <ResultCard
            label={AGRICULTURAL_RESULT_COPY.remainingTax}
            value={formatPkr(result.remainingTax)}
            tone="negative"
            weight="semibold"
            highlight
          />
        ) : null}

        <ResultCard
          label={AGRICULTURAL_RESULT_COPY.incomeAfterTax}
          value={formatPkr(result.incomeAfterTax)}
          tone="positive"
          weight="semibold"
          highlight
          last
        />
      </section>

      {result.superTaxApplies ? (
        <p className="flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-950 text-sm leading-relaxed">
          <TrendingUp className="mt-0.5 h-5 w-5 shrink-0 text-red-600" aria-hidden="true" />
          <span>
            <strong className="block font-bold text-base">
              {AGRICULTURAL_RESULT_COPY.superTaxCliffTitle}
            </strong>
            <span className="mt-1 block">{AGRICULTURAL_RESULT_COPY.superTaxCliffBody}</span>
          </span>
        </p>
      ) : null}

      <AgriculturalLandTaxCard land={result.land} />

      <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="flex items-center gap-1.5 font-semibold text-emerald-900 text-sm">
            {AGRICULTURAL_RESULT_COPY.effectiveRate}
            <InfoTooltip
              label={AGRICULTURAL_TERMS.effectiveRate.label}
              text={AGRICULTURAL_TERMS.effectiveRate.text}
            />
          </h3>
          <span className="inline-flex items-center gap-1.5 font-bold text-emerald-700 text-lg tabular-nums">
            <Percent className="h-4 w-4" aria-hidden="true" />
            {formatPercent(result.effectiveRate)}
          </span>
        </div>
        <p className="mt-2 text-emerald-950/80 text-sm leading-relaxed">
          This is your total tax as a share of everything you earned from the land. It is assessed
          and collected by the {province.authority}.
        </p>
      </div>

      <p className="flex gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4 text-gray-600 text-sm leading-relaxed">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-gray-400" aria-hidden="true" />
        <span>{AGRICULTURAL_PAGE_COPY.assessedNote}</span>
      </p>
    </div>
  );
}
