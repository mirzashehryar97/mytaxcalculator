import type {
  BusinessClassificationCard,
  BusinessFaqItem,
  BusinessIncomeMode,
  BusinessOption,
  BusinessRateGuideRow,
  BusinessSourceLink,
  BusinessTaxpayerType,
} from '@/features/business-tax/types';

export const BUSINESS_PAGE_COPY = {
  eyebrow: 'Tax Year 2026-27 · Business & AOP slab rates',
  title: 'Pakistan Business Tax Calculator 2026-27',
  subtitle:
    'Estimate the yearly income tax on business, self-employed or professional income — for sole proprietors, partnerships (AOPs), and professional firms.',
  badges: [
    'Tax on yearly profit',
    'Yearly return estimate',
    'Counts tax already paid',
    'Sole traders, partnerships & firms',
  ],
  formTitle: 'Your details',
  resultTitle: 'Your estimated yearly tax',
  assessedNote:
    'This is your normal yearly tax. Tax already deducted from you during the year is adjusted when you file your yearly return.',
  bottomDisclaimer:
    'This calculator gives an estimate, not tax or legal advice. Confirm your final tax with a qualified Pakistan tax professional.',
} as const;

export const BUSINESS_SOCIAL_IMAGE_COPY = {
  eyebrow: 'FY 2026-27 · Business & AOP rates',
  title: 'Pakistan Business Tax Calculator',
  subtitle: 'Sole traders · Partnerships · Professional firms',
  features: 'Free · Yearly profit input · Tax, surcharge & effective rate',
  brand: 'My Tax Calculator',
} as const;

/** Plain-language explanations shown behind info icons for terms we must keep. */
export const BUSINESS_TERMS = {
  taxableIncome: {
    label: 'What is taxable income?',
    text: 'Your yearly profit — total income minus your allowed business expenses and deductions. Tax is charged on this, not on your total sales.',
  },
  allowedExpenses: {
    label: 'What are allowed business expenses?',
    text: 'The everyday costs of running your business — such as rent, salaries, utilities, cost of goods sold, and depreciation. Only genuine business costs count; personal spending does not. Subtracting them from your income leaves the profit that is taxed.',
  },
  soleTrader: {
    label: 'What is a sole trader?',
    text: 'One person running an unincorporated business in their own name. Taxed on business profit using the individual slab rates.',
  },
  aop: {
    label: 'What is an AOP?',
    text: 'Association of Persons: two or more people in business together, such as a partnership. The group is taxed as one, using the same rates as a sole trader.',
  },
  professionalAop: {
    label: 'What is a professional-firm AOP?',
    text: 'A partnership of professionals (for example a law or accountancy firm) that the law does not allow to become a company. Its top tax rate is capped at 40%.',
  },
  surcharge: {
    label: 'What is the surcharge?',
    text: 'An extra 10% added on top of your tax (not your income) when your yearly taxable income is more than Rs. 10 million. It does not apply below that.',
  },
  effectiveRate: {
    label: 'What is the effective tax rate?',
    text: 'Your total tax shown as a share of your taxable income. It is lower than your top slab rate because the first slabs are taxed less.',
  },
  advanceTax: {
    label: 'What is advance tax / withholding?',
    text: 'Tax already collected from you during the year — for example on utility bills, imports, or contracts. It counts towards this bill, so you only pay the difference.',
  },
  taxBand: {
    label: 'What is a tax band?',
    text: 'Income is taxed in steps. Your band is the rate charged on your next rupee of income; earlier rupees are taxed at the lower steps below it.',
  },
} as const;

export const BUSINESS_TAXPAYER_OPTIONS = [
  { value: 'individual', label: 'Sole trader', tooltip: BUSINESS_TERMS.soleTrader.text },
  { value: 'aop', label: 'Partnership (AOP)', tooltip: BUSINESS_TERMS.aop.text },
  {
    value: 'professional-aop',
    label: 'Professional firm',
    tooltip: BUSINESS_TERMS.professionalAop.text,
  },
] as const satisfies readonly BusinessOption<BusinessTaxpayerType>[];

export const BUSINESS_INCOME_MODE_OPTIONS = [
  { value: 'net', label: 'Enter Profit' },
  { value: 'revenue-expenses', label: 'Enter Income and Expenses' },
] as const satisfies readonly BusinessOption<BusinessIncomeMode>[];

