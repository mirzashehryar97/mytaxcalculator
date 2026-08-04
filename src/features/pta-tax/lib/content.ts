import { Globe, Smartphone } from 'lucide-react';

import type { OfficialSource } from '@/components/calculator/OfficialSourcesGrid';

import { FBR_DOC_URLS, FBR_LOGO, IRIS_LOGO, NATIONAL_ASSEMBLY_LOGO } from '@/lib/officialSources';

import { PTA_NEW_PHONES } from '@/features/pta-tax/lib/phoneCatalogue';
import type { PtaPopularPhoneRef } from '@/features/pta-tax/types';

export const PTA_ROUTE = '/pta-tax-calculator';

export const PTA_PAGE_COPY = {
  eyebrow: 'Tax year 2026-27 · Phone registration',
  title: 'PTA Mobile Registration Tax Calculator',
  subtitle:
    'Brought a phone into Pakistan? Pick your model and see what it costs to register it — every charge listed separately, worked out from the government’s own value for that exact phone.',
  badges: [
    'Government figures only',
    'Both ways of registering',
    /**
     * Counted from the catalogue rather than typed, because the two numbers are
     * easy to conflate: 1,087 published values spread across 870 models, since
     * most models are priced once per storage tier.
     */
    `${PTA_NEW_PHONES.length.toLocaleString('en-PK')} official phone values`,
  ],
  formTitle: 'Your mobile device',
  resultTitle: 'Your estimated taxes',
} as const;

export const PTA_RESULT_COPY = {
  valueUsdLabel: 'C&F value',
  valuePkrLabel: 'Customs value',
  totalLabel: 'Estimated FBR duties & taxes',
  passportCaption: 'Passport route',
  cnicCaption: 'CNIC route — the fine is not included',
  /** Shown in place of a figure on a line that carries no charge. */
  nothingToPay: 'Exempt',
} as const;

export const PTA_BREAKDOWN_COPY = {
  title: 'Where each figure comes from',
  description:
    'Six separate charges make up the one amount you pay, and some of them come out at nothing. Here is what each one is and why it came out at that number.',
  referencePrefix: 'Source:',
} as const;

export const PTA_SOCIAL_IMAGE_COPY = {
  eyebrow: 'FY 2026-27 · Phone registration tax',
  title: 'PTA Mobile Registration Tax Calculator',
  subtitle: 'Brought it yourself, or registering with CNIC',
  features: 'Free · Official government values · Every charge listed',
  brand: 'My Tax Calculator',
} as const;

/**
 * Field labels keep the official name — it is what the PSID, the bank counter
 * and every FBR document call the same thing, so a visitor who learns it here
 * can follow it through the rest of the process. The plain-English explanation
 * rides in an `InfoTooltip` beside each label rather than replacing it.
 */
export const PTA_FORM_COPY = {
  fiscalYearLabel: 'Tax year',
  routeLabel: 'Registration route',
  deviceKindLabel: 'Device type',
  conditionLabel: 'Device condition',
  valueSourceLabel: 'Customs value',
  brandLabel: 'Brand',
  modelLabel: 'Model',
  /**
   * Samsung alone lists 128 models, so the picker takes a typed name. The
   * placeholder says "models" rather than "phones" because that is the field it
   * filters — the brand above it is chosen first and is not searched.
   */
  modelSearchPlaceholder: 'Search models',
  variantLabel: 'Storage',
  /**
   * A handful of models are listed twice in the ruling — once with a memory
   * configuration and once without — so the unqualified row needs a label of
   * its own to stay selectable. It is deliberately not called "Base": the
   * ruling states no configuration for it and we are not guessing one.
   */
  variantUnstatedLabel: 'Not stated',
  manualValueLabel: 'C&F value',
  manualValuePlaceholder: 'e.g. 650',
  manualValueHelp:
    'The customs value in US dollars, taken from your own PSID or assessment — not the retail price.',
  declaredValueLabel: 'Higher declared value (optional)',
  declaredValuePlaceholder: 'Only if higher',
  declaredValueHelp:
    'Leave blank to use the published value. Where the value you declared is higher, that is the one assessed.',
  exchangeRateLabel: 'Exchange rate',
  exchangeRatePlaceholder: 'e.g. 280',
  officialValueBadge: 'Official value',
  awaitingTitle: 'Tell us about the device',
  awaitingBody:
    'Every duty band starts at US$ 0, so without a customs value this would price a device nobody has described.',
  privacyNote: 'Everything is worked out in your browser. Nothing you type is sent anywhere.',
} as const;

