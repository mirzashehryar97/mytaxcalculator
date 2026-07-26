'use client';

import Link from 'next/link';

import { ArrowRight } from 'lucide-react';

import useReverseSalary from '@/features/reverse-salary/hooks/useReverseSalary';
import useReverseSalaryAnalytics from '@/features/reverse-salary/hooks/useReverseSalaryAnalytics';
import {
  REVERSE_SALARY_CROSS_LINK,
  REVERSE_SALARY_FORM_COPY,
} from '@/features/reverse-salary/lib/content';

import ReverseSalaryForm from './ReverseSalaryForm';
import ReverseSalaryResults from './ReverseSalaryResults';

export default function ReverseSalaryCalculator() {
  const { formState, result, isValid, updateField } = useReverseSalary();
  useReverseSalaryAnalytics(formState, isValid);

  return (
    <section
      className="surface-card mx-auto max-w-5xl animate-fade-up overflow-hidden p-4 sm:p-6 lg:p-8"
      aria-label="Reverse salary calculator"
    >
      <div className="space-y-6">
        <ReverseSalaryForm formState={formState} updateField={updateField} />

        {isValid ? (
          <ReverseSalaryResults result={result} />
        ) : (
          <p className="text-red-600 text-sm" role="alert">
            {REVERSE_SALARY_FORM_COPY.invalidMessage}
          </p>
        )}

        <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-gray-50/70 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold text-gray-900">{REVERSE_SALARY_CROSS_LINK.title}</p>
            <p className="mt-0.5 text-gray-600 text-sm">{REVERSE_SALARY_CROSS_LINK.description}</p>
          </div>
          <Link
            href={REVERSE_SALARY_CROSS_LINK.href}
            className="inline-flex w-fit shrink-0 items-center gap-2 rounded-xl border border-emerald-200 bg-white px-4 py-2.5 font-semibold text-emerald-700 text-sm transition-colors hover:bg-emerald-50"
          >
            {REVERSE_SALARY_CROSS_LINK.cta}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
