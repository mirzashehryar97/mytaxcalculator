import type { OfficialSource } from '@/components/calculator/OfficialSourcesGrid';
import type { SocialCardCopy } from '@/components/ui/SocialCard';

import {
  BALOCHISTAN_GOVERNMENT_LOGO,
  FBR_DOC_URLS,
  FBR_LOGO,
  KP_GOVERNMENT_LOGO,
  PUNJAB_GOVERNMENT_LOGO,
  SINDH_GOVERNMENT_LOGO,
} from '@/lib/officialSources';

import type {
  AgriculturalFaqItem,
  AgriculturalTaxpayerType,
  OrchardIrrigation,
} from '@/features/agricultural-tax/types';

export const AGRICULTURAL_PAGE_COPY = {
  eyebrow: 'Provincial farm tax',
  title: 'Agricultural Income Tax Calculator Pakistan 2026-27',
  subtitle:
    'Work out the tax your province charges on farm income for 2026-27 — Punjab, Sindh, Khyber Pakhtunkhwa and Balochistan.',
  badges: [
    'All four provinces',
    'Rates taken from each provincial law',
    'Free, and nothing is stored',
  ],
  formTitle: 'Your farm details',
  resultTitle: 'What you owe',
  assessedNote:
    'This is an estimate to help you plan. Your final bill is the one your provincial revenue office assesses.',
  bottomDisclaimer:
    'This calculator is for guidance only and is not tax advice. Provincial rules change often — check with your Board of Revenue or a tax adviser before you file or pay.',
} as const;

export const AGRICULTURAL_SOCIAL_IMAGE_COPY = {
  eyebrow: 'Provincial farm tax',
  title: 'Agricultural Income Tax Calculator',
  subtitle: 'Tax on farm income in Punjab, Sindh, KP and Balochistan',
  features: 'All four provinces · 2025-26 and 2026-27 · Free',
  brand: 'My Tax Calculator',
} as const satisfies SocialCardCopy;

/* ------------------------------------------------------------------ */
/* Plain-language explanations behind the info icons                   */
/* ------------------------------------------------------------------ */

export const AGRICULTURAL_TERMS = {
  farmIncome: {
    label: 'What counts as farm income',
    text: 'Money you make from land used for farming: crops you sell, rent you receive for farmland, and income from a farmhouse tied to that land. Money from a shop, a job or a factory does not count here.',
  },
  taxpayerType: {
    label: 'Farmer or company',
    text: 'A farmer — one person or a family holding — is taxed on a rising scale with the first Rs 600,000 free. A registered company that farms pays one flat rate on everything it earns instead.',
  },
  smallCompany: {
    label: 'Small company',
    text: 'A company that meets the "small company" test in the federal Income Tax Ordinance 2001 — broadly, yearly sales up to Rs 250 million and paid-up capital under Rs 50 million. Every province uses that same test.',
  },
  taxFreePart: {
    label: 'Tax-free part',
    text: 'The first Rs 600,000 of a farmer’s yearly farm income is not taxed in any province. Tax only starts above that.',
  },
  superTax: {
    label: 'Extra tax on very large incomes',
    text: 'Once farm income passes Rs 150 million a year, provinces add a second charge on top. It is worked out on your whole income, not just the part above the line — so a small step up in income can raise the whole bill.',
  },
  cultivatedAcres: {
    label: 'How land is counted',
    text: 'Count the land you actually farm, leaving out any mature orchard — that has its own box below. The schedules treat 2 acres of unirrigated land as 1 acre of irrigated land, so halve your unirrigated acres before entering them.',
  },
  orchardAcres: {
    label: 'Mature orchard',
    text: 'An orchard old enough to be counted: 7 years or more for mango, 5 years or more for other fruit. Orchards are charged their own rate per acre, they are kept out of the acre bands above, and there is no free allowance on them.',
  },
  landTax: {
    label: 'Per-acre land tax',
    text: 'A fixed amount for every acre you farm, charged whatever your income is. The first 12½ acres of ordinary land are free, but a mature orchard is charged from its first acre.',
  },
  taxAlreadyPaid: {
    label: 'Tax already paid',
    text: 'Anything you have already paid towards this year’s farm tax — instalments, or tax collected from you. It comes off the bill.',
  },
  effectiveRate: {
    label: 'Effective rate',
    text: 'Your total tax as a share of your total farm income. It is lower than the top rate you reach, because the earlier slices are taxed less.',
  },
} as const;

/* ------------------------------------------------------------------ */
/* Form                                                                */
/* ------------------------------------------------------------------ */

