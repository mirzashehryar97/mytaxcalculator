import {
  BadgePercent,
  BarChart3,
  Briefcase,
  Building2,
  CalendarDays,
  Gift,
  Laptop,
  Monitor,
  Scale,
  ShieldCheck,
  TrendingUp,
  User,
  WalletCards,
} from 'lucide-react';

import { FBR_LOGO, IRIS_LOGO } from '@/lib/officialSources';

import GuideDeductionsIcon from '@/features/tax-guides/components/icons/GuideDeductionsIcon';
import GuideFilingIcon from '@/features/tax-guides/components/icons/GuideFilingIcon';
import GuideUnderstandingIcon from '@/features/tax-guides/components/icons/GuideUnderstandingIcon';
import type {
  TaxGuideCardContent,
  TaxGuideFaqItem,
  TaxGuideResource,
  TaxGuideSearchEntry,
  TaxGuideTopic,
  TaxGuideTrustItem,
  TaxYearFact,
} from '@/features/tax-guides/types';

export const TAX_GUIDES_PAGE_COPY = {
  eyebrow: 'FBR-based · Reviewed 28 July 2026',
  title: 'Pakistan Tax Guides',
  description:
    'Practical, plain-English guidance for understanding, planning and filing taxes in Pakistan.',
  searchLabel: 'Search tax guides',
  searchPlaceholder: 'Search guides, topics or questions…',
  searchHint: 'Press Enter to open the first matching result.',
  searchNoResults: 'No matching guide found. Try “salary”, “ATL”, “IRIS” or “deductions”.',
  startTitle: 'Start here',
  startDescription: 'Three essential guides for every Pakistani taxpayer.',
  topicsTitle: 'Browse by topic',
  topicsStatus: 'Coming soon',
  snapshotTitle: 'FY 2026–27 at a glance',
  snapshotLinkLabel: 'See all eight salary tax slabs',
  questionsTitle: 'Popular questions',
  resourcesTitle: 'Official resources',
  disclaimer:
    'Educational guidance only — verify deadlines and your personal tax treatment with FBR or a qualified adviser.',
} as const;

export const TAX_GUIDES_SOCIAL_IMAGE_COPY = {
  eyebrow: 'Pakistan tax guides · FY 2026-27',
  title: 'Understand, plan and file your Pakistan taxes',
  subtitle: 'Salary slabs · Deductions · IRIS filing',
  features: 'Official FBR sources · Plain-English guidance · Free',
  brand: 'My Tax Calculator',
} as const;

export const TAX_GUIDES_TRUST_ITEMS = [
  { id: 'finance-act', label: 'Finance Act 2026', icon: Scale },
  { id: 'official-sources', label: 'Official FBR sources', icon: ShieldCheck },
  { id: 'free', label: 'Free to use', icon: Gift },
] as const satisfies readonly TaxGuideTrustItem[];

export const ESSENTIAL_TAX_GUIDES = [
  {
    id: 'tax-system',
    title: 'Understanding Pakistan’s Tax System',
    description: 'Income heads, residency, current salary slabs and filing obligations.',
    href: '/tax-guides/understanding-tax-system',
    readingTime: '12 min read',
    icon: GuideUnderstandingIcon,
    featured: true,
  },
  {
    id: 'deductions-credits',
    title: 'Tax Deductions & Credits',
    description: 'What can reduce taxable income or tax payable, and which records to keep.',
    href: '/tax-guides/deductions-credits',
    readingTime: '10 min read',
    icon: GuideDeductionsIcon,
    featured: false,
  },
  {
    id: 'filing-return',
    title: 'Filing Your Tax Return',
    description: 'A practical IRIS walkthrough, document checklist and common mistakes.',
    href: '/tax-guides/filing-tax-return',
    readingTime: '15 min read',
    icon: GuideFilingIcon,
    featured: false,
  },
] as const satisfies readonly TaxGuideCardContent[];

export const TAX_GUIDE_TOPICS = [
  { id: 'salary', label: 'Salary', href: '/', icon: User },
  {
    id: 'filing',
    label: 'Filing & IRIS',
    href: '/tax-guides/filing-tax-return',
    icon: Monitor,
  },
  {
    id: 'reliefs',
    label: 'Tax reliefs',
    href: '/tax-guides/deductions-credits',
    icon: BadgePercent,
  },
  {
    id: 'freelancers',
    label: 'Freelancers',
    href: '/freelancer-tax-calculator',
    icon: Laptop,
  },
  {
    id: 'business',
    label: 'Business & AOP',
    href: '/business-tax-calculator',
    icon: Briefcase,
  },
  {
    id: 'rental',
    label: 'Rental income',
    href: '/rental-income-tax-calculator',
    icon: Building2,
  },
  {
    id: 'budget',
    label: 'Budget 2026',
    href: '/budget-2025-26-vs-2026-27',
    icon: BarChart3,
  },
] as const satisfies readonly TaxGuideTopic[];

