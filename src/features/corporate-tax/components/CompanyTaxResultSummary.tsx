import { Info, Percent } from 'lucide-react';

import ResultCard from '@/components/calculator/ResultCard';
import InfoTooltip from '@/components/ui/InfoTooltip';

import { COMPANY_TAX_RESULT_COPY } from '@/features/corporate-tax/lib/companyTaxContent';
import { CORPORATE_TERMS } from '@/features/corporate-tax/lib/content';
import {
  formatCorporateFiscalYear,
  formatPercent,
  formatPkr,
} from '@/features/corporate-tax/lib/formatting';
import { CORPORATE_PAGE_COPY } from '@/features/corporate-tax/lib/modeContent';
import { getCompanyTypeLabel } from '@/features/corporate-tax/lib/presentation';
import type { CompanyTaxResult } from '@/features/corporate-tax/types';

interface CompanyTaxResultSummaryProps {
  result: CompanyTaxResult;
}

export default function CompanyTaxResultSummary({ result }: CompanyTaxResultSummaryProps) {
  const fiscalYearLabel = formatCorporateFiscalYear(result.fiscalYear);
  const pageCopy = CORPORATE_PAGE_COPY['company-tax'];

  return (
    <div id="company-tax-result" className="scroll-mt-24 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-gray-100 border-b pb-5">
        <h2 className="font-bold text-gray-900 text-xl">{pageCopy.resultTitle}</h2>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-700 text-xs">
          {getCompanyTypeLabel(result.companyType)} · {fiscalYearLabel}
        </span>
      </div>

      <section className="stat-card border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50">
        <h3 className="mb-2 font-bold text-emerald-700 text-sm uppercase tracking-wider">
          {COMPANY_TAX_RESULT_COPY.breakdownTitle}
        </h3>
        <ResultCard
          label={COMPANY_TAX_RESULT_COPY.taxableProfit}
          value={formatPkr(result.taxableProfit)}
          tone="neutral"
          weight="semibold"
          labelAdornment={
            <InfoTooltip
              label={CORPORATE_TERMS.taxableProfit.label}
              text={CORPORATE_TERMS.taxableProfit.text}
            />
          }
        />
        <ResultCard
          label={COMPANY_TAX_RESULT_COPY.rate}
          value={formatPercent(result.rate)}
          tone="info"
          weight="semibold"
        />
        <ResultCard
          label={COMPANY_TAX_RESULT_COPY.tax}
          value={formatPkr(result.tax)}
          tone="negative"
          weight="semibold"
          highlight
        />
        <ResultCard
          label={COMPANY_TAX_RESULT_COPY.taxAlreadyPaid}
          value={formatPkr(result.taxAlreadyPaid)}
          tone="positive"
          weight="semibold"
          labelAdornment={
            <InfoTooltip
              label={CORPORATE_TERMS.taxAlreadyPaid.label}
              text={CORPORATE_TERMS.taxAlreadyPaid.text}
            />
          }
        />
        <ResultCard
          label={COMPANY_TAX_RESULT_COPY.remainingTax}
          value={formatPkr(result.remainingTax)}
          tone="negative"
          weight="semibold"
          highlight
        />
        <ResultCard
          label={COMPANY_TAX_RESULT_COPY.profitAfterTax}
          value={formatPkr(result.profitAfterTax)}
          tone="positive"
          weight="semibold"
          highlight
          last
        />
      </section>

      <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-semibold text-emerald-900 text-sm">
            {COMPANY_TAX_RESULT_COPY.rateNoteTitle} ({fiscalYearLabel})
          </h3>
          <span className="inline-flex items-center gap-1.5 font-bold text-emerald-700 text-lg tabular-nums">
            <Percent className="h-4 w-4" aria-hidden="true" />
            {formatPercent(result.rate)}
          </span>
        </div>
        <p className="mt-2 text-emerald-950/80 text-sm leading-relaxed">
          A {getCompanyTypeLabel(result.companyType).toLowerCase()} pays this one rate on the whole
          of its taxable profit. There are no steps or bands.
        </p>
      </div>

      <div className="flex gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4 text-gray-600 text-sm leading-relaxed">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-gray-400" aria-hidden="true" />
        <p>{pageCopy.assessedNote}</p>
      </div>
    </div>
  );
}
