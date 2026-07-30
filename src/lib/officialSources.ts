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
 * Provincial emblems, each taken from the website of the department or law
 * portal the card links to — a provincial levy is cited to its own government,
 * so it carries that government's mark rather than the FBR wordmark.
 */
export const PUNJAB_EXCISE_LOGO = {
  src: '/images/official/punjab-government-emblem.png',
  alt: 'Punjab Excise & Taxation Department',
  width: 96,
  height: 89,
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

/** Official FBR document URLs cited by the calculators. */
export const FBR_DOC_URLS = {
  financeAct2026: 'https://download1.fbr.gov.pk/Docs/20266291261044366FinanceAct2026.pdf',
  financeAct2024: 'https://download1.fbr.gov.pk/Docs/2024630146346801FinanceAct-2024.pdf',
  financeAct2023: 'https://download1.fbr.gov.pk/Docs/20236261762031274FinanceAct,2023.pdf',
  incomeTaxOrdinance:
    'https://download1.fbr.gov.pk/Docs/2024751675120641IncomeTaxOrdinance,2001-amended-upto30.06.2024.pdf',
  whtRateCard: 'https://download1.fbr.gov.pk/Docs/20258181281745641WHT-RateCard.pdf',
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
