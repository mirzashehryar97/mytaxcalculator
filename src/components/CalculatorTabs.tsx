'use client';

import { useState } from 'react';

import dynamic from 'next/dynamic';

import { Calculator, History } from 'lucide-react';

import CalculatorProvider from '@/context/CalculatorProvider';

import { trackAnalyticsEvent } from '@/lib/analytics';

import MultiYearTaxLoading from '@/features/multi-year-tax/components/MultiYearTaxLoading';

import SingleYearCalculator from './SingleYearCalculator';

const MultiYearTaxCalculator = dynamic(
  () => import('@/features/multi-year-tax/MultiYearTaxCalculator'),
  { loading: () => <MultiYearTaxLoading /> },
);

export default function CalculatorTabs() {
  const [activeTab, setActiveTab] = useState<'single' | 'multi'>('single');

  const selectTab = (tab: 'single' | 'multi') => {
    if (tab !== activeTab) {
      trackAnalyticsEvent('calculator_tab_select', { tab });
    }
    setActiveTab(tab);
  };

  return (
    <CalculatorProvider>
      {/* No overflow clipping here: the multi-year date dropdowns open past the
          card edge, so the tab strip rounds its own top corners instead. */}
      <div className="surface-card animate-fade-up" style={{ animationDelay: '80ms' }}>
        <div className="rounded-t-3xl border-gray-100 border-b bg-gray-50/80 p-2 sm:p-3">
          <div className="mx-auto flex max-w-md gap-2 rounded-2xl bg-gray-100 p-1.5">
            <button
              type="button"
              onClick={() => selectTab('single')}
              className={`calculator-tab ${activeTab === 'single' ? 'calculator-tab-active' : 'calculator-tab-inactive'}`}
            >
              <Calculator className="h-5 w-5" />
              <span className="hidden sm:inline">Single Year</span>
              <span className="sm:hidden">Single</span>
            </button>
            <button
              type="button"
              onClick={() => selectTab('multi')}
              className={`calculator-tab ${activeTab === 'multi' ? 'calculator-tab-active' : 'calculator-tab-inactive'}`}
            >
              <History className="h-5 w-5" />
              <span className="hidden sm:inline">Multi-Year</span>
              <span className="sm:hidden">Multi</span>
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-8">
          {activeTab === 'single' ? <SingleYearCalculator /> : <MultiYearTaxCalculator />}
        </div>
      </div>
    </CalculatorProvider>
  );
}
