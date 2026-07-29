import {
  BarChart3,
  Briefcase,
  Building2,
  Calculator,
  CalendarDays,
  Car,
  Clock3,
  Home,
  Landmark,
  Laptop,
  ShieldCheck,
  Sun,
  Target,
  User,
} from 'lucide-react';

import type {
  BudgetImpactList,
  BudgetMetric,
  BudgetSectorSummary,
  BudgetSource,
  BudgetTocItem,
  BudgetTool,
  SalarySlabComparison,
} from '@/features/budget-comparison/types';

export const BUDGET_HERO = {
  badge: 'Enacted · Finance Act 2026',
  title: 'Pakistan Budget 2025–26 vs 2026–27',
  description: 'A verified, sector-by-sector comparison of the enacted federal budget changes.',
  meta: [
    {
      id: 'updated',
      label: 'Updated 28 July 2026',
      icon: CalendarDays,
      dateTime: '2026-07-28',
    },
    { id: 'reading-time', label: '18 min read', icon: Clock3 },
    { id: 'reviewed', label: 'Reviewed against Finance Act 2026', icon: ShieldCheck },
  ],
  statusTitle: 'Enacted 26 June 2026',
  statusDetail: 'Effective 1 July 2026',
} as const;

export const BUDGET_TOC: readonly BudgetTocItem[] = [
  { id: 'at-a-glance', label: 'At a glance', href: '#at-a-glance' },
  { id: 'winners', label: 'Winners & higher costs', href: '#winners' },
  { id: 'salary-tax', label: 'Salary tax', href: '#salary-tax' },
  { id: 'sector-comparison', label: 'Sector comparison', href: '#sector-comparison' },
  { id: 'faqs', label: 'FAQs', href: '#faqs' },
  { id: 'official-sources', label: 'Official sources', href: '#official-sources' },
];

export const BUDGET_TOOLS: readonly BudgetTool[] = [
  { id: 'salary', label: 'Salary tax calculator', href: '/', icon: Calculator },
  {
    id: 'freelancer',
    label: 'Freelancer tax calculator',
    href: '/freelancer-tax-calculator',
    icon: User,
  },
  {
    id: 'business',
    label: 'Business & AOP calculator',
    href: '/business-tax-calculator',
    icon: Briefcase,
  },
];

export const BUDGET_METRICS: readonly BudgetMetric[] = [
  {
    id: 'outlay',
    label: 'Federal outlay',
    previousValue: 'PKR 19.278T',
    previousLabel: 'FY 2025–26',
    currentValue: 'PKR 18.771T',
    currentLabel: 'FY 2026–27',
    change: '−2.6%',
    tone: 'negative',
    icon: Landmark,
  },
  {
    id: 'fbr-target',
    label: 'FBR revenue target',
    previousValue: 'PKR 14.131T',
    previousLabel: 'FY 2025–26',
    currentValue: 'PKR 15.264T',
    currentLabel: 'FY 2026–27',
    change: '+8.0%',
    tone: 'positive',
    icon: Target,
  },
  {
    id: 'deficit',
    label: 'Fiscal deficit',
    previousValue: '3.9% of GDP',
    previousLabel: 'FY 2025–26',
    currentValue: '3.6% of GDP',
    currentLabel: 'FY 2026–27',
    change: '—',
    tone: 'neutral',
    icon: BarChart3,
  },
  {
    id: 'defence',
    label: 'Defence services',
    previousValue: 'PKR 2.55T',
    previousLabel: 'FY 2025–26',
    currentValue: 'PKR 3.00T',
    currentLabel: 'FY 2026–27',
    change: '+17.6%',
    tone: 'positive',
    icon: ShieldCheck,
  },
];

export const BUDGET_IMPACT_LISTS: readonly BudgetImpactList[] = [
  {
    id: 'benefits',
    title: 'Who benefits',
    tone: 'positive',
    items: [
      'Salaried income from PKR 2.2M–7M',
      'Property buyers and sellers',
      'PSEB-registered IT exporters',
      'Most persons below PKR 500M super-tax threshold',
    ],
  },
  {
    id: 'higher-costs',
    title: 'Who pays more',
    tone: 'negative',
    items: [
      'Social-media receipts: new 5% WHT',
      'Specified distributors: minimum tax 0.5%',
      'Luxury imported EVs and vehicles',
      'E-liquid FED: PKR 16,500/kg',
    ],
  },
];

