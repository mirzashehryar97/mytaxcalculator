import type { OfficialSource } from '@/components/calculator/OfficialSourcesGrid';
import type { SocialCardCopy } from '@/components/ui/SocialCard';

import { FBR_DOC_URLS, FBR_LOGO, IRIS_LOGO } from '@/lib/officialSources';

import type {
  CorporateFaqItem,
  CorporateOption,
  CorporateRateRow,
  MinimumTaxpayerType,
  MinimumTaxSector,
} from '@/features/corporate-tax/types';

export const MINIMUM_TAX_PAGE_COPY = {
  eyebrow: 'Tax Year 2026-27 · Section 113 minimum tax',
  title: 'Minimum Tax on Turnover Calculator Pakistan 2026-27',
  subtitle:
    'Check the tax floor set by Section 113. It is worked out from your yearly sales instead of your profit, and you pay whichever figure is higher.',
  badges: [
    'Tax floor on yearly sales',
    'Compares with your normal tax',
    'Lower rates by trade',
    'Shows what carries forward',
  ],
  formTitle: 'Business details',
  resultTitle: 'Minimum tax check',
  assessedNote:
    'Section 113 replaces your normal tax when it is higher — it is never added on top. Super tax, if any, is separate again.',
  bottomDisclaimer:
    'This calculator gives an estimate, not tax or legal advice. Confirm your final tax with a qualified Pakistan tax professional.',
} as const;

export const MINIMUM_TAX_SOCIAL_IMAGE_COPY = {
  eyebrow: 'FY 2026-27 · Section 113',
  title: 'Minimum Tax on Turnover Calculator',
  subtitle: '1.25% of yearly sales · Lower rates by trade',
  features: 'Free · Compares minimum and normal tax · Tax years 2022-23 to 2026-27',
  brand: 'My Tax Calculator',
} as const satisfies SocialCardCopy;

export const MINIMUM_TAXPAYER_OPTIONS = [
  {
    value: 'company',
    label: 'A company',
    tooltip:
      'Every resident company is covered by Section 113, and so is a Pakistan branch of a foreign company. There is no sales threshold to clear.',
  },
  {
    value: 'individual-aop',
    label: 'A sole trader or partnership',
    tooltip:
      'A sole trader or partnership only falls under Section 113 once yearly sales reach Rs. 100 million. Below that the rule does not apply at all.',
  },
] as const satisfies readonly CorporateOption<MinimumTaxpayerType>[];

/**
 * Division IX groups, named for what a business does rather than by entry
 * number. Each tooltip lists the persons the entry actually names, so nobody
 * has to open the First Schedule to know which group they are in.
 */
export const MINIMUM_TAX_SECTOR_OPTIONS = [
  {
    value: 'general',
    label: 'Most businesses',
    tooltip:
      'The default rate, used for every business the law does not name in a lower group — manufacturing, construction, services, trading and so on.',
  },
  {
    value: 'specified-goods-distributor',
    label: 'Distributor or wholesaler of listed goods',
    tooltip:
      'Distributors, dealers, sub-dealers and wholesalers of medicines, fertilizer, sugar, locally made mobile phones, packaged food, electronics, drinks and dairy, personal care, cleaning products and similar listed goods. You must be on both the income tax and the sales tax active taxpayer lists.',
  },
  {
    value: 'fuel-and-motorcycle',
    label: 'Fuel companies & motorcycle dealers',
    tooltip:
      'Oil refineries, oil marketing companies, and motorcycle dealers registered under the Sales Tax Act 1990.',
  },
  {
    value: 'gas-airline-poultry',
    label: 'Gas utilities, PIA & poultry',
    tooltip:
      'Sui Southern Gas and Sui Northern Gas where yearly sales pass Rs. 1 billion, Pakistan International Airlines, and the poultry industry including breeding, broiler, egg and feed production.',
  },
  {
    value: 'low-margin-trades',
    label: 'Rice mills, flour mills & similar',
    tooltip:
      'Petroleum agents and distributors registered for sales tax, rice mills and dealers, flour mills, large retailers of everyday goods linked live to the FBR system, online marketplaces, and sellers of used vehicles.',
  },
] as const satisfies readonly CorporateOption<MinimumTaxSector>[];

