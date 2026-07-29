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
  { min: 300_001, max: 600_000, rate: 5, fixed: 0 },
  { min: 600_001, max: 2_000_000, rate: 10, fixed: 15_000 },
  { min: 2_000_001, max: null, rate: 25, fixed: 155_000 },
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
  nonFilerUpliftApplies: true,
};

/**
 * 2021-22 used the same slab, but the Tenth Schedule did not reach section 155:
 * the FBR rate card for tax year 2022 notes that the Schedule "shall not apply
 * on tax deducted under section 155", and the Finance Act 2022 removed that
 * exclusion from rule 10. So non-filers paid the filer rate that year.
 */
const NO_UPLIFT_YEAR: RentalRateYear = {
  filerSlabs: FILER_SLABS,
  nonFilerSlabs: FILER_SLABS,
  companyFilerRate: COMPANY_FILER_RATE,
  companyNonFilerRate: COMPANY_FILER_RATE,
  nonFilerUpliftApplies: false,
};

export const RENTAL_RATES = {
  '2026-2027': UPLIFTED_YEAR,
  '2025-2026': UPLIFTED_YEAR,
  '2024-2025': UPLIFTED_YEAR,
  '2023-2024': UPLIFTED_YEAR,
  '2022-2023': UPLIFTED_YEAR,
  '2021-2022': NO_UPLIFT_YEAR,
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
