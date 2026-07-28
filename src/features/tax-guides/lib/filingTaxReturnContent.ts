import {
  BookOpen,
  CalendarDays,
  Clock3,
  Contact,
  Download,
  FileBadge2,
  FolderOpen,
  HelpCircle,
  Landmark,
  MonitorCheck,
  SearchCheck,
  ShieldCheck,
} from 'lucide-react';

import GuideDeductionsIcon from '@/features/tax-guides/components/icons/GuideDeductionsIcon';
import GuideUnderstandingIcon from '@/features/tax-guides/components/icons/GuideUnderstandingIcon';
import type {
  TaxGuideAfterFilingStep,
  TaxGuideArticleHeroContent,
  TaxGuideArticleSource,
  TaxGuideArticleTocItem,
  TaxGuideArticleTool,
  TaxGuideFilingDocument,
  TaxGuideFilingPreparationCard,
  TaxGuideFilingProcessStep,
  TaxGuideRelatedArticle,
  TaxGuideWealthFormulaItem,
} from '@/features/tax-guides/types';

export const FILING_TAX_RETURN_HERO = {
  breadcrumb: 'Filing Your Tax Return',
  badge: 'Step-by-step',
  title: 'How to File an Income Tax Return in Pakistan',
  description:
    'Follow the FBR IRIS process: check the deadline, prepare documents, file the return and wealth statement, reconcile tax, and save proof.',
  meta: [
    {
      id: 'updated',
      label: 'Updated 28 July 2026',
      icon: CalendarDays,
      dateTime: '2026-07-28',
    },
    { id: 'reading-time', label: '15 min read', icon: Clock3 },
    { id: 'reviewed', label: 'Official IRIS workflow', icon: ShieldCheck },
    {
      id: 'author',
      label: 'By My Tax Calculator',
      icon: BookOpen,
      href: '/about',
    },
  ],
  primaryAction: {
    label: 'Open IRIS',
    href: 'https://iris.fbr.gov.pk/',
    external: true,
  },
} as const satisfies TaxGuideArticleHeroContent;

export const FILING_TAX_RETURN_SOCIAL_IMAGE_COPY = {
  eyebrow: 'FBR IRIS filing guide · Pakistan',
  title: 'How to File Your Income Tax Return',
  subtitle: 'Deadlines · Documents · Wealth reconciliation',
  features: 'Seven filing steps · Official FBR links · ATL guidance',
  brand: 'My Tax Calculator',
} as const;

export const FILING_TAX_RETURN_TOC = [
  { id: 'deadline', label: 'Filing deadlines', href: '#income-tax-return-deadlines' },
  { id: 'before-start', label: 'Before you start', href: '#before-you-start' },
  { id: 'documents', label: 'Documents checklist', href: '#documents-checklist' },
  { id: 'steps', label: '7 filing steps', href: '#filing-steps' },
  { id: 'wealth', label: 'Wealth reconciliation', href: '#wealth-reconciliation' },
  { id: 'submit', label: 'Before submitting', href: '#before-submitting' },
  { id: 'after', label: 'After filing', href: '#after-filing' },
] as const satisfies readonly TaxGuideArticleTocItem[];

export const FILING_OFFICIAL_LINKS = [
  {
    id: 'iris',
    label: 'IRIS e-filing portal',
    href: 'https://iris.fbr.gov.pk/',
    icon: MonitorCheck,
    external: true,
  },
  {
    id: 'registration',
    label: 'FBR taxpayer registration',
    href: 'https://www.fbr.gov.pk/categ/register-income-tax/51147/30846/%2071148',
    icon: Contact,
    external: true,
  },
  {
    id: 'help',
    label: 'FBR IRIS help',
    href: 'https://e.fbr.gov.pk/SOP/IRIS/help/index.html',
    icon: HelpCircle,
    external: true,
  },
] as const satisfies readonly TaxGuideArticleTool[];

export const FILING_TAX_RETURN_SOURCES = [
  {
    label: 'FBR: File Income Tax Return',
    href: 'https://fbr.gov.pk/categ/file-income-tax-return/51147/80860/71160',
  },
  {
    label: 'FBR: Income Tax Due Dates',
    href: 'https://fbr.gov.pk/categ/income-tax-due-dates/51147/40846/81148',
  },
  {
    label: 'Income Tax Ordinance 2001',
    href: 'https://fbr.gov.pk/Categ/Income-Tax-Ordinance/326',
  },
] as const satisfies readonly TaxGuideArticleSource[];

export const FILING_DUE_DATES_SOURCE = {
  label: 'Check the current due date on FBR',
  href: 'https://fbr.gov.pk/categ/income-tax-due-dates/51147/40846/81148',
} as const;

export const FILING_PREPARATION_CARDS = [
  {
    id: 'identity',
    title: 'Identity & access',
    description: 'Have your CNIC/NTN, IRIS login and active email/mobile ready.',
    icon: Contact,
  },
  {
    id: 'income',
    title: 'Income & tax paid',
    description: 'Gather salary certificates, business records and withholding evidence.',
    icon: FileBadge2,
  },
  {
    id: 'wealth',
    title: 'Assets & liabilities',
    description: 'List bank balances, property, vehicles, investments and loans.',
    icon: Landmark,
  },
] as const satisfies readonly TaxGuideFilingPreparationCard[];

export const FILING_DOCUMENTS = [
  { id: 'salary', label: 'Salary certificates' },
  { id: 'property', label: 'Property and vehicle details' },
  { id: 'bank', label: 'Bank statements' },
  { id: 'investments', label: 'Investment statements' },
  { id: 'withholding', label: 'Withholding evidence' },
  { id: 'relief', label: 'Donation / pension evidence' },
  { id: 'business', label: 'Business accounts' },
  { id: 'prior-return', label: 'Prior-year return and wealth statement' },
] as const satisfies readonly TaxGuideFilingDocument[];

