import {
  BookOpen,
  Briefcase,
  Building2,
  Calculator,
  CalendarDays,
  Clock3,
  Landmark,
  Laptop,
  ReceiptText,
  ShieldCheck,
} from 'lucide-react';

import GuideDeductionsIcon from '@/features/tax-guides/components/icons/GuideDeductionsIcon';
import GuideFilingIcon from '@/features/tax-guides/components/icons/GuideFilingIcon';
import type {
  TaxGuideArticleHeroContent,
  TaxGuideArticleInfoCard,
  TaxGuideArticleSource,
  TaxGuideArticleTocItem,
  TaxGuideArticleTool,
  TaxGuideFilingCheck,
  TaxGuideIncomeHead,
  TaxGuideRelatedArticle,
  TaxGuideSlabRow,
} from '@/features/tax-guides/types';

export const UNDERSTANDING_TAX_SYSTEM_HERO = {
  breadcrumb: 'Understanding Pakistan’s Tax System',
  badge: 'Essential guide',
  title: 'Pakistan Income Tax System & Salary Tax Slabs',
  description:
    'Understand the FY 2026–27 salary tax slabs, tax-year and residency rules, five income heads, filing duties and records to keep.',
  meta: [
    {
      id: 'updated',
      label: 'Updated 28 July 2026',
      icon: CalendarDays,
      dateTime: '2026-07-28',
    },
    { id: 'reading-time', label: '12 min read', icon: Clock3 },
    { id: 'reviewed', label: 'Reviewed against Finance Act 2026', icon: ShieldCheck },
    {
      id: 'author',
      label: 'By My Tax Calculator',
      icon: BookOpen,
      href: '/about',
    },
  ],
} as const satisfies TaxGuideArticleHeroContent;

export const UNDERSTANDING_TAX_SYSTEM_SOCIAL_IMAGE_COPY = {
  eyebrow: 'Pakistan tax guide · FY 2026-27',
  title: 'Pakistan Income Tax System & Salary Slabs',
  subtitle: 'Eight salary bands · Tax year · Filing duties',
  features: 'Finance Act 2026 · Official FBR sources · Free guide',
  brand: 'My Tax Calculator',
} as const;

export const UNDERSTANDING_TAX_SYSTEM_TOC = [
  { id: 'system', label: 'How the system works', href: '#how-the-system-works' },
  { id: 'residency', label: 'Tax year & residency', href: '#tax-year-residency' },
  { id: 'income-heads', label: 'Five heads of income', href: '#five-heads-of-income' },
  { id: 'slabs', label: 'Salary tax slabs', href: '#salary-tax-slabs' },
  { id: 'filing', label: 'Who must file', href: '#who-must-file' },
  { id: 'records', label: 'Deadlines & records', href: '#deadlines-records' },
] as const satisfies readonly TaxGuideArticleTocItem[];

export const UNDERSTANDING_TAX_SYSTEM_TOOLS = [
  { id: 'salary', label: 'Salary tax calculator', href: '/', icon: Calculator },
  {
    id: 'business',
    label: 'Business & AOP calculator',
    href: '/business-tax-calculator',
    icon: Briefcase,
  },
  {
    id: 'freelancer',
    label: 'Freelancer tax calculator',
    href: '/freelancer-tax-calculator',
    icon: Laptop,
  },
] as const satisfies readonly TaxGuideArticleTool[];

export const UNDERSTANDING_TAX_SYSTEM_SOURCES = [
  {
    label: 'Finance Act 2026',
    href: 'https://download1.fbr.gov.pk/Docs/20266291261044366FinanceAct2026.pdf',
  },
  {
    label: 'Income Tax Ordinance 2001',
    href: 'https://fbr.gov.pk/Categ/Income-Tax-Ordinance/326',
  },
] as const satisfies readonly TaxGuideArticleSource[];

export const UNDERSTANDING_TAX_SYSTEM_TAKEAWAYS = [
  'Pakistan uses a progressive income-tax system.',
  'The tax year generally runs from 1 July to 30 June.',
  'Income is classified under five statutory heads.',
  'Filing and payment obligations depend on your facts—not just salary.',
] as const;

export const TAX_SYSTEM_OVERVIEW_CARDS = [
  {
    id: 'federal',
    title: 'Federal taxes — administered by FBR',
    description: 'Income tax on individuals and businesses is a federal matter.',
    detail: 'It is collected under the Income Tax Ordinance 2001 and annual Finance Acts.',
    icon: Landmark,
  },
  {
    id: 'provincial',
    title: 'Provincial taxes — services and property matters',
    description: 'Provincial revenue authorities administer taxes within provincial jurisdiction.',
    detail: 'These can include sales tax on services and taxes connected with property.',
    icon: Building2,
  },
  {
    id: 'withholding',
    title: 'Withholding — collected at source',
    description: 'Employers, banks and other withholding agents deduct tax on specified payments.',
    detail: 'Depending on the provision, the tax may be adjustable or treated as final.',
    icon: ReceiptText,
  },
] as const satisfies readonly TaxGuideArticleInfoCard[];

export const TAX_RESIDENCY_CARDS = [
  {
    id: 'resident',
    title: 'Resident',
    items: [
      'May be subject to tax on worldwide income.',
      'May claim allowed foreign-tax credits where the rules apply.',
    ],
    tone: 'emerald',
  },
  {
    id: 'non-resident',
    title: 'Non-resident',
    items: [
      'Generally subject to tax on Pakistan-source income.',
      'Treaty relief may be available where an applicable treaty permits it.',
    ],
    tone: 'amber',
  },
] as const;

