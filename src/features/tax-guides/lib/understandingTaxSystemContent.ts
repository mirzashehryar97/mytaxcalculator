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
  breadcrumb: 'Pakistan’s Tax System, Explained',
  badge: 'Beginner-friendly guide',
  title: 'Pakistan Income Tax and Salary Rates, Explained Simply',
  description:
    'Learn how income tax works in Pakistan for 2026–27: how salary tax is calculated, who may need to file a return, what tax residency means and which records to keep.',
  meta: [
    {
      id: 'updated',
      label: 'Updated 28 July 2026',
      icon: CalendarDays,
      dateTime: '2026-07-28',
    },
    { id: 'reading-time', label: '12 min read', icon: Clock3 },
    { id: 'reviewed', label: 'Checked against Finance Act 2026', icon: ShieldCheck },
    {
      id: 'author',
      label: 'By My Tax Calculator',
      icon: BookOpen,
      href: '/about',
    },
  ],
} as const satisfies TaxGuideArticleHeroContent;

export const UNDERSTANDING_TAX_SYSTEM_SOCIAL_IMAGE_COPY = {
  eyebrow: 'Pakistan tax guide · 2026-27',
  title: 'Pakistan Income Tax, Explained Simply',
  subtitle: 'Salary rates · Tax year · Who may need to file',
  features: 'Based on Finance Act 2026 · Official FBR sources',
  brand: 'My Tax Calculator',
} as const;

export const UNDERSTANDING_TAX_SYSTEM_TOC = [
  { id: 'system', label: 'How taxes work', href: '#how-the-system-works' },
  {
    id: 'residency',
    label: 'Tax year & who counts as a resident',
    href: '#tax-year-residency',
  },
  { id: 'income-heads', label: 'Five types of income', href: '#five-heads-of-income' },
  { id: 'slabs', label: 'Salary tax rates', href: '#salary-tax-slabs' },
  { id: 'filing', label: 'Who may need to file', href: '#who-must-file' },
  { id: 'records', label: 'Due dates & records', href: '#deadlines-records' },
] as const satisfies readonly TaxGuideArticleTocItem[];

