import type { OfficialSource } from '@/components/calculator/OfficialSourcesGrid';

import { FBR_DOC_URLS, FBR_LOGO, IRIS_LOGO } from '@/lib/officialSources';

import type {
  RentalFaqItem,
  RentalOption,
  RentalOwnerType,
  RentalPeriod,
  RentalRateGuideRow,
} from '@/features/rental-income-tax/types';

export const RENTAL_PAGE_COPY = {
  eyebrow: 'Tax Year 2026-27 · Tax on rent you receive',
  title: 'Pakistan Rental Income Tax Calculator 2026-27',
  subtitle:
    'See how much tax your tenant takes out of your rent before paying you, how much rent you keep, and how much more it costs to be a non-filer.',
  badges: [
    'Tax on your yearly rent',
    'Filer vs non-filer',
    'Owners, partners & companies',
    'Adjustable withholding tax',
  ],
  formTitle: 'Your rent details',
  resultTitle: 'Tax taken out of your rent',
  bottomDisclaimer:
    'This calculator gives an estimate, not tax or legal advice. Confirm your final tax with a qualified Pakistan tax professional.',
} as const;

export const RENTAL_SOCIAL_IMAGE_COPY = {
  eyebrow: 'FY 2026-27 · Tax on rent received',
  title: 'Pakistan Rental Income Tax Calculator',
  subtitle: 'Landlords · Partners · Companies',
  features: 'Free · Monthly or yearly rent · Filer vs non-filer comparison',
  brand: 'My Tax Calculator',
} as const;

/** Plain-language explanations shown behind info icons for terms we must keep. */
export const RENTAL_TERMS = {
  section155: {
    label: 'What is Section 155?',
    text: 'The rule in Pakistan tax law that makes your tenant take tax out of your rent and pay it to the FBR for you, instead of paying you the full rent.',
  },
  grossRent: {
    label: 'What is gross rent?',
    text: 'The full rent agreed for the property before anything is taken off. It includes rent for furniture and fittings, and money charged for services tied to the property.',
  },
  deductedTax: {
    label: 'Who takes this tax out?',
    text: 'Your tenant. They pay you the rent minus this tax, send the tax to the FBR in your name, and should give you a certificate showing what they paid.',
  },
  adjustable: {
    label: 'Is this my final tax?',
    text: 'This is not your final tax. It is money already paid towards the total you owe for the year. When you file your yearly return you either get the extra back as a refund, or pay the difference if you owe more.',
  },
  filerStatus: {
    label: 'What is a filer?',
    text: 'Someone whose name is on the FBR Active Taxpayer List, which you get on by filing your yearly return. Non-filers have double the tax taken out of their rent.',
  },
  aop: {
    label: 'What does two or more owners mean?',
    text: 'In tax law this is an Association of Persons (AOP) — two or more people who own or rent out the property together, such as a partnership. The group is taxed as one, at the same rates as a single owner.',
  },
  effectiveRate: {
    label: 'What is the effective rate?',
    text: 'The tax taken out shown as a share of your whole yearly rent. It is lower than the top band rate because the first slice of your rent is taxed less.',
  },
  taxBand: {
    label: 'What is a tax band?',
    text: 'Rent is taxed in steps. Your band is the rate charged on your next rupee of rent; earlier rupees are taxed at the lower steps below it.',
  },
  repairAllowance: {
    label: 'What is the repairs allowance?',
    text: 'The law lets you take one-fifth (20%) off your rent for repairs when you file your return, whether or not you actually spent it. You do not need receipts for it.',
  },
  payerThreshold: {
    label: 'When does a private tenant deduct?',
    text: 'A private person or family renting from you only has to take this tax out once they pay Rs. 1,500,000 or more of rent in a year. Companies, government offices, schools, hospitals and similar tenants deduct from the first rupee.',
  },
} as const;

export const RENTAL_PERIOD_OPTIONS = [
  { value: 'monthly', label: 'Monthly rent' },
  { value: 'annual', label: 'Yearly rent' },
] as const satisfies readonly RentalOption<RentalPeriod>[];

export const RENTAL_OWNER_OPTIONS = [
  { value: 'individual', label: 'One owner' },
  { value: 'aop', label: 'Two or more owners', tooltip: RENTAL_TERMS.aop.text },
  {
    value: 'company',
    label: 'A company',
    tooltip:
      'A registered company that owns the property. Companies pay a flat percentage of the rent instead of the step rates, with no tax-free amount.',
  },
] as const satisfies readonly RentalOption<RentalOwnerType>[];