export const PTA_ROUTE_OPTIONS = [
  { value: 'passport', label: 'Passport' },
  { value: 'cnic', label: 'CNIC' },
] as const;

export const PTA_DEVICE_KIND_OPTIONS = [
  { value: 'smartphone', label: 'Smartphone' },
  { value: 'feature-phone', label: 'Basic phone' },
] as const;

export const PTA_CONDITION_OPTIONS = [
  { value: 'new', label: 'New' },
  { value: 'used', label: 'Used' },
] as const;

export const PTA_VALUE_SOURCE_OPTIONS = [
  { value: 'model', label: 'Pick my phone' },
  { value: 'manual', label: 'Enter the value' },
] as const;

/**
 * Every official term the form and the result use, explained the way you would
 * explain it to a friend. The trigger's accessible name names the term, so a
 * screen-reader user hears "What is the C&F value?" rather than a bare "info".
 * Each explanation gives the plain meaning first and the statutory hook last.
 */
export const PTA_TERMS = {
  cnfValue: {
    label: 'What is the C&F value?',
    text: 'Cost and freight — the value customs puts on your handset, in US dollars. It is not what you paid and not the launch price: FBR publishes a figure per model, and it normally sits below what the phone sells for. Every band on this page is drawn on it.',
  },
  customsValue: {
    label: 'What is the customs value?',
    text: 'The C&F value converted into rupees at the exchange rate above. Sales tax is charged as a percentage of this figure; the other five charges are fixed amounts that do not use it.',
  },
  totalDue: {
    label: 'What is in this total?',
    text: 'The six federal charges below added together: customs duty, additional customs duty, regulatory duty, sales tax, advance income tax and the mobile handset levy. Several of them come out at nothing depending on how you register. None of it goes to PTA — Customs assesses it and you pay it at a bank against a PSID. On the CNIC route it excludes a fine that FBR never publishes.',
  },
  route: {
    label: 'Which registration route applies to me?',
    text: 'Passport is for a traveller registering a phone from their own accompanied baggage, within 60 days of arriving. Everyone else — someone who bought the phone locally, or a traveller past the 60 days — registers on CNIC. Registering early earns no discount; the difference is one tax you skip, plus a fine on the CNIC side.',
  },
  deviceKind: {
    label: 'Which device type is mine?',
    text: 'A smartphone is any phone with a mobile operating system that runs apps you install — an iPhone, a Samsung, anything on Android. A basic phone is a call-and-text handset with no app store. A smartphone pays no customs duty at all; a basic phone pays a flat Rs 250.',
  },
  condition: {
    label: 'Does device condition change the value?',
    text: 'Not if you carried the phone in yourself. A traveller’s used or refurbished handset is valued on the same list as a new one, because an allowance for depreciation is already built into those figures. The much cheaper second-hand list applies only to imports in commercial quantity.',
  },
  exchangeRate: {
    label: 'Why does the exchange rate matter?',
    text: 'Sales tax is a percentage of a dollar value, so it has to be worked out in rupees and moves with the rate. The other five charges are fixed rupee amounts and do not change. If your own assessment used a different rate, type it in here.',
  },
  declaredValue: {
    label: 'When do I enter a declared value?',
    text: 'Almost never. Leave it blank and the published figure is used. Fill it in only if you declared a higher value to customs yourself — the rule is that the assessment is made on whichever of the two is higher.',
  },
  valueSource: {
    label: 'Which option should I choose?',
    text: 'Pick your phone from the list where it is there — that pulls in the published value for your exact model and storage size. Choose "Enter the value" if the handset is too new to be on the list, or if you already have a figure from your own paperwork.',
  },
  customsDuty: {
    label: 'What is customs duty?',
    text: 'The ordinary import duty on goods entering Pakistan. Smartphones are exempt from it entirely, so this line is normally nil. A basic call-and-text phone is not covered by that exemption and pays a flat Rs 250 per set.',
  },
  additionalCustomsDuty: {
    label: 'What is additional customs duty?',
    text: 'A second import charge that sits on top of customs duty on most goods. Phones are exempt from it on both registration routes, so it always comes out at nil here. It is shown rather than hidden so you can see it was accounted for, not forgotten.',
  },
  regulatoryDuty: {
    label: 'What is regulatory duty?',
    text: 'A further import charge, set by notification rather than by the tariff itself. It is a fixed rupee amount decided by which C&F band your phone falls into, so every handset in the same band pays exactly the same.',
  },
  salesTax: {
    label: 'How is sales tax worked out?',
    text: 'It is the only charge here that is a percentage rather than a fixed amount: 18% of the customs value, rising to 25% once the C&F value passes US$ 500. At that point the higher rate applies to the whole value, not just the part above the threshold.',
  },
  incomeTax: {
    label: 'What is this income tax?',
    text: 'Advance income tax collected at import, under section 148. You skip it entirely on the passport route. Where it is charged it counts towards your income tax for the year, so it is claimed back on your return rather than lost.',
  },
  handsetLevy: {
    label: 'What is the mobile handset levy?',
    text: 'A one-off charge for putting a handset onto Pakistan’s mobile networks, separate from any import duty. Like regulatory duty it is a fixed amount per C&F band, not a percentage.',
  },
} as const;

