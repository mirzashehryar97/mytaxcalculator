import type { OfficialSource } from '@/components/calculator/OfficialSourcesGrid';

import {
  BALOCHISTAN_EXCISE_LOGO,
  FBR_DOC_URLS,
  FBR_LOGO,
  IRIS_LOGO,
  KP_GOVERNMENT_LOGO,
  PUNJAB_EXCISE_LOGO,
  SINDH_EXCISE_LOGO,
} from '@/lib/officialSources';

import type {
  VehicleEngineType,
  VehicleFaqItem,
  VehicleOption,
  VehicleRegistrationMode,
} from '@/features/vehicle-tax/types';

/** Plain-language explanations shown behind info icons for terms we must keep. */
export const VEHICLE_TERMS = {
  advanceTax: {
    label: 'What is this tax?',
    text: 'A tax the excise office collects for the FBR when a vehicle is registered or changes hands. It is not a fee for the number plate — it goes towards your income tax for the year.',
  },
  adjustable: {
    label: 'What does this count towards?',
    text: 'The FBR treats it as income tax you have already paid. Put it on your yearly return and it comes off your final bill, or comes back as a refund if you owe less.',
  },
  filerStatus: {
    label: 'What is the taxpayer list?',
    text: 'The FBR keeps a list of everyone who filed their income tax return on time. Being on it means you pay the lower rate. Being off it means three times as much on a vehicle.',
  },
  engineSize: {
    label: 'What is engine size?',
    text: 'The size of the engine in cubic centimetres, printed on your registration book. A 1.3-litre car is 1,300 cc. It is what decides which rate band you land in.',
  },
  vehicleValue: {
    label: 'Which price should I enter?',
    text: 'For a locally built car, the invoice price including every duty and tax on it. For an imported car, the customs value plus customs duty, excise duty and sales tax. For an auctioned car, the auction price including duties.',
  },
  invoiceValue: {
    label: 'Which price should I enter?',
    text: 'The original invoice price of the car, including duties and taxes. Provinces that charge a percentage work from that price, not from what the car is worth today.',
  },
  firstRegistration: {
    label: 'What is the first registration date?',
    text: 'The date the vehicle was first put on the road in Pakistan, shown in the registration book. Its age is worked out from that date, not from when you bought it.',
  },
  tokenTax: {
    label: 'What is token tax?',
    text: 'The yearly charge your province takes to keep a vehicle registered. It is a provincial charge, so it is not income tax and you cannot claim it back on your return.',
  },
  federalYearlyTax: {
    label: 'What is the federal part?',
    text: 'A separate FBR charge collected at the same counter as your token, based on engine size. Unlike the token, it does count towards your income tax for the year.',
  },
  lifetimeToken: {
    label: 'What is a one-off token?',
    text: 'Some provinces let the smallest cars pay their token once, for the whole life of the vehicle, instead of every year. After that payment there is nothing more to pay yearly.',
  },
  earlyPayment: {
    label: 'How does the discount work?',
    text: 'Pay the whole year in one go before the deadline and the province takes a slice off the yearly amount. Pay later in the year and you pay the full figure.',
  },
  transferReduction: {
    label: 'Why does the tax fall each year?',
    text: 'The law knocks 10% off the amount for every full year since the vehicle was first registered, and nothing at all is collected once it is more than five years old.',
  },
  effectiveRate: {
    label: 'What is the effective rate?',
    text: 'The tax as a share of the price of the vehicle. It lets you compare what different cars actually cost you in tax, whichever band they fall in.',
  },
} as const;

export const VEHICLE_REGISTRATION_PAGE_COPY = {
  eyebrow: 'Tax Year 2026-27 · Tax when a vehicle is registered to you',
  title: 'Pakistan Vehicle Tax Calculator 2026-27',
  subtitle:
    'Work out the one-off tax the excise office collects when you register a new vehicle or buy a used one, and see how much more it costs if you are not on the taxpayer list.',
  badges: [
    'New registrations',
    'Used vehicle transfers',
    'Filer vs non-filer',
    'Adjustable advance tax',
  ],
  formTitle: 'Your vehicle details',
  resultTitle: 'Tax at the excise office',
  bottomDisclaimer:
    'This calculator gives an estimate, not tax or legal advice. Your excise office works out the final figure from the papers you bring. Confirm anything you rely on with a qualified Pakistan tax professional.',
} as const;

