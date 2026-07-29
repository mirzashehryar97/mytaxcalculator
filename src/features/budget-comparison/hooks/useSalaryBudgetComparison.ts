'use client';

import { useState } from 'react';

import {
  calculateSalaryBudgetComparison,
  parseMonthlySalary,
} from '@/features/budget-comparison/lib/calculation';

const DEFAULT_MONTHLY_SALARY = 300_000;

export default function useSalaryBudgetComparison() {
  const [salaryInput, setSalaryInput] = useState(String(DEFAULT_MONTHLY_SALARY));
  const [result, setResult] = useState(() =>
    calculateSalaryBudgetComparison(DEFAULT_MONTHLY_SALARY),
  );
  const [error, setError] = useState('');

  const compareSalary = () => {
    const monthlySalary = parseMonthlySalary(salaryInput);

    if (monthlySalary === null) {
      setError('Enter a valid monthly salary of zero or more.');
      return;
    }

    setError('');
    setResult(calculateSalaryBudgetComparison(monthlySalary));
  };

  return {
    salaryInput,
    setSalaryInput,
    result,
    error,
    compareSalary,
  };
}