/** Tooltip for each line of the result, keyed by the line id `calcPtaTax` sets. */
export const PTA_LINE_TERMS: Record<string, { label: string; text: string }> = {
  'customs-duty': PTA_TERMS.customsDuty,
  'additional-customs-duty': PTA_TERMS.additionalCustomsDuty,
  'regulatory-duty': PTA_TERMS.regulatoryDuty,
  'sales-tax': PTA_TERMS.salesTax,
  'income-tax-148': PTA_TERMS.incomeTax,
  'handset-levy': PTA_TERMS.handsetLevy,
};

/**
 * The one thing every third-party calculator gets wrong, so it sits directly
 * under the result rather than in the FAQ.
 */
export const PTA_AUTHORITY_NOTE =
  'None of this money goes to PTA. PTA only checks your phone’s IMEI number and blocks it if it is not registered — the charges are six separate taxes set by FBR, worked out by Customs and paid at a bank.';

export const PTA_DECLARED_VALUE_NOTE = {
  title: 'We are using the value you typed in',
  body: 'It is higher than the government’s own figure for this phone, and the rule is that whichever value is higher is the one you get charged on.',
} as const;

export const PTA_VALUE_BASIS_NOTE = {
  title: 'The price you paid is not what you are taxed on',
  body: 'Every charge here is worked out from the government’s own dollar value for your exact phone, not from what it costs in a shop. That value is usually lower — which is why a calculator that starts from the retail price will tell you the bill is bigger than it is.',
  steps: [
    {
      id: 'official-value',
      title: 'Find the phone’s official value',
      body: 'The government publishes a dollar figure for each model and storage size. We look yours up.',
    },
    {
      id: 'convert',
      title: 'Turn it into rupees',
      body: 'Multiply that dollar figure by the exchange rate to get the value everything is charged on.',
    },
    {
      id: 'bands',
      title: 'See which brackets it lands in',
      body: 'Each charge has its own price brackets, and they do not line up with each other.',
    },
    {
      id: 'total',
      title: 'Add the charges up',
      body: 'Six in all: customs duty, additional customs duty, regulatory duty, sales tax, income tax and the handset levy.',
    },
  ],
  floorNote:
    'The official value is a floor, not a fixed price. If you declared a higher value to customs yourself, you are charged on that higher figure instead.',
} as const;

/**
 * VR 1834/2023 Note 1, which is the answer to "does my used phone cost less to
 * register" and is published nowhere a normal visitor would find it.
 */
export const PTA_USED_PHONE_NOTE = {
  title: 'A used phone costs the same to register as a new one',
  body: 'This surprises most people, but the rules are clear: if you carried the phone in yourself, it is valued on the same list as a brand-new one — because an allowance for wear and tear is already built into those figures. There is a separate, much cheaper list for second-hand phones, but it only covers people importing them in bulk to sell, and only phones that were in use for at least six months before being shipped.',
  commercialLabel: 'Bulk-import value for this model',
  commercialNote: 'For traders importing in quantity — not for registering your own phone.',
} as const;