export const SALARY_SLAB_COMPARISON: readonly SalarySlabComparison[] = [
  {
    id: 'tax-free',
    incomeBand: 'Up to PKR 600,000',
    previousRate: '0%',
    currentRate: '0%',
    change: '—',
  },
  {
    id: '2-2-to-3-2',
    incomeBand: 'PKR 2.2M–3.2M',
    previousRate: '23%',
    currentRate: '20%',
    change: '−3 pp',
  },
  {
    id: '3-2-to-4-1',
    incomeBand: 'PKR 3.2M–4.1M',
    previousRate: '30%',
    currentRate: '25%',
    change: '−5 pp',
  },
  {
    id: '4-1-to-5-6',
    incomeBand: 'PKR 4.1M–5.6M',
    previousRate: '35%',
    currentRate: '29%',
    change: '−6 pp',
  },
  {
    id: 'above-7',
    incomeBand: 'Above PKR 7M',
    previousRate: '35%',
    currentRate: '35%',
    change: '—',
  },
];

export const BUDGET_SECTOR_SUMMARIES: readonly BudgetSectorSummary[] = [
  {
    id: 'freelancers-it',
    title: 'Freelancers & IT',
    icon: Laptop,
    href: '/budget-2025-26-vs-2026-27/freelancers-it',
    highlights: [
      '0.25% PSEB rate extended to Tax Year 2029',
      'Export collection: 1.25%',
      'Foreign-card WHT: 0.5%',
    ],
  },
  {
    id: 'business-super-tax',
    title: 'Business & super tax',
    icon: Briefcase,
    href: '/budget-2025-26-vs-2026-27/business-super-tax',
    highlights: [
      '0% for most persons up to PKR 500M',
      '8% above PKR 500M',
      'Banks, E&P and fertiliser remain at 10%',
    ],
  },
  {
    id: 'property',
    title: 'Property',
    icon: Home,
    href: '/budget-2025-26-vs-2026-27/property',
    highlights: ['Section 7E repealed', 'Sale WHT: 2.75%', 'Purchase WHT: 1.25%'],
  },
  {
    id: 'vehicles',
    title: 'Vehicles',
    icon: Car,
    href: '/budget-2025-26-vs-2026-27/vehicles',
    highlights: [
      'Imported EV FED: 0% / 30% / 40% by USD value',
      'Imported 2000cc+ vehicles: new special duty',
      'ICT ≤1000cc: PKR 20,000 lifetime',
    ],
  },
  {
    id: 'solar',
    title: 'Solar',
    icon: Sun,
    href: '/budget-2025-26-vs-2026-27/solar',
    highlights: ['10% sales tax continues', 'No new Finance Act 2026 increase'],
  },
  {
    id: 'defence-sector',
    title: 'Defence',
    icon: ShieldCheck,
    href: '/budget-2025-26-vs-2026-27/defence',
    highlights: [
      'PKR 3.00T defence services',
      'PKR 822B military pensions, separate',
      'PKR 925.8B physical assets',
    ],
  },
];

export const BUDGET_SOURCES: readonly BudgetSource[] = [
  {
    id: 'finance-act',
    title: 'Finance Act 2026 — FBR',
    description: 'Official external link',
    href: 'https://download1.fbr.gov.pk/Docs/20266291261044366FinanceAct2026.pdf',
    logo: { src: '/images/tax-guides/fbr-logo.png', alt: 'Federal Board of Revenue Pakistan' },
  },
  {
    id: 'budget-in-brief',
    title: 'Budget in Brief 2026–27 — Finance Division',
    description: 'Official external link',
    href: 'https://www.finance.gov.pk/budget/budget_2026_27/Budget_in_Brief.pdf',
    icon: Building2,
  },
  {
    id: 'salient-features',
    title: 'Salient Features 2026–27 — FBR',
    description: 'Official external link',
    href: 'https://www.fbr.gov.pk/Budget2026-27/SalientFeatures/Salient-Feature.pdf',
    logo: { src: '/images/tax-guides/fbr-logo.png', alt: 'Federal Board of Revenue Pakistan' },
  },
];

export const BUDGET_DISCLAIMER =
  'Educational guidance only — verify deadlines and personal treatment with FBR or a qualified adviser.';

export const BUDGET_SOCIAL_IMAGE_COPY = {
  eyebrow: 'Pakistan Budget 2026–27 · Enacted',
  title: 'Budget 2025–26 vs 2026–27',
  subtitle: 'Salary · Freelancers · Property · Vehicles · Solar · Defence',
  features: 'FY 2025–26 vs FY 2026–27 · Official FBR sources',
  brand: 'My Tax Calculator',
} as const;

export const BUDGET_PAGE_LABELS = {
  glanceTitle: 'What changed at a glance',
  impactTitle: 'Who benefits — and who pays more?',
  salaryTitle: 'Salary tax: the biggest personal impact',
  sectorsTitle: 'Budget impact by sector',
  faqTitle: 'Frequently asked questions',
  sourcesTitle: 'Official sources',
  sourceStatusTitle: 'Official sources only',
  sourceStatusDetail: 'Last checked 28 July 2026',
  salarySurchargeNotice: '9% salaried surcharge above PKR 10M: abolished',
  sectorLinkLabel: 'View full comparison',
} as const;