export const BUSINESS_FORM_COPY = {
  fiscalYearLabel: 'Tax year',
  taxpayerLabel: 'Who is being taxed',
  taxpayerHelp:
    'Sole traders and partnerships use the same rates. Professional firms are capped at 40%.',
  incomeModeLabel: 'How would you like to enter your income?',
  netIncomeLabel: 'Yearly taxable income (profit)',
  netIncomePlaceholder: '3000000',
  netIncomeHelp: 'Your yearly income after allowed business expenses.',
  revenueLabel: 'Total yearly income',
  revenuePlaceholder: '5000000',
  expensesLabel: 'Allowed business expenses',
  expensesPlaceholder: '2000000',
  advanceTaxLabel: 'Tax already paid this year',
  advanceTaxOptional: 'optional',
  advanceTaxPlaceholder: '0',
  advanceTaxHelp: 'Advance tax or withholding already deducted from you during the year.',
  usageNote: 'Use this calculator when your salary is less than 75% of your taxable income.',
  invalidMessage: 'Enter a taxable income above zero to see your tax.',
} as const;

export const BUSINESS_RESULT_COPY = {
  annualBreakdownTitle: 'Annual Breakdown',
  taxableIncome: 'Taxable income',
  baseTax: 'Tax on the slabs',
  surcharge: 'Surcharge',
  totalTax: 'Total tax before credits',
  effectiveRate: 'Effective tax rate',
  advanceTax: 'Tax already paid',
  remainingTax: 'Tax still to pay',
  incomeAfterTax: 'Income after tax',
  marginalTitle: 'Your current tax band',
  marginalBandLabel: 'Band',
  taxFreeBand: 'No tax — your income is within the tax-free limit.',
  yearComparisonTitle: 'Same income across tax years',
  yearComparisonHelp: 'How this taxable income would be taxed under each year we cover.',
} as const;

export const BUSINESS_CLASSIFICATION_CARDS: readonly BusinessClassificationCard[] = [
  {
    id: 'net-income',
    title: 'How your taxable income is worked out',
    intro: 'Business tax is charged on your profit, not on your total sales.',
    points: [
      'Taxable income = total income − allowed business expenses − other allowed deductions.',
      'The business slab rates are then applied to that profit figure.',
    ],
  },
  {
    id: 'classification',
    title: 'Business income or salary?',
    intro: 'Use this calculator when most of your income comes from business, not a job.',
    points: [
      'Business: your salary is less than 75% of your total taxable income.',
      'Salaried: your salary is 75% or more of your total taxable income.',
    ],
    linkLabel: 'Use the salary calculator',
    linkHref: '/',
  },
];

export const BUSINESS_SECTION_COPY = {
  faqEyebrow: 'Got questions?',
  faqTitle: 'Business & AOP tax FAQs for Pakistan',
  faqDescription:
    'Simple answers about income tax on business, professional, and partnership income.',
} as const;

export const BUSINESS_GUIDE_COPY = {
  rateTitle: 'Business & AOP tax rates in Pakistan for 2026-27',
  rateDescription:
    'Sole traders, partnerships (AOPs), and professionals are taxed in steps on their yearly profit. Each step only applies to the income inside it, so your first Rs. 600,000 is always tax-free.',
  bandColumn: 'Yearly taxable income',
  rateColumn: 'Rate on this step',
  noteColumn: 'What you pay',
  surchargeNote:
    'An extra 10% is added on top of the tax when taxable income is above Rs. 10 million.',
  professionalNote: 'Professional firms that cannot become a company are capped at a 40% top rate.',
  calculationTitle: 'How business tax is worked out',
  calculationDescription:
    'Tax is charged step by step. You pay a fixed amount for the steps you have fully passed, plus the rate for your current step on the income inside it.',
  formulaLabel: 'Formula',
  formulaResult: 'Tax',
  formulaTerms: [
    { id: 'fixed', text: 'fixed amount for lower steps' },
    { id: 'current', text: 'rate × income inside your current step' },
  ],
  exampleTitle: 'Worked example (2026-27)',
  exampleIntro: 'A profit of Rs. 3,000,000 falls in the Rs. 1.6m – 3.2m step.',
  exampleRows: [
    { id: 'fixed', label: 'Fixed amount for lower steps', value: 'Rs. 170,000' },
    { id: 'step', label: '30% of income above Rs. 1.6m (Rs. 1,400,000)', value: 'Rs. 420,000' },
  ],
  exampleTotalLabel: 'Total tax',
  exampleTotalValue: 'Rs. 590,000',
  exampleEffectiveLabel: 'Effective rate',
  exampleEffectiveValue: '≈ 19.67%',
  sourcesTitle: 'Sources used',
  sourcesDescription:
    'Rates were checked against the official Finance Act 2026 and the PwC Pakistan individual & AOP tax summary.',
  reviewedLabel: 'Last reviewed 25 July 2026',
  reviewedDateTime: '2026-07-25',
} as const;