export const PTA_COVERAGE_NOTE = {
  title: 'Very new phones are not on the official list',
  body: 'The published values were last updated in December 2023 for most brands and April 2025 for Apple. So there is no official figure for a Galaxy S24 or S25, an iPhone 17 or a Pixel 9 — nothing to look up. If yours is one of those, switch to "Enter the value" and use the dollar figure from your own paperwork. Do not use the shop price; it will overstate the bill.',
} as const;

export const PTA_SALES_TAX_BASE_NOTE = {
  title: 'One number here is genuinely unsettled',
  body: 'The law says sales tax is charged on the phone’s "import value" without ever saying exactly which figure that means. It could be the value on its own — which is what this page uses — or the value plus the duties already added to it, which on a US$ 600 phone would cost roughly Rs 4,400 more. We use the smaller reading and tell you about it rather than quietly picking one.',
} as const;

export const PTA_LEVY_GAP_NOTE = {
  title: 'Your phone’s value falls in a gap in the law',
  body: 'One of the charges has brackets that read "up to 100" and then "above 101", so a value of exactly 100.50 belongs to neither. The same hole appears at 200.50, 350.50, 500.50 and 700.50, and it has never been fixed. We use the lower bracket, on the basis that you should not be charged something the law never actually says you owe.',
} as const;

export const PTA_INSTALMENTS_NOTE = {
  title: 'You can pay this in instalments',
  body: 'Since the Finance Act 2026 you are allowed to pay in instalments rather than all at once, as long as everything is paid before the tax year ends. The detailed rules for how that works had not been published when this page was last checked, so we cannot show you a schedule yet — ask at the bank or on the portal.',
} as const;

export const PTA_TEMPORARY_REGISTRATION = {
  days: '120',
  title: 'Just visiting for a few months?',
  body: 'If you live abroad or are a foreign national, you can register one phone temporarily and pay nothing at all. It is tied to one SIM you nominate, and it lasts 120 days — after that the phone is blocked, and you cannot use this option twice for the same phone.',
} as const;

export const PTA_HIGHLIGHTS = [
  {
    id: 'no-filer-toggle',
    title: 'There is no filer discount here',
    body: 'PTA says filers and non-filers pay the same to register a phone, and none of the duty, sales tax or levy amounts has a separate non-filer rate. There is no filer switch on this page because no official schedule publishes two different figures — but if you are registering on a CNIC and not on the taxpayer list, check the income tax line on your slip.',
  },
  {
    id: 'sales-tax-cliff',
    title: 'US$ 500 is a cliff, not a step',
    body: 'Cross US$ 500 and the sales tax rate jumps from 18% to 25% — and the higher rate then applies to the whole value, not just the part above 500. A single dollar more can cost you thousands of rupees.',
  },
  {
    id: 'cnic-fine',
    title: 'The CNIC fine is not published anywhere',
    body: 'Registering with a CNIC adds a fine on top of everything else, and no official schedule for it exists. So treat the CNIC figure here as the minimum, not the final amount.',
  },
  {
    id: 'psid-validity',
    title: 'Pay within 7 days or start again',
    body: 'Your payment slip expires after a week, and when it does the application is deleted and has to be filed from scratch. Separately, the phone itself must be registered within 60 days of first putting a SIM in it.',
  },
] as const;

export const PTA_COMPONENT_CARDS = [
  {
    id: 'customs-duty',
    title: 'Customs duty',
    body: 'Nothing at all on a smartphone. A flat Rs 250 if it is a basic call-and-text phone.',
  },
  {
    id: 'regulatory-duty',
    title: 'Regulatory duty',
    body: 'An extra import charge. A fixed amount, decided by your phone’s price bracket.',
  },
  {
    id: 'sales-tax',
    title: 'Sales tax',
    body: '18% of the value, or 25% once it passes US$ 500. The only charge that is a percentage.',
  },
  {
    id: 'handset-levy',
    title: 'Mobile handset levy',
    body: 'A one-off charge for putting a phone on the networks. Again fixed, by price bracket.',
  },
] as const;

