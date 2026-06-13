'use client';

import { useState } from 'react';

import { CalculatorContext, type CalculatorContextType } from './CalculatorContext';

export default function CalculatorProvider({ children }: { children: React.ReactNode }) {
  const [singleYear, setSingleYear] = useState<CalculatorContextType['singleYear']>({
    salary: '',
    selectedYear: '2026-2027',
    result: null,
  });

  const [multiYear, setMultiYear] = useState<CalculatorContextType['multiYear']>({
    periods: [{ startDate: '', endDate: '', salary: '' }],
    result: null,
  });

  return (
    <CalculatorContext.Provider value={{ singleYear, setSingleYear, multiYear, setMultiYear }}>
      {children}
    </CalculatorContext.Provider>
  );
}