export const VEHICLE_TOKEN_PAGE_COPY = {
  eyebrow: 'Tax Year 2026-27 · What a vehicle costs each year',
  title: 'Pakistan Vehicle Token Tax Calculator 2026-27',
  subtitle:
    'Work out what your car costs to keep registered for a year: your province’s token, the discount for paying early, and the federal tax collected at the same counter.',
  badges: [
    'Province by province',
    'Early-payment discount',
    'Federal yearly tax',
    'Filer vs non-filer',
  ],
  formTitle: 'Your vehicle details',
  resultTitle: 'What you pay this year',
  bottomDisclaimer:
    'This calculator gives an estimate, not tax or legal advice. Provinces revise their token tables, so check your own excise department’s current schedule before you pay.',
} as const;

export const VEHICLE_REGISTRATION_SOCIAL_IMAGE_COPY = {
  eyebrow: 'FY 2026-27 · Tax on registering a vehicle',
  title: 'Pakistan Vehicle Tax Calculator',
  subtitle: 'New registration · Used transfer',
  features: 'Free · Engine size and price bands · Filer vs non-filer',
  brand: 'My Tax Calculator',
} as const;

export const VEHICLE_TOKEN_SOCIAL_IMAGE_COPY = {
  eyebrow: 'FY 2026-27 · Yearly vehicle token tax',
  title: 'Pakistan Vehicle Token Tax Calculator',
  subtitle: 'All provinces · Federal charge',
  features: 'Free · Province by province · Early-payment discount',
  brand: 'My Tax Calculator',
} as const;

export const VEHICLE_MODE_TABS_LABEL = 'Vehicle tax calculators';

export const VEHICLE_REGISTRATION_FORM_COPY = {
  fiscalYearLabel: 'Tax year',
  modeLabel: 'What are you doing?',
  engineTypeLabel: 'What kind of vehicle is it?',
  engineCcLabel: 'Engine size',
  engineCcPlaceholder: '1300',
  engineCcHelp: 'The figure printed in your registration book, in cc.',
  vehicleValueLabel: 'Price of the vehicle',
  vehicleValuePlaceholder: '4000000',
  vehicleValueHelp: 'Invoice price including duties and taxes, or the customs value for an import.',
  vehicleValueTransferHelp:
    'Only needed for an electric vehicle. A used engine-powered car is charged a set amount, whatever it is worth.',
  filerLabel: 'Are you on the Active Taxpayer List?',
  filerHelp: 'Filing your yearly return on time cuts this tax to a third.',
  firstRegistrationLabel: 'First registration date',
  firstRegistrationHelp: 'From the registration book. It sets the age of the vehicle.',
  firstRegistrationMissing: 'Add the date to see the reduction for the vehicle’s age.',
  invalidEngineMessage: 'Enter the engine size in cc to see the tax.',
  invalidValueMessage: 'Enter the price of the vehicle to see the tax.',
  privacyNote: 'Nothing you type leaves your browser.',
} as const;

export const VEHICLE_TOKEN_FORM_COPY = {
  fiscalYearLabel: 'Tax year',
  provinceLabel: 'Where is the vehicle registered?',
  engineCcLabel: 'Engine size',
  engineCcPlaceholder: '1300',
  engineCcHelp: 'The figure printed in your registration book, in cc.',
  invoiceValueLabel: 'Invoice price',
  invoiceValuePlaceholder: '4000000',
  invoiceValueHelp: 'Needed where your province charges a percentage instead of a set amount.',
  filerLabel: 'Are you on the Active Taxpayer List?',
  filerHelp: 'Being on the list halves the federal part of what you pay at the counter.',
  firstRegistrationLabel: 'First registration date',
  firstRegistrationHelp: 'Optional. The federal part stops once a car is more than ten years old.',
  payEarlyLabel: 'Paying the whole year early',
  invalidEngineMessage: 'Enter the engine size in cc to see the tax.',
  privacyNote: 'Nothing you type leaves your browser.',
} as const;

