import {
  BookOpen,
  Building2,
  Calculator,
  CalendarDays,
  Construction,
  FileCheck2,
  FileText,
  Landmark,
  Settings,
  ShieldCheck,
  TrendingUp,
  Users,
} from 'lucide-react';

import type {
  BudgetComparisonRow,
  BudgetDetailMetric,
  BudgetFaqItem,
  BudgetHeroContent,
  BudgetSource,
  BudgetTocItem,
  BudgetTool,
} from '@/features/budget-comparison/types';

export const DEFENCE_ROUTE = '/budget-2025-26-vs-2026-27/defence';

export const DEFENCE_HERO = {
  badge: 'Approved · Federal Budget 2026–27',
  title: 'Defence — Budget 2025–26 vs 2026–27',
  description:
    'Budget-estimate comparison for defence services and separately budgeted military pensions in Pakistan.',
  meta: [
    {
      id: 'updated',
      label: 'Updated 28 July 2026',
      icon: CalendarDays,
      dateTime: '2026-07-28',
    },
    { id: 'source', label: 'Verified from Finance Division documents', icon: FileCheck2 },
  ],
  statusTitle: 'FY 2026–27 Budget Estimates',
  statusDetail: 'Compared with FY 2025–26 BE',
} as const satisfies BudgetHeroContent;

export const DEFENCE_TOC = [
  { id: 'overview', label: 'Overview', href: '#overview' },
  { id: 'comparison', label: 'Expenditure heads', href: '#comparison' },
  { id: 'increase-breakdown', label: 'Increase breakdown', href: '#increase-breakdown' },
  { id: 'pensions', label: 'Pensions', href: '#pensions' },
  { id: 'faqs', label: 'FAQs', href: '#faqs' },
  { id: 'explore-sectors', label: 'Explore sectors', href: '#explore-sectors' },
  { id: 'official-sources', label: 'Official sources', href: '#official-sources' },
] as const satisfies readonly BudgetTocItem[];

export const DEFENCE_TOOLS = [
  {
    id: 'defence-table',
    label: 'Expenditure table',
    href: '#comparison',
    icon: ShieldCheck,
  },
  {
    id: 'budget-comparison',
    label: 'Budget comparison',
    href: '/budget-2025-26-vs-2026-27',
    icon: Calculator,
  },
  {
    id: 'tax-guides',
    label: 'Tax guides',
    href: '/tax-guides',
    icon: BookOpen,
  },
] as const satisfies readonly BudgetTool[];

export const DEFENCE_METRICS = [
  {
    id: 'defence-services',
    value: 'PKR 3.000T',
    label: 'FY 2026–27 defence services Budget Estimate',
    icon: ShieldCheck,
  },
  {
    id: 'increase',
    value: '+17.6%',
    label: 'versus the FY 2025–26 Budget Estimate',
    icon: TrendingUp,
  },
  {
    id: 'military-pensions',
    value: 'PKR 822B',
    label: 'military pensions under a separate budget head',
    icon: Users,
  },
  {
    id: 'physical-assets',
    value: 'PKR 925.833B',
    label: 'physical assets within defence services',
    icon: Landmark,
  },
] as const satisfies readonly BudgetDetailMetric[];

export const DEFENCE_COMPARISON = [
  {
    id: 'defence-services',
    measure: 'Defence services',
    previous: 'PKR 2,550.000B',
    current: 'PKR 3,000.000B',
    impact: '+17.65%',
    tone: 'positive',
  },
  {
    id: 'employees',
    measure: 'Employees-related expenses',
    previous: 'PKR 846.032B',
    current: 'PKR 967.548B',
    impact: '+14.36%',
    tone: 'positive',
  },
  {
    id: 'operating',
    measure: 'Operating expenses',
    previous: 'PKR 704.399B',
    current: 'PKR 743.462B',
    impact: '+5.55%',
    tone: 'positive',
  },
  {
    id: 'physical-assets',
    measure: 'Physical assets',
    previous: 'PKR 663.077B',
    current: 'PKR 925.833B',
    impact: '+39.63%',
    tone: 'positive',
  },
  {
    id: 'civil-works',
    measure: 'Civil works',
    previous: 'PKR 336.492B',
    current: 'PKR 363.158B',
    impact: '+7.92%',
    tone: 'positive',
  },
  {
    id: 'military-pensions',
    measure: 'Military pensions — separate head',
    previous: 'PKR 742.000B',
    current: 'PKR 822.000B',
    impact: '+10.78%',
    tone: 'positive',
  },
  {
    id: 'civil-pensions',
    measure: 'Civil pensions — separate head',
    previous: 'PKR 243.000B',
    current: 'PKR 272.500B',
    impact: '+12.14%',
    tone: 'positive',
  },
] as const satisfies readonly BudgetComparisonRow[];

