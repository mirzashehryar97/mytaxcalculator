/** Plain-language explanations shown behind info icons across the three pages. */
export const CORPORATE_TERMS = {
  taxableProfit: {
    label: 'What is taxable profit?',
    text: 'What is left after you take allowed business costs off your income for the year. Tax is charged on this, not on your total sales.',
  },
  standardCompany: {
    label: 'What counts as a normal company?',
    text: 'Any company registered in Pakistan that is not a bank and does not meet the small-company conditions. Public and private companies both sit here.',
  },
  smallCompany: {
    label: 'What is a small company?',
    text: 'A company registered on or after 1 July 2005 with capital and reserves up to Rs. 50 million, no more than 250 staff, yearly sales up to Rs. 250 million, not formed by splitting an older company, and not registered as a small or medium enterprise.',
  },
  bankingCompany: {
    label: 'What is a banking company?',
    text: 'A bank operating in Pakistan. Banks pay a higher rate than other companies, and that rate has been stepping down each year: 44% in 2024-25, 43% in 2025-26 and 42% from 2026-27.',
  },
  turnover: {
    label: 'What counts as yearly sales?',
    text: 'Your gross sales and receipts for the year before costs — money from selling goods (less sales tax, excise duty and any discount shown on the invoice), fees for services including commission, and money received for completing contracts.',
  },
  minimumTax: {
    label: 'What is the minimum tax?',
    text: 'A floor on your tax bill worked out from your sales instead of your profit. It exists so a business with heavy losses or reliefs still pays something. You pay the higher of the two figures, never both.',
  },
  normalTax: {
    label: 'What is the normal tax?',
    text: 'The income tax you would owe on your profit for the year under the ordinary rules — for a company, the flat company rate on taxable profit.',
  },
  carryForward: {
    label: 'What does carry forward mean?',
    text: 'When the minimum tax is higher than your normal tax, the extra is not lost. You can set it against your tax bill in the next two years.',
  },
  activeTaxpayerList: {
    label: 'What is the active taxpayer list?',
    text: 'The list the FBR publishes of people and businesses that filed their return on time. The lower rate for distributors only applies if the business is on both the income tax and the sales tax list.',
  },
  superTax: {
    label: 'What is super tax?',
    text: 'An extra tax charged on top of normal income tax when income for the year is very high. It is set by Section 4C and is separate from the company tax on profit.',
  },
  superTaxIncome: {
    label: 'Which income is counted?',
    text: 'Income measured the way Section 4C describes it, which brings together dividends, capital gains, brokerage and commission, and all your other taxable income for the year. It is not always the same figure as your taxable profit, so use the figure your accountant works out for Section 4C.',
  },
  wholeIncomeRule: {
    label: 'Why is the rate charged on all of the income?',
    text: 'Super tax is written as a percentage of the whole income, not of the amount above the threshold. Going one rupee over a threshold therefore raises the tax on the entire amount.',
  },
  petroleumCompany: {
    label: 'Which petroleum businesses are named?',
    text: 'Businesses whose income is worked out under Part I of the Fifth Schedule — the rules for exploring and producing oil and gas.',
  },
  exportExemption: {
    label: 'How does the export exemption work?',
    text: 'From 2026-27, super tax does not apply at all if the export money you actually received for the year is more than 80% of your total sales.',
  },
  taxAlreadyPaid: {
    label: 'What is tax already paid?',
    text: 'Tax collected from you during the year — for example advance tax instalments, or tax withheld on imports, contracts and utility bills. It counts towards this bill, so you only pay the difference.',
  },
} as const;

export const CORPORATE_GUIDE_COPY = {
  reviewedLabel: 'Last reviewed 30 July 2026',
  reviewedDateTime: '2026-07-30',
  subjectColumn: 'Who it applies to',
  rateColumn: 'Rate',
  noteColumn: 'What this means',
} as const;

export const CORPORATE_COMBINATION_COPY = {
  title: 'How the three company taxes fit together',
  description:
    'A company can face all three in the same year, but they do not simply add up. Work through them in this order.',
  steps: [
    {
      id: 'normal',
      order: '1',
      title: 'Work out the tax on your profit',
      body: 'Apply the company rate for your kind of company to your taxable profit for the year.',
      href: '/corporate-tax-calculator',
      linkLabel: 'Company tax calculator',
    },
    {
      id: 'minimum',
      order: '2',
      title: 'Check it against the minimum tax on sales',
      body: 'Work out the minimum tax from your yearly sales. If it is higher than the tax on your profit, that is what you pay instead — you never pay both.',
      href: '/minimum-turnover-tax-calculator',
      linkLabel: 'Minimum tax calculator',
    },
    {
      id: 'super',
      order: '3',
      title: 'Then add super tax if your income is high',
      body: 'Super tax is separate. If your income for the year passes the threshold, it is charged on top of whichever figure came out of step 2.',
      href: '/super-tax-calculator',
      linkLabel: 'Super tax calculator',
    },
  ],
  note: 'Steps 1 and 2 compete with each other. Step 3 is always extra.',
} as const;

export const CORPORATE_SWITCH_COPY = {
  title: 'Working out a different company tax?',
  description: 'Each of the three sits on its own page so you can share the exact one you need.',
  linkPrefix: 'Open the',
} as const;