export const VEHICLE_MODE_OPTIONS = [
  {
    value: 'register',
    label: 'Registering a new vehicle',
    tooltip:
      'A vehicle being put on the road for the first time, whether it was built here, imported, or bought at auction.',
  },
  {
    value: 'transfer',
    label: 'Buying a used vehicle',
    tooltip:
      'A vehicle already registered to somebody else that is being put in your name. The amount falls with the age of the vehicle.',
  },
] as const satisfies readonly VehicleOption<VehicleRegistrationMode>[];

export const VEHICLE_ENGINE_TYPE_OPTIONS = [
  {
    value: 'combustion',
    label: 'Petrol, diesel or hybrid',
    tooltip: 'Anything with an engine size in cc. The rate comes from which size band it lands in.',
  },
  {
    value: 'electric',
    label: 'Electric',
    tooltip:
      'No engine size to measure, so the law charges it on price instead — but only once the vehicle is worth Rs. 5,000,000 or more.',
  },
] as const satisfies readonly VehicleOption<VehicleEngineType>[];

export const VEHICLE_REGISTRATION_RESULT_COPY = {
  basisLabel: 'How this band is charged',
  basisPercent: 'A share of the price',
  basisAmount: 'A set amount',
  bandLabel: 'Your band',
  rateLabel: 'Rate for your band',
  taxLabel: 'Tax to pay',
  filerTaxLabel: 'On the taxpayer list',
  nonFilerTaxLabel: 'Not on the list',
  savingLabel: 'You save by being on the list',
  beforeReductionLabel: 'Before the age reduction',
  reductionLabel: 'Taken off for age',
  afterReductionLabel: 'Tax to pay',
  effectiveRateLabel: 'Tax as a share of the price',
  adjustableBadge: 'Adjustable against your annual tax liability',
  ageNote: 'The amount drops 10% for every full year, and nothing is collected after five years.',
  pastCutoffTitle: 'Nothing to pay',
  pastCutoffBody:
    'This vehicle was first registered more than five years ago, so no tax is collected when it changes hands.',
  unratedElectricTitle: 'No rate set for this vehicle',
  unratedElectricBody:
    'The law only sets a rate for a vehicle with no engine size once it is worth Rs. 5,000,000 or more. Below that, ask your excise office what they will collect.',
  unratedTitle: 'No rate set for this vehicle',
  unratedBody: 'Check the engine size — the bands start at 1 cc and run to above 3,000 cc.',
  comparisonTitle: 'On the list vs off it',
  comparisonSubtitle: 'Same vehicle, both statuses',
  yearComparisonTitle: 'Same vehicle across tax years',
  yearComparisonHelp: 'What this vehicle would have cost in each year we cover.',
  workingTitle: 'How this was worked out',
} as const;

export const VEHICLE_TOKEN_RESULT_COPY = {
  provincialLabel: 'Provincial token',
  discountLabel: 'Early-payment discount',
  netProvincialLabel: 'Token to pay',
  federalLabel: 'Federal yearly tax',
  totalLabel: 'Total to pay',
  oneOffBadge: 'Paid once, not every year',
  annualBadge: 'Paid every year',
  adjustableBadge: 'The federal part is adjustable against your annual tax liability',
  provincialNotAdjustable:
    'The token itself is a provincial charge, so it is not adjustable against your FBR tax liability.',
  federalExemptTitle: 'Federal part has stopped',
  federalExemptBody:
    'This car is more than ten years old, so the federal yearly tax is no longer collected. You still pay your province’s token.',
  notCoveredTitle: 'We do not estimate this province for this year',
  notCoveredBody:
    'We have no motor-car table we can check line by line for this province in this year, so we show only the federal part rather than guess. Open its official schedule below for the token figure.',
  notCoveredLink: 'Open the official schedule',
  sourceOfficialBadge: 'Official source',
  sourceSecondaryBadge: 'Secondary source',
  sourceOfficialTitle: 'Checked against the official schedule',
  sourceSecondaryTitle: 'Verified from secondary sources, not official ones',
  sourceSecondaryBody:
    'This province does not publish a motor-car table we can read, so these bands come from secondary sources rather than a government publication. Treat the token line as an estimate and confirm it with your excise office before you pay.',
  sourceLink: 'Open the source',
  comparisonTitle: 'On the list vs off it',
  comparisonSubtitle: 'On the federal part of your bill',
  filerLabel: 'On the taxpayer list',
  nonFilerLabel: 'Not on the list',
  savingLabel: 'You save by being on the list',
  workingTitle: 'How this was worked out',
  breakdownTitle: 'What makes up the total',
  reVerifyNote:
    'Provinces revise their token tables most years. Check your excise department’s current schedule before you pay.',
} as const;

