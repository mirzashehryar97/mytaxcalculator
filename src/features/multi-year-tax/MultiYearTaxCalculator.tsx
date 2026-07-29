'use client';

import MultiYearResults from '@/features/multi-year-tax/components/MultiYearResults';
import MultiYearSalaryHistory from '@/features/multi-year-tax/components/MultiYearSalaryHistory';
import useMultiYearTax from '@/features/multi-year-tax/hooks/useMultiYearTax';

/**
 * Multi-year salary tax: a history of salary periods, taxed fiscal year by
 * fiscal year against the slabs that applied in each one.
 */
export default function MultiYearTaxCalculator() {
  const {
    addPeriod,
    calculate,
    canCalculate,
    expandedPeriodId,
    periods,
    removePeriod,
    result,
    togglePeriod,
    updateDatePart,
    updateSalary,
    validationError,
  } = useMultiYearTax();

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <MultiYearSalaryHistory
        canCalculate={canCalculate}
        expandedPeriodId={expandedPeriodId}
        onAddPeriod={addPeriod}
        onCalculate={calculate}
        onDateChange={updateDatePart}
        onRemove={removePeriod}
        onSalaryChange={updateSalary}
        onToggle={togglePeriod}
        periods={periods}
        validationError={validationError}
      />

      {result ? <MultiYearResults result={result} /> : null}
    </div>
  );
}
