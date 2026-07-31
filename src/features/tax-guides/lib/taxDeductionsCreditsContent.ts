import {
  BadgeCheck,
  BookOpen,
  Calculator,
  CalendarDays,
  CircleUserRound,
  ClipboardCheck,
  Clock3,
  FileCheck2,
  GraduationCap,
  HandHeart,
  ReceiptText,
  Scale,
  ShieldCheck,
  Soup,
  WalletCards,
} from 'lucide-react';

import GuideFilingIcon from '@/features/tax-guides/components/icons/GuideFilingIcon';
import GuideUnderstandingIcon from '@/features/tax-guides/components/icons/GuideUnderstandingIcon';
import type {
  TaxGuideArticleHeroContent,
  TaxGuideArticleSource,
  TaxGuideArticleTocItem,
  TaxGuideArticleTool,
  TaxGuideIrisStep,
  TaxGuideRelatedArticle,
  TaxGuideReliefCategory,
  TaxGuideReliefComparison,
  TaxGuideReliefFinderRow,
} from '@/features/tax-guides/types';

export const DEDUCTIONS_CREDITS_HERO = {
  breadcrumb: 'Tax Deductions & Credits',
  badge: 'Tax planning',
  title: 'Tax Deductions & Credits in Pakistan',
  description:
    'Learn which FY 2026–27 reliefs reduce taxable income, which reduce tax payable, and what evidence supports a valid claim.',
  meta: [
    {
      id: 'updated',
      label: 'Updated 28 July 2026',
      icon: CalendarDays,
      dateTime: '2026-07-28',
    },
    { id: 'reading-time', label: '10 min read', icon: Clock3 },
    { id: 'reviewed', label: 'Reviewed against Finance Act 2026', icon: ShieldCheck },
    {
      id: 'author',
      label: 'By My Tax Calculator',
      icon: BookOpen,
      href: '/about',
    },
  ],
} as const satisfies TaxGuideArticleHeroContent;

export const DEDUCTIONS_CREDITS_SOCIAL_IMAGE_COPY = {
  eyebrow: 'Pakistan tax guide · FY 2026-27',
  title: 'Tax Deductions & Credits in Pakistan',
  subtitle: 'Zakat · Donations · Pension · Education relief',
  features: 'Finance Act 2026 · Evidence checklist · IRIS steps',
  brand: 'My Tax Calculator',
} as const;

export const DEDUCTIONS_CREDITS_TOC = [
  { id: 'comparison', label: 'Deduction vs credit', href: '#deduction-vs-tax-credit' },
  { id: 'finder', label: 'Relief finder', href: '#relief-finder' },
  { id: 'categories', label: 'Common categories', href: '#common-relief-categories' },
  { id: 'example', label: 'Worked example', href: '#worked-example' },
  { id: 'records', label: 'Records to keep', href: '#records-to-keep' },
  { id: 'iris', label: 'Claiming in IRIS', href: '#claiming-relief-in-iris' },
] as const satisfies readonly TaxGuideArticleTocItem[];

export const DEDUCTIONS_CREDITS_TOOLS = [
  { id: 'salary', label: 'Salary tax calculator', href: '/', icon: Calculator },
  {
    id: 'filing-guide',
    label: 'Filing guide',
    href: '/tax-guides/filing-tax-return',
    icon: ClipboardCheck,
  },
] as const satisfies readonly TaxGuideArticleTool[];

export const DEDUCTIONS_CREDITS_SOURCES = [
  {
    label: 'Finance Act 2026',
    href: 'https://download1.fbr.gov.pk/Docs/20266291261044366FinanceAct2026.pdf',
  },
  {
    label: 'Income Tax Ordinance 2001',
    href: 'https://fbr.gov.pk/Categ/Income-Tax-Ordinance/326',
  },
] as const satisfies readonly TaxGuideArticleSource[];

export const DEDUCTION_CREDIT_COMPARISONS = [
  {
    id: 'deduction',
    title: 'Deduction',
    description: 'Reduces the income on which tax is calculated.',
    steps: ['Gross income', 'less eligible deduction', 'taxable income'],
    icon: ReceiptText,
    tone: 'emerald',
  },
  {
    id: 'credit',
    title: 'Tax credit',
    description: 'Reduces calculated tax, subject to the statutory formula and limits.',
    steps: ['Calculated tax', 'less eligible credit', 'tax payable'],
    icon: BadgeCheck,
    tone: 'blue',
  },
] as const satisfies readonly TaxGuideReliefComparison[];

export const RELIEF_FINDER_ROWS = [
  {
    id: 'zakat',
    payment: 'Zakat paid under the Zakat and Ushr law',
    evidence: 'Zakat certificate',
    verification: 'Section 60 eligibility',
    icon: ReceiptText,
  },
  {
    id: 'approved-donation',
    payment: 'Donation to an approved institution',
    evidence: 'Receipt + approval status',
    verification: 'Section 61 formula and limits',
    icon: HandHeart,
  },
  {
    id: 'pension',
    payment: 'Contribution to an approved pension fund',
    evidence: 'Provider statement',
    verification: 'Section 63 eligibility and limits',
    icon: WalletCards,
  },
  {
    id: 'education-expenses',
    payment: 'Tuition fee that meets the education-expense rules',
    evidence: 'Fee receipt + institution details',
    verification: 'Section 60D income and formula limits',
    icon: GraduationCap,
  },
] as const satisfies readonly TaxGuideReliefFinderRow[];

