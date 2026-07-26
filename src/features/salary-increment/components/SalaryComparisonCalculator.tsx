'use client';

import Link from 'next/link';

import { ArrowRight, Briefcase } from 'lucide-react';

import FiscalYearSelect from '@/components/calculator/FiscalYearSelect';

import { SALARY_TAX_YEARS } from '@/lib/salaryTaxYears';

import useSalaryComparison from '@/features/salary-increment/hooks/useSalaryComparison';
import useSalaryComparisonAnalytics from '@/features/salary-increment/hooks/useSalaryComparisonAnalytics';
import {
  SALARY_COMPARISON_CROSS_LINK,
  SALARY_COMPARISON_FORM_COPY,
} from '@/features/salary-increment/lib/content';
import type { SalaryComparisonMode } from '@/features/salary-increment/types';

import ComparisonResults from './ComparisonResults';
import IncrementForm from './IncrementForm';
import JobOfferForm from './JobOfferForm';
import SalaryComparisonModeTabs from './SalaryComparisonModeTabs';

interface SalaryComparisonCalculatorProps {
  mode: SalaryComparisonMode;
}

export default function SalaryComparisonCalculator({ mode }: SalaryComparisonCalculatorProps) {
  const { formState, comparison, isValid, updateField } = useSalaryComparison(mode);
  useSalaryComparisonAnalytics(mode, formState, isValid);

  const isIncrement = mode === 'increment';
  const invalidMessage = isIncrement
    ? SALARY_COMPARISON_FORM_COPY.invalidIncrement
    : SALARY_COMPARISON_FORM_COPY.invalidJobOffer;

  return (
    <section
      className="surface-card mx-auto max-w-6xl animate-fade-up overflow-hidden"
      aria-label={isIncrement ? 'Salary increment calculator' : 'Job offer comparison calculator'}
    >
      <SalaryComparisonModeTabs mode={mode} />

      <div className="space-y-6 p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col gap-3 border-gray-100 border-b pb-5 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-semibold text-emerald-700 text-xs uppercase tracking-wider">
            {SALARY_COMPARISON_FORM_COPY.inputsHeading}
          </h2>
          <div className="flex items-center gap-3">
            <span className="font-semibold text-gray-500 text-xs">
              {SALARY_COMPARISON_FORM_COPY.fiscalYearLabel}
            </span>
            <FiscalYearSelect
              id="salary-comparison-fiscal-year"
              label={SALARY_COMPARISON_FORM_COPY.fiscalYearLabel}
              years={SALARY_TAX_YEARS}
              value={formState.fiscalYear}
              onChange={(value) => updateField('fiscalYear', value)}
              compact
            />
          </div>
        </div>

        {isIncrement ? (
          <IncrementForm formState={formState} updateField={updateField} />
        ) : (
          <JobOfferForm formState={formState} updateField={updateField} />
        )}

        {isValid ? (
          <ComparisonResults comparison={comparison} />
        ) : (
          <p className="text-red-600 text-sm" role="alert">
            {invalidMessage}
          </p>
        )}

        {isIncrement ? (
          <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-gray-50/70 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold text-gray-900">
                {SALARY_COMPARISON_CROSS_LINK.incrementTitle}
              </p>
              <p className="mt-0.5 text-gray-600 text-sm">
                {SALARY_COMPARISON_CROSS_LINK.incrementDescription}
              </p>
            </div>
            <Link
              href={SALARY_COMPARISON_CROSS_LINK.incrementHref}
              className="inline-flex w-fit shrink-0 items-center gap-2 rounded-xl border border-emerald-200 bg-white px-4 py-2.5 font-semibold text-emerald-700 text-sm transition-colors hover:bg-emerald-50"
            >
              <Briefcase className="h-4 w-4" aria-hidden="true" />
              {SALARY_COMPARISON_CROSS_LINK.incrementCta}
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-gray-50/70 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold text-gray-900">
                {SALARY_COMPARISON_CROSS_LINK.jobOfferTitle}
              </p>
              <p className="mt-0.5 text-gray-600 text-sm">
                {SALARY_COMPARISON_CROSS_LINK.jobOfferDescription}
              </p>
            </div>
            <Link
              href={SALARY_COMPARISON_CROSS_LINK.jobOfferHref}
              className="inline-flex w-fit shrink-0 items-center gap-2 rounded-xl border border-emerald-200 bg-white px-4 py-2.5 font-semibold text-emerald-700 text-sm transition-colors hover:bg-emerald-50"
            >
              {SALARY_COMPARISON_CROSS_LINK.jobOfferCta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