export const VEHICLE_REGISTRATION_SECTION_COPY = {
  faqEyebrow: 'Got questions?',
  faqTitle: 'Vehicle registration tax FAQs for Pakistan',
  faqDescription: 'Simple answers about the tax collected when a vehicle goes into your name.',
} as const;

export const VEHICLE_TOKEN_SECTION_COPY = {
  faqEyebrow: 'Got questions?',
  faqTitle: 'Vehicle token tax FAQs for Pakistan',
  faqDescription: 'Simple answers about what a vehicle costs to keep on the road each year.',
} as const;

export const VEHICLE_GUIDE_COPY = {
  registrationRateTitle: 'Tax on registering a vehicle in Pakistan',
  registrationRateDescription:
    'A new registration is charged on the price of the vehicle, with the share set by engine size. Anyone not on the Active Taxpayer List pays three times as much.',
  transferRateTitle: 'Tax on buying a used vehicle',
  transferRateDescription:
    'A used vehicle is charged a set amount by engine size instead of a share of the price. That amount falls 10% for every full year since the vehicle was first registered, and nothing is collected after five years.',
  annualTaxTitle: 'The federal tax collected with your token',
  annualTaxDescription:
    'Alongside your province’s token, the excise counter collects a fixed yearly amount for the FBR based on engine size. Being off the taxpayer list doubles it.',
  annualTaxLumpSumNote:
    'Where a province takes its token once for the life of the vehicle, this federal amount is collected once in the same way, at the higher one-off figure.',
  bandColumn: 'Engine size',
  filerColumn: 'On the taxpayer list',
  nonFilerColumn: 'Not on the list',
  registrationNote:
    'Up to 2023-24 the smaller bands were set rupee amounts. From 1 July 2024 every band became a share of the price, and the Finance Act 2026 left that table alone.',
  transferNote:
    'These amounts have not changed since 2023-24. The reduction for age and the five-year cut-off apply on top of them.',
  annualTaxNote:
    'These amounts have not changed since 2023-24. A car more than ten years old stops paying the federal part altogether.',
  calculationTitle: 'How the tax on a vehicle is worked out',
  calculationDescription:
    'Find your engine-size band, then apply what that band charges. A new registration takes a share of the price; a used transfer takes a set amount and reduces it for the age of the vehicle.',
  formulaLabel: 'New registration',
  formulaResult: 'Tax',
  formulaTerms: [
    { id: 'value', text: 'price including duties' },
    { id: 'rate', text: 'rate for your engine-size band' },
  ],
  transferFormulaLabel: 'Used vehicle',
  transferFormulaTerms: [
    { id: 'amount', text: 'set amount for your band' },
    { id: 'reduction', text: '10% off for each full year of age' },
  ],
  exampleTitle: 'Worked example (2026-27)',
  exampleIntro:
    'A 1,300 cc car invoiced at Rs. 4,000,000, being registered to someone on the taxpayer list, sits in the 1,001 – 1,300 cc band at 1.5% of the price.',
  exampleRows: [
    { id: 'value', label: 'Price including duties', value: 'Rs. 4,000,000' },
    { id: 'rate', label: 'Rate for the 1,001 – 1,300 cc band', value: '1.5%' },
    { id: 'non-filer', label: 'Same car, off the taxpayer list (4.5%)', value: 'Rs. 180,000' },
  ],
  exampleTotalLabel: 'Tax at registration',
  exampleTotalValue: 'Rs. 60,000',
  exampleEffectiveLabel: 'Saved by being on the list',
  exampleEffectiveValue: 'Rs. 120,000',
  tokenTitle: 'Token tax across Pakistan',
  tokenDescription:
    'Each province sets its own token, and they no longer work the same way. Punjab and Islamabad charge a share of the invoice price above 1,000 cc; Sindh, Khyber Pakhtunkhwa and Balochistan still charge a set amount by engine size.',
  reviewedLabel: 'Last reviewed 30 July 2026',
  reviewedDateTime: '2026-07-30',
} as const;

