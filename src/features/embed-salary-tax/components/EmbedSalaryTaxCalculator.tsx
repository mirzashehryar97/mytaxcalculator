'use client';

import EmbedSalaryTaxBrand from '@/features/embed-salary-tax/components/EmbedSalaryTaxBrand';
import EmbedSalaryTaxFooter from '@/features/embed-salary-tax/components/EmbedSalaryTaxFooter';
import EmbedSalaryTaxForm from '@/features/embed-salary-tax/components/EmbedSalaryTaxForm';
import EmbedSalaryTaxResults from '@/features/embed-salary-tax/components/EmbedSalaryTaxResults';
import useEmbedHostTracking from '@/features/embed-salary-tax/hooks/useEmbedHostTracking';
import useEmbedSalaryTax from '@/features/embed-salary-tax/hooks/useEmbedSalaryTax';
import { EMBED_SALARY_TAX_COPY } from '@/features/embed-salary-tax/lib/content';

export default function EmbedSalaryTaxCalculator() {
  const { formState, result, updateField } = useEmbedSalaryTax();

  useEmbedHostTracking();

  return (
    <section
      className="w-full min-w-0 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_18px_45px_-24px_rgba(15,23,42,0.35)]"
      aria-label={EMBED_SALARY_TAX_COPY.title}
    >
      <EmbedSalaryTaxBrand />

      <div className="px-4 py-6 sm:px-7 sm:py-7">
        <h1 className="text-balance font-bold text-2xl text-gray-950 tracking-tight sm:text-3xl">
          {EMBED_SALARY_TAX_COPY.title}
        </h1>
        <p className="mt-2 text-gray-600 text-sm sm:text-base">
          {EMBED_SALARY_TAX_COPY.description}
        </p>

        <div className="mt-6 space-y-5">
          <EmbedSalaryTaxForm formState={formState} updateField={updateField} />
          <EmbedSalaryTaxResults result={result} />
        </div>
      </div>

      <EmbedSalaryTaxFooter />
    </section>
  );
}
