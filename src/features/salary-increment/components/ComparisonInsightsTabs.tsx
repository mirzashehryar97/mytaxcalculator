import { SALARY_COMPARISON_INSIGHT_TABS } from '@/features/salary-increment/lib/content';
import type { SalaryComparisonInsightTab } from '@/features/salary-increment/types';

interface ComparisonInsightsTabsProps {
  activeTab: SalaryComparisonInsightTab;
  onSelect: (tab: SalaryComparisonInsightTab) => void;
}

export default function ComparisonInsightsTabs({
  activeTab,
  onSelect,
}: ComparisonInsightsTabsProps) {
  return (
    <div
      aria-label="Salary comparison insight views"
      className="grid grid-cols-1 gap-2 sm:flex sm:flex-wrap min-[420px]:grid-cols-2"
      role="tablist"
    >
      {SALARY_COMPARISON_INSIGHT_TABS.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            aria-controls="comparison-insights-panel"
            aria-selected={isActive}
            className={`min-h-10 rounded-lg px-3 py-2 font-semibold text-xs transition-all focus:outline-none focus:ring-4 focus:ring-emerald-600/15 sm:px-4 sm:text-sm ${
              isActive
                ? 'bg-emerald-600 text-white shadow-emerald-900/15 shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
            }`}
            id={`comparison-insights-tab-${tab.id}`}
            key={tab.id}
            onClick={() => onSelect(tab.id)}
            role="tab"
            type="button"
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
