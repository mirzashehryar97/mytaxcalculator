import type { OfficialSource } from '@/components/calculator/OfficialSourcesGrid';
import type { SocialCardCopy } from '@/components/ui/SocialCard';

import { FBR_DOC_URLS, FBR_LOGO, IRIS_LOGO, NATIONAL_ASSEMBLY_LOGO } from '@/lib/officialSources';

import { CORPORATE_TERMS } from '@/features/corporate-tax/lib/content';
import type {
  CompanyType,
  CorporateFaqItem,
  CorporateOption,
  CorporateRateRow,
} from '@/features/corporate-tax/types';

export const COMPANY_TAX_PAGE_COPY = {
  eyebrow: 'Tax Year 2026-27 · Company income tax rates',
  title: 'Pakistan Corporate Tax Calculator 2026-27',
  subtitle:
    'Work out the income tax a registered company owes on its yearly profit — normal companies, small companies and banks, for tax years 2022-23 to 2026-27.',
  badges: [
    'Tax on yearly profit',
    'Normal, small & banking rates',
    'Counts tax already paid',
    'Five tax years',
  ],
  formTitle: 'Company details',
  resultTitle: 'Estimated company tax',
  assessedNote:
    'This is the normal tax on your profit. Check it against the minimum tax on sales, then add super tax if your income is high enough.',
  bottomDisclaimer:
    'This calculator gives an estimate, not tax or legal advice. Confirm your final tax with a qualified Pakistan tax professional.',
} as const;

export const COMPANY_TAX_SOCIAL_IMAGE_COPY = {
  eyebrow: 'FY 2026-27 · Company income tax',
  title: 'Pakistan Corporate Tax Calculator',
  subtitle: 'Normal 29% · Small 20% · Banks 42%',
  features: 'Free · Tax on yearly profit · Tax years 2022-23 to 2026-27',
  brand: 'My Tax Calculator',
} as const satisfies SocialCardCopy;

export const COMPANY_TYPE_OPTIONS = [
  { value: 'standard', label: 'Normal company', tooltip: CORPORATE_TERMS.standardCompany.text },
  { value: 'small', label: 'Small company', tooltip: CORPORATE_TERMS.smallCompany.text },
  { value: 'banking', label: 'Bank', tooltip: CORPORATE_TERMS.bankingCompany.text },
] as const satisfies readonly CorporateOption<CompanyType>[];

export const COMPANY_TAX_FORM_COPY = {
  fiscalYearLabel: 'Tax year',
  companyTypeLabel: 'What kind of company is it?',
  companyTypeHelp: 'Small companies pay a lower rate; banks pay a higher one.',
  taxableProfitLabel: 'Yearly taxable profit',
  taxableProfitPlaceholder: '50000000',
  taxableProfitHelp: 'Your income for the year after allowed business costs.',
  taxAlreadyPaidLabel: 'Tax already paid this year',
  taxAlreadyPaidOptional: 'optional',
  taxAlreadyPaidPlaceholder: '0',
  taxAlreadyPaidHelp: 'Advance tax instalments, or tax withheld from you during the year.',
  usageNote:
    'Use this for a registered company. Sole traders and partnerships are taxed in steps instead — use the business calculator.',
  invalidMessage: 'Enter a yearly profit above zero to see the tax.',
} as const;

export const COMPANY_TAX_RESULT_COPY = {
  breakdownTitle: 'Yearly breakdown',
  taxableProfit: 'Taxable profit',
  rate: 'Company tax rate',
  tax: 'Tax on the profit',
  taxAlreadyPaid: 'Tax already paid',
  remainingTax: 'Tax still to pay',
  profitAfterTax: 'Profit after tax',
  rateNoteTitle: 'Your rate for this year',
  yearComparisonTitle: 'Same profit across tax years',
  yearComparisonHelp: 'How this profit would be taxed in each year the calculator covers.',
} as const;

export const COMPANY_TAX_SECTION_COPY = {
  faqEyebrow: 'Got questions?',
  faqTitle: 'Company tax questions for Pakistan',
  faqDescription: 'Simple answers about the income tax a company pays on its yearly profit.',
  rateTitle: 'Company tax rates in Pakistan for 2026-27',
  rateDescription:
    'A company pays one flat rate on its taxable profit — there are no steps or bands. Which rate you use depends on the kind of company.',
  rateNote:
    'The bank rate has been coming down on a set path: 44% in 2024-25, 43% in 2025-26 and 42% from 2026-27 onwards.',
} as const;

