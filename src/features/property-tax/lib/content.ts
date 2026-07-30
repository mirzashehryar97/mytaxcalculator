import type { OfficialSource } from '@/components/calculator/OfficialSourcesGrid';

import { FBR_DOC_URLS, FBR_LOGO, IRIS_LOGO } from '@/lib/officialSources';

import type {
  PropertyFaqItem,
  PropertyFilerStatus,
  PropertyMode,
  PropertyOption,
  PropertyType,
} from '@/features/property-tax/types';

interface PropertyPageCopy {
  eyebrow: string;
  title: string;
  subtitle: string;
  badges: readonly string[];
  formTitle: string;
  resultTitle: string;
  bottomDisclaimer: string;
}

const SHARED_DISCLAIMER =
  'This calculator gives an estimate, not tax or legal advice. Confirm your final tax with a qualified Pakistan tax professional.';

export const PROPERTY_PAGE_COPY = {
  purchase: {
    eyebrow: 'Tax Year 2026-27 · Tax the buyer pays',
    title: 'Property Purchase Tax Calculator Pakistan 2026-27',
    subtitle:
      'Work out the advance tax you pay under Section 236K when you buy a property, and see how much more it costs if you are not on the Active Taxpayer List.',
    badges: [
      'Section 236K buyer tax',
      'Filer vs non-filer',
      'Higher of price and FBR value',
      'Adjustable advance tax',
    ],
    formTitle: 'Your purchase details',
    resultTitle: 'Buyer advance tax — Section 236K',
    bottomDisclaimer: SHARED_DISCLAIMER,
  },
  sale: {
    eyebrow: 'Tax Year 2026-27 · Tax the seller pays',
    title: 'Property Sale Tax Calculator Pakistan 2026-27',
    subtitle:
      'Work out the advance tax deducted under Section 236C when you sell a property, and see how much of it you can set against your capital gains tax.',
    badges: [
      'Section 236C seller tax',
      'Filer vs non-filer',
      'Higher of price and FBR value',
      'Set off against capital gains',
    ],
    formTitle: 'Your sale details',
    resultTitle: 'Seller advance tax — Section 236C',
    bottomDisclaimer: SHARED_DISCLAIMER,
  },
  'capital-gains': {
    eyebrow: 'Tax Year 2026-27 · Tax on your profit',
    title: 'Property Capital Gains Tax Calculator Pakistan 2026-27',
    subtitle:
      'Work out the capital gains tax on the profit from selling a property, with the holding-period scale for older purchases and the Section 236C credit taken off.',
    badges: [
      'Tax on your profit',
      'Flat 15% after 1 July 2024',
      'Holding-period scale before it',
      'Section 236C credited',
    ],
    formTitle: 'Your property details',
    resultTitle: 'Property capital gains tax',
    bottomDisclaimer: SHARED_DISCLAIMER,
  },
} as const satisfies Record<PropertyMode, PropertyPageCopy>;

export const PROPERTY_SOCIAL_IMAGE_COPY = {
  purchase: {
    eyebrow: 'FY 2026-27 · Section 236K',
    title: 'Property Purchase Tax Calculator',
    subtitle: 'Advance tax paid by the buyer',
    features: 'Free · Filer vs non-filer · Tax years 2022-23 to 2026-27',
    brand: 'My Tax Calculator',
  },
  sale: {
    eyebrow: 'FY 2026-27 · Section 236C',
    title: 'Property Sale Tax Calculator',
    subtitle: 'Advance tax paid by the seller',
    features: 'Free · Filer vs non-filer · Set off against capital gains',
    brand: 'My Tax Calculator',
  },
  'capital-gains': {
    eyebrow: 'FY 2026-27 · Capital gains tax',
    title: 'Property Capital Gains Tax Calculator',
    subtitle: 'Tax on the profit from a property sale',
    features: 'Free · Holding-period scale · Section 236C credited',
    brand: 'My Tax Calculator',
  },
} as const;

