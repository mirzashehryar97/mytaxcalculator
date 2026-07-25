import type {
  FreelancerCurrency,
  FreelancerEligibilityRequirement,
  FreelancerFaqItem,
  FreelancerOption,
  FreelancerRateGuideRow,
  FreelancerScenario,
  FreelancerSourceLink,
  FreelancerTaxInputs,
} from '@/features/freelancer-tax/types';

import {
  FREELANCER_PSEB_NON_ATL_RATE_PERCENT,
  FREELANCER_PSEB_RATE_PERCENT,
  FREELANCER_STANDARD_NON_ATL_RATE_PERCENT,
  FREELANCER_STANDARD_RATE_PERCENT,
} from './rates';

export const DEFAULT_FREELANCER_EXCHANGE_RATE = 280;

export const DEFAULT_FREELANCER_INPUTS = {
  amount: 2000,
  currency: 'USD',
  exchangeRate: DEFAULT_FREELANCER_EXCHANGE_RATE,
  psebRegistered: true,
  atl: true,
} as const satisfies FreelancerTaxInputs;

export const FREELANCER_CURRENCY_OPTIONS = [
  { value: 'USD', label: 'USD' },
  { value: 'PKR', label: 'PKR' },
] as const satisfies readonly FreelancerOption<FreelancerCurrency>[];

export const FREELANCER_PSEB_OPTIONS = [
  { value: 'registered', label: 'Yes' },
  { value: 'not-registered', label: 'No' },
] as const satisfies readonly FreelancerOption<'registered' | 'not-registered'>[];

export const FREELANCER_PAGE_COPY = {
  eyebrow: `Fiscal Year 2026-27 · Section 154A · ${FREELANCER_PSEB_RATE_PERCENT}% PSEB rate extended through Tax Year 2029`,
  title: 'Pakistan Freelancer Tax Calculator 2026-27',
  subtitle:
    'Estimate the tax your bank deducts on IT export income, and compare PSEB filer vs non-filer rates under Section 154A.',
  badges: ['Section 154A', 'Final tax when conditions are met', 'Foreign clients'],
  formTitle: 'Export income details',
  resultTitle: 'Your freelancer tax estimate',
  bankDeductionNote:
    'Your bank normally deducts the tax when the foreign payment reaches your account in Pakistan.',
  finalTaxCaveat:
    'This is your final tax only if you meet all Section 154A requirements, including receiving the payment through a bank in Pakistan and completing the required tax filings.',
  nonAtlTaxCaveat:
    'The non-filer amount shown is an estimate of what your bank may deduct. If you are not on ATL or do not meet the other Section 154A requirements, this deduction may not be your final tax and you may owe tax under the normal rules.',
  exchangeRateNote:
    'The default exchange rate is only an example. Enter the PKR rate from the day the payment reached your bank account.',
  localIncomeTitle: 'Export income vs local-client income',
  localIncomeBody:
    'This calculator is only for income from foreign clients. Calculate income from Pakistani clients separately as business income.',
  localIncomeLinkLabel: 'Business Tax Calculator for local-client income',
  localIncomeLinkCta: 'Open the business calculator',
  localIncomeLinkHref: '/business-tax-calculator',
} as const;

export const FREELANCER_SOCIAL_IMAGE_COPY = {
  eyebrow: 'FY 2026-27 · FBR Section 154A',
  title: 'Pakistan Freelancer Tax Calculator',
  subtitle: 'PSEB filer 0.25% · General filer 1%',
  features: 'Free · USD & PKR · Monthly and annual estimates',
  brand: 'My Tax Calculator',
} as const;

export const FREELANCER_FORM_COPY = {
  fiscalYearLabel: 'Fiscal year',
  currencyLabel: 'Currency received',
  monthlyAmountLabel: 'Monthly gross export income',
  amountHelp: 'Enter income before platform fees, bank charges, or business expenses.',
  amountPlaceholder: '2000',
  exchangeRateLabel: 'Exchange rate',
  exchangeRateSuffix: 'PKR / USD',
  exchangeRatePlaceholder: '280',
  psebLabel: 'PSEB registered',
  psebDescription: 'Your PSEB registration must be active to get the lower rate.',
  atlLabel: 'Active Taxpayer List (ATL) status',
  atlDescription:
    'You must be on ATL to get the 0.25% rate and have it count as final tax. Banks deduct more tax from non-filers from FY 2025-26.',
  invalidMessage: 'Enter an income amount above zero and a valid exchange rate.',
} as const;