export const MINIMUM_TAX_FORM_COPY = {
  fiscalYearLabel: 'Tax year',
  taxpayerLabel: 'Who is being taxed?',
  turnoverLabel: 'Total yearly sales',
  turnoverPlaceholder: '500000000',
  turnoverHelp: 'Your gross sales and receipts for the year, before any costs.',
  sectorLabel: 'What does the business do?',
  normalTaxLabel: 'Normal tax on your profit',
  normalTaxOptional: 'optional',
  normalTaxPlaceholder: '0',
  normalTaxHelp: 'Leave this at zero if the business made a loss or owes no tax on profit.',
  usageNote:
    'Enter zero as the normal tax if the business made a loss — that is exactly when this rule bites.',
  invalidMessage: 'Enter yearly sales above zero to see the minimum tax.',
} as const;

export const MINIMUM_TAX_RESULT_COPY = {
  breakdownTitle: 'Yearly breakdown',
  turnover: 'Total yearly sales',
  rate: 'Minimum tax rate',
  minimumTax: 'Minimum tax on sales',
  normalTax: 'Normal tax on profit',
  taxPayable: 'Tax you actually pay',
  carryForward: 'Extra you can use in later years',
  verdictTitle: 'Which figure applies',
  minimumApplies: 'The minimum tax is higher, so it replaces the tax on your profit for this year.',
  normalApplies:
    'The tax on your profit is higher, so the minimum tax does not bite. You pay the normal tax.',
  notCovered:
    'Section 113 does not apply here. A sole trader or partnership is only caught once yearly sales reach Rs. 100 million.',
  carryForwardNote:
    'The extra you paid above your normal tax is not lost — it can be set against your tax bill in the next two years.',
} as const;

export const MINIMUM_TAX_SECTION_COPY = {
  faqEyebrow: 'Got questions?',
  faqTitle: 'Minimum tax on turnover questions',
  faqDescription: 'Simple answers about the tax floor that Section 113 sets on yearly sales.',
  rateTitle: 'Minimum tax rates on turnover for 2026-27',
  rateDescription:
    'The rate is a small percentage of your yearly sales. Most businesses use the top line; the law names a handful of trades that pay less.',
  rateNote:
    'The rate for distributors and wholesalers of listed goods went up from 0.25% to 0.5% for 2026-27. Every other rate here is unchanged since 2021-22.',
} as const;

export const MINIMUM_TAX_RATE_ROWS = [
  {
    id: 'general',
    subject: 'Most businesses',
    rate: '1.25%',
    note: 'The default, used for any business the law does not name below.',
  },
  {
    id: 'gas-airline-poultry',
    subject: 'Gas utilities, PIA and poultry',
    rate: '0.75%',
    note: 'Sui Southern and Sui Northern Gas above Rs. 1 billion of sales, PIA, and the poultry industry.',
  },
  {
    id: 'fuel-and-motorcycle',
    subject: 'Fuel companies and motorcycle dealers',
    rate: '0.5%',
    note: 'Oil refineries, oil marketing companies and registered motorcycle dealers.',
  },
  {
    id: 'specified-goods-distributor',
    subject: 'Distributors and wholesalers of listed goods',
    rate: '0.5%',
    note: 'Up from 0.25% for 2026-27. Only if the business is on both active taxpayer lists.',
  },
  {
    id: 'low-margin-trades',
    subject: 'Rice mills, flour mills and similar',
    rate: '0.25%',
    note: 'Also petroleum agents, linked-up large retailers, online marketplaces and used-vehicle sellers.',
  },
] as const satisfies readonly CorporateRateRow[];

