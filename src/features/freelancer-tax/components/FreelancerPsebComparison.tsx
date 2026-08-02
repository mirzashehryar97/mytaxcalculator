import { Info } from 'lucide-react';

import { FREELANCER_RESULT_COPY } from '@/features/freelancer-tax/lib/content';
import { formatPkr } from '@/features/freelancer-tax/lib/formatting';
import {
  getFreelancerConcessionLabel,
  getFreelancerStandardLabel,
} from '@/features/freelancer-tax/lib/presentation';
import type { FreelancerTaxResult } from '@/features/freelancer-tax/types';

interface FreelancerPsebComparisonProps {
  result: FreelancerTaxResult;
}

/** What PSEB registration is worth, or why it was worth nothing that year. */
export default function FreelancerPsebComparison({ result }: FreelancerPsebComparisonProps) {
  if (!result.psebRateAvailable) {
    return (
      <div className="flex gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-4 text-gray-700 text-sm leading-relaxed sm:p-5">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-gray-500" aria-hidden="true" />
        <span>
          <span className="block font-semibold text-gray-900">
            {FREELANCER_RESULT_COPY.noPsebRateTitle}
          </span>
          {FREELANCER_RESULT_COPY.noPsebRateBody}
        </span>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-4 sm:p-5">
      <h3 className="text-center font-semibold text-emerald-900 text-sm">
        {FREELANCER_RESULT_COPY.comparisonTitle}
      </h3>
      <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <div className="min-w-0 text-center">
          <p className="text-emerald-800 text-xs">{getFreelancerConcessionLabel(result)}</p>
          <p className="amount-wrap mt-1 font-bold text-emerald-700 text-xl tabular-nums sm:text-2xl">
            {formatPkr(result.concessionTax)}
          </p>
        </div>
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-300 bg-white font-bold text-emerald-700 text-xs">
          VS
        </span>
        <div className="min-w-0 text-center">
          <p className="text-gray-600 text-xs">{getFreelancerStandardLabel(result)}</p>
          <p className="amount-wrap mt-1 font-bold text-gray-800 text-xl tabular-nums sm:text-2xl">
            {formatPkr(result.standardTax)}
          </p>
        </div>
      </div>
      <div className="mt-5 border-emerald-200 border-t pt-4 text-center">
        <p className="text-emerald-800 text-xs">{FREELANCER_RESULT_COPY.savingsLabel}</p>
        <p className="amount-wrap mt-1 font-bold text-2xl text-emerald-700 tabular-nums">
          {formatPkr(result.potentialTaxSavings)} / year
        </p>
      </div>
    </div>
  );
}