export const RENTAL_FORM_COPY = {
  fiscalYearLabel: 'Tax year',
  rentPeriodLabel: 'How do you want to enter the rent?',
  monthlyRentLabel: 'Monthly rent',
  monthlyRentPlaceholder: '100000',
  monthlyRentHelp: 'The rent agreed for one month, before anything is taken off.',
  annualRentLabel: 'Yearly rent',
  annualRentPlaceholder: '1200000',
  annualRentHelp: 'The rent for the whole year, before anything is taken off.',
  derivedAnnualLabel: 'Yearly rent (worked out for you)',
  derivedAnnualHelp: 'Monthly rent × 12 months.',
  derivedMonthlyLabel: 'Monthly rent (worked out for you)',
  derivedMonthlyHelp: 'Yearly rent ÷ 12 months.',
  ownerLabel: 'Who owns the property?',
  filerLabel: 'Are you on the Active Taxpayer List?',
  filerHelp: 'Filing your yearly return puts you on the list and halves the tax taken out.',
  payerNote:
    'A private person or family renting from you only has to take this tax out once they pay Rs. 1,500,000 or more of rent in a year. Companies, government offices and similar tenants deduct from the first rupee.',
  invalidMessage: 'Enter a rent above zero to see the tax.',
} as const;

export const RENTAL_RESULT_COPY = {
  monthlyBreakdownTitle: 'Monthly Breakdown',
  annualBreakdownTitle: 'Yearly Breakdown',
  rentLabel: 'Rent',
  taxLabel: 'Tax taken out',
  rentAfterTaxLabel: 'Rent you keep',
  monthlyTaxNote: 'The yearly deduction spread over twelve months.',
  effectiveRate: 'Effective rate',
  adjustableBadge: 'Adjustable against your annual tax liability',
  companyRateLabel: 'Flat rate for companies',
  comparisonTitle: 'Filer vs non-filer',
  comparisonSubtitle: 'On the same yearly rent',
  filerLabel: 'Filer Tax',
  nonFilerLabel: 'Non-Filer Tax',
  savingLabel: 'You save as a filer',
  workingTitle: 'How this was worked out',
  taxFreeWorking: 'No tax — yearly rent up to Rs. 300,000 has nothing taken out.',
  yearComparisonTitle: 'Same rent across tax years',
  yearComparisonHelp: 'What would be taken out of this rent in each year we cover.',
} as const;

export const RENTAL_SECTION_COPY = {
  faqEyebrow: 'Got questions?',
  faqTitle: 'Rental income tax FAQs for Pakistan',
  faqDescription: 'Simple answers about the tax your tenant takes out of your rent.',
} as const;

export const RENTAL_GUIDE_COPY = {
  rateTitle: 'Tax on rent in Pakistan for 2026-27',
  rateDescription:
    'Rent paid to one owner, or to two or more owners together, is taxed in steps on the rent for the whole year. Each step only applies to the rent inside it, so the first Rs. 300,000 always has nothing taken out.',
  bandColumn: 'Yearly rent',
  filerColumn: 'Filer',
  nonFilerColumn: 'Non-filer',
  slabNote: 'Non-filers have double the tax taken out, in every year shown here.',
  companyTitle: 'Rent paid to a company',
  companyDescription:
    'A company that owns the property pays a flat percentage of the rent. There are no steps and no tax-free amount.',
  companyFilerLabel: 'Filer',
  companyNonFilerLabel: 'Non-filer',
  companyNote: 'The flat rate applies from the first rupee of rent.',
  calculationTitle: 'How the tax on your rent is worked out',
  calculationDescription:
    'The tax is worked out in steps. You pay a fixed amount for the steps your rent has fully passed, plus the rate for your current step on the rent inside it.',
  formulaLabel: 'Formula',
  formulaResult: 'Tax',
  formulaTerms: [
    { id: 'fixed', text: 'fixed amount for lower steps' },
    { id: 'current', text: 'rate × rent inside your current step' },
  ],
  exampleTitle: 'Worked example (2026-27)',
  exampleIntro:
    'A filer with one property renting it for Rs. 100,000 a month receives Rs. 1,200,000 for the year, which falls in the Rs. 600,001 – 2,000,000 step.',
  exampleRows: [
    { id: 'fixed', label: 'Fixed amount for lower steps', value: 'Rs. 15,000' },
    { id: 'step', label: '10% of rent above Rs. 600,000 (Rs. 600,000)', value: 'Rs. 60,000' },
  ],
  exampleTotalLabel: 'Tax taken out for the year',
  exampleTotalValue: 'Rs. 75,000',
  exampleEffectiveLabel: 'Effective rate',
  exampleEffectiveValue: '6.25%',
  reviewedLabel: 'Last reviewed 29 July 2026',
  reviewedDateTime: '2026-07-29',
} as const;

