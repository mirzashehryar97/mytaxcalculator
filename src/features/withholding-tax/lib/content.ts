import type { OfficialSource } from '@/components/calculator/OfficialSourcesGrid';
import type { SocialCardCopy } from '@/components/ui/SocialCard';

import { FBR_DOC_URLS, FBR_LOGO, IRIS_LOGO } from '@/lib/officialSources';

import type {
  ElectricityConnection,
  TelecomPayment,
  TelecomService,
  WithholdingFaqItem,
  WithholdingMode,
  WithholdingOption,
} from '@/features/withholding-tax/types';

/** Plain-language explanations shown behind the info icons. */
export const WITHHOLDING_TERMS = {
  filerStatus: {
    label: 'What is a filer?',
    text: 'Someone whose name is on the FBR’s Active Taxpayer List, which it publishes for everyone who filed their income tax return on time. Become a filer and this deduction stops.',
  },
  countsTowardsTax: {
    label: 'Do I get this money back?',
    text: 'It counts as income tax you have already paid. Put it on your yearly return and it comes off your final bill, or comes back as a refund if you owe less. Never file, and it is simply gone.',
  },
  dailyTotal: {
    label: 'What counts towards the day’s total?',
    text: 'All the cash you take out on the same day is added together — counter, ATM and card, across your accounts at that bank. It is not judged one withdrawal at a time.',
  },
  wholeAmount: {
    label: 'Why is the whole amount taxed?',
    text: 'Rs. 50,000 is the point where the deduction starts, not a slice that stays free. Once the day’s cash passes it, the rate applies to the full amount you took out.',
  },
  cashInHand: {
    label: 'What is this figure?',
    text: 'The cash you actually walk away with. The bank hands over your withdrawal minus the tax it has to send to the FBR.',
  },
  grossBill: {
    label: 'Which figure from my bill?',
    text: 'The total your electricity company charges before income tax — that is what the rate is worked out on. If your bill already shows an "income tax" line, leave that line out.',
  },
  meterType: {
    label: 'How do I know my meter type?',
    text: 'It is printed on your bill as the tariff or connection type. A home is domestic, a shop or office is commercial, and a factory is industrial.',
  },
  homeMeterRule: {
    label: 'Who pays on a home meter?',
    text: 'Only non-filers, and only when the monthly bill reaches Rs. 25,000. A filer’s home meter pays nothing at all.',
  },
  sameForEveryone: {
    label: 'Why is there no filer discount?',
    text: 'The law keeps shop, office and factory meters out of the higher non-filer rates, so the same table applies to filers and non-filers alike.',
  },
  topUp: {
    label: 'What is a top-up?',
    text: 'Money loaded onto a prepaid number — a scratch card, an easyload or a top-up in an app. The tax comes out of what you load, so you get less balance than you paid.',
  },
  phoneBill: {
    label: 'What is a monthly bill?',
    text: 'A postpaid mobile, internet or landline bill that arrives at the end of the month. The tax is added on top of it rather than taken out of it.',
  },
  landlineRule: {
    label: 'How is a landline different?',
    text: 'Only the part of a landline bill above Rs. 1,000 is taxed, and at 10% instead of 15%. A landline bill of Rs. 1,000 or less has no income tax on it.',
  },
  effectiveRate: {
    label: 'What is the real rate?',
    text: 'The tax as a share of the amount you paid. On a landline it is lower than the headline rate, because only part of the bill is taxed.',
  },
  namedForNotFiling: {
    label: 'Who does the higher rate hit?',
    text: 'The FBR can publish an order naming people who were required to file a return and did not. Numbers belonging to those people are charged 75% instead of 15%.',
  },
} as const;

interface WithholdingPageCopy {
  eyebrow: string;
  title: string;
  subtitle: string;
  badges: readonly string[];
  formTitle: string;
  resultTitle: string;
  bottomDisclaimer: string;
}

