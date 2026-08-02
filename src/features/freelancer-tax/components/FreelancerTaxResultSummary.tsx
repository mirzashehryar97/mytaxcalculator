import { Info, ShieldCheck } from 'lucide-react';

import ResultCard from '@/components/calculator/ResultCard';
import TaxBreakdownCard from '@/components/calculator/TaxBreakdownCard';

import FreelancerPsebComparison from '@/features/freelancer-tax/components/FreelancerPsebComparison';
import {
  FREELANCER_PAGE_COPY,
  FREELANCER_RESULT_COPY,
} from '@/features/freelancer-tax/lib/content';
import { formatFreelancerRate, formatPkr } from '@/features/freelancer-tax/lib/formatting';
import {
  getFreelancerRateBadge,
  getFreelancerTaxCaveat,
} from '@/features/freelancer-tax/lib/presentation';
import type { FreelancerTaxResult } from '@/features/freelancer-tax/types';

interface FreelancerTaxResultSummaryProps {
  result: FreelancerTaxResult;
}

export default function FreelancerTaxResultSummary({ result }: FreelancerTaxResultSummaryProps) {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-gray-100 border-b pb-5">
        <h2 className="font-bold text-gray-900 text-xl">{FREELANCER_PAGE_COPY.resultTitle}</h2>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-700 text-xs">
          <ShieldCheck className="h-4 w-4" aria-hidden="true" />
          {getFreelancerRateBadge(result)}
        </span>
      </div>

      <div>
        <ResultCard
          label={FREELANCER_RESULT_COPY.appliedRate}
          value={formatFreelancerRate(result.rate)}
          last
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TaxBreakdownCard
          title={FREELANCER_RESULT_COPY.monthlyBreakdownTitle}
          grossValue={formatPkr(result.monthlyGrossPkr)}
          taxValue={formatPkr(result.monthlyTax)}
          netValue={formatPkr(result.monthlyNet)}
        />
        <TaxBreakdownCard
          title={FREELANCER_RESULT_COPY.annualBreakdownTitle}
          grossValue={formatPkr(result.grossPkr)}
          taxValue={formatPkr(result.tax)}
          netValue={formatPkr(result.net)}
        />
      </div>

      <FreelancerPsebComparison result={result} />

      <div className="flex gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4 text-blue-950 text-sm leading-relaxed">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" aria-hidden="true" />
        <p>{FREELANCER_PAGE_COPY.bankDeductionNote}</p>
      </div>

      <p className="text-gray-500 text-xs leading-relaxed">{getFreelancerTaxCaveat(result)}</p>
    </div>
  );
}