export const BUSINESS_RATE_GUIDE_ROWS = [
  { id: 'band-0', band: 'Up to Rs. 600,000', rate: '0%', note: 'No tax' },
  {
    id: 'band-1',
    band: 'Rs. 600,001 – 1,200,000',
    rate: '15%',
    note: 'on income above Rs. 600,000',
  },
  {
    id: 'band-2',
    band: 'Rs. 1,200,001 – 1,600,000',
    rate: '20%',
    note: 'plus Rs. 90,000 fixed',
  },
  {
    id: 'band-3',
    band: 'Rs. 1,600,001 – 3,200,000',
    rate: '30%',
    note: 'plus Rs. 170,000 fixed',
  },
  {
    id: 'band-4',
    band: 'Rs. 3,200,001 – 5,600,000',
    rate: '40%',
    note: 'plus Rs. 650,000 fixed',
  },
  {
    id: 'band-5',
    band: 'Above Rs. 5,600,000',
    rate: '45%',
    note: 'plus Rs. 1,610,000 fixed',
  },
] as const satisfies readonly BusinessRateGuideRow[];

export const BUSINESS_SOURCE_LINKS = [
  {
    href: 'https://download1.fbr.gov.pk/Docs/20266291261044366FinanceAct2026.pdf',
    label: 'Finance Act 2026 (FBR)',
  },
  {
    href: 'https://taxsummaries.pwc.com/pakistan/individual/taxes-on-personal-income',
    label: 'PwC — Pakistan individual & AOP tax rates',
  },
] as const satisfies readonly BusinessSourceLink[];

export const BUSINESS_FAQS = [
  {
    id: 'when-to-use',
    question: 'When should I use this business calculator?',
    answer:
      'Use it when most of your income is from business, a profession, or a partnership (AOP) rather than a job — that is, when your salary is less than 75% of your total taxable income. If salary is 75% or more, use the salary calculator instead, which uses the lower salaried rates.',
  },
  {
    id: 'aop-meaning',
    question: 'What is an AOP, and how is it taxed?',
    answer:
      'An AOP (Association of Persons) is two or more people in business together, such as a partnership. It is taxed as a single unit on its profit using the same slab rates as a sole trader. Members are generally not taxed again on their share of that profit.',
  },
  {
    id: 'professional-firm',
    question: 'Why is a professional firm different?',
    answer:
      'A professional-firm AOP is a partnership of professionals (for example a law or accountancy firm) that the law does not allow to become a company. Its top tax rate is capped at 40% instead of 45%.',
  },
  {
    id: 'advance-tax',
    question: 'What if I already paid advance tax or withholding during the year?',
    answer:
      'Tax already collected from you during the year — on utilities, imports, contracts, and so on — counts towards your yearly bill. Enter it in the "tax already paid" box and the calculator shows the balance you still owe after that credit.',
  },
  {
    id: 'surcharge',
    question: 'When does the 10% surcharge apply?',
    answer:
      'Since 2024-25, an extra surcharge of 10% of your tax applies when your yearly taxable income is above Rs. 10 million. It is charged on the tax, not the income, and did not exist in earlier years.',
  },
  {
    id: 'expenses',
    question: 'Which expenses can I deduct?',
    answer:
      'Business tax is charged on profit, so you deduct the costs of running your business — such as rent, salaries, utilities, cost of goods, and depreciation — from your total income. This calculator lets you enter your profit directly, or enter income and expenses and it works out the profit for you.',
  },
  {
    id: 'sole-proprietor',
    question: 'Is this a sole proprietor or self-employed tax calculator?',
    answer:
      'Yes. If you are self-employed — a sole proprietor (sole trader) running an unincorporated business in your own name — this is the right calculator. It applies the non-salaried individual slab rates to your yearly business profit, the same rates an AOP uses.',
  },
  {
    id: 'tax-years',
    question: 'Which tax years does the business calculator cover?',
    answer:
      'It covers tax years 2021-22 through 2026-27, using the non-salaried slab rates for each year. Pick any year to see how the same profit would be taxed, including the 10% surcharge that has applied above Rs. 10 million since 2024-25.',
  },
  {
    id: 'change-type',
    question: 'Can I change my taxpayer type or tax year later?',
    answer:
      'Yes. Switch the taxpayer type or the tax year at any time and the estimate updates instantly. Nothing you enter is saved or sent anywhere — every calculation runs in your browser.',
  },
] as const satisfies readonly BusinessFaqItem[];