export const FILING_PROCESS_STEPS = [
  {
    id: 'step1',
    number: 1,
    title: 'Sign in and choose the tax year',
    description: 'Log in to IRIS, choose the correct tax year and verify your personal details.',
  },
  {
    id: 'step2',
    number: 2,
    title: 'Open the income tax return',
    description: 'Select the applicable return for your taxpayer type and start a new return.',
  },
  {
    id: 'step3',
    number: 3,
    title: 'Report every source of income',
    description: 'Declare salary, business, property, capital gains and other income that applies.',
  },
  {
    id: 'step4',
    number: 4,
    title: 'Enter deductions, credits and tax withheld',
    description: 'Claim eligible relief and reconcile each withholding entry with your evidence.',
  },
  {
    id: 'step5',
    number: 5,
    title: 'Complete assets, liabilities and wealth reconciliation',
    description: 'Complete the wealth statement and explain the movement in your closing wealth.',
  },
  {
    id: 'step6',
    number: 6,
    title: 'Review tax payable and create payment if needed',
    description: 'Review IRIS calculations and create the required payment before submission.',
  },
  {
    id: 'step7',
    number: 7,
    title: 'Submit and save the acknowledgements',
    description: 'Submit the return and wealth statement, then download proof of completion.',
  },
] as const satisfies readonly TaxGuideFilingProcessStep[];

export const WEALTH_FORMULA_ITEMS = [
  { id: 'opening', label: 'Opening wealth', operator: '+' },
  { id: 'inflows', label: 'Income and inflows', operator: '-' },
  { id: 'outflows', label: 'Expenses and outflows', operator: '=' },
  { id: 'closing', label: 'Closing wealth' },
] as const satisfies readonly TaxGuideWealthFormulaItem[];

export const WEALTH_EXAMPLE_ROWS = [
  { id: 'opening', label: 'Opening', value: 'PKR 3,000,000' },
  { id: 'additions', label: 'Net additions', value: 'PKR 600,000' },
  { id: 'closing', label: 'Closing', value: 'PKR 3,600,000', emphasized: true },
] as const;

export const BEFORE_SUBMIT_CHECKS = [
  'Correct tax year selected',
  'All income heads included',
  'Withholding matches evidence',
  'Assets and liabilities complete',
  'Payment cleared if tax is due',
  'Preview saved for your records',
] as const;

export const FILING_COMMON_MISTAKES = [
  'Using the wrong tax year',
  'Missing bank or withholding entries',
  'Wealth statement does not reconcile',
  'Submitting without saving proof',
] as const;

export const AFTER_FILING_STEPS = [
  {
    id: 'download',
    number: 1,
    title: 'Download acknowledgement',
    description: 'Save the return and wealth statement acknowledgements.',
    icon: Download,
  },
  {
    id: 'confirm',
    number: 2,
    title: 'Confirm submission status',
    description: 'Check IRIS for “Completed Task” status for both documents.',
    icon: SearchCheck,
  },
  {
    id: 'records',
    number: 3,
    title: 'Keep return, wealth statement and receipts',
    description: 'Store all proof, certificates and payment receipts.',
    icon: FolderOpen,
  },
  {
    id: 'atl',
    number: 4,
    title: 'Check your ATL status',
    description: 'Late filers may need to pay the applicable surcharge before ATL inclusion.',
    icon: ShieldCheck,
  },
] as const satisfies readonly TaxGuideAfterFilingStep[];

export const FILING_RELATED_ARTICLES = [
  {
    id: 'understanding',
    title: 'Understanding Pakistan’s Tax System',
    description: 'A plain-English guide to tax years, residency and filing obligations.',
    href: '/tax-guides/understanding-tax-system',
    icon: GuideUnderstandingIcon,
  },
  {
    id: 'deductions',
    title: 'Tax Deductions & Credits',
    description: 'Learn which reliefs reduce tax and what records support a valid claim.',
    href: '/tax-guides/deductions-credits',
    icon: GuideDeductionsIcon,
  },
] as const satisfies readonly TaxGuideRelatedArticle[];

export const FILING_SECTION_COPY = {
  deadlineTitle: 'Income tax return filing deadlines',
  deadlineDescription:
    'FBR lists 30 September as the ordinary due date for individuals and AOPs, and 31 December for companies. Extensions can be announced by notification, so confirm the date for your tax year before filing.',
  beforeStartTitle: 'Before you start',
  documentsTitle: 'Documents checklist',
  printChecklistLabel: 'Print this checklist',
  filingStepsTitle: 'File in IRIS: 7 clear steps',
  returnWealthTitle: 'Return + wealth statement',
  returnWealthDescription:
    'For individual filers, both documents must be completed. Your closing wealth should reconcile with opening wealth, income, expenses, gifts, transfers and other movements.',
  reconciliationTitle: 'Wealth reconciliation made understandable',
  exampleTitle: 'Example',
  exampleCaption: 'amounts in PKR',
  beforeSubmitTitle: 'Before you press Submit',
  mistakesTitle: 'Common mistakes to avoid',
  afterFilingTitle: 'After filing',
  recordsNotice:
    'FBR says people with taxable income should retain income-tax return records for six years.',
  continueTitle: 'Continue learning',
  continueDescription: 'Use these guides to strengthen your filing and tax-planning knowledge.',
  sidebarDeadline:
    'Standard individual and AOP due date: 30 September. Check FBR for any extension.',
} as const;
