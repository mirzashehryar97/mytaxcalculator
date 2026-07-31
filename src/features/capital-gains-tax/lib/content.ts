import type { OfficialSource } from '@/components/calculator/OfficialSourcesGrid';
import type { SocialCardCopy } from '@/components/ui/SocialCard';

import { FBR_DOC_URLS, FBR_LOGO, IRIS_LOGO } from '@/lib/officialSources';

import type {
  CapitalGainsFaqItem,
  CapitalGainsMode,
  CapitalGainsOption,
  FundClass,
  InvestorType,
} from '@/features/capital-gains-tax/types';

interface CapitalGainsPageCopy {
  eyebrow: string;
  title: string;
  subtitle: string;
  badges: readonly string[];
  formTitle: string;
  resultTitle: string;
  bottomDisclaimer: string;
}

export const CAPITAL_GAINS_PAGE_COPY: Record<CapitalGainsMode, CapitalGainsPageCopy> = {
  'listed-securities': {
    eyebrow: 'Shares on the Pakistan Stock Exchange',
    title: 'Capital Gains Tax Calculator Pakistan 2026-27',
    subtitle:
      'Work out the tax on the profit when you sell shares. The rate depends on when you bought them, not on how much you made.',
    badges: ['Tax year 2026-27 rates', 'Buying date sets the rate', 'Tax on profit only'],
    formTitle: 'Your share sale',
    resultTitle: 'Tax on this sale',
    bottomDisclaimer:
      'This is an estimate for your own planning. NCCPL works out the official figure from its own trade records and issues you a certificate each year — use that when you file. This page is not tax advice.',
  },
  'mutual-funds': {
    eyebrow: 'Mutual fund units',
    title: 'Mutual Fund Tax Calculator Pakistan 2026-27',
    subtitle:
      'Work out the tax when you cash in mutual fund units. Your fund company takes it off before paying you.',
    badges: ['Tax year 2026-27 rates', 'Stock and other funds', 'Tax on profit only'],
    formTitle: 'Your redemption',
    resultTitle: 'Tax on this redemption',
    bottomDisclaimer:
      'This is an estimate for your own planning. Your fund company works out the official figure and shows it on your redemption statement. This page is not tax advice.',
  },
};

export const CAPITAL_GAINS_SOCIAL_IMAGE_COPY: Record<CapitalGainsMode, SocialCardCopy> = {
  'listed-securities': {
    eyebrow: 'FY 2026-27 · Tax on selling shares',
    title: 'Capital Gains Tax Calculator',
    subtitle: 'Pakistan Stock Exchange · 15% on recent buys',
    features: 'Free · Buying date sets the rate · Filer and non-filer',
    brand: 'My Tax Calculator',
  },
  'mutual-funds': {
    eyebrow: 'FY 2026-27 · Tax on cashing in fund units',
    title: 'Mutual Fund Tax Calculator',
    subtitle: 'Stock funds 15% · Other funds 15% or 25%',
    features: 'Free · Stock and other funds · Filer and non-filer',
    brand: 'My Tax Calculator',
  },
};

/* ------------------------------------------------------------------ */
/* Terms explained behind info icons                                  */
/* ------------------------------------------------------------------ */

/**
 * Every phrase a reader might not know gets an info icon rather than a
 * parenthesis. Written the way you would explain it to someone who has never
 * filed a return.
 */
export const CAPITAL_GAINS_TERMS = {
  capitalGain: {
    label: 'What is a capital gain?',
    text: 'The profit on a sale — what you sold for, less what you paid. Only the profit is taxed, never the full sale amount.',
  },
  purchaseCost: {
    label: 'What counts as the cost?',
    text: 'The total you paid to buy, before any brokerage or fees. If you bought in several lots, add them up.',
  },
  saleProceeds: {
    label: 'What counts as the sale amount?',
    text: 'The total you received when you sold, before brokerage or fees are taken off.',
  },
  buyingDate: {
    label: 'Why does the buying date matter?',
    text: 'The law sets your rate by when you bought, not when you sold. Shares bought years ago can be taxed at a lower rate — or not at all.',
  },
  sellingDate: {
    label: 'Why does the selling date matter?',
    text: 'Profit is taxed in the tax year you sold in. Pakistan’s tax year runs 1 July to 30 June, so the sale date decides which year’s rules apply.',
  },
  holdingPeriod: {
    label: 'What is a holding period?',
    text: 'How long you owned the investment — from the day you bought it to the day you sold it.',
  },
  filerStatus: {
    label: 'What does filer mean?',
    text: 'A filer is on the FBR’s Active Taxpayer List because they filed their last return on time. A non-filer usually pays double.',
  },
  nccpl: {
    label: 'Who is NCCPL?',
    text: 'The company that settles trades on the stock exchange. It works out this tax for you, collects it, and gives you a certificate each year to file with your return.',
  },
  stockFund: {
    label: 'What is a stock fund?',
    text: 'A fund that keeps more than 70% of its money in shares. Any fund that holds less than that counts as an other fund.',
  },
  fundCompany: {
    label: 'Who takes this off?',
    text: 'Your fund company works the tax out and deducts it from your redemption before the money reaches you.',
  },
  investorType: {
    label: 'Individual or company?',
    text: 'Pick company only if the investment is held in a registered company’s name. Anything held by you personally, or by a partnership, is an individual.',
  },
  separateBlock: {
    label: 'Is this added to my salary?',
    text: 'No. This profit is taxed on its own at its own rate, and is not added to your salary or business income.',
  },
  netGain: {
    label: 'What is the net profit?',
    text: 'What you actually keep from this sale once the tax has come off.',
  },
} as const;