export const PTA_RATE_GUIDE_COPY = {
  eyebrow: 'The full rate tables',
  title: 'PTA tax rates by phone value',
  description:
    'What each charge comes to at every price bracket, for both tax years. Brackets are set in US dollars, using the government’s value for the phone rather than what you paid for it. Customs duty has no column here because it does not vary: nothing on a smartphone, a flat Rs 250 on a basic phone.',
  bandColumn: 'Phone value',
  regulatoryDutyColumn: 'Regulatory duty',
  salesTaxColumn: 'Sales tax',
  incomeTaxColumn: 'Income tax',
  handsetLevyColumn: 'Handset levy',
  incomeTaxNote:
    'The income tax column applies only if you register with a CNIC. Carry the phone in yourself and you skip it — which is the whole reason the two ways of registering cost different amounts.',
  salesTaxNote:
    'Sales tax is the only percentage in the table, so it is the only figure that changes with the exchange rate. Note it is charged on the full value, not just the part above the threshold.',
  gapNote:
    'The brackets in the first column are the handset levy’s, printed exactly as the law writes them — gaps and all, so nothing covers a value of 100.50, 200.50, 350.50, 500.50 or 700.50. Land in one of those gaps and we charge the levy from the cheaper row below it. The other three charges have unbroken brackets of their own, so a value past the top of a row moves them to the row above.',
  yearHeadingPrefix: 'Tax year',
  currentYearLabel: 'In force now',
} as const;

/**
 * Handsets people search for by name, spread across the bands so the US$ 500
 * sales-tax cliff is visible in the table — the iPhone 14 sits under it at 18%,
 * the iPhone 15 above it at 25%. Every entry is keyed into the valuation
 * rulings; nothing here is a retail price.
 */
export const PTA_POPULAR_PHONES: readonly PtaPopularPhoneRef[] = [
  { brand: 'Samsung', model: 'Galaxy ZFold5', variant: '12 GB + 512 GB' },
  { brand: 'Apple', model: 'iPhone 16 Pro Max', variant: '256 GB' },
  { brand: 'Samsung', model: 'Galaxy S23 Ultra', variant: '8 GB + 512 GB' },
  { brand: 'Samsung', model: 'Galaxy S23', variant: '8 GB + 256 GB' },
  { brand: 'Apple', model: 'iPhone 16', variant: '128 GB' },
  { brand: 'Apple', model: 'iPhone 15', variant: '128 GB' },
  { brand: 'Apple', model: 'iPhone 14', variant: '128 GB' },
  { brand: 'Apple', model: 'iPhone 13', variant: '128 GB' },
  { brand: 'Samsung', model: 'Galaxy A54', variant: '8 GB + 128 GB' },
  { brand: 'Xiaomi', model: 'Redmi Note 12', variant: '8 GB + 256 GB' },
  { brand: 'Oppo', model: 'A58', variant: '6 GB + 128 GB' },
  { brand: 'vivo', model: 'Y21', variant: '' },
  { brand: 'Samsung', model: 'Galaxy A05', variant: '4 GB + 64 GB' },
  { brand: 'Infinix', model: 'Hot 30 Play', variant: '4 GB + 64 GB' },
  { brand: 'Xiaomi', model: 'Redmi 12C', variant: '6 GB + 128 GB' },
  { brand: 'realme', model: 'C33', variant: '4 GB + 64 GB' },
  { brand: 'Tecno', model: 'Spark 10', variant: '4 GB + 128 GB' },
];

export const PTA_POPULAR_PHONES_COPY = {
  eyebrow: 'Real examples',
  title: 'PTA tax on popular phones in Pakistan',
  description:
    'Every row here is worked out by the calculator above, using the government’s value for that exact model and storage size. Find something close to your phone to get a rough idea, then put your own model into the calculator for the real figure.',
  phoneColumn: 'Phone',
  cnfColumn: 'Official value',
  salesTaxColumn: 'Sales tax',
  passportColumn: 'If you brought it yourself',
  cnicColumn: 'If registering with CNIC',
  cliffNote:
    'Look at the iPhone 14 and iPhone 15 next to each other. At US$ 490 the first sits under the US$ 500 line and pays 18%; at US$ 600 the second is over it and pays 25% on its entire value. That one step costs far more than the difference in the phones.',
  fineNote:
    'The CNIC figures leave out a fine that is never published anywhere, so treat them as a minimum rather than the final amount.',
} as const;

export const PTA_FAQ_COPY = {
  eyebrow: 'Questions people actually ask',
  title: 'PTA mobile registration tax FAQs',
  description:
    'Who the money goes to, why the two ways of registering cost different amounts, and where the official figures run out.',
  disclaimer:
    'This is an estimate built from published rates. The amount you actually pay is worked out by Customs against your phone’s IMEI number — check the figure on your payment slip before you pay it.',
} as const;

