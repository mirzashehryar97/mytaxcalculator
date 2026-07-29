import {
  BarChart3,
  Calculator,
  CalendarDays,
  FileText,
  Globe2,
  Handshake,
  Home,
  ShieldCheck,
} from 'lucide-react';

import { BUDGET_SOURCES } from '@/features/budget-comparison/lib/content';
import type {
  BudgetComparisonRow,
  BudgetDetailMetric,
  BudgetFaqItem,
  BudgetHeroContent,
  BudgetSource,
  BudgetTocItem,
  BudgetTool,
} from '@/features/budget-comparison/types';

export const PROPERTY_ROUTE = '/budget-2025-26-vs-2026-27/property';

export const PROPERTY_HERO = {
  badge: 'Enacted · Finance Act 2026',
  title: 'Property — Budget 2025–26 vs 2026–27',
  description:
    'Verified changes to property withholding tax, Section 7E, foreign-asset CVT and inherited-property cost basis in Pakistan.',
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

export const PROPERTY_TOC = [
  { id: 'overview', label: 'Overview', href: '#overview' },
  { id: 'comparison', label: 'Rate comparison', href: '#comparison' },
  { id: 'example', label: 'PKR 80M example', href: '#example' },
  { id: 'tax-note', label: 'Transfer-tax note', href: '#tax-note' },
  { id: 'faqs', label: 'FAQs', href: '#faqs' },
  { id: 'explore-sectors', label: 'Explore sectors', href: '#explore-sectors' },
  { id: 'official-sources', label: 'Official sources', href: '#official-sources' },
] as const satisfies readonly BudgetTocItem[];

export const PROPERTY_TOOLS = [
  {
    id: 'property-example',
    label: 'Property rate example',
    href: '#example',
    icon: Home,
  },
  {
    id: 'capital-gains',
    label: 'Capital-gains rules',
    href: '#tax-note',
    icon: BarChart3,
  },
  {
    id: 'budget-comparison',
    label: 'Budget comparison',
    href: '/budget-2025-26-vs-2026-27',
    icon: Calculator,
  },
] as const satisfies readonly BudgetTool[];

export const PROPERTY_METRICS = [
  {
    id: 'sale-atl',
    value: '2.75%',
    label: 'sale WHT for ATL sellers',
    icon: Home,
  },
  {
    id: 'purchase-atl',
    value: '1.25%',
    label: 'purchase WHT for ATL buyers',
    icon: Handshake,
  },
  {
    id: 'section-7e',
    value: 'Omitted',
    label: 'Section 7E deemed-income tax',
    icon: FileText,
  },
  {
    id: 'foreign-assets',
    value: '0%',
    label: 'CVT on qualifying foreign assets',
    icon: Globe2,
  },
] as const satisfies readonly BudgetDetailMetric[];

export const PROPERTY_COMPARISON = [
  {
    id: 'section-7e',
    measure: 'Section 7E deemed-income tax',
    previous: 'In force; effectively 1% of fair market value where applicable',
    current: 'Section 7E omitted',
    impact: 'Abolished',
    tone: 'positive',
  },
  {
    id: 'sale-atl',
    measure: 'Sale WHT — Section 236C, ATL',
    previous: '4.5% / 5% / 5.5% by value band',
    current: '2.75% flat at all values',
    impact: 'Lower',
    tone: 'positive',
  },
  {
    id: 'purchase-atl',
    measure: 'Purchase WHT — Section 236K, ATL',
    previous: '1.5% / 2% / 2.5% by value band',
    current: '1.25% flat at all values',
    impact: 'Lower',
    tone: 'positive',
  },
  {
    id: 'sale-non-atl',
    measure: 'Sale WHT — Section 236C, non-ATL',
    previous: '11.5% at all value bands',
    current: '5.5% flat',
    impact: 'Lower',
    tone: 'positive',
  },
  {
    id: 'purchase-non-atl',
    measure: 'Purchase WHT — Section 236K, non-ATL',
    previous: '10.5% / 14.5% / 18.5% by value band',
    current: '2.5% flat',
    impact: 'Lower',
    tone: 'positive',
  },
  {
    id: 'late-filer',
    measure: 'Late-filer property category',
    previous: 'Separate 236C and 236K rates applied',
    current: 'Tenth Schedule rule 1A omitted',
    impact: 'Abolished',
    tone: 'positive',
  },
  {
    id: 'foreign-asset-cvt',
    measure: 'CVT on foreign assets above PKR 100M',
    previous: '1% of aggregate foreign-asset value',
    current: 'Foreign-asset CVT provision omitted',
    impact: 'Abolished',
    tone: 'positive',
  },
  {
    id: 'inherited-property',
    measure: 'Inherited immovable-property cost',
    previous: 'General inherited-asset cost rules applied',
    current: 'Specific Section 76(8A) fair-market-value rule',
    impact: 'Clarified',
    tone: 'info',
  },
  {
    id: 'cgt-atl',
    measure: 'CGT for ATL property acquired on/after 1 July 2024',
    previous: '15% of capital gain',
    current: '15% of capital gain',
    impact: 'No change',
    tone: 'neutral',
  },
] as const satisfies readonly BudgetComparisonRow[];

export const PROPERTY_COMPARISON_NOTE =
  'The enacted 236C and 236K rates are flat for FY 2026–27. Non-ATL rates shown apply the Tenth Schedule’s 100% uplift; the old banded non-filer figures no longer apply.';

export const PROPERTY_EXAMPLE = {
  title: 'Example: ATL transaction at PKR 80M',
  previous: {
    label: 'FY 2025–26',
    items: [
      { id: 'sale', label: 'Sale WHT', value: 'PKR 4.0M' },
      { id: 'purchase', label: 'Purchase WHT', value: 'PKR 1.6M' },
    ],
    total: 'PKR 5.6M',
  },
  current: {
    label: 'FY 2026–27',
    items: [
      { id: 'sale', label: 'Sale WHT', value: 'PKR 2.2M' },
      { id: 'purchase', label: 'Purchase WHT', value: 'PKR 1.0M' },
    ],
    total: 'PKR 3.2M',
  },
  difference: {
    label: 'Combined reduction',
    value: 'PKR 2.4M',
  },
  note: 'Illustrative combined transfer-stage tax: the seller pays Section 236C and the buyer separately pays Section 236K.',
} as const;

export const PROPERTY_TAX_NOTE = {
  title: 'Transfer withholding and capital-gains tax are separate',
  description:
    'Sections 236C and 236K are advance taxes collected when property is transferred. Capital-gains tax is calculated separately on the seller’s gain, and eligible Section 236C tax may be adjusted against the final income-tax liability.',
} as const;

export const PROPERTY_SOURCES = [
  ...BUDGET_SOURCES.filter((source) => source.id === 'finance-act'),
  {
    id: 'finance-act-2022',
    title: 'Finance Act 2022 — FBR',
    description: 'Official prior CVT law',
    href: 'https://www.fbr.gov.pk/Budget2022-23/FinanceAct/Finance-Act-2022.pdf',
    logo: { src: '/images/tax-guides/fbr-logo.png', alt: 'Federal Board of Revenue Pakistan' },
  },
  {
    id: 'income-tax-ordinance',
    title: 'Income Tax Ordinance — FBR',
    description: 'Official consolidated law library',
    href: 'https://fbr.gov.pk/Categ/Income-Tax-Ordinance/326',
    logo: { src: '/images/tax-guides/fbr-logo.png', alt: 'Federal Board of Revenue Pakistan' },
  },
] as const satisfies readonly BudgetSource[];

export const PROPERTY_FAQS = [
  {
    question: 'Is Section 7E deemed-income tax abolished?',
    answer:
      'Yes. Finance Act 2026 omits Section 7E. In FY 2025–26 it was in force and worked out to effectively 1% of fair market value where it applied.',
  },
  {
    question: 'What is the property sale tax rate for filers in FY 2026–27?',
    answer:
      'Advance tax on sales under Section 236C is a flat 2.75% at all values for persons on the ATL. FY 2025–26 used banded rates of 4.5%, 5% and 5.5% depending on property value.',
  },
  {
    question: 'What is the property purchase tax rate for filers?',
    answer:
      'Advance tax on purchases under Section 236K is a flat 1.25% at all values for ATL buyers, replacing the banded 1.5%, 2% and 2.5% rates that applied in FY 2025–26.',
  },
  {
    question: 'What do non-filers pay on property transactions?',
    answer:
      'Non-ATL sellers pay a flat 5.5% under Section 236C, down from 11.5%, and non-ATL buyers pay a flat 2.5% under Section 236K, replacing banded rates of 10.5%, 14.5% and 18.5%. These figures apply the Tenth Schedule uplift.',
  },
  {
    question: 'How much less tax is due on a PKR 80M transaction?',
    answer:
      'On an ATL transaction at PKR 80 million, combined transfer-stage tax falls from PKR 5.6 million to PKR 3.2 million, a reduction of PKR 2.4 million. The seller pays Section 236C and the buyer separately pays Section 236K.',
  },
  {
    question: 'Did capital-gains tax on property change?',
    answer:
      'No. For ATL persons, capital-gains tax on property acquired on or after 1 July 2024 remains 15% of the gain. Transfer withholding and capital-gains tax are separate charges.',
  },
  {
    question: 'Does the late-filer property category still exist?',
    answer:
      'No. Rule 1A of the Tenth Schedule is omitted, so the separate late-filer rates for Sections 236C and 236K no longer apply. CVT on foreign assets above PKR 100 million was also removed.',
  },
] as const satisfies readonly BudgetFaqItem[];

export const PROPERTY_PAGE_LABELS = {
  overviewTitle: 'Property budget changes overview',
  comparisonTitle: 'What changed for property owners?',
  sourcesTitle: 'Official sources',
  sourceStatusTitle: 'Official sources only',
  sourceStatusDetail: 'Last checked 28 July 2026',
} as const;

export const PROPERTY_SOCIAL_IMAGE_COPY = {
  eyebrow: 'Pakistan Budget 2026–27 · Enacted',
  title: 'Property Tax Budget Comparison',
  subtitle: 'Sale WHT 2.75% · Purchase WHT 1.25% · Section 7E omitted',
  features: 'FY 2025–26 vs FY 2026–27 · Official FBR sources',
  brand: 'My Tax Calculator',
} as const;