export const VEHICLE_ADJUSTABLE_COPY = {
  title: 'What happens to this tax',
  points: [
    'The excise office collects it for the FBR and issues you a receipt.',
    'It is not a fee — it counts towards the income tax you owe for the whole year.',
    'Claim it on your yearly return as tax already paid, and it comes off your final bill.',
    'If your final bill works out lower, the difference comes back to you as a refund.',
  ],
  note: 'Keep the excise receipt. Without it you cannot claim the tax on your return.',
} as const;

export const VEHICLE_SCOPE_COPY = {
  title: 'What this calculator covers',
  intro: 'These figures are for private vehicles kept for your own use:',
  items: [
    {
      id: 'cars',
      text: 'Cars, jeeps, sport utility vehicles, vans, wagons, pickups and limousines.',
    },
    { id: 'new-used', text: 'Both a first registration and a used vehicle going into your name.' },
    {
      id: 'electric',
      text: 'Electric vehicles, which are charged on price rather than engine size.',
    },
  ],
  excludedIntro: 'They are not for:',
  excludedItems: [
    { id: 'public', text: 'Buses, taxis and anything else carrying passengers or goods for hire.' },
    { id: 'small', text: 'Rickshaws, and any vehicle with an engine of 200 cc or less.' },
    { id: 'farm', text: 'Tractors and other agricultural machinery.' },
    { id: 'lease', text: 'Vehicles taken on lease, which are charged under a separate rule.' },
  ],
  note: 'Federal and provincial governments, foreign diplomats and diplomatic missions do not pay this tax at all.',
} as const;

const PUNJAB_EXCISE_SOURCE = {
  id: 'punjab-excise',
  title: 'Punjab Excise & Taxation Department',
  description: 'The published motor-car token table for 2026-27 and 2025-26.',
  href: 'https://excise.punjab.gov.pk/motorvehicle_tax',
  logo: PUNJAB_EXCISE_LOGO,
} as const satisfies OfficialSource;

/**
 * The provincial token is set by each province, not the FBR, so the government
 * that levies it is the primary source for its bands.
 */
const PROVINCIAL_TOKEN_SOURCES = [
  PUNJAB_EXCISE_SOURCE,
  {
    id: 'sindh-excise',
    title: 'Sindh Excise & Taxation Department',
    description: 'The department’s own four-wheeler calculator, which sets the Sindh bands.',
    href: 'https://excise.gos.pk/online_services/four_wheeler/',
    logo: SINDH_EXCISE_LOGO,
  },
  {
    id: 'kp-finance-act-2025',
    title: 'Khyber Pakhtunkhwa Finance Act 2025',
    description: 'Appendix-III substitutes Schedule-II, the KP token table from 1 July 2025.',
    href: 'https://kpcode.kp.gov.pk/uploads/THE_KHYBER_PAKHTUNKHWA_FINANCE_ACT_2025.pdf',
    logo: KP_GOVERNMENT_LOGO,
  },
  {
    id: 'balochistan-excise',
    title: 'Balochistan Excise & Taxation Department',
    description: 'The Schedule of Taxes and Fees carrying the motor-car table from 1 July 2025.',
    href: 'https://excise.balochistan.gov.pk/wp-content/uploads/2026/01/mvtx.pdf',
    logo: BALOCHISTAN_EXCISE_LOGO,
  },
] as const satisfies readonly OfficialSource[];