export const UNDERSTANDING_TAX_SYSTEM_TOOLS = [
  { id: 'salary', label: 'Salary tax calculator', href: '/', icon: Calculator },
  {
    id: 'business',
    label: 'Business tax calculator',
    href: '/business-tax-calculator',
    icon: Briefcase,
  },
  {
    id: 'freelancer',
    label: 'Freelancer tax calculator',
    href: '/freelancer-tax-calculator',
    icon: Laptop,
  },
  {
    id: 'rental',
    label: 'Rental income tax calculator',
    href: '/rental-income-tax-calculator',
    icon: Building2,
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
  'Higher tax rates apply as income moves into higher bands, but only the income inside each band is charged at that rate.',
  'Pakistan’s tax year usually runs from 1 July to 30 June.',
  'FBR groups income into five main types when working out tax.',
  'You may need to file a return even if your employer already deducted tax or you have no extra tax to pay.',
] as const;

export const TAX_SYSTEM_OVERVIEW_CARDS = [
  {
    id: 'federal',
    title: 'Federal income tax — handled by FBR',
    description: 'FBR collects income tax from people and businesses across Pakistan.',
    detail:
      'The main rules are in the Income Tax Ordinance 2001 and are updated through Finance Acts.',
    icon: Landmark,
  },
  {
    id: 'provincial',
    title: 'Provincial taxes — services and property',
    description: 'Each province has its own revenue authority for taxes under provincial rules.',
    detail: 'Examples include sales tax on services and some taxes linked to property.',
    icon: Building2,
  },
  {
    id: 'withholding',
    title: 'Tax deducted before you are paid',
    description:
      'Employers, banks and some customers may take tax out of a payment and send it to FBR.',
    detail:
      'This deduction may reduce the tax you owe later or, for some payments, count as the full tax due.',
    icon: ReceiptText,
  },
] as const satisfies readonly TaxGuideArticleInfoCard[];

export const TAX_RESIDENCY_CARDS = [
  {
    id: 'resident',
    title: 'Resident for tax purposes',
    items: [
      'Pakistan may tax income you earn both inside and outside the country.',
      'If you paid tax in another country, the rules may let you subtract some or all of it from your Pakistan tax bill.',
    ],
    tone: 'emerald',
  },
  {
    id: 'non-resident',
    title: 'Non-resident for tax purposes',
    items: [
      'You usually pay Pakistan income tax only on income that comes from Pakistan.',
      'A tax agreement between Pakistan and another country may lower the amount you have to pay.',
    ],
    tone: 'amber',
  },
] as const;

export const TAX_INCOME_HEADS = [
  {
    id: 'salary',
    title: 'Salary',
    description: 'Pay from a job, including bonuses, benefits and allowances.',
  },
  {
    id: 'property',
    title: 'Property income',
    description: 'Rent and certain other income you receive from property.',
    href: '/rental-income-tax-calculator',
    linkLabel: 'Rental income calculator',
  },
  {
    id: 'business',
    title: 'Business income',
    description: 'Profit from a business, professional work or freelancing.',
  },
  {
    id: 'capital-gains',
    title: 'Profit from selling assets',
    description: 'Taxable profit from selling certain assets, such as shares or property.',
    href: '/property-capital-gains-tax-calculator',
    linkLabel: 'Property capital gains calculator',
  },
  {
    id: 'other',
    title: 'Other income',
    description: 'Income that does not fit the first four types, such as some investment income.',
  },
] as const satisfies readonly TaxGuideIncomeHead[];

export const SALARIED_TAX_SLABS_2026_27 = [
  { id: 'slab-1', income: 'Up to PKR 600,000', rate: 'No tax' },
  {
    id: 'slab-2',
    income: 'PKR 600,001–1,200,000',
    rate: '1% of the amount over PKR 600,000',
  },
  {
    id: 'slab-3',
    income: 'PKR 1,200,001–2,200,000',
    rate: 'PKR 6,000, plus 11% of the amount over PKR 1,200,000',
  },
  {
    id: 'slab-4',
    income: 'PKR 2,200,001–3,200,000',
    rate: 'PKR 116,000, plus 20% of the amount over PKR 2,200,000',
  },
  {
    id: 'slab-5',
    income: 'PKR 3,200,001–4,100,000',
    rate: 'PKR 316,000, plus 25% of the amount over PKR 3,200,000',
  },
  {
    id: 'slab-6',
    income: 'PKR 4,100,001–5,600,000',
    rate: 'PKR 541,000, plus 29% of the amount over PKR 4,100,000',
  },
  {
    id: 'slab-7',
    income: 'PKR 5,600,001–7,000,000',
    rate: 'PKR 976,000, plus 32% of the amount over PKR 5,600,000',
  },
  {
    id: 'slab-8',
    income: 'Above PKR 7,000,000',
    rate: 'PKR 1,424,000, plus 35% of the amount over PKR 7,000,000',
  },
] as const satisfies readonly TaxGuideSlabRow[];

export const SALARY_TAX_EXAMPLE = {
  title: 'Example: yearly salary of PKR 2,400,000',
  description: 'A simple calculation before any tax reductions or extra tax charges:',
  steps: [
    { id: 'base', title: 'Tax on salary up to PKR 2,200,000', value: 'PKR 116,000' },
    { id: 'marginal', title: 'Tax on the remaining PKR 200,000 at 20%', value: 'PKR 40,000' },
    { id: 'total', title: 'Total tax for the year', value: 'PKR 156,000' },
  ],
} as const;

export const TAX_FILING_CHECKS = [
  { id: 'income', label: 'Your income after allowed deductions is above the filing limit.' },
  { id: 'business', label: 'You earn money through a business, professional work or freelancing.' },
  { id: 'assets', label: 'You own property, land or a vehicle covered by FBR’s filing rules.' },
  { id: 'foreign', label: 'You receive income from abroad or own assets outside Pakistan.' },
  {
    id: 'atl',
    label: 'You want a tax refund or your name on the Active Taxpayers List (ATL).',
  },
] as const satisfies readonly TaxGuideFilingCheck[];

export const UNDERSTANDING_RELATED_ARTICLES = [
  {
    id: 'deductions',
    title: 'Tax Deductions and Credits, Explained',
    description: 'Learn what may lower the income you are taxed on or reduce your final tax bill.',
    href: '/tax-guides/deductions-credits',
    icon: GuideDeductionsIcon,
  },
  {
    id: 'filing',
    title: 'Filing Your Tax Return',
    description:
      'A step-by-step guide to IRIS, FBR’s online filing portal, with a document checklist.',
    href: '/tax-guides/filing-tax-return',
    icon: GuideFilingIcon,
  },
] as const satisfies readonly TaxGuideRelatedArticle[];

export const UNDERSTANDING_SECTION_COPY = {
  systemTitle: 'How Pakistan’s tax system works',
  systemDescription:
    'The Federal Board of Revenue (FBR) collects income tax across Pakistan. Provincial authorities collect some other taxes, including taxes on services and property. In many cases, tax is taken out before you receive a payment.',
  taxYearTitle: 'The tax year and your tax residency',
  taxYearLabel: 'Tax year',
  taxYearDescription: 'Pakistan’s usual tax year runs from:',
  taxYearNamingNote:
    'FBR and the tax law call this period Tax Year 2027 because it ends in 2027. You will also see this name in IRIS, FBR’s online tax portal.',
  residencyLabel: 'Who counts as a resident for tax?',
  residencyDescription:
    'Tax residency is a legal status and is not the same as citizenship. It usually depends on how many days you spend in Pakistan, along with other conditions in the tax law.',
  incomeHeadsTitle: 'The five types of income FBR uses',
  slabsTitle: 'Salary tax rates — 2026–27',
  slabsDescription:
    'Pakistan uses income bands. If your salary moves into a higher band, the higher rate applies only to the part above that band’s starting point—not to your whole salary.',
  calculateLabel: 'Calculate your salary tax',
  filingTitle: 'Could you need to file a tax return?',
  filingDescription: 'Check the current FBR rules if any of these apply to you:',
  filingNotice:
    'The full list of filing rules is in section 114 of the Income Tax Ordinance. The answer depends on your income, assets and other details—even if you have no extra tax to pay.',
  recordsTitle: 'Due dates and records to keep',
  recordsDescription:
    'FBR normally sets 30 September as the return deadline for individuals and Associations of Persons (AOPs), such as many partnerships. FBR can extend this date, so check its latest notice. If you earn income that can be taxed, FBR says to keep your tax-return records for six years.',
  filingGuideLabel: 'Read the step-by-step filing guide',
  dueDatesLabel: 'See FBR’s latest due dates',
  continueTitle: 'What to read next',
  continueDescription: 'Use these practical guides for the next steps.',
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
