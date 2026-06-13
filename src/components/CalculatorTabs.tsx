'use client';

import { useState } from 'react';

import dynamic from 'next/dynamic';

import { Calculator, History } from 'lucide-react';

import CalculatorProvider from '@/context/CalculatorProvider';

import MultiYearCalculatorLoading from './MultiYearCalculatorLoading';
import SingleYearCalculator from './SingleYearCalculator';

const MultiYearCalculator = dynamic(() => import('./MultiYearCalculator'), {
  loading: () => <MultiYearCalculatorLoading />,
});

export default function CalculatorTabs() {
  const [activeTab, setActiveTab] = useState<'single' | 'multi'>('single');

  return (
    <CalculatorProvider>
      <div
        className="surface-card animate-fade-up overflow-hidden"
        style={{ animationDelay: '80ms' }}
      >
        <div className="border-gray-100 border-b bg-gray-50/80 p-2 sm:p-3">
          <div className="mx-auto flex max-w-md gap-2 rounded-2xl bg-gray-100 p-1.5">
            <button
              type="button"
              onClick={() => setActiveTab('single')}
              className={`calculator-tab ${activeTab === 'single' ? 'calculator-tab-active' : 'calculator-tab-inactive'}`}
            >
              <Calculator className="h-5 w-5" />
              <span className="hidden sm:inline">Single Year</span>
              <span className="sm:hidden">Single</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('multi')}
              className={`calculator-tab ${activeTab === 'multi' ? 'calculator-tab-active' : 'calculator-tab-inactive'}`}
            >
              <History className="h-5 w-5" />
              <span className="hidden sm:inline">Multi-Year</span>
              <span className="sm:hidden">Multi</span>
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-8">
          {activeTab === 'single' ? <SingleYearCalculator /> : <MultiYearCalculator />}
        </div>
      </div>
    </CalculatorProvider>
  );
}