/** Plain-language explanations shown behind info icons for terms we must keep. */
export const PROPERTY_TERMS = {
  section236K: {
    label: 'What is Section 236K?',
    text: 'The rule that makes the registry or society collect tax from the buyer when a property changes hands. It is collected before the transfer is recorded.',
  },
  section236C: {
    label: 'What is Section 236C?',
    text: 'The rule that makes the registry or society collect tax from the seller when a property is transferred. It is taken at the time of transfer.',
  },
  declaredValue: {
    label: 'What is the declared value?',
    text: 'The price written on the transfer deed — what the buyer and seller agreed between themselves.',
  },
  fbrValue: {
    label: 'What is the FBR / DC value?',
    text: 'The official value the FBR notifies for properties in that area, or the provincial DC rate. Tax is worked out on whichever is higher: this or your declared price.',
  },
  taxBase: {
    label: 'Which value is taxed?',
    text: 'The higher of your declared price and the FBR / DC value. You cannot lower the tax by writing a smaller price on the deed.',
  },
  adjustable: {
    label: 'Is this my final tax?',
    text: 'This is not your final tax. It is money already paid towards the total you owe for the year. When you file your return you either get the extra back as a refund, or pay the difference if you owe more.',
  },
  filerStatus: {
    label: 'What is a filer?',
    text: 'Someone whose name is on the FBR Active Taxpayer List, which you get on by filing your yearly return. Non-filers pay several times more on property.',
  },
  lateFiler: {
    label: 'What is a late filer?',
    text: 'Someone who is on the Active Taxpayer List but filed their return after the deadline. They paid a middle rate — more than a filer, less than a non-filer. This tier was scrapped from 2026-27.',
  },
  capitalGain: {
    label: 'What is a capital gain?',
    text: 'The profit on the sale — what you sold the property for, minus what you paid for it.',
  },
  holdingPeriod: {
    label: 'Why does the holding period matter?',
    text: 'For property bought before 1 July 2024, the longer you held it the less tax you pay on the gain, down to nothing. For anything bought since, the holding period no longer changes the rate.',
  },
  propertyType: {
    label: 'Why does the property type matter?',
    text: 'On the older scale, flats drop to zero tax fastest, then constructed property, then open plots. It only applies to property bought before 1 July 2024.',
  },
  transferCredit: {
    label: 'What is the Section 236C credit?',
    text: 'The advance tax already taken from you at transfer. It is not an extra charge — it comes off your capital gains bill, and any excess is refundable when you file.',
  },
  finalTax: {
    label: 'Is capital gains tax final?',
    text: 'It is charged separately on the gain rather than added to your salary or business income, and the Section 236C already collected is set against it.',
  },
} as const;

export const PROPERTY_STATUS_OPTIONS = [
  { value: 'filer', label: 'Filer', tooltip: PROPERTY_TERMS.filerStatus.text },
  { value: 'late-filer', label: 'Late filer', tooltip: PROPERTY_TERMS.lateFiler.text },
  { value: 'non-filer', label: 'Non-filer' },
] as const satisfies readonly PropertyOption<PropertyFilerStatus>[];

export const PROPERTY_TYPE_OPTIONS = [
  { value: 'open-plot', label: 'Open plot' },
  { value: 'constructed', label: 'Constructed' },
  { value: 'flat', label: 'Flat' },
] as const satisfies readonly PropertyOption<PropertyType>[];

export const PROPERTY_FORM_COPY = {
  fiscalYearLabel: 'Tax year',
  declaredValueLabel: {
    purchase: 'Declared purchase price',
    sale: 'Declared sale price',
  },
  declaredValueHelp: 'The price written on the transfer deed.',
  fbrValueLabel: 'FBR / DC value',
  fbrValueHelp:
    'The official notified value for the property. Leave it equal if you do not know it.',
  taxBaseLabel: 'Higher value used (tax base)',
  statusLabel: {
    purchase: 'Buyer status on the Active Taxpayer List',
    sale: 'Seller status on the Active Taxpayer List',
    'capital-gains': 'Seller status on the Active Taxpayer List',
  },
  statusHelp: 'Filing your yearly return puts you on the list and cuts this tax sharply.',
  lateFilerRetiredNote:
    'The late-filer tier was scrapped for 2026-27, so this year has only filer and non-filer.',
  purchasePriceLabel: 'Purchase price',
  purchasePriceHelp: 'What you originally paid for the property.',
  salePriceLabel: 'Sale price',
  salePriceHelp: 'What you sold the property for.',
  purchaseDateLabel: 'Purchase date',
  purchaseDateHelp: 'This decides which capital gains regime you fall under.',
  saleDateLabel: 'Sale date',
  saleDateHelp: 'This decides the tax year your gain is taxed in.',
  taxYearNoticeLabel: 'Tax year',
  taxYearNoticeHelp:
    "Pakistan's tax year runs 1 July to 30 June, so the year a gain is taxed in is fixed by when you sold — there is nothing to choose. It also sets the Section 236C rate credited against your bill.",
  propertyTypeLabel: 'Property type',
  propertyTypeHelp: 'Only used for property bought before 1 July 2024.',
  invalidTransferMessage: 'Enter a property value above zero to see the tax.',
  invalidCapitalGainsMessage: 'Enter a sale price and both dates to see the tax.',
  invalidDatesMessage: 'The sale date must be after the purchase date.',
  privacyNote: 'All calculations run in your browser. Nothing you type is sent anywhere.',
} as const;