export const RENTAL_RATE_GUIDE_ROWS = [
  { id: 'band-0', band: 'Up to Rs. 300,000', filerRate: 'No tax', nonFilerRate: 'No tax' },
  {
    id: 'band-1',
    band: 'Rs. 300,001 – 600,000',
    filerRate: '5% of the rent above Rs. 300,000',
    nonFilerRate: '10% of the rent above Rs. 300,000',
  },
  {
    id: 'band-2',
    band: 'Rs. 600,001 – 2,000,000',
    filerRate: 'Rs. 15,000 + 10% of the rent above Rs. 600,000',
    nonFilerRate: 'Rs. 30,000 + 20% of the rent above Rs. 600,000',
  },
  {
    id: 'band-3',
    band: 'Above Rs. 2,000,000',
    filerRate: 'Rs. 155,000 + 25% of the rent above Rs. 2,000,000',
    nonFilerRate: 'Rs. 310,000 + 50% of the rent above Rs. 2,000,000',
  },
] as const satisfies readonly RentalRateGuideRow[];

export const RENTAL_ADJUSTABLE_COPY = {
  title: 'What happens to this tax',
  points: [
    'Your tenant takes this amount out of the rent and pays it to the FBR in your name.',
    'It is not your final tax — it counts towards the tax you owe for the whole year.',
    'If your final tax works out lower, you can claim the difference back as a refund.',
    'If your final tax works out higher, you pay the balance with your yearly return.',
  ],
  note: 'Ask your tenant for the tax certificate, keep your rent records, and file your yearly return on time.',
} as const;

export const RENTAL_DEDUCTIONS_COPY = {
  title: 'Costs you can claim when you file',
  intro:
    'When you file your yearly return, the law lets you take these off your rent before your final tax is worked out:',
  items: [
    {
      id: 'repairs',
      text: 'A repairs allowance of one-fifth (20%) of the rent — no receipts needed.',
    },
    {
      id: 'property-tax',
      text: 'Property tax, local rates and other council charges on the property.',
    },
    {
      id: 'building-cover',
      text: 'Premiums paid to cover the building against damage or destruction.',
    },
    { id: 'ground-rent', text: 'Ground rent on the property.' },
    {
      id: 'borrowing-profit',
      text: 'Profit paid on money you borrowed to buy, build, extend or renovate the property.',
    },
    {
      id: 'collection',
      text: 'Up to 4% of the rent for collecting the rent and running the property.',
    },
    { id: 'legal', text: 'Legal fees to defend your ownership of the property.' },
    {
      id: 'unpaid-rent',
      text: 'Rent a tenant never paid, once you have genuinely tried to recover it.',
    },
  ],
  note: 'These lower your final tax when you file. They do not change the amount your tenant takes out of the rent.',
} as const;

export const RENTAL_OFFICIAL_SOURCES = [
  {
    id: 'wht-rate-card',
    title: 'FBR Withholding Income Tax Rate Card',
    description: 'The Section 155 rent rates for owners and companies (Division V).',
    href: FBR_DOC_URLS.whtRateCard,
    logo: FBR_LOGO,
  },
  {
    id: 'finance-act-2026',
    title: 'Finance Act 2026',
    description: 'The enacted budget law for 2026-27. It leaves the rent rates unchanged.',
    href: FBR_DOC_URLS.financeAct2026,
    logo: FBR_LOGO,
  },
  {
    id: 'income-tax-ordinance',
    title: 'Income Tax Ordinance 2001',
    description: 'Section 155 on rent, and Section 15A on the costs a landlord can claim.',
    href: FBR_DOC_URLS.incomeTaxOrdinance,
    logo: FBR_LOGO,
  },
  {
    id: 'iris',
    title: 'FBR IRIS Portal',
    description: 'File your yearly return and claim back any extra tax taken from your rent.',
    href: FBR_DOC_URLS.iris,
    logo: IRIS_LOGO,
  },
] as const satisfies readonly OfficialSource[];