export const COMPANY_TAX_RATE_ROWS = [
  {
    id: 'standard',
    subject: 'Normal company',
    rate: '29%',
    note: 'Public and private companies that are not banks and are not small companies.',
  },
  {
    id: 'small',
    subject: 'Small company',
    rate: '20%',
    note: 'Capital and reserves up to Rs. 50 million, up to 250 staff and yearly sales up to Rs. 250 million.',
  },
  {
    id: 'banking',
    subject: 'Bank',
    rate: '42%',
    note: 'Down from 43% in 2025-26 and 44% in 2024-25. It stays at 42% from 2026-27 onwards.',
  },
] as const satisfies readonly CorporateRateRow[];

export const COMPANY_TAX_OFFICIAL_SOURCES = [
  {
    id: 'income-tax-ordinance-2026',
    title: 'Income Tax Ordinance 2001',
    description:
      'Division II of the First Schedule holds the rate for every kind of company, with notes showing when each rate changed.',
    href: FBR_DOC_URLS.incomeTaxOrdinance2026,
    logo: FBR_LOGO,
  },
  {
    id: 'finance-act-2026',
    title: 'Finance Act 2026',
    description: 'The enacted budget law for 2026-27. It leaves the company tax rates unchanged.',
    href: FBR_DOC_URLS.financeAct2026,
    logo: FBR_LOGO,
  },
  {
    id: 'income-tax-amendment-act-2025',
    title: 'Income Tax (Amendment) Act 2025',
    description:
      'Act XIII of 2025, gazetted 11 June 2025. It rewrote the bank rate as 44% for 2024-25, 43% for 2025-26 and 42% from 2026-27 onwards.',
    href: 'https://www.na.gov.pk/uploads/documents/684fdf39d1571_301.pdf',
    logo: NATIONAL_ASSEMBLY_LOGO,
  },
  {
    id: 'finance-act-2022',
    title: 'Finance Act 2022',
    description:
      'Set the bank rate at 39%, which is the rate this calculator uses for 2022-23 and 2023-24. It also left 29% and 20% where they still stand.',
    href: FBR_DOC_URLS.financeAct2022,
    logo: FBR_LOGO,
  },
  {
    id: 'iris',
    title: 'FBR IRIS Portal',
    description: "File the company's yearly income tax return.",
    href: FBR_DOC_URLS.iris,
    logo: IRIS_LOGO,
  },
] as const satisfies readonly OfficialSource[];

export const COMPANY_TAX_FAQS = [
  {
    id: 'rate-2026-27',
    question: 'What is the company tax rate in Pakistan for 2026-27?',
    answer:
      'A normal company pays 29% of its taxable profit. A small company pays 20%. A bank pays 42% for 2026-27, down from 43% in 2025-26 and 44% in 2024-25. The Finance Act 2026 did not change any of these.',
  },
  {
    id: 'small-company',
    question: 'Does my company count as a small company?',
    answer:
      'It counts if it was registered on or after 1 July 2005, has paid-up capital plus undistributed reserves of no more than Rs. 50 million, employs no more than 250 people at any point in the year, has yearly sales of no more than Rs. 250 million, was not formed by splitting up an existing company, and is not registered as a small and medium enterprise. Miss any one of these and the 29% rate applies.',
  },
  {
    id: 'flat-rate',
    question: 'Is company tax charged in steps like salary tax?',
    answer:
      'No. A company pays one flat rate on the whole of its taxable profit. The step-by-step bands you see for salary or for a sole trader do not apply to companies.',
  },
  {
    id: 'minimum-tax',
    question: 'What if the tax on my profit is very low or my company made a loss?',
    answer:
      'A separate rule sets a floor. The minimum tax is worked out from your yearly sales instead of your profit, and you pay whichever of the two figures is higher — never both. The minimum tax calculator works that out for you.',
  },
  {
    id: 'super-tax',
    question: 'Is super tax included in this figure?',
    answer:
      'No. Super tax is a separate charge on very high income and is added on top of the tax shown here. Use the super tax calculator to see whether your company owes it.',
  },
  {
    id: 'aop',
    question: 'Can partnerships and sole traders use this calculator?',
    answer:
      'No. Sole traders and partnerships are taxed in steps on their profit, not at a single company rate. Use the business and AOP calculator instead.',
  },
  {
    id: 'tax-already-paid',
    question: 'How does tax already paid during the year fit in?',
    answer:
      'Advance tax instalments and tax withheld from your company during the year count towards the yearly bill. Enter the total in the optional box and the calculator shows the balance left to pay after that credit.',
  },
  {
    id: 'tax-years',
    question: 'Which tax years does this cover?',
    answer:
      'Tax years 2022-23 through 2026-27. The 29% and 20% rates have not moved across those years; only the bank rate changes, so switching the year mainly matters for banks.',
  },
] as const satisfies readonly CorporateFaqItem[];