export const AGRICULTURAL_FORM_COPY = {
  fiscalYearLabel: 'Tax year',
  provinceLabel: 'Where is your land?',
  provinceHelp: 'Farm tax is charged by the province your land sits in, not by the FBR.',
  taxpayerTypeLabel: 'Who is being taxed?',
  taxpayerTypeHelp: 'Farmers are taxed on a rising scale; companies pay one flat rate.',
  incomeLabel: 'Farm income for the year',
  incomeHelp: 'What you earned from farming over the whole year, before tax.',
  incomePlaceholder: 'Rs. 1,200,000',
  acresLabel: 'Land you farm',
  acresOptional: 'optional',
  acresHelp:
    'Only needed for the per-acre land tax. Leave it blank if you just want the income tax. Do not count orchard land here.',
  acresPlaceholder: '25',
  acresSuffix: 'acres',
  orchardAcresLabel: 'Mature orchard land',
  orchardAcresOptional: 'optional',
  orchardAcresHelp:
    'Enter orchard land separately — the schedules charge it its own rate and leave it out of the bands above.',
  orchardAcresPlaceholder: '5',
  orchardIrrigationLabel: 'Is the orchard irrigated?',
  orchardIrrigationHelp: 'An unirrigated orchard is charged half the irrigated rate.',
  taxAlreadyPaidLabel: 'Tax already paid',
  taxAlreadyPaidOptional: 'optional',
  taxAlreadyPaidHelp: 'Instalments or tax already collected from you this year.',
  taxAlreadyPaidPlaceholder: 'Rs. 0',
  usageNote:
    'Nothing you type here leaves your device. The whole calculation runs in your browser.',
  invalidMessage: 'Enter your farm income for the year to see the tax.',
} as const;

export const TAXPAYER_TYPE_OPTIONS = [
  { label: 'Farmer', value: 'farmer', tooltip: 'One person, a family holding or a partnership.' },
  {
    label: 'Small company',
    value: 'small-company',
    tooltip: 'A registered company that meets the small-company test.',
  },
  {
    label: 'Other company',
    value: 'company',
    tooltip: 'Any other registered company that farms.',
  },
] as const satisfies readonly {
  label: string;
  value: AgriculturalTaxpayerType;
  tooltip: string;
}[];

/**
 * Irrigation picks an orchard's rate outright. It is not the 2-for-1 acreage
 * conversion the bands use on ordinary land, which is why it is a choice here
 * rather than something folded into the acres figure.
 */
export const ORCHARD_IRRIGATION_OPTIONS = [
  { label: 'Irrigated', value: 'irrigated', tooltip: 'Watered by canal, tube well or channel.' },
  {
    label: 'Unirrigated',
    value: 'unirrigated',
    tooltip: 'Rain-fed land, charged at half the irrigated rate.',
  },
] as const satisfies readonly {
  label: string;
  value: OrchardIrrigation;
  tooltip: string;
}[];

/* ------------------------------------------------------------------ */
/* Result                                                              */
/* ------------------------------------------------------------------ */

export const AGRICULTURAL_RESULT_COPY = {
  breakdownTitle: 'Your farm tax',
  income: 'Farm income',
  taxFreePart: 'Tax-free part',
  taxedPart: 'Amount that gets taxed',
  rate: 'Rate you reach',
  flatRate: 'Company rate',
  incomeTax: 'Tax on farm income',
  superTax: 'Extra tax on very large income',
  totalTax: 'Total tax',
  taxAlreadyPaid: 'Tax already paid',
  remainingTax: 'Still to pay',
  incomeAfterTax: 'What you keep',
  effectiveRate: 'Effective rate',
  federalNote:
    'Farm income is not taxed by the FBR. It is taxed by your province instead, so nothing here is a federal charge.',
  superTaxCliffTitle: 'This extra charge hits your whole income',
  superTaxCliffBody:
    'The rate is applied to all of your farm income, not only the part above the line. Earning a little more can move you into the next band and raise the whole bill.',
  disputeTitle: 'Punjab’s rates are being disputed',
  disputeBody:
    'On 21 April 2026 the Punjab Assembly ruled that the notifications setting these rates were not valid, because they were never placed before the Assembly. The figures below are the ones the Board of Revenue published — treat them as a guide and check your position before you pay.',
} as const;