export const PTA_FAQ_ITEMS = [
  {
    id: 'who-charges',
    question: 'Does this money go to PTA?',
    answer:
      'No, none of it. PTA’s job is to check your phone’s IMEI number, register it, and block it from the networks if it is not registered — it does not charge you anything. Every rupee is tax set by FBR: customs duty, an additional customs duty, regulatory duty, sales tax, an advance income tax and a mobile handset levy — six charges in all, and the income tax one applies only if you register with a CNIC. Customs works out the total, the system gives you a payment slip, and you pay it at a bank.',
  },
  {
    id: 'passport-vs-cnic',
    question: 'Is it cheaper on a passport, and do I get a discount for registering quickly?',
    answer:
      'There is no discount for being quick — PTA says so in plain words in its own FAQ, and people are charged for the myth every day. Bringing the phone in yourself is cheaper for one reason only: you skip the advance income tax, which can be up to Rs 11,500. On top of that, registering with a CNIC adds a fine, and the amount of that fine is not published anywhere — so a CNIC figure is always a minimum rather than a final number.',
  },
  {
    id: 'cnf-value',
    question: 'Why does it ask for a dollar value instead of what I paid?',
    answer:
      'Because you are not taxed on what you paid. The government keeps its own published price list for phone models, in US dollars, and every charge is worked out from that. It is normally lower than the shop price, which is good news for you. Plenty of other calculators take the retail price and treat it as the official value — that is the single most common mistake on the internet about this tax, and it always makes the bill look bigger than it is.',
  },
  {
    id: 'no-official-value',
    question: 'My phone is not in the list. What do I do?',
    answer:
      'The official list genuinely stops at the Galaxy S23 and the iPhone 16, so a newer phone has no published value — there is nothing to look up. Switch the calculator to "Enter the value" and use the dollar figure from your own paperwork or payment slip. If another website gives you a confident number for a Galaxy S25 or an iPhone 17, it made that number up.',
  },
  {
    id: 'used-phone',
    question: 'Does a used phone cost less to register?',
    answer:
      'Not if you brought it in yourself. The rules say a traveller’s used or refurbished phone is valued on the same list as a new one, because an allowance for wear and tear is already built into those figures. There is a separate, much cheaper list for second-hand phones — but it only covers traders importing them in bulk, and only phones that had been in use for at least six months before being shipped.',
  },
  {
    id: 'customs-duty-zero',
    question: 'Why is customs duty showing as zero?',
    answer:
      'Because smartphones are genuinely exempt from it. The standard tariff does charge Rs 250 per phone, but a separate schedule overrides that and puts smartphones at 0% with no conditions attached — the entry directly below it does list conditions, which is how you can tell the blank is deliberate rather than an oversight. A basic call-and-text phone is not covered by that exemption and still pays the Rs 250.',
  },
  {
    id: 'filer',
    question: 'Do tax filers pay less than non-filers?',
    answer:
      'For the import charges, no. PTA states plainly that everyone pays the same to register a phone whether or not they file tax returns, and the customs duty, regulatory duty, sales tax and handset levy amounts carry no separate non-filer rate the way many other taxes do. There is one loose end, and only on the CNIC route: the advance income tax there is collected under the Income Tax Ordinance, whose general rule increases collections by 100% for anyone not on the active taxpayers’ list, and the list of charges that rule exempts does not name this one. No official schedule publishes two figures for registering a phone, so this page shows the single published amount — but if you are not on the list, check the income tax line on your payment slip before you pay it. That unresolved point is also why there is no filer switch here: a switch would have to state a second figure nobody has published.',
  },
  {
    id: 'instalments',
    question: 'Can I pay in instalments?',
    answer:
      'Yes, in principle — this became allowed in the Finance Act 2026. You can spread the payment out as long as all of it is paid before the tax year ends. The catch is that the detailed rules for how it works had not been published when this page was last checked, so there is no schedule anyone can show you yet. Ask at the bank or on the portal when you apply.',
  },
  {
    id: 'check-status',
    question: 'How do I check whether a phone is already registered?',
    answer:
      'First find the phone’s IMEI number: dial *#06# and it appears on screen, or read it off the box or from your Settings. If the phone takes two SIMs it has two IMEI numbers, and both need to be registered. Then check it in any of three ways, all run by PTA itself: text the 15-digit number to 8484, look it up at dirbs.pta.gov.pk, or use the DVS app. Check that the model the lookup gives back matches the phone in your hand — if it does not, something is wrong with that phone. One catch: the registration site only works from inside Pakistan, so you cannot do this before you fly.',
  },
  {
    id: 'how-many-devices',
    question: 'How many phones can I register, and is the first one free?',
    answer:
      'None of them is free. The old duty-free allowance for one phone in your luggage was withdrawn on 30 June 2019, so every phone that connects to a Pakistani network has to be registered and paid for. There is no exemption for your first phone of the year, for students, for government employees, or for Pakistanis working abroad at the missions. On how many you are allowed, two official answers disagree: PTA’s own FAQ says five per calendar year, while an undated FBR notice limits passport registrations to one. Five is the most you could get; assume one if you are registering on a passport.',
  },
  {
    id: 'deadlines',
    question: 'How long do I have before the phone stops working?',
    answer:
      'Your phone keeps working for 60 days from the moment you first put a Pakistani SIM in it. After that it is blocked until you register it — and flying out and coming back does not reset the clock. Once you apply, the payment slip you are given lasts only 7 days; miss that and the whole application is deleted and has to be filed again. If you are only visiting, there is a separate free option: one phone can be registered temporarily for 120 days.',
  },
] as const;