export const FREELANCER_RESULT_COPY = {
  appliedRate: 'Tax rate used (Section 154A)',
  monthlyBreakdownTitle: 'Monthly Breakdown',
  annualBreakdownTitle: 'Annual Breakdown',
  comparisonTitle: 'Compare your annual tax',
  concessionLabel: `PSEB-registered filer (${FREELANCER_PSEB_RATE_PERCENT}%)`,
  standardLabel: `Filer without PSEB (${FREELANCER_STANDARD_RATE_PERCENT}%)`,
  savingsLabel: 'Yearly tax saved with PSEB registration',
  eligibleBadge: 'Lower PSEB rate used',
  standardBadge: 'General rate used',
  nonAtlBadge: 'Higher non-filer rate used',
} as const;

export const FREELANCER_SECTION_COPY = {
  eligibilityTitle: 'When you can get the 0.25% PSEB rate',
  eligibilityDescription: 'Make sure all of these are true for your foreign income.',
  scenariosTitle: 'Common freelancer tax scenarios',
  faqEyebrow: 'Got questions?',
  faqTitle: 'Freelancer tax FAQs for Pakistan',
  faqDescription: 'Simple answers about tax on IT and IT-enabled export income in Pakistan.',
  estimateDisclaimer:
    'This calculator provides an estimate, not tax or legal advice. Confirm your deduction with your bank or a qualified Pakistan tax professional.',
} as const;

export const FREELANCER_GUIDE_COPY = {
  rateTitle: 'Freelancer tax rates in Pakistan for FY 2026-27',
  rateDescription:
    'Your Pakistan Software Export Board (PSEB) registration and filer status decide which Section 154A tax rate applies to eligible IT and IT-enabled export income.',
  psebColumn: 'PSEB status',
  filerColumn: 'Taxpayer status',
  rateColumn: 'Rate on income before fees',
  treatmentColumn: 'How the tax is treated',
  nonFilerCaveat:
    'For non-filers, these rates estimate what the bank may deduct. If you are not on ATL or do not meet the other Section 154A requirements, this may not be your final tax.',
  calculationTitle: 'How freelancer tax is calculated under Section 154A',
  calculationDescription:
    'Convert the foreign payment to PKR using the exchange rate from the day it reached your bank account. The tax rate applies to the full amount before platform fees, bank charges, or business expenses.',
  formulaLabel: 'Formula',
  formulaResult: 'Tax',
  formulaTerms: [
    { id: 'income', text: 'export income in PKR before fees and expenses' },
    { id: 'rate', text: 'tax rate' },
  ],
  exampleTitle: 'FY 2026-27 worked example',
  exampleIntro:
    'USD 2,000 a month at an example rate of PKR 280/USD is PKR 6,720,000 of export income per year.',
  exampleRows: [
    { id: 'filer', label: 'PSEB-registered filer (0.25%)', value: 'PKR 16,800' },
    { id: 'non-filer', label: 'Non-filer (1%)', value: 'PKR 67,200' },
  ],
  exampleSavingLabel: 'Filer saves',
  exampleSavingValue: 'PKR 50,400',
  exchangeRateCaveat:
    'PKR 280 is only an example, not a live exchange rate. Enter the rate from the day the payment reached your bank account.',
  sourcesTitle: 'Sources used',
  sourcesDescription:
    'Rates were checked using the official Finance Act 2026 and FBR withholding tax rate card.',
  reviewedLabel: 'Last reviewed 24 July 2026',
  reviewedDateTime: '2026-07-24',
} as const;

export const FREELANCER_RATE_GUIDE_ROWS = [
  {
    id: 'pseb-filer',
    psebStatus: 'Registered',
    filerStatus: 'Filer (on ATL)',
    rate: `${FREELANCER_PSEB_RATE_PERCENT}%`,
    treatment: 'Lower PSEB rate under Section 154A',
  },
  {
    id: 'general-filer',
    psebStatus: 'Not registered',
    filerStatus: 'Filer (on ATL)',
    rate: `${FREELANCER_STANDARD_RATE_PERCENT}%`,
    treatment: 'General rate under Section 154A',
  },
  {
    id: 'pseb-non-filer',
    psebStatus: 'Registered',
    filerStatus: 'Non-filer',
    rate: `${FREELANCER_PSEB_NON_ATL_RATE_PERCENT}%`,
    treatment: 'Higher rate for non-filers from FY 2025-26',
  },
  {
    id: 'general-non-filer',
    psebStatus: 'Not registered',
    filerStatus: 'Non-filer',
    rate: `${FREELANCER_STANDARD_NON_ATL_RATE_PERCENT}%`,
    treatment: 'Higher rate for non-filers from FY 2025-26',
  },
] as const satisfies readonly FreelancerRateGuideRow[];

export const FREELANCER_SOURCE_LINKS = [
  {
    href: 'https://download1.fbr.gov.pk/Docs/20266291261044366FinanceAct2026.pdf',
    label: 'Finance Act 2026 (FBR)',
  },
  {
    href: 'https://download1.fbr.gov.pk/Docs/20258181281745641WHT-RateCard.pdf',
    label: 'FBR withholding tax rate card',
  },
] as const satisfies readonly FreelancerSourceLink[];

