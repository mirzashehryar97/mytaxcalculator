import {
  BadgeCheck,
  BookOpen,
  Calculator,
  CalendarDays,
  Home,
  Percent,
  RefreshCw,
  Scale,
  ShieldCheck,
  Sun,
  WalletCards,
} from 'lucide-react';

import { BUDGET_SOURCES } from '@/features/budget-comparison/lib/content';
import type {
  BudgetComparisonRow,
  BudgetDetailMetric,
  BudgetExampleResult,
  BudgetFaqItem,
  BudgetHeroContent,
  BudgetSource,
  BudgetTocItem,
  BudgetTool,
} from '@/features/budget-comparison/types';

export const SOLAR_ROUTE = '/budget-2025-26-vs-2026-27/solar';

export const SOLAR_HERO = {
  badge: 'Enacted · Finance Act 2026',
  title: 'Solar — Budget 2025–26 vs 2026–27',
  description:
    'Verified federal sales-tax treatment for solar panels and photovoltaic modules in Pakistan.',
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

export const SOLAR_TOC = [
  { id: 'overview', label: 'Overview', href: '#overview' },
  { id: 'comparison', label: 'Sales-tax treatment', href: '#comparison' },
  { id: 'example', label: 'Worked example', href: '#example' },
  { id: 'scope', label: 'Scope', href: '#scope' },
  { id: 'faqs', label: 'FAQs', href: '#faqs' },
  { id: 'explore-sectors', label: 'Explore sectors', href: '#explore-sectors' },
  { id: 'official-sources', label: 'Official sources', href: '#official-sources' },
] as const satisfies readonly BudgetTocItem[];

export const SOLAR_TOOLS = [
  {
    id: 'solar-rate',
    label: 'Solar rate table',
    href: '#comparison',
    icon: Sun,
  },
  {
    id: 'budget-comparison',
    label: 'Budget comparison',
    href: '/budget-2025-26-vs-2026-27',
    icon: Scale,
  },
  {
    id: 'tax-guides',
    label: 'Tax guides',
    href: '/tax-guides',
    icon: BookOpen,
  },
] as const satisfies readonly BudgetTool[];

export const SOLAR_METRICS = [
  {
    id: 'imported-panels',
    value: '10%',
    label: 'sales tax on imported solar panels and PV modules',
    icon: Sun,
  },
  {
    id: 'local-supply',
    value: '10%',
    label: 'sales tax on local supply of solar panels and PV modules',
    icon: Home,
  },
  {
    id: 'rate-change',
    value: '0 pp',
    label: 'panel-rate change in FY 2026–27',
    icon: RefreshCw,
  },
  {
    id: 'new-incentive',
    value: 'None',
    label: 'new solar-panel incentive in Finance Act 2026',
    icon: BadgeCheck,
  },
] as const satisfies readonly BudgetDetailMetric[];

export const SOLAR_COMPARISON = [
  {
    id: 'imported-panels',
    measure: 'Imported solar panels and PV modules',
    previous: '10% sales tax',
    current: '10% sales tax',
    impact: 'No change',
    tone: 'neutral',
  },
  {
    id: 'local-panels',
    measure: 'Local supply of solar panels and PV modules',
    previous: '10% sales tax',
    current: '10% sales tax',
    impact: 'No change',
    tone: 'neutral',
  },
  {
    id: 'exemption-status',
    measure: 'Solar-panel exemption status',
    previous: 'Finance Act 2025 withdrew the exemption',
    current: 'Exemption not restored by Finance Act 2026',
    impact: 'Still taxable',
    tone: 'negative',
  },
  {
    id: 'standard-rate',
    measure: 'Standard 18% sales-tax rate',
    previous: 'Reduced 10% panel rate applied instead',
    current: 'Reduced 10% panel rate continues',
    impact: 'No change',
    tone: 'neutral',
  },
  {
    id: 'finance-act-measure',
    measure: 'Solar-specific Finance Act measure',
    previous: '10% rate introduced by Finance Act 2025',
    current: 'No solar-panel rate amendment in Finance Act 2026',
    impact: 'No new measure',
    tone: 'info',
  },
  {
    id: 'other-components',
    measure: 'Inverters, batteries and other components',
    previous: 'Separate tariff treatment by item',
    current: 'Separate tariff treatment by item',
    impact: 'Check PCT code',
    tone: 'info',
  },
] as const satisfies readonly BudgetComparisonRow[];

export const SOLAR_COMPARISON_NOTE =
  'The 10% figure applies to solar panels and PV modules covered by the reduced-rate entry. Inverters, batteries, structures and other system components can have separate tariff and tax treatment.';

export const SOLAR_EXAMPLE = {
  title: 'Example: PKR 1,000,000 tax-exclusive panel supply',
  results: [
    {
      id: 'previous-tax',
      label: 'FY 2025–26 sales tax',
      value: 'PKR 100,000',
      icon: Calculator,
    },
    {
      id: 'current-tax',
      label: 'FY 2026–27 sales tax',
      value: 'PKR 100,000',
      icon: Percent,
    },
    {
      id: 'difference',
      label: 'Budget-year difference',
      value: 'PKR 0',
      icon: WalletCards,
    },
  ] as const satisfies readonly BudgetExampleResult[],
  note: 'Illustration covers the 10% panel/PV-module rate only and assumes PKR 1,000,000 is the tax-exclusive value.',
} as const;

export const SOLAR_TAX_NOTE = {
  title: 'Solar panels are not sales-tax exempt',
  description:
    'Finance Act 2025 withdrew the exemption and placed solar panels and PV modules at a reduced 10% rate. Finance Act 2026 did not restore the exemption.',
} as const;

export const SOLAR_BOTTOM_LINE = {
  title: 'Bottom line',
  description:
    'Finance Act 2026 leaves the federal solar-panel rate unchanged. It neither raises that rate to 18% nor creates a new solar-panel incentive.',
} as const;

export const SOLAR_SOURCES = [
  {
    id: 'finance-act-2025-circular',
    title: 'Circular No. 02 of 2025–26 — FBR',
    description: 'Official explanation of the 10% panel rate',
    href: 'https://download1.fbr.gov.pk/Docs/202584118361586CircularNO02of2025-26SalesTax%26FederalExcise.pdf',
    logo: { src: '/images/tax-guides/fbr-logo.png', alt: 'Federal Board of Revenue Pakistan' },
  },
  ...BUDGET_SOURCES.filter((source) => source.id === 'finance-act'),
  {
    id: 'sales-tax-act',
    title: 'Sales Tax Act 1990 — FBR',
    description: 'Official sales-tax law library',
    href: 'https://www.fbr.gov.pk/categ/sales-tax-act/301',
    logo: { src: '/images/tax-guides/fbr-logo.png', alt: 'Federal Board of Revenue Pakistan' },
  },
] as const satisfies readonly BudgetSource[];

export const SOLAR_FAQS = [
  {
    question: 'Is there a new tax on solar panels in Budget 2026–27?',
    answer:
      'No. Solar panels and PV modules stay at the reduced 10% sales-tax rate for both imports and local supply. Finance Act 2026 contains no solar-panel rate amendment.',
  },
  {
    question: 'Did sales tax on solar panels rise to 18%?',
    answer:
      'No. The standard 18% sales-tax rate does not apply to solar panels and PV modules covered by the reduced-rate entry. The 10% panel rate continues in FY 2026–27.',
  },
  {
    question: 'Are solar panels exempt from sales tax?',
    answer:
      'No. Finance Act 2025 withdrew the exemption and placed solar panels and PV modules at a reduced 10% rate. Finance Act 2026 did not restore the exemption.',
  },
  {
    question: 'How much sales tax applies to a PKR 1,000,000 panel supply?',
    answer:
      'Sales tax is PKR 100,000 in FY 2025–26 and PKR 100,000 in FY 2026–27, a difference of PKR 0. The illustration covers the 10% panel and PV-module rate only and assumes PKR 1,000,000 is the tax-exclusive value.',
  },
  {
    question: 'Do inverters and batteries also get the 10% rate?',
    answer:
      'Not automatically. Inverters, batteries, mounting structures and other system components keep separate tariff treatment by item, so check the applicable PCT code rather than assuming the panel rate.',
  },
  {
    question: 'Did Finance Act 2026 add any new solar incentive?',
    answer:
      'No. The Act leaves the federal solar-panel rate unchanged. It neither raises that rate to 18% nor creates a new solar-panel incentive.',
  },
] as const satisfies readonly BudgetFaqItem[];

export const SOLAR_PAGE_LABELS = {
  overviewTitle: 'Solar sales-tax overview',
  comparisonTitle: 'What changed for solar?',
  sourcesTitle: 'Official sources',
  sourceStatusTitle: 'Official sources only',
  sourceStatusDetail: 'Last checked 28 July 2026',
} as const;

export const SOLAR_SOCIAL_IMAGE_COPY = {
  eyebrow: 'Pakistan Budget 2026–27 · Enacted',
  title: 'Solar Tax Budget Comparison',
  subtitle: '10% panel rate continues · No Finance Act 2026 increase',
  features: 'FY 2025–26 vs FY 2026–27 · Official FBR sources',
  brand: 'My Tax Calculator',
} as const;