export const WITHHOLDING_PAGE_COPY: Record<WithholdingMode, WithholdingPageCopy> = {
  'cash-withdrawal': {
    eyebrow: 'Tax Year 2026-27 · Tax on taking cash out of a bank',
    title: 'Cash Withdrawal Tax Calculator Pakistan 2026-27',
    subtitle:
      'See what your bank keeps back when you take cash out, why it only happens to non-filers, and what becoming a filer would save you.',
    badges: ['Only hits non-filers', 'Rs. 50,000 daily trigger', 'Counts towards your tax'],
    formTitle: 'Your cash withdrawal',
    resultTitle: 'What the bank keeps back',
    bottomDisclaimer:
      'This calculator gives an estimate, not tax or legal advice. Your bank works out the final figure from your own status and the day’s withdrawals. Check anything you rely on with a qualified Pakistan tax professional.',
  },
  electricity: {
    eyebrow: 'Tax Year 2026-27 · Income tax inside your electricity bill',
    title: 'Electricity Bill Tax Calculator Pakistan 2026-27',
    subtitle:
      'Work out the income tax added to a monthly electricity bill — for a home, a shop or office, and a factory — and see what it costs to stay a non-filer.',
    badges: [
      'Home, shop and factory meters',
      'Rs. 25,000 home threshold',
      'Counts towards your tax',
    ],
    formTitle: 'Your electricity bill',
    resultTitle: 'Income tax on this bill',
    bottomDisclaimer:
      'This calculator gives an estimate, not tax or legal advice. Your bill also carries sales tax, duties and other charges that are not income tax and are not shown here. Check anything you rely on with a qualified Pakistan tax professional.',
  },
  'phone-internet': {
    eyebrow: 'Tax Year 2026-27 · Tax inside a load or a phone bill',
    title: 'Mobile & Internet Tax Calculator Pakistan 2026-27',
    subtitle:
      'See how much income tax comes out of a mobile load, and how much is added to an internet, postpaid or landline bill — plus what actually lands in your balance.',
    badges: ['Loads and monthly bills', 'Mobile, internet and landline', 'Counts towards your tax'],
    formTitle: 'Your phone or internet payment',
    resultTitle: 'Income tax on this amount',
    bottomDisclaimer:
      'This calculator shows income tax only. A load also carries provincial sales tax and your operator’s own service charges, so the balance you see on your phone will be lower again. This is an estimate, not tax or legal advice.',
  },
};

export const WITHHOLDING_SOCIAL_IMAGE_COPY: Record<WithholdingMode, SocialCardCopy> = {
  'cash-withdrawal': {
    eyebrow: 'FY 2026-27 · Tax on bank cash withdrawals',
    title: 'Cash Withdrawal Tax Calculator',
    subtitle: 'Section 231AB · 0.8% for non-filers',
    features: 'Free · Rs. 50,000 daily trigger · Filer pays nothing',
    brand: 'My Tax Calculator',
  },
  electricity: {
    eyebrow: 'FY 2026-27 · Income tax on electricity bills',
    title: 'Electricity Bill Tax Calculator',
    subtitle: 'Section 235 · Home, shop and factory meters',
    features: 'Free · 7.5% above Rs. 25,000 for non-filers · Business bands',
    brand: 'My Tax Calculator',
  },
  'phone-internet': {
    eyebrow: 'FY 2026-27 · Tax on mobile loads and bills',
    title: 'Mobile & Internet Tax Calculator',
    subtitle: 'Section 236 · 15% on loads, internet and mobile',
    features: 'Free · Prepaid loads and monthly bills · Landline rules',
    brand: 'My Tax Calculator',
  },
};

export const WITHHOLDING_FORM_COPY = {
  fiscalYearLabel: 'Tax year',
  privacyNote: 'Nothing you type here leaves your browser.',
  invalidAmountMessage: 'Enter an amount above zero to see the tax.',
} as const;

export const CASH_WITHDRAWAL_FORM_COPY = {
  amountLabel: 'Cash taken out today',
  amountHelp: 'Everything you took out in cash today, added together.',
  amountPlaceholder: '200000',
  statusLabel: 'Are you a filer?',
  statusHelp: 'Nothing is deducted from a filer, however much they take out.',
} as const;

export const ELECTRICITY_FORM_COPY = {
  billLabel: 'Monthly bill before income tax',
  billHelp: 'The total your electricity company charges, not counting the income tax line.',
  billPlaceholder: '35000',
  connectionLabel: 'Type of meter',
  connectionHelp: 'Printed on your bill as the tariff or connection type.',
  statusLabel: 'Are you a filer?',
  statusHelpDomestic: 'A filer’s home meter is charged nothing.',
  statusHelpBusiness: 'A shop, office or factory meter pays the same either way.',
} as const;