export const RELIEF_CATEGORIES = [
  {
    id: 'zakat',
    title: 'Zakat',
    effect: 'A deductible allowance that may reduce taxable income under section 60.',
    evidence: 'Zakat certificate and payment proof.',
    href: 'https://fbr.gov.pk/Categ/Income-Tax-Ordinance/326',
    icon: Soup,
  },
  {
    id: 'donations',
    title: 'Approved charitable donations',
    effect: 'A tax credit calculated under the section 61 formula and limits.',
    evidence: 'Receipt and approval evidence of the institution.',
    href: 'https://fbr.gov.pk/Categ/Income-Tax-Ordinance/326',
    icon: HandHeart,
  },
  {
    id: 'pension',
    title: 'Approved pension contributions',
    effect: 'A tax credit for qualifying contributions, subject to section 63 limits.',
    evidence: 'Provider statement and payment proof.',
    href: 'https://fbr.gov.pk/Categ/Income-Tax-Ordinance/326',
    icon: CircleUserRound,
  },
  {
    id: 'education-expenses',
    title: 'Eligible tuition fees',
    effect: 'A deductible allowance where section 60D income and formula conditions are met.',
    evidence: 'Fee receipts, institution details and the child’s identifying information.',
    href: 'https://fbr.gov.pk/Categ/Income-Tax-Ordinance/326',
    icon: GraduationCap,
  },
] as const satisfies readonly TaxGuideReliefCategory[];

export const DEDUCTIONS_WORKED_EXAMPLE = [
  { id: 'income', label: 'Income', value: 'PKR 2,400,000', icon: CalendarDays },
  { id: 'deduction', label: 'Eligible deduction', value: 'PKR 100,000', icon: ReceiptText },
  {
    id: 'taxable-income',
    label: 'Tax is first calculated on',
    value: 'PKR 2,300,000',
    icon: ShieldCheck,
  },
] as const;

export const DEDUCTIONS_RECORDS = [
  'Payment receipt',
  'Recipient approval evidence',
  'Bank transaction',
  'CNIC / NTN details',
  'Provider statement',
  'Calculation worksheet',
] as const;

export const CLAIMING_RELIEF_STEPS = [
  { id: 'year', number: 1, title: 'Choose tax year', icon: CalendarDays },
  { id: 'relief', number: 2, title: 'Enter the relevant deduction or credit', icon: ReceiptText },
  { id: 'reconcile', number: 3, title: 'Reconcile withholding and tax', icon: Scale },
  { id: 'review', number: 4, title: 'Review evidence before submission', icon: FileCheck2 },
] as const satisfies readonly TaxGuideIrisStep[];

export const DEDUCTIONS_RELATED_ARTICLES = [
  {
    id: 'understanding',
    title: 'Understanding Pakistan’s Tax System',
    description:
      'A plain-English guide to tax years, residency, income heads and filing obligations.',
    href: '/tax-guides/understanding-tax-system',
    icon: GuideUnderstandingIcon,
  },
  {
    id: 'filing',
    title: 'Filing Your Tax Return',
    description: 'A practical IRIS walkthrough, document checklist and common mistakes.',
    href: '/tax-guides/filing-tax-return',
    icon: GuideFilingIcon,
  },
] as const satisfies readonly TaxGuideRelatedArticle[];

export const DEDUCTIONS_SECTION_COPY = {
  beforeClaimTitle: 'Before you claim',
  beforeClaimDescription:
    'Eligibility, limits and calculation methods can change by tax year. Confirm the applicable section and retain evidence.',
  comparisonTitle: 'Deduction vs tax credit',
  comparisonNotice: 'They are not interchangeable.',
  reliefFinderTitle: 'Find the relief that matches your payment',
  categoriesTitle: 'Common relief categories',
  expensesTitle: 'Not every personal expense is deductible',
  expensesDescription:
    'Tuition fees qualify only when section 60D conditions are met, and profit paid on qualifying low-cost housing finance follows separate credit rules. Medical costs, general cover premiums and ordinary household spending do not automatically qualify.',
  exampleTitle: 'Worked example: why the distinction matters',
  exampleCreditLabel: 'An eligible tax credit is then applied to calculated tax',
  exampleNotice: 'Illustration only—the statutory formula and limits determine the actual credit.',
  recordsTitle: 'Records to keep',
  recordsNotice:
    'FBR says people with taxable income should keep income-tax return records for six years. Retain the evidence for every relief with those records.',
  irisTitle: 'Claiming relief in IRIS',
  filingGuideLabel: 'Open the filing guide',
  continueTitle: 'Continue learning',
  continueDescription: 'Build on this guide with the next practical topics.',
} as const;
