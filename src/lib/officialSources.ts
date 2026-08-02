import type { OfficialSource, SourceLogo } from '@/components/calculator/OfficialSourcesGrid';

export const FBR_LOGO = {
  src: '/images/tax-guides/fbr-logo.png',
  alt: 'Federal Board of Revenue Pakistan',
  width: 532,
  height: 77,
  cropToMark: true,
} as const satisfies SourceLogo;

export const IRIS_LOGO = {
  src: '/images/tax-guides/iris-logo.png',
  alt: 'FBR IRIS portal Pakistan',
  width: 148,
  height: 33,
} as const satisfies SourceLogo;

export const FINANCE_DIVISION_LOGO = {
  src: '/images/official/pakistan-government-emblem.png',
  alt: 'Government of Pakistan Finance Division',
  width: 192,
  height: 206,
  prominent: true,
} as const satisfies SourceLogo;

/**
 * For a federal Act read from the gazette the National Assembly publishes
 * rather than from an FBR reprint — the FBR wordmark would misattribute it.
 */
export const NATIONAL_ASSEMBLY_LOGO = {
  src: '/images/official/pakistan-government-emblem.png',
  alt: 'National Assembly of Pakistan',
  width: 192,
  height: 206,
  prominent: true,
} as const satisfies SourceLogo;

/**
 * Provincial emblems, each taken from the website of the department or law
 * portal the card links to — a provincial levy is cited to its own government,
 * so it carries that government's mark rather than the FBR wordmark.
 */
export const PUNJAB_EXCISE_LOGO = {
  src: '/images/official/punjab-government-emblem.png',
  alt: 'Punjab Excise & Taxation Department',
  width: 264,
  height: 223,
  prominent: true,
} as const satisfies SourceLogo;

export const SINDH_EXCISE_LOGO = {
  src: '/images/official/sindh-government-emblem.png',
  alt: 'Sindh Excise & Taxation Department',
  width: 80,
  height: 86,
  prominent: true,
} as const satisfies SourceLogo;

export const KP_GOVERNMENT_LOGO = {
  src: '/images/official/kp-government-emblem.png',
  alt: 'Government of Khyber Pakhtunkhwa',
  width: 80,
  height: 82,
  prominent: true,
} as const satisfies SourceLogo;

export const BALOCHISTAN_EXCISE_LOGO = {
  src: '/images/official/balochistan-government-emblem.png',
  alt: 'Balochistan Excise & Taxation Department',
  width: 240,
  height: 200,
  prominent: true,
} as const satisfies SourceLogo;

/**
 * The same emblems again, named for the government rather than one of its
 * departments — a provincial Act or gazette notification is cited to the
 * province itself, not to its excise office.
 */
export const PUNJAB_GOVERNMENT_LOGO = {
  src: '/images/official/punjab-government-emblem.png',
  alt: 'Government of the Punjab',
  width: 264,
  height: 223,
  prominent: true,
} as const satisfies SourceLogo;

export const SINDH_GOVERNMENT_LOGO = {
  src: '/images/official/sindh-government-emblem.png',
  alt: 'Government of Sindh',
  width: 80,
  height: 86,
  prominent: true,
} as const satisfies SourceLogo;

export const BALOCHISTAN_GOVERNMENT_LOGO = {
  src: '/images/official/balochistan-government-emblem.png',
  alt: 'Government of Balochistan',
  width: 240,
  height: 200,
  prominent: true,
} as const satisfies SourceLogo;

/** Official FBR document URLs cited by the calculators. */
export const FBR_DOC_URLS = {
  financeAct2026: 'https://download1.fbr.gov.pk/Docs/20266291261044366FinanceAct2026.pdf',
  financeAct2025: 'https://download1.fbr.gov.pk/Docs/2025629106147620FInanceAct2025.pdf',
  financeAct2024: 'https://download1.fbr.gov.pk/Docs/2024630146346801FinanceAct-2024.pdf',
  financeAct2023: 'https://download1.fbr.gov.pk/Docs/20236261762031274FinanceAct,2023.pdf',
  /** Installed the company table that ran to tax year 2024, and inserted Division IIB. */
  financeAct2022: 'https://download1.fbr.gov.pk/Docs/2022711571639532FinanceAct2022.pdf',
  /**
   * Substituted the whole Division IX minimum-turnover table and clause (24D)
   * with it — the only place the older 0.25% distributor rate is still written
   * out, since later Acts substituted the clause rather than amending it.
   */
  financeAct2021: 'https://download1.fbr.gov.pk/Docs/2021751375221891FinanceAct2021.pdf',
  incomeTaxOrdinance:
    'https://download1.fbr.gov.pk/Docs/2024751675120641IncomeTaxOrdinance,2001-amended-upto30.06.2024.pdf',
  /**
   * The consolidated Ordinance published after the Finance Act 2026, so it is
   * the only version carrying the current company, minimum-tax and super-tax
   * tables — along with footnotes recording what each of them replaced.
   */
  incomeTaxOrdinance2026:
    'https://download1.fbr.gov.pk/Docs/2026724177725705IncomeTaxOrdinanace2001.pdf',
  /** FBR's own explanation of the Finance Act 2025 income tax changes. */
  incomeTaxCircular2025:
    'https://download1.fbr.gov.pk/Docs/2025841183918948CircularNo01of2025-26IncomeTax.pdf',
  /**
   * The withholding rate cards, keyed by the tax year each one governs. FBR
   * publishes a card just after each Finance Act, so the card for tax year N
   * is the one "updated up to 30 June" of the calendar year N-1.
   *
   * The tax-year-2024 card (updated to 30 June 2023) is listed on fbr.gov.pk
   * but its document URL now returns 404, so FY 2023-24 has no card to cite.
   */
  whtRateCard: 'https://download1.fbr.gov.pk/Docs/20258181281745641WHT-RateCard.pdf',
  whtRateCardTy2025:
    'https://download1.fbr.gov.pk/Docs/20248211184455183WithholdingTaxRegimeRatesCard2024.pdf',
  whtRateCardTy2023:
    'https://download1.fbr.gov.pk/Docs/20229131493643904WithholdingRatesCardsUpdated30.06.2022.pdf',
  whtRateCardTy2022:
    'https://download1.fbr.gov.pk/Docs/20218151182834653202189138454560UPDATEDWHTRateCardupto30thJune2021.pdf',
  iris: 'https://iris.fbr.gov.pk/',
} as const;

/**
 * Neutral by design: a calculator cites whichever government sets the tax it
 * works out, which is not always the FBR — a provincial levy is sourced to the
 * province that levies it.
 */
export const OFFICIAL_SOURCES_COPY = {
  eyebrow: 'Straight from the source',
  title: 'Official sources',
  description:
    'Every rate on this page comes from these official documents. Open them to check the figures yourself.',
} as const;

/** Salary slab sources — shared by the salary, reverse-salary and salary-comparison calculators. */
export const SALARY_OFFICIAL_SOURCES = [
  {
    id: 'finance-act-2026',
    title: 'Finance Act 2026',
    description: "The enacted budget law for 2026-27. It sets this year's salary tax slabs.",
    href: FBR_DOC_URLS.financeAct2026,
    logo: FBR_LOGO,
  },
  {
    id: 'income-tax-ordinance',
    title: 'Income Tax Ordinance 2001',
    description: 'Section 149 on tax deducted from salary, and the First Schedule slab rates.',
    href: FBR_DOC_URLS.incomeTaxOrdinance,
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