export const PROPERTY_RESULT_COPY = {
  appliedRateLabel: 'Applied rate',
  taxBaseLabel: 'Value taxed',
  advanceTaxLabel: {
    purchase: 'Advance tax to be paid by the buyer',
    sale: 'Advance tax to be deducted from the seller',
  },
  adjustableBadge: 'Adjustable against your annual tax liability',
  higherValueNote: 'Worked out on the higher of your declared price and the FBR / DC value.',
  nonFilerComparisonTitle: 'If you were not on the Active Taxpayer List',
  filerSavingLabel: 'What being a filer saves you',
  setOffNote: 'This can be set against the capital gains tax on the same sale.',
  workingTitle: 'How this was worked out',
  capitalGainLabel: 'Capital gain',
  appliedCgtRateLabel: 'Applied capital gains rate',
  grossCgtLabel: 'Capital gains tax on the gain',
  transferCreditLabel: 'Less: Section 236C already collected',
  netCgtLabel: 'Capital gains tax still to pay',
  gainAfterTaxLabel: 'Profit you keep',
  effectiveRateLabel: 'Effective rate on the gain',
  holdingPeriodLabel: 'Holding period',
  regimeFlatBadge: 'Bought on or after 1 July 2024',
  regimeGridBadge: 'Bought before 1 July 2024',
  minimumRateNote:
    'A non-filer pays their normal slab rates on the gain with 15% as the floor, so the real bill depends on their total income for the year. Treat this as a minimum.',
  fullyCoveredNote:
    'The Section 236C already collected covers the whole capital gains bill, so there is nothing more to pay on the gain — and the excess is refundable when you file.',
  lossNote:
    'You sold for no more than you paid, so there is no gain to tax. The Section 236C collected at transfer is still refundable through your return.',
} as const;

export const PROPERTY_SECTION_COPY = {
  faqEyebrow: 'Property tax questions',
  faqTitle: 'Frequently asked questions',
  faqDescription:
    'The questions Pakistani buyers and sellers ask most about property tax, answered in plain language.',
  rateGuideTitle: 'Rates for the year you picked',
  rateGuideDescription:
    'The table changes with the tax year, because property rates were rewritten by almost every Finance Act since 2022.',
  yearComparisonTitle: 'The same deal across tax years',
  yearComparisonDescription:
    'What this transaction would have cost under each year we cover, at the status you selected.',
  cgtRegimesTitle: 'Two capital gains regimes run side by side',
  cgtRegimesDescription:
    'Which one applies depends on the day you bought the property, not the year you sold it.',
  switchModeTitle: 'Switch mode to calculate',
} as const;

export const PROPERTY_GUIDE_COPY = {
  reviewedLabel: 'Rates last reviewed 30 July 2026 against the Finance Act 2026',
  reviewedDateTime: '2026-07-30',
} as const;

interface PropertySectionCard {
  id: string;
  /** Which calculator the card describes, so it can borrow that mode's icon and accent. */
  mode: PropertyMode;
  title: string;
  who: string;
  description: string;
}

interface PropertySectionGuide {
  title: string;
  description: string;
  /** Ordered so the tax this page prices comes first. */
  cards: readonly PropertySectionCard[];
}

/**
 * Three taxes hit one property deal, but which of them is *yours* depends on
 * which side of the deal you are on. Each page therefore leads with the tax it
 * prices and describes the other two from that standpoint, rather than all three
 * repeating one neutral explainer.
 */
