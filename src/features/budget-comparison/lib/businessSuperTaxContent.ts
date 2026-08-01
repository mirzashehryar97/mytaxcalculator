import {
  Briefcase,
  Calculator,
  CalendarDays,
  Factory,
  Landmark,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';

import { BUDGET_SOURCES } from '@/features/budget-comparison/lib/content';
import type {
  BudgetComparisonRow,
  BudgetDetailMetric,
  BudgetFaqItem,
  BudgetHeroContent,
  BudgetTocItem,
  BudgetTool,
} from '@/features/budget-comparison/types';

export const BUSINESS_SUPER_TAX_ROUTE = '/budget-2025-26-vs-2026-27/business-super-tax';

export const BUSINESS_SUPER_TAX_HERO = {
  badge: 'Enacted · Finance Act 2026',
  title: 'Business & super tax — Budget 2025–26 vs 2026–27',
  description:
    'Verified changes for companies, AOPs, high-income persons and specified distributors in Pakistan.',
  meta: [
    {
      id: 'updated',
      label: 'Updated 28 July 2026',
      icon: CalendarDays,
      dateTime: '2026-07-28',
    },
    { id: 'reviewed', label: 'Reviewed against Finance Act 2026', icon: ShieldCheck },
  ],
  statusTitle: 'Enacted 26 June 2026',
  statusDetail: 'Effective 1 July 2026',
} as const satisfies BudgetHeroContent;

export const BUSINESS_SUPER_TAX_TOC = [
  { id: 'overview', label: 'Overview', href: '#overview' },
  { id: 'comparison', label: 'Comparison', href: '#comparison' },
  { id: 'example', label: 'Example', href: '#example' },
  { id: 'retailer-note', label: 'Retailer note', href: '#retailer-note' },
  { id: 'explore-sectors', label: 'Explore sectors', href: '#explore-sectors' },
  { id: 'quick-tools', label: 'Quick tools', href: '#quick-tools' },
  { id: 'faqs', label: 'FAQs', href: '#faqs' },
  { id: 'official-sources', label: 'Official sources', href: '#official-sources' },
] as const satisfies readonly BudgetTocItem[];

export const BUSINESS_SUPER_TAX_TOOLS = [
  {
    id: 'business-calculator',
    label: 'Business & AOP calculator',
    href: '/business-tax-calculator',
    icon: Briefcase,
  },
  {
    id: 'super-tax-calculator',
    label: 'Super tax calculator',
    href: '/super-tax-calculator',
    icon: TrendingUp,
  },
  {
    id: 'corporate-tax-calculator',
    label: 'Corporate tax calculator',
    href: '/corporate-tax-calculator',
    icon: Landmark,
  },
  {
    id: 'minimum-tax-calculator',
    label: 'Minimum turnover tax calculator',
    href: '/minimum-turnover-tax-calculator',
    icon: Factory,
  },
  { id: 'salary-calculator', label: 'Salary tax calculator', href: '/', icon: Calculator },
  {
    id: 'budget-comparison',
    label: 'Budget comparison',
    href: '/budget-2025-26-vs-2026-27',
    icon: Calculator,
  },
] as const satisfies readonly BudgetTool[];

export const BUSINESS_SUPER_TAX_METRICS = [
  {
    id: 'under-500m',
    value: '0%',
    label: 'super tax for most persons up to PKR 500M',
    icon: Landmark,
  },
  {
    id: 'above-500m',
    value: '8%',
    label: 'super tax above PKR 500M',
    icon: TrendingUp,
  },
  {
    id: 'excluded-sectors',
    value: '10%',
    label: 'banks, E&P and fertilizer above PKR 150M',
    icon: Factory,
  },
  {
    id: 'company-rate',
    value: '29%',
    label: 'standard company income-tax rate',
    icon: Briefcase,
  },
] as const satisfies readonly BudgetDetailMetric[];

export const BUSINESS_SUPER_TAX_COMPARISON = [
  {
    id: 'standard-company',
    measure: 'Standard company income tax',
    previous: '29%',
    current: '29%',
    impact: 'No change',
    tone: 'neutral',
  },
  {
    id: 'small-company',
    measure: 'Qualifying small-company rate',
    previous: '20%',
    current: '20%',
    impact: 'No change',
    tone: 'neutral',
  },
  {
    id: 'non-salaried',
    measure: 'Non-salaried individual / AOP top rate',
    previous: '45%',
    current: '45%',
    impact: 'No change',
    tone: 'neutral',
  },
  {
    id: 'super-tax-to-500m',
    measure: 'Super tax — most persons up to PKR 500M',
    previous: '1%–7.5% across income bands above PKR 150M',
    current: '0%',
    impact: 'Abolished',
    tone: 'positive',
  },
  {
    id: 'super-tax-over-500m',
    measure: 'Super tax — most persons above PKR 500M',
    previous: '10%',
    current: '8%',
    impact: 'Lower',
    tone: 'positive',
  },
  {
    id: 'excluded-sectors',
    measure: 'Banks, E&P and fertilizer — above PKR 150M',
    previous: '10% super tax',
    current: '10% super tax',
    impact: 'No concession',
    tone: 'neutral',
  },
  {
    id: 'specified-distributors',
    measure: 'Minimum tax for specified distributors',
    previous: '0.25% of turnover',
    current: '0.5% of turnover',
    impact: 'Higher',
    tone: 'negative',
  },
] as const satisfies readonly BudgetComparisonRow[];

export const BUSINESS_SUPER_TAX_COMPARISON_NOTE =
  'The 0.5% reduced minimum-tax rate applies to distributors, dealers, sub-dealers and wholesalers of specified goods, subject to both income-tax and sales-tax ATL conditions.';

export const BUSINESS_SUPER_TAX_EXAMPLE = {
  title: 'Example: regular company with PKR 450M Section 4C income',
  previous: {
    label: 'FY 2025–26',
    value: 'PKR 33.75M',
    detail: 'super tax',
  },
  current: {
    label: 'FY 2026–27',
    value: 'PKR 0',
    detail: 'super tax',
  },
  difference: {
    label: 'Difference',
    value: 'PKR 33.75M',
  },
  note: 'Normal corporate income tax remains separate.',
} as const;

export const BUSINESS_SUPER_TAX_RETAILER_NOTE = {
  title: 'Retailer scheme needs separate implementing rules',
  description:
    'Finance Act 2026 broadens Section 99B so FBR can prescribe special procedures for small traders and shopkeepers. The Act itself does not enact a universal 1% retailer tax.',
} as const;

export const BUSINESS_SUPER_TAX_SOURCES = BUDGET_SOURCES.filter(
  (source) => source.id === 'finance-act' || source.id === 'salient-features',
);

export const BUSINESS_SUPER_TAX_FAQS = [
  {
    question: 'Who pays no super tax in FY 2026–27?',
    answer:
      'Most persons with Section 4C income up to PKR 500 million now pay 0% super tax. In FY 2025–26 these taxpayers faced 1% to 7.5% across income bands above PKR 150 million.',
  },
  {
    question: 'What is the super-tax rate above PKR 500 million?',
    answer:
      'Super tax above PKR 500 million falls from 10% to 8% for most persons. The threshold change and the rate cut apply together, so the relief is largest just under PKR 500 million.',
  },
  {
    question: 'Do banks and oil companies get the same relief?',
    answer:
      'No. Banks, exploration and production companies and fertilizer companies continue to pay 10% super tax above PKR 150 million. They are excluded from the PKR 500 million concession.',
  },
  {
    question: 'Did company income tax rates change?',
    answer:
      'No. The standard company rate stays at 29%, the qualifying small-company rate stays at 20%, and the top non-salaried individual and AOP rate stays at 45%.',
  },
  {
    question: 'How much does a company with PKR 450M Section 4C income save?',
    answer:
      'A regular company with PKR 450 million of Section 4C income owed PKR 33.75 million of super tax in FY 2025–26 and owes PKR 0 in FY 2026–27, a difference of PKR 33.75 million. Normal corporate income tax remains separate.',
  },
  {
    question: 'Is there a 1% fixed tax for small retailers?',
    answer:
      'No. Finance Act 2026 broadens Section 99B so FBR can prescribe special procedures for small traders and shopkeepers, but the Act itself does not enact a universal 1% retailer tax.',
  },
  {
    question: 'What changed for distributors and wholesalers?',
    answer:
      'Minimum tax for specified distributors rises from 0.25% to 0.5% of turnover. The reduced rate applies to distributors, dealers, sub-dealers and wholesalers of specified goods, subject to both income-tax and sales-tax ATL conditions.',
  },
] as const satisfies readonly BudgetFaqItem[];

export const BUSINESS_SUPER_TAX_PAGE_LABELS = {
  overviewTitle: 'Business and super-tax budget changes overview',
  comparisonTitle: 'What changed for business taxpayers?',
  sourcesTitle: 'Official sources',
  sourceStatusTitle: 'Official sources only',
  sourceStatusDetail: 'Last checked 28 July 2026',
} as const;

export const BUSINESS_SUPER_TAX_SOCIAL_IMAGE_COPY = {
  eyebrow: 'Pakistan Budget 2026–27 · Enacted',
  title: 'Business & Super Tax Comparison',
  subtitle: '0% up to PKR 500M · 8% above · 29% company rate',
  features: 'FY 2025–26 vs FY 2026–27 · Official FBR sources',
  brand: 'My Tax Calculator',
} as const;