export const VEHICLE_REGISTRATION_OFFICIAL_SOURCES = [
  {
    id: 'wht-rate-card',
    title: 'FBR Withholding Income Tax Rate Card',
    description: 'The Section 231B bands for registration and transfer (Division VII, Part IV).',
    href: FBR_DOC_URLS.whtRateCard,
    logo: FBR_LOGO,
  },
  {
    id: 'income-tax-ordinance',
    title: 'Income Tax Ordinance 2001',
    description:
      'Section 231B: the five-year cut-off, which vehicles count, and who is left out entirely.',
    href: FBR_DOC_URLS.incomeTaxOrdinance,
    logo: FBR_LOGO,
  },
  {
    id: 'finance-act-2026',
    title: 'Finance Act 2026',
    description: 'The enacted budget law for 2026-27. It leaves the vehicle rate bands unchanged.',
    href: FBR_DOC_URLS.financeAct2026,
    logo: FBR_LOGO,
  },
  {
    id: 'finance-act-2024',
    title: 'Finance Act 2024',
    description:
      'Substituted the Division VII table, moving registration onto a share of the price from 1 July 2024.',
    href: FBR_DOC_URLS.financeAct2024,
    logo: FBR_LOGO,
  },
  {
    id: 'finance-act-2023',
    title: 'Finance Act 2023',
    description: 'The set-amount table this calculator uses for the 2023-24 year.',
    href: FBR_DOC_URLS.financeAct2023,
    logo: FBR_LOGO,
  },
  {
    id: 'iris',
    title: 'FBR IRIS Portal',
    description: 'File your yearly return and claim the tax the excise office collected.',
    href: FBR_DOC_URLS.iris,
    logo: IRIS_LOGO,
  },
] as const satisfies readonly OfficialSource[];

/**
 * The token bill has two halves set by two different governments, so this page
 * cites both rather than only the federal side.
 */
export const VEHICLE_TOKEN_SOURCES_COPY = {
  eyebrow: 'Straight from the source',
  title: 'Official sources',
  description:
    'Your province sets the token and the FBR sets the charge collected with it, so both are cited here. Every rate on this page comes from these documents.',
} as const;

export const VEHICLE_TOKEN_OFFICIAL_SOURCES = [
  {
    id: 'wht-rate-card',
    title: 'FBR Withholding Income Tax Rate Card',
    description: 'The Section 234 amounts collected with your token (Division III, Part IV).',
    href: FBR_DOC_URLS.whtRateCard,
    logo: FBR_LOGO,
  },
  {
    id: 'income-tax-ordinance',
    title: 'Income Tax Ordinance 2001',
    description: 'Section 234: the ten-year cut-off, and that this tax counts towards your bill.',
    href: FBR_DOC_URLS.incomeTaxOrdinance,
    logo: FBR_LOGO,
  },
  {
    id: 'finance-act-2026',
    title: 'Finance Act 2026',
    description: 'Sets the Islamabad token table from 1 July 2026 and leaves Section 234 alone.',
    href: FBR_DOC_URLS.financeAct2026,
    logo: FBR_LOGO,
  },
  ...PROVINCIAL_TOKEN_SOURCES,
] as const satisfies readonly OfficialSource[];