export const TELECOM_FORM_COPY = {
  amountLabelTopUp: 'Amount you are loading',
  amountLabelBill: 'Bill amount before income tax',
  amountHelpTopUp: 'What you hand over for the card or easyload.',
  amountHelpBill: 'Your monthly charges before the income tax line.',
  amountPlaceholder: '1000',
  serviceLabel: 'What are you paying for?',
  paymentLabel: 'How are you paying?',
  paymentHelp:
    'On a load the tax comes out of your balance; on a bill it is added to what you owe.',
} as const;

export const ELECTRICITY_CONNECTION_OPTIONS: readonly WithholdingOption<ElectricityConnection>[] = [
  { value: 'domestic', label: 'Home', tooltip: 'A house or flat on a domestic tariff.' },
  { value: 'commercial', label: 'Shop or office', tooltip: 'A commercial connection.' },
  { value: 'industrial', label: 'Factory', tooltip: 'An industrial connection.' },
];

export const TELECOM_SERVICE_OPTIONS: readonly WithholdingOption<TelecomService>[] = [
  {
    value: 'mobile-internet',
    label: 'Mobile or internet',
    tooltip: 'Mobile numbers, home internet and prepaid cards.',
  },
  {
    value: 'landline',
    label: 'Landline',
    tooltip: 'A fixed telephone line, taxed only above Rs. 1,000.',
  },
];

export const TELECOM_PAYMENT_OPTIONS: readonly WithholdingOption<TelecomPayment>[] = [
  { value: 'top-up', label: 'Prepaid load', tooltip: 'A card, easyload or in-app top-up.' },
  {
    value: 'bill',
    label: 'Monthly bill',
    tooltip: 'A postpaid bill you pay at the end of the month.',
  },
];

export const CASH_WITHDRAWAL_RESULT_COPY = {
  appliedRateLabel: 'Rate applied to you',
  cashLabel: 'Cash you asked for',
  taxLabel: 'Deducted by the bank',
  inHandLabel: 'Cash in your hand',
  noTaxTitle: 'Nothing is deducted',
  filerBody: 'You are a filer, so a bank takes nothing off a cash withdrawal.',
  belowThresholdBody:
    'The day’s cash has to pass Rs. 50,000 before a bank deducts anything, however you take it out.',
  joinListTitle: 'As a filer, this drops to Rs. 0',
  joinListBody: 'File your return on time and the deduction stops on every withdrawal.',
  savingLabel: 'What being a filer would save you today',
  workingTitle: 'How this was worked out',
  adjustableBadge: 'Counts towards your income tax',
} as const;

export const ELECTRICITY_RESULT_COPY = {
  billLabel: 'Your bill',
  appliedRateLabel: 'Rate applied',
  taxLabel: 'Income tax on the bill',
  totalLabel: 'Total you pay',
  effectiveRateLabel: 'Tax as a share of the bill',
  noTaxTitle: 'No income tax on this bill',
  filerHomeBody:
    'Home meters are only charged when the owner is a non-filer. You are a filer, so nothing is added.',
  belowThresholdBody:
    'A home meter is only charged from Rs. 25,000 a month upwards. This bill is under that.',
  smallBillBody: 'Bills of Rs. 500 or less carry no income tax.',
  joinListTitle: 'As a filer, this drops to Rs. 0',
  joinListBody: 'A filer’s home meter is not charged at all.',
  savingLabel: 'What being a filer would save you this month',
  sameForEveryoneTitle: 'The same for filers and non-filers',
  sameForEveryoneBody:
    'Shop, office and factory meters are left out of the higher non-filer rates, so this figure does not change with your status.',
  workingTitle: 'How this was worked out',
  adjustableBadge: 'Counts towards your income tax',
} as const;