export const FREELANCER_ELIGIBILITY_REQUIREMENTS = [
  {
    id: 'it-export-services',
    text: 'Your income is from IT or IT-enabled services provided to foreign clients.',
  },
  {
    id: 'pseb-registration',
    text: 'Your PSEB registration is active.',
    inputKey: 'psebRegistered',
  },
  {
    id: 'atl-status',
    text: 'You are on the Active Taxpayer List (ATL).',
    inputKey: 'atl',
  },
  {
    id: 'banking-channel',
    text: 'You receive the foreign-currency payment through a bank in Pakistan.',
  },
] as const satisfies readonly FreelancerEligibilityRequirement[];

export const FREELANCER_SCENARIOS = [
  {
    id: 'all-export-income',
    title: 'All export income',
    description: `If all your income is from eligible IT exports, your PSEB registration is active, and you are on ATL, the ${FREELANCER_PSEB_RATE_PERCENT}% rate applies to your income before fees and expenses.`,
    tone: 'eligible',
  },
  {
    id: 'mixed-income',
    title: 'Mixed income',
    description:
      'Keep income from foreign clients separate from income from Pakistani clients. Use this calculator for foreign-client income and the business-income rules for local income.',
    tone: 'mixed',
  },
  {
    id: 'standard-rate',
    title: 'PSEB or ATL requirement not met',
    description: `A filer without PSEB registration pays ${FREELANCER_STANDARD_RATE_PERCENT}%. A PSEB-registered non-filer pays ${FREELANCER_PSEB_NON_ATL_RATE_PERCENT}%. A non-filer without PSEB registration pays ${FREELANCER_STANDARD_NON_ATL_RATE_PERCENT}%.`,
    tone: 'standard',
  },
] as const satisfies readonly FreelancerScenario[];

export const FREELANCER_FAQS = [
  {
    id: 'freelancer-tax-rate',
    question: 'What is the freelancer tax rate in Pakistan for FY 2026-27?',
    answer: `For eligible IT and IT-enabled export income under Section 154A, a filer pays ${FREELANCER_PSEB_RATE_PERCENT}% with active PSEB registration or ${FREELANCER_STANDARD_RATE_PERCENT}% without it. A non-filer pays ${FREELANCER_PSEB_NON_ATL_RATE_PERCENT}% with PSEB registration or ${FREELANCER_STANDARD_NON_ATL_RATE_PERCENT}% without it. These rates apply to income before fees and expenses, not profit.`,
  },
  {
    id: 'pseb-meaning',
    question: 'What is PSEB, and why can registration reduce freelancer tax?',
    answer:
      'PSEB is the Pakistan Software Export Board. You can get the lower 0.25% rate if your PSEB registration is active, you are on ATL, and you meet the other Section 154A requirements.',
  },
  {
    id: 'concession-eligibility',
    question: `How do I qualify for the ${FREELANCER_PSEB_RATE_PERCENT}% rate?`,
    answer:
      'Keep your PSEB registration active, stay on the Active Taxpayer List, file the required tax return, and receive eligible foreign-currency payments through a bank in Pakistan.',
  },
  {
    id: 'final-tax-treatment',
    question: 'Is this the final tax, or do I pay more?',
    answer:
      'If you meet all Section 154A requirements, the tax your bank deducts is the final tax on that eligible export income. You still need to file an annual tax return to stay on ATL, but that income is not taxed again under the normal tax slabs.',
  },
  {
    id: 'local-client-income',
    question: 'What about income from Pakistani clients?',
    answer:
      'Section 154A does not cover income from Pakistani clients. Treat it as business income and calculate its tax separately using the business-income rules.',
  },
  {
    id: 'gross-receipts',
    question: 'Is freelancer tax based on income before expenses or on profit?',
    answer:
      'Section 154A applies the tax rate to eligible export income before platform fees, bank charges, or business expenses. For foreign currency, use the exchange rate from the day the payment reached your bank account.',
  },
  {
    id: 'platform-receipts',
    question: 'Do payments from Upwork, Fiverr, Payoneer, or Wise qualify?',
    answer:
      'The platform alone does not decide this. The payment must be for eligible IT or IT-enabled services and must reach Pakistan in foreign currency through a bank. Ask your bank how it records the payment.',
  },
  {
    id: 'bank-deduction',
    question: 'Does the bank deduct the tax automatically?',
    answer:
      'Yes. Your bank normally deducts the tax when an eligible foreign payment reaches your account in Pakistan.',
  },
] as const satisfies readonly FreelancerFaqItem[];