export const AGRICULTURAL_LAND_TAX_COPY = {
  title: 'Per-acre land tax',
  perAcre: 'Rate per acre',
  landArea: 'Land you farm',
  amount: 'Per-acre tax for the year',
  payable: 'What you actually pay',
  orchardArea: 'Mature orchard',
  orchardPerAcre: 'Orchard rate per acre',
  orchardAmount: 'Orchard tax for the year',
  cultivatedAmount: 'Tax on the rest of the land',
  orchardBody:
    'Orchard land is charged on its own. The schedules work out the acre bands "other than mature orchards", so orchard acres do not count towards the 12½ free acres and are charged from the first one.',
  exemptBody:
    'The first 12½ acres of ordinary land are free everywhere, so no per-acre tax is due on this holding.',
  noneBody:
    'Sindh scrapped its per-acre land tax in 2025. Only the tax on your farm income is charged.',
  unconfirmedBody:
    'Punjab does charge a per-acre tax, but we have not been able to confirm this year’s figures from an official document, so none is shown. The 2025-26 year on this calculator does carry the notified table.',
  minimumTaxBody:
    'Here you pay the higher of the two — the tax on your income or the tax on your acres, not both.',
  besideBody:
    'Punjab charges this alongside the tax on farm income. How the two are set off against each other is decided by the Board of Revenue when it assesses you.',
  rangeBody:
    'The exact amount per acre depends on which zone your district is in. The Board of Revenue sets the zones separately and does not publish them with the law, so a range is shown — ask your local revenue office which zone applies.',
  enterAcresBody: 'Add the acres you farm above to see whether a per-acre tax is due as well.',
} as const;

/* ------------------------------------------------------------------ */
/* Explainer sections                                                  */
/* ------------------------------------------------------------------ */

export const AGRICULTURAL_STEPS_COPY = {
  title: 'How the tax is worked out',
  description:
    'Four steps, the same in every province. Only the per-acre land tax underneath them changes.',
  steps: [
    {
      id: 'income',
      title: 'Add up your farm income',
      body: 'Everything you earned from the land over the year — crops sold, rent received, produce sold at market.',
    },
    {
      id: 'exempt',
      title: 'Take off the tax-free part',
      body: 'The first Rs 600,000 is free for a farmer. Companies do not get this.',
    },
    {
      id: 'slabs',
      title: 'Apply the rising scale',
      body: 'The rest is taxed in steps from 15% up to 45%. Each step only applies to the money inside it.',
    },
    {
      id: 'land',
      title: 'Check the per-acre tax',
      body: 'Ordinary land above 12½ acres is charged by band, and a mature orchard at its own rate from the first acre. In KP and Balochistan you pay whichever is higher — this or the tax on your income.',
    },
  ],
} as const;

export const AGRICULTURAL_OTHER_INCOME_COPY = {
  title: 'How this fits with the rest of your income',
  description: 'Farm income sits outside the federal system, but the rest of your money does not.',
  points: [
    {
      id: 'exempt',
      title: 'The FBR does not tax farm income',
      body: 'Income from farming is exempt from federal income tax. Your province taxes it instead.',
    },
    {
      id: 'other',
      title: 'Your other income is still federal',
      body: 'Salary, business profit, rent from a shop or house, and profit on savings are all taxed by the FBR as normal.',
    },
    {
      id: 'declare',
      title: 'You may still need to declare the farm income',
      body: 'The FBR asks you to show exempt farm income on your return, and KP and Balochistan tax the figure you declared there.',
    },
    {
      id: 'other-taxes',
      title: 'Other taxes still apply',
      body: 'Sales tax on what you buy, and tax collected on things like electricity bills and cash withdrawals, are unaffected by this.',
    },
  ],
} as const;

export const AGRICULTURAL_GUIDE_COPY = {
  rateTitle: 'Farm tax rates for 2026-27',
  rateDescription:
    'All four provinces moved to the same scale from 1 January 2025. A farmer pays nothing on the first Rs 600,000, then the steps below.',
  rateNote:
    'Companies that farm pay a flat rate instead: 20% for a small company and 29% for any other. Above Rs 150 million of farm income, provinces add a second charge on top.',
  bandColumn: 'Farm income for the year',
  rateColumn: 'Tax',
  provinceTitle: 'What each province charges',
  provinceDescription:
    'The scale is the same everywhere. What changes is the per-acre tax underneath it and who collects.',
  provinceColumn: 'Province',
  lawColumn: 'Charged under',
  landColumn: 'Per-acre land tax',
  faqEyebrow: 'Questions people ask',
  faqTitle: 'Agricultural income tax — common questions',
  faqDescription:
    'Short answers on who charges farm tax, what is free, and how land and income fit together.',
  reviewedLabel: 'Last reviewed 31 July 2026',
  reviewedDateTime: '2026-07-31',
} as const;