export const RENTAL_FAQS = [
  {
    id: 'how-much',
    question: 'How much tax is deducted from rental income in Pakistan?',
    answer:
      'For a filer, nothing is taken out of the first Rs. 300,000 of yearly rent. Above that it is 5% of the rent over Rs. 300,000 up to Rs. 600,000; Rs. 15,000 plus 10% of the rent over Rs. 600,000 up to Rs. 2,000,000; and Rs. 155,000 plus 25% of the rent over Rs. 2,000,000. So Rs. 1,200,000 of yearly rent means Rs. 75,000 is taken out. Non-filers pay double these amounts.',
  },
  {
    id: 'final-or-refundable',
    question: 'Is the tax on rent final, or can I get it back?',
    answer:
      'It is not final. The amount your tenant takes out counts towards the total tax you owe for the year. When you file your yearly return you claim it as tax already paid — if your final tax is lower you get the difference back as a refund, and if it is higher you pay the balance.',
  },
  {
    id: 'what-is-155',
    question: 'What is Section 155?',
    answer:
      'Section 155 of the Income Tax Ordinance 2001 is the rule that makes a tenant take tax out of the rent and pay it to the FBR in the owner’s name. It covers rent for land and buildings, including rent for furniture and fittings and money charged for services tied to the property.',
  },
  {
    id: 'non-filer',
    question: 'How much more does a non-filer pay on rent?',
    answer:
      'Double. Rule 1 of the Tenth Schedule increases the rate by 100% for anyone not on the FBR Active Taxpayer List, so a filer paying Rs. 75,000 on Rs. 1,200,000 of rent would have Rs. 150,000 taken out as a non-filer. This applies to every year this calculator covers. A company that is not on the list pays 30% instead of 15%.',
  },
  {
    id: 'company',
    question: 'What is the rate when a company owns the property?',
    answer:
      'A company pays a flat 15% of the gross rent if it is on the Active Taxpayer List, and 30% if it is not. There are no steps and no tax-free amount, so the rate applies from the first rupee of rent.',
  },
  {
    id: 'tenant-deduct',
    question: 'Does my tenant always have to deduct tax from my rent?',
    answer:
      'Not always. A private person or family renting from you only has to deduct once they pay Rs. 1,500,000 or more of rent in a year. Companies, federal and provincial government bodies, local councils, non-profits, foreign missions, private schools, hospitals, clinics, beauty parlours and boutiques must deduct from the first rupee.',
  },
  {
    id: 'deductions',
    question: 'What can I claim against my rental income when I file?',
    answer:
      'A repairs allowance of one-fifth (20%) of the rent with no receipts needed, plus property tax and local rates, premiums covering the building against damage, ground rent, profit paid on money borrowed for the property, up to 4% of rent for collection and running costs, legal fees defending your ownership, and rent a tenant never paid. These lower your final tax, not the amount your tenant takes out.',
  },
  {
    id: 'small-rent',
    question: 'Is rent under Rs. 300,000 a year taxed?',
    answer:
      'Your tenant takes nothing out of yearly rent up to Rs. 300,000 if you own the property yourself or with others. That is only about the deduction, though — the rent still counts as your income, so include it in your yearly return along with everything else you earn.',
  },
  {
    id: 'tax-years',
    question: 'Which tax years does this rent calculator cover?',
    answer:
      'Tax years 2021-22 through 2026-27. The rate steps have not changed across those years — they were set by the Finance Act 2021 and the Finance Act 2026 left them alone for 2026-27 — and the extra charge for non-filers applies throughout.',
  },
  {
    id: 'multiple-properties',
    question: 'What if I rent out more than one property, or own it with someone else?',
    answer:
      'Add up the rent from all your properties for the year to see the total picture, since the steps apply to your rent as a whole. If you own a property with someone else, each owner is taxed on their own share of the rent, so enter only your share.',
  },
] as const satisfies readonly RentalFaqItem[];
