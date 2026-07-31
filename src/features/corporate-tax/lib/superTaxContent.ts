import type { OfficialSource } from '@/components/calculator/OfficialSourcesGrid';
import type { SocialCardCopy } from '@/components/ui/SocialCard';

import { FBR_DOC_URLS, FBR_LOGO, IRIS_LOGO } from '@/lib/officialSources';

import { CORPORATE_TERMS } from '@/features/corporate-tax/lib/content';
import type {
  CorporateFaqItem,
  CorporateOption,
  CorporateRateRow,
  SuperTaxpayerType,
} from '@/features/corporate-tax/types';

export const SUPER_TAX_PAGE_COPY = {
  eyebrow: 'Tax Year 2026-27 · Section 4C super tax',
  title: 'Super Tax Calculator Pakistan 2026-27',
  subtitle:
    'Work out the extra tax charged on very high income under Section 4C. From 2026-27 most businesses pay nothing below Rs. 500 million and 8% above it.',
  badges: [
    'Extra tax on high income',
    'Charged on the whole income',
    'Banks, oil and fertilizer rules',
    'Tax years 2022-23 to 2026-27',
  ],
  formTitle: 'Income details',
  resultTitle: 'Estimated super tax',
  assessedNote:
    'Super tax is charged on top of your normal income tax. It does not replace the tax on your profit or the minimum tax on sales.',
  bottomDisclaimer:
    'This calculator gives an estimate, not tax or legal advice. Confirm your final tax with a qualified Pakistan tax professional.',
} as const;

export const SUPER_TAX_SOCIAL_IMAGE_COPY = {
  eyebrow: 'FY 2026-27 · Section 4C',
  title: 'Pakistan Super Tax Calculator',
  subtitle: '0% up to Rs. 500M · 8% above · 10% for banks',
  features: 'Free · Extra tax on high income · Tax years 2022-23 to 2026-27',
  brand: 'My Tax Calculator',
} as const satisfies SocialCardCopy;

export const SUPER_TAXPAYER_OPTIONS = [
  {
    value: 'other',
    label: 'Most businesses and people',
    tooltip:
      'Anyone the law does not name separately — ordinary companies, sole traders, partnerships and individuals.',
  },
  {
    value: 'banking',
    label: 'Bank',
    tooltip:
      'A banking company. Banks are left out of the 2026-27 relief and still pay 10% once income passes Rs. 150 million.',
  },
  {
    value: 'petroleum',
    label: 'Oil & gas exploration',
    tooltip: CORPORATE_TERMS.petroleumCompany.text,
  },
  {
    value: 'fertilizer',
    label: 'Fertilizer seller',
    tooltip:
      'A business earning income from selling any kind of fertilizer. Left out of the 2026-27 relief, so 10% applies above Rs. 150 million.',
  },
] as const satisfies readonly CorporateOption<SuperTaxpayerType>[];

export const SUPER_TAX_FORM_COPY = {
  fiscalYearLabel: 'Tax year',
  taxpayerLabel: 'What kind of business is it?',
  incomeLabel: 'Income counted for super tax',
  incomePlaceholder: '600000000',
  incomeHelp: 'The Section 4C income figure for the year, not your monthly or after-tax income.',
  exportExemptLabel: 'Exports are more than 80% of yearly sales',
  exportExemptDescription:
    'From 2026-27, super tax does not apply at all when the export money you actually received is more than 80% of your total sales.',
  usageNote:
    'Super tax starts at very high income. If your income for the year is well under Rs. 150 million, you will not owe any.',
  invalidMessage: 'Enter an income above zero to see the super tax.',
} as const;

export const SUPER_TAX_RESULT_COPY = {
  breakdownTitle: 'Yearly breakdown',
  income: 'Income counted for super tax',
  rate: 'Super tax rate',
  superTax: 'Super tax',
  incomeAfterSuperTax: 'Income after super tax',
  verdictTitle: 'Where your income lands',
  belowThreshold: 'No super tax. This income is below the point where Section 4C starts.',
  exportExempt:
    'No super tax. With exports above 80% of yearly sales, Section 4C does not apply for 2026-27.',
  cliffWarning:
    'The rate is charged on the whole income, not just the amount above the threshold. Going a little over a threshold raises the tax on everything.',
  yearComparisonTitle: 'Same income across tax years',
  yearComparisonHelp: 'How this income would be charged in each year the calculator covers.',
} as const;

export const SUPER_TAX_SECTION_COPY = {
  faqEyebrow: 'Got questions?',
  faqTitle: 'Super tax questions for Pakistan',
  faqDescription: 'Simple answers about the extra Section 4C tax on very high income.',
  rateTitle: 'Super tax rates in Pakistan for 2026-27',
  rateDescription:
    'The rate is charged on the whole income once it passes the threshold, not just on the amount above it.',
  rateNote:
    'For 2026-27 the six middle bands were removed for most businesses, and the top rate came down from 10% to 8%. Banks, oil and gas explorers and fertilizer sellers kept the old 10% from Rs. 150 million.',
} as const;

