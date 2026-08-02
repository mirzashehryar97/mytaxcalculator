import type { OfficialSource } from '@/components/calculator/OfficialSourcesGrid';

import { FBR_DOC_URLS, FBR_LOGO, IRIS_LOGO } from '@/lib/officialSources';

import type {
  FreelancerCurrency,
  FreelancerEligibilityRequirement,
  FreelancerFaqItem,
  FreelancerOption,
  FreelancerRateGuideRow,
  FreelancerScenario,
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
  psebUnavailableDescription:
    'There was no lower PSEB rate in 2021-22 — every export payment was taxed at the same rate that year, whether you were registered or not.',
  atlLabel: 'Active Taxpayer List (ATL) status',
  atlDescription:
    'You must be on ATL to get the 0.25% rate and have it count as final tax. Banks deduct double from non-filers in 2021-22 and again from 2025-26 onwards.',
  invalidMessage: 'Enter an income amount above zero and a valid exchange rate.',
} as const;

export const FREELANCER_RESULT_COPY = {
  appliedRate: 'Tax rate used (Section 154A)',
  monthlyBreakdownTitle: 'Monthly Breakdown',
  annualBreakdownTitle: 'Annual Breakdown',
  comparisonTitle: 'Compare your annual tax',
  concessionLabel: 'PSEB-registered filer',
  standardLabel: 'Filer without PSEB',
  savingsLabel: 'Yearly tax saved with PSEB registration',
  eligibleBadge: 'Lower PSEB rate used',
  standardBadge: 'General rate used',
  nonAtlBadge: 'Higher non-filer rate used',
  noPsebRateTitle: 'PSEB registration made no difference this year',
  noPsebRateBody:
    'The lower 0.25% rate for PSEB-registered exporters started in 2022-23. Before that the law set one rate for every export payment, so there is nothing to compare here.',
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
    treatment: 'Double the filer rate, for non-filers',
  },
  {
    id: 'general-non-filer',
    psebStatus: 'Not registered',
    filerStatus: 'Non-filer',
    rate: `${FREELANCER_STANDARD_NON_ATL_RATE_PERCENT}%`,
    treatment: 'Double the filer rate, for non-filers',
  },
] as const satisfies readonly FreelancerRateGuideRow[];

export const FREELANCER_OFFICIAL_SOURCES = [
  {
    id: 'wht-rate-card',
    title: 'FBR Withholding Income Tax Rate Card',
    description: 'The Section 154A export rates your bank deducts, for filers and non-filers.',
    href: FBR_DOC_URLS.whtRateCard,
    logo: FBR_LOGO,
  },
  {
    id: 'finance-act-2026',
    title: 'Finance Act 2026',
    description: 'The enacted budget law for 2026-27. It extends the 0.25% PSEB rate through 2029.',
    href: FBR_DOC_URLS.financeAct2026,
    logo: FBR_LOGO,
  },
  {
    id: 'finance-act-2022',
    title: 'Finance Act 2022',
    description: 'It replaced the single flat rate with the 0.25% PSEB and 1% general rates.',
    href: FBR_DOC_URLS.financeAct2022,
    logo: FBR_LOGO,
  },
  {
    id: 'finance-act-2021',
    title: 'Finance Act 2021',
    description: 'It created Section 154A and set its first rate: a flat 1%, with no PSEB rate.',
    href: FBR_DOC_URLS.financeAct2021,
    logo: FBR_LOGO,
  },
  {
    id: 'wht-rate-card-2022',
    title: 'FBR Withholding Tax Rate Card 2022',
    description: 'The FBR rate card updated to 30 June 2021, behind the 2021-22 figures.',
    href: FBR_DOC_URLS.whtRateCardTy2022,
    logo: FBR_LOGO,
  },
  {
    id: 'income-tax-ordinance',
    title: 'Income Tax Ordinance 2001',
    description: 'Section 154A — the final tax on exports of IT and IT-enabled services.',
    href: FBR_DOC_URLS.incomeTaxOrdinance2026,
    logo: FBR_LOGO,
  },
  {
    id: 'iris',
    title: 'FBR IRIS Portal',
    description: 'File your yearly return and declare your export income.',
    href: FBR_DOC_URLS.iris,
    logo: IRIS_LOGO,
  },
] as const satisfies readonly OfficialSource[];

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
    id: 'earlier-years',
    question: 'Were the rates different in earlier years?',
    answer: `Yes, in two ways. In 2021-22 there was one flat rate of ${FREELANCER_STANDARD_RATE_PERCENT}% on every export payment — the lower PSEB rate did not exist yet — and non-filers paid double, so ${FREELANCER_STANDARD_NON_ATL_RATE_PERCENT}%. The ${FREELANCER_PSEB_RATE_PERCENT}% PSEB rate arrived in 2022-23, and from then until 2024-25 non-filers paid the same rate as filers. The doubled non-filer rates you see today start in 2025-26. Pick a year in the calculator and it uses that year's rates.`,
  },
  {
    id: 'bank-deduction',
    question: 'Does the bank deduct the tax automatically?',
    answer:
      'Yes. Your bank normally deducts the tax when an eligible foreign payment reaches your account in Pakistan.',
  },
] as const satisfies readonly FreelancerFaqItem[];