export const PROPERTY_SECTION_GUIDE = {
  purchase: {
    title: 'Your tax as a buyer, and the two the seller pays',
    description:
      'One property deal can trigger three separate taxes. Only the first of them is yours — the other two land on the person selling to you.',
    cards: [
      {
        id: 'section-236k',
        mode: 'purchase',
        title: 'Section 236K — your tax',
        who: 'You, the buyer',
        description:
          'The charge this page works out. The registrar or housing society collects it from you before the property is recorded in your name, and it counts towards your own income tax for the year.',
      },
      {
        id: 'section-236c',
        mode: 'sale',
        title: 'Section 236C — the seller’s transfer tax',
        who: 'The seller pays',
        description:
          'Taken from the other side of the same deal, at the same counter and on the same value. It does not come out of your pocket, although sellers often try to price it into what they ask.',
      },
      {
        id: 'capital-gains',
        mode: 'capital-gains',
        title: 'Capital gains tax — the seller’s profit tax',
        who: 'The seller pays',
        description:
          'Charged on the seller’s profit rather than on the price you agreed. A buyer never pays it; you only meet it yourself if you later sell the property on.',
      },
    ],
  },
  sale: {
    title: 'Your two taxes as a seller, and the one the buyer pays',
    description:
      'Selling can charge you twice over — once on the price and once on the profit — while a third charge falls on your buyer. This page prices the first of yours.',
    cards: [
      {
        id: 'section-236c',
        mode: 'sale',
        title: 'Section 236C — your transfer tax',
        who: 'You, the seller',
        description:
          'The charge this page works out. It is deducted from you when the transfer is registered, and credited against your tax for the year — including the capital gains tax on this same sale.',
      },
      {
        id: 'capital-gains',
        mode: 'capital-gains',
        title: 'Capital gains tax — your profit tax',
        who: 'You, the seller',
        description:
          'Your second charge, on the profit instead of on the price. Because the 236C above is worked out on the whole sale price, it frequently covers this bill in full.',
      },
      {
        id: 'section-236k',
        mode: 'purchase',
        title: 'Section 236K — the buyer’s tax',
        who: 'The buyer pays',
        description:
          'Collected from whoever is buying from you, at the same counter and on the same value. None of it is deducted from your proceeds.',
      },
    ],
  },
  'capital-gains': {
    title: 'Where the tax on your profit sits among the three',
    description:
      'A property deal is taxed twice over for the seller and once for the buyer. This page prices the charge on your profit, after crediting what was already taken at transfer.',
    cards: [
      {
        id: 'capital-gains',
        mode: 'capital-gains',
        title: 'Capital gains tax — your profit tax',
        who: 'You, the seller',
        description:
          'The charge this page works out. It falls on the gain — the sale price less what you paid — rather than on the sale price, and it is charged separately from your salary or business income.',
      },
      {
        id: 'section-236c',
        mode: 'sale',
        title: 'Section 236C — already taken from you',
        who: 'You, the seller',
        description:
          'Collected at transfer on the full sale price. It is not an extra charge stacked on top: it comes straight off the bill above, and anything left over is refundable when you file.',
      },
      {
        id: 'section-236k',
        mode: 'purchase',
        title: 'Section 236K — the buyer’s tax',
        who: 'The buyer pays',
        description:
          'Charged to whoever bought the property from you. It plays no part in your gain — it is the buyer’s own advance tax, claimable on the buyer’s return.',
      },
    ],
  },
} as const satisfies Record<PropertyMode, PropertySectionGuide>;

/**
 * Worked examples for the two transfer calculators. Both use one property whose
 * FBR value beats the deed price, because that is the rule people get wrong.
 * Figures are 2026-27 filer rates: 1.25% under 236K, 2.75% under 236C, against
 * non-filer 10.5% (up to PKR 50m) and 11.5% respectively.
 */
