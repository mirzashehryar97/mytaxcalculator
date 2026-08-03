import type { TaxBracket } from '@/utils/slabEngine';

import type {
  RentalFiscalYear,
  RentalOption,
  RentalRateYear,
} from '@/features/rental-income-tax/types';

/** Rent below this is never taxed for individuals and AOPs. */
export const RENTAL_TAX_FREE_LIMIT = 300_000;

/**
 * An individual or AOP tenant only has to deduct this tax once the rent they
 * pay reaches this figure in a year — section 155(3)(vib). Companies,
 * government bodies and the other listed payers deduct from the first rupee.
 */
export const RENTAL_PAYER_THRESHOLD = 1_500_000;

/**
 * Section 155 rent slab for individuals and AOPs, read off the official FBR
 * Withholding Income Tax Rate Card (Division V, Part III, First Schedule).
 * The same four bands appear on every card from tax year 2022 to 2026, and the
 * enacted Finance Act 2026 amends Divisions IC, III, IIIAA, IIIAB, IV and IVA
 * of Part III but leaves Division V alone — so 2026-27 reuses the table.
 */
const FILER_SLABS: TaxBracket[] = [
  { min: 0, max: 300_000, rate: 0, fixed: 0 },
  { min: 300_000, max: 600_000, rate: 5, fixed: 0 },
  { min: 600_000, max: 2_000_000, rate: 10, fixed: 15_000 },
  { min: 2_000_000, max: null, rate: 25, fixed: 155_000 },
];

const COMPANY_FILER_RATE = 15;
const COMPANY_NON_FILER_RATE = 30;

/**
 * Rule 1 of the Tenth Schedule increases the rate by 100% for people who are
 * not on the Active Taxpayer List. Doubling both the rate and the running fixed
 * amount keeps the schedule internally consistent: 10% to Rs. 600,000 is
 * Rs. 30,000, and Rs. 30,000 + 20% to Rs. 2,000,000 is Rs. 310,000.
 */
function doubleBrackets(brackets: TaxBracket[]): TaxBracket[] {
  return brackets.map((bracket) => ({
    ...bracket,
    rate: bracket.rate * 2,
    fixed: bracket.fixed * 2,
  }));
}

const UPLIFTED_YEAR: RentalRateYear = {
  filerSlabs: FILER_SLABS,
  nonFilerSlabs: doubleBrackets(FILER_SLABS),
  companyFilerRate: COMPANY_FILER_RATE,
  companyNonFilerRate: COMPANY_NON_FILER_RATE,
};

/**
 * Every year we cover carries the uplift, 2021-22 included.
 *
 * Section 155 was clause (d) of Tenth Schedule rule 10 — the list of sections
 * the Schedule does not reach — and the Finance Act 2021 omitted it, in force
 * 1 July 2021, which is tax year 2022 = FY 2021-22. So there is no un-uplifted
 * year in the offered range.
 *
 * 2021-22 used to be shipped without the uplift, on the strength of footnote 17
 * of the FBR rate card for tax year 2022. That footnote does exclude section
 * 155, but credits the *Finance Act 2019* — the position before the omission —
 * while footnote 18 on the same row picks up the Finance Act 2021's change to
 * the rent table. The card also yields to the Ordinance on every page. Full
 * verification, with source links, in calculator-docs/rental-income-tax.md.
 */
export const RENTAL_RATES = {
  '2026-2027': UPLIFTED_YEAR,
  '2025-2026': UPLIFTED_YEAR,
  '2024-2025': UPLIFTED_YEAR,
  '2023-2024': UPLIFTED_YEAR,
  '2022-2023': UPLIFTED_YEAR,
  '2021-2022': UPLIFTED_YEAR,
} as const satisfies Record<RentalFiscalYear, RentalRateYear>;

export const RENTAL_FISCAL_YEARS = [
  '2026-2027',
  '2025-2026',
  '2024-2025',
  '2023-2024',
  '2022-2023',
  '2021-2022',
] as const satisfies readonly RentalFiscalYear[];

export const DEFAULT_RENTAL_FISCAL_YEAR: RentalFiscalYear = '2026-2027';

export const RENTAL_FISCAL_YEAR_OPTIONS = [
  { value: '2026-2027', label: '2026-27' },
  { value: '2025-2026', label: '2025-26' },
  { value: '2024-2025', label: '2024-25' },
  { value: '2023-2024', label: '2023-24' },
  { value: '2022-2023', label: '2022-23' },
  { value: '2021-2022', label: '2021-22' },
] as const satisfies readonly RentalOption<RentalFiscalYear>[];

export function isRentalFiscalYear(value: string): value is RentalFiscalYear {
  return Object.hasOwn(RENTAL_RATES, value);
}

export function resolveRentalFiscalYear(value: string): RentalFiscalYear {
  return isRentalFiscalYear(value) ? value : DEFAULT_RENTAL_FISCAL_YEAR;
}

export function getRentalRateYear(fiscalYear: string): RentalRateYear {
  return RENTAL_RATES[resolveRentalFiscalYear(fiscalYear)];
}