/* ------------------------------------------------------------------ */
/* FAQs                                                                */
/* ------------------------------------------------------------------ */

export const AGRICULTURAL_FAQS = [
  {
    id: 'is-farm-income-taxed',
    question: 'Is farm income taxed in Pakistan?',
    answer:
      'Yes. Farm income is exempt from federal income tax, but every province charges its own tax on it. Since 1 January 2025 Punjab, Sindh, Khyber Pakhtunkhwa and Balochistan all use the same scale: nothing on the first Rs 600,000, then 15% rising in steps to 45% above Rs 5,600,000.',
  },
  {
    id: 'who-charges',
    question: 'Does the FBR collect this, or the province?',
    answer:
      'The province. Farm income is left out of federal income tax, so the FBR does not charge or collect it. You deal with your provincial Board of Revenue — the Sindh Revenue Board in Sindh — and the money goes to the province.',
  },
  {
    id: 'tax-free-limit',
    question: 'How much farm income is tax free?',
    answer:
      'Rs 600,000 a year for a farmer, in all four provinces. Only income above that is taxed, and only the part above it — earning Rs 700,000 means tax on Rs 100,000, not on the whole amount. A company gets no tax-free part.',
  },
  {
    id: 'land-or-income',
    question: 'Am I taxed on my land or on what I earn?',
    answer:
      'Both exist. Punjab, KP and Balochistan charge a fixed amount per acre on ordinary farmland above 12½ acres as well as tax on farm income; Sindh scrapped its per-acre tax in 2025. In KP and Balochistan the law says you pay whichever of the two is higher, so the per-acre figure works as a floor rather than an extra bill.',
  },
  {
    id: 'orchard',
    question: 'Is an orchard charged differently?',
    answer:
      'Yes, and in two ways that matter. An orchard is charged its own flat rate per acre — Rs 600 an acre in Punjab if irrigated and Rs 300 if not, and Rs 900 to Rs 3,500 an acre in KP and Balochistan depending on the zone — and it gets no free allowance, so it is charged from the very first acre. Orchard acres are also left out when your other land is put into its acre band. Only a mature orchard counts: seven years or more for mango, five for other fruit.',
  },
  {
    id: 'filer-non-filer',
    question: 'Does being a filer or non-filer change what I pay?',
    answer:
      'No. Filer and non-filer rates are a federal idea and the provincial farm tax has no such split — the same scale applies either way. Being on the Active Taxpayer List still matters for everything else, including tax collected on your bank withdrawals and vehicle papers.',
  },
  {
    id: 'still-file-federal',
    question: 'Do I still have to file a federal tax return?',
    answer:
      'If you have any other income, or you meet the FBR filing rules for another reason, yes — and you show your farm income on it as exempt income. KP and Balochistan both say that where you have declared farm income in your federal return, the province taxes that same figure.',
  },
  {
    id: 'livestock',
    question: 'Does livestock, dairy or poultry income count?',
    answer:
      'It depends on the province, and this is the part that varies most. Punjab wrote a definition of livestock into its Act in 2024, while the other provinces work from the older wording that centres on income from land used for farming. Ask your Board of Revenue before treating animal income as farm income.',
  },
  {
    id: 'punjab-dispute',
    question: 'Why does the Punjab result carry a warning?',
    answer:
      'Because Punjab set its rates by notification rather than through the Assembly. On 21 April 2026 the Punjab Assembly ruled that those notifications were void from the start, since the law requires rate changes to be laid before the Assembly at budget time. The rates shown are the published ones, but the legal position is unsettled.',
  },
  {
    id: 'super-tax',
    question: 'What is the extra charge above Rs 150 million?',
    answer:
      'A super tax on very large farm incomes. Sindh, KP and Balochistan charge 1% to 10% on top once farm income passes Rs 150 million; Punjab follows the federal Section 4C rates instead. It is worked out on your whole income rather than the part above the line, so it steps up sharply.',
  },
] as const satisfies readonly AgriculturalFaqItem[];

/* ------------------------------------------------------------------ */
/* Official sources                                                    */
/* ------------------------------------------------------------------ */

/**
 * Farm tax is levied by four different provincial governments and by none of
 * them jointly, so the copy names them rather than borrowing the site-wide
 * FBR-neutral line.
 */