export const DEFENCE_COMPARISON_NOTE =
  'All figures compare the original Budget Estimates for FY 2025–26 and FY 2026–27. They do not substitute the FY 2025–26 Revised Estimates.';

export const DEFENCE_INCREASE_BREAKDOWN = {
  title: 'Where the PKR 450B defence-services increase goes',
  items: [
    {
      id: 'employees',
      label: 'Employees',
      value: '+PKR 121.516B',
      icon: Users,
    },
    {
      id: 'operating',
      label: 'Operating',
      value: '+PKR 39.063B',
      icon: Settings,
    },
    {
      id: 'physical-assets',
      label: 'Physical assets',
      value: '+PKR 262.756B',
      icon: Landmark,
    },
    {
      id: 'civil-works',
      label: 'Civil works',
      value: '+PKR 26.666B',
      icon: Construction,
    },
  ],
  summary: 'Physical assets account for 58.4% of the PKR 450B increase.',
} as const;

export const DEFENCE_TOTALS_NOTE = {
  title: 'Read the total correctly',
  description:
    'Military pensions are budgeted outside the PKR 3.000T defence-services total. Civil pensions are also a separate pension head and should not be added as defence services.',
} as const;

export const DEFENCE_ESTIMATE_NOTE =
  'Comparison uses original Budget Estimates for both years, not the FY 2025–26 Revised Estimates.';

export const DEFENCE_SOURCES = [
  {
    id: 'budget-in-brief',
    title: 'Budget in Brief 2026–27 — Finance Division',
    description: 'Official federal budget document',
    href: 'https://www.finance.gov.pk/budget/budget_2026_27/Budget_in_Brief.pdf',
    icon: Building2,
  },
  {
    id: 'annual-budget-statement',
    title: 'Annual Budget Statement 2026–27 — Finance Division',
    description: 'Official expenditure-head comparison',
    href: 'https://www.finance.gov.pk/budget/budget_2026_27/Annual_Budget_Statement.pdf',
    icon: FileText,
  },
] as const satisfies readonly BudgetSource[];

export const DEFENCE_FAQS = [
  {
    question: "What is Pakistan's defence budget for FY 2026–27?",
    answer:
      'The FY 2026–27 Budget Estimate for defence services is PKR 3,000.000 billion, up from PKR 2,550.000 billion in FY 2025–26, an increase of 17.65%.',
  },
  {
    question: 'Are military pensions included in the PKR 3 trillion total?',
    answer:
      'No. Military pensions are budgeted under a separate head at PKR 822.000 billion for FY 2026–27, up 10.78% from PKR 742.000 billion. They sit outside the defence-services total.',
  },
  {
    question: 'Where does the PKR 450 billion increase go?',
    answer:
      'Physical assets rise by PKR 262.756 billion, employees-related expenses by PKR 121.516 billion, operating expenses by PKR 39.063 billion and civil works by PKR 26.666 billion. Physical assets account for 58.4% of the increase.',
  },
  {
    question: 'How much is allocated to defence procurement?',
    answer:
      'Physical assets within defence services are budgeted at PKR 925.833 billion for FY 2026–27, up from PKR 663.077 billion, a rise of 39.63% and the largest percentage increase of any expenditure head.',
  },
  {
    question: 'Are these figures actual spending or estimates?',
    answer:
      'They are original Budget Estimates for both FY 2025–26 and FY 2026–27. They do not substitute the FY 2025–26 Revised Estimates, so they should not be read as final outturn figures.',
  },
  {
    question: 'What about civil pensions?',
    answer:
      'Civil pensions are a separate pension head budgeted at PKR 272.500 billion for FY 2026–27, up 12.14% from PKR 243.000 billion. They should not be added to defence services.',
  },
] as const satisfies readonly BudgetFaqItem[];

export const DEFENCE_PAGE_LABELS = {
  overviewTitle: 'Defence budget overview',
  comparisonTitle: 'Defence budget by expenditure head',
  sourcesTitle: 'Official sources',
  sourceStatusTitle: 'Official government sources',
  sourceStatusDetail: 'Verified and authoritative',
} as const;

export const DEFENCE_SOCIAL_IMAGE_COPY = {
  eyebrow: 'Pakistan Federal Budget 2026–27',
  title: 'Defence Budget Comparison',
  subtitle: 'PKR 3.000T defence services · PKR 822B military pensions',
  features: 'Original Budget Estimates · Official Finance Division sources',
  brand: 'My Tax Calculator',
} as const;