export const PROPERTY_CALCULATION_GUIDE = {
  purchase: {
    title: 'How the buyer’s tax is worked out',
    description:
      'Take the higher of the two values on the table, then apply the Section 236K rate for your place on the Active Taxpayer List. There is no allowance to subtract first and, from 2026-27, no value bands for filers.',
    formulaLabel: 'Section 236K',
    formulaTerms: [
      { id: 'base', text: 'higher of deed price and FBR / DC value' },
      { id: 'rate', text: '236K rate for your filer status' },
    ],
    exampleIntro:
      'A plot bought for PKR 30,000,000 where the FBR notified value is PKR 34,000,000. The higher figure is what is taxed, so the deed price is set aside.',
    exampleRows: [
      { id: 'declared', label: 'Declared price on the deed', value: 'Rs. 30,000,000' },
      { id: 'fbr', label: 'FBR / DC value', value: 'Rs. 34,000,000' },
      { id: 'base', label: 'Value taxed (the higher of the two)', value: 'Rs. 34,000,000' },
      { id: 'rate', label: 'Filer rate for 2026-27', value: '1.25%' },
    ],
    totalLabel: 'Advance tax the buyer pays',
    totalValue: 'Rs. 425,000',
    compareLabel: 'Same plot, off the taxpayer list (10.5%)',
    compareValue: 'Rs. 3,570,000',
  },
  sale: {
    title: 'How the seller’s tax is worked out',
    description:
      'Take the higher of the two values on the table, then apply the Section 236C rate for your place on the Active Taxpayer List. The rate falls on the whole sale price, not on the profit — that is what the capital gains calculator handles.',
    formulaLabel: 'Section 236C',
    formulaTerms: [
      { id: 'base', text: 'higher of deed price and FBR / DC value' },
      { id: 'rate', text: '236C rate for your filer status' },
    ],
    exampleIntro:
      'The same plot sold for PKR 30,000,000 with an FBR notified value of PKR 34,000,000. The seller is taxed on the higher figure, whatever the deed says.',
    exampleRows: [
      { id: 'declared', label: 'Declared price on the deed', value: 'Rs. 30,000,000' },
      { id: 'fbr', label: 'FBR / DC value', value: 'Rs. 34,000,000' },
      { id: 'base', label: 'Value taxed (the higher of the two)', value: 'Rs. 34,000,000' },
      { id: 'rate', label: 'Filer rate for 2026-27', value: '2.75%' },
    ],
    totalLabel: 'Advance tax deducted from the seller',
    totalValue: 'Rs. 935,000',
    compareLabel: 'Same plot, off the taxpayer list (11.5%)',
    compareValue: 'Rs. 3,910,000',
  },
} as const;

interface PropertyCgtRegimeCard {
  id: string;
  title: string;
  description: string;
}

export const PROPERTY_CGT_REGIME_CARDS: readonly PropertyCgtRegimeCard[] = [
  {
    id: 'flat-15',
    title: 'Bought on or after 1 July 2024 — flat 15%',
    description:
      'The holding period no longer changes anything. Sellers on the Active Taxpayer List pay 15% of the gain however long they held the property. Sellers who are not on the list pay their normal slab rates instead, and never less than 15%.',
  },
  {
    id: 'holding-grid',
    title: 'Bought before 1 July 2024 — holding-period scale',
    description:
      'The older scale is preserved for these purchases for good. The rate falls the longer you held the property and depends on the type: flats reach zero after two years, constructed property after four, and open plots after six.',
  },
];

/**
 * Each mode answers the cross-cutting questions — valuation, the non-filer gap,
 * how the three taxes relate — in its own words and from its own side of the
 * deal. Sharing one array across the three routes made two thirds of the
 * purchase and sale pages identical, which invites search engines to treat them
 * as one page. Keep new entries mode-specific.
 */