export const PTA_SOURCES_COPY = {
  eyebrow: 'Straight from the source',
  title: 'Official sources',
  description:
    'Every figure on this page comes from one of these documents — no blogs, no other calculators. Two different bodies show up: PTA runs the registration itself, FBR sets and collects the money.',
} as const;

export const PTA_REVIEW_COPY = {
  reviewedLabel: 'Last reviewed 4 August 2026',
  reviewedDateTime: '2026-08-04',
} as const;

const PTA_DOC_URLS = {
  dirbs: 'https://dirbs.pta.gov.pk/drs',
  dirbsFaqs: 'https://www.pta.gov.pk/assets/media/2025-10-14-FAQs_updated.pdf',
  salesTaxAct: 'https://download1.fbr.gov.pk/Docs/202586148252375SalesTaxActupdatedupto2025-26.pdf',
  financeAct2018: 'https://download1.fbr.gov.pk/Docs/20187181584910542FinanceAct2018.pdf',
  customsTariff: 'https://download1.fbr.gov.pk/Docs/20258111683941732Tariff-2025-26.pdf',
  fifthSchedule: 'https://download1.fbr.gov.pk/Docs/202585238495687Fifth-Schedule.pdf',
  sroRegulatoryDuty: 'https://download1.fbr.gov.pk/SROs/202663017637155381064-2026.pdf',
  sroAdditionalCustomsDuty: 'https://download1.fbr.gov.pk/SROs/20266301763307131063-2026.pdf',
  cgo2024: 'https://download1.fbr.gov.pk/Docs/20243221135610629CGO-01-2024.pdf',
  valuationRuling1834:
    'https://download1.fbr.gov.pk/VALUATIONS/2023121214121119988ValuationRuling1834-2023.pdf',
  valuationRuling1999: 'https://download1.fbr.gov.pk/VALUATIONS/20254251041448873VR1999.pdf',
  valuationRuling2070:
    'https://download1.fbr.gov.pk/VALUATIONS/20264221242011915UsedMobilePhone.pdf',
  webocDutyLookup: 'https://www.weboc.gov.pk/Shared/MobileDeviceDutyInformation.aspx',
} as const;

/**
 * Every government document a figure on this page comes from. PTA and FBR are
 * different authorities, so the PTA cards carry their own mark rather than the
 * FBR wordmark. Third-party summaries are deliberately absent: the whole first
 * page of search results for this topic is aggregators, and they are wrong
 * about who levies the tax.
 */
