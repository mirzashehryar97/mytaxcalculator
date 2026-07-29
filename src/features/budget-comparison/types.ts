import type { LucideIcon } from 'lucide-react';

import type { SourceLogo } from '@/components/calculator/OfficialSourcesGrid';

export interface BudgetMetric {
  id: string;
  label: string;
  previousValue: string;
  previousLabel: string;
  currentValue: string;
  currentLabel: string;
  change: string;
  tone: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
}

export interface BudgetImpactList {
  id: string;
  title: string;
  tone: 'positive' | 'negative';
  items: readonly string[];
}

export interface BudgetSectorSummary {
  id: string;
  title: string;
  icon: LucideIcon;
  highlights: readonly string[];
  href: string;
}

export interface BudgetSource {
  id: string;
  title: string;
  description: string;
  href: string;
  logo?: SourceLogo;
  icon?: LucideIcon;
}

export interface BudgetTool {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface BudgetTocItem {
  id: string;
  label: string;
  href: string;
}

export interface BudgetHeroMetaItem {
  id: string;
  label: string;
  icon: LucideIcon;
  dateTime?: string;
}

export interface BudgetHeroContent {
  badge: string;
  title: string;
  description: string;
  meta: readonly BudgetHeroMetaItem[];
  statusTitle: string;
  statusDetail: string;
}

export interface BudgetHeroBreadcrumb {
  label: string;
  href?: string;
}

export interface BudgetDetailMetric {
  id: string;
  value: string;
  label: string;
  icon: LucideIcon;
}

export interface BudgetComparisonRow {
  id: string;
  measure: string;
  previous: string;
  current: string;
  impact: string;
  tone: 'positive' | 'negative' | 'neutral' | 'info';
}

export interface BudgetFaqItem {
  question: string;
  answer: string;
}

export interface BudgetExampleResult {
  id: string;
  label: string;
  value: string;
  icon: LucideIcon;
}

export interface SalarySlabComparison {
  id: string;
  incomeBand: string;
  previousRate: string;
  currentRate: string;
  change: string;
}

export interface SalaryBudgetResult {
  monthlySalary: number;
  previousTax: number;
  currentTax: number;
  annualSavings: number;
}