/* ------------------------------------------------------------------ */
/* Form copy                                                          */
/* ------------------------------------------------------------------ */

export const CAPITAL_GAINS_FORM_COPY = {
  taxYearNoticeLabel: 'Tax year for this sale',
  taxYearNoticeHelp: 'You do not pick this — the selling date decides it.',
  privacyNote: 'Nothing you type leaves your browser.',
  statusLabel: 'Are you a filer?',
  statusHelp: 'A non-filer usually pays double on the same profit.',
  investorTypeLabel: 'Who holds the investment?',
  invalidProceedsMessage: 'Enter what you sold for to see the tax.',
  invalidDatesMessage: 'The selling date cannot be before the buying date.',
} as const;

export const LISTED_SECURITIES_FORM_COPY = {
  purchaseCostLabel: 'What you paid for the shares',
  purchaseCostHelp: 'The total cost of the shares you sold.',
  saleProceedsLabel: 'What you sold them for',
  saleProceedsHelp: 'The total amount the sale brought in.',
  acquisitionDateLabel: 'Date you bought',
  acquisitionDateHelp: 'This sets your rate.',
  disposalDateLabel: 'Date you sold',
  disposalDateHelp: 'This sets the tax year.',
  gainPreviewLabel: 'Your profit',
} as const;

export const MUTUAL_FUND_FORM_COPY = {
  purchaseCostLabel: 'What you paid for the units',
  purchaseCostHelp: 'The total you invested in the units you cashed in.',
  proceedsLabel: 'What you got back',
  proceedsHelp: 'The redemption amount before tax was deducted.',
  acquisitionDateLabel: 'Date you bought the units',
  acquisitionDateHelp: 'This sets your rate.',
  redemptionDateLabel: 'Date you cashed them in',
  redemptionDateHelp: 'This sets the tax year.',
  fundClassLabel: 'What kind of fund is it?',
  fundClassHelp: 'Your fund company states this on your account statement.',
  gainPreviewLabel: 'Your profit',
} as const;

export const INVESTOR_TYPE_OPTIONS = [
  { value: 'individual', label: 'A person' },
  { value: 'company', label: 'A company' },
] as const satisfies readonly CapitalGainsOption<InvestorType>[];

export const FUND_CLASS_OPTIONS = [
  {
    value: 'stock',
    label: 'Stock fund',
    tooltip: 'Keeps more than 70% of its money in shares.',
  },
  {
    value: 'other',
    label: 'Other fund',
    tooltip: 'Any fund that keeps less than 70% of its money in shares.',
  },
] as const satisfies readonly CapitalGainsOption<FundClass>[];

/* ------------------------------------------------------------------ */
/* Result copy                                                        */
/* ------------------------------------------------------------------ */

export const CAPITAL_GAINS_RESULT_COPY = {
  appliedRateLabel: 'Rate on this sale',
  ruleLabel: 'Why this rate',
  gainLabel: 'Profit being taxed',
  taxLabel: 'Tax on it',
  netGainLabel: 'You keep',
  workingTitle: 'How this was worked out',
  savingLabel: 'Being a filer saves you',
  joinListTitle: 'Filing your return would halve this.',
  joinListBody:
    'The rate doubles for anyone who is not on the Active Taxpayer List. Filing your return on time puts you on it.',
  noTaxTitle: 'No tax on this one.',
  lossTitle: 'This was a loss, so there is no tax.',
  lossBody:
    'A loss on shares can only be set against profit on other shares — not against your salary or business income. It can be carried forward for up to three years.',
} as const;