export const PROPERTY_FAQS = {
  purchase: [
    {
      id: 'is-236k-adjustable',
      question: 'Is the advance tax under Section 236K adjustable?',
      answer:
        'Yes. Section 236K is advance tax, not a separate charge on the purchase. It is credited against the tax you owe for the year when you file your return, and if you have overpaid you can claim the difference back. For someone who never files, it simply becomes a sunk cost.',
    },
    {
      id: 'purchase-value-bands-2026',
      question: 'Do property value bands still apply to buyers in 2026-27?',
      answer:
        'Only to non-filers. The Finance Act 2026 replaced the buyer’s banded table with one flat 1.25% for anyone on the Active Taxpayer List, whatever the property is worth. The non-filer table sits in the Tenth Schedule rather than in that Division, and it was not amended, so non-filers still pay 10.5%, 14.5% or 18.5% depending on the value.',
    },
    {
      id: 'purchase-not-236c',
      question: 'Does a buyer pay Section 236C as well?',
      answer:
        'No. Section 236C is the seller’s side of the same transfer and is collected from them, not from you. As a buyer your only advance tax at the counter is Section 236K. The two are taken at the same moment on the same value, which is why they get confused so often.',
    },
    {
      id: 'purchase-which-value',
      question: 'Which value is a buyer’s tax worked out on?',
      answer:
        'The higher of the price written on your transfer deed and the FBR notified value for that area, or the provincial DC rate where that is what applies. Agreeing a smaller figure on paper does not lower your Section 236K, because the official value sets the floor.',
    },
    {
      id: 'purchase-non-filer-cost',
      question: 'How much more does a non-filer pay to buy property?',
      answer:
        'Between eight and fifteen times as much. For 2026-27 a buyer on the Active Taxpayer List pays 1.25% of the taxed value whatever the property is worth, while a buyer who is not pays 10.5% up to PKR 50 million, 14.5% up to PKR 100 million and 18.5% above that. On a PKR 30 million plot that is PKR 375,000 against PKR 3,150,000.',
    },
    {
      id: 'purchase-when-collected',
      question: 'When does a buyer pay Section 236K?',
      answer:
        'At the point of transfer. The registrar, housing society or other registering authority collects it before the property is recorded in your name, so it is settled as part of the transfer rather than billed to you later in the year.',
    },
  ],
  sale: [
    {
      id: 'is-236c-adjustable',
      question: 'Is the advance tax under Section 236C adjustable?',
      answer:
        'Yes. Section 236C is advance tax collected at transfer, and it is credited against your tax for the year — including the capital gains tax on the same sale. If the 236C already collected is more than your capital gains tax, the excess comes back as a refund when you file.',
    },
    {
      id: 'sale-rate-2026',
      question: 'Why did the seller’s rate fall so much for 2026-27?',
      answer:
        'The Finance Act 2026 replaced the seller’s banded table, which ran from 4.5% to 5.5%, with a single flat 2.75% for anyone on the Active Taxpayer List. The non-filer rate did not follow it down: that figure lives in rule 1 of the Tenth Schedule, which the Act left alone, so it stays at 11.5%.',
    },
    {
      id: 'sale-not-236k',
      question: 'Does a seller pay Section 236K too?',
      answer:
        'No. Section 236K is charged to the buyer on the same transfer. A seller’s advance tax is Section 236C alone — though a seller may also owe capital gains tax on the profit, which is a separate charge worked out on the gain rather than on the price.',
    },
    {
      id: 'sale-which-value',
      question: 'Which value is a seller’s tax worked out on?',
      answer:
        'The higher of the price written on the transfer deed and the FBR notified value for that area, or the provincial DC rate where that is what applies. Recording a smaller price on the deed does not reduce what is deducted from you, because the official value sets the floor.',
    },
    {
      id: 'sale-non-filer-cost',
      question: 'How much more does a non-filer pay to sell property?',
      answer:
        'A little over four times as much. For 2026-27 a seller on the Active Taxpayer List has 2.75% of the taxed value deducted, while a seller who is not has 11.5% deducted however much the property is worth. On a PKR 30 million sale that is PKR 825,000 against PKR 3,450,000.',
    },
    {
      id: 'sale-when-deducted',
      question: 'When is Section 236C deducted from a sale?',
      answer:
        'At transfer. The registrar, housing society or other registering authority takes it before the property is recorded in the buyer’s name, so it leaves your proceeds at the counter rather than arriving as a bill later in the year.',
    },
  ],
  'capital-gains': [
    {
      id: 'when-is-cgt-applicable',
      question: 'When is capital gains tax applicable on property?',
      answer:
        'Whenever you sell a property for more than you paid for it. If you sell at or below cost there is no gain and no capital gains tax, although the Section 236C collected at transfer is still refundable through your return.',
    },
    {
      id: 'cgt-holding-period',
      question: 'Does holding a property longer reduce the capital gains tax?',
      answer:
        'Only for property bought before 1 July 2024. On that older scale the rate falls the longer you hold, reaching zero after two years for flats, four years for constructed property and six years for open plots. Anything bought on or after 1 July 2024 is taxed at a flat 15% for sellers on the Active Taxpayer List no matter how long it was held.',
    },
    {
      id: 'cgt-which-tax-year',
      question: 'Which tax year does a property gain belong to?',
      answer:
        'The one your sale falls in. Pakistan’s tax year runs from 1 July to 30 June, so a property sold on 21 July 2026 is taxed in tax year 2026-27 and goes on that year’s return, however long you had held it. That is why this calculator reads the year off your sale date instead of asking you to pick one — picking a year that did not contain the sale would price the gain against the wrong Section 236C rate.',
    },
    {
      id: 'cgt-236c-credit',
      question: 'Can Section 236C be set against capital gains tax?',
      answer:
        'Yes, and it usually is. Section 236C is advance tax on the sale, so it is credited against the tax you owe on the gain. Because 236C is charged on the whole sale price while capital gains tax is only charged on the profit, the 236C often covers the entire capital gains bill on its own.',
    },
    {
      id: 'cgt-vs-236c',
      question: 'How is capital gains tax different from Section 236C?',
      answer:
        'Section 236C is charged on the whole sale price and taken at the counter; capital gains tax is charged only on your profit and settled when you file. They are not two bills for the same thing — the 236C is credited against the gain tax, and because it is worked out on a far larger figure it frequently wipes it out entirely.',
    },
    {
      id: 'cgt-cost-base',
      question: 'What counts as the purchase price for the gain?',
      answer:
        'What you originally paid for the property. The gain is simply the sale price less that figure, so the two prices you enter are what set the amount taxed. Sell for the same as you paid or less and there is no gain at all, so no capital gains tax arises.',
    },
    {
      id: 'cgt-non-filer',
      question: 'Does a non-filer pay more capital gains tax?',
      answer:
        'It works differently from the withholding taxes. A seller on the Active Taxpayer List pays a flat 15% on property bought on or after 1 July 2024. A seller who is not on the list pays their normal slab rates on the gain instead, with 15% as the floor, so the real bill depends on their total income for the year — which is why this calculator shows 15% as a minimum rather than a final figure.',
    },
  ],
} as const satisfies Record<PropertyMode, readonly PropertyFaqItem[]>;

