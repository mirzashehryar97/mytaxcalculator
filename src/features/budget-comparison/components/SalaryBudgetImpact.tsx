'use client';

import type { FormEvent } from 'react';

import { Info } from 'lucide-react';

import BudgetSectionHeading from '@/features/budget-comparison/components/BudgetSectionHeading';
import useSalaryBudgetComparison from '@/features/budget-comparison/hooks/useSalaryBudgetComparison';
import { formatPkr } from '@/features/budget-comparison/lib/calculation';
import {
  BUDGET_PAGE_LABELS,
  SALARY_SLAB_COMPARISON,
} from '@/features/budget-comparison/lib/content';

export default function SalaryBudgetImpact() {
  const { salaryInput, setSalaryInput, result, error, compareSalary } = useSalaryBudgetComparison();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    compareSalary();
  };

  return (
    <section id="salary-tax" aria-labelledby="salary-tax-heading" className="scroll-mt-24">
      <BudgetSectionHeading id="salary-tax-heading">
        {BUDGET_PAGE_LABELS.salaryTitle}
      </BudgetSectionHeading>
      <div className="rounded-xl border-[1.5px] border-slate-300 bg-white p-4 shadow-sm sm:p-6">
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-[1.35fr_repeat(3,minmax(0,1fr))]">
          <form
            onSubmit={handleSubmit}
            className="rounded-lg bg-slate-50 p-4 sm:col-span-3 lg:col-span-1"
          >
            <label
              htmlFor="budget-monthly-salary"
              className="font-semibold text-base text-slate-800"
            >
              Monthly salary (PKR)
            </label>
            <input
              id="budget-monthly-salary"
              type="text"
              inputMode="numeric"
              value={salaryInput}
              onChange={(event) => setSalaryInput(event.target.value)}
              className="mt-2 h-11 w-full rounded-md border-[1.5px] border-slate-300 bg-white px-3 text-base text-slate-900 outline-none transition focus:border-emerald-700 focus:ring-4 focus:ring-emerald-100"
              aria-describedby={error ? 'budget-salary-error' : undefined}
            />
            <button
              type="submit"
              className="mt-3 flex h-11 w-full items-center justify-center rounded-md bg-gradient-to-r from-emerald-700 to-emerald-800 px-4 font-semibold text-base text-white shadow-sm transition hover:from-emerald-800 hover:to-emerald-900 focus:outline-none focus:ring-4 focus:ring-emerald-200"
            >
              Compare my tax
            </button>
            {error ? (
              <p id="budget-salary-error" className="mt-2 text-red-600 text-sm">
                {error}
              </p>
            ) : null}
          </form>

          <div className="flex min-h-36 flex-col justify-center rounded-lg border border-slate-200 bg-white p-4 text-center">
            <p className="font-bold text-base text-slate-600">FY 2025–26</p>
            <p className="mt-1 text-slate-500 text-sm">Annual tax</p>
            <p className="mt-3 font-bold text-2xl text-red-600">{formatPkr(result.previousTax)}</p>
          </div>
          <div className="flex min-h-36 flex-col justify-center rounded-lg border border-slate-200 bg-white p-4 text-center">
            <p className="font-bold text-base text-slate-600">FY 2026–27</p>
            <p className="mt-1 text-slate-500 text-sm">Annual tax</p>
            <p className="mt-3 font-bold text-2xl text-red-600">{formatPkr(result.currentTax)}</p>
          </div>
          <div className="flex min-h-36 flex-col justify-center rounded-lg border border-emerald-200 bg-emerald-50/50 p-4 text-center">
            <p className="font-semibold text-base text-emerald-800">You save</p>
            <p className="mt-3 font-bold text-2xl text-emerald-700">
              {formatPkr(result.annualSavings)}
            </p>
            <p className="mt-1 text-base text-emerald-800">/ year</p>
          </div>
        </div>

        <div className="mt-5 overflow-x-auto rounded-lg border-[1.5px] border-slate-300">
          <table className="w-full min-w-[680px] text-left text-base leading-6">
            <thead className="bg-slate-100 text-[#0b1736]">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Annual taxable income slab
                </th>
                <th scope="col" className="px-4 py-3 text-center font-semibold">
                  FY 2025–26 rate
                </th>
                <th scope="col" className="px-4 py-3 text-center font-semibold">
                  FY 2026–27 rate
                </th>
                <th scope="col" className="px-4 py-3 text-center font-semibold">
                  Change
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {SALARY_SLAB_COMPARISON.map((row) => (
                <tr key={row.id} className="even:bg-slate-50/60">
                  <td className="px-4 py-2.5 text-slate-700">{row.incomeBand}</td>
                  <td className="px-4 py-2.5 text-center text-slate-700">{row.previousRate}</td>
                  <td className="px-4 py-2.5 text-center text-slate-800">{row.currentRate}</td>
                  <td className="px-4 py-2.5 text-center">
                    {row.change === '—' ? (
                      <span className="text-slate-500">—</span>
                    ) : (
                      <span className="inline-flex rounded-md bg-emerald-50 px-2.5 py-1 font-semibold text-emerald-800 text-sm">
                        {row.change}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-lg border-[1.5px] border-emerald-300 bg-emerald-50/50 px-4 py-3 text-base text-emerald-900">
          <Info className="h-5 w-5 shrink-0" aria-hidden="true" />
          <span>{BUDGET_PAGE_LABELS.salarySurchargeNotice}</span>
        </div>
      </div>
    </section>
  );
}