export const LISTED_SECURITIES_RESULT_COPY = {
  costLabel: 'What you paid',
  proceedsLabel: 'What you sold for',
  holdingLabel: 'You held them for',
  collectorNote: 'NCCPL takes this off and gives you a certificate to file with your return.',
  estimateNote:
    'NCCPL works from its own trade records and allows a small standard amount for costs, so its figure can differ a little from this one.',
} as const;

export const MUTUAL_FUND_RESULT_COPY = {
  costLabel: 'What you paid',
  proceedsLabel: 'What you got back',
  holdingLabel: 'You held them for',
  collectorNote: 'Your fund company deducts this and passes it to NCCPL.',
  sixYearTitle: 'Held over six years, so nothing is charged.',
  sixYearBody:
    'Units bought on or before 30 June 2024 and held more than six years are not taxed. That relief does not apply to units bought later.',
} as const;

/* ------------------------------------------------------------------ */
/* Section headings                                                   */
/* ------------------------------------------------------------------ */

interface CapitalGainsSectionCopy {
  rateGuideTitle: string;
  rateGuideDescription: string;
  faqEyebrow: string;
  faqTitle: string;
  faqDescription: string;
}

export const CAPITAL_GAINS_SECTION_COPY: Record<CapitalGainsMode, CapitalGainsSectionCopy> = {
  'listed-securities': {
    rateGuideTitle: 'What you pay, by when you bought',
    rateGuideDescription:
      'Your rate is fixed by the day you bought the shares. This is the whole table.',
    faqEyebrow: 'Selling shares',
    faqTitle: 'Questions about tax on share profits',
    faqDescription: 'The things people ask most about capital gains tax on the stock exchange.',
  },
  'mutual-funds': {
    rateGuideTitle: 'What you pay, by fund type',
    rateGuideDescription: 'How long you held the units does not change these rates.',
    faqEyebrow: 'Mutual funds',
    faqTitle: 'Questions about tax on fund profits',
    faqDescription: 'The things people ask most about cashing in mutual fund units.',
  },
};

export const CAPITAL_GAINS_CATEGORY_COPY = {
  title: 'Other investment profits',
  description: 'The same tax works differently across the two markets. Pick the one you traded.',
} as const;

/* ------------------------------------------------------------------ */
/* FAQs                                                               */
/* ------------------------------------------------------------------ */

const LISTED_SECURITIES_FAQS: readonly CapitalGainsFaqItem[] = [
  {
    id: 'gain-not-proceeds',
    question: 'Is the tax on the whole sale amount?',
    answer:
      'No. It is only on your profit — what you sold for less what you paid. If you sold Rs. 3,000,000 of shares that cost you Rs. 2,000,000, the tax is worked out on Rs. 1,000,000.',
  },
  {
    id: 'added-to-salary',
    question: 'Does this get added to my salary income?',
    answer:
      'No. Investment profit is taxed on its own, at its own rate, and is not added to your salary or business income. It does not push your salary into a higher slab.',
  },
  {
    id: 'filer-difference',
    question: 'Does being a filer change what I pay?',
    answer:
      'Yes, on most purchases the rate doubles if you are not on the Active Taxpayer List. There was a window where recent buys were charged the same either way, but the Finance Act 2026 removed it from 1 July 2026.',
  },
  {
    id: 'loss',
    question: 'What if I made a loss?',
    answer:
      'There is no tax on a loss. A loss on investments can only be set against profit on other investments — not against salary or business income — and can be carried forward for up to three years.',
  },
];

