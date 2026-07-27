import { ShieldCheck } from 'lucide-react';

import ResultCard from '@/components/calculator/ResultCard';

import EmbedSalaryTaxResultColumn from '@/features/embed-salary-tax/components/EmbedSalaryTaxResultColumn';
import { EMBED_SALARY_TAX_COPY } from '@/features/embed-salary-tax/lib/content';
import { buildEmbedSalaryTaxResultPresentation } from '@/features/embed-salary-tax/lib/presentation';
import type { EmbedSalaryTaxResult } from '@/features/embed-salary-tax/types';

interface EmbedSalaryTaxResultsProps {
  result: EmbedSalaryTaxResult | null;
}

export default function EmbedSalaryTaxResults({ result }: EmbedSalaryTaxResultsProps) {
  const presentation = result ? buildEmbedSalaryTaxResultPresentation(result) : null;

  return (
    <section
      className="min-w-0 rounded-2xl border border-emerald-100 bg-emerald-50/40 p-4 sm:p-6"
      aria-live="polite"
    >
      {presentation ? (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-bold text-emerald-800 text-lg sm:text-xl">
              {EMBED_SALARY_TAX_COPY.resultTitle}
            </h2>
            <div className="min-w-[230px] rounded-xl border border-blue-100 bg-white px-4">
              <ResultCard
                label={presentation.effectiveRateLabel}
                value={presentation.effectiveRateValue}
                tone="info"
                weight="semibold"
                last
              />
            </div>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <EmbedSalaryTaxResultColumn presentation={presentation.monthly} />
            <EmbedSalaryTaxResultColumn presentation={presentation.annual} />
          </div>
        </>
      ) : (
        <>
          <h2 className="font-bold text-emerald-800 text-lg sm:text-xl">
            {EMBED_SALARY_TAX_COPY.resultTitle}
          </h2>
          <p className="mt-4 rounded-xl border border-gray-200 bg-white p-4 text-gray-600 text-sm leading-relaxed">
            {EMBED_SALARY_TAX_COPY.emptyResult}
          </p>
        </>
      )}

      <p className="mt-5 flex items-center justify-center gap-2 text-gray-600 text-sm">
        <ShieldCheck className="h-5 w-5 text-emerald-700" aria-hidden="true" />
        {EMBED_SALARY_TAX_COPY.privacyLabel}
      </p>
    </section>
  );
}