export const PTA_OFFICIAL_SOURCES: readonly OfficialSource[] = [
  {
    id: 'pta-dirbs',
    title: 'PTA DIRBS Registration',
    description:
      'The registration system itself — where a phone is registered, and blocked if it is not.',
    href: PTA_DOC_URLS.dirbs,
    icon: Smartphone,
  },
  {
    id: 'pta-dirbs-faqs',
    title: 'PTA DIRBS FAQs',
    description:
      'Says in PTA’s own words that registering early earns no discount, and that FBR sets the charges.',
    href: PTA_DOC_URLS.dirbsFaqs,
    icon: Globe,
  },
  {
    id: 'fifth-schedule',
    title: 'Fifth Schedule to the Customs Act 1969',
    description: 'The entry that puts smartphones at 0% customs duty, with no conditions attached.',
    href: PTA_DOC_URLS.fifthSchedule,
    logo: FBR_LOGO,
  },
  {
    id: 'customs-tariff',
    title: 'Pakistan Customs Tariff 2025-26',
    description:
      'The standard Rs 250 per phone, which still applies to a basic call-and-text handset.',
    href: PTA_DOC_URLS.customsTariff,
    logo: FBR_LOGO,
  },
  {
    id: 'sro-1064-2026',
    title: 'SRO 1064(I)/2026',
    description:
      'The regulatory duty amounts for each phone price bracket, from 1 July 2026 onwards.',
    href: PTA_DOC_URLS.sroRegulatoryDuty,
    logo: FBR_LOGO,
  },
  {
    id: 'sro-1063-2026',
    title: 'SRO 1063(I)/2026',
    description:
      'The additional customs duty, and the exemptions that leave phones paying nothing under it.',
    href: PTA_DOC_URLS.sroAdditionalCustomsDuty,
    logo: FBR_LOGO,
  },
  {
    id: 'sales-tax-act',
    title: 'Sales Tax Act 1990',
    description:
      'Sets sales tax on registering a phone at 18%, or 25% once the value passes US$ 500.',
    href: PTA_DOC_URLS.salesTaxAct,
    logo: FBR_LOGO,
  },
  {
    id: 'finance-act-2018',
    title: 'Finance Act 2018',
    description: 'The law that created the mobile handset levy in the first place.',
    href: PTA_DOC_URLS.financeAct2018,
    logo: NATIONAL_ASSEMBLY_LOGO,
  },
  {
    id: 'finance-act-2026',
    title: 'Finance Act 2026',
    description:
      'Cut the levy serial 3 to Rs 200 and section 148 serial 3 to Rs 100, and added DIRBS instalments.',
    href: FBR_DOC_URLS.financeAct2026,
    logo: FBR_LOGO,
  },
  {
    id: 'income-tax-ordinance',
    title: 'Income Tax Ordinance 2001',
    description:
      'The advance income tax amounts, and the rule that lets a phone in your luggage skip them.',
    href: FBR_DOC_URLS.incomeTaxOrdinance2026,
    logo: FBR_LOGO,
  },
  {
    id: 'cgo-01-2019',
    title: 'Customs General Order 01 of 2019',
    description:
      'How registration works, the fine added on the CNIC route, and the free 120-day visitor option.',
    href: PTA_DOC_URLS.cgo2024,
    logo: FBR_LOGO,
  },
  {
    id: 'valuation-ruling-1834',
    title: 'Valuation Ruling 1834/2023',
    description: 'The official value list for new phones — 1,160 models across every brand.',
    href: PTA_DOC_URLS.valuationRuling1834,
    logo: FBR_LOGO,
  },
  {
    id: 'valuation-ruling-1999',
    title: 'Valuation Ruling 1999/2025',
    description: 'The newer value list that replaced the one above for iPhones specifically.',
    href: PTA_DOC_URLS.valuationRuling1999,
    logo: FBR_LOGO,
  },
  {
    id: 'valuation-ruling-2070',
    title: 'Valuation Ruling 2070/2026',
    description: 'The cheaper value list for second-hand phones — traders importing in bulk only.',
    href: PTA_DOC_URLS.valuationRuling2070,
    logo: FBR_LOGO,
  },
  {
    id: 'weboc-duty-lookup',
    title: 'WeBOC Mobile Device Duty',
    description:
      'FBR’s own lookup. Enter your phone’s IMEI number for the figure that actually counts.',
    href: PTA_DOC_URLS.webocDutyLookup,
    logo: FBR_LOGO,
  },
  {
    id: 'iris',
    title: 'FBR IRIS Portal',
    description: 'Where your payment slip is created and the payment is made.',
    href: FBR_DOC_URLS.iris,
    logo: IRIS_LOGO,
  },
] as const;