export const CAPITAL_GAINS_FAQS: Record<CapitalGainsMode, readonly CapitalGainsFaqItem[]> = {
  'listed-securities': [
    ...LISTED_SECURITIES_FAQS,
    {
      id: 'which-rate',
      question: 'Which rate applies to my shares?',
      answer:
        'It depends only on when you bought them. Bought before 1 July 2013, nothing is charged. Between 1 July 2013 and 30 June 2022, a flat 12.5%. Between 1 July 2022 and 30 June 2024, the rate drops the longer you held them, from 15% down to nothing after six years. Bought on or after 1 July 2024, a flat 15%.',
    },
    {
      id: 'holding-period',
      question: 'Does holding shares longer reduce my tax?',
      answer:
        'Only for shares bought between 1 July 2022 and 30 June 2024. For anything bought on or after 1 July 2024 the rate is a flat 15% whether you held it a week or a decade.',
    },
    {
      id: 'who-collects',
      question: 'Do I have to pay this myself?',
      answer:
        'NCCPL works it out from its trade records, collects it through your broker, and issues you a certificate after the year ends. You file that certificate with your return, and it is treated as conclusive proof of the figure.',
    },
    {
      id: 'dividends',
      question: 'Is dividend income included here?',
      answer:
        'No. A dividend is a payment from the company’s profits and is taxed separately when it is paid. This page is only about the profit you make from selling the shares themselves.',
    },
  ],
  'mutual-funds': [
    {
      id: 'gain-not-proceeds',
      question: 'Do I pay tax on the full amount when I redeem my units?',
      answer:
        'No. The fund company works from your gain: the redemption value less what those units cost you. If units bought for Rs. 2,000,000 are redeemed for Rs. 3,000,000, the taxable gain is Rs. 1,000,000.',
    },
    {
      id: 'added-to-salary',
      question: 'Is a mutual fund redemption gain combined with my salary?',
      answer:
        'No. The gain from redeeming units is a separate block of income with its own rate. It is kept apart from salary and business income, so it does not move your salary into a higher slab.',
    },
    {
      id: 'filer-difference',
      question: 'Will my ATL status affect the tax on my redemption?',
      answer:
        'Yes. For most unit purchase dates, the fund company applies a doubled rate when the investor is not on the Active Taxpayer List. The temporary same-rate treatment for recent purchases ended on 1 July 2026.',
    },
    {
      id: 'loss',
      question: 'What happens if I redeem the units for less than I paid?',
      answer:
        'That redemption has no capital gains tax because it produced a loss. The loss may be set against gains on other investments, but not against salary or business income, and may be carried forward for up to three years.',
    },
    {
      id: 'fund-types',
      question: 'What is the difference between a stock fund and an other fund?',
      answer:
        'A stock fund keeps more than 70% of its money in shares. Any fund holding less than that is an other fund. Your fund company states which one you hold. A person pays 15% either way; a company pays 15% on a stock fund and 25% on an other fund.',
    },
    {
      id: 'six-year',
      question: 'Is there any relief for holding units a long time?',
      answer:
        'Only if you bought the units on or before 30 June 2024 and held them for more than six years — then nothing is charged. For units bought after that date, the rate is the same however long you hold them.',
    },
    {
      id: 'who-deducts',
      question: 'Who deducts this from my money?',
      answer:
        'Your fund company works it out and takes it off your redemption before paying you, then deposits it with NCCPL. The figure on your redemption statement is the official one.',
    },
    {
      id: 'distributions',
      question: 'What about the payouts my fund makes during the year?',
      answer:
        'Those are dividends or distributions, not a capital gain, and are taxed separately when the fund pays them. This page only covers the profit you make when you cash the units in.',
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Official sources                                                   */
/* ------------------------------------------------------------------ */

export const CAPITAL_GAINS_GUIDE_COPY = {
  reviewedLabel: 'Rates last reviewed 31 July 2026',
  reviewedDateTime: '2026-07-31',
} as const;

/**
 * Federal tax, so every card is an FBR document. NCCPL collects this tax but
 * does not set it and is not a government body, so it is described in the page
 * text rather than cited here as a source of rates.
 */
export const CAPITAL_GAINS_OFFICIAL_SOURCES = [
  {
    id: 'income-tax-ordinance-2026',
    title: 'Income Tax Ordinance 2001',
    description:
      'Section 37A and First Schedule Division VII — the rates on this page. Amended up to 30 June 2026.',
    href: FBR_DOC_URLS.incomeTaxOrdinance2026,
    logo: FBR_LOGO,
  },
  {
    id: 'finance-act-2024',
    title: 'Finance Act 2024',
    description:
      'Replaced Division VII, setting the 1 July 2024 cut-off and the flat 15% that follows it.',
    href: FBR_DOC_URLS.financeAct2024,
    logo: FBR_LOGO,
  },
  {
    id: 'finance-act-2025',
    title: 'Finance Act 2025',
    description: 'Raised the mutual fund rates to 15% and narrowed the six-year relief.',
    href: FBR_DOC_URLS.financeAct2025,
    logo: FBR_LOGO,
  },
  {
    id: 'finance-act-2026',
    title: 'Finance Act 2026',
    description:
      'The budget law for 2026-27. It left the rates alone but removed the non-filer exemption in Tenth Schedule rule 10(y).',
    href: FBR_DOC_URLS.financeAct2026,
    logo: FBR_LOGO,
  },
  {
    id: 'iris',
    title: 'FBR IRIS Portal',
    description: 'File your yearly return and stay on the Active Taxpayer List.',
    href: FBR_DOC_URLS.iris,
    logo: IRIS_LOGO,
  },
] as const satisfies readonly OfficialSource[];