export const VEHICLE_REGISTRATION_FAQS = [
  {
    id: 'how-much-new',
    question: 'How much tax do I pay to register a new car in Pakistan?',
    answer:
      'A share of what you paid for it, set by engine size. For someone on the Active Taxpayer List in 2026-27 it runs from 0.5% up to 850 cc, through 1.5% for 1,001–1,300 cc and 5% for 1,801–2,000 cc, to 12% above 3,000 cc. So a 1,300 cc car invoiced at Rs. 4,000,000 costs Rs. 60,000. Anyone off the list pays three times as much.',
  },
  {
    id: 'used-transfer',
    question: 'How is the tax worked out on a used car?',
    answer:
      'A used car is charged a set amount for its engine-size band rather than a share of the price — nothing up to 850 cc, Rs. 7,500 for 1,001–1,300 cc, Rs. 25,000 for 1,801–2,000 cc, up to Rs. 62,500 above 3,000 cc. That amount then drops 10% for every full year since the car was first registered. A 1,300 cc car two years old costs Rs. 7,500 less 20%, so Rs. 6,000.',
  },
  {
    id: 'five-years',
    question: 'Do I still pay when I buy a car more than five years old?',
    answer:
      'No. Section 231B stops the excise office collecting anything on a transfer once the vehicle is more than five years past its first registration in Pakistan. The date in the registration book is what counts, not when the last owner bought it.',
  },
  {
    id: 'non-filer',
    question: 'How much more does a non-filer pay on a vehicle?',
    answer:
      'Three times as much. Rule 1 of the Tenth Schedule normally adds 100% for anyone off the Active Taxpayer List, but its first proviso singles out vehicles for a 200% increase. So a 1,500 cc car at 2% for a filer is charged at 6% for a non-filer.',
  },
  {
    id: 'adjustable',
    question: 'Can I get this tax back?',
    answer:
      'It is not a fee you lose. The FBR treats it as income tax you have already paid, so you claim it on your yearly return and it comes off your final bill. If your final bill is lower than what you have paid across the year, the difference comes back as a refund. Keep the excise receipt — you cannot claim it without one.',
  },
  {
    id: 'which-price',
    question: 'Which price does the tax use?',
    answer:
      'For a car built or assembled in Pakistan, the invoice price including every duty and tax on it. For an imported car, the value customs assessed plus customs duty, federal excise duty and sales tax. For a car bought at auction, the auction price including duties. Not the resale value and not what you think it is worth.',
  },
  {
    id: 'electric',
    question: 'What about electric vehicles?',
    answer:
      'An electric vehicle has no engine size, so there is no band to put it in. The law sets a single rate of 3% of the price for a vehicle with no engine size worth Rs. 5,000,000 or more, and Rs. 20,000 when one of those changes hands. Below Rs. 5,000,000 no rate is set, so ask your excise office what they will collect.',
  },
  {
    id: 'what-changed',
    question: 'What changed for vehicles in 2026-27?',
    answer:
      'Nothing in the rate tables. The Finance Act 2026 only amends Part IV of the First Schedule at the property and remittance divisions, so the vehicle bands, the used-car amounts and the yearly charge all carry over from 2025-26. The one edit to Section 231B narrows which older vehicles qualify for the five-year relief at first registration.',
  },
  {
    id: 'tax-years',
    question: 'Which tax years does this calculator cover?',
    answer:
      'Tax years 2023-24 through 2026-27 — the years we can check line by line against the enacted law. The big change in that stretch came on 1 July 2024, when every band became a share of the price. Before that, cars up to 2,000 cc paid set rupee amounts of Rs. 10,000 to Rs. 200,000.',
  },
  {
    id: 'excluded',
    question: 'Which vehicles are left out of this tax?',
    answer:
      'Buses, taxis and anything else carrying passengers or goods for hire, agricultural machinery, rickshaws, and any vehicle with an engine of 200 cc or less. The federal government, provincial governments, local governments, foreign diplomats and diplomatic missions do not pay it either.',
  },
] as const satisfies readonly VehicleFaqItem[];

