import type {
  FreelancerFiscalYear,
  FreelancerOption,
  FreelancerRate,
} from '@/features/freelancer-tax/types';

export const FREELANCER_PSEB_RATE_PERCENT = 0.25;
export const FREELANCER_STANDARD_RATE_PERCENT = 1;
export const FREELANCER_PSEB_NON_ATL_RATE_PERCENT = 0.5;
export const FREELANCER_STANDARD_NON_ATL_RATE_PERCENT = 2;

/**
 * FY 2021-22 — Division IVA as the Finance Act 2021 first wrote it: "The rate of
 * tax to be deducted under section 154A shall be one percent of the proceeds of
 * the export." One flat rate, and no Pakistan Software Export Board row at all;
 * the two-row PSEB table only arrives when the Finance Act 2022 substitutes the
 * whole Division on 1 July 2022.
 *
 * Non-filers pay double that year. Tenth Schedule rule 10 did not yet exclude
 * section 154A — clause (ca) is also a Finance Act 2022 insertion — so rule 1's
 * hundred percent increase applied, and the FBR's own card for the year prints
 * it. Verified against the Act and the card; see calculator-docs/freelancer-tax.md.
 */
const FA2021_FLAT_FREELANCER_RATE = {
  psebRateAvailable: false,
  psebAtl: FREELANCER_STANDARD_RATE_PERCENT,
  psebNonAtl: FREELANCER_STANDARD_NON_ATL_RATE_PERCENT,
  standardAtl: FREELANCER_STANDARD_RATE_PERCENT,
  standardNonAtl: FREELANCER_STANDARD_NON_ATL_RATE_PERCENT,
} as const satisfies FreelancerRate;

/**
 * FY 2022-23 to FY 2024-25 — the Finance Act 2022 table, with no non-filer
 * increase. Rule 10(ca) now excludes section 154A from the Tenth Schedule, and
 * the FBR cards for these years agree: they print "No Change" in the Not-on-ATL
 * column against both rows.
 */
const VERIFIED_BASE_FREELANCER_RATE = {
  psebRateAvailable: true,
  psebAtl: FREELANCER_PSEB_RATE_PERCENT,
  psebNonAtl: FREELANCER_PSEB_RATE_PERCENT,
  standardAtl: FREELANCER_STANDARD_RATE_PERCENT,
  standardNonAtl: FREELANCER_STANDARD_RATE_PERCENT,
} as const satisfies FreelancerRate;

/**
 * FY 2025-26 onwards — the rate card starts doubling the non-filer column again,
 * citing rule 1 for a section rule 10(ca) still excludes. The statute and the
 * card disagree here and the calculator follows the card; the conflict is
 * recorded rather than resolved in calculator-docs/freelancer-tax.md.
 */
const VERIFIED_CURRENT_FREELANCER_RATE = {
  psebRateAvailable: true,
  psebAtl: FREELANCER_PSEB_RATE_PERCENT,
  psebNonAtl: FREELANCER_PSEB_NON_ATL_RATE_PERCENT,
  standardAtl: FREELANCER_STANDARD_RATE_PERCENT,
  standardNonAtl: FREELANCER_STANDARD_NON_ATL_RATE_PERCENT,
} as const satisfies FreelancerRate;

/**
 * Section 154A rates, verified against the Finance Acts that set them and the
 * FBR withholding rate card published for each year. The Finance Act 2026
 * extended the 0.25% PSEB rate through TY 2029 without changing the matrix.
 */
export const FREELANCER_RATES = {
  '2026-2027': VERIFIED_CURRENT_FREELANCER_RATE,
  '2025-2026': VERIFIED_CURRENT_FREELANCER_RATE,
  '2024-2025': VERIFIED_BASE_FREELANCER_RATE,
  '2023-2024': VERIFIED_BASE_FREELANCER_RATE,
  '2022-2023': VERIFIED_BASE_FREELANCER_RATE,
  '2021-2022': FA2021_FLAT_FREELANCER_RATE,
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

/** False only for FY 2021-22, where Division IVA had a single flat rate. */
export function hasFreelancerPsebRate(fiscalYear: string): boolean {
  return getFreelancerRate(fiscalYear).psebRateAvailable;
}
