'use client';

import { useState } from 'react';

import dynamic from 'next/dynamic';
import Link from 'next/link';

import { sendGAEvent } from '@next/third-parties/google';
import { Calculator, Code2, History } from 'lucide-react';

import CalculatorProvider from '@/context/CalculatorProvider';

import {
  EMBED_SALARY_TAX_DISCOVERY_COPY,
  EMBED_SALARY_TAX_ROUTE,
} from '@/features/embed-salary-tax/lib/content';

import MultiYearCalculatorLoading from './MultiYearCalculatorLoading';
import SingleYearCalculator from './SingleYearCalculator';

const MultiYearCalculator = dynamic(() => import('./MultiYearCalculator'), {
  loading: () => <MultiYearCalculatorLoading />,
});

export default function CalculatorTabs() {
  const [activeTab, setActiveTab] = useState<'single' | 'multi'>('single');

  const selectTab = (tab: 'single' | 'multi') => {
    if (tab !== activeTab) {
      sendGAEvent('event', 'calculator_tab_select', { tab });
    }
    setActiveTab(tab);
  };

  return (
    <CalculatorProvider>
      <div
        className="surface-card animate-fade-up overflow-hidden"
        style={{ animationDelay: '80ms' }}
      >
        <div className="relative border-gray-100 border-b bg-gray-50/80 p-2 sm:p-3">
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
          <Link
            href={EMBED_SALARY_TAX_ROUTE}
            className="lg:-translate-y-1/2 mx-auto mt-2 flex w-fit items-center gap-1.5 rounded-lg px-3 py-2 font-semibold text-emerald-700 text-sm transition-colors hover:bg-emerald-50 hover:text-emerald-900 lg:absolute lg:top-1/2 lg:right-4 lg:mt-0"
          >
            <Code2 className="h-4 w-4" aria-hidden="true" />
            {EMBED_SALARY_TAX_DISCOVERY_COPY.calculatorHeaderLink}
          </Link>
        </div>

        <div className="p-4 sm:p-8">
          {activeTab === 'single' ? <SingleYearCalculator /> : <MultiYearCalculator />}
        </div>
      </div>
    </CalculatorProvider>
  );
}
