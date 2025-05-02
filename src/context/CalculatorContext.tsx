import React, { createContext, useContext, useState } from 'react';

interface SingleYearState {
  salary: string;
  selectedYear: string;
  result: {
    monthlyIncome: number;
    monthlyTax: number;
    salaryAfterTax: number;
    yearlyIncome: number;
    yearlyTax: number;
    yearlyIncomeAfterTax: number;
    taxRate: number;
  } | null;
}

interface SalaryPeriod {
  startDate: string;
  endDate: string;
  salary: string;
}

interface MultiYearState {
  periods: SalaryPeriod[];
  result: {
    totalTax: number;
    breakdown: Array<{
      period: string;
      tax: number;
      salary: number;
      netIncome: number;
    }>;
  } | null;
}

interface CalculatorContextType {
  singleYear: SingleYearState;
  setSingleYear: React.Dispatch<React.SetStateAction<SingleYearState>>;
  multiYear: MultiYearState;
  setMultiYear: React.Dispatch<React.SetStateAction<MultiYearState>>;
}

const CalculatorContext = createContext<CalculatorContextType | undefined>(undefined);

export function CalculatorProvider({ children }: { children: React.ReactNode }) {
  const [singleYear, setSingleYear] = useState<SingleYearState>({
    salary: '',
    selectedYear: '2024-2025',
    result: null
  });

  const [multiYear, setMultiYear] = useState<MultiYearState>({
    periods: [{ startDate: '', endDate: '', salary: '' }],
    result: null
  });

  return (
    <CalculatorContext.Provider value={{ singleYear, setSingleYear, multiYear, setMultiYear }}>
      {children}
    </CalculatorContext.Provider>
  );
}

export function useCalculator() {
  const context = useContext(CalculatorContext);
  if (context === undefined) {
    throw new Error('useCalculator must be used within a CalculatorProvider');
  }
  return context;
}