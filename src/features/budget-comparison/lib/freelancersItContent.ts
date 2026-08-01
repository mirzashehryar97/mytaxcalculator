import {
  Briefcase,
  Calculator,
  CalendarDays,
  CreditCard,
  Globe2,
  Laptop,
  MessageCircleMore,
  ShieldCheck,
  UserRound,
} from 'lucide-react';

import { BUDGET_SOURCES } from '@/features/budget-comparison/lib/content';
import type {
  BudgetComparisonRow,
  BudgetDetailMetric,
  BudgetExampleResult,
  BudgetFaqItem,
  BudgetHeroContent,
  BudgetTocItem,
  BudgetTool,
} from '@/features/budget-comparison/types';

export const FREELANCERS_IT_ROUTE = '/budget-2025-26-vs-2026-27/freelancers-it';

export const FREELANCERS_IT_HERO = {
  badge: 'Enacted · Finance Act 2026',
  title: 'Freelancers & IT — Budget 2025–26 vs 2026–27',
  description:
    'Verified changes for IT exporters, freelancers, foreign-card payments and creator revenue in Pakistan.',
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

export const FREELANCERS_IT_TOC = [
  { id: 'overview', label: 'Overview', href: '#overview' },
  { id: 'comparison', label: 'Comparison', href: '#comparison' },
  { id: 'example', label: 'Example', href: '#example' },
  { id: 'scope', label: 'Scope', href: '#scope' },
  { id: 'explore-sectors', label: 'Explore sectors', href: '#explore-sectors' },
  { id: 'quick-tools', label: 'Quick tools', href: '#quick-tools' },
  { id: 'faqs', label: 'FAQs', href: '#faqs' },
  { id: 'official-sources', label: 'Official sources', href: '#official-sources' },
] as const satisfies readonly BudgetTocItem[];

export const FREELANCERS_IT_TOOLS = [
  {
    id: 'freelancer-calculator',
    label: 'Freelancer tax calculator',
    href: '/freelancer-tax-calculator',
    icon: UserRound,
  },
  {
    id: 'business-calculator',
    label: 'Business & AOP calculator',
    href: '/business-tax-calculator',
    icon: Briefcase,
  },
  {
    id: 'budget-comparison',
    label: 'Budget comparison',
    href: '/budget-2025-26-vs-2026-27',
    icon: Calculator,
  },
] as const satisfies readonly BudgetTool[];

export const FREELANCERS_IT_METRICS = [
  {
    id: 'pseb-rate',
    value: '0.25%',
    label: 'PSEB + ATL IT export tax',
    icon: Globe2,
  },
  {
    id: 'extension',
    value: 'TY 2029',
    label: 'concession extended through',
    icon: CalendarDays,
  },
  {
    id: 'foreign-card',
    value: '0.5%',
    label: 'foreign-card advance tax',
    icon: CreditCard,
  },
  {
    id: 'social-media',
    value: '5%',
    label: 'new social-media WHT',
    icon: MessageCircleMore,
  },
] as const satisfies readonly BudgetDetailMetric[];

export const FREELANCERS_IT_COMPARISON = [
  {
    id: 'pseb-atl',
    measure: 'PSEB + ATL IT/ITeS exports',
    previous: '0.25% final tax; concession through TY 2026',
    current: '0.25% final tax; extended through TY 2029',
    impact: 'Extended',
    tone: 'positive',
  },
  {
    id: 'general-atl',
    measure: 'General ATL IT/ITeS exports',
    previous: '1% final tax',
    current: '1% final tax',
    impact: 'No change',
    tone: 'neutral',
  },
  {
    id: 'non-atl',
    measure: 'Non-ATL Section 154A rates',
    previous: '0.5% PSEB / 2% general',
    current: '0.5% PSEB / 2% general',
    impact: 'No change',
    tone: 'neutral',
  },
  {
    id: 'foreign-card',
    measure: 'Foreign-card payments',
    previous: '5% advance tax',
    current: '0.5% advance tax',
    impact: 'Lower',
    tone: 'positive',
  },
  {
    id: 'social-media',
    measure: 'Social-media platform receipts',
    previous: 'No dedicated Section 154B',
    current: '5% WHT under new Section 154B',
    impact: 'New',
    tone: 'info',
  },
  {
    id: 'other-exports',
    measure: 'Other export proceeds — not Section 154A',
    previous: '2% aggregate collection',
    current: '1.25% aggregate collection',
    impact: 'Lower',
    tone: 'positive',
  },
] as const satisfies readonly BudgetComparisonRow[];

export const FREELANCERS_IT_EXAMPLE = {
  title: 'Example: PKR 6,720,000 annual IT export receipts',
  results: [
    {
      id: 'pseb-atl',
      label: 'PSEB + ATL',
      value: 'PKR 16,800 tax',
      icon: Laptop,
    },
    {
      id: 'general-atl',
      label: 'General ATL',
      value: 'PKR 67,200 tax',
      icon: Briefcase,
    },
  ] satisfies readonly BudgetExampleResult[],
  note: 'The current tax amount is unchanged; Finance Act 2026 extends the 0.25% concession window.',
} as const;

export const FREELANCERS_IT_COMPARISON_NOTE =
  'Final-tax treatment under Section 154A depends on meeting the applicable export, banking, registration and filing conditions.';

export const FREELANCERS_IT_SCOPE = {
  title: 'Local-client income follows different rules',
  description:
    'Income from Pakistani clients is not Section 154A export income. It is generally treated as business income and should be calculated separately under the non-salaried rules.',
  linkLabel: 'Calculate local-client business income',
  linkHref: '/business-tax-calculator',
} as const;

export const FREELANCERS_IT_SOURCES = BUDGET_SOURCES.filter(
  (source) => source.id === 'finance-act' || source.id === 'salient-features',
);

export const FREELANCERS_IT_FAQS = [
  {
    question: 'Did the 0.25% IT export tax rate change in Budget 2026–27?',
    answer:
      'No. PSEB-registered exporters on the ATL keep the 0.25% final tax on IT and ITeS export receipts. What changed is the window: Finance Act 2026 extends the concession from Tax Year 2026 through Tax Year 2029.',
  },
  {
    question: 'What rate applies to freelancers who are not PSEB registered?',
    answer:
      'General ATL IT and ITeS export receipts remain at 1% final tax under Section 154A. Non-ATL rates are also unchanged at 0.5% for PSEB-registered exporters and 2% for general exporters.',
  },
  {
    question: 'How much tax is due on PKR 6,720,000 of export receipts?',
    answer:
      'A PSEB-registered ATL exporter pays PKR 16,800 at 0.25%, and a general ATL exporter pays PKR 67,200 at 1%. Both amounts are the same as FY 2025–26 because Finance Act 2026 extended the concession rather than changing the rate.',
  },
  {
    question: 'What is the new social-media tax for creators?',
    answer:
      'Finance Act 2026 introduces Section 154B, which applies a 5% withholding tax to social-media platform receipts. There was no dedicated Section 154B withholding on these receipts in FY 2025–26.',
  },
  {
    question: 'Did tax on foreign-card payments change?',
    answer:
      'Yes. Advance tax on foreign-card payments falls from 5% to 0.5%, which lowers the upfront cost of receiving or spending through international card transactions.',
  },
  {
    question: 'Does income from Pakistani clients qualify for these rates?',
    answer:
      'No. Income from Pakistani clients is not Section 154A export income. It is generally treated as business income and should be calculated separately under the non-salaried rules.',
  },
] as const satisfies readonly BudgetFaqItem[];

export const FREELANCERS_IT_PAGE_LABELS = {
  comparisonTitle: 'What changed for freelancers & IT?',
  sourcesTitle: 'Official sources',
  sourceStatusTitle: 'Official sources only',
  sourceStatusDetail: 'Last checked 28 July 2026',
} as const;

export const FREELANCERS_IT_SOCIAL_IMAGE_COPY = {
  eyebrow: 'Pakistan Budget 2026–27 · Enacted',
  title: 'Freelancers & IT Budget Comparison',
  subtitle: 'PSEB 0.25% extended · Foreign-card tax cut · New creator WHT',
  features: 'FY 2025–26 vs FY 2026–27 · Official FBR sources',
  brand: 'My Tax Calculator',
} as const;
