import { MULTI_YEAR_CHART_TABS } from '@/features/multi-year-tax/lib/content';
import type { MultiYearChartTab } from '@/features/multi-year-tax/types';

interface MultiYearChartTabsProps {
  activeTab: MultiYearChartTab;
  onSelect: (tab: MultiYearChartTab) => void;
}

export default function MultiYearChartTabs({ activeTab, onSelect }: MultiYearChartTabsProps) {
  return (
    <div
      aria-label="Chart views"
      className="flex w-full rounded-xl border border-gray-200 bg-gray-50 p-1"
      role="tablist"
    >
      {MULTI_YEAR_CHART_TABS.map((tab) => {
        const isActive = tab.id === activeTab;

        return (
          <button
            aria-controls="multi-year-chart-panel"
            aria-selected={isActive}
            className={`min-h-10 flex-1 whitespace-nowrap rounded-lg px-2 py-2 font-semibold text-sm transition-all focus:outline-none focus:ring-4 focus:ring-emerald-600/15 sm:px-3 ${
              isActive
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'text-gray-600 hover:bg-white hover:text-gray-900'
            }`}
            id={`multi-year-chart-tab-${tab.id}`}
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