export const VEHICLE_TOKEN_FAQS = [
  {
    id: 'what-is-token',
    question: 'What is token tax?',
    answer:
      'The yearly charge your province takes to keep a vehicle registered. It is set by your provincial excise department, not the FBR, so it differs from province to province. It is not income tax and you cannot claim it back on your return.',
  },
  {
    id: 'punjab-rates',
    question: 'How much is token tax in Punjab for 2026-27?',
    answer:
      'A car up to 1,000 cc pays Rs. 20,000 once, for the life of the vehicle. From 1,001 cc to 2,000 cc it is 0.3% of the invoice price each year, and above 2,000 cc it is 0.4%. In 2025-26 those two figures were 0.2% and 0.3%, so a larger car costs noticeably more this year.',
  },
  {
    id: 'islamabad-rates',
    question: 'How much is token tax in Islamabad for 2026-27?',
    answer:
      'The Finance Act 2026 moved Islamabad onto invoice-price charging from 1 July 2026. A car up to 1,000 cc pays Rs. 20,000 once for the life of the vehicle; 1,001 cc to 2,000 cc pays 0.25% of the invoice price a year; and above 2,000 cc pays 0.35%.',
  },
  {
    id: 'sindh-rates',
    question: 'How much is token tax in Sindh?',
    answer:
      'Sindh charges a set yearly amount by engine size, not a share of the price: Rs. 1,500 up to 1,000 cc, Rs. 2,000 for 1,001–1,300 cc, Rs. 4,000 for 1,301–1,600 cc, Rs. 4,500 for 1,601–2,000 cc, Rs. 5,000 for 2,001–2,500 cc and Rs. 7,000 above that. A car up to 1,000 cc can instead pay Rs. 20,000 once, for the life of the vehicle.',
  },
  {
    id: 'kp-rates',
    question: 'How much is token tax in Khyber Pakhtunkhwa?',
    answer:
      'Set yearly amounts by engine size, in force since 1 July 2025: Rs. 2,000 up to 1,000 cc, Rs. 3,000 for 1,001–1,300 cc, Rs. 4,000 for 1,301–1,500 cc, Rs. 5,000 for 1,501–2,500 cc and Rs. 8,000 above 2,500 cc. Electric four-wheelers pay no token tax at all until 30 June 2028.',
  },
  {
    id: 'balochistan-rates',
    question: 'How much is token tax in Balochistan?',
    answer:
      'Balochistan is the one province where the age of the car changes how it is charged. A car up to 660 cc pays Rs. 10,500 once while it is under five years old, and Rs. 1,000 a year after that; 661–1,000 cc pays Rs. 12,000 once, then Rs. 1,100 a year. Above that it is a flat yearly amount whatever the age — Rs. 1,400 to 1,500 cc, Rs. 1,700 to 2,000 cc and Rs. 2,000 above 2,000 cc.',
  },
  {
    id: 'early-discount',
    question: 'Is there a discount for paying early?',
    answer:
      'In Punjab, yes. Paying the whole year in one go on or before 31 August takes 10% off the yearly token. On a Rs. 12,000 token that is Rs. 1,200 saved. Other provinces set their own rules, so check your excise department’s schedule.',
  },
  {
    id: 'federal-part',
    question: 'Why are there two amounts on my token receipt?',
    answer:
      'One is your province’s token. The other is a federal charge under Section 234 that the same counter collects for the FBR, based on engine size — Rs. 800 up to 1,000 cc, Rs. 2,500 for 1,300–1,499 cc, up to Rs. 10,000 at 2,000 cc and above. Only the federal part counts towards your income tax for the year.',
  },
  {
    id: 'non-filer-token',
    question: 'Do non-filers pay more token tax?',
    answer:
      'Not on the provincial token, which is the same for everyone. But the federal part doubles for anyone off the Active Taxpayer List, so Rs. 2,500 becomes Rs. 5,000 and Rs. 10,000 becomes Rs. 20,000.',
  },
  {
    id: 'ten-years',
    question: 'Does the tax stop on an older car?',
    answer:
      'The federal part does. Section 234 stops it being collected on a car more than ten years old. The provincial token carries on for as long as the vehicle stays registered.',
  },
  {
    id: 'lifetime-token',
    question: 'What is a lifetime token?',
    answer:
      'Punjab, Islamabad and Sindh let a car up to 1,000 cc settle its token once — Rs. 20,000 — instead of paying every year, and Balochistan charges a small car that way until it is five years old. Where the token is paid once, the federal charge is collected once too, at a higher one-off figure of Rs. 10,000 for a car up to 1,000 cc.',
  },
  {
    id: 'other-provinces',
    question: 'Which provinces does this calculator cover?',
    answer:
      'All five: Punjab, Sindh, Khyber Pakhtunkhwa, Balochistan and Islamabad. Every band is transcribed from the government that sets it — the Punjab and Balochistan excise schedules, the Sindh excise department’s own calculator, the Khyber Pakhtunkhwa Finance Act 2025 and the Finance Act 2026 for Islamabad. Where a province has not published a table for an earlier year we say so rather than guess.',
  },
  {
    id: 'electric-token',
    question: 'Do electric vehicles pay token tax?',
    answer:
      'Punjab exempts 95% of both the registration fee and the yearly motor vehicle tax for electric vehicles, and Khyber Pakhtunkhwa charges electric four-wheelers no token tax at all until 30 June 2028. Balochistan charges them by the band their motor power converts to. The calculator works on engine size, so check your province’s concession before you pay.',
  },
] as const satisfies readonly VehicleFaqItem[];