export const SUPER_TAX_RATE_ROWS = [
  {
    id: 'other',
    subject: 'Most businesses and people — above Rs. 500 million',
    rate: '8%',
    note: 'Nothing is charged at or below Rs. 500 million.',
  },
  {
    id: 'banking',
    subject: 'Banks — above Rs. 150 million',
    rate: '10%',
    note: 'Banks were left out of the 2026-27 relief.',
  },
  {
    id: 'petroleum',
    subject: 'Oil & gas exploration — above Rs. 150 million',
    rate: '10%',
    note: 'Applies to income worked out under the oil and gas exploration rules.',
  },
  {
    id: 'fertilizer',
    subject: 'Fertilizer sellers — above Rs. 150 million',
    rate: '10%',
    note: 'Income from selling any kind of fertilizer.',
  },
] as const satisfies readonly CorporateRateRow[];

export const SUPER_TAX_OFFICIAL_SOURCES = [
  {
    id: 'income-tax-ordinance-2026',
    title: 'Income Tax Ordinance 2001',
    description:
      'Section 4C and the Division IIB table, with footnotes holding the older rates used for 2022-23 through 2025-26.',
    href: FBR_DOC_URLS.incomeTaxOrdinance2026,
    logo: FBR_LOGO,
  },
  {
    id: 'finance-act-2026',
    title: 'Finance Act 2026',
    description:
      'Replaced the Section 4C table for 2026-27 and added the exemption for exporters above 80% of sales.',
    href: FBR_DOC_URLS.financeAct2026,
    logo: FBR_LOGO,
  },
  {
    id: 'finance-act-2025',
    title: 'Finance Act 2025',
    description:
      'Took 0.5 points off each super tax band between Rs. 200 million and Rs. 500 million for 2025-26.',
    href: FBR_DOC_URLS.financeAct2025,
    logo: FBR_LOGO,
  },
  {
    id: 'finance-act-2023',
    title: 'Finance Act 2023',
    description:
      'Set the eight-band super tax table, which its own column heads "for tax year 2023 and onwards" — so it covers 2022-23 through 2024-25 here.',
    href: FBR_DOC_URLS.financeAct2023,
    logo: FBR_LOGO,
  },
  {
    id: 'iris',
    title: 'FBR IRIS Portal',
    description: 'File the yearly return where super tax is declared and paid.',
    href: FBR_DOC_URLS.iris,
    logo: IRIS_LOGO,
  },
] as const satisfies readonly OfficialSource[];

export const SUPER_TAX_FAQS = [
  {
    id: 'what-is-it',
    question: 'What is super tax in Pakistan?',
    answer:
      'Super tax is an extra income tax under Section 4C charged on people and businesses with very high income for the year. It sits on top of the normal income tax rather than replacing it.',
  },
  {
    id: 'rate-2026-27',
    question: 'What is the super tax rate for 2026-27?',
    answer:
      'For most businesses and people, nothing is charged at or below Rs. 500 million of Section 4C income, and 8% of the whole income is charged above that. Banks, oil and gas exploration businesses and fertilizer sellers pay 10% of the whole income once it passes Rs. 150 million.',
  },
  {
    id: 'whole-income',
    question: 'Is the rate charged only on the amount above the threshold?',
    answer:
      'No. The law charges the rate on the whole income, not just the part above the threshold. So a company just over Rs. 500 million pays 8% of everything, which is why crossing a threshold matters so much more here than with ordinary step-by-step tax rates.',
  },
  {
    id: 'what-changed',
    question: 'What changed for 2026-27?',
    answer:
      'The six middle bands between Rs. 150 million and Rs. 500 million were removed for most persons, and the top rate came down from 10% to 8%. In 2025-26 the same income would have been charged somewhere between 1% and 10%. Banks, oil and gas explorers and fertilizer sellers were left out of the change.',
  },
  {
    id: 'exports',
    question: 'Do exporters have to pay super tax?',
    answer:
      'From 2026-27, Section 4C does not apply at all where the export money you actually received for the year is more than 80% of your total sales. This exemption is new — it did not exist in earlier years.',
  },
  {
    id: 'individuals',
    question: 'Does super tax apply to individuals, not just companies?',
    answer:
      'Yes. Section 4C applies to any person, so an individual or a partnership with Section 4C income above the threshold is caught in the same way a company is.',
  },
  {
    id: 'income-meaning',
    question: 'Which income figure should I enter?',
    answer:
      'Use the income worked out the way Section 4C describes, which brings together dividends, capital gains, brokerage and commission, and all your other taxable income for the year. It is often not the same as the profit figure in your accounts, so use the Section 4C number your accountant prepares.',
  },
  {
    id: 'with-company-tax',
    question: 'Do I pay super tax as well as company tax?',
    answer:
      'Yes. Super tax is genuinely extra. Work out the tax on your profit first, compare that with the minimum tax on your sales and take the higher one, then add super tax on top if your income passes the threshold.',
  },
  {
    id: 'tax-years',
    question: 'Which tax years does this cover?',
    answer:
      'Tax years 2022-23 through 2026-27. The older years use the banded table, which ran from 1% above Rs. 150 million up to 10% above Rs. 500 million, with rates between Rs. 200 million and Rs. 500 million cut by 0.5 points in 2025-26.',
  },
] as const satisfies readonly CorporateFaqItem[];
