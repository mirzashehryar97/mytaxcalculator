import type { TaxBracket } from '@/utils/slabEngine';

import type {
  BusinessFiscalYear,
  BusinessOption,
  BusinessSlabYear,
  BusinessSurcharge,
} from '@/features/business-tax/types';

/** Professional-firm AOPs are capped at a 40% top rate. */
export const PROFESSIONAL_AOP_MAX_RATE = 40;

/** 10% of the computed tax, added when taxable income exceeds Rs. 10,000,000. */
export const BUSINESS_SURCHARGE: BusinessSurcharge = {
  threshold: 10_000_000,
  rate: 0.1,
};

/**
 * Non-salaried individual & AOP slabs, verified against the sector spec, PwC,
 * ICMA rate cards and firm tax handbooks. The top rate rose 35% → 45% at
 * TY 2024-25 (Finance Act 2024), and the 10% surcharge over Rs. 10m began the
 * same year — earlier years have neither. Finance Act 2026 left the
 * non-salaried slabs and surcharge unchanged for TY 2026-27 (verified against
 * PwC and taxcalc.pk), so 2026-27 reuses the same table.
 */

// TY 2024-25, 2025-26 & 2026-27 — 6 bands, top 45%.
const CURRENT_STANDARD_SLABS: TaxBracket[] = [
  { min: 0, max: 600_000, rate: 0, fixed: 0 },
  { min: 600_000, max: 1_200_000, rate: 15, fixed: 0 },
  { min: 1_200_000, max: 1_600_000, rate: 20, fixed: 90_000 },
  { min: 1_600_000, max: 3_200_000, rate: 30, fixed: 170_000 },
  { min: 3_200_000, max: 5_600_000, rate: 40, fixed: 650_000 },
  { min: 5_600_000, max: null, rate: 45, fixed: 1_610_000 },
];

// TY 2023-24 — 7 bands, top 35%.
const SLABS_2023_2024: TaxBracket[] = [
  { min: 0, max: 600_000, rate: 0, fixed: 0 },
  { min: 600_000, max: 800_000, rate: 7.5, fixed: 0 },
  { min: 800_000, max: 1_200_000, rate: 15, fixed: 15_000 },
  { min: 1_200_000, max: 2_400_000, rate: 20, fixed: 75_000 },
  { min: 2_400_000, max: 3_000_000, rate: 25, fixed: 315_000 },
  { min: 3_000_000, max: 4_000_000, rate: 30, fixed: 465_000 },
  { min: 4_000_000, max: null, rate: 35, fixed: 765_000 },
];

// TY 2021-22 & 2022-23 — 8 bands, top 35% (unchanged between the two years).
const LEGACY_STANDARD_SLABS: TaxBracket[] = [
  { min: 0, max: 600_000, rate: 0, fixed: 0 },
  { min: 600_000, max: 800_000, rate: 5, fixed: 0 },
  { min: 800_000, max: 1_200_000, rate: 12.5, fixed: 10_000 },
  { min: 1_200_000, max: 2_400_000, rate: 17.5, fixed: 60_000 },
  { min: 2_400_000, max: 3_000_000, rate: 22.5, fixed: 270_000 },
  { min: 3_000_000, max: 4_000_000, rate: 27.5, fixed: 405_000 },
  { min: 4_000_000, max: 6_000_000, rate: 32.5, fixed: 680_000 },
  { min: 6_000_000, max: null, rate: 35, fixed: 1_330_000 },
];

/**
 * Caps every band's marginal rate at `maxRate`. The fixed amounts stay valid
 * because only the top band here exceeds the cap; all lower bands are already
 * at or below it, so the running totals they feed are unchanged.
 */
function capBracketsAt(brackets: TaxBracket[], maxRate: number): TaxBracket[] {
  return brackets.map((bracket) => ({ ...bracket, rate: Math.min(bracket.rate, maxRate) }));
}

function buildYear(standard: TaxBracket[], surcharge: BusinessSurcharge | null): BusinessSlabYear {
  return {
    standard,
    professionalAop: capBracketsAt(standard, PROFESSIONAL_AOP_MAX_RATE),
    surcharge,
  };
}

export const BUSINESS_SLABS = {
  '2026-2027': buildYear(CURRENT_STANDARD_SLABS, BUSINESS_SURCHARGE),
  '2025-2026': buildYear(CURRENT_STANDARD_SLABS, BUSINESS_SURCHARGE),
  '2024-2025': buildYear(CURRENT_STANDARD_SLABS, BUSINESS_SURCHARGE),
  '2023-2024': buildYear(SLABS_2023_2024, null),
  '2022-2023': buildYear(LEGACY_STANDARD_SLABS, null),
  '2021-2022': buildYear(LEGACY_STANDARD_SLABS, null),
} as const satisfies Record<BusinessFiscalYear, BusinessSlabYear>;

export const BUSINESS_FISCAL_YEARS = [
  '2026-2027',
  '2025-2026',
  '2024-2025',
  '2023-2024',
  '2022-2023',
  '2021-2022',
] as const satisfies readonly BusinessFiscalYear[];

export const DEFAULT_BUSINESS_FISCAL_YEAR: BusinessFiscalYear = '2026-2027';

export const BUSINESS_FISCAL_YEAR_OPTIONS = [
  { value: '2026-2027', label: '2026-27' },
  { value: '2025-2026', label: '2025-26' },
  { value: '2024-2025', label: '2024-25' },
  { value: '2023-2024', label: '2023-24' },
  { value: '2022-2023', label: '2022-23' },
  { value: '2021-2022', label: '2021-22' },
] as const satisfies readonly BusinessOption<BusinessFiscalYear>[];

export function isBusinessFiscalYear(value: string): value is BusinessFiscalYear {
  return Object.hasOwn(BUSINESS_SLABS, value);
}

export function resolveBusinessFiscalYear(value: string): BusinessFiscalYear {
  return isBusinessFiscalYear(value) ? value : DEFAULT_BUSINESS_FISCAL_YEAR;
}

export function getBusinessSlabYear(fiscalYear: string): BusinessSlabYear {
  return BUSINESS_SLABS[resolveBusinessFiscalYear(fiscalYear)];
}
