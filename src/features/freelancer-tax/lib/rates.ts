import type {
  FreelancerFiscalYear,
  FreelancerOption,
  FreelancerRate,
} from '@/features/freelancer-tax/types';

export const FREELANCER_PSEB_RATE_PERCENT = 0.25;
export const FREELANCER_STANDARD_RATE_PERCENT = 1;
export const FREELANCER_PSEB_NON_ATL_RATE_PERCENT = 0.5;
export const FREELANCER_STANDARD_NON_ATL_RATE_PERCENT = 2;

const VERIFIED_BASE_FREELANCER_RATE = {
  psebAtl: FREELANCER_PSEB_RATE_PERCENT,
  psebNonAtl: FREELANCER_PSEB_RATE_PERCENT,
  standardAtl: FREELANCER_STANDARD_RATE_PERCENT,
  standardNonAtl: FREELANCER_STANDARD_RATE_PERCENT,
} as const satisfies FreelancerRate;

const VERIFIED_CURRENT_FREELANCER_RATE = {
  psebAtl: FREELANCER_PSEB_RATE_PERCENT,
  psebNonAtl: FREELANCER_PSEB_NON_ATL_RATE_PERCENT,
  standardAtl: FREELANCER_STANDARD_RATE_PERCENT,
  standardNonAtl: FREELANCER_STANDARD_NON_ATL_RATE_PERCENT,
} as const satisfies FreelancerRate;

/**
 * Verified Section 154A rates from the sector specification, official FBR
 * rate cards, and Finance Act 2026. The Act extended the existing 0.25% PSEB
 * rate through TY 2029 without changing the Section 154A rate matrix.
 */
export const FREELANCER_RATES = {
  '2026-2027': VERIFIED_CURRENT_FREELANCER_RATE,
  '2025-2026': VERIFIED_CURRENT_FREELANCER_RATE,
  '2024-2025': VERIFIED_BASE_FREELANCER_RATE,
  '2023-2024': VERIFIED_BASE_FREELANCER_RATE,
  '2022-2023': VERIFIED_BASE_FREELANCER_RATE,
  '2021-2022': VERIFIED_BASE_FREELANCER_RATE,
} as const satisfies Record<FreelancerFiscalYear, FreelancerRate>;

export const FREELANCER_FISCAL_YEARS = [
  '2026-2027',
  '2025-2026',
  '2024-2025',
  '2023-2024',
  '2022-2023',
  '2021-2022',
] as const satisfies readonly FreelancerFiscalYear[];

export const DEFAULT_FREELANCER_FISCAL_YEAR: FreelancerFiscalYear = '2026-2027';

export const FREELANCER_FISCAL_YEAR_OPTIONS = [
  { value: '2026-2027', label: '2026-27' },
  { value: '2025-2026', label: '2025-26' },
  { value: '2024-2025', label: '2024-25' },
  { value: '2023-2024', label: '2023-24' },
  { value: '2022-2023', label: '2022-23' },
  { value: '2021-2022', label: '2021-22' },
] as const satisfies readonly FreelancerOption<FreelancerFiscalYear>[];

export function isFreelancerFiscalYear(value: string): value is FreelancerFiscalYear {
  return Object.hasOwn(FREELANCER_RATES, value);
}

export function resolveFreelancerFiscalYear(value: string): FreelancerFiscalYear {
  return isFreelancerFiscalYear(value) ? value : DEFAULT_FREELANCER_FISCAL_YEAR;
}

export function getFreelancerRate(fiscalYear: string): FreelancerRate {
  return FREELANCER_RATES[resolveFreelancerFiscalYear(fiscalYear)];
}