/**
 * Official FBR documents behind the withholding rates. The Finance Act 2026 sets
 * the current filer rates, the Ordinance carries both the Divisions and the
 * Tenth Schedule that the non-filer rates actually live in, and the rate card is
 * the FBR's own published summary for 2025-26.
 */
export const PROPERTY_TRANSFER_OFFICIAL_SOURCES = [
  {
    id: 'finance-act-2026',
    title: 'Finance Act 2026',
    description:
      'The enacted budget law for 2026-27. It sets Section 236C at 2.75% and Section 236K at 1.25% for filers, and removes the late-filer tier.',
    href: FBR_DOC_URLS.financeAct2026,
    logo: FBR_LOGO,
  },
  {
    id: 'income-tax-ordinance',
    title: 'Income Tax Ordinance 2001',
    description:
      'Divisions X and XVIII set the filer rates, and the Tenth Schedule sets the rates for people not on the Active Taxpayer List.',
    href: FBR_DOC_URLS.incomeTaxOrdinance,
    logo: FBR_LOGO,
  },
  {
    id: 'wht-rate-card',
    title: 'FBR Withholding Tax Rate Card',
    description:
      'The FBR’s own rate card for 2025-26, listing Section 236C and 236K by value band for filers, late filers and non-filers.',
    href: FBR_DOC_URLS.whtRateCard,
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

/** Capital gains sources: the charge itself, plus the 236C that is credited against it. */
export const PROPERTY_CGT_OFFICIAL_SOURCES = [
  {
    id: 'income-tax-ordinance',
    title: 'Income Tax Ordinance 2001',
    description:
      'Section 37(1A) charges the gain, and Division VIII of Part I holds both the flat 15% rate and the holding-period scale by property type.',
    href: FBR_DOC_URLS.incomeTaxOrdinance,
    logo: FBR_LOGO,
  },
  {
    id: 'finance-act-2026',
    title: 'Finance Act 2026',
    description:
      'The enacted budget law for 2026-27. It sets the 2.75% Section 236C rate that is credited against your capital gains tax.',
    href: FBR_DOC_URLS.financeAct2026,
    logo: FBR_LOGO,
  },
  {
    id: 'wht-rate-card',
    title: 'FBR Withholding Tax Rate Card',
    description:
      'The FBR’s rate card for the Section 236C collected from sellers at transfer, which is adjustable against the tax on the gain.',
    href: FBR_DOC_URLS.whtRateCard,
    logo: FBR_LOGO,
  },
  {
    id: 'iris',
    title: 'FBR IRIS Portal',
    description: 'Declare the disposal and claim the Section 236C credit when you file.',
    href: FBR_DOC_URLS.iris,
    logo: IRIS_LOGO,
  },
] as const satisfies readonly OfficialSource[];