export const AGRICULTURAL_SOURCES_COPY = {
  eyebrow: 'Straight from the source',
  title: 'Official sources',
  description:
    'Farm income is a provincial tax, so almost every rate here was read out of the Act or gazette notification of the province that charges it. The one exception is Punjab’s super tax: its own law sets no rate and points at the federal Income Tax Ordinance instead, so that is cited too.',
} as const;

export const AGRICULTURAL_OFFICIAL_SOURCES = [
  {
    id: 'punjab-act',
    title: 'Punjab Agricultural Income Tax Act 1997',
    description:
      'The Punjab law itself, as amended in 2024 — the charge on farm income and on cultivated land.',
    href: 'https://punjablaws.punjab.gov.pk/uploads/articles/the-punjab-agricultural-income-tax-act-1997-doc-doc-pdf.pdf',
    logo: PUNJAB_GOVERNMENT_LOGO,
  },
  {
    id: 'punjab-income-notification',
    title: 'Punjab Gazette — income rates, March 2025',
    description:
      'Notification 148-2025 setting the Punjab slab table and the 20% / 29% company rates.',
    href: 'https://digitallibrary.punjab.gov.pk/bitstreams/5effbdaf-1c9f-4e7e-bda2-ed59b7c9f244/download',
    logo: PUNJAB_GOVERNMENT_LOGO,
  },
  {
    id: 'punjab-land-notification',
    title: 'Punjab Gazette — per-acre rates, March 2025',
    description:
      'Notification 147-2025 setting Punjab’s Rs 300 to Rs 500 per acre tax on cultivated land, and Rs 600 / Rs 300 on mature orchards.',
    href: 'https://digitallibrary.punjab.gov.pk/bitstreams/345c199a-3984-4e6b-9b98-469b19a07b82/download',
    logo: PUNJAB_GOVERNMENT_LOGO,
  },
  {
    id: 'punjab-amendment-act-2024',
    title: 'Punjab Agricultural Income Tax (Amendment) Act 2024',
    description:
      'Act XV of 2024, in force 1 January 2025. Section 3-AA adds the super tax and sets its rate by reference to the Income Tax Ordinance 2001.',
    href: 'https://punjablaws.punjab.gov.pk/uploads/articles/the-punjab-agricultural-income-tax-amendment-act-2024-pdf.pdf',
    logo: PUNJAB_GOVERNMENT_LOGO,
  },
  {
    id: 'income-tax-ordinance-2026',
    title: 'Income Tax Ordinance 2001',
    description:
      'Section 4C and Division IIB of the First Schedule — the super tax rates Punjab’s section 3-AA points at. Amended up to 30 June 2026.',
    href: FBR_DOC_URLS.incomeTaxOrdinance2026,
    logo: FBR_LOGO,
  },
  {
    id: 'sindh-act',
    title: 'Sindh Agricultural Income Tax Act 2025',
    description:
      'Sindh Act II of 2025 — the slab table, company rates and the super tax on income above Rs 150 million.',
    href: 'https://www.pas.gov.pk/uploads/acts/Sindh_Act_No.II_of_2025.pdf',
    logo: SINDH_GOVERNMENT_LOGO,
  },
  {
    id: 'srb',
    title: 'Sindh Revenue Board — farm tax',
    description: 'Where Sindh farmers register, file and pay agricultural income tax.',
    href: 'https://www.srb.gos.pk/srb/sindh-agricultural-income-tax/',
    logo: SINDH_GOVERNMENT_LOGO,
  },
  {
    id: 'kp-act',
    title: 'KP Agricultural Income Tax Act 2025',
    description:
      'KP Act VI of 2025 — the slab table, the four-zone per-acre schedule, and the higher-of rule.',
    href: 'https://kpcode.kp.gov.pk/uploads/THE_KHYBER_PAKHTUNKHWA_AGRICULTURAL_INCOME_TAX_ACT_2025Watermarked.pdf',
    logo: KP_GOVERNMENT_LOGO,
  },
  {
    id: 'balochistan-act',
    title: 'Balochistan Land & Agricultural Income Tax Act 2025',
    description:
      'Balochistan Act VIII of 2025 — the substituted schedules of per-acre and farm income rates.',
    href: 'https://pabalochistan.gov.pk/storage/7621/67b81c13bdc7b_THE-BALOCHISTAN-TAX-ON-LAND-AND-AGRICULTURAL-INCOME--ACt,-2025-(Final).pdf',
    logo: BALOCHISTAN_GOVERNMENT_LOGO,
  },
] as const satisfies readonly OfficialSource[];