export const TELECOM_RESULT_COPY = {
  amountLabel: 'Amount you pay',
  appliedRateLabel: 'Rate applied',
  taxLabel: 'Income tax',
  receivedLabel: 'Balance you actually get',
  totalLabel: 'Total you pay',
  effectiveRateLabel: 'Tax as a share of the amount',
  taxableLabel: 'Part of the bill that is taxed',
  noTaxTitle: 'No income tax on this bill',
  landlineFreeBody: 'A landline bill of Rs. 1,000 or less carries no income tax.',
  sameForEveryoneTitle: 'The same for filers and non-filers',
  sameForEveryoneBody:
    'Phone and internet are left out of the higher non-filer rates, so everyone pays this rate.',
  namedRateTitle: 'One exception: 75%',
  workingTitle: 'How this was worked out',
  adjustableBadge: 'Counts towards your income tax',
} as const;

export const WITHHOLDING_RATE_GUIDE_COPY: Record<
  WithholdingMode,
  { title: string; description: string; situationHeading: string; chargeHeading: string }
> = {
  'cash-withdrawal': {
    title: 'The rates, year by year',
    description: 'What a bank deducts on cash withdrawals, and how that has changed.',
    situationHeading: 'Tax year',
    chargeHeading: 'Deducted from a non-filer',
  },
  electricity: {
    title: 'The full table for this year',
    description: 'What is added to an electricity bill, meter type by meter type.',
    situationHeading: 'Monthly bill',
    chargeHeading: 'Income tax added',
  },
  'phone-internet': {
    title: 'The full table for this year',
    description: 'What is charged on each kind of phone and internet payment.',
    situationHeading: 'What you are paying for',
    chargeHeading: 'Income tax',
  },
};

export const WITHHOLDING_ADJUSTABLE_COPY = {
  title: 'This money is not lost — but it is not automatic either',
  body: 'These deductions count as income tax you have already paid for the year. You claim them back by putting them on your yearly return, along with the certificates your bank, electricity company or operator can give you. Someone who never files never claims them, and the money simply stays with the FBR.',
  ctaLabel: 'Read how to file your return',
  ctaHref: '/tax-guides/filing-tax-return',
} as const;

export const WITHHOLDING_CATEGORY_COPY = {
  title: 'Three everyday taxes, three calculators',
  description:
    'Most people pay all three without noticing. Each one has its own rules, so each has its own calculator.',
} as const;

export const WITHHOLDING_SECTION_COPY: Record<
  WithholdingMode,
  { faqEyebrow: string; faqTitle: string; faqDescription: string }
> = {
  'cash-withdrawal': {
    faqEyebrow: 'Cash withdrawal tax questions',
    faqTitle: 'Questions about the tax on taking out cash',
    faqDescription: 'Who pays it, when it starts, and how to stop it — answered in plain language.',
  },
  electricity: {
    faqEyebrow: 'Electricity bill tax questions',
    faqTitle: 'Questions about income tax on electricity bills',
    faqDescription: 'Which meters are charged, from what bill size, and how to claim it back.',
  },
  'phone-internet': {
    faqEyebrow: 'Mobile and internet tax questions',
    faqTitle: 'Questions about the tax on loads and phone bills',
    faqDescription:
      'Why Rs. 100 of load gives you less than Rs. 100, and what you can do about it.',
  },
};