export const TAX_YEAR_FACTS = [
  {
    id: 'tax-year',
    label: 'Tax year',
    value: '1 July 2026 – 30 June 2027',
    icon: CalendarDays,
  },
  {
    id: 'zero-rate-band',
    label: 'Salaried zero-rate band',
    value: 'First PKR 600,000',
    icon: WalletCards,
  },
  {
    id: 'top-rate',
    label: 'Top salaried marginal rate',
    value: '35%',
    icon: TrendingUp,
  },
] as const satisfies readonly TaxYearFact[];

export const TAX_GUIDES_FAQS = [
  {
    id: 'need-to-file',
    question: 'Do I need to file a tax return?',
    href: '/tax-guides/filing-tax-return',
    answer:
      'It depends on the filing tests in section 114, which consider more than tax payable. Income level, certain assets, business status and other conditions can create a filing obligation, so having no tax due does not automatically mean no return is required.',
    linkLabel: 'Check the filing guide',
  },
  {
    id: 'atl',
    question: 'What is ATL and why does it matter?',
    href: '/tax-guides/filing-tax-return',
    answer:
      'The Active Taxpayer List is FBR’s record of online income-tax return filers for the relevant tax year. ATL status commonly gives access to lower withholding-tax rates; late filers may need to pay the applicable surcharge for inclusion.',
    linkLabel: 'Learn about filing and ATL',
  },
  {
    id: 'documents',
    question: 'Which documents should I keep?',
    href: '/tax-guides/filing-tax-return',
    answer:
      'Keep income and salary certificates, bank and withholding records, evidence for deductions or credits, and details supporting your wealth statement, assets and liabilities. The exact records depend on your income sources and claims.',
    linkLabel: 'See the document checklist',
  },
  {
    id: 'salary-calculation',
    question: 'How is salary tax calculated?',
    href: '/tax-guides/understanding-tax-system',
    answer:
      'Annual taxable salary is applied to progressive bands. For FY 2026–27, the first PKR 600,000 is at 0% and the top marginal band is 35%; the annual result is commonly spread across payroll withholding during the year.',
    linkLabel: 'See all salary tax slabs',
  },
] as const satisfies readonly TaxGuideFaqItem[];

export const OFFICIAL_TAX_RESOURCES: readonly TaxGuideResource[] = [
  {
    id: 'fbr',
    title: 'Federal Board of Revenue',
    description: 'Official Pakistan tax authority',
    href: 'https://www.fbr.gov.pk/',
    image: FBR_LOGO,
  },
  {
    id: 'iris',
    title: 'IRIS e-filing portal',
    description: 'Official online return-filing system',
    href: 'https://iris.fbr.gov.pk/',
    image: IRIS_LOGO,
  },
  {
    id: 'ordinance',
    title: 'Income Tax Ordinance 2001',
    description: 'Current and historical official versions',
    href: 'https://fbr.gov.pk/Categ/Income-Tax-Ordinance/326',
    image: FBR_LOGO,
  },
];

export const FINANCE_ACT_2026_SOURCE = {
  href: 'https://download1.fbr.gov.pk/Docs/20266291261044366FinanceAct2026.pdf',
  label: 'Source: Finance Act 2026 (FBR)',
} as const;

export const TAX_GUIDE_SEARCH_ENTRIES = [
  ...ESSENTIAL_TAX_GUIDES.map((guide) => ({
    id: guide.id,
    title: guide.title,
    description: guide.description,
    href: guide.href,
    keywords: [guide.title, guide.description],
  })),
  {
    id: 'salary-calculator',
    title: 'Salary tax calculator',
    description: 'Calculate salary tax and take-home pay using FY 2026–27 rates.',
    href: '/',
    keywords: ['salary', 'tax slabs', 'take home', 'payroll', 'calculator'],
  },
  {
    id: 'freelancer-calculator',
    title: 'Freelancer tax calculator',
    description: 'Estimate tax on eligible IT and IT-enabled export income.',
    href: '/freelancer-tax-calculator',
    keywords: ['freelancer', 'PSEB', 'IT export', 'section 154A'],
  },
  {
    id: 'business-calculator',
    title: 'Business & AOP tax calculator',
    description: 'Estimate tax on business, professional or AOP net income.',
    href: '/business-tax-calculator',
    keywords: ['business', 'AOP', 'self employed', 'professional'],
  },
  {
    id: 'rental-calculator',
    title: 'Rental income tax calculator',
    description: 'Estimate the tax your tenant deducts from rent under Section 155.',
    href: '/rental-income-tax-calculator',
    keywords: ['rent', 'rental income', 'property', 'landlord', 'section 155'],
  },
  ...TAX_GUIDES_FAQS.map((faq) => ({
    id: `faq-${faq.id}`,
    title: faq.question,
    description: faq.answer,
    href: faq.href,
    keywords: [faq.question, faq.answer],
  })),
] as const satisfies readonly TaxGuideSearchEntry[];
