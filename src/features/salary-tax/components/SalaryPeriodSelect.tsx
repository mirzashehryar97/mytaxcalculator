'use client';

import { Check, ChevronDown } from 'lucide-react';

import useSalaryPeriodSelect from '@/features/salary-tax/hooks/useSalaryPeriodSelect';
import { SALARY_INSIGHT_PERIOD_OPTIONS } from '@/features/salary-tax/lib/insightsContent';
import type { SalaryInsightPeriod } from '@/features/salary-tax/types';

interface SalaryPeriodSelectProps {
  id: string;
  label: string;
  onChange: (period: SalaryInsightPeriod) => void;
  value: SalaryInsightPeriod;
}

export default function SalaryPeriodSelect({
  id,
  label,
  onChange,
  value,
}: SalaryPeriodSelectProps) {
  const { containerRef, isOpen, selectPeriod, toggle } = useSalaryPeriodSelect(onChange);
  const selectedOption = SALARY_INSIGHT_PERIOD_OPTIONS.find((option) => option.value === value);
  const menuId = `${id}-menu`;

  return (
    <div ref={containerRef} className="relative w-full sm:w-40">
      <button
        id={id}
        type="button"
        aria-controls={menuId}
        aria-expanded={isOpen}
        aria-label={`${label}: ${selectedOption?.label ?? value}`}
        onClick={toggle}
        className="inline-flex min-h-11 w-full items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-3 py-2 font-semibold text-gray-700 text-sm shadow-sm transition-colors hover:border-emerald-300 focus:border-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-600/15"
      >
        <span>{selectedOption?.label ?? value}</span>
        <ChevronDown
          aria-hidden
          className={`h-4 w-4 shrink-0 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <fieldset
          id={menuId}
          aria-label={label}
          className="absolute top-full right-0 z-40 mt-2 w-full rounded-xl border border-gray-200 bg-white p-1.5 shadow-xl"
        >
          {SALARY_INSIGHT_PERIOD_OPTIONS.map((option) => {
            const isSelected = option.value === value;

            return (
              <button
                id={`${menuId}-${option.value}`}
                key={option.value}
                type="button"
                aria-pressed={isSelected}
                onClick={() => selectPeriod(option.value)}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left font-medium text-sm transition-colors ${
                  isSelected
                    ? 'bg-emerald-600 text-white'
                    : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-800'
                }`}
              >
                <Check
                  aria-hidden
                  className={`h-4 w-4 shrink-0 ${isSelected ? 'opacity-100' : 'opacity-0'}`}
                />
                {option.label}
              </button>
            );
          })}
        </fieldset>
      )}
    </div>
  );
}