export const WITHHOLDING_FAQS: Record<WithholdingMode, readonly WithholdingFaqItem[]> = {
  'cash-withdrawal': [
    {
      id: 'who-pays',
      question: 'Who pays tax on cash withdrawals in Pakistan?',
      answer:
        'Only non-filers — people whose name is not on the FBR’s Active Taxpayer List. If you are a filer, your bank deducts nothing under Section 231AB, no matter how much cash you take out.',
    },
    {
      id: 'rate',
      question: 'How much is the cash withdrawal tax in 2026-27?',
      answer:
        'It is 0.8% for non-filers, and it starts once the cash you take out in a single day passes Rs. 50,000. The rate was 0.6% until 30 June 2025, when the Finance Act 2025 raised it to 0.8%.',
    },
    {
      id: 'threshold',
      question: 'Is the Rs. 50,000 free of tax?',
      answer:
        'No. Rs. 50,000 is the point where the deduction starts, not an amount that stays free. Once the day’s cash passes it, the 0.8% applies to the whole amount you withdrew — FBR’s own circular puts the rate on "the amount of cash withdrawn".',
    },
    {
      id: 'daily-total',
      question: 'Does it apply to each withdrawal or to the whole day?',
      answer:
        'To the whole day. The law says the Rs. 50,000 is the total of your cash withdrawals in a single day, so three withdrawals of Rs. 20,000 count the same as one of Rs. 60,000.',
    },
    {
      id: 'atm',
      question: 'Does it apply to ATM and card withdrawals?',
      answer:
        'Yes. It is the cash leaving your account that matters, not the counter you use, so ATM withdrawals and cash taken out on a card count towards the same daily total.',
    },
    {
      id: 'refund',
      question: 'Can I get this money back?',
      answer:
        'It is adjustable, which means it counts towards your income tax for the year and is claimed on your annual return. But you have to file to claim it — a person who never files never gets it back.',
    },
    {
      id: 'avoid',
      question: 'How do I stop this deduction?',
      answer:
        'File your income tax return so your name appears on the Active Taxpayer List. From then on you count as a filer and the deduction stops on every withdrawal, which for regular cash users is usually worth far more than the cost of filing.',
    },
  ],
  electricity: [
    {
      id: 'domestic',
      question: 'Is there income tax on a home electricity bill?',
      answer:
        'Only if you are a non-filer and the monthly bill is Rs. 25,000 or more. In that case 7.5% of the bill is added as advance income tax. For a filer, a home meter pays nothing.',
    },
    {
      id: 'commercial',
      question: 'How much tax is on a commercial electricity bill?',
      answer:
        'Nothing up to Rs. 500. From Rs. 501 to Rs. 20,000 it is 10% of the bill. Above Rs. 20,000 it is Rs. 1,950 plus 12% of the part above Rs. 20,000 for a commercial connection.',
    },
    {
      id: 'industrial',
      question: 'Is a factory charged the same as a shop?',
      answer:
        'Only up to Rs. 20,000. Above that a factory pays Rs. 1,950 plus 5% of the part above Rs. 20,000, against 12% for a shop or office on the same bill.',
    },
    {
      id: 'filer-business',
      question: 'Does being a filer reduce the tax on a business bill?',
      answer:
        'No. Shop, office and factory meters are left out of the higher non-filer rates, so the same table applies to filers and non-filers alike. It is only home meters where your status changes the answer.',
    },
    {
      id: 'base',
      question: 'Which figure is the tax worked out on?',
      answer:
        'The gross bill your electricity company charges, including the sales tax and other charges on it. Enter the total before the income tax line to get the right answer.',
    },
    {
      id: 'refund',
      question: 'Can I claim electricity tax back?',
      answer:
        'Yes, it is adjustable advance tax. Keep your bills, put the amounts on your yearly return, and they come off your final income tax bill or come back as a refund.',
    },
  ],
  'phone-internet': [
    {
      id: 'rate',
      question: 'How much tax is on a mobile load in Pakistan?',
      answer:
        'Advance income tax is 15% of the amount, so Rs. 15 of every Rs. 100 you load goes to the FBR under Section 236. Provincial sales tax and your operator’s service charges come out on top of that.',
    },
    {
      id: 'internet',
      question: 'Is internet charged the same as mobile?',
      answer:
        'Yes. Internet, mobile phone and prepaid cards all carry 15% of the bill or sale price. Only a landline is treated differently.',
    },
    {
      id: 'landline',
      question: 'How is a landline bill taxed?',
      answer:
        'At 10%, and only on the part of the monthly bill above Rs. 1,000. So a Rs. 1,000 landline bill has no income tax on it, and a Rs. 3,000 bill is taxed on Rs. 2,000.',
    },
    {
      id: 'filer',
      question: 'Do filers pay less on phone and internet?',
      answer:
        'No. Section 236 is left out of the higher non-filer rates, so everyone pays the same 15%. The one exception is people the FBR has publicly named for not filing, who are charged 75%.',
    },
    {
      id: 'why-less-balance',
      question: 'Why do I get less balance than I load?',
      answer:
        'The 15% income tax comes out of the amount you load rather than being added to it. Provincial sales tax and any operator charges come out as well, which is why Rs. 100 of load leaves you with noticeably less talk time.',
    },
    {
      id: 'refund',
      question: 'Can I claim mobile tax back?',
      answer:
        'Yes, it is adjustable. Your operator can give you a tax certificate for the year, and the amount goes on your return and comes off your final income tax bill. Only people who file can claim it.',
    },
  ],
};