export const TAX_INCOME_HEADS = [
  { id: 'salary', title: 'Salary', description: 'Wages, bonuses, benefits and allowances.' },
  {
    id: 'property',
    title: 'Income from property',
    description: 'Rent and other income taxable under the property head.',
  },
  {
    id: 'business',
    title: 'Income from business',
    description: 'Profits from a trade, commerce, profession or vocation.',
  },
  {
    id: 'capital-gains',
    title: 'Capital gains',
    description: 'Taxable gains on the disposal of capital assets.',
  },
  {
    id: 'other',
    title: 'Income from other sources',
    description: 'Income not taxable under one of the other four heads.',
  },
] as const satisfies readonly TaxGuideIncomeHead[];

export const SALARIED_TAX_SLABS_2026_27 = [
  { id: 'slab-1', income: 'Up to PKR 600,000', rate: '0%' },
  { id: 'slab-2', income: 'PKR 600,001–1,200,000', rate: '1% above PKR 600,000' },
  {
    id: 'slab-3',
    income: 'PKR 1,200,001–2,200,000',
    rate: 'PKR 6,000 + 11% above PKR 1.2m',
  },
  {
    id: 'slab-4',
    income: 'PKR 2,200,001–3,200,000',
    rate: 'PKR 116,000 + 20% above PKR 2.2m',
  },
  {
    id: 'slab-5',
    income: 'PKR 3,200,001–4,100,000',
    rate: 'PKR 316,000 + 25% above PKR 3.2m',
  },
  {
    id: 'slab-6',
    income: 'PKR 4,100,001–5,600,000',
    rate: 'PKR 541,000 + 29% above PKR 4.1m',
  },
  {
    id: 'slab-7',
    income: 'PKR 5,600,001–7,000,000',
    rate: 'PKR 976,000 + 32% above PKR 5.6m',
  },
  {
    id: 'slab-8',
    income: 'Above PKR 7,000,000',
    rate: 'PKR 1,424,000 + 35% above PKR 7m',
  },
] as const satisfies readonly TaxGuideSlabRow[];

export const SALARY_TAX_EXAMPLE = {
  title: 'Example: annual salary PKR 2,400,000',
  description: 'Illustrative calculation before credits, rebates or surcharge.',
  steps: [
    { id: 'base', title: 'Base tax up to PKR 2.2m', value: 'PKR 116,000' },
    { id: 'marginal', title: '20% on the next PKR 200,000', value: 'PKR 40,000' },
    { id: 'total', title: 'Annual income tax', value: 'PKR 156,000' },
  ],
} as const;

export const TAX_FILING_CHECKS = [
  { id: 'income', label: 'Your taxable income exceeds the applicable threshold.' },
  { id: 'business', label: 'You run a business, profession or freelance activity.' },
  { id: 'assets', label: 'You meet a property, land or vehicle ownership test.' },
  { id: 'foreign', label: 'You have foreign income or foreign assets.' },
  { id: 'atl', label: 'You want to claim a refund or qualify for ATL.' },
] as const satisfies readonly TaxGuideFilingCheck[];

export const UNDERSTANDING_RELATED_ARTICLES = [
  {
    id: 'deductions',
    title: 'Tax Deductions & Credits',
    description: 'What can reduce taxable income or tax payable, and which records to keep.',
    href: '/tax-guides/deductions-credits',
    icon: GuideDeductionsIcon,
  },
  {
    id: 'filing',
    title: 'Filing Your Tax Return',
    description: 'A practical IRIS walkthrough, document checklist and common mistakes.',
    href: '/tax-guides/filing-tax-return',
    icon: GuideFilingIcon,
  },
] as const satisfies readonly TaxGuideRelatedArticle[];

export const UNDERSTANDING_SECTION_COPY = {
  systemTitle: 'How Pakistan’s tax system works',
  systemDescription:
    'Pakistan’s income tax is primarily a federal subject administered by the Federal Board of Revenue (FBR). Provincial taxes also apply to services and property matters, while some taxes are collected at source.',
  taxYearTitle: 'Tax year & residency',
  taxYearLabel: 'Tax year',
  taxYearDescription: 'The normal tax year in Pakistan runs from:',
  taxYearNamingNote:
    'This 1 July 2026 to 30 June 2027 period is generally called Tax Year 2027 in the Income Tax Ordinance and IRIS.',
  residencyLabel: 'Residency',
  residencyDescription:
    'Residence depends on the statutory day-count and other tests in the Income Tax Ordinance.',
  incomeHeadsTitle: 'The five heads of income',
  slabsTitle: 'Salaried income tax slabs — FY 2026–27',
  slabsDescription:
    'Progressive rates apply only to the portion within each band. These are the eight salaried-person bands in the Finance Act 2026.',
  calculateLabel: 'Calculate your salary tax',
  filingTitle: 'Who should check whether they must file?',
  filingDescription: 'Review the filing tests if any of the following apply:',
  filingNotice:
    'Section 114 contains detailed filing tests. Review the current law for your facts rather than relying only on whether tax is payable.',
  recordsTitle: 'Deadlines & records',
  recordsDescription:
    'FBR lists 30 September as the ordinary return due date for individuals and AOPs, although a notification may extend it. FBR also says people with taxable income should retain income-tax return records for six years.',
  filingGuideLabel: 'Read the step-by-step filing guide',
  dueDatesLabel: 'Check official FBR due dates',
  continueTitle: 'Continue learning',
  continueDescription: 'Deepen your understanding with these next guides.',
} as const;

export const UNDERSTANDING_RECORD_LINKS = {
  filingGuide: '/tax-guides/filing-tax-return',
  dueDates: 'https://fbr.gov.pk/categ/income-tax-due-dates/51147/40846/81148',
} as const;

export const TAX_YEAR_RANGE = {
  start: '1 July 2026',
  end: '30 June 2027',
  startIcon: CalendarDays,
  endIcon: CalendarDays,
} as const;