export const MINIMUM_TAX_OFFICIAL_SOURCES = [
  {
    id: 'income-tax-ordinance-2026',
    title: 'Income Tax Ordinance 2001',
    description:
      'Section 113 sets the rule and the two-year carry forward; Division IX of the First Schedule holds the rates for every year here.',
    href: FBR_DOC_URLS.incomeTaxOrdinance2026,
    logo: FBR_LOGO,
  },
  {
    id: 'finance-act-2026',
    title: 'Finance Act 2026',
    description:
      'Raised the reduced rate for distributors and wholesalers of listed goods from 0.25% to 0.5% for 2026-27.',
    href: FBR_DOC_URLS.financeAct2026,
    logo: FBR_LOGO,
  },
  {
    id: 'finance-act-2021',
    title: 'Finance Act 2021',
    description:
      'Wrote the Division IX table used here, and set the 0.25% rate for distributors of listed goods that applied from 2022-23 to 2025-26.',
    href: FBR_DOC_URLS.financeAct2021,
    logo: FBR_LOGO,
  },
  {
    id: 'iris',
    title: 'FBR IRIS Portal',
    description: 'File the yearly return where the minimum tax is settled.',
    href: FBR_DOC_URLS.iris,
    logo: IRIS_LOGO,
  },
] as const satisfies readonly OfficialSource[];

export const MINIMUM_TAX_FAQS = [
  {
    id: 'what-is-it',
    question: 'What is the minimum tax on turnover?',
    answer:
      'It is a floor on your yearly income tax. Instead of taxing your profit, the law takes a small percentage of your yearly sales and compares it with the tax on your profit. You pay whichever is higher. It exists so a business with heavy losses, exemptions or reliefs still pays something.',
  },
  {
    id: 'rate',
    question: 'What is the minimum tax rate for 2026-27?',
    answer:
      'Most businesses pay 1.25% of yearly sales. Gas utilities above Rs. 1 billion of sales, PIA and the poultry industry pay 0.75%. Oil refineries, oil marketing companies and registered motorcycle dealers pay 0.5%. Rice mills, flour mills, petroleum agents, online marketplaces, used-vehicle sellers and linked-up large retailers pay 0.25%. Distributors and wholesalers of listed goods pay 0.5% for 2026-27, up from 0.25%.',
  },
  {
    id: 'who-pays',
    question: 'Who has to pay it?',
    answer:
      'Every resident company and every Pakistan branch of a foreign company, regardless of size. A sole trader or partnership is only caught once yearly sales reach Rs. 100 million.',
  },
  {
    id: 'both-taxes',
    question: 'Do I pay the minimum tax as well as the tax on my profit?',
    answer:
      'No. The minimum tax replaces the tax on your profit for that year when it is higher. You never pay both. Super tax is different — that one is genuinely added on top.',
  },
  {
    id: 'loss',
    question: 'Does my company still pay if it made a loss?',
    answer:
      'Yes. That is the point of the rule. A loss means no tax on profit, so the minimum tax on your sales becomes the bill. Enter zero as the normal tax to see what that comes to.',
  },
  {
    id: 'carry-forward',
    question: 'What happens to the extra I pay?',
    answer:
      'Where the minimum tax comes out higher, the difference is carried forward and can be set against your tax bill in the next two tax years. Older guidance mentioning five years is out of date.',
  },
  {
    id: 'turnover-meaning',
    question: 'What counts as turnover?',
    answer:
      'Gross sales and receipts from selling goods, leaving out sales tax, excise duty and any discount shown on the invoice; plus gross fees for services including commission; plus money received for completing contracts; plus a company share of these from a partnership it belongs to. Amounts already settled under a final tax are left out.',
  },
  {
    id: 'atl-condition',
    question: 'Why does the active taxpayer list matter for distributors?',
    answer:
      'The lower 0.5% rate for distributors and wholesalers of listed goods is conditional. The business has to appear on the active taxpayer list under both the Sales Tax Act 1990 and the Income Tax Ordinance 2001. Fall off either list and the ordinary 1.25% applies.',
  },
  {
    id: 'tax-years',
    question: 'Which tax years does this cover?',
    answer:
      'Tax years 2022-23 through 2026-27. Every rate has been steady across those years except the distributor rate, which rose from 0.25% to 0.5% for 2026-27.',
  },
] as const satisfies readonly CorporateFaqItem[];
