import { SALARY_INSIGHT_TABS } from '@/features/salary-tax/lib/insightsContent';
import type { SalaryInsightTab } from '@/features/salary-tax/types';

interface SalaryInsightsTabsProps {
  activeTab: SalaryInsightTab;
  onSelect: (tab: SalaryInsightTab) => void;
}

export default function SalaryInsightsTabs({ activeTab, onSelect }: SalaryInsightsTabsProps) {
  return (
    <div
      aria-label="Salary insight views"
      className="grid grid-cols-1 gap-2 sm:flex sm:flex-wrap min-[420px]:grid-cols-3"
      role="tablist"
    >
      {SALARY_INSIGHT_TABS.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            id={`salary-insights-tab-${tab.id}`}
            type="button"
            aria-controls="salary-insights-panel"
            aria-selected={isActive}
            onClick={() => onSelect(tab.id)}
            role="tab"
            className={`min-h-10 rounded-lg px-3 py-2 font-semibold text-xs transition-all focus:outline-none focus:ring-4 focus:ring-emerald-600/15 sm:px-4 sm:text-sm ${
              isActive
                ? 'bg-emerald-600 text-white shadow-emerald-900/15 shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