export const WITHHOLDING_GUIDE_COPY = {
  reviewedLabel: 'Rates last reviewed 30 July 2026',
  reviewedDateTime: '2026-07-30',
} as const;

const RATE_CARD_2026: OfficialSource = {
  id: 'wht-rate-card-2026',
  title: 'FBR Withholding Tax Rate Card',
  description:
    'The FBR rate card updated to 30 June 2025. It carries the rates used for 2025-26 and 2026-27.',
  href: FBR_DOC_URLS.whtRateCard,
  logo: FBR_LOGO,
};

const RATE_CARD_2024: OfficialSource = {
  id: 'wht-rate-card-2024',
  title: 'FBR Withholding Tax Rate Card 2025',
  description: 'The FBR rate card updated to 30 June 2024, behind the 2024-25 figures.',
  href: FBR_DOC_URLS.whtRateCardTy2025,
  logo: FBR_LOGO,
};

const FINANCE_ACT_2026: OfficialSource = {
  id: 'finance-act-2026',
  title: 'Finance Act 2026',
  description:
    'The budget law for 2026-27. It leaves these rates alone, so last year’s figures carry over.',
  href: FBR_DOC_URLS.financeAct2026,
  logo: FBR_LOGO,
};

const INCOME_TAX_ORDINANCE: OfficialSource = {
  id: 'income-tax-ordinance',
  title: 'Income Tax Ordinance 2001',
  description: 'The Ordinance itself, including the sections that create these deductions.',
  href: FBR_DOC_URLS.incomeTaxOrdinance,
  logo: FBR_LOGO,
};

const IRIS_SOURCE: OfficialSource = {
  id: 'iris',
  title: 'FBR IRIS Portal',
  description: 'File your return, claim these deductions back, and stay a filer.',
  href: FBR_DOC_URLS.iris,
  logo: IRIS_LOGO,
};

export const CASH_WITHDRAWAL_OFFICIAL_SOURCES = [
  RATE_CARD_2026,
  {
    id: 'circular-2025',
    title: 'FBR Circular No. 1 of 2025-26',
    description:
      'FBR explains the increase: the rate on cash withdrawal became 0.8% of the amount withdrawn.',
    href: FBR_DOC_URLS.incomeTaxCircular2025,
    logo: FBR_LOGO,
  },
  {
    id: 'finance-act-2025',
    title: 'Finance Act 2025',
    description: 'The law that raised the cash withdrawal rate from 0.6% to 0.8% on 1 July 2025.',
    href: FBR_DOC_URLS.financeAct2025,
    logo: FBR_LOGO,
  },
  {
    id: 'finance-act-2023',
    title: 'Finance Act 2023',
    description:
      'Created Section 231AB at 0.6%, with the Rs. 50,000 daily total spelled out in the section.',
    href: FBR_DOC_URLS.financeAct2023,
    logo: FBR_LOGO,
  },
  RATE_CARD_2024,
  FINANCE_ACT_2026,
  IRIS_SOURCE,
] as const satisfies readonly OfficialSource[];

export const ELECTRICITY_OFFICIAL_SOURCES = [
  RATE_CARD_2026,
  RATE_CARD_2024,
  INCOME_TAX_ORDINANCE,
  FINANCE_ACT_2026,
  IRIS_SOURCE,
] as const satisfies readonly OfficialSource[];

export const PHONE_INTERNET_OFFICIAL_SOURCES = [
  RATE_CARD_2026,
  RATE_CARD_2024,
  {
    id: 'finance-act-2024',
    title: 'Finance Act 2024',
    description:
      'Added the 75% rate for people named in an FBR order for not filing a return, from 2024-25.',
    href: FBR_DOC_URLS.financeAct2024,
    logo: FBR_LOGO,
  },
  INCOME_TAX_ORDINANCE,
  FINANCE_ACT_2026,
  IRIS_SOURCE,
] as const satisfies readonly OfficialSource[];

export const WITHHOLDING_OFFICIAL_SOURCES: Record<WithholdingMode, readonly OfficialSource[]> = {
  'cash-withdrawal': CASH_WITHDRAWAL_OFFICIAL_SOURCES,
  electricity: ELECTRICITY_OFFICIAL_SOURCES,
  'phone-internet': PHONE_INTERNET_OFFICIAL_SOURCES,
};
